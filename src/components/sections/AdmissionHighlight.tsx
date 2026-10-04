import React from 'react';
import { Sparkles, ArrowRight, Award, GraduationCap, CheckCircle2, HeartHandshake, Shield, Calculator, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UNIVERSITY_INFO } from '../../data/mockData';

export const AdmissionHighlight: React.FC = () => {
  const { language, navigateTo, theme } = useApp();
  const isBn = language === 'bn';

  return (
    <section className="relative py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div
          className={`relative rounded-3xl p-6 sm:p-10 border shadow-xl overflow-hidden backdrop-blur-xl transition-all ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-emerald-950/80 via-[#0a0f26]/90 to-slate-950/80 border-emerald-500/30'
              : 'bg-gradient-to-br from-emerald-50 via-white to-yellow-50/80 border-emerald-200/90 shadow-[0_12px_40px_rgba(5,150,105,0.08)]'
          }`}
        >
          {/* Subtle background decorative badge */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  theme === 'dark'
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {isBn
                    ? 'বিশেষ সুযোগ ও শতভাগ শিক্ষাবৃত্তি'
                    : 'Special Admission Opportunity & 100% Scholarships'}
                </span>
              </div>

              <h2
                className={`font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
                  theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
                }`}
              >
                {isBn
                  ? 'ডিপ্লোমা উত্তীর্ণদের সরাসরি বি.এসসি ইঞ্জিনিয়ারিং ও ১০০ জনের শতভাগ স্কলারশিপ'
                  : 'Direct B.Sc. Engineering for Polytechnic Diploma Holders & 100% Full Scholarships'}
              </h2>

              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {isBn
                  ? 'জাতীয় বিশ্ববিদ্যালয় অধিভুক্ত ২০২৫-২৬ সেশনে বি.এসসি (অনার্স) ইন সিএসই, টিএসটি, এএমটি, এফডিটি এবং প্রফেশনাল বিবিএ কোর্সে ভর্তি শুরু হয়েছে। পলিটেকনিকের যে কোনো ডিপ্লোমাধারীদের জন্য সরাসরি ক্রেডিট সমন্বয়ের সুবিধা।'
                  : 'Admissions are officially open for National University 2025-26 academic session across B.Sc. (Hons.) in CSE, TST, AMT, FDT, and Professional BBA. Diploma-passed students can seamlessly enroll in undergraduate engineering degrees.'}
              </p>

              {/* Verbatim announcement from the live site's top bar */}
              <div className={`rounded-2xl border p-4 space-y-1.5 ${
                theme === 'dark' ? 'bg-black/30 border-emerald-500/25' : 'bg-white/80 border-emerald-200'
              }`}>
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                  theme === 'dark' ? 'text-emerald-600 dark:text-emerald-400' : 'text-emerald-700'
                }`}>
                  {isBn ? 'অফিসিয়াল ভর্তি বিজ্ঞপ্তি (bist.edu.bd)' : 'Official admission announcement (bist.edu.bd)'}
                </span>
                <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  {isBn ? UNIVERSITY_INFO.announcement.bn : UNIVERSITY_INFO.announcement.en}
                </p>
              </div>

              {/* 4 Feature Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                    <strong className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {isBn ? '১০০ জনের ১০০% স্কলারশিপ: ' : '100% Waiver for 100: '}
                    </strong>
                    {isBn ? 'কোর্স ফির ওপর পূর্ণাঙ্গ স্কলারশিপ' : 'Full waiver for 100 learners'}
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                    <strong className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {isBn ? 'ডিপ্লোমা টু ডিগ্রি সুবিধা: ' : 'Diploma to Degree: '}
                    </strong>
                    {isBn ? 'সিএসই, টিএসটি, এএমটি ও এফডিটি' : 'Direct admission for polytechnic grads'}
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                    <strong className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {isBn ? '৫০% – ১০০% মেধা বৃত্তি: ' : '50%–100% Merit Aid: '}
                    </strong>
                    {isBn ? 'এসএসসি/এইচএসসি জিপিএ অনুযায়ী' : 'Based on SSC/HSC GPA'}
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <HeartHandshake className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                    <strong className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {isBn ? 'বিশেষ কোটা সুবিধা: ' : 'Inclusivity Quotas: '}
                    </strong>
                    {isBn ? 'প্রতিবন্ধী ও ক্ষুদ্র নৃগোষ্ঠীর অগ্রাধিকার' : 'For disabled & minorities'}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => navigateTo('apply-online')}
                  className="px-6 py-3 rounded-xl font-heading font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-emerald-500 via-emerald-400 to-yellow-400 hover:from-emerald-600 hover:to-yellow-500 shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{isBn ? 'অনলাইনে আবেদন করুন' : 'Apply Online Now'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('calculator')}
                  className={`px-4 py-3 rounded-xl font-heading font-semibold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                    theme === 'dark'
                      ? 'text-emerald-700 dark:text-emerald-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10'
                      : 'text-emerald-800 hover:text-emerald-950 bg-white hover:bg-emerald-50 border border-emerald-300 shadow-sm'
                  }`}
                >
                  <Calculator className="w-4 h-4 text-emerald-600" />
                  <span>{isBn ? 'স্কলারশিপ হিসাব করুন' : 'Calculate Fee Waiver'}</span>
                </button>
              </div>
            </div>

            {/* Right Visual Image Card (5 cols) */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/30 aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="./images/gallery/g08.jpeg"
                  alt="BIST Gazipur Campus Students"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Overlaid Badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-between p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg bg-yellow-400 text-slate-950 text-xs font-bold shadow-md">
                      {isBn ? '১০০% স্কলারশিপ প্রকল্প' : '100% Scholarship Scheme'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-white font-mono text-[10px] border border-white/20">
                      NU: 5526
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-300 font-bold uppercase tracking-wider block">
                      {isBn ? 'সেশন ২০২৫-২৬' : 'Session 2025-26'}
                    </span>
                    <h3 className="font-heading font-extrabold text-lg text-white leading-tight">
                      {isBn ? 'আগামীর প্রকৌশলী ও প্রযুক্তিবিদ' : 'Empowering Tomorrow’s Innovators'}
                    </h3>
                    <p className="text-[11px] text-slate-300 leading-normal">
                      {isBn
                        ? 'গাজীপুরের চান্দনা চৌরাস্তায় অবস্থিত অত্যাধুনিক ক্যাম্পাস ও ল্যাবরেটরি।'
                        : 'Modern academic laboratories and industry-ready curricula at Gazipur.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
