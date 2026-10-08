import React from 'react';
import { GraduationCap, ArrowRight, ExternalLink, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../ui/PageHeader';
import { CourseCard } from '../features/CourseCard';
import { HONOURS_COURSES } from '../../data/mockData';
import { DIPLOMA_SITE_URL, DIPLOMA_ENTRY_LABEL } from '../../config/siteLinks';

/**
 * Academics → Honours (Graduate) Programs.
 *
 * The cards come from `HONOURS_COURSES`, which is projected from `PROGRAMS`, so a
 * card can never disagree with its department page. Each honours card therefore
 * opens the existing department page rather than a second detail view.
 */
export const HonoursProgramsPage: React.FC = () => {
  const { language, navigateTo, navigateToAffiliation, theme } = useApp();
  const isBn = language === 'bn';

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      <PageHeader
        icon={GraduationCap}
        accent="emerald"
        badge={{ en: 'Academics · Honours (Graduate)', bn: 'একাডেমিক · অনার্স (গ্র্যাজুয়েট)' }}
        title={{
          en: 'Honours (Graduate) Programs',
          bn: 'অনার্স (গ্র্যাজুয়েট) প্রোগ্রামসমূহ',
        }}
        subtitle={{
          en: 'Four-year Bachelor degrees under National University, taught in Gazipur with industry-linked labs and workshop practice.',
          bn: 'জাতীয় বিশ্ববিদ্যালয়ের অধীনে চার বছর মেয়াদি ব্যাচেলর ডিগ্রি, গাজীপুরে শিল্প-সংশ্লিষ্ট ল্যাব ও কার্যপ্রণালীর ব্যবহারিক শিক্ষাসহ।',
        }}
      />

      {/* Affiliation note */}
      <div
        className={`flex items-start gap-3 p-5 rounded-2xl border ${
          theme === 'dark' ? 'glass-panel-dark border-emerald-500/25' : 'bg-emerald-50/60 border-emerald-200'
        }`}
      >
        <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-2">
          <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
            {isBn ? (
              <>
                সকল অনার্স ডিগ্রি <strong>জাতীয় বিশ্ববিদ্যালয়</strong> (কলেজ কোড ৫৫২৬) এর অধিভুক্ত। কোর্স কারিকুলাম,
                ভর্তি, পরীক্ষা ও সনদ জাতীয় বিশ্ববিদ্যালয়ের নিয়ম অনুযায়ী পরিচালিত হয়।
              </>
            ) : (
              <>
                Every Honours degree is affiliated with <strong>National University</strong> (college code 5526). Curriculum,
                registration, examinations and certificates follow the university's regulations.
              </>
            )}
          </p>
          <button
            onClick={() => navigateToAffiliation('nu')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            <span>{isBn ? 'অধিভুক্তি যাচাই করুন' : 'Verify the affiliation'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Course cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HONOURS_COURSES.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Diploma hand-off */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-5 ${
          theme === 'dark' ? 'glass-panel-dark border-white/10' : 'bg-white/95 border-emerald-100 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
        }`}
      >
        <div className="space-y-1">
          <h2 className={`font-heading font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
            {isBn ? 'ডিপ্লোমা কার্যক্রম' : 'Looking for a Diploma instead?'}
          </h2>
          <p className={`text-xs ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
            {isBn
              ? 'বিটিইবি-অনুমোদিত চার বছর মেয়াদি ডিপ্লোমা ইন ইঞ্জিনিয়ারিং ও টেক্সটাইল কার্যক্রম আলাদা পোর্টালে পরিচালিত হয়।'
              : 'The BTEB-approved four-year Diploma in Engineering and Textile programmes run on the institute\'s separate portal.'}
          </p>
        </div>
        <a
          href={DIPLOMA_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-yellow-400 hover:from-emerald-600 hover:to-yellow-500 text-slate-950 font-heading font-bold text-xs transition-all"
        >
          <span>{isBn ? DIPLOMA_ENTRY_LABEL.bn : DIPLOMA_ENTRY_LABEL.en}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <button
          onClick={() => navigateTo('apply-online')}
          className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
        >
          <span>{isBn ? 'অনলাইনে ভর্তি আবেদন করুন' : 'Apply for admission online'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
