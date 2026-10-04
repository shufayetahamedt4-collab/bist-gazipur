import React, { useState } from 'react';
import { Mail, Phone, GraduationCap, X, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useDismiss } from '../../hooks/useDismiss';
import { FACULTY_MEMBERS, PROGRAMS } from '../../data/mockData';
import { FacultyMember } from '../../types';

export const FacultyPage: React.FC = () => {
  const { language, theme } = useApp();
  const isBn = language === 'bn';

  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [modalFaculty, setModalFaculty] = useState<FacultyMember | null>(null);

  const filteredFaculty = FACULTY_MEMBERS.filter((f) => {
    if (selectedDept === 'all') return true;
    return f.department.toLowerCase() === selectedDept.toLowerCase();
  });

  const { backdropProps } = useDismiss(Boolean(modalFaculty), () => setModalFaculty(null));

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-10">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>{isBn ? 'দক্ষ শিক্ষকমণ্ডলী' : 'Distinguished Academic Faculty'}</span>
        </div>
        <h1
          className={`font-heading text-3xl sm:text-4xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
          }`}
        >
          {isBn ? 'বিআইএসটি-এর অভিজ্ঞ শিক্ষকবৃন্দ' : 'Faculty & Researchers'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          {isBn
            ? 'বুয়েট, বুটেক্স, ঢাবি এবং দেশ-বিদেশের খ্যাতিমান বিশ্ববিদ্যালয়ের ডিগ্রিধারী গবেষক ও শিক্ষক।'
            : 'Engineers, scholars, and industry mentors leading hands-on technical education.'}
        </p>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-4">
          <button
            onClick={() => setSelectedDept('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedDept === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'glass-panel text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            All Departments
          </button>
          {['CSE', 'TST', 'AMT', 'FDT', 'BBA', 'ADMIN'].map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedDept === dept
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'glass-panel text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((member) => (
          <div
            key={member.id}
            onClick={() => setModalFaculty(member)}
            className="group rounded-2xl glass-panel p-5 border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-black/40">
                <img
                  src={member.image}
                  alt={member.name.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-cyan-400 font-mono text-[10px] font-bold border border-white/10">
                  {member.department}
                </div>
              </div>

              <div>
                <h3
                  className={`font-heading font-bold text-base transition-colors ${
                    theme === 'dark'
                      ? 'text-white group-hover:text-cyan-700 dark:hover:text-cyan-300'
                      : 'text-[#0b192c] group-hover:text-cyan-700'
                  }`}
                >
                  {isBn ? member.name.bn : member.name.en}
                </h3>
                <span className="text-xs text-cyan-600 dark:text-cyan-400 font-medium block mt-0.5">
                  {isBn ? member.designation.bn : member.designation.en}
                </span>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                  {member.qualifications}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>{member.employmentType}</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
                View Bio →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Faculty Profile Modal */}
      {modalFaculty && (
        <div
          {...backdropProps}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
        >
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0a0f24] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setModalFaculty(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <img
                src={modalFaculty.image}
                alt={modalFaculty.name.en}
                className="w-20 h-20 rounded-2xl object-cover border border-white/10 shrink-0"
              />
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
                  {modalFaculty.department} Department
                </span>
                <h3 className="font-heading font-extrabold text-xl text-white mt-1">
                  {isBn ? modalFaculty.name.bn : modalFaculty.name.en}
                </h3>
                <p className="text-xs text-cyan-700 dark:text-cyan-300 font-medium">
                  {isBn ? modalFaculty.designation.bn : modalFaculty.designation.en}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-slate-500 block uppercase font-mono text-[10px]">Academic Qualification:</span>
                <p className="text-white font-medium">{modalFaculty.qualifications || '—'}</p>
              </div>

              {modalFaculty.specialization && (
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <span className="text-slate-500 block uppercase font-mono text-[10px]">Specialization:</span>
                  <p className="text-slate-200">{modalFaculty.specialization}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`mailto:${modalFaculty.email}`}
                  className="flex-1 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 text-white"
                >
                  <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="truncate">{modalFaculty.email}</span>
                </a>
                {modalFaculty.profileUrl ? (
                  <a
                    href={modalFaculty.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 text-white"
                  >
                    <ExternalLink className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Official Profile</span>
                  </a>
                ) : modalFaculty.phone ? (
                  <a
                    href={`tel:${modalFaculty.phone}`}
                    className="flex-1 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 text-white"
                  >
                    <Phone className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>{modalFaculty.phone}</span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
