import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass, Sparkles, Clock, Calendar, CheckCircle2, Waves } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HeroCanvas } from '../hero/HeroCanvas';
import { HeroWaveOverlay } from '../hero/HeroWaveOverlay';
import { UNIVERSITY_INFO } from '../../data/mockData';

export const HeroSection: React.FC = () => {
  const { language, navigateTo, setIsQuizOpen, theme } = useApp();
  const isBn = language === 'bn';

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

  return (
    <section className="relative min-h-[94vh] flex flex-col justify-between pt-8 pb-10 px-4 sm:px-6 overflow-hidden">
      {/* Background Campus Image Layer - High Visibility with Active 2s Wave Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="./images/campus-building-wide.webp"
          alt="BGIFT Institute of Science & Technology campus building, Chandona Chowrasta, Gazipur"
          className="w-full h-full object-cover object-center scale-[1.02] transition-all duration-700 cursor-wave-gentle"
        />

        {/* Dynamic Gentle Wave Effect Overlay that follows Mouse Cursor */}
        <HeroWaveOverlay />

        {/* Balanced Ambient Gradient Overlay - Engineered for high photo visibility while preserving readability */}
        <div
          className={`absolute inset-0 transition-colors duration-300 pointer-events-none ${
            theme === 'dark'
              ? 'bg-gradient-to-b from-[#070b1a]/45 via-[#070b1a]/15 to-[#070b1a]/85'
              : 'bg-gradient-to-b from-white/35 via-white/10 to-[#f8fafc]/80'
          }`}
        />

        {/* Ambient Corner Vignettes for Depth (lighter on pale light-mode art) */}
        <div className={`absolute inset-0 bg-radial from-transparent via-transparent pointer-events-none ${
          theme === 'dark' ? 'to-black/25' : 'to-black/10'
        }`} />

        {/* Subtle Cybernetic Grid Overlay */}
        <div
          className={`absolute inset-0 cyber-grid-light pointer-events-none ${
            theme === 'dark' ? 'opacity-15' : 'opacity-20'
          }`}
        />

        {/* Gentle Color Blooms */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[380px] h-[260px] bg-yellow-400/10 rounded-full blur-[90px] pointer-events-none" />
      </div>

      {/* 3D / WebGL particle canvas background floating gently over the photo */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-45">
        <HeroCanvas />
      </div>

      {/* Main Hero Content - Protected with Frosted Glass Container for High Readability */}
      <div className="relative z-10 max-w-4xl mx-auto text-center my-auto pt-4 pointer-events-auto">
        <div
          className={`rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6 transition-all border ${
            theme === 'dark'
              ? 'bg-slate-950/80 border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.6)]'
              : 'bg-white/85 border-white/80 shadow-[0_20px_50px_rgba(5,150,105,0.12)]'
          }`}
        >
          {/* Affiliation Sub-line Tag */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs transition-colors shadow-sm ${
              theme === 'dark'
                ? 'bg-slate-900/90 border border-emerald-500/40 text-emerald-300'
                : 'bg-white border border-emerald-300 text-emerald-950 shadow-[0_2px_12px_rgba(5,150,105,0.12)]'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-bold">
              {isBn
                ? 'জাতীয় বিশ্ববিদ্যালয়, বিটিইবি এবং এনএসডিএ অনুমোদিত'
                : 'Affiliated with National University, BTEB & NSDA'}
            </span>
            <span className="text-emerald-500 hidden sm:inline font-bold">|</span>
            <span className="font-mono text-emerald-700 dark:text-emerald-300 font-bold hidden sm:inline">
              NU Code: 5526 · BTEB Code: 53098
            </span>
          </div>

          {/* Dynamic Futuristic Main Headline */}
          <h1
            className={`font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] max-w-3xl mx-auto drop-shadow-sm ${
              theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
            }`}
          >
            {isBn ? (
              <>
                টেক্সটাইল, প্রযুক্তি ও ব্যবসায়{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500">
                  নিজের ভবিষ্যৎ
                </span>{' '}
                গড়ুন
              </>
            ) : (
              <>
                Engineer Your Future in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500">
                  Textile, Tech & Business
                </span>
              </>
            )}
          </h1>

          {/* Subtitle with High Contrast */}
          <p
            className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium ${
              theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
            }`}
          >
            {isBn
              ? 'গাজীপুরের প্রাণকেন্দ্রে আধুনিক ল্যাবরেটরি, শিল্প-অভিজ্ঞ শিক্ষক এবং শতভাগ স্কলারশিপ সুবিধায় গড়ে উঠুন ভবিষ্যতের স্মার্ট প্রফেশনাল হিসেবে।'
              : 'Gazipur’s leading technological higher education institute providing premier 4-year Honours & Engineering degrees, advanced research labs, and dedicated industrial placement.'}
          </p>

          {/* Wave ripple indicator badge */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            <Waves className="w-3.5 h-3.5 animate-pulse" />
            <span>
              {isBn
                ? 'স্মার্ট ক্যাম্পাস · মাউস কার্সার ও টাচে মৃদু ওয়েব তরঙ্গের ঢেউ'
                : 'Smart Campus · Gentle Cursor & Touch Wave Ripple'}
            </span>
          </div>

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
              className={`px-6 py-3.5 rounded-xl font-heading font-bold text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer ${
                theme === 'dark'
                  ? 'text-white hover:text-emerald-300 bg-slate-900/90 hover:bg-slate-800 border border-white/20'
                  : 'text-slate-900 hover:text-emerald-950 bg-white hover:bg-emerald-50 border border-emerald-300 shadow-md'
              }`}
            >
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>{isBn ? 'প্রোগ্রামসমূহ দেখুন' : 'Explore Programs'}</span>
            </button>

            <button
              onClick={() => setIsQuizOpen(true)}
              className={`px-4 py-3.5 rounded-xl font-heading text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                theme === 'dark'
                  ? 'text-yellow-300 hover:text-yellow-200 bg-yellow-950/80 border border-yellow-500/40'
                  : 'text-yellow-950 hover:text-yellow-900 bg-yellow-100/90 hover:bg-yellow-200 border border-yellow-400 shadow-md'
              }`}
              title="Interactive Career & Program Finder Quiz"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{isBn ? 'ক্যারিয়ার কুইজ' : 'Find Your Major Quiz'}</span>
            </button>
          </div>
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
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
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
