import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  BadgeCheck,
  CheckCircle2,
  ExternalLink,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../ui/PageHeader';
import { OfficialEmbed } from '../features/OfficialEmbed';
import { AFFILIATION_BODIES, findAffiliation, NSDA_COURSES } from '../../data/mockData';
import { AFFILIATION_VERIFY_URLS } from '../../config/siteLinks';
import { CourseCard } from '../features/CourseCard';

/**
 * Academics → Affiliated By → NU / BTEB / NSDA.
 *
 * One page serves all three bodies; the body is taken from `#/affiliated/:id`, so
 * adding a fourth authority is a data row plus one menu line. Each page carries
 * the registration code, what the affiliation covers, and an embedded attempt at
 * the authority's own verification page with a guaranteed fallback.
 */
export const AffiliationPage: React.FC = () => {
  const { language, theme, selectedAffiliationId, navigateToAffiliation } = useApp();
  const isBn = language === 'bn';
  const body = selectedAffiliationId ? findAffiliation(selectedAffiliationId) : undefined;
  const [query, setQuery] = useState('');

  const nsdaCourses = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return NSDA_COURSES;
    return NSDA_COURSES.filter((course) =>
      [course.title.en, course.title.bn, course.summary.en, course.summary.bn, course.code]
        .join(' ')
        .toLowerCase()
        .includes(needle)
    );
  }, [query]);

  if (!body) {
    return (
      <div className="py-20 px-4 sm:px-6 max-w-3xl mx-auto">
        <div
          className={`p-8 rounded-3xl border text-center space-y-4 ${
            theme === 'dark' ? 'glass-panel-dark border-white/10' : 'bg-white/95 border-emerald-100'
          }`}
        >
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h1 className={`font-heading text-2xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
            {isBn ? 'প্রতিষ্ঠানটি পাওয়া যায়নি' : 'That affiliation page could not be found'}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {AFFILIATION_BODIES.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToAffiliation(item.id)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-yellow-400 text-slate-950 font-heading font-bold text-xs cursor-pointer"
              >
                {item.shortName}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const verifyUrl = AFFILIATION_VERIFY_URLS[body.id];

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      <PageHeader
        icon={ShieldCheck}
        accent="indigo"
        badge={{ en: 'Academics · Affiliated By', bn: 'একাডেমিক · অধিভুক্তি' }}
        title={body.name}
        subtitle={{
          en: 'What this affiliation covers at BIST, and how to verify the institute on the authority\'s own site.',
          bn: 'এই অধিভুক্তি বিআইএসটি-র জন্য কী বোঝায় এবং প্রতিষ্ঠানের নিজস্ব সাইটে বিআইএসটি-কে কীভাবে যাচাই করা যায়।',
        }}
      />

      {/* Body switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {AFFILIATION_BODIES.map((item) => (
          <button
            key={item.id}
            onClick={() => navigateToAffiliation(item.id)}
            aria-current={item.id === body.id}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              item.id === body.id
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-800 dark:text-emerald-300'
                : theme === 'dark'
                  ? 'border-white/10 text-slate-300 hover:border-emerald-500/40'
                  : 'border-emerald-200 text-slate-600 hover:border-emerald-400 bg-white'
            }`}
          >
            {item.shortName}
          </button>
        ))}
      </div>

      {/* Code + description */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div
          className={`lg:col-span-5 p-6 sm:p-8 rounded-3xl border space-y-4 ${
            theme === 'dark' ? 'glass-panel-dark border-emerald-500/25' : 'bg-white/95 border-emerald-100 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
          }`}
        >
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <BadgeCheck className="w-4 h-4" />
            <span>{isBn ? body.codeLabel.bn : body.codeLabel.en}</span>
          </div>
          <div className="font-mono text-3xl sm:text-4xl font-extrabold text-emerald-700 dark:text-emerald-400 break-all">
            {body.code}
          </div>
          <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
            {isBn ? body.verification.bn : body.verification.en}
          </p>
          <a
            href={verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{isBn ? 'অফিসিয়াল যাচাইকরণ পেজ' : 'Official verification page'}</span>
          </a>
        </div>

        <div
          className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border space-y-4 ${
            theme === 'dark' ? 'glass-panel-dark border-white/10' : 'bg-white/95 border-emerald-100 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
          }`}
        >
          <h2 className={`font-heading font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
            {isBn ? 'অধিভুক্তির বিবরণ' : 'About this affiliation'}
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
            {isBn ? body.description.bn : body.description.en}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {body.scope.map((item) => (
              <li key={item.en} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  {isBn ? item.bn : item.en}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Embedded verification page with a guaranteed fallback */}
      <div className="space-y-3">
        <h2 className={`font-heading font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
          {isBn ? 'অফিসিয়াল সাইটে যাচাই করুন' : 'Verify on the official site'}
        </h2>
        <OfficialEmbed
          url={verifyUrl}
          authority={{
            en: `${body.name.en} — official information page`,
            bn: `${body.name.bn} — অফিসিয়াল তথ্য পেজ`,
          }}
          hint={{
            en: body.verification.en,
            bn: body.verification.bn,
          }}
        />
      </div>

      {/* NSDA-approved course list */}
      {body.id === 'nsda' && (
        <div className="space-y-6">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <h2 className={`font-heading text-2xl sm:text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
              {isBn ? 'বিআইএসটি-তে এনএসডিএ-অনুমোদিত কোর্সসমূহ' : 'NSDA-approved courses at BIST'}
            </h2>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              {isBn
                ? 'এনএসডিএ-নিবন্ধিত প্রশিক্ষণ প্রতিষ্ঠান ও মূল্যায়ন কেন্দ্র হিসেবে পরিচালিত competency-ভিত্তিক কোর্স এবং আরপিএল মূল্যায়ন।'
                : 'Competency-based courses and Recognition of Prior Learning assessment delivered as an NSDA-registered training organisation and assessment centre.'}
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={isBn ? 'কোর্স খুঁজুন…' : 'Search NSDA courses…'}
                aria-label={isBn ? 'এনএসডিএ কোর্স খুঁজুন' : 'Search NSDA courses'}
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

          {nsdaCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nsdaCourses.map((course) => (
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
                {isBn ? 'অন্য শব্দে খুঁজুন বা তালিকা রিফ্রেশ করুন।' : 'Try another word, or clear the search to see the full list.'}
              </p>
            </div>
          )}

          {/* Source note — the official export replaces this list verbatim */}
          <p className={`text-[11px] text-center max-w-2xl mx-auto ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
            {isBn
              ? 'তালিকাটি প্রতিষ্ঠানের প্রকাশিত আরপিএল ও সরকারি অর্থায়িত কোর্সের ভিত্তিতে প্রস্তুত। এনএসডিএ-র অফিসিয়াল তালিকা পাওয়া গেলে হুবহু তা যুক্ত করা হবে।'
              : 'This list is assembled from the institute\'s published RPL and government-funded courses. The authority\'s official export will replace it verbatim once supplied.'}
          </p>
        </div>
      )}
    </div>
  );
};
