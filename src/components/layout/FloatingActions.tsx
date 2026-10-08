import React, { useState } from 'react';
import { MessageCircle, Sparkles, Send, ArrowUp, Plus, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UNIVERSITY_INFO } from '../../data/mockData';

export const FloatingActions: React.FC = () => {
  const { language, navigateTo, isChatbotOpen, setIsChatbotOpen, theme, isAnnouncementOpen } = useApp();
  const isBn = language === 'bn';
  // On phones the full stack would cover page content, so it stays collapsed
  // behind a single FAB until the visitor taps it.
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileOpen(false);
  };

  const actionBase = 'flex items-center gap-2 rounded-full shadow-lg transition-all cursor-pointer';

  return (
    <aside
      aria-label="Quick Actions"
      // Sits above the announcement popup's box when the popup is open, so these
      // buttons stay clickable even if the two ever meet on a narrow screen.
      className={`fixed bottom-4 sm:bottom-6 right-3 sm:right-6 flex flex-col items-end gap-2.5 ${
        isAnnouncementOpen ? 'z-[45]' : 'z-40'
      }`}
    >
      <div className={`flex flex-col items-end gap-2.5 ${mobileOpen ? '' : 'hidden'} sm:flex`}>
        {/* Scroll to Top */}
        <button
          onClick={scrollToTop}
          className={`w-9 h-9 rounded-full border flex items-center justify-center shadow-lg transition-all cursor-pointer backdrop-blur-md ${
            theme === 'dark'
              ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border-white/10'
              : 'bg-white/95 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border-emerald-200'
          }`}
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        {/* Direct WhatsApp Help */}
        <a
          href={`https://wa.me/${UNIVERSITY_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
            'Hello BIST Admission Office, I would like to know about admissions.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileOpen(false)}
          className={`group pl-3 pr-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/20 text-xs font-semibold ${actionBase}`}
          title="Chat on WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>

        {/* Floating Apply Now Button */}
        <button
          onClick={() => {
            navigateTo('apply-online');
            setMobileOpen(false);
          }}
          className={`group pl-3.5 pr-4 py-2.5 bg-gradient-to-r from-emerald-500 via-emerald-400 to-yellow-400 hover:from-emerald-600 hover:to-yellow-500 text-slate-950 font-bold text-xs shadow-xl shadow-emerald-600/30 ${actionBase}`}
          title="Apply Online for Admission"
        >
          <Send className="w-3.5 h-3.5 fill-slate-950" />
          <span>{isBn ? 'ভর্তি আবেদন' : 'Apply Now'}</span>
        </button>

        {/* AI Admission Assistant Chatbot Bubble */}
        <button
          onClick={() => {
            setIsChatbotOpen(!isChatbotOpen);
            setMobileOpen(false);
          }}
          className={`relative group px-3.5 py-2.5 border shadow-xl backdrop-blur-md transition-all cursor-pointer ${
            theme === 'dark'
              ? 'bg-slate-900/95 hover:bg-slate-800 text-emerald-300 border-emerald-500/40 shadow-emerald-950/40'
              : 'bg-[#0b192c] hover:bg-[#0f233d] text-emerald-300 border-emerald-500/50 shadow-lg'
          } ${actionBase}`}
          title="Open AI Admission Assistant"
          aria-label="Toggle AI Admission Assistant"
        >
          <div className="relative">
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="text-xs font-bold text-white">
            {isBn ? 'এআই ভর্তি সহায়তা' : 'AI Assistant'}
          </span>
        </button>
      </div>

      {/* Mobile-only trigger: single compact FAB keeps page content readable */}
      <button
        onClick={() => setMobileOpen((v) => !v)}
        aria-expanded={mobileOpen}
        aria-label={mobileOpen ? 'Close quick actions' : 'Open quick actions'}
        className="sm:hidden w-13 h-13 min-w-[52px] min-h-[52px] rounded-full bg-gradient-to-br from-emerald-500 via-emerald-400 to-yellow-400 text-slate-950 shadow-xl shadow-emerald-600/30 flex items-center justify-center transition-all active:scale-95"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </button>
    </aside>
  );
};
