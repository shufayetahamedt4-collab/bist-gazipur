import React from 'react';
import { Award, ShieldCheck, CheckCircle2, BookmarkCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UNIVERSITY_INFO } from '../../data/mockData';

export const TrustBar: React.FC = () => {
  const { language, theme } = useApp();
  const isBn = language === 'bn';

  return (
    <section className={`py-6 px-4 sm:px-6 border-y transition-colors ${
      theme === 'dark'
        ? 'border-white/5 bg-[#050816]/70'
        : 'border-emerald-100/80 bg-emerald-50/50'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            <BookmarkCheck className="w-4 h-4 text-emerald-600" />
            <span>{isBn ? 'স্বীকৃতি ও প্রাতিষ্ঠানিক কোড:' : 'Accreditation & Institutional Codes:'}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {/* NU Code */}
            <div className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border transition-all ${
              theme === 'dark'
                ? 'bg-white/[0.03] border-emerald-500/20 text-white'
                : 'bg-white/95 border-emerald-200/90 shadow-sm text-slate-800'
            }`}>
              <Award className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="text-left">
                <span className="text-[10px] text-slate-500 block uppercase font-medium">
                  {isBn ? 'জাতীয় বিশ্ববিদ্যালয় কোড' : 'National University Code'}
                </span>
                <span className={`font-heading font-extrabold text-sm tracking-wide ${
                  theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
                }`}>
                  5526
                </span>
              </div>
            </div>

            {/* BTEB Code */}
            <div className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border transition-all ${
              theme === 'dark'
                ? 'bg-white/[0.03] border-emerald-500/20 text-white'
                : 'bg-white/95 border-emerald-200/90 shadow-sm text-slate-800'
            }`}>
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="text-left">
                <span className="text-[10px] text-slate-500 block uppercase font-medium">
                  {isBn ? 'কারিগরি শিক্ষাবোর্ড কোড' : 'BTEB College Code'}
                </span>
                <span className={`font-heading font-extrabold text-sm tracking-wide ${
                  theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
                }`}>
                  53098
                </span>
              </div>
            </div>

            {/* NSDA Code */}
            <div className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border transition-all ${
              theme === 'dark'
                ? 'bg-white/[0.03] border-yellow-500/20 text-white'
                : 'bg-white/95 border-yellow-300/80 shadow-sm text-slate-800'
            }`}>
              <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
              <div className="text-left">
                <span className="text-[10px] text-slate-500 block uppercase font-medium">
                  {isBn ? 'এনএসডিএ স্বীকৃতি কোড' : 'NSDA Training Code'}
                </span>
                <span className={`font-heading font-extrabold text-sm tracking-wide ${
                  theme === 'dark' ? 'text-yellow-400' : 'text-amber-700'
                }`}>
                  STP-GAZ-000020
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
