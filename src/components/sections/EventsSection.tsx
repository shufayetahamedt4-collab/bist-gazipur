import React from 'react';
import { Calendar, Clock, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EVENTS } from '../../data/mockData';

export const EventsSection: React.FC = () => {
  const { language, navigateTo, theme } = useApp();
  const isBn = language === 'bn';

  return (
    <section className={`py-20 px-4 sm:px-6 relative transition-colors ${
      theme === 'dark' ? 'bg-[#050816]/70' : 'bg-white'
    }`}>
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              theme === 'dark'
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            }`}>
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isBn ? 'ক্যাম্পাস কার্যক্রম ও অনুষ্ঠান' : 'Seminars & Highlights'}</span>
            </div>
            <h2 className={`font-heading text-3xl sm:text-4xl font-extrabold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
            }`}>
              {isBn ? 'আসন্ন ইভেন্ট ও স্মরণীয় আয়োজন' : 'Campus Events & Seminars'}
            </h2>
            <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {isBn
                ? 'ক্যারিয়ার সামিট, জাতীয় সম্মেলন ও প্রতিষ্ঠাবার্ষিকী উদযাপনের স্মৃতিমালা।'
                : 'Connect with industry mentors, attend tech workshops, and celebrate academic milestones.'}
            </p>
          </div>

          <button
            onClick={() => navigateTo('events')}
            className={`self-start sm:self-auto text-xs font-bold flex items-center gap-1 cursor-pointer ${
              theme === 'dark' ? 'text-yellow-400 hover:text-yellow-300' : 'text-emerald-700 hover:text-emerald-900'
            }`}
          >
            <span>{isBn ? 'সকল ইভেন্ট দেখুন' : 'View All Events'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EVENTS.map((item) => (
            <div
              key={item.id}
              className={`group rounded-2xl overflow-hidden border transition-all flex flex-col justify-between hover:-translate-y-1 ${
                theme === 'dark'
                  ? 'glass-panel-dark hover:border-emerald-500/40 shadow-xl'
                  : 'bg-white/95 border-emerald-100 hover:border-emerald-300 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
              }`}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                      item.status === 'upcoming'
                        ? 'bg-yellow-400 text-slate-950 shadow'
                        : 'bg-black/60 text-slate-200 border border-white/20 backdrop-blur-sm'
                    }`}
                  >
                    {item.status === 'upcoming'
                      ? isBn
                        ? 'আসন্ন ইভেন্ট'
                        : 'Upcoming'
                      : isBn
                      ? 'সম্পন্ন'
                      : 'Past Event'}
                  </span>
                </div>

                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-slate-200 font-mono">
                  <span>{item.date}</span>
                  {item.time && <span>{item.time}</span>}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                    theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'
                  }`}>
                    {item.category}
                  </span>
                  <h3 className={`font-heading font-bold text-base transition-colors line-clamp-2 ${
                    theme === 'dark' ? 'text-white group-hover:text-emerald-300' : 'text-[#0b192c] group-hover:text-emerald-700'
                  }`}>
                    {isBn ? item.title.bn : item.title.en}
                  </h3>
                  <p className={`text-xs line-clamp-3 leading-relaxed ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {isBn ? item.description.bn : item.description.en}
                  </p>
                </div>

                <div className={`space-y-3 pt-3 border-t ${
                  theme === 'dark' ? 'border-white/10' : 'border-emerald-100'
                }`}>
                  <div className={`flex items-center gap-1.5 text-xs line-clamp-1 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{isBn ? item.venue.bn : item.venue.en}</span>
                  </div>

                  {item.status === 'upcoming' ? (
                    <button
                      onClick={() => navigateTo('events')}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-yellow-400 hover:from-emerald-400 hover:to-yellow-300 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                    >
                      <span>{isBn ? 'ইভেন্টে নিবন্ধন করুন' : 'Register for Event'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => navigateTo('gallery')}
                      className={`w-full py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                        theme === 'dark'
                          ? 'bg-white/5 hover:bg-white/10 text-slate-300'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      <span>{isBn ? 'ফটো গ্যালারি দেখুন' : 'View Gallery'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
