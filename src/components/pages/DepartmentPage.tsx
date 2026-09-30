import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Clock,
  BookOpen,
  Award,
  Layers,
  Sparkles,
  Building,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Users,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PROGRAMS, FACULTY_MEMBERS } from '../../data/mockData';

export const DepartmentPage: React.FC = () => {
  const { language, selectedDeptId, setSelectedDeptId, navigateTo } = useApp();
  const isBn = language === 'bn';

  const [expandedSemester, setExpandedSemester] = useState<number | null>(1);

  const currentProgram =
    PROGRAMS.find((p) => p.id === selectedDeptId) || PROGRAMS[0];

  const deptFaculty = FACULTY_MEMBERS.filter(
    (f) => f.department.toLowerCase() === currentProgram.shortTitle.toLowerCase()
  );

  return (
    <div className="py-10 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      {/* Department Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {PROGRAMS.map((prog) => (
          <button
            key={prog.id}
            onClick={() => {
              setSelectedDeptId(prog.id);
              setExpandedSemester(1);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              currentProgram.id === prog.id
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-950/50'
                : 'glass-panel text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {prog.shortTitle} - {isBn ? prog.title.bn.split(' ')[0] : prog.title.en.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Department Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-semibold border border-cyan-500/30">
              <span className="font-mono">{currentProgram.code}</span>
              <span className="text-slate-600">·</span>
              <span>{currentProgram.affiliation} Affiliated</span>
            </div>

            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {isBn ? currentProgram.title.bn : currentProgram.title.en}
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              {isBn ? currentProgram.overview.bn : currentProgram.overview.en}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>{isBn ? currentProgram.duration.bn : currentProgram.duration.en}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>{currentProgram.credits} Total Credits</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-400" />
                <span>{currentProgram.seats} Approved Intake Seats</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-4 text-center">
            <div>
              <span className="text-xs text-slate-400 block font-medium">
                {isBn ? 'সেমিস্টার ফি' : 'Semester Tuition Fee'}
              </span>
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-white font-mono">
                ৳{currentProgram.semesterFee.toLocaleString()}
              </span>
              <span className="text-[11px] text-cyan-400 block mt-1">
                {isBn ? '১০০% পর্যন্ত স্কলারশিপ প্রযোজ্য' : 'Up to 100% Scholarship Available'}
              </span>
            </div>

            <button
              onClick={() => navigateTo('apply-online')}
              className="w-full py-3 rounded-xl font-heading font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-amber-300 hover:opacity-90 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isBn ? 'এই বিভাগে আবেদন করুন' : 'Apply for this Major'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Eligibility Box */}
      <div className="p-5 rounded-2xl glass-panel border border-cyan-500/30 flex items-start gap-3">
        <GraduationCap className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 block">
            {isBn ? 'ভর্তির ন্যূনতম যোগ্যতা' : 'Minimum Admission Criteria'}
          </span>
          <p className="text-xs sm:text-sm text-slate-200">
            {isBn ? currentProgram.eligibility.bn : currentProgram.eligibility.en}
          </p>
        </div>
      </div>

      {/* 2-Column: Semester Curriculum Accordion & Career Paths / Labs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Semester-by-Semester Curriculum Accordion */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-1">
            <h2 className="font-heading font-bold text-xl text-white">
              {isBn ? 'সেমিস্টারভিত্তিক পূর্ণাঙ্গ পাঠ্যক্রম' : 'Semester-Wise Curriculum'}
            </h2>
            <p className="text-xs text-slate-400">
              {isBn
                ? 'জাতীয় বিশ্ববিদ্যালয়ের ক্রেডিট সিস্টেম অনুযায়ী ৮ সেমিস্টারের কোর্স রূপরেখা।'
                : 'National University 8-semester course breakdown with theoretical & lab credits.'}
            </p>
          </div>

          <div className="space-y-2.5">
            {currentProgram.curriculum.map((sem) => {
              const isExpanded = expandedSemester === sem.semester;
              return (
                <div
                  key={sem.semester}
                  className="rounded-xl glass-panel border border-white/5 overflow-hidden transition-all"
                >
                  <button
                    onClick={() =>
                      setExpandedSemester(isExpanded ? null : sem.semester)
                    }
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center">
                        S{sem.semester}
                      </span>
                      <span className="font-medium text-xs sm:text-sm text-white">
                        {isBn ? sem.title.bn : sem.title.en}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-white/5 space-y-2 bg-black/20">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Included Courses & Labs:
                      </span>
                      <ul className="space-y-1.5">
                        {sem.courses.map((course, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-xs text-slate-200"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>{course}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Career Paths, Specialized Labs & Faculty */}
        <div className="lg:col-span-5 space-y-6">
          {/* Career Prospects */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isBn ? 'কর্মসংস্থান ও ভবিষ্যৎ পেশা' : 'Target Career Pathways'}</span>
            </h3>
            <ul className="space-y-2">
              {currentProgram.careerProspects.map((cp, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2.5 text-xs text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{isBn ? cp.bn : cp.en}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialized Labs for this Dept */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>{isBn ? 'ব্যবহারিক গবেষণাগার' : 'Specialized Laboratories'}</span>
            </h3>
            <ul className="space-y-2">
              {currentProgram.labs.map((lab, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-xs text-slate-300"
                >
                  <Building className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>{lab}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Faculty in this Department */}
          {deptFaculty.length > 0 && (
            <div className="p-6 rounded-2xl glass-panel space-y-4">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>{isBn ? 'বিভাগীয় শিক্ষকমণ্ডলী' : 'Department Faculty'}</span>
              </h3>
              <div className="space-y-3">
                {deptFaculty.map((fac) => (
                  <div key={fac.id} className="flex items-center gap-3">
                    <img
                      src={fac.image}
                      alt={fac.name.en}
                      className="w-10 h-10 rounded-xl object-cover shrink-0"
                    />
                    <div className="text-xs">
                      <div className="font-semibold text-white">
                        {isBn ? fac.name.bn : fac.name.en}
                      </div>
                      <div className="text-slate-400">
                        {isBn ? fac.designation.bn : fac.designation.en}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
