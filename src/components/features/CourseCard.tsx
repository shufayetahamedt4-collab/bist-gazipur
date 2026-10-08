import React from 'react';
import { ArrowRight, Clock, GraduationCap, Users2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CourseOffer, CourseLevel } from '../../types';

/** Chips shown on the top-left of every card, keyed by level. */
const LEVEL_META: Record<CourseLevel, { en: string; bn: string; className: string }> = {
  honours: {
    en: 'Honours',
    bn: 'অনার্স',
    className: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30',
  },
  pgd: {
    en: 'PGD',
    bn: 'পিজিডি',
    className: 'bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border-indigo-500/30',
  },
  short: {
    en: 'Short Course',
    bn: 'শর্ট কোর্স',
    className: 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30',
  },
};

/**
 * One course in the catalogue, as a card.
 *
 * The whole card is a single button so the tap target is the full surface on
 * mobile. A course that mirrors a four-year degree opens the existing
 * department page; everything else opens the generic course page.
 */
export const CourseCard: React.FC<{ course: CourseOffer }> = ({ course }) => {
  const { language, theme, navigateTo, navigateToCourse } = useApp();
  const isBn = language === 'bn';
  const level = LEVEL_META[course.level];

  const openCourse = () => {
    if (course.honoursProgramId) {
      navigateTo('department-detail', course.honoursProgramId);
      return;
    }
    navigateToCourse(course.id);
  };

  /** Fee, or an honest "to be published" when the institution has not printed one. */
  const feeLabel = () => {
    if (course.totalFee === undefined) {
      return isBn ? 'ফি প্রকাশিত হয়নি' : 'Fee to be published';
    }
    if (course.totalFee === 0) {
      return isBn ? 'কোর্স ফি নেই' : 'No course fee';
    }
    return `৳${course.totalFee.toLocaleString()}`;
  };

  return (
    <button
      type="button"
      onClick={openCourse}
      className={`group text-left rounded-3xl border overflow-hidden flex flex-col transition-all cursor-pointer ${
        theme === 'dark'
          ? 'glass-panel-dark border-white/10 hover:border-emerald-500/50'
          : 'bg-white/95 border-emerald-100 hover:border-emerald-400 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
      }`}
    >
      {/* Media */}
      <div className="relative aspect-[16/10] overflow-hidden bg-emerald-950/20">
        {course.image ? (
          <img
            src={course.image}
            alt={isBn ? course.title.bn : course.title.en}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center bg-gradient-to-tr ${
              theme === 'dark' ? 'from-emerald-900/40 to-slate-900' : 'from-emerald-100 to-yellow-50'
            }`}
          >
            <GraduationCap className="w-12 h-12 text-emerald-600/60" />
          </div>
        )}

        <span
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-sm ${level.className}`}
        >
          {isBn ? level.bn : level.en}
        </span>

        {course.nsdaLevel && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/70 text-emerald-300 border border-emerald-500/40 backdrop-blur-sm">
            NSDA L{course.nsdaLevel}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono">
          <span className="text-emerald-700 dark:text-emerald-400 font-bold">{course.code}</span>
          <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}>•</span>
          <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>{course.affiliation}</span>
        </div>

        <h3 className={`font-heading font-bold text-base leading-snug ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
          {isBn ? course.title.bn : course.title.en}
        </h3>

        <p className={`text-xs leading-relaxed line-clamp-3 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
          {isBn ? course.summary.bn : course.summary.en}
        </p>

        {/* Meta row */}
        <div className={`flex flex-wrap items-center gap-3 text-[11px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
          {course.duration && (
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              {isBn ? course.duration.bn : course.duration.en}
            </span>
          )}
          {course.classCount !== undefined && (
            <span className="inline-flex items-center gap-1">
              <Users2 className="w-3.5 h-3.5 text-emerald-600" />
              {isBn ? `${course.classCount} ক্লাস` : `${course.classCount} classes`}
            </span>
          )}
          {course.credits !== undefined && (
            <span className="inline-flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
              {isBn ? `${course.credits} ক্রেডিট` : `${course.credits} credits`}
            </span>
          )}
        </div>

        {/* Highlights */}
        {course.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {course.highlights.slice(0, 3).map((highlight) => (
              <span
                key={highlight.en}
                className={`px-2 py-0.5 rounded-full text-[10px] ${
                  theme === 'dark'
                    ? 'bg-white/5 text-slate-300 border border-white/10'
                    : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                }`}
              >
                {isBn ? highlight.bn : highlight.en}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className={`px-5 py-3.5 border-t flex items-center justify-between gap-3 ${
          theme === 'dark' ? 'border-white/10' : 'border-emerald-100'
        }`}
      >
        <div className="flex flex-col">
          <span className={`text-[10px] uppercase tracking-wider ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
            {isBn ? 'কোর্স ফি' : 'Course fee'}
          </span>
          <span
            className={`font-mono font-bold text-sm ${
              course.totalFee === undefined ? 'text-slate-500' : 'text-emerald-700 dark:text-emerald-400'
            }`}
          >
            {feeLabel()}
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 group-hover:gap-2 transition-all">
          <span>{isBn ? 'বিস্তারিত' : 'Details'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </button>
  );
};
