import React from 'react';
import { Award, ArrowRight, Info, PhoneCall } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../ui/PageHeader';
import { CourseCard } from '../features/CourseCard';
import { PGD_COURSES, UNIVERSITY_INFO } from '../../data/mockData';

/**
 * Academics → Post Graduate Diploma (PGD).
 *
 * The programmes are listed from `PGD_COURSES`. Their fees, credit hours and full
 * outlines have not been published by the institution in a form we could mirror,
 * so those cards deliberately print "to be published" and the page says so rather
 * than showing an estimate the admission office would have to walk back.
 */
export const PgdCoursesPage: React.FC = () => {
  const { language, navigateTo, theme } = useApp();
  const isBn = language === 'bn';
  const pendingDetails = PGD_COURSES.filter((course) => course.source === 'placeholder').length;

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      <PageHeader
        icon={Award}
        accent="indigo"
        badge={{ en: 'Academics · Post Graduate Diploma', bn: 'একাডেমিক · পোস্ট গ্র্যাজুয়েট ডিপ্লোমা' }}
        title={{
          en: 'Post Graduate Diploma (PGD) Programs',
          bn: 'পোস্ট গ্র্যাজুয়েট ডিপ্লোমা (পিজিডি) প্রোগ্রাম',
        }}
        subtitle={{
          en: 'One-year postgraduate diplomas for graduates who want a focused specialisation — or a route into a new field without starting a full degree again.',
          bn: 'স্নাতকদের জন্য এক বছর মেয়াদি পোস্ট গ্র্যাজুয়েট ডিপ্লোমা — নির্দিষ্ট বিষয়ে বিশেষজ্ঞতা অর্জন বা নতুন ক্ষেত্রে প্রবেশের সুযোগ।',
        }}
      />

      {/* Honesty note about the published-detail gap */}
      {pendingDetails > 0 && (
        <div
          className={`flex items-start gap-3 p-5 rounded-2xl border ${
            theme === 'dark' ? 'glass-panel-dark border-amber-500/25' : 'bg-amber-50/70 border-amber-200'
          }`}
        >
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
            {isBn
              ? `নিচের ${pendingDetails}টি প্রোগ্রামের ফি, ক্রেডিট আওয়ার ও বিস্তারিত সিলেবাস এখনো প্রকাশিত হয়নি। "ফি প্রকাশিত হয়নি" লেখা কার্ডগুলোতে ভর্তি অফিসের নিশ্চিতকরণ প্রয়োজন — আমরা অনুমানভিত্তিক সংখ্যা দেখাই না।`
              : `Fees, credit hours and full outlines for ${pendingDetails} of the programmes below have not been published yet. Cards marked "fee to be published" need confirmation from the admission office — no estimated figure is shown.`}
          </p>
        </div>
      )}

      {/* Course cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PGD_COURSES.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Who it is for */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${
          theme === 'dark' ? 'glass-panel-dark border-white/10' : 'bg-white/95 border-emerald-100 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
        }`}
      >
        <h2 className={`font-heading font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
          {isBn ? 'কারা আবেদন করতে পারবেন' : 'Who the PGD is for'}
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(isBn
            ? [
                'স্নাতক ডিগ্রিধারী পেশাজীবী, যারা কর্মরত অবস্থায় বিশেষজ্ঞতা বাড়াতে চান',
                'ভিন্ন বিভাগ থেকে আসা স্নাতক, যারা টেক্সটাইল, আইটি বা ব্যবসায় প্রশাসনে নতুন করে শুরু করতে চান',
                'যারা এমবিএ বা উচ্চতর ডিগ্রির জন্য প্রস্তুতি নিতে চান',
              ]
            : [
                'Working graduates who want to deepen one specialisation while employed',
                'Graduates from another discipline moving into textiles, IT or business administration',
                'Candidates preparing for an MBA or a further postgraduate degree',
              ]
          ).map((item) => (
            <li
              key={item}
              className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                theme === 'dark' ? 'bg-white/[0.03] border-white/10 text-slate-300' : 'bg-emerald-50/60 border-emerald-200 text-slate-700'
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => navigateTo('apply-online')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-yellow-400 hover:from-emerald-600 hover:to-yellow-500 text-slate-950 font-heading font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer"
        >
          <span>{isBn ? 'আবেদন করুন' : 'Apply now'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <a
          href={`tel:${UNIVERSITY_INFO.contact.admissionPhone}`}
          className={`px-5 py-3 rounded-xl font-heading font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            theme === 'dark'
              ? 'text-emerald-700 dark:text-emerald-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10'
              : 'text-emerald-800 hover:text-emerald-950 bg-white hover:bg-emerald-50 border border-emerald-300 shadow-sm'
          }`}
        >
          <PhoneCall className="w-4 h-4 text-emerald-600" />
          <span>{isBn ? `ভর্তি অফিস: ${UNIVERSITY_INFO.contact.admissionPhone}` : `Admission office: ${UNIVERSITY_INFO.contact.admissionPhone}`}</span>
        </a>
      </div>
    </div>
  );
};
