import React, { useState } from 'react';
import { Bell, Search, FileText, Download, Eye, Calendar, Sparkles, X, Printer } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useDismiss } from '../../hooks/useDismiss';
import { Notice } from '../../types';

export const NoticePage: React.FC = () => {
  const { language, noticesList } = useApp();
  const isBn = language === 'bn';

  const [activeCategory, setActiveCategory] = useState<'all' | 'examinations' | 'admissions' | 'academic' | 'holidays'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const { backdropProps } = useDismiss(Boolean(selectedNotice), () => setSelectedNotice(null));

  const filteredNotices = noticesList.filter((n) => {
    const matchesCategory = activeCategory === 'all' || n.category === activeCategory;
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      n.title.en.toLowerCase().includes(q) ||
      n.title.bn.toLowerCase().includes(q) ||
      n.content.en.toLowerCase().includes(q) ||
      n.content.bn.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-xs font-semibold">
          <Bell className="w-3.5 h-3.5" />
          <span>{isBn ? 'প্রাতিষ্ঠানিক নোটিশ বোর্ড' : 'Official Circulars & Notice Archive'}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isBn ? 'সকল একাডেমিক নোটিশ ও নির্দেশনা' : 'All Notices & Academic Circulars'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {isBn
            ? 'জাতীয় বিশ্ববিদ্যালয় ও কারিগরি শিক্ষা বোর্ডের সর্বশেষ রুটিন, ফরম পূরণ ও ফলাফল প্রকাশ।'
            : 'Find and download official circulars, examination routines, and admission notices.'}
        </p>
      </div>

      {/* Controls */}
      <div className="glass-panel p-3 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1">
          {['all', 'examinations', 'admissions', 'academic', 'holidays'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize cursor-pointer ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search circulars..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filteredNotices.map((n) => (
          <div
            key={n.id}
            className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-white/5 hover:border-cyan-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-black/50 border border-slate-200 dark:border-white/10 shrink-0 font-mono">
                <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400 leading-none">{n.date.split(' ')[0]}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase mt-0.5">{n.date.split(' ')[1]}</span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  {n.isNew && (
                    <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] font-bold">
                      NEW
                    </span>
                  )}
                  <span className="text-[11px] text-slate-500 capitalize">{n.category}</span>
                </div>
                <h3
                  onClick={() => setSelectedNotice(n)}
                  className="font-medium text-sm text-slate-900 dark:text-white hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  {isBn ? n.title.bn : n.title.en}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                {n.fileType.toUpperCase()} · {n.fileSize}
              </span>
              <button
                onClick={() => setSelectedNotice(n)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-cyan-500/20 text-slate-600 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
                title="Preview"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => alert(`Downloading circular: ${n.title.en}`)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-cyan-500/20 text-slate-600 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div
          {...backdropProps}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
        >
          <div className="dark relative w-full max-w-xl rounded-3xl bg-[#0a0f24] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedNotice(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="text-xs text-cyan-600 dark:text-cyan-400 font-mono">
                {selectedNotice.category.toUpperCase()} · {selectedNotice.date}
              </div>
              <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                {isBn ? selectedNotice.title.bn : selectedNotice.title.en}
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-slate-200 dark:border-white/5 text-xs text-slate-200 leading-relaxed max-h-60 overflow-y-auto">
              {isBn ? selectedNotice.content.bn : selectedNotice.content.en}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/10 text-xs">
              <span className="text-slate-500">BIST/ADMIN/NOTICE/2026</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => {
                    alert('Official PDF Downloaded');
                    setSelectedNotice(null);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
