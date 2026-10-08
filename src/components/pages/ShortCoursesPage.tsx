import React, { useMemo, useState } from 'react';
import { Clock, Info, Search, Sparkles, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../ui/PageHeader';
import { CourseCard } from '../features/CourseCard';
import { SHORT_COURSES } from '../../data/mockData';

/**
 * Academics → Short Courses.
 *
 * Mirrored from https://bist.edu.bd/short-courses: fee, class count and duration
 * are the institution's published figures, and the two government-funded courses
 * appear with a fee of 0 because that is genuinely the fee, not missing data.
 */
export const ShortCoursesPage: React.FC = () => {
  const { language, theme } = useApp();
  const isBn = language === 'bn';
  const [query, setQuery] = useState('');

  const freeCount = SHORT_COURSES.filter((course) => course.totalFee === 0).length;

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return SHORT_COURSES;
    return SHORT_COURSES.filter((course) =>
      [course.title.en, course.title.bn, course.summary.en, course.summary.bn, course.code, course.shortTitle]
        .join(' ')
        .toLowerCase()
        .includes(needle)
    );
  }, [query]);

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      <PageHeader
        icon={Sparkles}
        accent="amber"
        badge={{ en: 'Academics · Short Courses', bn: 'একাডেমিক · শর্ট কোর্স' }}
        title={{
          en: 'Short Courses & Skill Training',
          bn: 'শর্ট কোর্স ও দক্ষতা প্রশিক্ষণ',
        }}
        subtitle={{
          en: 'Three-month, practice-first courses in web development, design, marketing and technical trades. Admission is ongoing.',
          bn: 'ওয়েব ডেভেলপমেন্ট, ডিজাইন, মার্কেটিং ও কারিগরি ট্রেডে তিন মাসের ব্যবহারিক কোর্স। ভর্তি চলছে।',
        }}
      />

      {/* Government-funded seats note */}
      {freeCount > 0 && (
        <div
          className={`flex items-start gap-3 p-5 rounded-2xl border ${
            theme === 'dark' ? 'glass-panel-dark border-emerald-500/25' : 'bg-emerald-50/60 border-emerald-200'
          }`}
        >
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
            {isBn
              ? `${freeCount}টি কোর্স সরকারি অর্থায়নে পরিচালিত, তাই কোর্স ফি নেই — আসন সাপেক্ষে। এনএসডিএ-নিবন্ধিত কেন্দ্র হিসেবে এই কোর্সগুলোর মূল্যায়ন ও সনদ দেওয়া হয়।`
              : `${freeCount} courses run under the government-funded skills scheme with no course fee, subject to seat availability. Assessment and certification are delivered through the NSDA-registered centre.`}
          </p>
        </div>
      )}

      {/* Search */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={isBn ? 'কোর্স খুঁজুন…' : 'Search courses…'}
            aria-label={isBn ? 'কোর্স খুঁজুন' : 'Search courses'}
            className={`w-full pl-10 pr-10 py-3 rounded-xl border text-xs focus:outline-none focus:border-emerald-500 transition-colors ${
              theme === 'dark'
                ? 'bg-black/40 border-white/10 text-white placeholder:text-slate-500'
                : 'bg-white border-emerald-200 text-slate-800 placeholder:text-slate-400'
            }`}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label={isBn ? 'অনুসন্ধান মুছুন' : 'Clear search'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Course cards */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div
          className={`p-10 rounded-3xl border text-center space-y-2 ${
            theme === 'dark' ? 'glass-panel-dark border-white/10' : 'bg-white/95 border-emerald-100'
          }`}
        >
          <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
            {isBn ? 'কোনো কোর্স পাওয়া যায়নি' : 'No course matches that search'}
          </p>
          <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            {isBn
              ? 'অন্য শব্দে খুঁজুন, অথবা ভর্তি অফিসে যোগাযোগ করুন — নতুন কোর্স প্রায়ই যুক্ত হয়।'
              : 'Try a different word, or contact the admission office — batches are added through the year.'}
          </p>
        </div>
      )}

      {/* How the courses run */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${
          theme === 'dark' ? 'glass-panel-dark border-white/10' : 'bg-white/95 border-emerald-100 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
        }`}
      >
        <h2 className={`font-heading font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
          {isBn ? 'কোর্স কীভাবে পরিচালিত হয়' : 'How the courses run'}
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Clock,
              title: isBn ? 'ব্যাচভিত্তিক ক্লাস' : 'Batch-based classes',
              body: isBn
                ? 'প্রতি ব্যাচে সাধারণত ৩০–৪০টি ক্লাস, ২ থেকে ৩ মাসে সম্পন্ন। সন্ধ্যা ও ছুটির দিনের ব্যাচও চলে।'
                : 'Typically 30–40 classes per batch, completed over two to three months. Evening and holiday batches are also run.',
            },
            {
              icon: Sparkles,
              title: isBn ? 'ব্যবহারিক প্রশিক্ষণ' : 'Hands-on practice',
              body: isBn
                ? 'প্রতিটি কোর্স ক্যাম্পাসের ল্যাবে হাতে-কলমে অনুশীলনের উপর নির্ভর করে, শুধু তত্ত্ব নয়।'
                : 'Every course is built on lab practice on campus, not theory alone.',
            },
            {
              icon: Info,
              title: isBn ? 'মূল্যায়ন ও সনদ' : 'Assessment & certificate',
              body: isBn
                ? 'সরকারি অর্থায়িত কোর্সগুলো এনএসডিএ-র দক্ষতার কাঠামো অনুযায়ী মূল্যায়ন করে সনদ দেওয়া হয়।'
                : 'The government-funded courses are assessed and certified under the NSDA competency framework.',
            },
          ].map((item) => (
            <li
              key={item.title}
              className={`p-5 rounded-2xl border space-y-2 ${
                theme === 'dark' ? 'bg-white/[0.03] border-white/10' : 'bg-emerald-50/60 border-emerald-200'
              }`}
            >
              <item.icon className="w-4 h-4 text-emerald-600" />
              <h3 className={`font-heading font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
                {item.title}
              </h3>
              <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
