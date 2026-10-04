import React, { useState } from 'react';
import { Calendar, Newspaper, MapPin, Clock, ArrowRight, User, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useDismiss } from '../../hooks/useDismiss';
import { EVENTS, NEWS } from '../../data/mockData';
import { EventItem, NewsItem } from '../../types';

export const EventsNewsPage: React.FC = () => {
  const { language } = useApp();
  const isBn = language === 'bn';

  const [activeTab, setActiveTab] = useState<'events' | 'news'>('events');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const { backdropProps: eventBackdropProps } = useDismiss(Boolean(selectedEvent), () => setSelectedEvent(null));
  const { backdropProps: newsBackdropProps } = useDismiss(Boolean(selectedNews), () => setSelectedNews(null));

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-10">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5" />
          <span>{isBn ? 'ইভেন্টস ও সাম্প্রতিক খবর' : 'Happenings & Press Releases'}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isBn ? 'ক্যাম্পাস ইভেন্টস ও মিডিয়া কভারেজ' : 'University Events & News'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {isBn
            ? 'ক্যাম্পাস সেমিনার, জব ফেয়ার ও গবেষণা সংক্রান্ত সকল সর্বশেষ আপডেট।'
            : 'Stay informed about our academic seminars, technology expos, and leadership announcements.'}
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'events'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'glass-panel text-slate-400 hover:text-white'
            }`}
          >
            Campus Events ({EVENTS.length})
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'news'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'glass-panel text-slate-400 hover:text-white'
            }`}
          >
            News Articles ({NEWS.length})
          </button>
        </div>
      </div>

      {/* Events Tab */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EVENTS.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="group rounded-2xl glass-panel overflow-hidden border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b1a] via-black/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-black/70 text-cyan-400 border border-slate-200 dark:border-white/10">
                    {event.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-mono">
                  {[event.date, event.time].filter(Boolean).join(' · ')}
                </div>
                <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors line-clamp-2">
                  {isBn ? event.title.bn : event.title.en}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3">
                  {isBn ? event.description.bn : event.description.en}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-white/5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span className="truncate">{isBn ? event.venue.bn : event.venue.en}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* News Tab */}
      {activeTab === 'news' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedNews(item)}
              className="group rounded-2xl glass-panel overflow-hidden border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b1a] via-black/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-black/70 text-amber-400 border border-slate-200 dark:border-white/10">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  {item.date} · By {item.author}
                </div>
                <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors line-clamp-2">
                  {isBn ? item.title.bn : item.title.en}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3">
                  {isBn ? item.summary.bn : item.summary.en}
                </p>
                <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 block pt-2 border-t border-slate-200 dark:border-white/5">
                  Read Full Story →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div {...eventBackdropProps} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="dark relative w-full max-w-xl rounded-3xl bg-[#0a0f24] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl space-y-5">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-xs text-cyan-600 dark:text-cyan-400 font-mono">
              {[selectedEvent.date, selectedEvent.time].filter(Boolean).join(' · ')}
            </div>
            <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
              {isBn ? selectedEvent.title.bn : selectedEvent.title.en}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>{isBn ? selectedEvent.venue.bn : selectedEvent.venue.en}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-h-60 overflow-y-auto">
              {isBn ? selectedEvent.description.bn : selectedEvent.description.en}
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  alert('Thank you for registering for this event!');
                  setSelectedEvent(null);
                }}
                className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                Register as Student Delegate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* News Detail Modal */}
      {selectedNews && (
        <div {...newsBackdropProps} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="dark relative w-full max-w-xl rounded-3xl bg-[#0a0f24] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl space-y-5">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-xs text-amber-600 dark:text-amber-400 font-mono">
              {selectedNews.date} · Published by {selectedNews.author}
            </div>
            <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
              {isBn ? selectedNews.title.bn : selectedNews.title.en}
            </h2>
            <div className="text-xs text-slate-200 leading-relaxed max-h-64 overflow-y-auto space-y-2">
              <p>{isBn ? selectedNews.summary.bn : selectedNews.summary.en}</p>
              <p>{isBn ? selectedNews.content.bn : selectedNews.content.en}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
