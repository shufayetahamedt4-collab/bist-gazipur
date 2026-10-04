import React, { useMemo } from 'react';
import { ClipboardList, Download, FileText, Sparkles, ExternalLink, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { buildRoutines, fileTypeLabel } from '../../data/mockData';

export const AcademicRoutinesPage: React.FC = () => {
  const { language, noticesList } = useApp();
  const isBn = language === 'bn';

  const routines = useMemo(() => buildRoutines(noticesList), [noticesList]);

  return (
    <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto space-y-10">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isBn ? 'ক্লাস ও পরীক্ষার রুটিন' : 'Class & Exam Routines'}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isBn ? 'ক্লাস ও পরীক্ষার রুটিন' : 'Class & Exam Routines'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {isBn
            ? 'প্রতিষ্ঠান প্রকাশিত পরীক্ষা ও রুটিন ডাউনলোড করুন।'
            : 'Download examination and routine documents as published by the institution.'}
        </p>
      </div>

      <div className="space-y-3">
        {routines.length === 0 && (
          <div className="p-8 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 text-center text-sm text-slate-500 dark:text-slate-400">
            {isBn
              ? 'এখনো কোনো রুটিন প্রকাশিত হয়নি।'
              : 'No routines have been published yet.'}
          </div>
        )}

        {routines.map((routine) => (
          <div
            key={routine.id}
            className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-white/5 hover:border-teal-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                <ClipboardList className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {routine.date}
                </span>
                <h3 className="font-medium text-sm text-slate-900 dark:text-white leading-snug">
                  {isBn ? routine.title.bn : routine.title.en}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
                {fileTypeLabel(routine.fileType)}
              </span>
              <a
                href={routine.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-teal-500/20 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-300 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              >
                <Download className="w-4 h-4" />
                <span>{isBn ? 'ডাউনলোড' : 'Download'}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 space-y-2">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <h2 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
            {isBn ? 'রুটিন সম্পর্কে' : 'About routines'}
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {isBn
            ? 'প্রতিষ্ঠান রুটিন বোর্ড-ভিত্তিক নোটিশ আকারে প্রকাশ করে। এখানে শুধু প্রকৃত প্রকাশিত রুটিন তালিকাভুক্ত করা হয়েছে; নতুন প্রকাশিত হলে স্বয়ংক্রিয়ভাবে যুক্ত হবে।'
            : 'The institution publishes routines as board-wide circulars. Only genuinely published routines are listed here, and newly issued ones appear automatically once mirrored.'}
        </p>
        <a
          href="https://bist.edu.bd/notice"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>{isBn ? 'লাইভ সাইটে সব নোটিশ দেখুন' : 'Browse all notices on the official site'}</span>
        </a>
      </div>

      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
        <FileText className="w-3.5 h-3.5" />
        <span>{isBn ? `${routines.length}টি রুটিন` : `${routines.length} routines`}</span>
      </div>
    </div>
  );
};
