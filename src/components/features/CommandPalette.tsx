import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, FileText, ArrowRight, Compass, GraduationCap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PROGRAMS, NOTICES } from '../../data/mockData';
import { PageId } from '../../types';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    navigateTo,
    language,
    theme,
  } = useApp();
  const isBn = language === 'bn';

  const [query, setQuery] = useState('');

  const pages: { id: PageId; label: string; group: string }[] = [
    { id: 'home', label: 'Home Page', group: 'Navigation' },
    { id: 'about', label: 'About BIST at a Glance', group: 'Navigation' },
    { id: 'programs', label: 'All Academic Programs', group: 'Academics' },
    { id: 'admissions', label: 'Admissions Guidelines & Quotas', group: 'Admissions' },
    { id: 'apply-online', label: 'Online Application Portal', group: 'Admissions' },
    { id: 'calculator', label: 'Fee & Scholarship Calculator', group: 'Admissions' },
    { id: 'result', label: 'Student Semester Result Search', group: 'Academics' },
    { id: 'notices', label: 'Circulars & Official Notices', group: 'News' },
    { id: 'faculty', label: 'Faculty & Researchers Directory', group: 'Academics' },
    { id: 'gallery', label: 'Campus & Lab Photo Gallery', group: 'Campus' },
    { id: 'alumni', label: 'Alumni Directory & Success', group: 'Community' },
    { id: 'events', label: 'Upcoming Seminars & Job Fair', group: 'Campus' },
    { id: 'facilities', label: 'Laboratories & Workshops', group: 'Campus' },
    { id: 'projects', label: 'SEIP & Government RPL Projects', group: 'Academics' },
    { id: 'faq', label: 'Frequently Asked Questions (FAQ)', group: 'Support' },
    { id: 'contact', label: 'Campus Location & Phone Lines', group: 'Support' },
    { id: 'admin', label: 'Admin Management Dashboard', group: 'System' },
  ];

  const filteredPages = pages.filter((p) =>
    p.label.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPrograms = PROGRAMS.filter(
    (prog) =>
      prog.shortTitle.toLowerCase().includes(query.toLowerCase()) ||
      prog.title.en.toLowerCase().includes(query.toLowerCase()) ||
      prog.title.bn.toLowerCase().includes(query.toLowerCase())
  );

  const filteredNotices = NOTICES.filter(
    (n) =>
      n.title.en.toLowerCase().includes(query.toLowerCase()) ||
      n.title.bn.toLowerCase().includes(query.toLowerCase())
  );

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[75vh] ${
        theme === 'dark'
          ? 'bg-[#0a0f24] border-emerald-500/40 text-white'
          : 'bg-white border-emerald-200 text-slate-900 shadow-[0_20px_60px_rgba(5,150,105,0.15)]'
      }`}>
        {/* Input Bar */}
        <div className={`p-4 border-b flex items-center gap-3 ${
          theme === 'dark' ? 'border-white/10' : 'border-emerald-100 bg-slate-50/50'
        }`}>
          <Search className="w-5 h-5 text-emerald-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programs, pages, circulars, or keywords (e.g. CSE, Fee, Exam)..."
            className="flex-1 bg-transparent text-sm placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          <kbd className={`px-2 py-0.5 rounded border text-[10px] font-mono ${
            theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-slate-100 border-slate-300 text-slate-600'
          }`}>
            ESC
          </kbd>
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Programs Section */}
          {filteredPrograms.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-bold px-2 block">
                Academic Programs
              </span>
              {filteredPrograms.map((prog) => (
                <button
                  key={prog.id}
                  onClick={() => {
                    setIsCommandPaletteOpen(false);
                    navigateTo('department-detail', prog.id);
                  }}
                  className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between group transition-colors ${
                    theme === 'dark' ? 'hover:bg-white/10 text-white' : 'hover:bg-emerald-50 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-emerald-600 font-bold w-10">
                      {prog.shortTitle}
                    </span>
                    <span className="font-medium">
                      {isBn ? prog.title.bn : prog.title.en}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Pages */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 font-bold px-2 block">
              Direct Navigation
            </span>
            {filteredPages.slice(0, 7).map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setIsCommandPaletteOpen(false);
                  navigateTo(p.id);
                }}
                className={`w-full p-2 rounded-lg text-left flex items-center justify-between transition-colors ${
                  theme === 'dark' ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-emerald-50 text-slate-700'
                }`}
              >
                <span>{p.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-500'
                }`}>
                  {p.group}
                </span>
              </button>
            ))}
          </div>

          {/* Notices Section */}
          {filteredNotices.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-bold px-2 block">
                Official Circulars
              </span>
              {filteredNotices.slice(0, 3).map((notice) => (
                <button
                  key={notice.id}
                  onClick={() => {
                    setIsCommandPaletteOpen(false);
                    navigateTo('notices');
                  }}
                  className={`w-full p-2 rounded-lg text-left flex items-center justify-between transition-colors ${
                    theme === 'dark' ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-emerald-50 text-slate-700'
                  }`}
                >
                  <span className="truncate max-w-[340px]">
                    {isBn ? notice.title.bn : notice.title.en}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {notice.date}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
