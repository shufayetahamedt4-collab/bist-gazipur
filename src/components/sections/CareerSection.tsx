import React from 'react';
import { Briefcase, Building, ExternalLink, ArrowRight, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ALUMNI_DIRECTORY, UNIVERSITY_INFO } from '../../data/mockData';

/**
 * Career / placement section.
 *
 * Every figure here is either one of the counters published on bist.edu.bd or derived
 * directly from data mirrored in this repo (the alumni directory). The previous copy
 * claimed a "94% placement rate" and "40+ hiring partners"; neither is published by the
 * institute, so they were removed rather than left on the page.
 */
export const CareerSection: React.FC = () => {
  const { language, navigateTo, theme } = useApp();
  const isBn = language === 'bn';

  /**
   * Employers actually named in the BIST alumni directory (bist.edu.bd/alumni-list),
   * rather than a generic list of well-known companies.
   */
  const hiringCompanies = Array.from(
    new Set(ALUMNI_DIRECTORY.map((alum) => alum.company))
  ).slice(0, 8);

  const employersInNetwork = new Set(ALUMNI_DIRECTORY.map((alum) => alum.company)).size;

  return (
    <section className={`py-20 px-4 sm:px-6 relative transition-colors ${
      theme === 'dark' ? 'bg-[#070b1a]/60' : 'bg-white'
    }`}>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              theme === 'dark'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            }`}>
              <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isBn ? 'ক্যারিয়ার ও কর্মসংস্থান সেল' : 'Career Development & Placement Cell'}</span>
            </div>

            <h2 className={`font-heading text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
            }`}>
              {isBn ? (
                <>
                  ক্যাম্পাস থেকে সরাসরি{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-500">
                    শীর্ষ করপোরেট ও টেক
                  </span>{' '}
                  প্রতিষ্ঠানে চাকরির সুযোগ
                </>
              ) : (
                <>
                  Direct Pathway to{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-500">
                    Leading Tech & Textile
                  </span>{' '}
                  Conglomerates
                </>
              )}
            </h2>

            <p className={`text-sm leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {isBn
                ? 'বিআইএসটির ক্যারিয়ার সেল মক ইন্টারভিউ, সিভি রিভিউ সেশন, সরাসরি কারখানা ইন্টার্নশিপ এবং বার্ষিক রিক্রুটমেন্ট ড্রাইভের মাধ্যমে শিক্ষার্থীদের শিল্পে যুক্ত করে। আগস্ট ২০২৬-এ ক্যাম্পাসে বিডিজবস ক্যারিয়ার সেমিনার অনুষ্ঠিত হয়েছে।'
                : 'BIST’s placement cell connects graduating talent with industry through mock technical interviews, portfolio reviews, factory internships and annual recruitment drives — including the BDjobs career seminar hosted on campus in August 2026.'}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className={`p-4 rounded-2xl border space-y-1 ${
                theme === 'dark' ? 'glass-panel-dark' : 'bg-emerald-50/70 border-emerald-200/80 shadow-sm'
              }`}>
                <span className={`font-heading font-extrabold text-2xl ${
                  theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'
                }`}>
                  {`${UNIVERSITY_INFO.stats.students.toLocaleString('en-US')}+`}
                </span>
                <span className={`text-xs block font-medium ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {isBn ? 'শিক্ষার্থী ও স্নাতক' : 'Students & graduates'}
                </span>
              </div>
              <div className={`p-4 rounded-2xl border space-y-1 ${
                theme === 'dark' ? 'glass-panel-dark' : 'bg-yellow-50/70 border-yellow-200/80 shadow-sm'
              }`}>
                <span className={`font-heading font-extrabold text-2xl ${
                  theme === 'dark' ? 'text-yellow-400' : 'text-amber-700'
                }`}>
                  {employersInNetwork}
                </span>
                <span className={`text-xs block font-medium ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {isBn
                    ? 'অ্যালামনাই ডিরেক্টরিতে নাম থাকা প্রতিষ্ঠান'
                    : 'Employers named in our alumni directory'}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={UNIVERSITY_INFO.contact.jobPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-emerald-500 to-yellow-400 hover:from-emerald-400 hover:to-yellow-300 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>{isBn ? 'বিআইএসটি জব পোর্টাল খুলুন' : 'Open BIST Job Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => navigateTo('alumni')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  theme === 'dark'
                    ? 'text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10'
                    : 'text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                <span>{isBn ? 'অ্যালামনাই নেটওয়ার্ক' : 'View Alumni Directory'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
              </button>
            </div>
          </div>

          {/* Right: Lab Image + Recruiter Grid */}
          <div className={`lg:col-span-5 rounded-3xl border overflow-hidden p-6 space-y-5 ${
            theme === 'dark' ? 'glass-panel-dark' : 'bg-white/95 border-emerald-100 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
          }`}>
            {/* Visual Engineering Lab Photo */}
            <div className="relative rounded-2xl overflow-hidden shadow-md aspect-video group">
              <img
                src="./images/dept-amt.webp"
                alt="Apparel Manufacturing & Technology department at BIST"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                <span className="text-xs font-bold text-yellow-300">
                  {isBn ? 'ব্যবহারিক ল্যাব থেকে সরাসরি কর্মক্ষেত্র' : 'Hands-on Engineering to Career'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <span className={`text-xs font-bold uppercase tracking-wider block ${
                theme === 'dark' ? 'text-slate-300' : 'text-emerald-800'
              }`}>
                {isBn
                  ? 'অ্যালামনাই ডিরেক্টরিতে নাম থাকা নিয়োগদাতা প্রতিষ্ঠান:'
                  : 'Employers named in the BIST alumni directory:'}
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                {hiringCompanies.map((comp, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-semibold transition-all ${
                      theme === 'dark'
                        ? 'bg-white/[0.03] border-white/10 text-white hover:border-emerald-500/30'
                        : 'bg-slate-50 border-emerald-100 text-slate-800 hover:border-emerald-300 hover:bg-emerald-50/50'
                    }`}
                  >
                    <Building className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{comp}</span>
                  </div>
                ))}
              </div>

              <div className={`pt-1 text-[11px] flex items-center gap-2 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  {isBn
                    ? 'সফটওয়্যার ডেভেলপমেন্ট, আইটি, মার্চেন্ডাইজিং ও কোয়ালিটি অ্যাসুরেন্স পদে কর্মরত।'
                    : 'Employed in software dev, IT, apparel merchandising & QA roles.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
