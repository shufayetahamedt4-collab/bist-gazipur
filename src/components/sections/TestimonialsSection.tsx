import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star, Building, GraduationCap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TESTIMONIALS } from '../../data/mockData';

/** Initials fallback for the testimonials the live site publishes without a photo. */
const initials = (name: string) =>
  name
    .replace(/^(Engr\.|Dr\.|Md\.?|মোঃ|প্রকৌশলী|ড\.)\s*/i, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

export const TestimonialsSection: React.FC = () => {
  const { language, theme } = useApp();
  const isBn = language === 'bn';

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className={`py-20 px-4 sm:px-6 relative transition-colors ${
      theme === 'dark' ? 'bg-[#040714]/60' : 'bg-slate-50/60 cyber-grid-light'
    }`}>
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            theme === 'dark'
              ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
          }`}>
            <Quote className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isBn ? 'স্নাতক ও অ্যালামনাইদের অভিজ্ঞতা' : 'Alumni Voices & Stories'}</span>
          </div>

          <h2 className={`font-heading text-3xl sm:text-4xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
          }`}>
            {isBn ? 'বিআইএসটি স্নাতকদের সাফল্যের গল্প' : 'What Our Graduates Say'}
          </h2>

          <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            {isBn
              ? 'বিআইএসটি-তে অধ্যায়ন সম্পন্ন করে দেশ-বিদেশের শীর্ষ প্রতিষ্ঠানে কর্মরত আমাদের শিক্ষার্থীরা।'
              : 'Real career transformations from software engineering to global textile merchandising.'}
          </p>
        </div>

        {/* Carousel Card */}
        <div className={`relative rounded-3xl p-8 sm:p-12 border shadow-xl overflow-hidden backdrop-blur-xl ${
          theme === 'dark'
            ? 'glass-panel-dark border-emerald-500/30'
            : 'bg-white/95 border-emerald-100 shadow-[0_12px_40px_rgba(5,150,105,0.06)]'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Student Photo */}
            <div className="md:col-span-4 flex flex-col items-center text-center space-y-3">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-emerald-500 via-teal-400 to-yellow-400 shadow-xl">
                {current.image ? (
                  <img
                    src={current.image}
                    alt={current.name.en}
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full rounded-xl bg-[#0b192c] flex items-center justify-center">
                    <span className="font-heading font-extrabold text-3xl sm:text-4xl text-emerald-600 dark:text-emerald-400">
                      {initials(isBn ? current.name.bn : current.name.en)}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <h4 className={`font-heading font-bold text-lg ${
                  theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
                }`}>
                  {isBn ? current.name.bn : current.name.en}
                </h4>
                <div className="text-xs text-emerald-600 font-bold">
                  {isBn ? current.role.bn : current.role.en}
                </div>
                {current.company && (
                  <div className={`text-[11px] font-medium flex items-center justify-center gap-1 mt-0.5 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <Building className="w-3 h-3 text-slate-400" />
                    <span>{current.company}</span>
                  </div>
                )}
                {(current.program || current.batch) && (
                  <span className="text-[10px] text-slate-400 font-mono block mt-1">
                    {[current.program, current.batch].filter(Boolean).join(' · ')}
                  </span>
                )}
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <blockquote className={`text-sm sm:text-base leading-relaxed font-light italic ${
                theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
              }`}>
                “{isBn ? current.quote.bn : current.quote.en}”
              </blockquote>

              {/* Navigation controls */}
              <div className={`flex items-center justify-between pt-4 border-t ${
                theme === 'dark' ? 'border-white/10' : 'border-emerald-100'
              }`}>
                <span className="text-xs text-slate-400 font-mono">
                  {currentIndex + 1} of {TESTIMONIALS.length}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
                    }`}
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={next}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
                    }`}
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
