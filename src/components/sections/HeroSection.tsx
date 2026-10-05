import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Compass, Sparkles, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HeroCanvas } from '../hero/HeroCanvas';
import { HeroWaveOverlay } from '../hero/HeroWaveOverlay';
import { UNIVERSITY_INFO } from '../../data/mockData';
import {
  REDUCED_MOTION_QUERY,
  readHeroVideoSignals,
  shouldPlayHeroVideo,
} from '../../lib/heroBackground';

type TaglineDirection = 'up' | 'left' | 'right';

interface HeroTagline {
  id: number;
  lead: string;
  accent: string;
  tail: string;
  direction: TaglineDirection;
}

// One phrase per entry. `accent` is the word that gets the green-to-gold gradient.
// Directions alternate so the sequence reads as a series of pop-ups rather than a list:
// 1 & 3 rise from the bottom, 2 slides in from the left, 4 from the right.
const HERO_TAGLINES: HeroTagline[] = [
  { id: 1, lead: 'Empowering', accent: 'Success', tail: '!', direction: 'up' },
  { id: 2, lead: '', accent: 'Excellence', tail: ' in Education.', direction: 'left' },
  { id: 3, lead: 'Unleashing', accent: 'Potential', tail: '.', direction: 'up' },
  { id: 4, lead: 'Join us for a', accent: 'brighter future', tail: '.', direction: 'right' },
];

const TAGLINE_INTERVAL_MS = 3000;

/**
 * Four phrases that take turns popping up over the hero video, one every 3s, forever.
 * The entrance/hold/exit choreography lives entirely in the CSS keyframes (see index.css),
 * so this component only has to advance an index - which also means the whole thing
 * degrades to a plain cross-fade for `prefers-reduced-motion` visitors.
 */
const HeroTaglines: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % HERO_TAGLINES.length),
      TAGLINE_INTERVAL_MS,
    );
    return () => window.clearInterval(timer);
  }, []);

  const active = HERO_TAGLINES[index];

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none flex w-full flex-col items-center justify-center"
    >
      <div className="hero-tagline-glow w-full">
        <div
          key={active.id}
          className={`hero-tagline hero-tagline-in-${active.direction} mx-auto max-w-[92vw] text-balance text-center font-heading font-extrabold leading-[1.04] tracking-[-0.02em] text-[clamp(2rem,5.5vw,4.75rem)] text-white`}
        >
          {active.lead && <span className="text-white/95">{active.lead} </span>}
          <span className="hero-tagline-accent">{active.accent}</span>
          <span className="text-white/95">{active.tail}</span>
        </div>
      </div>

      {/* Progress indicator: four rails, the active one stretches and glows */}
      <div aria-hidden="true" className="mt-8 flex items-center justify-center gap-1.5">
        {HERO_TAGLINES.map((tagline, i) => (
          <span
            key={tagline.id}
            className={
              i === index
                ? 'h-[2px] w-10 rounded-full bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 shadow-[0_0_12px_rgba(16,185,129,0.85)] transition-all duration-500'
                : 'h-[2px] w-5 rounded-full bg-white/20 transition-all duration-500'
            }
          />
        ))}
      </div>
    </div>
  );
};

