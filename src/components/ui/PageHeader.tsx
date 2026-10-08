import React from 'react';
import { useApp } from '../../context/AppContext';
import { LocalizedString } from '../../types';

/** Accent tints available to the badge, mapped to the site's palette. */
const ACCENTS: Record<string, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
  cyan: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20',
  amber: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  indigo: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20',
};

export interface PageHeaderProps {
  /** Lucide icon shown inside the badge. */
  icon: React.ComponentType<{ className?: string }>;
  badge: LocalizedString;
  title: LocalizedString;
  subtitle?: LocalizedString;
  accent?: keyof typeof ACCENTS;
  /** Constrain the copy column, in Tailwind max-width units. Defaults to 3xl. */
  maxWidth?: string;
}

/**
 * The badge → heading → standfirst block every content page opens with.
 *
 * Kept in one place so a new page cannot drift from the house style, and so the
 * bilingual switch happens once rather than at each call site.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  icon: Icon,
  badge,
  title,
  subtitle,
  accent = 'emerald',
  maxWidth = 'max-w-3xl',
}) => {
  const { language, theme } = useApp();
  const isBn = language === 'bn';

  return (
    <div className={`text-center space-y-3 ${maxWidth} mx-auto`}>
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${ACCENTS[accent]}`}
      >
        <Icon className="w-3.5 h-3.5" />
        <span>{isBn ? badge.bn : badge.en}</span>
      </div>
      <h1
        className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
          theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
        }`}
      >
        {isBn ? title.bn : title.en}
      </h1>
      {subtitle && (
        <p className={`text-xs sm:text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          {isBn ? subtitle.bn : subtitle.en}
        </p>
      )}
    </div>
  );
};
