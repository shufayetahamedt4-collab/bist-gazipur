import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  User,
  BookOpen,
  Award,
  FileText,
  Printer,
  Download,
  Phone,
  Sparkles,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PROGRAMS, UNIVERSITY_INFO } from '../../data/mockData';

export const ApplyOnlinePage: React.FC = () => {
  const { language, submitApplication, navigateTo } = useApp();
  const isBn = language === 'bn';

  const [step, setStep] = useState<number>(1);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    banglaName: '',
    email: '',
    phone: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    gender: 'Male',
    bloodGroup: 'A+',
    presentAddress: '',
    permanentAddress: '',
    sscBoard: 'Dhaka',
    sscRoll: '',
    sscReg: '',
    sscYear: '2022',
    sscGpa: '',
    hscBoard: 'Dhaka',
    hscRoll: '',
    hscReg: '',
    hscYear: '2024',
    hscGpa: '',
    programChoice: 'cse',
    shift: 'Day Shift (Regular)',
    quota: 'General Merit',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep = (currentStep: number): boolean => {
    const errs: { [key: string]: string } = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
      if (!formData.phone.trim() || formData.phone.length < 11) errs.phone = 'Valid 11-digit phone number is required';
      if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
      if (!formData.fatherName.trim()) errs.fatherName = "Father's Name is required";
      if (!formData.dateOfBirth) errs.dateOfBirth = 'Date of birth is required';
      if (!formData.presentAddress.trim()) errs.presentAddress = 'Present address is required';
    }

    if (currentStep === 2) {
      if (!formData.sscRoll.trim()) errs.sscRoll = 'SSC Roll is required';
      if (!formData.sscGpa || Number(formData.sscGpa) < 2.0) errs.sscGpa = 'Valid SSC GPA (min 2.0) is required';
      if (!formData.hscRoll.trim()) errs.hscRoll = 'HSC/Diploma Roll is required';
      if (!formData.hscGpa || Number(formData.hscGpa) < 2.0) errs.hscGpa = 'Valid HSC/Diploma GPA is required';
    }

    if (currentStep === 3) {
      if (!formData.programChoice) errs.programChoice = 'Please select your desired program';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert('Please check the declaration box confirming the truthfulness of your submission.');
      return;
    }

    const refNum = submitApplication({
      fullName: formData.fullName,
      banglaName: formData.banglaName,
      email: formData.email,
      phone: formData.phone,
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      presentAddress: formData.presentAddress,
      permanentAddress: formData.permanentAddress,
      sscBoard: formData.sscBoard,
      sscRoll: formData.sscRoll,
      sscReg: formData.sscReg,
      sscYear: formData.sscYear,
      sscGpa: formData.sscGpa,
      hscBoard: formData.hscBoard,
      hscRoll: formData.hscRoll,
      hscReg: formData.hscReg,
      hscYear: formData.hscYear,
      hscGpa: formData.hscGpa,
      programChoice: formData.programChoice,
      shift: formData.shift,
      quota: formData.quota,
    });

    setSubmittedRef(refNum);
    setStep(6);
  };

  // Steps Progress Indicator
  const stepsTitles = [
    { num: 1, label: isBn ? 'ব্যক্তিগত তথ্য' : 'Personal Info', icon: User },
    { num: 2, label: isBn ? 'একাডেমিক তথ্য' : 'Academic Info', icon: BookOpen },
    { num: 3, label: isBn ? 'প্রোগ্রাম নির্বাচন' : 'Program Choice', icon: Award },
    { num: 4, label: isBn ? 'ডকুমেন্ট আপলোড' : 'Documents', icon: Upload },
    { num: 5, label: isBn ? 'যাচাই ও নিশ্চিত' : 'Review & Submit', icon: CheckCircle2 },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isBn ? 'সেশন ২০২৫-২৬ অনলাইন ভর্তি পোর্টাল' : 'Session 2025-26 Online Admission Portal'}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {isBn ? 'অনলাইনে ভর্তি আবেদন ফরম' : 'BIST Online Admission Application'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          {isBn
            ? 'জাতীয় বিশ্ববিদ্যালয় ও কারিগরি শিক্ষা বোর্ডের অধীনে বি.এসসি ও ডিপ্লোমা প্রোগ্রামে ভর্তির প্রাথমিক আবেদন।'
            : 'Fill in your personal, academic and program details to receive your instant reference tracking number.'}
        </p>
      </div>

      {/* Progress Stepper Bar (if not submitted) */}
      {!submittedRef && (
        <div className="glass-panel p-4 rounded-2xl">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
            {stepsTitles.map((s) => (
              <div
                key={s.num}
                className={`flex items-center gap-2 shrink-0 ${
                  step === s.num
                    ? 'text-cyan-400 font-bold'
                    : step > s.num
                    ? 'text-emerald-400'
                    : 'text-slate-500'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all ${
                    step === s.num
                      ? 'bg-cyan-500 text-slate-950 ring-4 ring-cyan-500/20'
                      : step > s.num
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-white/5 border border-white/10'
                  }`}
                >
                  {step > s.num ? '✓' : s.num}
                </div>
                <span className="text-xs hidden md:inline">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step Form Wrapper */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
        {/* STEP 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="font-heading font-bold text-lg text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-400" />
              <span>{isBn ? '১. শিক্ষার্থীর ব্যক্তিগত তথ্যাবলি' : '1. Applicant Personal Information'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">
                  {isBn ? 'পূর্ণ নাম (ইংরেজি বড় অক্ষরে) *' : 'Full Name (in English Capital) *'}
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. TANVIR HOSSAIN MAHIN"
                  className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-cyan-500 focus:outline-none uppercase"
                />
                {errors.fullName && <p className="text-rose-400 text-[11px]">{errors.fullName}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">
                  {isBn ? 'নাম (বাংলায়)' : 'Name in Bengali'}
                </label>
                <input
                  type="text"
                  value={formData.banglaName}
                  onChange={(e) => setFormData({ ...formData, banglaName: e.target.value })}
                  placeholder="যেমন: তানভীর হোসেন মাহিন"
                  className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">
                  {isBn ? 'মোবাইল নম্বর (হোয়াটসঅ্যাপ যুক্ত) *' : 'Mobile Number (WhatsApp Enabled) *'}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="017XXXXXXXX"
                  className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-cyan-500 focus:outline-none font-mono"
                />
                {errors.phone && <p className="text-rose-400 text-[11px]">{errors.phone}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">
                  {isBn ? 'ইমেইল অ্যাড্রেস *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="student@example.com"
                  className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                />
                {errors.email && <p className="text-rose-400 text-[11px]">{errors.email}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">{isBn ? 'পিতার নাম *' : "Father's Name *"}</label>
                <input
                  type="text"
                  value={formData.fatherName}
                  onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                  placeholder="e.g. Md. Delowar Hossain"
                  className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                />
                {errors.fatherName && <p className="text-rose-400 text-[11px]">{errors.fatherName}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">{isBn ? 'মাতার নাম *' : "Mother's Name *"}</label>
                <input
                  type="text"
                  value={formData.motherName}
                  onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                  placeholder="e.g. Mahmuda Begum"
                  className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">{isBn ? 'জন্ম তারিখ *' : 'Date of Birth *'}</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                />
                {errors.dateOfBirth && <p className="text-rose-400 text-[11px]">{errors.dateOfBirth}</p>}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">{isBn ? 'লিঙ্গ' : 'Gender'}</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">{isBn ? 'রক্তের গ্রুপ' : 'Blood Group'}</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-slate-300 font-medium">
                  {isBn ? 'বর্তমান ঠিকানা (গাজীপুর/অন্যান্য) *' : 'Present Address *'}
                </label>
                <input
                  type="text"
                  value={formData.presentAddress}
                  onChange={(e) => setFormData({ ...formData, presentAddress: e.target.value })}
                  placeholder="House, Road, Area, Thana, District"
                  className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                />
                {errors.presentAddress && <p className="text-rose-400 text-[11px]">{errors.presentAddress}</p>}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>{isBn ? 'পরবর্তী ধাপ (একাডেমিক তথ্য)' : 'Next Step: Academic Info'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Academic Info */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="font-heading font-bold text-lg text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <span>{isBn ? '২. পূর্ববর্তী শিক্ষাগত যোগ্যতা' : '2. Academic Qualifications'}</span>
            </h2>

            {/* SSC / Dakhil Section */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                {isBn ? 'এসএসসি / সমমান পরীক্ষা' : 'Secondary School Certificate (SSC / Equivalent)'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400">Board</label>
                  <select
                    value={formData.sscBoard}
                    onChange={(e) => setFormData({ ...formData, sscBoard: e.target.value })}
                    className="w-full p-2 rounded-lg bg-black/40 border border-white/10 text-white"
                  >
                    {['Dhaka', 'Chittagong', 'Rajshahi', 'Mymensingh', 'Comilla', 'Jessore', 'Sylhet', 'Barisal', 'Dinajpur', 'Madrasah', 'Technical'].map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Roll No *</label>
                  <input
                    type="text"
                    value={formData.sscRoll}
                    onChange={(e) => setFormData({ ...formData, sscRoll: e.target.value })}
                    className="w-full p-2 rounded-lg bg-black/40 border border-white/10 text-white font-mono"
                    placeholder="e.g. 102934"
                  />
                  {errors.sscRoll && <p className="text-rose-400 text-[10px]">{errors.sscRoll}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Reg No</label>
                  <input
                    type="text"
                    value={formData.sscReg}
                    onChange={(e) => setFormData({ ...formData, sscReg: e.target.value })}
                    className="w-full p-2 rounded-lg bg-black/40 border border-white/10 text-white font-mono"
                    placeholder="e.g. 1810..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Passing Year</label>
                  <select
                    value={formData.sscYear}
                    onChange={(e) => setFormData({ ...formData, sscYear: e.target.value })}
                    className="w-full p-2 rounded-lg bg-black/40 border border-white/10 text-white font-mono"
                  >
                    {['2024', '2023', '2022', '2021', '2020', '2019', '2018'].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">GPA (Out of 5) *</label>
                  <input
                    type="text"
                    value={formData.sscGpa}
                    onChange={(e) => setFormData({ ...formData, sscGpa: e.target.value })}
                    className="w-full p-2 rounded-lg bg-black/40 border border-white/10 text-white font-mono"
                    placeholder="e.g. 4.75"
                  />
                  {errors.sscGpa && <p className="text-rose-400 text-[10px]">{errors.sscGpa}</p>}
                </div>
              </div>
            </div>

            {/* HSC / Alim / Polytechnic Diploma Section */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                {isBn ? 'এইচএসসি / কারিগরি ডিপ্লোমা / সমমান' : 'HSC / Polytechnic Diploma / Equivalent'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400">Board / BTEB</label>
                  <select
                    value={formData.hscBoard}
                    onChange={(e) => setFormData({ ...formData, hscBoard: e.target.value })}
                    className="w-full p-2 rounded-lg bg-black/40 border border-white/10 text-white"
                  >
                    {['Dhaka', 'Technical (BTEB)', 'Rajshahi', 'Chittagong', 'Mymensingh', 'Comilla', 'Jessore', 'Sylhet', 'Barisal', 'Madrasah'].map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Roll No *</label>
                  <input
                    type="text"
                    value={formData.hscRoll}
                    onChange={(e) => setFormData({ ...formData, hscRoll: e.target.value })}
                    className="w-full p-2 rounded-lg bg-black/40 border border-white/10 text-white font-mono"
                    placeholder="e.g. 509214"
                  />
                  {errors.hscRoll && <p className="text-rose-400 text-[10px]">{errors.hscRoll}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Reg No</label>
                  <input
                    type="text"
                    value={formData.hscReg}
                    onChange={(e) => setFormData({ ...formData, hscReg: e.target.value })}
                    className="w-full p-2 rounded-lg bg-black/40 border border-white/10 text-white font-mono"
                    placeholder="e.g. 1910..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Passing Year</label>
                  <select
                    value={formData.hscYear}
                    onChange={(e) => setFormData({ ...formData, hscYear: e.target.value })}
                    className="w-full p-2 rounded-lg bg-black/40 border border-white/10 text-white font-mono"
                  >
                    {['2025', '2024', '2023', '2022', '2021', '2020'].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">GPA *</label>
                  <input
                    type="text"
                    value={formData.hscGpa}
                    onChange={(e) => setFormData({ ...formData, hscGpa: e.target.value })}
                    className="w-full p-2 rounded-lg bg-black/40 border border-white/10 text-white font-mono"
                    placeholder="e.g. 4.50"
                  />
                  {errors.hscGpa && <p className="text-rose-400 text-[10px]">{errors.hscGpa}</p>}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>{isBn ? 'পরবর্তী ধাপ (প্রোগ্রাম নির্বাচন)' : 'Next Step: Program Choice'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Program Choice & Quota */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="font-heading font-bold text-lg text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>{isBn ? '৩. আবেদনকৃত প্রোগ্রাম ও শিফট নির্বাচন' : '3. Program Preference & Quota'}</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium block">
                  {isBn ? 'পছন্দের বিভাগ / প্রোগ্রাম নির্বাচন করুন *' : 'Select Program / Discipline *'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PROGRAMS.map((prog) => (
                    <label
                      key={prog.id}
                      className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                        formData.programChoice === prog.id
                          ? 'bg-cyan-500/10 border-cyan-500 text-white'
                          : 'bg-black/30 border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="programChoice"
                        value={prog.id}
                        checked={formData.programChoice === prog.id}
                        onChange={() => setFormData({ ...formData, programChoice: prog.id })}
                        className="mt-0.5 text-cyan-500"
                      />
                      <div>
                        <div className="font-bold text-white text-xs">{prog.shortTitle}</div>
                        <div className="text-[11px] text-slate-300 mt-0.5">
                          {isBn ? prog.title.bn : prog.title.en}
                        </div>
                        <span className="text-[10px] text-cyan-400 font-mono mt-1 block">
                          Semester Fee: ৳{prog.semesterFee.toLocaleString()}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">
                    {isBn ? 'ক্লাস শিফট' : 'Preferred Shift'}
                  </label>
                  <select
                    value={formData.shift}
                    onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                  >
                    <option value="Day Shift (Regular)">Day Shift (Regular 08:30 AM - 02:00 PM)</option>
                    <option value="Evening / Professional Shift">Evening Shift (for Diploma/Job holders)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">
                    {isBn ? 'বৃত্তি ও কোটা বিভাগ' : 'Scholarship / Quota Category'}
                  </label>
                  <select
                    value={formData.quota}
                    onChange={(e) => setFormData({ ...formData, quota: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                  >
                    <option value="General Merit">General Merit (Standard)</option>
                    <option value="100% Scholarship Applicant">100% Tuition Fee Waiver Examination Candidate</option>
                    <option value="Diploma Holder Special Waiver">Polytechnic Diploma Holder Special Waiver</option>
                    <option value="Female Special Quota">Female Empowerment Quota</option>
                    <option value="Ethnic Minority / Tribal Quota">Ethnic Minority / Tribal Community Quota</option>
                    <option value="Physically Challenged">Physically Challenged Special Support</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>{isBn ? 'পরবর্তী ধাপ (ডকুমেন্টস)' : 'Next Step: Upload Documents'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Documents Upload Simulation */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="font-heading font-bold text-lg text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <Upload className="w-5 h-5 text-cyan-400" />
              <span>{isBn ? '৪. প্রয়োজনীয় ডকুমেন্টস আপলোড' : '4. Document Attachments'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {[
                { label: 'Applicant Passport Size Photo', note: 'Max 2MB (JPG/PNG)' },
                { label: 'SSC / Equivalent Official Marksheet', note: 'PDF or Clean Photo' },
                { label: 'HSC / Diploma Marksheet / Testimonial', note: 'PDF or Clean Photo' },
                { label: 'Birth Certificate / NID Card', note: 'Verification Document' },
              ].map((doc, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-dashed border-white/20 bg-white/[0.02] flex flex-col items-center justify-center text-center space-y-2 group hover:border-cyan-500/50 transition-colors">
                  <div className="p-2.5 rounded-full bg-cyan-500/10 text-cyan-400">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div className="font-medium text-white">{doc.label}</div>
                  <span className="text-[10px] text-slate-400">{doc.note}</span>
                  <label className="px-3 py-1 rounded bg-white/10 hover:bg-white/15 text-cyan-300 text-[11px] cursor-pointer">
                    Browse File
                    <input type="file" className="hidden" onChange={() => alert('Document attached successfully!')} />
                  </label>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>{isBn ? 'পরবর্তী ধাপ (চূড়ান্ত পর্যালোচনা)' : 'Next Step: Review & Confirm'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Review & Submit */}
        {step === 5 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="font-heading font-bold text-lg text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>{isBn ? '৫. আবেদন পর্যালোচনা ও সম্মতি' : '5. Application Review & Submission'}</span>
            </h2>

            {/* Summary card */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-slate-500 block">Applicant Name:</span>
                  <span className="font-semibold text-white uppercase">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Phone:</span>
                  <span className="font-mono text-cyan-400 font-semibold">{formData.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Email:</span>
                  <span className="text-white">{formData.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Selected Program:</span>
                  <span className="text-amber-400 font-bold uppercase">{formData.programChoice}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Class Shift:</span>
                  <span className="text-white">{formData.shift}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Quota / Scholarship:</span>
                  <span className="text-emerald-400 font-medium">{formData.quota}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">SSC Roll / GPA:</span>
                  <span className="text-white font-mono">{formData.sscRoll} · {formData.sscGpa}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">HSC Roll / GPA:</span>
                  <span className="text-white font-mono">{formData.hscRoll} · {formData.hscGpa}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Present Address:</span>
                  <span className="text-white truncate block">{formData.presentAddress}</span>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer p-3 rounded-xl bg-black/40 border border-white/10">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                className="mt-0.5 text-cyan-500"
                required
              />
              <span>
                I hereby declare that all information furnished above is true, complete, and correct to the best of my knowledge. I agree to abide by the academic rules and regulations of BGIFT Institute of Science & Technology (BIST) and National University / BTEB.
              </span>
            </label>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 text-slate-950 font-heading font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-xl shadow-cyan-900/50 hover:opacity-95"
              >
                <span>{isBn ? 'আবেদন চূড়ান্তভাবে জমা দিন' : 'Submit Official Application'}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 6: Submission Success Screen */}
        {submittedRef && (
          <div className="text-center py-6 space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest block">
                {isBn ? 'আবেদন সফলভাবে গৃহীত হয়েছে!' : 'Application Successfully Received!'}
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                Reference Tracking ID: <span className="text-cyan-400 font-mono">{submittedRef}</span>
              </h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                {isBn
                  ? 'আপনার আবেদনপত্রটি বিআইএসটি সেন্ট্রাল অ্যাডমিশন ডাটাবেজে সংরক্ষিত হয়েছে। আমাদের ভর্তি কর্মকর্তা ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবেন।'
                  : 'Your application has been logged into the BIST Admission Office system. An admission officer will review your GPA eligibility and contact you.'}
              </p>
            </div>

            {/* Application Summary Box */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Applicant:</span>
                <span className="text-white font-bold">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Contact:</span>
                <span className="text-cyan-300">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Program:</span>
                <span className="text-amber-300 uppercase">{formData.programChoice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-bold">Pending Document Verification</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Application Slip</span>
              </button>

              <a
                href={`https://wa.me/${UNIVERSITY_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hello BIST Admissions, I have submitted application ref: ${submittedRef}. Please guide me on next steps.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Notify Admission Officer via WhatsApp</span>
              </a>

              <button
                onClick={() => navigateTo('home')}
                className="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