export const HeroSection: React.FC = () => {
  const { language, navigateTo, setIsQuizOpen, theme } = useApp();
  const isBn = language === 'bn';

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Moving backgrounds are skipped for anyone who asked for reduced motion, for
  // data-saver connections, and on small screens - those visitors keep the still image.
  const [playBackgroundVideo, setPlayBackgroundVideo] = useState(false);

  // Live countdown state for admission deadline
  const [timeLeft, setTimeLeft] = useState({
    days: 28,
    hours: 14,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    const decide = () =>
      setPlayBackgroundVideo(shouldPlayHeroVideo(readHeroVideoSignals(window)));

    decide();
    motionQuery.addEventListener('change', decide);
    window.addEventListener('resize', decide);
    return () => {
      motionQuery.removeEventListener('change', decide);
      window.removeEventListener('resize', decide);
    };
  }, []);

  // Slow the footage down slightly for a calmer, more cinematic drift, and only run the
  // loop while the hero is on screen and the tab is visible - an endlessly decoding
  // background video is otherwise a real battery/CPU cost.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !playBackgroundVideo) return;

    video.muted = true; // required for autoplay to be allowed at all
    const applyRate = () => {
      video.playbackRate = 0.8;
    };
    applyRate();
    video.addEventListener('loadedmetadata', applyRate);

    const play = () => {
      void video.play().catch(() => {
        /* autoplay blocked or interrupted - the poster stays visible, which is fine */
      });
    };
    const onVisibility = () => (document.hidden ? video.pause() : play());
    document.addEventListener('visibilitychange', onVisibility);

    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== 'undefined' && sectionRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? play() : video.pause()),
        { threshold: 0.05 },
      );
      observer.observe(sectionRef.current);
    } else {
      play();
    }

    return () => {
      video.removeEventListener('loadedmetadata', applyRate);
      document.removeEventListener('visibilitychange', onVisibility);
      observer?.disconnect();
    };
  }, [playBackgroundVideo]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[94vh] flex flex-col justify-between pt-8 pb-10 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background campus layer: a looping admissions film with a still underneath it.
          The still is the original campus photograph, which is what reduced-motion,
          data-saver and small-screen visitors get instead of the moving background.
          Both sit inside the same drifting wrapper so they stay perfectly aligned. */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 hero-drone-drift">
          <img
            src="./images/campus-building-wide.webp"
            alt="BGIFT Institute of Science & Technology campus building, Chandona Chowrasta, Gazipur"
            className="absolute inset-0 w-full h-full object-cover object-[62%_30%] sm:object-center"
          />

          {/* No opacity fade here on purpose: the video shows its own `poster` (its exact
              first frame) until playback starts, so there is never a black frame to hide. */}
          {playBackgroundVideo && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="./videos/hero-campus-loop-poster.jpg"
              aria-hidden="true"
              tabIndex={-1}
              className="absolute inset-0 w-full h-full object-cover object-[62%_30%] sm:object-center"
              style={{ filter: 'saturate(1.05) contrast(1.04)' }}
            >
              <source src="./videos/hero-campus-loop.mp4" type="video/mp4" />
            </video>
          )}
        </div>

        {/* Dynamic Gentle Wave Effect Overlay that follows Mouse Cursor */}
        <HeroWaveOverlay />

        {/* Subtle dark gradient wash over the footage - the only thing keeping the copy
            readable now that it sits straight on the video. It is a wash, not a panel:
            no edge, no fill, nothing that could read as a card behind the hero text. */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.5) 100%)',
          }}
        />

        {/* Ambient Corner Vignette for Depth */}
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/35 pointer-events-none" />

        {/* Subtle Cybernetic Grid Overlay */}
        <div className="absolute inset-0 cyber-grid-light opacity-10 pointer-events-none" />

        {/* Gentle Color Blooms */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[380px] h-[260px] bg-yellow-400/10 rounded-full blur-[90px] pointer-events-none" />
      </div>

      {/* 3D / WebGL particle canvas background floating gently over the photo */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-45">
        <HeroCanvas />
      </div>

      {/* Main Hero Content - sits directly on the video: no card, no blur, no border */}
      <div className="relative z-10 max-w-4xl mx-auto text-center my-auto pt-4 pointer-events-auto space-y-6">
          {/* Rotating pop-up taglines - the hero centrepiece, straight on the video */}
          <HeroTaglines />

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1">
            <button
              onClick={() => navigateTo('apply-online')}
              className="group px-7 py-3.5 rounded-xl font-heading font-bold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-emerald-500 via-emerald-400 to-yellow-400 hover:from-emerald-600 hover:to-yellow-500 shadow-xl shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{isBn ? 'এখনই আবেদন করুন' : 'Apply Now for 2025-26'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateTo('programs')}
              className="px-6 py-3.5 rounded-xl font-heading font-bold text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer text-white bg-white/5 hover:bg-white/15 border border-white/40 hover:border-white/80 backdrop-blur-sm hover:shadow-[0_0_28px_rgba(255,255,255,0.28)]"
            >
              <Compass className="w-4 h-4 text-emerald-300" />
              <span>{isBn ? 'প্রোগ্রামসমূহ দেখুন' : 'Explore Programs'}</span>
            </button>

            <button
              onClick={() => setIsQuizOpen(true)}
              className="px-4 py-3.5 rounded-xl font-heading text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer text-white bg-white/5 hover:bg-white/15 border border-white/40 hover:border-white/80 backdrop-blur-sm hover:shadow-[0_0_28px_rgba(255,255,255,0.28)]"
              title="Interactive Career & Program Finder Quiz"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{isBn ? 'ক্যারিয়ার কুইজ' : 'Find Your Major Quiz'}</span>
            </button>
          </div>
        </div>

      {/* Glass Strip Below: Admissions Open 2025-26 & Live Countdown Badge */}
      <div className="relative z-10 max-w-4xl mx-auto w-full pt-8 pointer-events-auto">
        <div
          className={`rounded-2xl p-3 sm:p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md border ${
            theme === 'dark'
              ? 'glass-panel bg-slate-900/90 border-white/10'
              : 'bg-white/95 border-emerald-200 shadow-[0_8px_30px_rgba(5,150,105,0.08)]'
          }`}
        >
          {/* Left badge */}
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                theme === 'dark'
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  : 'bg-emerald-100 text-emerald-700 border-emerald-300'
              }`}
            >
              <Calendar className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {isBn ? 'ভর্তি চলছে সেশন ২০২৫-২৬' : 'Admissions Open 2025-26'}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {isBn ? 'সক্রিয়' : 'Active'}
                </span>
              </div>
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                {isBn
                  ? 'সিএসই, টিএসটি, এএমটি, এফডিটি এবং প্রফেশনাল বিবিএ'
                  : 'B.Sc. Hon’s in CSE, TST, AMT, FDT & Professional BBA'}
              </p>
            </div>
          </div>

          {/* Right: Live Countdown Counter */}
          <div className="flex items-center gap-2 sm:gap-3 text-center">
            <div
              className={`text-[11px] font-medium hidden md:block text-right pr-1 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              <span>{isBn ? 'আবেদনের সময়সীমা:' : 'Application Window:'}</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <div
                className={`px-2 py-1.5 rounded-lg min-w-[38px] border ${
                  theme === 'dark'
                    ? 'bg-black/50 border-white/10 text-emerald-400'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}
              >
                <span className="text-sm font-bold">{timeLeft.days}</span>
                <span className="block text-[9px] uppercase opacity-70">{isBn ? 'দিন' : 'd'}</span>
              </div>
              <span className="text-emerald-500 font-bold">:</span>
              <div
                className={`px-2 py-1.5 rounded-lg min-w-[38px] border ${
                  theme === 'dark' ? 'bg-black/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <span className="text-sm font-bold">{timeLeft.hours}</span>
                <span className="block text-[9px] uppercase opacity-70">{isBn ? 'ঘণ্টা' : 'h'}</span>
              </div>
              <span className="text-emerald-500 font-bold">:</span>
              <div
                className={`px-2 py-1.5 rounded-lg min-w-[38px] border ${
                  theme === 'dark' ? 'bg-black/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <span className="text-sm font-bold">{timeLeft.minutes}</span>
                <span className="block text-[9px] uppercase opacity-70">{isBn ? 'মিনিট' : 'm'}</span>
              </div>
              <span className="text-emerald-500 font-bold">:</span>
              <div
                className={`px-2 py-1.5 rounded-lg min-w-[38px] border ${
                  theme === 'dark'
                    ? 'bg-black/50 border-white/10 text-yellow-400'
                    : 'bg-yellow-50 border-yellow-200 text-yellow-800'
                }`}
              >
                <span className="text-sm font-bold">{timeLeft.seconds}</span>
                <span className="block text-[9px] uppercase opacity-70">{isBn ? 'সেকেন্ড' : 's'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
