import React, { useMemo, useState } from 'react';
import {
  Download,
  Search,
  FileText,
  Sparkles,
  Calendar,
  ExternalLink,
  Info,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  DOWNLOAD_CATEGORIES,
  PENDING_DOCUMENT_CATEGORIES,
  buildDownloads,
  fileTypeLabel,
} from '../../data/mockData';
import { DownloadCategoryId } from '../../types';

export const DownloadsPage: React.FC = () => {
  const { language, noticesList } = useApp();
  const isBn = language === 'bn';

  const [activeCategory, setActiveCategory] = useState<DownloadCategoryId | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const documents = useMemo(() => buildDownloads(noticesList), [noticesList]);

  const filtered = documents.filter((doc) => {
    const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      !q ||
      doc.title.en.toLowerCase().includes(q) ||
      doc.title.bn.includes(q) ||
      doc.date.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-10">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isBn ? 'ডাউনলোড সেন্টার' : 'Document Downloads'}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isBn ? 'ডাউনলোড সেন্টার' : 'Downloads Centre'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {isBn
            ? 'প্রতিষ্ঠানের প্রকাশিত অফিসিয়াল সার্কুলার, নোটিশ ও রুটিনের সংকলন।'
            : 'Official circulars, notices and routines published by the institution.'}
        </p>
      </div>

      {/* Controls */}
      <div className="glass-panel p-3 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/5'
            }`}
          >
            {isBn ? 'সব' : 'All'}
          </button>
          {DOWNLOAD_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/5'
              }`}
            >
              {isBn ? cat.label.bn : cat.label.en}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isBn ? 'ডকুমেন্ট খুঁজুন...' : 'Search documents...'}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Document list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="p-8 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 text-center text-sm text-slate-500 dark:text-slate-400">
            {isBn ? 'কোনো ডকুমেন্ট পাওয়া যায়নি।' : 'No documents match your search.'}
          </div>
        )}

        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-white/5 hover:border-cyan-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start sm:items-center gap-4 min-w-0">
              <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 shrink-0 font-mono">
                <span className="text-sm font-bold text-cyan-700 dark:text-cyan-400 leading-none">
                  {doc.date.split(' ')[0]}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase mt-0.5">
                  {doc.date.split(' ')[1]}
                </span>
              </div>

              <div className="min-w-0">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 capitalize">
                  {doc.category}
                </span>
                <h3 className="font-medium text-sm text-slate-900 dark:text-white leading-snug">
                  {isBn ? doc.title.bn : doc.title.en}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {isBn ? doc.source.bn : doc.source.en}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
                {fileTypeLabel(doc.fileType)}
                {doc.fileSize ? ` · ${doc.fileSize}` : ''}
              </span>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-cyan-500/20 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                title={isBn ? 'ডাউনলোড' : 'Download'}
              >
                <Download className="w-4 h-4" />
                <span>{isBn ? 'ডাউনলোড' : 'Download'}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Honest "not yet published" section */}
      <div className="p-5 rounded-3xl glass-panel border border-amber-300/50 dark:border-amber-500/30 space-y-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <h2 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
            {isBn ? 'এখনো প্রকাশিত হয়নি' : 'Not published online yet'}
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {isBn
            ? 'নিচের ডকুমেন্টগুলো প্রত্যাশিত হলেও প্রতিষ্ঠান এখনো এগুলো ওয়েবসাইটে প্রকাশ করেনি। ভুল তথ্য এড়াতে এখানে কোনো ফাইল দেখানো হচ্ছে না।'
            : 'The following are commonly requested but are not yet published as downloadable files by the institution. Nothing is listed here to avoid sharing unverified documents.'}
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PENDING_DOCUMENT_CATEGORIES.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300"
            >
              <FileText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>{isBn ? item.bn : item.en}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Link to the notice archive for anything not listed */}
      <div className="text-center">
        <a
          href="https://bist.edu.bd/notice"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 dark:text-cyan-400 hover:underline"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>{isBn ? 'লাইভ সাইটে সব নোটিশ দেখুন' : 'Browse all notices on the official site'}</span>
        </a>
      </div>

      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
        <Calendar className="w-3.5 h-3.5" />
        <span>
          {isBn ? `${documents.length}টি ডকুমেন্ট` : `${documents.length} documents`}
        </span>
      </div>
    </div>
  );
};
