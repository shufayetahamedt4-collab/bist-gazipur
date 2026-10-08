import React from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  Info,
  PhoneCall,
  Users2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { findCourse, UNIVERSITY_INFO } from '../../data/mockData';

/**
 * The detail view for a course that is not one of the four-year Honours degrees.
 *
 * Honours degrees keep their own (richer) department page, reached at
 * `#/programs/:deptId`; this page exists so PGD, short and NSDA courses have
 * somewhere to link to from their cards, in the same visual language.
 *
 * A course flagged `source: 'placeholder'` renders an explicit "details being
 * finalised" note instead of an invented fee, credit count or syllabus.
 */
export const CourseDetailPage: React.FC = () => {
  const { language, navigateTo, selectedCourseId, theme } = useApp();
  const isBn = language === 'bn';
  const course = selectedCourseId ? findCourse(selectedCourseId) : undefined;

  /** Where the Back button goes, based on the level of the course being read. */
  const backTarget = course?.level === 'pgd' ? 'pgd' : course?.level === 'short' ? 'short-courses' : 'honours-programs';

  if (!course) {
    return (
      <div className="py-20 px-4 sm:px-6 max-w-3xl mx-auto">
        <div
          className={`p-8 rounded-3xl border text-center space-y-4 ${
            theme === 'dark' ? 'glass-panel-dark border-white/10' : 'bg-white/95 border-emerald-100'
          }`}
        >
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h1 className={`font-heading text-2xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
            {isBn ? 'কোর্সটি পাওয়া যায়নি' : 'That course could not be found'}
          </h1>
          <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            {isBn
              ? 'ঠিকানার লিংকটি হয়তো পুরনো। নিচের তালিকা থেকে কোর্স বেছে নিন।'
              : 'The link may be out of date. Pick the course from the catalogue instead.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('honours-programs')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-yellow-400 text-slate-950 font-heading font-bold text-xs cursor-pointer"
            >
              {isBn ? 'অনার্স প্রোগ্রাম' : 'Honours programs'}
            </button>
            <button
              onClick={() => navigateTo('short-courses')}
              className={`px-5 py-2.5 rounded-xl font-heading font-bold text-xs cursor-pointer border ${
                theme === 'dark' ? 'border-white/15 text-slate-200' : 'border-emerald-200 text-emerald-800'
              }`}
            >
              {isBn ? 'শর্ট কোর্স' : 'Short courses'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const feeLabel = () => {
    if (course.totalFee === undefined) return isBn ? 'প্রকাশিত হয়নি' : 'To be published';
    if (course.totalFee === 0) return isBn ? 'কোর্স ফি নেই' : 'No course fee';
    return `৳${course.totalFee.toLocaleString()}`;
  };

  const facts = [
    {
      icon: Clock,
      label: isBn ? 'মেয়াদ' : 'Duration',
      value: course.duration ? (isBn ? course.duration.bn : course.duration.en) : isBn ? 'প্রকাশিত হয়নি' : 'To be published',
    },
    {
      icon: Users2,
      label: isBn ? 'ক্লাস সংখ্যা' : 'Classes',
      value: course.classCount !== undefined ? String(course.classCount) : isBn ? 'প্রকাশিত হয়নি' : 'To be published',
    },
    {
      icon: GraduationCap,
      label: isBn ? 'ক্রেডিট' : 'Credits',
      value: course.credits !== undefined ? String(course.credits) : isBn ? 'প্রকাশিত হয়নি' : 'To be published',
    },
    {
      icon: BookOpen,
      label: isBn ? 'অধিভুক্তি' : 'Affiliation',
      value: course.affiliation,
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto space-y-10">
      {/* Back */}
      <button
        onClick={() => navigateTo(backTarget)}
        className={`inline-flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${
          theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>{isBn ? 'তালিকায় ফিরে যান' : 'Back to the course list'}</span>
      </button>

      {/* Hero */}
      <div
        className={`rounded-3xl border overflow-hidden ${
          theme === 'dark' ? 'glass-panel-dark border-white/10' : 'bg-white/95 border-emerald-100 shadow-[0_12px_40px_rgba(5,150,105,0.07)]'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {course.image && (
            <div className="lg:col-span-5 relative min-h-[220px]">
              <img
                src={course.image}
                alt={isBn ? course.title.bn : course.title.en}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          <div className={`p-6 sm:p-8 space-y-5 ${course.image ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 font-bold uppercase tracking-wider">
                {course.level === 'honours'
                  ? isBn ? 'অনার্স' : 'Honours'
                  : course.level === 'pgd'
                    ? 'PGD'
                    : isBn ? 'শর্ট কোর্স' : 'Short Course'}
              </span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">{course.code}</span>
              {course.nsdaLevel && (
                <span className="px-2 py-0.5 rounded-full bg-slate-950/70 text-emerald-300 border border-emerald-500/40">
                  NSDA Level {course.nsdaLevel}
                </span>
              )}
            </div>

            <h1 className={`font-heading text-2xl sm:text-3xl font-extrabold leading-tight ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
              {isBn ? course.title.bn : course.title.en}
            </h1>

            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              {isBn ? course.summary.bn : course.summary.en}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className={`p-3 rounded-2xl border ${
                    theme === 'dark' ? 'bg-white/[0.03] border-white/10' : 'bg-emerald-50/60 border-emerald-200'
                  }`}
                >
                  <fact.icon className="w-3.5 h-3.5 text-emerald-600 mb-1.5" />
                  <span className={`block text-[10px] uppercase tracking-wider ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                    {fact.label}
                  </span>
                  <span className={`block text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <div>
                <span className={`block text-[10px] uppercase tracking-wider ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                  {isBn ? 'কোর্স ফি' : 'Course fee'}
                </span>
                <span className={`font-mono font-extrabold text-xl ${course.totalFee === undefined ? 'text-slate-500' : 'text-emerald-700 dark:text-emerald-400'}`}>
                  {feeLabel()}
                </span>
              </div>
              <button
                onClick={() => navigateTo('apply-online')}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-yellow-400 hover:from-emerald-600 hover:to-yellow-500 text-slate-950 font-heading font-extrabold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <span>{isBn ? 'ভর্তির জন্য আবেদন' : 'Apply for admission'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder notice */}
      {course.source === 'placeholder' && (
        <div
          className={`flex items-start gap-3 p-5 rounded-2xl border ${
            theme === 'dark' ? 'glass-panel-dark border-amber-500/25' : 'bg-amber-50/70 border-amber-200'
          }`}
        >
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
            {isBn
              ? 'এই প্রোগ্রামের ফি, ক্রেডিট আওয়ার ও বিস্তারিত সিলেবাস প্রতিষ্ঠান এখনো প্রকাশ করেনি। নিশ্চিত তথ্যের জন্য ভর্তি অফিসে যোগাযোগ করুন — এই পাতায় কোনো অনুমানভিত্তিক সংখ্যা দেখানো হয় না।'
              : 'The institution has not yet published this programme\'s fees, credit hours and full syllabus. Contact the admission office for confirmed details — no estimated figure is shown on this page.'}
          </p>
        </div>
      )}

      {/* Eligibility */}
      {course.eligibility && (
        <div
          className={`p-6 sm:p-8 rounded-3xl border space-y-3 ${
            theme === 'dark' ? 'glass-panel-dark border-white/10' : 'bg-white/95 border-emerald-100 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
          }`}
        >
          <h2 className={`font-heading font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
            {isBn ? 'যোগ্যতা' : 'Eligibility'}
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
            {isBn ? course.eligibility.bn : course.eligibility.en}
          </p>
        </div>
      )}

      {/* Highlights */}
      {course.highlights.length > 0 && (
        <div
          className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${
            theme === 'dark' ? 'glass-panel-dark border-white/10' : 'bg-white/95 border-emerald-100 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
          }`}
        >
          <h2 className={`font-heading font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
            {isBn ? 'কোর্সে যা যা রয়েছে' : 'What the course covers'}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {course.highlights.map((item) => (
              <li key={item.en} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  {isBn ? item.bn : item.en}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Curriculum */}
      {course.curriculum && course.curriculum.length > 0 && (
        <div className="space-y-4">
          <h2 className={`font-heading font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
            {isBn ? 'সিলেবাসের রূপরেখা' : 'Syllabus outline'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {course.curriculum.map((block) => (
              <div
                key={block.title.en}
                className={`p-5 rounded-2xl border space-y-3 ${
                  theme === 'dark' ? 'glass-panel-dark border-white/10' : 'bg-white/95 border-emerald-100'
                }`}
              >
                <h3 className={`font-heading font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
                  {isBn ? block.title.bn : block.title.en}
                </h3>
                <ul className="space-y-1.5">
                  {block.items.map((item) => (
                    <li key={item.en} className={`text-[11px] ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                      • {isBn ? item.bn : item.en}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact strip */}
      <div
        className={`p-6 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          theme === 'dark' ? 'glass-panel-dark border-white/10' : 'bg-white/95 border-emerald-100'
        }`}
      >
        <div className="space-y-1">
          <h2 className={`font-heading font-bold text-base ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
            {isBn ? 'বিস্তারিত জানতে যোগাযোগ করুন' : 'Questions about this course?'}
          </h2>
          <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            {isBn
              ? 'ভর্তি অফিস ব্যাচের সময়সূচি, ফি ও আসন সম্পর্কে নিশ্চিত তথ্য দিতে পারবে।'
              : 'The admission office can confirm batch schedules, fees and seat availability.'}
          </p>
        </div>
        <a
          href={`tel:${UNIVERSITY_INFO.contact.admissionPhone}`}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-bold text-xs border ${
            theme === 'dark' ? 'border-emerald-500/40 text-emerald-300' : 'border-emerald-300 text-emerald-800 bg-emerald-50'
          }`}
        >
          <PhoneCall className="w-4 h-4" />
          <span>{UNIVERSITY_INFO.contact.admissionPhone}</span>
        </a>
      </div>
    </div>
  );
};
