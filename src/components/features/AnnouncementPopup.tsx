import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Bell, ChevronLeft, ChevronRight, ExternalLink, Minus, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AnnouncementPost } from '../../types';

/**
 * Session key: a visitor who closes the popup keeps it closed for that visit.
 * Exported so the staff editor can clear it when previewing a new card.
 */
export const ANNOUNCEMENT_DISMISS_KEY = 'bist_announcement_dismissed';
/** How long after landing before the popup slides in. */
export const ANNOUNCEMENT_APPEAR_DELAY_MS = 4000;
/**
 * How long the card stays on screen before it folds itself away into the small
 * launcher chip. Long enough to read a headline or two, short enough that it
 * never becomes furniture parked over the page.
 *
 * This is the single knob for the card's on-screen time: the countdown bar reads
 * it through the `--popup-countdown-ms` inline variable, so changing this one
 * value keeps the animation and the timer in step. Hovering or focusing the card
 * pauses it, and the launcher chip keeps every card one tap away afterwards.
 */
export const ANNOUNCEMENT_AUTO_HIDE_MS = 20000;
/** Auto-advance interval for the carousel. */
const SLIDE_INTERVAL_MS = 7000;
/** Must stay in step with the `popupSlideOut` animation in index.css. */
const EXIT_MS = 260;

/**
 * `idle`  - nothing on screen (before the first appearance, or closed for the session)
 * `card`  - the announcement card is showing
 * `chip`  - the card folded away into the small launcher button next to the FABs
 */
type Phase = 'idle' | 'card' | 'chip';

