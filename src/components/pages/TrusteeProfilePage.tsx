import React from 'react';
import {
  ArrowLeft,
  Mail,
  Phone,
  GraduationCap,
  Building,
  Award,
  Info,
  ExternalLink,
  UserRound,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BOARD_OF_TRUSTEES } from '../../data/mockData';

/** Initials avatar used when the official page publishes no portrait. */
const initialsOf = (name: string): string =>
  name
    .replace(/^(Md\.?|Mr\.?|Mrs\.?|Dr\.?|Prof\.?)\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

/**
 * Detailed profile for a Board of Trustees member, laid out like the institute's own
 * governance pages (Profile / Education / Certification) — which in turn follow the
 * conventional university-management profile format.
 *
 * Renders only what the official site publishes. Where a section has no published
 * content it says so plainly instead of showing invented detail.
 */
export const TrusteeProfilePage: React.FC = () => {
  const { language, selectedTrusteeSlug, navigateTo } = useApp();
  const isBn = language === 'bn';

  const member = selectedTrusteeSlug
    ? BOARD_OF_TRUSTEES.find((m) => m.slug === selectedTrusteeSlug)
    : undefined;

  if (!member) {
    return (
      <div className="py-20 px-4 sm:px-6 max-w-3xl mx-auto space-y-6 text-center">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {isBn ? 'প্রোফাইল পাওয়া যায়নি' : 'Profile not found'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {isBn
            ? 'এই ঠিকানার সঙ্গে মিলে এমন কোনো ট্রাস্টি নেই।'
            : 'No Board of Trustees member matches this address.'}
        </p>
        <button
          onClick={() => navigateTo('board-of-trustees')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-sm font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isBn ? 'বোর্ড তালিকায় ফিরে যান' : 'Back to the Board'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
      <button
        onClick={() => navigateTo('board-of-trustees')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>{isBn ? 'বোর্ড অফ ট্রাস্টিজে ফিরে যান' : 'Back to the Board of Trustees'}</span>
      </button>

      {/* Header card — photo, name, role, contact */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row gap-6">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="w-32 h-32 sm:w-44 sm:h-44 rounded-2xl object-cover object-top border border-slate-200 dark:border-white/10 shrink-0"
          />
        ) : (
          <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-2xl bg-gradient-to-br from-amber-500 to-emerald-600 text-white flex items-center justify-center font-heading font-black text-4xl shrink-0">
            {initialsOf(member.name)}
          </div>
        )}

        <div className="space-y-3 min-w-0">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {member.name}
            </h1>
            <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              {isBn ? member.role.bn : member.role.en}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
            {member.email ? (
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-amber-700 dark:hover:text-amber-400 break-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{member.email}</span>
              </a>
            ) : null}
            {member.phone ? (
              <a
                href={`tel:${member.phone.replace(/[^+\d]/g, '')}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-amber-700 dark:hover:text-amber-400"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{member.phone}</span>
              </a>
            ) : null}
            {!member.email && !member.phone && (
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Info className="w-3.5 h-3.5" />
                <span>
                  {isBn
                    ? 'যোগাযোগের তথ্য অফিসিয়াল সাইটে প্রকাশিত হয়নি।'
                    : 'Contact details are not published on the official site.'}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Profile — positions grouped under the headings the official page prints */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
            <UserRound className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
            {isBn ? 'প্রোফাইল' : 'Profile'}
          </h2>
        </div>

        {member.positions && member.positions.length > 0 ? (
          <div className="space-y-4">
            {member.positions.map((group, idx) => (
              <div key={`${group.role}-${idx}`} className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                  {group.role}
                </p>
                <ul className="space-y-1">
                  {group.organisations.map((org) => (
                    <li key={org} className="flex items-start gap-2">
                      <Building className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">{org}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isBn
              ? 'প্রোফাইল বিভাগে অফিসিয়াল সাইটে কোনো তথ্য প্রকাশিত হয়নি।'
              : 'The official site publishes no profile details for this member.'}
          </p>
        )}
      </div>

      {/* Education table */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
            {isBn ? 'শিক্ষা' : 'Education'}
          </h2>
        </div>

        {member.education && member.education.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10">
                  {[isBn ? 'ডিগ্রি' : 'Degree', isBn ? 'পরীক্ষা' : 'Examination', isBn ? 'ফলাফল' : 'Result', isBn ? 'প্রতিষ্ঠান' : 'Institution'].map(
                    (h) => (
                      <th
                        key={h}
                        className="py-2.5 pr-4 text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {member.education.map((row, idx) => (
                  <tr
                    key={`${row.degree}-${idx}`}
                    className="border-b border-slate-100 dark:border-white/5 last:border-0 align-top"
                  >
                    <td className="py-3 pr-4 text-sm font-semibold text-slate-900 dark:text-white">
                      {row.degree}
                    </td>
                    <td className="py-3 pr-4 text-xs text-slate-600 dark:text-slate-300">
                      {row.examination}
                    </td>
                    <td className="py-3 pr-4 text-xs text-slate-600 dark:text-slate-300">
                      {row.result ?? '—'}
                    </td>
                    <td className="py-3 pr-4 text-xs text-slate-600 dark:text-slate-300">
                      {row.institution ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isBn
              ? 'শিক্ষা বিভাগে অফিসিয়াল সাইটে কোনো তথ্য প্রকাশিত হয়নি।'
              : 'The official site publishes no education details for this member.'}
          </p>
        )}
      </div>

      {/* Certification */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
            {isBn ? 'সার্টিফিকেশন' : 'Certification'}
          </h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {member.certificationPending
            ? isBn
              ? 'অফিসিয়াল সাইটে সার্টিফিকেশন তালিকা এখনো প্রকাশিত হয়নি (“শীঘ্রই আসছে”)।'
              : 'The official site has not published a certification list yet (“Coming soon!”).'
            : isBn
              ? 'এই সদস্যের জন্য সার্টিফিকেশন তথ্য প্রকাশিত হয়নি।'
              : 'No certifications are published for this member.'}
        </p>
      </div>

      {/* Source */}
      <div className="p-5 rounded-3xl glass-panel border border-amber-300/50 dark:border-amber-500/30 space-y-2">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <h2 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
            {isBn ? 'তথ্যসূত্র' : 'Source'}
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {isBn
            ? 'এই প্রোফাইলের সব তথ্য প্রতিষ্ঠানের অফিসিয়াল ওয়েবসাইট থেকে হুবহু নেওয়া হয়েছে।'
            : 'Everything on this profile is reproduced from the institution’s official website.'}
        </p>
        {member.sourceUrl && (
          <a
            href={member.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{member.sourceUrl.replace(/^https?:\/\//, '')}</span>
          </a>
        )}
      </div>
    </div>
  );
};
