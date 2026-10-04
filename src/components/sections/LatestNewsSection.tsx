import React from 'react';
import { Newspaper, ArrowRight, Calendar, User, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NEWS } from '../../data/mockData';

export const LatestNewsSection: React.FC = () => {
  const { language, navigateTo, theme } = useApp();
  const isBn = language === 'bn';

  return (
    <section className={`py-20 px-4 sm:px-6 relative transition-colors ${
      theme === 'dark' ? 'bg-[#070b1a]/40' : 'bg-slate-50/50 cyber-grid-light'
    }`}>
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              theme === 'dark'
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            }`}>
              <Newspaper className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isBn ? 'সংবাদ ও মিডিয়া' : 'University News'}</span>
            </div>
            <h2 className={`font-heading text-3xl sm:text-4xl font-extrabold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
            }`}>
              {isBn ? 'সাম্প্রতিক প্রাতিষ্ঠানিক সংবাদ' : 'Latest News & Achievements'}
            </h2>
            <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {isBn
                ? 'ক্যাম্পাস গবেষণা, জাতীয় ফোরামে নেতৃত্ব ও কৃতি শিক্ষার্থীদের অর্জন।'
                : 'Campus research, academic recognitions, and milestone events at BIST.'}
            </p>
          </div>

          <button
            onClick={() => navigateTo('news')}
            className={`self-start sm:self-auto text-xs font-bold flex items-center gap-1 cursor-pointer ${
              theme === 'dark' ? 'text-yellow-400 hover:text-yellow-300' : 'text-emerald-700 hover:text-emerald-900'
            }`}
          >
            <span>{isBn ? 'সকল সংবাদ দেখুন' : 'View All News'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className={`group rounded-2xl overflow-hidden border transition-all flex flex-col justify-between hover:-translate-y-1 ${
                theme === 'dark'
                  ? 'glass-panel-dark hover:border-emerald-500/40 shadow-xl'
                  : 'bg-white/95 border-emerald-100 hover:border-emerald-300 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-yellow-300 text-[10px] font-bold uppercase tracking-wider border border-yellow-400/30">
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-2 left-3 text-[11px] text-slate-200 flex items-center gap-2">
                  {item.date && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      {item.date}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className={`font-heading font-bold text-base transition-colors line-clamp-2 ${
                    theme === 'dark' ? 'text-white group-hover:text-emerald-700 dark:hover:text-emerald-300' : 'text-[#0b192c] group-hover:text-emerald-700'
                  }`}>
                    {isBn ? item.title.bn : item.title.en}
                  </h3>
                  <p className={`text-xs line-clamp-3 leading-relaxed ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {isBn ? item.summary.bn : item.summary.en}
                  </p>
                </div>

                <div className={`pt-3 border-t flex items-center justify-between ${
                  theme === 'dark' ? 'border-white/10' : 'border-emerald-100'
                }`}>
                  <span className={`text-[11px] flex items-center gap-1 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <User className="w-3 h-3 text-emerald-600" />
                    {item.author}
                  </span>
                  <button
                    onClick={() => navigateTo('news')}
                    className={`text-xs font-bold flex items-center gap-1 cursor-pointer ${
                      theme === 'dark' ? 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300' : 'text-emerald-700 hover:text-emerald-900'
                    }`}
                  >
                    <span>{isBn ? 'সম্পূর্ণ পড়ুন' : 'Read Story'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
