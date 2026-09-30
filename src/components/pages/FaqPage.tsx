import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, Sparkles, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FAQS, UNIVERSITY_INFO } from '../../data/mockData';

export const FaqPage: React.FC = () => {
  const { language, setIsChatbotOpen } = useApp();
  const isBn = language === 'bn';

  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter((faq) => {
    const query = search.toLowerCase();
    return (
      faq.question.en.toLowerCase().includes(query) ||
      faq.question.bn.toLowerCase().includes(query) ||
      faq.answer.en.toLowerCase().includes(query) ||
      faq.answer.bn.toLowerCase().includes(query)
    );
  });

  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{isBn ? 'সাধারণ জিজ্ঞাসা' : 'Frequently Asked Questions'}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {isBn ? 'ভর্তি ও একাডেমিক প্রশ্নোত্তর' : 'Got Questions? We Have Answers'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          {isBn
            ? 'ভর্তি প্রক্রিয়া, স্কলারশিপ, জাতীয় বিশ্ববিদ্যালয় স্বীকৃতি ও ক্যাম্পাস সম্পর্কিত তথ্য।'
            : 'Clear answers on admission eligibility, fee structures, polytechnic lateral entry, and scholarships.'}
        </p>

        {/* Search Input */}
        <div className="relative pt-4 max-w-md mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-[26px]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isBn ? 'প্রশ্ন খুঁজুন...' : 'Search questions or keywords...'}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl glass-panel border border-white/5 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <span className="font-heading font-semibold text-sm sm:text-base text-white pr-4">
                  {isBn ? faq.question.bn : faq.question.en}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-white/5 text-xs sm:text-sm text-slate-300 leading-relaxed bg-black/20">
                  {isBn ? faq.answer.bn : faq.answer.en}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <div className="p-6 rounded-3xl glass-panel border border-cyan-500/30 text-center space-y-3">
        <h3 className="font-heading font-bold text-base text-white">
          {isBn ? 'আপনার প্রশ্নের উত্তর খুঁজে পাননি?' : 'Still have unanswered questions?'}
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          {isBn
            ? 'আমাদের ২৪/৭ এআই ভর্তি সহকারীকে সরাসরি প্রশ্ন করুন অথবা আমাদের ভর্তি অফিসারের সাথে কথা বলুন।'
            : 'Chat with our bilingual AI Assistant or reach out to our admission counselors directly.'}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button
            onClick={() => setIsChatbotOpen(true)}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isBn ? 'এআই সহকারীর সাথে চ্যাট' : 'Ask AI Assistant'}</span>
          </button>
          <a
            href={`https://wa.me/${UNIVERSITY_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Admission Officer</span>
          </a>
        </div>
      </div>
    </div>
  );
};
