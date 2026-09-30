import React, { useState } from 'react';
import { GraduationCap, Mail, Phone, ArrowRight, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FACULTY_MEMBERS } from '../../data/mockData';
import { FacultyMember } from '../../types';

/**
 * Faculty preview built from the real roster mirrored from bist.edu.bd/all-teachers.
 * Only the details the live site publishes are shown (name, designation, employment
 * type, department, academic qualification, e-mail). Presentation-only extras such as
 * "years of experience" were dropped because the live site does not publish them.
 */
export const FacultySection: React.FC = () => {
  const { language, navigateTo, theme } = useApp();
  const isBn = language === 'bn';

  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [activeModalMember, setActiveModalMember] = useState<FacultyMember | null>(null);

  const departmentLabels: Record<string, { en: string; bn: string }> = {
    CSE: { en: 'Computer Science (CSE)', bn: 'কম্পিউটার সায়েন্স (CSE)' },
    TST: { en: 'Textile Engineering (TST)', bn: 'টেক্সটাইল ইঞ্জিনিয়ারিং (TST)' },
    AMT: { en: 'Apparel Manufacture (AMT)', bn: 'অ্যাপারেল টেকনোলজি (AMT)' },
    FDT: { en: 'Fashion Design (FDT)', bn: 'ফ্যাশন ডিজাইন (FDT)' },
    BBA: { en: 'Business Studies (BBA)', bn: 'বিজনেস স্টাডিজ (BBA)' },
    ADMIN: { en: 'Administration', bn: 'প্রশাসন' },
  };

  const departments = [
    { id: 'all', label: { en: 'All Faculty', bn: 'সকল শিক্ষকমণ্ডলী' } },
    ...Object.entries(departmentLabels).map(([id, label]) => ({ id, label })),
  ];

  const filteredMembers = FACULTY_MEMBERS.filter((m) => {
    if (selectedDept === 'all') return true;
    return m.department.toLowerCase() === selectedDept.toLowerCase();
  });

  const designationOf = (member: FacultyMember) =>
    isBn ? member.designation.bn : member.designation.en;

  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      {/* Header with Futuristic Badge and Deep Thematic Styling */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold ${
              theme === 'dark'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-sm'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>
              {isBn ? 'দক্ষ ও অভিজ্ঞ শিক্ষকমণ্ডলী' : 'Distinguished Academic Faculty'}
            </span>
          </div>

          <h2
            className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
            }`}
          >
            {isBn ? (
              <>
                আমাদের বিজ্ঞ{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-yellow-500">
                  অনুষদ ও শিক্ষকমণ্ডলী
                </span>
              </>
            ) : (
              <>
                Our Eminent{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-yellow-500">
                  Academic Faculty & Mentors
                </span>
              </>
            )}
          </h2>

          <p
            className={`text-sm sm:text-base leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {isBn
              ? 'DUET, BUET, RUET, ঢাকা বিশ্ববিদ্যালয় ও দেশের শীর্ষ প্রতিষ্ঠান থেকে ডিগ্রিধারী শিক্ষকমণ্ডলী — বিআইএসটির হাতে-কলমে পাঠদান ও শিল্প-অভিজ্ঞতা একই সাথে।'
              : 'Our roster is mirrored directly from the institute’s official teacher directory — DUET, BUET, RUET, HSTU and industry-experienced mentors teaching every programme.'}
          </p>
        </div>

        <button
          onClick={() => navigateTo('faculty')}
          className={`shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl font-heading text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            theme === 'dark'
              ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40'
              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/20'
          }`}
        >
          <span>{isBn ? 'সম্পূর্ণ শিক্ষক তালিকা' : 'View Full Faculty Directory'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Department Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {departments.map((dept) => {
          const isActive = selectedDept === dept.id;
          return (
            <button
              key={dept.id}
              onClick={() => setSelectedDept(dept.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-500 to-yellow-500 text-slate-950 shadow-md font-extrabold'
                  : theme === 'dark'
                  ? 'bg-slate-900/90 text-slate-300 hover:text-white border border-white/10'
                  : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-200 shadow-sm'
              }`}
            >
              {isBn ? dept.label.bn : dept.label.en}
            </button>
          );
        })}
      </div>

      {/* Faculty Cards Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMembers.slice(0, 8).map((faculty) => (
          <div
            key={faculty.id}
            className={`group rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between border relative overflow-hidden ${
              theme === 'dark'
                ? 'bg-slate-900/90 border-white/10 hover:border-emerald-500/50 hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)]'
                : 'bg-white border-slate-200/90 hover:border-emerald-400 hover:shadow-[0_12px_32px_rgba(5,150,105,0.12)]'
            }`}
          >
            {/* Ambient green corner glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/20 transition-colors" />

            <div className="space-y-4">
              {/* Photo & Dept Badge */}
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={faculty.image}
                  alt={faculty.name.en}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-md font-mono text-[11px] font-extrabold shadow-md bg-slate-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                  {faculty.department}
                </div>
                {faculty.employmentType && (
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/60 text-white backdrop-blur-md">
                    {faculty.employmentType}
                  </div>
                )}
              </div>

              {/* Faculty Info */}
              <div className="space-y-1">
                <h3
                  className={`font-heading font-extrabold text-base transition-colors line-clamp-1 ${
                    theme === 'dark'
                      ? 'text-white group-hover:text-emerald-300'
                      : 'text-[#0b192c] group-hover:text-emerald-700'
                  }`}
                >
                  {isBn ? faculty.name.bn : faculty.name.en}
                </h3>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 line-clamp-2">
                  {designationOf(faculty)}
                </p>
                <p
                  className={`text-[11px] line-clamp-2 leading-relaxed pt-1 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {faculty.qualifications}
                </p>
              </div>
            </div>

            {/* Bottom Actions: Contact & Modal trigger */}
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <a
                  href={`mailto:${faculty.email}`}
                  className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:scale-110 transition-transform"
                  title={faculty.email}
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
                {faculty.phone && (
                  <a
                    href={`tel:${faculty.phone}`}
                    className="p-1.5 rounded-lg bg-yellow-100 dark:bg-yellow-950/60 text-yellow-800 dark:text-yellow-300 hover:scale-110 transition-transform"
                    title={faculty.phone}
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <button
                onClick={() => setActiveModalMember(faculty)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-800 hover:bg-slate-700 text-emerald-300'
                    : 'bg-slate-100 hover:bg-emerald-50 text-emerald-800'
                }`}
              >
                {isBn ? 'বায়ো দেখুন →' : 'View Bio →'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Faculty Modal Preview */}
      {activeModalMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div
            className={`max-w-lg w-full rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative border ${
              theme === 'dark' ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <button
              onClick={() => setActiveModalMember(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-start gap-4">
              <img
                src={activeModalMember.image}
                alt={activeModalMember.name.en}
                className="w-20 h-20 rounded-2xl object-cover object-top border-2 border-emerald-400"
              />
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  {activeModalMember.department}
                </span>
                <h3
                  className={`font-heading font-extrabold text-lg ${
                    theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
                  }`}
                >
                  {isBn ? activeModalMember.name.bn : activeModalMember.name.en}
                </h3>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {designationOf(activeModalMember)}
                  {activeModalMember.employmentType && (
                    <span className="font-medium text-slate-400">
                      {' '}
                      · {activeModalMember.employmentType}
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              {activeModalMember.qualifications && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-white/5 space-y-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">
                    {isBn ? 'শিক্ষাগত যোগ্যতা:' : 'Academic Qualification:'}
                  </span>
                  <p className="text-slate-600 dark:text-slate-400">
                    {activeModalMember.qualifications}
                  </p>
                </div>
              )}

              {activeModalMember.specialization && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-white/5 space-y-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">
                    {isBn ? 'বিশেষত্ব:' : 'Specialization:'}
                  </span>
                  <p className="text-slate-600 dark:text-slate-400">
                    {activeModalMember.specialization}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`mailto:${activeModalMember.email}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{isBn ? 'ইমেইল পাঠান' : 'Send Email'}</span>
                </a>
                {activeModalMember.profileUrl ? (
                  <a
                    href={activeModalMember.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-slate-950 font-bold text-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{isBn ? 'অফিসিয়াল প্রোফাইল' : 'Official Profile'}</span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
