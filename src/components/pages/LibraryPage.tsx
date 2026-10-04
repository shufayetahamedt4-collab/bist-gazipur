import React from 'react';
import { BookOpen, Quote, Sparkles, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LIBRARY_FACILITIES, LIBRARY_QUOTES } from '../../data/mockData';
import { FacilityGrid } from '../sections/FacilityGrid';

export const LibraryPage: React.FC = () => {
  const { language } = useApp();
  const isBn = language === 'bn';

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-10">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isBn ? 'লাইব্রেরি ও ই-লাইব্রেরি' : 'Library & e-Library'}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isBn ? 'কেন্দ্রীয় লাইব্রেরি' : 'Central Library'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {isBn
            ? 'শিক্ষার্থী ও শিক্ষকদের জন্য বই, পড়ার কক্ষ ও ডিজিটাল অ্যাক্সেস।'
            : 'Books, reading space and digital access for students and faculty.'}
        </p>
      </div>

      {/* Real published quotes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {LIBRARY_QUOTES.map((quote, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 space-y-3"
          >
            <Quote className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic">
              “{isBn ? quote.bn : quote.en}”
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {isBn ? 'সূত্র: অফিসিয়াল ওয়েবসাইট' : 'Source: official website'}
            </p>
          </div>
        ))}
      </div>

      <FacilityGrid items={LIBRARY_FACILITIES} />

      <div className="p-5 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h2 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
            {isBn ? 'নোট' : 'A note on this page'}
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {isBn
            ? 'প্রতিষ্ঠান পূর্ণ ডিজিটাল লাইব্রেরি ক্যাটালগ এখনো অনলাইনে প্রকাশ করেনি, তাই এখানে কোনো বইয়ের সংখ্যা বা ই-লাইব্রেরি লিংক দেখানো হচ্ছে না।'
            : 'The institution has not yet published a full digital catalogue, so no book counts or e-library links are shown here to avoid stating anything unverified.'}
        </p>
        <a
          href="https://bist.edu.bd/gallery"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>{isBn ? 'গ্যালারিতে লাইব্রেরির ছবি দেখুন' : 'See library photos in the gallery'}</span>
        </a>
      </div>
    </div>
  );
};
