import React from 'react';
import { Layers, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PARTNERS_PROJECTS } from '../../data/mockData';

export const ProjectsPartnersMarquee: React.FC = () => {
  const { language, navigateTo, theme } = useApp();
  const isBn = language === 'bn';

  return (
    <section className={`py-16 px-4 sm:px-6 border-y transition-colors overflow-hidden ${
      theme === 'dark'
        ? 'border-white/5 bg-[#040714]/80'
        : 'border-emerald-100 bg-white'
    }`}>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            theme === 'dark'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
          }`}>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isBn ? 'জাতীয় ও আন্তর্জাতিক প্রকল্প' : 'Industry Partners & Projects'}</span>
          </div>
          <h2 className={`font-heading text-2xl sm:text-3xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
          }`}>
            {isBn ? 'দক্ষতা উন্নয়ন প্রকল্প ও কৌশলগত সহযোগী' : 'National Skill Projects & Sister Concerns'}
          </h2>
          <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            {isBn
              ? 'বিআইএসটি সফলভাবে বাংলাদেশ সরকার ও আন্তর্জাতিক উন্নয়ন সহযোগীদের একাধিক স্কিল প্রোগ্রাম পরিচালনা করছে।'
              : 'Empowering certified workforce programs in partnership with SEIP, BGMEA, UNDP, and Swisscontact.'}
          </p>
        </div>

        {/* Sliding Marquee Track */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex items-center gap-4 py-2 animate-marquee whitespace-nowrap">
            {[...PARTNERS_PROJECTS, ...PARTNERS_PROJECTS].map((partner, idx) => (
              <div
                key={idx}
                className={`inline-flex flex-col items-center justify-center px-6 py-4 rounded-2xl border transition-all min-w-[220px] ${
                  theme === 'dark'
                    ? 'glass-panel-dark hover:border-emerald-500/40'
                    : 'bg-white/95 border-emerald-100 hover:border-emerald-300 shadow-sm'
                }`}
              >
                <span className={`font-heading font-bold text-base tracking-wide ${
                  theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
                }`}>
                  {partner.name}
                </span>
                <span className="text-[11px] text-emerald-600 font-bold mt-0.5">
                  {partner.category}
                </span>
                <span className={`text-[10px] mt-1 text-center line-clamp-1 max-w-[190px] ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {partner.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => navigateTo('projects')}
            className={`text-xs font-bold inline-flex items-center gap-1 cursor-pointer ${
              theme === 'dark' ? 'text-yellow-400 hover:text-yellow-300' : 'text-emerald-700 hover:text-emerald-900'
            }`}
          >
            <span>{isBn ? 'সকল প্রকল্পের বিস্তারিত কার্যসূচি দেখুন' : 'Explore All Government & RPL Training Projects'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
