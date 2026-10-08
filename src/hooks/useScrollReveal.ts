import { useEffect } from 'react';

/** Visitors who ask for less motion get the page as-is, with nothing hidden. */
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * What gets animated as it scrolls in: headings, any element that opts in with
 * `data-reveal`, and the members of card grids and lists (so a row of cards
 * staggers instead of arriving as one block).
 *
 * Deliberately broad rather than per-page: a page added tomorrow gets the same
 * treatment without being wired up, which is what "across the whole website"
 * has to mean for it to stay true.
 */
const SELECTOR = [
  'main h1',
  'main h2',
  'main h3',
  'main h4',
  'main [data-reveal]',
  'main .grid > *',
  'main ul > li',
].join(', ');

/** Stagger between siblings in the same group, and the cap on that stagger. */
const GROUP_DELAY_MS = 70;
const MAX_STAGGER_STEPS = 6;
/** Must stay in step with the transition duration in index.css. */
const TRANSITION_MS = 620;
/** Elements smaller than this (chips, rules, one-line labels) are not animated. */
const MIN_HEIGHT_PX = 18;
/** A second pass after images and webfonts settle, so heights are final. */
const SETTLE_DELAY_MS = 350;
/** An element this far into the viewport counts as "on screen". */
const HORIZON = 0.92;
/** Minimum gap between two scroll-driven reveal sweeps, in milliseconds. */
const SWEEP_THROTTLE_MS = 80;

/** Which entrance an element requested via `data-reveal`. */
const AXIS_CLASS: Record<string, string> = {
  up: 'reveal-init',
  left: 'reveal-init-left',
  right: 'reveal-init-right',
};

/**
 * Reveal headings, text and card groups as they scroll into view.
 *
 * Design notes, because a global DOM animation is easy to get wrong:
 *
 * - Anything already inside the first viewport is left completely alone, so there
 *   is no flash or shift on load, and no invisible page if the observer never
 *   runs.
 * - Each element animates exactly once and is then forgotten.
 * - A scroll-driven sweep is the safety net, not a nicety: an `IntersectionObserver`
 *   is only guaranteed to report state *changes* it samples, so a wheel fling or an
 *   anchor jump can carry an element past the viewport in a single frame. Without
 *   the sweep such an element would stay at opacity 0 — invisible content — which is
 *   far worse than a missed animation.
 * - `prefers-reduced-motion` and browsers without IntersectionObserver both exit
 *   early, leaving every element visible.
 * - Only opacity and transform change, so nothing reflows; the default pass moves on
 *   the vertical axis only, which cannot introduce a horizontal scrollbar.
 * - A MutationObserver picks up content that appears later (filters, modals,
 *   editors) and runs the same, already-idempotent pass.
 */
