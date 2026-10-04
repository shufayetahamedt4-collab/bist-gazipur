import React from 'react';
import { ShieldCheck, Sparkles, Award, Target, Info, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { IQAC_CONTENT } from '../../data/mockData';

export const IqacPage: React.FC = () => {
  const { language } = useApp();
  const isBn = language === 'bn';
  const { qualityPolicy, accreditations, goals, pendingNote } = IQAC_CONTENT;

  return (
    <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto space-y-10">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{isBn ? 'আইকিউএসি ও স্বীকৃতি' : 'IQAC & Accreditation'}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isBn ? 'গুণগত মান ও স্বীকৃতি' : 'Quality Assurance & Accreditation'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {isBn
            ? 'প্রাতিষ্ঠানিক গুণগত নীতি, লক্ষ্য ও স্বীকৃতিসমূহ।'
            : 'Institutional quality policy, goals and statutory affiliations.'}
        </p>
      </div>

      {/* Quality policy */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
            {isBn ? 'গুণগত নীতিমালা' : 'Quality Policy'}
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {isBn ? qualityPolicy.bn : qualityPolicy.en}
        </p>
      </div>

      {/* Accreditations */}
      <div className="space-y-4">
        <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          {isBn ? 'স্বীকৃতি ও অধিভুক্তি' : 'Accreditations & Affiliations'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {accreditations.map((acc) => (
            <div
              key={acc.code}
              className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 space-y-2"
            >
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {acc.name}
              </p>
              <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
                {isBn ? 'কোড' : 'Code'}: {acc.code}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Institutional goals */}
      <div className="space-y-4">
        <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          {isBn ? 'প্রাতিষ্ঠানিক লক্ষ্য' : 'Institutional Goals'}
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {goals.map((goal, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 p-3 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <span>{isBn ? goal.bn : goal.en}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-5 rounded-3xl glass-panel border border-amber-300/50 dark:border-amber-500/30 space-y-2">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <h2 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
            {isBn ? 'আইকিউএসি সম্পর্কে' : 'About the IQAC page'}
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {isBn ? pendingNote.bn : pendingNote.en}
        </p>
        <a
          href="https://bist.edu.bd/page/at-a-glance"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>{isBn ? 'লাইভ সাইটে দেখুন' : 'View on the official site'}</span>
        </a>
      </div>
    </div>
  );
};
