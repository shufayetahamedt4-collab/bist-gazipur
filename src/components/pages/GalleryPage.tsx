import React, { useState } from 'react';
import { Image, X, ZoomIn, Calendar, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GALLERY_ITEMS } from '../../data/mockData';
import { GalleryItem } from '../../types';

export const GalleryPage: React.FC = () => {
  const { language, theme } = useApp();
  const isBn = language === 'bn';

  const [activeFilter, setActiveFilter] = useState<'all' | 'campus' | 'labs' | 'events' | 'textile' | 'sports'>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-10">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
          <Image className="w-3.5 h-3.5" />
          <span>{isBn ? 'ক্যাম্পাস ফটো গ্যালারি' : 'Photo & Campus Gallery'}</span>
        </div>
        <h1
          className={`font-heading text-3xl sm:text-4xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
          }`}
        >
          {isBn ? 'ক্যাম্পাস জীবন, ল্যাবরেটরি ও ইভেন্টস' : 'Campus Life, Labs & Milestones'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          {isBn
            ? 'বিআইএসটি-এর আধুনিক ল্যাব, টেক্সটাইল ফ্লোর, বাৎসরিক ফ্যাশন শো ও স্পোর্টস উৎসবের মুহূর্ত।'
            : 'Explore high-resolution captures of our facilities, tech floors, and student showcases.'}
        </p>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-4">
          {[
            { id: 'all', label: isBn ? 'সকল ফটো' : 'All Photos' },
            { id: 'labs', label: isBn ? 'গবেষণাগার ও ল্যাব' : 'Labs & Workshops' },
            { id: 'textile', label: isBn ? 'টেক্সটাইল ফ্লোর' : 'Textile & Machines' },
            { id: 'events', label: isBn ? 'ফ্যাশন শো ও ইভেন্ট' : 'Events & Galas' },
            { id: 'campus', label: isBn ? 'ক্যাম্পাস ও লাইব্রেরি' : 'Campus & Library' },
            { id: 'sports', label: isBn ? 'খেলাধুলা ও ক্লাব' : 'Sports & Life' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'glass-panel text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightboxItem(item)}
            className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-cyan-500/40 cursor-pointer shadow-lg transition-all duration-300"
          >
            <div className="aspect-4/3 overflow-hidden bg-black/40">
              <img
                src={item.image}
                alt={item.title.en}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
              <div className="flex justify-end">
                <div className="p-2 rounded-full bg-black/60 text-cyan-400 backdrop-blur-md">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold block">
                  {item.date ? `${item.category} · ${item.date}` : item.category}
                </span>
                <h4 className="font-heading font-bold text-sm text-white">
                  {isBn ? item.title.bn : item.title.en}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-4xl w-full rounded-3xl overflow-hidden bg-[#070b1a] border border-cyan-500/40 p-4 space-y-4">
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-black/70 hover:bg-black text-white z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-h-[75vh] overflow-hidden rounded-2xl flex items-center justify-center bg-black">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title.en}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            <div className="px-2 flex items-center justify-between text-xs">
              <div>
                <h3 className="font-heading font-bold text-base text-white">
                  {isBn ? lightboxItem.title.bn : lightboxItem.title.en}
                </h3>
                <span className="text-slate-400 capitalize">
                  {lightboxItem.date
                    ? `Category: ${lightboxItem.category} · Captured ${lightboxItem.date}`
                    : `Category: ${lightboxItem.category}`}
                </span>
              </div>

              <span className="font-mono text-cyan-400">BIST Gazipur Campus</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
