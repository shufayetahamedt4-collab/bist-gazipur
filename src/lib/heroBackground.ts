/**
 * Decides whether the hero section runs its looping background video.
 *
 * This lives outside the component so the fallback rules can be unit-tested directly.
 * Visitors who ask for reduced motion, are on a data-saver connection, or are on a small
 * screen get the still campus photograph instead of the moving background.
 */

/** Below this viewport width the hero keeps the still image rather than the video. */
export const HERO_VIDEO_MIN_VIEWPORT = 640;

/** The media feature that disables the moving background. */
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/** The plain inputs the decision depends on. */
export interface HeroVideoSignals {
  /** True when `(prefers-reduced-motion: reduce)` matches. */
  prefersReducedMotion: boolean;
  /** True when `navigator.connection.saveData` is set. */
  saveData: boolean;
  /** `window.innerWidth`, in CSS pixels. */
  viewportWidth: number;
}

/** True when the hero should play its background video for these signals. */
export function shouldPlayHeroVideo(signals: HeroVideoSignals): boolean {
  if (signals.prefersReducedMotion) return false;
  if (signals.saveData) return false;
  return signals.viewportWidth >= HERO_VIDEO_MIN_VIEWPORT;
}

/**
 * Reads the current signals from a window. `navigator.connection` is non-standard (absent
 * in Firefox and Safari), so it is read defensively rather than assumed to exist.
 */
export function readHeroVideoSignals(win: Window): HeroVideoSignals {
  const connection = (win.navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;

  return {
    prefersReducedMotion: win.matchMedia(REDUCED_MOTION_QUERY).matches,
    saveData: connection?.saveData === true,
    viewportWidth: win.innerWidth,
  };
}
