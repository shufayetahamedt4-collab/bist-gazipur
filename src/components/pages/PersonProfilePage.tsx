import React from 'react';
import { ArrowLeft, Mail, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PEOPLE } from '../../data/mockData';

/**
 * Phase 1 shell for `#/people/:slug`.
 *
 * It resolves the slug against the unified roster and renders only the fields
 * the institute actually publishes, then says plainly that the full sectioned
 * profile (education, career, publications, awards) is still to come. Phase 2
 * replaces the body of this component — the route, the slug lookup and the
 * data model all already work.
 */
export const PersonProfilePage: React.FC = () => {
  const { language, navigateTo, selectedPersonSlug } = useApp();
  const isBn = language === 'bn';

  const person = selectedPersonSlug
    ? PEOPLE.find((p) => p.slug === selectedPersonSlug)
    : undefined;

  if (!person) {
    return (
      <div className="py-20 px-4 sm:px-6 max-w-3xl mx-auto space-y-6 text-center">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {isBn ? 'প্রোফাইল পাওয়া যায়নি' : 'Profile not found'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {isBn
            ? 'এই ঠিকানার সঙ্গে মিলে এমন কোনো প্রোফাইল নেই।'
            : 'No person in the roster matches this address.'}
        </p>
        <button
          onClick={() => navigateTo('faculty')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isBn ? 'শিক্ষক তালিকায় ফিরে যান' : 'Back to the directory'}</span>
        </button>
      </div>
    );
  }

  const primary = person.roles.find((r) => r.isPrimary) ?? person.roles[0];

  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-8">
      <button
        onClick={() => navigateTo('faculty')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>{isBn ? 'ডিরেক্টরিতে ফিরে যান' : 'Back to the directory'}</span>
      </button>

      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row gap-6">
        <img
          src={person.photo}
          alt={person.name.en}
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover object-top border border-slate-200 dark:border-white/10 shrink-0"
        />

        <div className="space-y-3 min-w-0">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {isBn ? person.name.bn : person.name.en}
            </h1>
            <ul className="mt-1.5 space-y-0.5">
              {person.roles.map((role) => (
                <li
                  key={`${role.unitCode}-${role.role}`}
                  className="text-sm font-bold text-emerald-700 dark:text-emerald-400"
                >
                  {isBn ? role.designation.bn : role.designation.en}
                  <span className="font-normal text-slate-500 dark:text-slate-400">
                    {' · '}
                    {role.role === 'officer'
                      ? isBn
                        ? role.unitName?.bn ?? role.unitCode
                        : role.unitName?.en ?? role.unitCode
                      : role.unitCode}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {person.qualifications && (
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {person.qualifications}
            </p>
          )}

          {person.email && (
            <a
              href={`mailto:${person.email}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="break-all">{person.email}</span>
            </a>
          )}
        </div>
      </div>

      <div className="p-5 rounded-3xl glass-panel border border-amber-300/50 dark:border-amber-500/30 space-y-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <h2 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
            {isBn ? 'পূর্ণ প্রোফাইল আসছে' : 'Full profile coming'}
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {isBn
            ? 'এই ঠিকানাটি এখন সক্রিয়। শিক্ষা, কর্মজীবন, প্রকাশনা ও পুরস্কারের বিভাগগুলো পরবর্তী ধাপে যুক্ত হবে — শুধুমাত্র প্রতিষ্ঠান যে তথ্য প্রকাশ করে তা-ই দেখানো হবে।'
            : 'This address is now live. The sectioned profile — education, career, publications and awards — arrives in the next phase, and only ever shows data the institute actually publishes.'}
        </p>
      </div>
    </div>
  );
};
