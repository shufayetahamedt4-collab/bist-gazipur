import React from 'react';
import { Quote, Award, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PrincipalMessage: React.FC = () => {
  const { language, navigateTo, theme } = useApp();
  const isBn = language === 'bn';

  /**
   * The Principal does not appear in the /all-teachers roster that also lists the
   * Vice-Principal and Registrar, so his details are declared here rather than pulled
   * from the faculty list. bist.edu.bd publishes his photograph but no academic
   * credentials, so none are shown.
   */
  const principal = {
    name: { en: 'Md. Deluwar Hosain', bn: 'মোঃ দেলোয়ার হোসেন' },
  };

  /** Verbatim from bist.edu.bd → "Message from Founder & Principal". */
  const message = {
    en: 'The world is moving towards the development of civilization very fast through the use of science and technology, where our country is one of the significant participants. Our educational institutes are working very effectively to make the country go ahead in this digital age. BGIFT Institute of Science and Technology is one of those institutes that is working with great efforts to create manpower that can contribute to the development of the country.',
    bn: 'বিজ্ঞান ও প্রযুক্তির ব্যবহারে বিশ্ব সভ্যতার অগ্রযাত্রা অত্যন্ত দ্রুত এগিয়ে চলছে এবং আমাদের দেশ তার অন্যতম গুরুত্বপূর্ণ অংশীদার। ডিজিটাল যুগে দেশকে এগিয়ে নিতে আমাদের শিক্ষা প্রতিষ্ঠানগুলো অত্যন্ত কার্যকরভাবে কাজ করছে। বিজিআইএফটি ইনস্টিটিউট অব সায়েন্স অ্যান্ড টেকনোলজি তেমনই একটি প্রতিষ্ঠান, যা দেশের উন্নয়নে অবদান রাখতে পারে এমন দক্ষ মানবসম্পদ গড়ে তুলতে সর্বাত্মক প্রচেষ্টা চালিয়ে যাচ্ছে।',
  };

  return (
    <section className={`py-16 sm:py-20 px-4 sm:px-6 relative transition-colors ${
      theme === 'dark' ? 'bg-[#050816]/70' : 'bg-slate-50/70 cyber-grid-light'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className={`relative rounded-3xl p-6 sm:p-10 lg:p-12 border overflow-hidden shadow-xl backdrop-blur-xl ${
          theme === 'dark'
            ? 'glass-panel-dark border-emerald-500/30'
            : 'bg-white/95 border-emerald-200/90 shadow-[0_12px_40px_rgba(5,150,105,0.07)]'
        }`}>
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Principal Portrait */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden p-1.5 bg-gradient-to-tr from-emerald-500 via-teal-400 to-yellow-400 shadow-2xl group">
                <img
                  src="/images/principal.jpg"
                  alt={principal.name.en}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold text-center border border-white/20">
                  {isBn ? 'অধ্যক্ষ ও প্রতিষ্ঠাতা' : 'Principal & Founder'}
                </div>
              </div>

              <div>
                <h3 className={`font-heading font-extrabold text-xl ${
                  theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
                }`}>
                  {isBn ? principal.name.bn : principal.name.en}
                </h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-extrabold mt-0.5 tracking-wide">
                  {isBn ? 'অধ্যক্ষ ও প্রতিষ্ঠাতা, বিআইএসটি' : 'Principal & Founder, BIST'}
                </p>
                <div className={`inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                  theme === 'dark'
                    ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}>
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isBn ? 'সভাপতি, পিআইএএনইউ কেন্দ্রীয় কমিটি' : 'President, PIANU Central Committee'}</span>
                </div>
              </div>
            </div>

            {/* Principal Message */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl border shrink-0 ${
                  theme === 'dark'
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}>
                  <Quote className="w-6 h-6" />
                </div>
                <div>
                  <span className={`text-xs font-bold uppercase tracking-wider block ${
                    theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'
                  }`}>
                    {isBn ? 'অধ্যক্ষ ও প্রতিষ্ঠাতার বাণী' : 'Message from Principal & Founder'}
                  </span>
                  <span className={`text-xs block font-medium ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {isBn ? 'দক্ষ মানবসম্পদ সৃষ্টিতে অবিচল অঙ্গীকার' : 'Building the manpower for a digital Bangladesh'}
                  </span>
                </div>
              </div>

              <div className={`space-y-4 text-sm sm:text-base leading-relaxed ${
                theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
              }`}>
                <p className="font-medium italic border-l-4 border-emerald-500 pl-4 py-1">
                  {isBn ? message.bn : message.en}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigateTo('about')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-yellow-400 hover:from-emerald-400 hover:to-yellow-300 text-slate-950 text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>{isBn ? 'প্রতিষ্ঠানের ইতিহাস জানুন' : 'Read Institutional History'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigateTo('faculty')}
                  className={`text-xs font-bold transition-colors cursor-pointer ${
                    theme === 'dark' ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-800 hover:text-emerald-950'
                  }`}
                >
                  {isBn ? 'সকল শিক্ষকমণ্ডলীর তালিকা →' : 'Meet Our Faculty →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
