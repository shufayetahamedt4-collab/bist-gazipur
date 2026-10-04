import React from 'react';
import { ScrollText, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ACADEMIC_REGULATIONS } from '../../data/mockData';

export const AcademicRegulationsPage: React.FC = () => {
  const { language } = useApp();
  const isBn = language === 'bn';

  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isBn ? 'একাডেমিক রেগুলেশন' : 'Academic Regulations'}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isBn ? 'একাডেমিক রেগুলেশন' : 'Academic Regulations'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {isBn
            ? 'প্রতিষ্ঠানের অফিসিয়াল একাডেমিক রেগুলেশন পেজ থেকে সংগৃহীত।'
            : 'Reproduced from the institution’s official Academic Regulation page.'}
        </p>
      </div>

      <div className="space-y-8">
        {ACADEMIC_REGULATIONS.map((section) => (
          <section
            key={section.id}
            className="p-6 sm:p-7 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 space-y-4"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ScrollText className="w-5 h-5" />
              </div>
              <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                {isBn ? section.heading.bn : section.heading.en}
              </h2>
            </div>

            {section.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
              >
                {isBn ? p.bn : p.en}
              </p>
            ))}

            {section.points && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {section.points.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{isBn ? point.bn : point.en}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div className="text-center">
        <a
          href="https://bist.edu.bd/academic-regulations"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>{isBn ? 'লাইভ সাইটে মূল পেজ দেখুন' : 'View the original page on the official site'}</span>
        </a>
      </div>
    </div>
  );
};