export const useScrollReveal = (pageKey: unknown): void => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

    const root = document.querySelector('main');
    if (!root) return;

    /** Elements currently hidden, waiting to be revealed. */
    const waiting = new Set<HTMLElement>();

    const reveal = (element: HTMLElement) => {
      if (!waiting.delete(element)) return;
      element.classList.add('reveal-in');
      observer.unobserve(element);
      // Drop the stagger delay once the transition is done so it can never delay
      // an unrelated hover or focus transition on the same element.
      window.setTimeout(() => {
        element.style.transitionDelay = '';
        element.removeAttribute('data-reveal-pending');
      }, TRANSITION_MS + 120);
    };

    /** Everything inside the horizon that is still waiting must be revealed. */
    const sweep = () => {
      if (waiting.size === 0) return;
      const limit = window.innerHeight * HORIZON;
      waiting.forEach((element) => {
        if (element.getBoundingClientRect().top < limit) reveal(element);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target as HTMLElement);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );

    let scheduled = false;
    /**
     * Set by the cleanup below. `prepare` is scheduled through rAF, so under
     * StrictMode's mount → cleanup → mount cycle an already torn-down instance can
     * still be holding a queued pass. If that pass tagged elements it would hide
     * them behind an observer that no longer exists, and the surviving instance
     * would skip them for the rest of the visit. A disposed instance must simply
     * do nothing.
     */
    let disposed = false;
    const prepare = () => {
      scheduled = false;
      if (disposed) return;
      const nodes = Array.from(root.querySelectorAll<HTMLElement>(SELECTOR));
      const limit = window.innerHeight * HORIZON;

      nodes.forEach((element) => {
        if (element.dataset.revealReady === '1') return;
        if (element.closest('[data-reveal-skip]')) return;
        if (element.offsetHeight < MIN_HEIGHT_PX) return;

        // Leave the first screen alone: no animation, no chance of a flash. This
        // also covers anything hidden at the time (a closed modal has a zeroed
        // box), so it is never left invisible after it is opened.
        if (element.getBoundingClientRect().top < limit) {
          element.dataset.revealReady = '1';
          return;
        }

        // One animation per card: a heading inside a group that is already being
        // revealed must not fade in separately on top of it.
        if (element.parentElement?.closest('[data-reveal-ready="1"]')) {
          element.dataset.revealReady = '1';
          return;
        }

        // Never animate something the visitor is already anchored to.
        const position = window.getComputedStyle(element).position;
        if (position === 'fixed' || position === 'sticky') {
          element.dataset.revealReady = '1';
          return;
        }

        // Stagger siblings so a row of cards arrives in sequence.
        const parent = element.parentElement;
        const step = parent
          ? Array.from(parent.children)
              .filter((child) => child.matches(SELECTOR))
              .indexOf(element)
          : 0;
        element.style.transitionDelay = `${Math.min(Math.max(step, 0), MAX_STAGGER_STEPS) * GROUP_DELAY_MS}ms`;

        const axis = element.dataset.reveal ?? 'up';
        element.classList.add(AXIS_CLASS[axis] ?? AXIS_CLASS.up);
        element.dataset.revealReady = '1';
        element.dataset.revealPending = '1';
        waiting.add(element);
        observer.observe(element);
      });
    };

    const run = (callback: () => void) => {
      // rAF is skipped in some throttled embedded views, so never depend on it as
      // the only path to a pass.
      if (typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(callback);
      } else {
        window.setTimeout(callback, 0);
      }
    };

    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      run(prepare);
    };

    // Let React paint the new page before measuring it, then run once more after
    // images and webfonts have settled, because both change element heights.
    schedule();
    const settle = window.setTimeout(prepare, SETTLE_DELAY_MS);

    // Safety net: a single jump can carry an element past the viewport between two
    // observer samples, and it must still become visible.
    //
    // Runs synchronously on a plain time throttle rather than through rAF: a
    // dropped animation frame must never be able to latch a guard and strand
    // content at opacity 0. `sweep` returns immediately once nothing is waiting.
    let lastSweep = 0;
    const onScroll = () => {
      const now = Date.now();
      if (now - lastSweep < SWEEP_THROTTLE_MS) return;
      lastSweep = now;
      sweep();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const mutations = new MutationObserver(schedule);
    mutations.observe(root, { childList: true, subtree: true });

    return () => {
      disposed = true;
      window.clearTimeout(settle);
      window.removeEventListener('scroll', onScroll);
      mutations.disconnect();
      observer.disconnect();

      // Hand back anything this instance tagged but never revealed.
      //
      // This is not tidiness: `prepare` is scheduled through rAF, so under
      // StrictMode's mount → cleanup → mount cycle a first pass can land on an
      // instance that has already been torn down. Its elements would keep the
      // hidden class with no observer and no sweep left to reveal them — invisible
      // content. Releasing them lets the surviving instance tag them properly.
      waiting.forEach((element) => {
        element.classList.remove('reveal-init', 'reveal-init-left', 'reveal-init-right', 'reveal-in');
        element.style.transitionDelay = '';
        element.removeAttribute('data-reveal-pending');
        delete element.dataset.revealReady;
      });
      waiting.clear();
    };
  }, [pageKey]);
};