const readDismissed = (): string[] => {
  try {
    const raw = window.sessionStorage.getItem(ANNOUNCEMENT_DISMISS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
};

const writeDismissed = (ids: string[]) => {
  try {
    window.sessionStorage.setItem(ANNOUNCEMENT_DISMISS_KEY, JSON.stringify(ids));
  } catch {
    // Private-mode browsers can refuse sessionStorage; the popup simply returns
    // on the next page load, which is the pre-existing behaviour anyway.
  }
};

/** `yyyy-mm-dd` for today, so the date window compares as plain strings. */
const today = (): string => new Date().toISOString().slice(0, 10);

/** A post is live when it is active and today falls inside its date window. */
const isLive = (post: AnnouncementPost, now: string): boolean => {
  if (!post.active) return false;
  if (post.startDate && post.startDate > now) return false;
  if (post.endDate && post.endDate < now) return false;
  return true;
};

/**
 * The bottom-right announcement popup.
 *
 * It behaves like a notification rather than a panel: it slides in once after a
 * short delay on the first page of a visit, sits at the bottom-right corner for
 * `ANNOUNCEMENT_AUTO_HIDE_MS` (a thin bar counts the time down, and hovering or
 * focusing it pauses the countdown), then folds away and leaves a small
 * "Announcements" chip next to the floating action
 * stack so the same cards stay one tap away. Closing the card proper writes to
 * sessionStorage, so it does not return during that visit.
 *
 * Whenever the card is up, the floating action stack raises its own z-index, so
 * WhatsApp, Apply Now, the AI assistant and back-to-top all stay clickable.
 */
export const AnnouncementPopup: React.FC = () => {
  const {
    language,
    theme,
    announcements,
    currentPage,
    setIsAnnouncementOpen,
  } = useApp();
  const isBn = language === 'bn';

  const [dismissed, setDismissed] = useState<string[]>(() => readDismissed());
  const [phase, setPhase] = useState<Phase>('idle');
  const [index, setIndex] = useState(0);
  /** Time left before the card folds away; not reset by re-renders, only by `expand`. */
  const [remaining, setRemaining] = useState(ANNOUNCEMENT_AUTO_HIDE_MS);
  const [paused, setPaused] = useState(false);
  /** True while the card plays its exit animation, just before it unmounts. */
  const [leaving, setLeaving] = useState(false);
  const folding = useRef(false);
  const exitTimer = useRef<number | null>(null);

  const cardUp = phase === 'card';

  /** Posts that are live right now and were not dismissed in this session. */
  const queue = useMemo(() => {
    const now = today();
    return announcements
      .filter((post) => isLive(post, now) && !dismissed.includes(post.id))
      .sort((a, b) => a.order - b.order);
  }, [announcements, dismissed]);

  // Appear once per session, after a short delay. The editor page is skipped so
  // staff can work on the popup without it covering their own screen.
  useEffect(() => {
    if (queue.length === 0 || currentPage === 'admin-popups') {
      setPhase('idle');
      return;
    }
    if (phase !== 'idle') return;
    const timer = window.setTimeout(() => {
      setRemaining(ANNOUNCEMENT_AUTO_HIDE_MS);
      setPhase('card');
    }, ANNOUNCEMENT_APPEAR_DELAY_MS);
    return () => window.clearTimeout(timer);
    // Re-arm only when the queue first appears or the page changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue.length > 0, currentPage, phase]);

  // Report visibility so the floating action stack can keep itself on top.
  useEffect(() => {
    setIsAnnouncementOpen(cardUp);
    return () => setIsAnnouncementOpen(false);
  }, [cardUp, setIsAnnouncementOpen]);

  // The countdown that eventually folds the card away. Pausing (hover / focus)
  // banks the time that is left, so the card never vanishes while being read.
  useEffect(() => {
    if (!cardUp || paused || leaving) return;
    const started = Date.now();
    const timer = window.setTimeout(() => foldTo('chip'), remaining);
    return () => {
      window.clearTimeout(timer);
      setRemaining((left) => Math.max(0, left - (Date.now() - started)));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardUp, paused, leaving, remaining]);

  // Clear a pending exit animation if the whole component goes away.
  useEffect(
    () => () => {
      if (exitTimer.current) window.clearTimeout(exitTimer.current);
    },
    []
  );

  // Auto-advance the carousel while there is more than one card.
  useEffect(() => {
    if (!cardUp || queue.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % queue.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [cardUp, queue.length]);

  // Keep the index in range if the list shrinks under us.
  useEffect(() => {
    if (index >= queue.length) setIndex(0);
  }, [index, queue.length]);

  // Escape closes, from anywhere on the page. The card never takes focus on its
  // own: it is a notification, not a dialog, and stealing the caret out of the
  // site search box (or the staff editor) would be worse than the popup itself.
  useEffect(() => {
    if (!cardUp) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardUp, index]);

  /** Plays the exit animation, then parks the card in the given phase. */
  const foldTo = (next: Phase, after?: () => void) => {
    if (folding.current) return;
    folding.current = true;
    setLeaving(true);
    exitTimer.current = window.setTimeout(() => {
      folding.current = false;
      setLeaving(false);
      setPhase(next);
      after?.();
    }, EXIT_MS);
  };

  /** Dismisses every card currently in the queue for the rest of the visit. */
  const close = () => {
    const ids = queue.map((post) => post.id);
    foldTo('idle', () => {
      const next = Array.from(new Set([...readDismissed(), ...ids]));
      writeDismissed(next);
      setDismissed(next);
    });
  };

  const expand = () => {
    folding.current = false;
    setRemaining(ANNOUNCEMENT_AUTO_HIDE_MS);
    setPhase('card');
  };

  if (queue.length === 0) return null;

  const total = queue.length;
  const position = Math.min(index, queue.length - 1);
  const post = queue[position];
  const isExternal = post.link ? /^https?:\/\//i.test(post.link) : false;

  const linkClasses =
    'inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer';

  // Folded away: a single compact launcher next to the quick-action stack.
  if (phase === 'chip') {
    return (
      <aside
        aria-label={isBn ? 'ঘোষণা' : 'Announcements'}
        className="fixed z-40 right-3 sm:right-6 bottom-24 sm:bottom-52 animate-popup-in"
      >
        <button
          onClick={expand}
          title={isBn ? 'ঘোষণা দেখুন' : 'Show announcements'}
          className={`inline-flex items-center gap-2 pl-3 pr-3.5 py-2 rounded-full border shadow-xl backdrop-blur-md transition-all cursor-pointer hover:-translate-y-0.5 ${
            theme === 'dark'
              ? 'bg-[#0b1424]/95 border-emerald-500/30 text-emerald-300 shadow-black/40'
              : 'bg-white/95 border-emerald-200 text-emerald-700 shadow-[0_14px_34px_rgba(5,150,105,0.18)]'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span className="text-[11px] font-bold">{isBn ? 'ঘোষণা' : 'Announcements'}</span>
          <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
            {total}
          </span>
        </button>
      </aside>
    );
  }

  if (phase !== 'card') return null;

  return (
    <aside
      aria-label={isBn ? 'ঘোষণা' : 'Announcements'}
      // Anchored to the corner, just above the quick-action stack, and only a
      // couple of hundred pixels tall, so it never reaches up into a page's
      // heading. It folds itself away after a few seconds in any case.
      className={`fixed z-40 right-3 sm:right-6 bottom-24 sm:bottom-52 w-[min(21rem,calc(100vw-1.5rem))] ${
        leaving ? 'popup-leave' : 'animate-popup-in'
      }`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div
        className={`relative rounded-3xl border overflow-hidden shadow-2xl ${
          theme === 'dark'
            ? 'bg-[#0b1424]/95 border-emerald-500/30 backdrop-blur-md shadow-black/50'
            : 'bg-white/95 border-emerald-200 backdrop-blur-md shadow-[0_18px_50px_rgba(5,150,105,0.18)]'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between gap-2 px-3.5 py-1.5 border-b ${
            theme === 'dark' ? 'border-white/10' : 'border-emerald-100'
          }`}
        >
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <Bell className="w-3.5 h-3.5" />
            {post.category === 'sister-concern'
              ? isBn ? 'সিস্টার কনসার্ন কোর্স' : 'Sister-concern courses'
              : isBn ? 'ঘোষণা' : 'Announcement'}
          </span>
          <span className="flex items-center gap-1">
            <button
              onClick={() => foldTo('chip')}
              aria-label={isBn ? 'ঘোষণাটি ছোট করুন' : 'Minimise announcement'}
              title={isBn ? 'ছোট করুন (সাথে সাথেই বন্ধ হয়ে যাবে)' : 'Minimise (it was about to close anyway)'}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-emerald-50'
              }`}
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={close}
              aria-label={isBn ? 'ঘোষণা বন্ধ করুন' : 'Close announcement'}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-emerald-50'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </span>
        </div>

        {/* Card body: thumbnail beside the copy keeps the card short. */}
        <div className="flex gap-3 p-3 min-h-[4.5rem]">
          {post.image && (
            <div className="w-20 sm:w-24 shrink-0 self-stretch rounded-xl overflow-hidden bg-emerald-950/20">
              <img
                src={post.image}
                alt={isBn ? post.title.bn : post.title.en}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          <div className="min-w-0 flex-1 space-y-1.5">
            <h3 className={`font-heading font-bold text-[13px] leading-snug line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
              {isBn ? post.title.bn : post.title.en}
            </h3>
            {/* Short windows (a 768px-tall laptop, for instance) drop the standfirst
                so the card stays clear of the page heading above it. */}
            <p className={`text-[11px] leading-snug line-clamp-2 [@media(max-height:820px)]:hidden ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              {isBn ? post.description.bn : post.description.en}
            </p>

            {post.link && (
              <a
                href={post.link}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={isExternal ? undefined : () => foldTo('chip')}
                className={linkClasses}
              >
                <span>
                  {post.linkLabel
                    ? isBn ? post.linkLabel.bn : post.linkLabel.en
                    : isBn ? 'বিস্তারিত' : 'Learn more'}
                </span>
                {isExternal ? <ExternalLink className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
              </a>
            )}
          </div>
        </div>

        {/* Carousel controls */}
        {total > 1 && (
          <div
            className={`flex items-center justify-between gap-3 px-3.5 py-1.5 border-t ${
              theme === 'dark' ? 'border-white/10' : 'border-emerald-100'
            }`}
          >
            <button
              onClick={() => setIndex((prev) => (prev - 1 + total) % total)}
              aria-label={isBn ? 'আগের ঘোষণা' : 'Previous announcement'}
              className={`p-1 rounded-lg cursor-pointer transition-colors ${
                theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-emerald-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5" role="tablist">
              {queue.map((item, slot) => (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={slot === position}
                  aria-label={`${isBn ? 'ঘোষণা' : 'Announcement'} ${slot + 1}`}
                  onClick={() => setIndex(slot)}
                  className={`rounded-full transition-all cursor-pointer ${
                    slot === position
                      ? 'w-5 h-1.5 bg-emerald-500'
                      : theme === 'dark'
                        ? 'w-1.5 h-1.5 bg-slate-600 hover:bg-slate-400'
                        : 'w-1.5 h-1.5 bg-emerald-300 hover:bg-emerald-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setIndex((prev) => (prev + 1) % total)}
              aria-label={isBn ? 'পরের ঘোষণা' : 'Next announcement'}
              className={`p-1 rounded-lg cursor-pointer transition-colors ${
                theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-emerald-50'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Countdown to the auto-fold: it parks itself out of the way, the card
            is always one tap away in the launcher chip. */}
        <span
          aria-hidden="true"
          className="popup-countdown absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-emerald-500 to-yellow-400"
          style={
            {
              '--popup-countdown-ms': `${ANNOUNCEMENT_AUTO_HIDE_MS}ms`,
              '--popup-countdown-play': paused ? 'paused' : 'running',
            } as React.CSSProperties
          }
        />
      </div>
    </aside>
  );
};
