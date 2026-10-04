import React from 'react';
import { Users, Sparkles, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { STUDENT_LIFE_ITEMS } from '../../data/mockData';
import { FacilityGrid } from '../sections/FacilityGrid';

export const StudentLifePage: React.FC = () => {
  const { language, navigateTo } = useApp();
  const isBn = language === 'bn';

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-10">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-400 text-xs font-semibold">
          <Users className="w-3.5 h-3.5" />
          <span>{isBn ? 'শিক্ষার্থী জীবন' : 'Student Life'}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isBn ? 'ক্যাম্পাসে শিক্ষার্থী জীবন' : 'Life on Campus'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {isBn
            ? 'খেলাধুলা, ক্লাব, আবাসন, পরিবহন ও শিক্ষার্থী সহায়তা।'
            : 'Sports, clubs, residential support, transport and student welfare.'}
        </p>
      </div>

      <FacilityGrid items={STUDENT_LIFE_ITEMS} accent="text-sky-600 dark:text-sky-400" />

      <div className="p-5 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <h2 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
            {isBn ? 'আরও দেখুন' : 'See also'}
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {isBn
            ? 'ক্যাম্পাসের ল্যাব ও অন্যান্য সুবিধার বিস্তারিত ক্যাম্পাস সুবিধা পেজে রয়েছে।'
            : 'Labs and other campus infrastructure are detailed on the Campus Facilities page.'}
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <button
            onClick={() => navigateTo('facilities')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{isBn ? 'ক্যাম্পাস সুবিধা' : 'Campus Facilities'}</span>
          </button>
          <button
            onClick={() => navigateTo('library')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{isBn ? 'লাইব্রেরি' : 'Library'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
