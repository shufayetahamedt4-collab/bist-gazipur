import React, { useState } from 'react';
import { ArrowRight, Clock, Award, Users, BookOpen, Layers, Check, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PROGRAMS, DIPLOMA_TEXTILE_PROGRAMS, DIPLOMA_ENGINEERING_PROGRAMS } from '../../data/mockData';

export const ProgramExplorer: React.FC = () => {
  const { language, navigateTo, theme } = useApp();
  const isBn = language === 'bn';

  const [activeTab, setActiveTab] = useState<'honours' | 'diploma-textile' | 'diploma-eng' | 'vocational'>('honours');

  return (
    <section className={`py-20 px-4 sm:px-6 relative transition-colors ${
      theme === 'dark' ? 'bg-[#070b1a]/50' : 'bg-slate-50/60 cyber-grid-light'
    }`}>
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            theme === 'dark'
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
          }`}>
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isBn ? 'একাডেমিক প্রোগ্রামসমূহ' : 'Curated Academic Programs'}</span>
          </div>

          <h2 className={`font-heading text-3xl sm:text-4xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
          }`}>
            {isBn ? 'আপনার স্বপ্নের ক্যারিয়ার অনুযায়ী ডিগ্রি বেছে নিন' : 'Choose Your Future-Proof Degree'}
          </h2>

          <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            {isBn
              ? 'জাতীয় বিশ্ববিদ্যালয়ের ৪ বছর মেয়াদি বি.এসসি (অনার্স) ও বিবিএ এবং কারিগরি শিক্ষা বোর্ডের ডিপ্লোমা ইঞ্জিনিয়ারিং কোর্সসমূহ।'
              : 'National University affiliated 4-year Honours degrees and BTEB 4-year Diploma in Engineering curricula.'}
          </p>

          {/* Interactive Filter Control Tabs */}
          <div className={`flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl border max-w-xl mx-auto pt-1.5 transition-colors ${
            theme === 'dark'
              ? 'bg-slate-900/80 border-white/10'
              : 'bg-white/95 border-emerald-100 shadow-sm'
          }`}>
            <button
              onClick={() => setActiveTab('honours')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'honours'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md font-bold'
                  : theme === 'dark'
                  ? 'text-slate-400 hover:text-white hover:bg-white/5'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              {isBn ? 'স্নাতক (অনার্স)' : 'Undergraduate (Honours)'}
            </button>

            <button
              onClick={() => setActiveTab('diploma-textile')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'diploma-textile'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md font-bold'
                  : theme === 'dark'
                  ? 'text-slate-400 hover:text-white hover:bg-white/5'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              {isBn ? 'ডিপ্লোমা ইন টেক্সটাইল' : 'Diploma in Textile'}
            </button>

            <button
              onClick={() => setActiveTab('diploma-eng')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'diploma-eng'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md font-bold'
                  : theme === 'dark'
                  ? 'text-slate-400 hover:text-white hover:bg-white/5'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              {isBn ? 'ডিপ্লোমা ইন ইঞ্জিনিয়ারিং' : 'Diploma in Engineering'}
            </button>

            <button
              onClick={() => setActiveTab('vocational')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'vocational'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md font-bold'
                  : theme === 'dark'
                  ? 'text-slate-400 hover:text-white hover:bg-white/5'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              {isBn ? 'এইচএসসি (BM) ও এসএসসি' : 'HSC (BM) & SSC'}
            </button>
          </div>
        </div>

        {/* Tab 1: Honours Bento Grid (5 Departments: TST, CSE, BBA, FDT, AMT) */}
        {activeTab === 'honours' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((prog) => (
              <div
                key={prog.id}
                className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${
                  theme === 'dark'
                    ? 'glass-panel-dark hover:border-emerald-500/40 shadow-xl'
                    : 'bg-white/95 border-emerald-100 hover:border-emerald-300 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
                }`}
              >
                {/* Card Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={prog.featuredImage}
                    alt={prog.shortTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-yellow-300 font-mono text-xs font-bold border border-yellow-400/30">
                      {prog.shortTitle}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-900/80 backdrop-blur-md text-[10px] text-emerald-200 border border-emerald-500/30 font-medium">
                      NU Affiliated
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-slate-200 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-yellow-400" />
                      {isBn ? prog.duration.bn : prog.duration.en}
                    </span>
                    <span>8 Semesters · {prog.credits} Credits</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className={`font-heading font-bold text-lg transition-colors line-clamp-1 ${
                      theme === 'dark' ? 'text-white group-hover:text-emerald-400' : 'text-[#0b192c] group-hover:text-emerald-700'
                    }`}>
                      {isBn ? prog.title.bn : prog.title.en}
                    </h3>
                    <p className={`text-xs line-clamp-3 leading-relaxed ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {isBn ? prog.overview.bn : prog.overview.en}
                    </p>
                  </div>

                  <div className={`space-y-3 pt-3 border-t ${
                    theme === 'dark' ? 'border-white/10' : 'border-emerald-100'
                  }`}>
                    <div className="flex items-center justify-between text-xs">
                      <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>
                        {isBn ? 'সেমিস্টার ফি:' : 'Semester Fee:'}
                      </span>
                      <span className={`font-bold font-mono ${
                        theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'
                      }`}>
                        ৳{prog.semesterFee.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigateTo('department-detail', prog.id)}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                          theme === 'dark'
                            ? 'text-emerald-300 hover:text-white bg-white/5 hover:bg-emerald-900/40 border border-emerald-500/20'
                            : 'text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
                        }`}
                      >
                        <span>{isBn ? 'বিস্তারিত দেখুন' : 'View Details'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => navigateTo('apply-online')}
                        className="py-2 px-3.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-500 to-yellow-400 hover:from-emerald-400 hover:to-yellow-300 shadow-sm transition-all cursor-pointer"
                      >
                        {isBn ? 'ভর্তি' : 'Apply'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Diploma in Textile Engineering */}
        {activeTab === 'diploma-textile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DIPLOMA_TEXTILE_PROGRAMS.map((dip, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border transition-all space-y-3 ${
                  theme === 'dark'
                    ? 'glass-panel-dark hover:border-emerald-500/40'
                    : 'bg-white/95 border-emerald-100 hover:border-emerald-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {dip.code}
                  </span>
                  <span className={`text-xs flex items-center gap-1 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    {dip.duration} (8 Semesters)
                  </span>
                </div>
                <h4 className={`font-heading font-bold text-base ${
                  theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
                }`}>
                  {isBn ? dip.name.bn : dip.name.en}
                </h4>
                <p className={`text-xs leading-relaxed ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {isBn ? dip.description.bn : dip.description.en}
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-700 font-semibold">BTEB Approved #53098</span>
                  <button
                    onClick={() => navigateTo('apply-online')}
                    className="text-xs text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isBn ? 'আবেদন করুন' : 'Apply for Diploma'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Diploma in Engineering (10 Technologies) */}
        {activeTab === 'diploma-eng' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {DIPLOMA_ENGINEERING_PROGRAMS.map((prog, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border transition-all flex items-center justify-between group ${
                  theme === 'dark'
                    ? 'bg-white/[0.03] border-white/10 hover:border-emerald-500/40'
                    : 'bg-white/95 border-emerald-100 hover:border-emerald-300 shadow-sm'
                }`}
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-600 block">{prog.code}</span>
                  <h4 className={`text-xs font-semibold group-hover:text-emerald-700 transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>
                    {isBn ? prog.name.bn : prog.name.en}
                  </h4>
                  <span className={`text-[11px] block ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    4 Years · 8 Semesters
                  </span>
                </div>
                <button
                  onClick={() => navigateTo('apply-online')}
                  className={`p-2 rounded-lg transition-all shrink-0 cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-white/5 group-hover:bg-emerald-500/20 text-slate-400 group-hover:text-emerald-400'
                      : 'bg-emerald-50 group-hover:bg-emerald-100 text-emerald-700'
                  }`}
                  title="Apply for this diploma"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: HSC (BM) and SSC (Vocational) */}
        {activeTab === 'vocational' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-2xl border space-y-4 ${
              theme === 'dark' ? 'glass-panel-dark' : 'bg-white/95 border-emerald-100 shadow-sm'
            }`}>
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                BTEB Code 53098
              </div>
              <h3 className={`font-heading font-bold text-xl ${
                theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
              }`}>
                {isBn ? 'এইচএসসি (বিজনেস ম্যানেজমেন্ট - বিএম)' : 'HSC (Business Management - BM)'}
              </h3>
              <p className={`text-xs leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {isBn
                  ? 'কারিগরি শিক্ষাবোর্ডের আওতাভুক্ত ২ বছর মেয়াদি উচ্চমাধ্যমিক কোর্স। কম্পিউটার অপারেশন এবং অ্যাকাউন্টিং বিষয়ে বাস্তব দক্ষতা বৃদ্ধির সমন্বিত পাঠ্যক্রম।'
                  : 'A 2-year practical higher secondary curriculum approved by BTEB specializing in Computer Operations and Financial Accounting.'}
              </p>
              <div className={`space-y-2 text-xs ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Computer Operations Specialization</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Accounting & Commercial Studies</span>
                </div>
              </div>
              <button
                onClick={() => navigateTo('apply-online')}
                className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold text-xs transition-colors cursor-pointer"
              >
                {isBn ? 'এইচএসসি (বিএম)-এ ভর্তি আবেদন' : 'Apply for HSC (BM)'}
              </button>
            </div>

            <div className={`p-6 rounded-2xl border space-y-4 ${
              theme === 'dark' ? 'glass-panel-dark' : 'bg-white/95 border-emerald-100 shadow-sm'
            }`}>
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                BTEB Vocational Section
              </div>
              <h3 className={`font-heading font-bold text-xl ${
                theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
              }`}>
                {isBn ? 'এসএসসি (ভোকেশনাল)' : 'SSC (Vocational)'}
              </h3>
              <p className={`text-xs leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {isBn
                  ? 'মাধ্যমিক স্তরেই কারিগরি ও বৃত্তিমূলক হাতে-কলমে প্রশিক্ষণ নিশ্চিত করার লক্ষ্যে ২ বছর মেয়াদি অনুমোদিত পাঠ্যক্রম।'
                  : 'Hands-on technical foundation education starting at secondary school level for aspiring tradespeople and technicians.'}
              </p>
              <div className={`space-y-2 text-xs ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-500" />
                  <span>Electrical Maintenance & Wiring</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-500" />
                  <span>Garments Manufacturing & Machine Operation</span>
                </div>
              </div>
              <button
                onClick={() => navigateTo('apply-online')}
                className="w-full py-2.5 rounded-xl bg-yellow-50 hover:bg-yellow-100 text-yellow-900 border border-yellow-200 font-semibold text-xs transition-colors cursor-pointer"
              >
                {isBn ? 'এসএসসি (ভোকেশনাল)-এ ভর্তি আবেদন' : 'Apply for SSC (Vocational)'}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
