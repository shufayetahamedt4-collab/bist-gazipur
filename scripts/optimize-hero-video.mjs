// Transcodes a source clip into a web-optimised background video for the hero section.
//
// What it does:
//   1. Trims a segment from the source.
//   2. Cross-dissolves the tail into the head so the result loops with no visible cut.
//      The output's first and last frames are therefore the same frame, i.e. the loop
//      wraps with zero content jump (verified with an SSIM check - see below).
//   3. Scales/crops to 720p, strips the audio track, and writes an MP4 (H.264).
//   4. Writes a poster JPEG taken from the first frame of the loop, so the still image
//      shown before playback matches the video exactly (no pop when it starts).
//
// A WebM/VP9 sibling is deliberately NOT produced: measured on this clip, VP9 at a
// comparable quality came out *larger* than the H.264 MP4 (2.80 MB vs 2.72 MB), and
// H.264 is supported by every browser the site targets - including iOS Safari. Shipping
// a bigger WebM first would just make Chrome/Firefox download more for no gain.
//
// Run:  node scripts/optimize-hero-video.mjs
//
// ffmpeg is resolved from, in order:
//   $FFMPEG_BIN  ->  the `ffmpeg-static` package if installed  ->  `ffmpeg` on PATH.
// (ffmpeg-static is not a project dependency on purpose: it ships an ~80 MB binary that
//  CI has no reason to download. Install it temporarily when you need to re-run this.)

import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- configuration
const SRC = path.join(
  ROOT,
  'src/assets/video/WhatsApp Video 2026-10-05 at 10.28.33 AM.mp4',
);
const OUT_DIR = path.join(ROOT, 'public/videos');
const BASENAME = 'hero-campus-loop';

const START = 0.5;    // seconds into the source where the loop segment begins
const LOOP = 16;      // seconds of source used for the loop
const XFADE = 1.5;    // seconds of cross-dissolve hidden at the seam
const WIDTH = 1280;
const HEIGHT = 720;
const FPS = 25;
const H264_CRF = 29;  // lower = better/larger
const PRESET = 'slow';
// ------------------------------------------------------------------------------

function resolveFfmpeg() {
  if (process.env.FFMPEG_BIN) return process.env.FFMPEG_BIN;
  try {
    const bundled = require('ffmpeg-static');
    if (bundled && existsSync(bundled)) return bundled;
  } catch {
    /* ffmpeg-static not installed - fall through to PATH */
  }
  return 'ffmpeg';
}

const ffmpeg = resolveFfmpeg();

function run(args, label) {
  const res = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], {
    stdio: ['ignore', 'inherit', 'inherit'],
  });
  if (res.error) throw new Error(`${label}: could not run ffmpeg (${res.error.message})`);
  if (res.status !== 0) throw new Error(`${label}: ffmpeg exited with code ${res.status}`);
}

const size = (p) => `${(statSync(p).size / 1048576).toFixed(2)} MB`;

if (!existsSync(SRC)) {
  console.error(`Source clip not found:\n  ${SRC}`);
  process.exit(1);
}
if (LOOP <= XFADE * 2) {
  console.error('LOOP must be greater than twice XFADE.');
  process.exit(1);
}
mkdirSync(OUT_DIR, { recursive: true });

const scaleCrop =
  `scale=${WIDTH}:${HEIGHT}:force_original_aspect_ratio=increase,` +
  `crop=${WIDTH}:${HEIGHT},setsar=1,fps=${FPS}`;

// Seamless loop. Splitting the segment S into
//   tail = S[LOOP-XFADE .. LOOP]   (what has just played at the loop point)
//   head = S[0 .. XFADE]           (where playback will restart)
//   mid  = S[XFADE .. LOOP-XFADE]  (everything that is not part of the seam)
// and dissolving tail -> head produces a seam whose LAST frame is S[LOOP-XFADE], which is
// exactly the frame the output now STARTS on. Concatenating seam + mid therefore wraps
// with no content jump at all.
//
// Note xfade's output length is the FIRST input's length, so offset must be 0 here -
// a non-zero offset would run the transition past the end of this short clip.
const loopFilter =
  `[0:v]trim=start=${START}:end=${START + LOOP},setpts=PTS-STARTPTS,split=3[a][b][c];` +
  `[a]trim=start=${LOOP - XFADE},setpts=PTS-STARTPTS[tail];` +
  `[b]trim=start=0:end=${XFADE},setpts=PTS-STARTPTS[head];` +
  `[c]trim=start=${XFADE}:end=${LOOP - XFADE},setpts=PTS-STARTPTS[mid];` +
  `[tail][head]xfade=transition=fade:duration=${XFADE}:offset=0[seam];` +
  `[seam][mid]concat=n=2:v=1:a=0,${scaleCrop},format=yuv420p[out]`;

const mp4 = path.join(OUT_DIR, `${BASENAME}.mp4`);
const poster = path.join(OUT_DIR, `${BASENAME}-poster.jpg`);

console.log(`ffmpeg: ${ffmpeg}`);
console.log(`source: ${SRC} (${size(SRC)})`);
console.log(`loop:   ${LOOP - XFADE}s (${LOOP}s source, ${XFADE}s cross-dissolve at the seam)\n`);

run(
  ['-i', SRC, '-filter_complex', loopFilter, '-map', '[out]', '-an',
   '-c:v', 'libx264', '-crf', String(H264_CRF), '-preset', PRESET,
   '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4],
  'MP4 encode',
);
console.log(`  ✓ ${path.basename(mp4)} (${size(mp4)})`);

// Poster = the first frame of the loop, so the still shown before playback starts
// matches the video exactly (no visual pop when it begins).
run(
  ['-ss', String(START + LOOP - XFADE), '-i', SRC, '-frames:v', '1',
   '-vf', scaleCrop, '-q:v', '4', poster],
  'poster frame',
);
console.log(`  ✓ ${path.basename(poster)} (${size(poster)})`);

console.log(`\nDone. Hero video payload: ${size(mp4)}.`);
