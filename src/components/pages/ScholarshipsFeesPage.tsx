import React, { useState } from 'react';
import {
  Calculator,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Percent,
  Layers,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PROGRAMS, OTHER_FEE_TABLES } from '../../data/mockData';

export const ScholarshipsFeesPage: React.FC = () => {
  const { language, navigateTo, theme } = useApp();
  const isBn = language === 'bn';

  // Calculator State
  const [selectedProgram, setSelectedProgram] = useState(PROGRAMS[0].id);
  const [sscGpa, setSscGpa] = useState<string>('5.00');
  const [hscGpa, setHscGpa] = useState<string>('5.00');
  const [quota, setQuota] = useState<string>('merit');

  const currentProg = PROGRAMS.find((p) => p.id === selectedProgram) || PROGRAMS[0];

  /**
   * Waiver bands are keyed on the SUM of the SSC + HSC GPA, exactly as published in
   * the official tuition fee table on bist.edu.bd/page/tuition-fee.
   */
  const TIER_THRESHOLDS = [0, 6, 7, 8, 9, 10];

  const calculateWaiver = (): {
    percentage: number;
    label: string;
    totalCost: number;
    monthlyTuition: number;
    savings: number;
  } => {
    const totalGpa = (parseFloat(sscGpa) || 0) + (parseFloat(hscGpa) || 0);

    if (quota === 'full100') {
      return {
        percentage: 100,
        label: isBn
          ? '১০০ জনের জন্য ১০০% কোর্স ফি স্কলারশিপ (শর্ত প্রযোজ্য)'
          : '100% course-fee scholarship scheme for 100 students (terms apply)',
        totalCost: 0,
        monthlyTuition: 0,
        savings: currentProg.totalFee,
      };
    }

    if (quota === 'inclusion') {
      // The official announcement promises 50%-100% for students with disabilities and
      // ethnic-minority students, assessed individually. We quote the lower bound.
      const percentage = 50;
      const totalCost = Math.round((currentProg.totalFee * (100 - percentage)) / 100);
      return {
        percentage,
        label: isBn
          ? 'অন্তর্ভুক্তিমূলক সহায়তা: ৫০%-১০০% (ব্যক্তিভিত্তিক মূল্যায়ন, অনুমান ৫০%)'
          : 'Inclusion support: 50%-100% assessed case by case (estimate shown at 50%)',
        totalCost,
        monthlyTuition: Math.round(currentProg.monthlyTuition / 2),
        savings: currentProg.totalFee - totalCost,
      };
    }

    let index = 0;
    for (let i = TIER_THRESHOLDS.length - 1; i >= 0; i--) {
      if (totalGpa >= TIER_THRESHOLDS[i]) {
        index = i;
        break;
      }
    }

    const tier = currentProg.waiverTiers[index];
    return {
      percentage: tier.waiverPercent,
      label: `${isBn ? 'প্রকাশিত ছাড়' : 'Published waiver'} · ${isBn ? tier.band.bn : tier.band.en}`,
      totalCost: tier.totalCost,
      monthlyTuition: tier.monthlyTuition,
      savings: currentProg.totalFee - tier.totalCost,
    };
  };

  const waiverResult = calculateWaiver();

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
          theme === 'dark'
            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
        }`}>
          <Calculator className="w-3.5 h-3.5 text-emerald-600" />
          <span>{isBn ? 'ফি ও স্কলারশিপ মূল্যায়ন' : 'Financial Aid & Scholarship Calculator'}</span>
        </div>
        <h1 className={`font-heading text-3xl sm:text-4xl font-extrabold tracking-tight ${
          theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
        }`}>
          {isBn ? 'ইন্টারেক্টিভ ফি ও স্কলারশিপ ক্যালকুলেটর' : 'Calculate Your Exact Tuition & Waiver'}
        </h1>
        <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          {isBn
            ? 'আপনার এসএসসি ও এইচএসসি পরীক্ষার জিপিএ এবং প্রযোজ্য কোটা নির্বাচন করে আপনার প্রকৃত টিউশন ফি ও সেমিস্টার কিস্তির হিসাব করুন।'
            : 'Select your degree and test scores to view your personalized scholarship discount and semester installments.'}
        </p>
      </div>

      {/* Calculator Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs */}
        <div className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border space-y-5 ${
          theme === 'dark'
            ? 'glass-panel-dark border-emerald-500/30'
            : 'bg-white/95 border-emerald-100 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
        }`}>
          <h2 className={`font-heading font-bold text-lg border-b pb-3 flex items-center gap-2 ${
            theme === 'dark' ? 'text-white border-white/10' : 'text-[#0b192c] border-emerald-100'
          }`}>
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{isBn ? 'আপনার বিবরণী দিন' : 'Enter Your Credentials'}</span>
          </h2>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className={`font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                {isBn ? 'আকাঙ্ক্ষিত প্রোগ্রাম' : 'Target Program'}
              </label>
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className={`w-full p-3 rounded-xl border font-medium focus:outline-none transition-colors ${
                  theme === 'dark'
                    ? 'bg-black/50 border-white/10 text-white focus:border-emerald-500'
                    : 'bg-slate-50 border-emerald-200 text-slate-800 focus:border-emerald-500'
                }`}
              >
                {PROGRAMS.map((prog) => (
                  <option key={prog.id} value={prog.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    {prog.shortTitle} - {isBn ? prog.title.bn : prog.title.en} (Total: ৳{prog.totalFee.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className={`font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  SSC / Equivalent GPA (Out of 5.0)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="2.00"
                  max="5.00"
                  value={sscGpa}
                  onChange={(e) => setSscGpa(e.target.value)}
                  className={`w-full p-3 rounded-xl border font-mono focus:outline-none transition-colors ${
                    theme === 'dark'
                      ? 'bg-black/50 border-white/10 text-white focus:border-emerald-500'
                      : 'bg-slate-50 border-emerald-200 text-slate-800 focus:border-emerald-500'
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className={`font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  HSC / Diploma GPA (Out of 5.0)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="2.00"
                  max="5.00"
                  value={hscGpa}
                  onChange={(e) => setHscGpa(e.target.value)}
                  className={`w-full p-3 rounded-xl border font-mono focus:outline-none transition-colors ${
                    theme === 'dark'
                      ? 'bg-black/50 border-white/10 text-white focus:border-emerald-500'
                      : 'bg-slate-50 border-emerald-200 text-slate-800 focus:border-emerald-500'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={`font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                Quota / Scheme Category
              </label>
              <select
                value={quota}
                onChange={(e) => setQuota(e.target.value)}
                className={`w-full p-3 rounded-xl border focus:outline-none transition-colors ${
                  theme === 'dark'
                    ? 'bg-black/50 border-white/10 text-white focus:border-emerald-500'
                    : 'bg-slate-50 border-emerald-200 text-slate-800 focus:border-emerald-500'
                }`}
              >
                <option value="merit">General Scholastic Merit (Based on GPA)</option>
                <option value="full100">100% Scholarship Scheme for 100 Students (Conditions Apply)</option>
                <option value="diploma">Polytechnic Diploma-in-Engineering Passed Student</option>
                <option value="female">Female Student Tech Education Special Quota</option>
                <option value="disabled">Physically Challenged Special Support Quota</option>
                <option value="tribal">Ethnic Minority / Tribal Community Quota</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Output Card */}
        <div className={`lg:col-span-5 rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-emerald-950/80 via-[#0b192c] to-slate-950 border-emerald-500/40 glow-green text-white'
            : 'bg-gradient-to-br from-emerald-50 via-white to-yellow-50 border-emerald-200 shadow-[0_12px_40px_rgba(5,150,105,0.1)] text-slate-900'
        }`}>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-bold block">
              Estimated Fee Breakdown
            </span>
            <h3 className="font-heading font-extrabold text-xl">
              {currentProg.shortTitle} · {currentProg.degree}
            </h3>
            <span className="text-xs text-amber-700 dark:text-amber-300 font-bold block">
              {waiverResult.label}
            </span>
          </div>

          {/* Waiver metric */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between ${
            theme === 'dark' ? 'bg-white/[0.04] border-white/10' : 'bg-white/90 border-emerald-200 shadow-sm'
          }`}>
            <div>
              <span className="text-xs text-slate-500 block font-medium">
                {isBn ? 'প্রযোজ্য ছাড়' : 'Applicable waiver'}
              </span>
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-emerald-600 font-mono">
                {waiverResult.percentage}% OFF
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-500 block">{isBn ? 'মোট সাশ্রয়' : 'Total savings'}</span>
              <span className="font-mono text-emerald-700 dark:text-emerald-300 font-bold text-sm">
                ৳{waiverResult.savings.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Published fee components */}
          <div className={`space-y-2.5 text-xs font-mono border-t pt-4 ${
            theme === 'dark' ? 'border-white/10 text-slate-300' : 'border-emerald-200 text-slate-700'
          }`}>
            <div className="flex justify-between">
              <span className="text-slate-500">{isBn ? 'ভর্তি ফি (একবার):' : 'Admission fee (one-off):'}</span>
              <span>৳{currentProg.admissionFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{isBn ? 'সেমিস্টার ফি:' : 'Semester fee:'}</span>
              <span>৳{currentProg.semesterFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{isBn ? 'মাসিক টিউশন:' : 'Monthly tuition:'}</span>
              <span>৳{waiverResult.monthlyTuition.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-emerald-600 font-bold">
              <span>{isBn ? 'ছাড়:' : 'Waiver:'}</span>
              <span>- ৳{waiverResult.savings.toLocaleString()}</span>
            </div>
            <div className={`flex justify-between text-sm font-bold border-t pt-2 font-heading ${
              theme === 'dark' ? 'border-white/10 text-white' : 'border-emerald-200 text-slate-950'
            }`}>
              <span>{isBn ? 'মোট কোর্স ফি:' : 'Total course fee:'}</span>
              <span className="text-emerald-700 dark:text-emerald-400">৳{waiverResult.totalCost.toLocaleString()}</span>
            </div>
            <p className="text-[10px] font-sans text-slate-500 pt-2 leading-relaxed">
              {isBn
                ? 'ছাড় এসএসসি ও এইচএসসি জিপিএর যোগফল অনুযায়ী প্রকাশিত ফি তালিকার ভিত্তিতে দেখানো হয়েছে। চূড়ান্ত হিসাব ভর্তি অফিসে নিশ্চিত করুন — হটলাইন ০১৯১৩-৫৫৫১১১।'
                : 'The waiver follows the officially published fee table and is keyed on the sum of your SSC and HSC GPA. Confirm final dues with the admission office — helpline 01913-555111.'}
            </p>
          </div>

          <button
            onClick={() => navigateTo('apply-online')}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-yellow-400 hover:from-emerald-600 hover:to-yellow-500 text-slate-950 font-heading font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
          >
            <span>{isBn ? 'এই স্কলারশিপে আবেদন করুন' : 'Claim This Scholarship & Apply'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Official Tuition Fee Structure Table */}
      <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
        theme === 'dark' ? 'glass-panel-dark' : 'bg-white/95 border-emerald-100 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
      }`}>
        <div className="space-y-1">
          <h3 className={`font-heading font-bold text-xl ${
            theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
          }`}>
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
            <thead className={`uppercase font-mono text-[10px] border-b ${
              theme === 'dark' ? 'bg-black/40 text-slate-400 border-white/10' : 'bg-emerald-50 text-emerald-900 border-emerald-200'
            }`}>
              <tr>
                <th className="py-3 px-4">Program Title</th>
                <th className="py-3 px-4">Affiliation</th>
                <th className="py-3 px-4 text-center">Duration</th>
                <th className="py-3 px-4 text-center">Credits</th>
                <th className="py-3 px-4 text-right">Per Semester Fee</th>
                <th className="py-3 px-4 text-right">Total Course Fee</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              theme === 'dark' ? 'divide-white/5 text-slate-300' : 'divide-emerald-100 text-slate-700'
            }`}>
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
                      Apply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* GPA-wise waiver bands for the selected programme */}
      <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
        theme === 'dark' ? 'glass-panel-dark' : 'bg-white/95 border-emerald-100 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
      }`}>
        <div className="space-y-1">
          <h3 className={`font-heading font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
            {isBn ? 'জিপিএ অনুযায়ী ছাড়ের তালিকা' : 'GPA-wise waiver table'} · {currentProg.shortTitle}
          </h3>
          <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            {isBn
              ? 'এসএসসি ও এইচএসসি জিপিএর যোগফলের ভিত্তিতে ভর্তি অফিসের প্রকাশিত তালিকা।'
              : 'As published by the BIST admission office; bands are keyed on the sum of your SSC and HSC GPA.'}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className={`uppercase font-mono text-[10px] border-b ${
              theme === 'dark' ? 'bg-black/40 text-slate-400 border-white/10' : 'bg-emerald-50 text-emerald-900 border-emerald-200'
            }`}>
              <tr>
                <th className="py-3 px-4">{isBn ? 'জিপিএ ব্যান্ড (এসএসসি + এইচএসসি)' : 'GPA band (SSC + HSC)'}</th>
                <th className="py-3 px-4 text-center">{isBn ? 'ছাড়' : 'Waiver'}</th>
                <th className="py-3 px-4 text-right">{isBn ? 'মাসিক টিউশন' : 'Monthly tuition'}</th>
                <th className="py-3 px-4 text-right">{isBn ? 'মোট কোর্স ফি' : 'Total course fee'}</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'dark' ? 'divide-white/5 text-slate-300' : 'divide-emerald-100 text-slate-700'}`}>
              {currentProg.waiverTiers.map((tier) => (
                <tr key={tier.band.en} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="py-2.5 px-4 font-mono">{isBn ? tier.band.bn : tier.band.en}</td>
                  <td className="py-2.5 px-4 text-center font-bold text-emerald-700 dark:text-emerald-400">
                    {tier.waiverPercent}%
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono">৳{tier.monthlyTuition.toLocaleString()}</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold">৳{tier.totalCost.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Executive and MBA fee tables published by the admission office */}
      <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
        theme === 'dark' ? 'glass-panel-dark' : 'bg-white/95 border-emerald-100 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
      }`}>
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
            ? 'সকল ফি ভর্তি অফিসের প্রকাশিত তালিকা অনুযায়ী। বিস্তারিত জানতে হটলাইন ০১৯১৩-৫৫১১১১ নম্বরে যোগাযোগ করুন।'
            : 'All figures are taken from the fee tables published by the BIST admission office. For details, call the helpline on 01913-555111.'}
        </p>
      </div>
    </div>
  );
};
