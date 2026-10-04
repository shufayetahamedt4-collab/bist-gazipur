import React from 'react';
import { Users, Award, Info, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  BOARD_OF_TRUSTEES,
  BOARD_ALSO_PUBLISHED,
  BOARD_ROLE_NOTE,
  BOARD_PENDING_NOTE,
  BOARD_SOURCE_PAGE,
} from '../../data/mockData';

/** Initials avatar — the live site publishes no portraits for the board. */
const initialsOf = (name: string): string =>
  name
    .replace(/^(Md\.?|Mr\.?|Mrs\.?|Dr\.?|Prof\.?)\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

export const BoardOfTrusteesPage: React.FC = () => {
  const { language, navigateTo, navigateToTrustee } = useApp();
  const isBn = language === 'bn';

  const members = [...BOARD_OF_TRUSTEES].sort((a, b) => a.order - b.order);

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{isBn ? 'গভর্নিং বডি' : 'Governing Bodies'}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {isBn ? 'বোর্ড অফ ট্রাস্টিজ' : 'Board of Trustees'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
          {isBn
            ? 'বিজিআইএফটি ইনস্টিটিউট অব সায়েন্স অ্যান্ড টেকনোলজি (বিআইএসটি)-এর বোর্ড অফ ট্রাস্টিজ প্রতিষ্ঠানের পরিচালনা ও তত্ত্বাবধানে দায়িত্ব পালন করে।'
            : 'The Board of Trustees of BGIFT Institute of Science & Technology (BIST) oversees the institution and works for its academic and institutional welfare.'}
        </p>
      </div>

      {/* Member roster */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((member) => (
          <button
            key={member.id}
            onClick={() => navigateToTrustee(member.slug)}
            className="group relative overflow-hidden rounded-2xl p-6 border text-center transition-all duration-300 glass-panel border-slate-200 dark:border-white/10 hover:border-amber-400 hover:shadow-[0_12px_32px_rgba(245,158,11,0.14)] cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-400/20 transition-colors" />

            {member.photo ? (
              <img
                src={member.photo}
                alt={member.name}
                className="relative mx-auto w-20 h-20 rounded-2xl object-cover object-top border border-slate-200 dark:border-white/10"
              />
            ) : (
              <div className="relative mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-emerald-600 text-white flex items-center justify-center font-heading font-black text-xl shadow-md">
                {initialsOf(member.name)}
              </div>
            )}

            <div className="mt-4 space-y-1.5">
              <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                {member.name}
              </h3>
              <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                {isBn ? member.role.bn : member.role.en}
              </span>
            </div>

            <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-700 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
              {isBn ? 'প্রোফাইল দেখুন' : 'View profile'}
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>
        ))}
      </div>

      {/* Board role */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
            {isBn ? 'বোর্ডের ভূমিকা' : 'The Board’s role'}
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {isBn ? BOARD_ROLE_NOTE.bn : BOARD_ROLE_NOTE.en}
        </p>
      </div>

      {/* Related governance pages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => navigateTo('about')}
          className="text-left p-5 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 hover:border-amber-400 transition-colors"
        >
          <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white mt-2">
            {isBn ? 'গভর্নিং বডি ও নেতৃত্ব' : 'Governing Bodies & Leadership'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isBn
              ? 'প্রতিষ্ঠানের গভর্নিং কাঠামো সম্পর্কে জানুন।'
              : 'Learn about the institution’s governance structure.'}
          </p>
        </button>

        <button
          onClick={() => navigateTo('iqac')}
          className="text-left p-5 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 hover:border-amber-400 transition-colors"
        >
          <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white mt-2">
            {isBn ? 'আইকিউএসি ও স্বীকৃতি' : 'IQAC & Accreditation'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isBn
              ? 'গুণগত মান ও স্বীকৃতিসমূহ দেখুন।'
              : 'Quality assurance and statutory affiliations.'}
          </p>
        </button>
      </div>

      {/* Honest note + source */}
      <div className="p-5 rounded-3xl glass-panel border border-amber-300/50 dark:border-amber-500/30 space-y-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <h2 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
            {isBn ? 'তালিকা সম্পর্কে' : 'About this list'}
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {isBn ? BOARD_PENDING_NOTE.bn : BOARD_PENDING_NOTE.en}
        </p>
        <div className="space-y-1.5 pt-1">
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {isBn ? 'আবাউট ও হিস্টরি পেজে আরও উল্লিখিত' : 'Also named on the About & History pages'}
          </p>
          <ul className="flex flex-wrap gap-2">
            {BOARD_ALSO_PUBLISHED.map((entry) => (
              <li
                key={entry.name}
                className="px-2.5 py-1 rounded-lg text-[11px] bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300"
              >
                <span className="font-semibold text-slate-900 dark:text-white">{entry.name}</span>
                <span className="text-slate-500 dark:text-slate-400"> · {isBn ? entry.role.bn : entry.role.en}</span>
              </li>
            ))}
          </ul>
        </div>
        <a
          href={BOARD_SOURCE_PAGE}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:underline"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>{isBn ? 'সূত্র: bist.edu.bd' : 'Source: bist.edu.bd'}</span>
        </a>
      </div>
    </div>
  );
};
