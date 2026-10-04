import React, { useMemo } from 'react';
import { CalendarDays, Download, Sparkles, ExternalLink, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { buildCalendarEntries } from '../../data/mockData';

const MONTH_ORDER = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const categoryTone: Record<string, string> = {
  examinations: 'bg-rose-500/10 text-rose-700 dark:text-rose-400',
  academic: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400',
  holidays: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  admissions: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  other: 'bg-slate-500/10 text-slate-600 dark:text-slate-300',
};

export const AcademicCalendarPage: React.FC = () => {
  const { language, noticesList } = useApp();
  const isBn = language === 'bn';

  const entries = useMemo(() => buildCalendarEntries(noticesList), [noticesList]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof entries>();
    entries.forEach((entry) => {
      const parts = entry.date.trim().split(' ');
      const key = parts.length >= 3 ? `${parts[1]} ${parts[2]}` : 'Other';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(entry);
    });
    return Array.from(map.entries()).sort((a, b) => {
      const [, ay] = a[0].split(' ');
      const [, by] = b[0].split(' ');
      if (ay !== by) return Number(by) - Number(ay);
      return MONTH_ORDER.indexOf(a[0].split(' ')[0]) - MONTH_ORDER.indexOf(b[0].split(' ')[0]);
    });
  }, [entries]);

  return (
    <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto space-y-10">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-xs font-semibold">
          <CalendarDays className="w-3.5 h-3.5" />
          <span>{isBn ? 'একাডেমিক ক্যালেন্ডার' : 'Academic Calendar'}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isBn ? 'একাডেমিক ক্যালেন্ডার' : 'Academic Calendar'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {isBn
            ? 'প্রতিষ্ঠান প্রকাশিত নোটিশ অনুসারে পরীক্ষা, ছুটি ও একাডেমিক কার্যক্রমের তারিখ।'
            : 'Examination, holiday and academic dates as published by the institution.'}
        </p>
      </div>

      {grouped.length === 0 && (
        <div className="p-8 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 text-center text-sm text-slate-500 dark:text-slate-400">
          {isBn ? 'এখনো কোনো তারিখ প্রকাশিত হয়নি।' : 'No published dates yet.'}
        </div>
      )}

      <div className="space-y-8">
        {grouped.map(([monthKey, monthEntries]) => (
          <div key={monthKey} className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              {monthKey}
            </h2>
            <div className="space-y-2">
              {monthEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 shrink-0 font-mono">
                      <span className="text-base font-bold text-indigo-600 dark:text-indigo-400 leading-none">
                        {entry.date.split(' ')[0]}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase mt-0.5">
                        {entry.date.split(' ')[1]}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold capitalize mb-1 ${
                          categoryTone[entry.category] || categoryTone.other
                        }`}
                      >
                        {entry.category}
                      </span>
                      <p className="text-sm text-slate-900 dark:text-white leading-snug">
                        {isBn ? entry.title.bn : entry.title.en}
                      </p>
                    </div>
                  </div>

                  {entry.downloadUrl && (
                    <a
                      href={entry.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-indigo-500/20 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors text-xs font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{isBn ? 'নোটিশ' : 'Notice'}</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 space-y-2">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <h2 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
            {isBn ? 'ক্যালেন্ডার সম্পর্কে' : 'About this calendar'}
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {isBn
            ? 'প্রতিষ্ঠান একটি পূর্ণ-বছরের অফিসিয়াল ক্যালেন্ডার পিডিএফ এখনো প্রকাশ করেনি। উপরের তারিখগুলো প্রতিটি অফিসিয়াল নোটিশ থেকে সরাসরি নেওয়া — কোনো তারিখ অনুমান করা হয়নি।'
            : 'The institution does not yet publish a full-year official calendar PDF. Every date above is taken directly from an official circular — no date is estimated or inferred.'}
        </p>
        <a
          href="https://bist.edu.bd/notice"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>{isBn ? 'লাইভ সাইটে নোটিশ দেখুন' : 'View notices on the official site'}</span>
        </a>
      </div>
    </div>
  );
};
