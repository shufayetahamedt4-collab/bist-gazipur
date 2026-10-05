import { describe, test } from 'node:test';
import assert from 'node:assert/strict';

import {
  HERO_VIDEO_MIN_VIEWPORT,
  REDUCED_MOTION_QUERY,
  readHeroVideoSignals,
  shouldPlayHeroVideo,
  type HeroVideoSignals,
} from '../src/lib/heroBackground';

function signals(overrides: Partial<HeroVideoSignals> = {}): HeroVideoSignals {
  return {
    prefersReducedMotion: false,
    saveData: false,
    viewportWidth: 1440,
    ...overrides,
  };
}

interface WindowOptions {
  prefersReducedMotion?: boolean;
  /** `undefined` models a connection that exists but does not report saveData. */
  saveData?: boolean;
  /** false models browsers without `navigator.connection` at all. */
  hasConnection?: boolean;
  viewportWidth?: number;
  /** Receives every media query the adapter asks about. */
  seenQueries?: string[];
}

/** Minimal stand-in for the browser globals the adapter reads. */
function fakeWindow(options: WindowOptions = {}): Window {
  const {
    prefersReducedMotion = false,
    saveData,
    hasConnection = true,
    viewportWidth = 1440,
    seenQueries,
  } = options;

  return {
    innerWidth: viewportWidth,
    matchMedia(query: string) {
      seenQueries?.push(query);
      return { matches: query === REDUCED_MOTION_QUERY ? prefersReducedMotion : false };
    },
    navigator: { connection: hasConnection ? { saveData } : undefined },
  } as unknown as Window;
}

describe('shouldPlayHeroVideo', () => {
  test('plays on an ordinary desktop with no constraints', () => {
    assert.equal(shouldPlayHeroVideo(signals()), true);
  });

  test('refuses to play when the visitor asked for reduced motion', () => {
    assert.equal(shouldPlayHeroVideo(signals({ prefersReducedMotion: true })), false);
  });

  test('reduced motion wins even on a large screen with no data saver', () => {
    assert.equal(
      shouldPlayHeroVideo(signals({ prefersReducedMotion: true, viewportWidth: 2560 })),
      false,
    );
  });

  test('refuses to play on a data-saver connection', () => {
    assert.equal(shouldPlayHeroVideo(signals({ saveData: true })), false);
  });

  test('data-saver wins even on a large screen with motion allowed', () => {
    assert.equal(shouldPlayHeroVideo(signals({ saveData: true, viewportWidth: 2560 })), false);
  });

  test(`does not play one pixel below the ${HERO_VIDEO_MIN_VIEWPORT}px breakpoint`, () => {
    assert.equal(
      shouldPlayHeroVideo(signals({ viewportWidth: HERO_VIDEO_MIN_VIEWPORT - 1 })),
      false,
    );
  });

  // Boundary guard: an off-by-one here would silently drop the video on tablets.
  test(`plays exactly at the ${HERO_VIDEO_MIN_VIEWPORT}px breakpoint`, () => {
    assert.equal(shouldPlayHeroVideo(signals({ viewportWidth: HERO_VIDEO_MIN_VIEWPORT })), true);
  });

  test('does not play at a phone-sized viewport', () => {
    assert.equal(shouldPlayHeroVideo(signals({ viewportWidth: 390 })), false);
  });

  // The component re-decides on resize through this same function, so narrowing the
  // viewport must flip the answer back to the still image.
  test('flips from play to still-image as the viewport narrows past the breakpoint', () => {
    assert.equal(shouldPlayHeroVideo(signals({ viewportWidth: 1024 })), true);
    assert.equal(shouldPlayHeroVideo(signals({ viewportWidth: 480 })), false);
  });

  test('combining every blocking signal still refuses to play', () => {
    assert.equal(
      shouldPlayHeroVideo(
        signals({ prefersReducedMotion: true, saveData: true, viewportWidth: 320 }),
      ),
      false,
    );
  });
});

describe('readHeroVideoSignals', () => {
  test('reads the viewport width straight through', () => {
    assert.equal(readHeroVideoSignals(fakeWindow({ viewportWidth: 812 })).viewportWidth, 812);
  });

  test('asks about exactly the reduced-motion media feature', () => {
    const seenQueries: string[] = [];
    readHeroVideoSignals(fakeWindow({ seenQueries }));

    assert.deepEqual(seenQueries, [REDUCED_MOTION_QUERY]);
  });

  test('reports reduced motion from the media query', () => {
    assert.equal(
      readHeroVideoSignals(fakeWindow({ prefersReducedMotion: true })).prefersReducedMotion,
      true,
    );
  });

  test('reports saveData from navigator.connection', () => {
    assert.equal(readHeroVideoSignals(fakeWindow({ saveData: true })).saveData, true);
  });

  test('treats a missing navigator.connection as no data saver', () => {
    assert.equal(readHeroVideoSignals(fakeWindow({ hasConnection: false })).saveData, false);
  });

  test('treats an unset saveData as no data saver', () => {
    assert.equal(readHeroVideoSignals(fakeWindow({ saveData: undefined })).saveData, false);
  });
});

describe('hero background end to end', () => {
  // Guards the wiring between the adapter and the decision, not just each half.
  test('a plain desktop window plays the video', () => {
    assert.equal(shouldPlayHeroVideo(readHeroVideoSignals(fakeWindow())), true);
  });

  test('a reduced-motion window keeps the still image', () => {
    assert.equal(
      shouldPlayHeroVideo(readHeroVideoSignals(fakeWindow({ prefersReducedMotion: true }))),
      false,
    );
  });

  test('a data-saver window keeps the still image', () => {
    assert.equal(
      shouldPlayHeroVideo(readHeroVideoSignals(fakeWindow({ saveData: true }))),
      false,
    );
  });

  test('a phone-sized window keeps the still image', () => {
    assert.equal(
      shouldPlayHeroVideo(readHeroVideoSignals(fakeWindow({ viewportWidth: 390 }))),
      false,
    );
  });
});
