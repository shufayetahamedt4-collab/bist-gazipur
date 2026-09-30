import React from 'react';
import { Send, Phone, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UNIVERSITY_INFO } from '../../data/mockData';

export const CtaBand: React.FC = () => {
  const { language, navigateTo, theme } = useApp();
  const isBn = language === 'bn';

  return (
    <section className="py-16 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div
          className={`relative rounded-3xl p-8 sm:p-12 border shadow-2xl overflow-hidden transition-all ${
            theme === 'dark'
              ? 'border-emerald-500/40 glow-green'
              : 'border-emerald-200 shadow-[0_12px_40px_rgba(5,150,105,0.1)]'
          }`}
        >
          {/* Background Campus Photo */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src="./images/campus-3.webp"
              alt="BIST Campus Architecture"
              className="w-full h-full object-cover object-center scale-105"
            />
            <div
              className={`absolute inset-0 transition-colors ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-emerald-950/95 via-[#0b192c]/90 to-slate-950/95'
                  : 'bg-gradient-to-r from-emerald-50/95 via-white/90 to-yellow-50/95'
              }`}
            />
            <div className="absolute inset-0 cyber-grid-light opacity-30 pointer-events-none" />
          </div>

          {/* Subtle neon orb backdrop */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-xl">
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  theme === 'dark'
                    ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isBn ? 'সেশন ২০২৫-২৬ ভর্তি উন্মুক্ত' : 'Admissions Open 2025-26'}</span>
              </div>

              <h2
                className={`font-heading text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight ${
                  theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
                }`}
              >
                {isBn
                  ? 'আপনার ক্যারিয়ারের নতুন অধ্যায় শুরু করতে প্রস্তুত?'
                  : 'Ready to Engineer Your Future at BIST?'}
              </h2>

              <p
                className={`text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {isBn
                  ? 'জাতীয় বিশ্ববিদ্যালয়ের ৪ বছর মেয়াদি বি.এসসি (অনার্স) ও প্রফেশনাল বিবিএ কোর্সে এখনই অনলাইনে আবেদন করুন অথবা আমাদের ভর্তি কর্মকর্তাদের সাথে সরাসরি যোগাযোগ করুন।'
                  : 'Enroll in National University 4-year B.Sc. Engineering & Professional BBA. Direct campus counseling and 100% scholarships available.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <button
                onClick={() => navigateTo('apply-online')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-heading font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-500 via-emerald-400 to-yellow-400 hover:from-emerald-600 hover:to-yellow-500 shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isBn ? 'এখনই আবেদন করুন' : 'Apply Online Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${UNIVERSITY_INFO.contact.admissionPhone}`}
                className={`w-full sm:w-auto px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold border transition-all flex items-center justify-center gap-2 ${
                  theme === 'dark'
                    ? 'text-white bg-white/10 hover:bg-white/15 border-white/15'
                    : 'text-slate-900 bg-white hover:bg-emerald-50 border-emerald-300 shadow-sm'
                }`}
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>{UNIVERSITY_INFO.contact.admissionPhone}</span>
              </a>

              <a
                href={`https://wa.me/${UNIVERSITY_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  'Hello BIST Admission Office, I am interested in applying for 2025-26 session.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-950/20 transition-all flex items-center justify-center gap-2"
                title="Chat with Admission Officer on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
