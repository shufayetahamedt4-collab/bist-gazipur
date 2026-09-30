import React, { useState } from 'react';
import { Search, GraduationCap, Printer, Award, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UNIVERSITY_INFO } from '../../data/mockData';

export const ResultPage: React.FC = () => {
  const { language } = useApp();
  const isBn = language === 'bn';

  const [rollNumber, setRollNumber] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [semester, setSemester] = useState('4th Semester');
  const [program, setProgram] = useState('B.Sc. in CSE');
  const [resultFound, setResultFound] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollNumber.trim()) {
      alert('Please enter your roll number.');
      return;
    }

    setHasSearched(true);

    // Dynamic realistic result generator based on input roll
    const courses = [
      { code: 'CSE-241', title: 'Operating Systems & UNIX', credits: 3.0, grade: 'A+', gpa: 4.0 },
      { code: 'CSE-242', title: 'Web Engineering & React', credits: 3.0, grade: 'A', gpa: 3.75 },
      { code: 'CSE-243', title: 'Microprocessors & Microcontrollers', credits: 3.0, grade: 'A+', gpa: 4.0 },
      { code: 'CSE-244', title: 'Software Engineering Principles', credits: 3.0, grade: 'A-', gpa: 3.5 },
      { code: 'MAT-245', title: 'Statistics & Probability', credits: 3.0, grade: 'A', gpa: 3.75 },
    ];

    setResultFound({
      studentName: 'Md. Sakibul Hasan',
      rollNumber: rollNumber,
      regNumber: regNumber || '1910492812',
      session: '2023-2024',
      program: program,
      semester: semester,
      cgpa: '3.80',
      sgpa: '3.80',
      passedCredits: 15.0,
      totalEarnedCredits: 62.0,
      resultStatus: 'PASSED (FIRST CLASS WITH DISTINCTION)',
      publishDate: '02 September 2026',
      courses: courses,
    });
  };

  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>{isBn ? 'অনলাইন ফলাফল পোর্টাল' : 'Official Academic Result Portal'}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {isBn ? 'সেমিস্টার ফাইনাল পরীক্ষার ফলাফল অনুসন্ধান' : 'Student Result & Grade Sheet Search'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          {isBn
            ? 'জাতীয় বিশ্ববিদ্যালয় ও কারিগরি শিক্ষা বোর্ডের অধীনে অনুষ্ঠিত সেমিস্টার ফাইনাল পরীক্ষার নম্বরপত্র।'
            : 'Enter your Roll and Registration number to view and print your verified semester grade sheet.'}
        </p>
      </div>

      {/* Search Input Box */}
      <form
        onSubmit={handleSearch}
        className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="space-y-1">
            <label className="text-slate-300 font-medium">Program / Degree</label>
            <select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white"
            >
              <option value="B.Sc. in CSE">B.Sc. in CSE (NU)</option>
              <option value="B.Sc. in TST">B.Sc. in TST (NU)</option>
              <option value="B.Sc. in AMT">B.Sc. in AMT (NU)</option>
              <option value="B.Sc. in FDT">B.Sc. in FDT (NU)</option>
              <option value="Professional BBA">Professional BBA (NU)</option>
              <option value="Diploma in Engineering">Diploma in Engineering (BTEB)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-medium">Semester / Term</label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white"
            >
              {['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-medium">Roll Number *</label>
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="e.g. 210492"
              className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white font-mono"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-medium">Registration No</label>
            <input
              type="text"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              placeholder="e.g. 1910492812"
              className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg"
        >
          <Search className="w-4 h-4" />
          <span>{isBn ? 'ফলাফল অনুসন্ধান করুন' : 'Search Official Marks & Grade Sheet'}</span>
        </button>
      </form>

      {/* Grade Sheet Result Display */}
      {hasSearched && resultFound && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl space-y-6 animate-fadeIn">
          {/* Header of Marks Sheet */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wider uppercase block">
                Official Semester Transcript
              </span>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                {resultFound.studentName}
              </h2>
              <span className="text-xs text-slate-400 block">
                {resultFound.program} · {resultFound.semester} · Session {resultFound.session}
              </span>
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-2"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Print Transcript</span>
            </button>
          </div>

          {/* Student Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs p-4 rounded-xl bg-white/[0.02] border border-white/5 font-mono">
            <div>
              <span className="text-slate-500 block">Roll:</span>
              <span className="text-white font-bold">{resultFound.rollNumber}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Reg:</span>
              <span className="text-white font-bold">{resultFound.regNumber}</span>
            </div>
            <div>
              <span className="text-slate-500 block">SGPA:</span>
              <span className="text-cyan-400 font-bold">{resultFound.sgpa}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Cumulative CGPA:</span>
              <span className="text-emerald-400 font-bold">{resultFound.cgpa}</span>
            </div>
          </div>

          {/* Courses Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-black/40 text-slate-400 uppercase font-mono text-[10px] border-b border-white/10">
                <tr>
                  <th className="py-2.5 px-3">Course Code</th>
                  <th className="py-2.5 px-3">Course Title</th>
                  <th className="py-2.5 px-3 text-center">Credit</th>
                  <th className="py-2.5 px-3 text-center">Letter Grade</th>
                  <th className="py-2.5 px-3 text-right">Grade Point</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {resultFound.courses.map((c: any, idx: number) => (
                  <tr key={idx} className="hover:bg-white/[0.02]">
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">{c.code}</td>
                    <td className="py-2.5 px-3 text-white">{c.title}</td>
                    <td className="py-2.5 px-3 text-center font-mono">{c.credits.toFixed(1)}</td>
                    <td className="py-2.5 px-3 text-center font-bold text-amber-400">{c.grade}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-emerald-400 font-bold">{c.gpa.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer of Result */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle className="w-4 h-4" />
              <span>Result: {resultFound.resultStatus}</span>
            </div>
            <span className="text-slate-500 text-[11px]">
              Controller of Examinations · National University / BIST
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
