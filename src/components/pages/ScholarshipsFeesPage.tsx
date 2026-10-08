import React from 'react';
import {
  Award,
  ArrowRight,
  CheckCircle2,
  Percent,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PROGRAMS, OTHER_FEE_TABLES, UNIVERSITY_INFO } from '../../data/mockData';

/**
 * Scholarships and the official tuition fee tables.
 *
 * This page deliberately holds no calculator: every figure below is one the
 * admission office has already published on bist.edu.bd/page/tuition-fee, printed
 * as its own table so a visitor reads the official band rather than a computed
 * estimate. The waiver bands are keyed on the SUM of the SSC and HSC GPA, exactly
 * as the institution publishes them.
 */
export const ScholarshipsFeesPage: React.FC = () => {
  const { language, navigateTo, theme } = useApp();
  const isBn = language === 'bn';

  /** The support schemes the institution advertises, as published. */
  const schemes = isBn
    ? [
        '১০০ জন শিক্ষার্থীর জন্য ১০০% কোর্স ফি স্কলারশিপ (শর্ত প্রযোজ্য)',
        'এসএসসি ও এইচএসসি জিপিএর যোগফল অনুযায়ী ৫০% থেকে ৯০% পর্যন্ত মেধা ছাড়',
        'পলিটেকনিক ডিপ্লোমা পাস শিক্ষার্থীদের জন্য বিশেষ ছাড় ও ক্রেডিট সমন্বয়',
        'নারী শিক্ষার্থী, ক্ষুদ্র নৃ-গোষ্ঠী ও প্রতিবন্ধী শিক্ষার্থীদের জন্য ৫০%-১০০% অন্তর্ভুক্তিমূলক সহায়তা',
      ]
    : [
        '100% course-fee scholarship for 100 students each session (terms apply)',
        'Merit waivers from 50% to 90%, keyed on the sum of SSC and HSC GPA',
        'Special waivers and credit transfer for polytechnic Diploma-in-Engineering holders',
        '50%-100% inclusion support for female, ethnic-minority and disabled students',
      ];

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            theme === 'dark'
              ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
          }`}
        >
          <Percent className="w-3.5 h-3.5 text-emerald-600" />
          <span>{isBn ? 'স্কলারশিপ, ছাড় ও ফি' : 'Scholarships, Waivers & Fees'}</span>
        </div>
        <h1
          className={`font-heading text-3xl sm:text-4xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
          }`}
        >
          {isBn ? 'প্রকাশিত টিউশন ফি ও ছাড়ের তালিকা' : 'Published Tuition Fees & Waiver Bands'}
        </h1>
        <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          {isBn
            ? 'ভর্তি অফিসের প্রকাশিত ফি কাঠামো ও জিপিএভিত্তিক ছাড়ের তালিকা। চূড়ান্ত হিসাব ক্যাম্পাসে নিশ্চিত করুন।'
            : 'The fee structure and GPA-wise waiver bands exactly as the BIST admission office publishes them. Confirm final figures with the campus admission office.'}
        </p>
      </div>

      {/* Support schemes */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border space-y-5 ${
          theme === 'dark' ? 'glass-panel-dark' : 'bg-white/95 border-emerald-100 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
        }`}
      >
        <h2
          className={`font-heading font-bold text-xl flex items-center gap-2 ${
            theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
          }`}
        >
          <Award className="w-5 h-5 text-amber-500" />
          <span>{isBn ? 'প্রযোজ্য স্কলারশিপ ও কোটা' : 'Available Scholarships & Quotas'}</span>
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {schemes.map((scheme) => (
            <li key={scheme} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                {scheme}
              </span>
            </li>
          ))}
        </ul>
        <div className={`flex items-start gap-2 pt-3 border-t text-[11px] ${
          theme === 'dark' ? 'border-white/10 text-slate-400' : 'border-emerald-100 text-slate-500'
        }`}
        >
          <HelpCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-600" />
          <span>
            {isBn
              ? `ছাড়ের যোগ্যতা নির্ধারণ ও চূড়ান্ত হিসাব ভর্তি অফিসে নিশ্চিত করুন — হটলাইন ${UNIVERSITY_INFO.contact.admissionPhone}।`
              : `Eligibility is assessed and confirmed by the admission office — helpline ${UNIVERSITY_INFO.contact.admissionPhone}.`}
          </span>
        </div>
      </div>

      {/* Official Tuition Fee Structure Table */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
          theme === 'dark' ? 'glass-panel-dark' : 'bg-white/95 border-emerald-100 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
        }`}
      >
        <div className="space-y-1">
          <h3 className={`font-heading font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
            {isBn ? 'জাতীয় বিশ্ববিদ্যালয় অনুমোদিত নিয়মিত ফি কাঠামো' : 'Official Tuition Fee Structure'}
          </h3>
          <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            {isBn
              ? 'সকল অনার্স প্রোগ্রামের মোট ক্রেডিট, সেমিস্টার ফি এবং ৪ বছরের সামগ্রিক খরচের তালিকা।'
              : 'Official breakdown for 4-year Honours and Professional curricula under National University.'}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead
              className={`uppercase font-mono text-[10px] border-b ${
                theme === 'dark' ? 'bg-black/40 text-slate-400 border-white/10' : 'bg-emerald-50 text-emerald-900 border-emerald-200'
              }`}
            >
              <tr>
                <th className="py-3 px-4">Program Title</th>
                <th className="py-3 px-4">Affiliation</th>
                <th className="py-3 px-4 text-center">Duration</th>
                <th className="py-3 px-4 text-center">Credits</th>
                <th className="py-3 px-4 text-right">{isBn ? 'সেমিস্টার ফি' : 'Per Semester Fee'}</th>
                <th className="py-3 px-4 text-right">{isBn ? 'মোট কোর্স ফি' : 'Total Course Fee'}</th>
                <th className="py-3 px-4 text-center">{isBn ? 'আবেদন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${theme === 'dark' ? 'divide-white/5 text-slate-300' : 'divide-emerald-100 text-slate-700'}`}
            >
              {PROGRAMS.map((prog) => (
                <tr key={prog.id} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold">{prog.shortTitle}</div>
                    <div className="text-[11px] text-slate-500">{isBn ? prog.title.bn : prog.title.en}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-emerald-600 font-semibold">{prog.affiliation}</td>
                  <td className="py-3 px-4 text-center">{isBn ? prog.duration.bn : prog.duration.en}</td>
                  <td className="py-3 px-4 text-center font-mono">{prog.credits}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold">
                    ৳{prog.semesterFee.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    ৳{prog.totalFee.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => navigateTo('apply-online')}
                      className="px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-[11px] cursor-pointer"
                    >
                      {isBn ? 'আবেদন' : 'Apply'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* GPA-wise waiver bands, one published table per programme */}
      <div className="space-y-6">
        <div className="space-y-1 text-center max-w-2xl mx-auto">
          <h3 className={`font-heading font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
            {isBn ? 'জিপিএ অনুযায়ী ছাড়ের তালিকা' : 'GPA-wise waiver tables'}
          </h3>
          <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            {isBn
              ? 'এসএসসি ও এইচএসসি জিপিএর যোগফলের ভিত্তিতে ভর্তি অফিসের প্রকাশিত তালিকা, প্রোগ্রাম অনুযায়ী।'
              : 'As published by the BIST admission office; every band is keyed on the sum of the SSC and HSC GPA.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              className={`p-5 rounded-2xl border space-y-4 ${
                theme === 'dark' ? 'glass-panel-dark' : 'bg-white/95 border-emerald-100 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h4 className={`font-heading font-bold text-base ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
                  {prog.shortTitle} · {prog.degree}
                </h4>
                <span className="font-mono text-[11px] text-emerald-600 font-semibold">
                  ৳{prog.totalFee.toLocaleString()}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-[11px] text-left">
                  <thead
                    className={`uppercase font-mono text-[10px] border-b ${
                      theme === 'dark' ? 'text-slate-400 border-white/10' : 'text-emerald-900 border-emerald-200'
                    }`}
                  >
                    <tr>
                      <th className="py-2 pr-3">{isBn ? 'জিপিএ ব্যান্ড (এসএসসি + এইচএসসি)' : 'GPA band (SSC + HSC)'}</th>
                      <th className="py-2 px-2 text-center">{isBn ? 'ছাড়' : 'Waiver'}</th>
                      <th className="py-2 px-2 text-right">{isBn ? 'মাসিক টিউশন' : 'Monthly tuition'}</th>
                      <th className="py-2 pl-2 text-right">{isBn ? 'মোট কোর্স ফি' : 'Total fee'}</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme === 'dark' ? 'divide-white/5 text-slate-300' : 'divide-emerald-100 text-slate-700'}`}>
                    {prog.waiverTiers.map((tier) => (
                      <tr key={tier.band.en}>
                        <td className="py-2 pr-3 font-mono">{isBn ? tier.band.bn : tier.band.en}</td>
                        <td className="py-2 px-2 text-center font-bold text-emerald-700 dark:text-emerald-400">
                          {tier.waiverPercent}%
                        </td>
                        <td className="py-2 px-2 text-right font-mono">৳{tier.monthlyTuition.toLocaleString()}</td>
                        <td className="py-2 pl-2 text-right font-mono font-bold">৳{tier.totalCost.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Executive and MBA fee tables published by the admission office */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
          theme === 'dark' ? 'glass-panel-dark' : 'bg-white/95 border-emerald-100 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
        }`}
      >
        <div className="space-y-1">
          <h3 className={`font-heading font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
            {isBn ? 'এক্সিকিউটিভ ব্যাচ, এমবিএ ও অন্যান্য ফি' : 'Executive batch, MBA & other fee tables'}
          </h3>
          <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            {isBn
              ? 'শুক্রবার-ভিত্তিক এক্সিকিউটিভ ও এমবিএ প্রোগ্রামের প্রকাশিত ফি কাঠামো।'
              : 'Published fee structure for the Friday-only Executive and MBA programmes.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {OTHER_FEE_TABLES.map((table) => (
            <div
              key={table.id}
              className={`rounded-2xl border p-4 space-y-3 ${
                theme === 'dark' ? 'bg-black/30 border-white/10' : 'bg-emerald-50/50 border-emerald-200'
              }`}
            >
              <h4 className={`font-heading font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
                {isBn ? table.name.bn : table.name.en}
              </h4>
              <dl className="space-y-2 text-[11px]">
                {table.rows.map((row) => (
                  <div key={row.label.en} className="flex justify-between gap-3">
                    <dt className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>
                      {isBn ? row.label.bn : row.label.en}
                    </dt>
                    <dd className={`font-mono font-semibold text-right ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                      {isBn ? row.value.bn : row.value.en}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <p className={`text-[11px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
          {isBn
            ? `সকল ফি ভর্তি অফিসের প্রকাশিত তালিকা অনুযায়ী। বিস্তারিত জানতে হটলাইন ${UNIVERSITY_INFO.contact.admissionPhone} নম্বরে যোগাযোগ করুন।`
            : `All figures are taken from the fee tables published by the BIST admission office. For details, call the helpline on ${UNIVERSITY_INFO.contact.admissionPhone}.`}
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => navigateTo('apply-online')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-yellow-400 hover:from-emerald-600 hover:to-yellow-500 text-slate-950 font-heading font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer"
        >
          <span>{isBn ? 'অনলাইনে আবেদন করুন' : 'Apply Online'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => navigateTo('honours-programs')}
          className={`px-5 py-3 rounded-xl font-heading font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
            theme === 'dark'
              ? 'text-emerald-700 dark:text-emerald-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10'
              : 'text-emerald-800 hover:text-emerald-950 bg-white hover:bg-emerald-50 border border-emerald-300 shadow-sm'
          }`}
        >
          <Layers className="w-4 h-4 text-emerald-600" />
          <span>{isBn ? 'সকল অনার্স প্রোগ্রাম' : 'All Honours Programs'}</span>
        </button>
      </div>
    </div>
  );
};
