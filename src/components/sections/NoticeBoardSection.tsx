import React, { useState } from 'react';
import {
  Bell,
  Search,
  FileText,
  Download,
  Eye,
  Calendar,
  Sparkles,
  ArrowRight,
  X,
  Printer,
  CheckCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useDismiss } from '../../hooks/useDismiss';
import { Notice } from '../../types';

export const NoticeBoardSection: React.FC = () => {
  const { language, navigateTo, noticesList, setSelectedNoticeId, theme } = useApp();
  const isBn = language === 'bn';

  const [activeCategory, setActiveCategory] = useState<'all' | 'examinations' | 'admissions' | 'academic' | 'holidays'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewNotice, setPreviewNotice] = useState<Notice | null>(null);

  const { backdropProps } = useDismiss(Boolean(previewNotice), () => setPreviewNotice(null));

  // Filter notices
  const filteredNotices = noticesList.filter((notice) => {
    const matchesCategory = activeCategory === 'all' || notice.category === activeCategory;
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      notice.title.en.toLowerCase().includes(query) ||
      notice.title.bn.toLowerCase().includes(query) ||
      notice.content.en.toLowerCase().includes(query) ||
      notice.content.bn.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <section className={`py-20 px-4 sm:px-6 relative transition-colors ${
      theme === 'dark' ? 'bg-[#070b1a]/40' : 'bg-slate-50/50 cyber-grid-light'
    }`}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              theme === 'dark'
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            }`}>
              <Bell className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isBn ? 'অফিসিয়াল সার্কুলার' : 'Official Circulars'}</span>
            </div>
            <h2 className={`font-heading text-3xl sm:text-4xl font-extrabold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
            }`}>
              {isBn ? 'নোটিশ ও একাডেমিক বার্তা' : 'Notice Board & Circulars'}
            </h2>
            <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {isBn
                ? 'জাতীয় বিশ্ববিদ্যালয় ও কারিগরি শিক্ষা বোর্ডের সর্বশেষ রুটিন, ফরম পূরণ ও ফলাফল প্রকাশ।'
                : 'Stay updated with examination schedules, admit card distribution, and admissions.'}
            </p>
          </div>

          <button
            onClick={() => navigateTo('notices')}
            className={`self-start md:self-auto px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              theme === 'dark'
                ? 'text-emerald-700 dark:text-emerald-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10'
                : 'text-emerald-800 hover:text-emerald-950 bg-white hover:bg-emerald-50 border border-emerald-200 shadow-sm'
            }`}
          >
            <span>{isBn ? 'সকল নোটিশ দেখুন' : 'View Full Archive'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
          </button>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 p-2 rounded-2xl border transition-colors ${
          theme === 'dark'
            ? 'bg-slate-900/90 border-white/10'
            : 'bg-white/95 border-emerald-100 shadow-sm'
        }`}>
          {/* Interactive Category Buttons */}
          <div className="flex flex-wrap items-center gap-1 w-full sm:w-auto">
            {[
              { id: 'all', label: isBn ? 'সকল' : 'All' },
              { id: 'examinations', label: isBn ? 'পরীক্ষা' : 'Examinations' },
              { id: 'admissions', label: isBn ? 'ভর্তি' : 'Admissions' },
              { id: 'academic', label: isBn ? 'একাডেমিক' : 'Academic' },
              { id: 'holidays', label: isBn ? 'ছুটি' : 'Holidays' },
              { id: 'other', label: isBn ? 'অন্যান্য' : 'Other' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-emerald-600 text-white font-bold shadow-sm'
                    : theme === 'dark'
                    ? 'text-slate-400 hover:text-white hover:bg-white/5'
                    : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isBn ? 'নোটিশ খুঁজুন...' : 'Search circulars...'}
              className={`w-full pl-9 pr-3 py-1.5 rounded-lg text-xs border transition-colors focus:outline-none ${
                theme === 'dark'
                  ? 'bg-black/40 border-white/10 text-white placeholder-slate-500 focus:border-emerald-500'
                  : 'bg-slate-50 border-emerald-200 text-slate-800 placeholder-slate-400 focus:border-emerald-500'
              }`}
            />
          </div>
        </div>

        {/* Notices Tabbed List */}
        <div className="space-y-3">
          {filteredNotices.length > 0 ? (
            filteredNotices.slice(0, 8).map((notice) => (
              <div
                key={notice.id}
                className={`group p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  theme === 'dark'
                    ? 'bg-slate-900/60 border-white/10 hover:border-emerald-500/40'
                    : 'bg-white/95 border-emerald-100 hover:border-emerald-300 shadow-sm'
                }`}
              >
                {/* Left: Date Badge + Title */}
                <div className="flex items-start sm:items-center gap-3">
                  {/* Date Badge */}
                  <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl border shrink-0 text-center ${
                    theme === 'dark'
                      ? 'bg-black/50 border-white/10'
                      : 'bg-emerald-50 border-emerald-200'
                  }`}>
                    <span className={`font-heading font-extrabold text-sm leading-tight ${
                      theme === 'dark' ? 'text-emerald-600 dark:text-emerald-400' : 'text-emerald-800'
                    }`}>
                      {notice.date.split(' ')[0]}
                    </span>
                    <span className={`text-[10px] uppercase font-semibold ${
                      theme === 'dark' ? 'text-slate-400' : 'text-emerald-600'
                    }`}>
                      {notice.date.split(' ')[1]}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {notice.isNew && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-yellow-100 text-yellow-900 text-[10px] font-bold border border-yellow-300 animate-pulse">
                          NEW
                        </span>
                      )}
                      {notice.isPinned && (
                        <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900 text-[10px] font-semibold border border-emerald-300">
                          {isBn ? 'জরুরি' : 'Pinned'}
                        </span>
                      )}
                      <span className={`text-[11px] capitalize ${
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {notice.category}
                      </span>
                    </div>

                    <h3
                      onClick={() => setPreviewNotice(notice)}
                      className={`font-medium text-sm transition-colors cursor-pointer line-clamp-1 ${
                        theme === 'dark'
                          ? 'text-white group-hover:text-emerald-600 dark:hover:text-emerald-400'
                          : 'text-slate-900 group-hover:text-emerald-700'
                      }`}
                    >
                      {isBn ? notice.title.bn : notice.title.en}
                    </h3>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    onClick={() => setPreviewNotice(notice)}
                    className={`p-2 rounded-lg text-xs transition-colors flex items-center gap-1 cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-white/10'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                    title="Quick Preview Notice"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{isBn ? 'দেখুন' : 'Preview'}</span>
                  </button>

                  <a
                    href={notice.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={notice.fileName}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-900 font-semibold border border-yellow-300 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Download the official notice document"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">
                      {notice.fileType === 'image' ? 'Image' : 'PDF'}
                    </span>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className={`p-8 rounded-2xl text-center border ${
              theme === 'dark' ? 'glass-panel-dark' : 'bg-white border-emerald-100'
            }`}>
              <p className="text-xs text-slate-500">
                {isBn ? 'কোনো নোটিশ খুঁজে পাওয়া যায়নি।' : 'No circulars match your search query.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Notice Preview Modal */}
      {previewNotice && (
        <div {...backdropProps} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto ${
            theme === 'dark'
              ? 'bg-slate-900 border-emerald-500/30 text-white'
              : 'bg-white border-emerald-200 text-slate-900'
          }`}>
            <div className="flex items-start justify-between gap-4 border-b pb-4 border-emerald-100">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-600 uppercase tracking-wider block font-bold">
                  BIST Gazette · {previewNotice.date}
                </span>
                <h3 className="font-heading font-bold text-lg sm:text-xl">
                  {isBn ? previewNotice.title.bn : previewNotice.title.en}
                </h3>
              </div>
              <button
                onClick={() => setPreviewNotice(null)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p className="whitespace-pre-line">
                {isBn ? previewNotice.content.bn : previewNotice.content.en}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-emerald-100">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>{isBn ? 'প্রিন্ট সার্কুলার' : 'Print Notice'}</span>
                </button>

                {previewNotice.downloadUrl && (
                  <a
                    href={previewNotice.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={previewNotice.fileName}
                    className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isBn ? 'অফিসিয়াল নোটিশ ডাউনলোড' : 'Download Official Notice'}</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => setPreviewNotice(null)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                {isBn ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
