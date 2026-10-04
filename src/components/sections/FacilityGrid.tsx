import React from 'react';
import {
  BookOpen,
  Monitor,
  Library,
  Globe,
  Trophy,
  Languages,
  Briefcase,
  ShieldCheck,
  Users,
  Home,
  Bus,
  HeartPulse,
  Clock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CampusFacility } from '../../types';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Monitor,
  Library,
  Globe,
  Trophy,
  Languages,
  Briefcase,
  ShieldCheck,
  Users,
  Home,
  Bus,
  HeartPulse,
};

export const FacilityGrid: React.FC<{
  items: CampusFacility[];
  accent?: string;
}> = ({ items, accent = 'text-emerald-600 dark:text-emerald-400' }) => {
  const { language } = useApp();
  const isBn = language === 'bn';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item) => {
        const Icon = ICONS[item.icon] || BookOpen;
        return (
          <div
            key={item.id}
            className={`p-6 rounded-3xl glass-panel border transition-all flex flex-col gap-3 ${
              item.pending
                ? 'border-slate-200 dark:border-white/10 border-dashed'
                : 'border-slate-200 dark:border-white/10 hover:border-emerald-500/40'
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl bg-slate-900/5 dark:bg-white/5 flex items-center justify-center ${accent}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                {isBn ? item.title.bn : item.title.en}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {isBn ? item.description.bn : item.description.en}
              </p>
            </div>
            {item.pending && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 self-start">
                <Clock className="w-3 h-3" />
                {isBn ? 'তথ্য অপেক্ষমাণ' : 'Information pending'}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
