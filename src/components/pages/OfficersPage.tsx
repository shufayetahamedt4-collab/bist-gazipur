import React, { useState } from 'react';
import { Briefcase, Phone, Mail, Building, Clock, MapPin, ShieldCheck, Search, Headphones, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useDismiss } from '../../hooks/useDismiss';
import { ADMINISTRATIVE_OFFICERS, UNIVERSITY_INFO } from '../../data/mockData';
import { AdministrativeOfficer } from '../../types';

export const OfficersPage: React.FC = () => {
  const { language, theme, navigateTo } = useApp();
  const isBn = language === 'bn';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOfficer, setSelectedOfficer] = useState<AdministrativeOfficer | null>(null);
  const { backdropProps } = useDismiss(Boolean(selectedOfficer), () => setSelectedOfficer(null));

  const sortedOfficers = [...ADMINISTRATIVE_OFFICERS].sort((a, b) => a.order - b.order);

  const filteredOfficers = sortedOfficers.filter((officer) => {
    const q = searchQuery.toLowerCase();
    const nameMatch = officer.name.en.toLowerCase().includes(q) || officer.name.bn.toLowerCase().includes(q);
    const officeMatch = officer.office.en.toLowerCase().includes(q) || officer.office.bn.toLowerCase().includes(q);
    const desigMatch = officer.designation.en.toLowerCase().includes(q) || officer.designation.bn.toLowerCase().includes(q);
    return nameMatch || officeMatch || desigMatch;
  });

  return (
    <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      {/* Page Title Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold ${
            theme === 'dark'
              ? 'bg-yellow-950/80 text-yellow-300 border border-yellow-500/40'
              : 'bg-yellow-50 text-yellow-900 border border-yellow-400 shadow-sm'
          }`}
        >
          <Briefcase className="w-4 h-4 text-amber-500" />
          <span>{isBn ? 'প্রশাসনিক নেতৃত্ব ও কর্মকর্তা পরিষদ' : 'Administrative Leadership & Executive Staff'}</span>
        </div>

        <h1
          className={`font-heading text-3xl sm:text-5xl font-black tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
          }`}
        >
          {isBn ? 'কর্মকর্তা ও প্রশাসনিক ব্যক্তিবর্গ' : 'Administrative Officers Directory'}
        </h1>

        <p className={`text-sm sm:text-base leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
          {isBn
            ? 'শিক্ষার্থীদের ভর্তি, একাডেমিক রেকর্ড, পরীক্ষা নিয়ন্ত্রণ, হিসাব, লাইব্রেরি ও ক্যাম্পাস সেবা প্রদানে নিয়োজিত কর্মকর্তাগণ।'
            : 'Key administrative officers, registrar desk, examination wing, accounts, library and IT heads committed to academic integrity.'}
        </p>

        {/* Search Bar */}
        <div className="pt-4 max-w-md mx-auto relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBn ? 'কর্মকর্তার নাম, পদবি বা শাখা খুঁজুন...' : 'Search by officer name, title or office...'}
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-all outline-none ${
              theme === 'dark'
                ? 'bg-slate-900/90 border-white/10 text-white placeholder-slate-500 focus:border-yellow-400'
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-yellow-500 shadow-sm'
            }`}
          />
        </div>
      </div>

      {/* Office Timings Banner */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
          theme === 'dark'
            ? 'bg-slate-900/80 border-white/10 text-slate-300'
            : 'bg-emerald-50/70 border-emerald-200 text-slate-800'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm">
              {isBn ? 'অফিস খোলা থাকার সময়সূচি' : 'Official Office & Counseling Hours'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isBn ? 'শনিবার হতে বৃহস্পতিবার: সকাল ৯:০০ টা হতে বিকাল ৫:০০ টা পর্যন্ত' : 'Saturday to Thursday: 9:00 AM to 5:00 PM (Weekly Holiday: Friday)'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold">
          <a
            href="tel:01913555111"
            className="px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-slate-950 flex items-center gap-1.5 transition-colors"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>{isBn ? 'ভর্তি হটলাইন: ০১9১৩-৫৫৫১১১' : 'Hotline: 01913-555111'}</span>
          </a>
        </div>
      </div>

      {/* Officers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredOfficers.map((officer) => (
          <div
            key={officer.id}
            className={`group rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between border relative overflow-hidden ${
              theme === 'dark'
                ? 'bg-slate-900/90 border-white/10 hover:border-yellow-500/50 hover:shadow-[0_10px_30px_rgba(250,204,21,0.12)]'
                : 'bg-white border-slate-200/90 hover:border-yellow-400 hover:shadow-[0_12px_32px_rgba(234,179,8,0.12)]'
            }`}
          >
            <div className="space-y-4">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={officer.image}
                  alt={officer.name.en}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {officer.roomNo && (
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold shadow-md bg-slate-950/80 text-yellow-300 border border-yellow-500/40 backdrop-blur-md">
                    {officer.roomNo}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 block line-clamp-1">
                  {isBn ? officer.office.bn : officer.office.en}
                </span>
                <h3
                  className={`font-heading font-extrabold text-base line-clamp-1 ${
                    theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
                  }`}
                >
                  {isBn ? officer.name.bn : officer.name.en}
                </h3>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 line-clamp-1">
                  {isBn ? officer.designation.bn : officer.designation.en}
                </p>
                <p className={`text-[11px] line-clamp-2 pt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {officer.qualifications}
                </p>
              </div>

              <div
                className={`text-[11px] p-2.5 rounded-lg border leading-tight ${
                  theme === 'dark'
                    ? 'bg-slate-950/60 border-white/5 text-slate-300'
                    : 'bg-yellow-50/60 border-yellow-100 text-slate-700'
                }`}
              >
                <span className="font-bold text-amber-700 dark:text-amber-400 block text-[10px] uppercase tracking-wider mb-0.5">
                  {isBn ? 'প্রধান দায়িত্ব' : 'Primary Scope'}
                </span>
                <span className="line-clamp-2">
                  {officer.responsibilities
                    ? isBn
                      ? officer.responsibilities.bn
                      : officer.responsibilities.en
                    : isBn
                    ? officer.office.bn
                    : officer.office.en}
                </span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <a
                  href={`mailto:${officer.email}`}
                  className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:scale-110 transition-transform"
                  title={officer.email}
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`tel:${officer.phone || UNIVERSITY_INFO.contact.officePhone}`}
                  className="p-1.5 rounded-lg bg-yellow-100 dark:bg-yellow-950/60 text-yellow-800 dark:text-yellow-300 hover:scale-110 transition-transform"
                  title={officer.phone || UNIVERSITY_INFO.contact.officePhone}
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>

              <button
                onClick={() => setSelectedOfficer(officer)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-800 hover:bg-slate-700 text-yellow-300'
                    : 'bg-slate-100 hover:bg-yellow-50 text-yellow-900'
                }`}
              >
                {isBn ? 'বিস্তারিত সেবা →' : 'Details →'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal View */}
      {selectedOfficer && (
        <div
          {...backdropProps}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
        >
          <div
            className={`max-w-lg w-full rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative border ${
              theme === 'dark' ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <button
              onClick={() => setSelectedOfficer(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-start gap-4">
              <img
                src={selectedOfficer.image}
                alt={selectedOfficer.name.en}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-yellow-400"
              />
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-300">
                  {isBn ? selectedOfficer.office.bn : selectedOfficer.office.en}
                </span>
                <h3
                  className={`font-heading font-extrabold text-lg ${
                    theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
                  }`}
                >
                  {isBn ? selectedOfficer.name.bn : selectedOfficer.name.en}
                </h3>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {isBn ? selectedOfficer.designation.bn : selectedOfficer.designation.en}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-white/5 space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">
                  {isBn ? 'কার্যপরিধি ও সেবা প্রদান:' : 'Scope of Responsibility & Services:'}
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {selectedOfficer.responsibilities
                    ? isBn
                      ? selectedOfficer.responsibilities.bn
                      : selectedOfficer.responsibilities.en
                    : isBn
                    ? selectedOfficer.office.bn
                    : selectedOfficer.office.en}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-white/5 space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">
                  {isBn ? 'শিক্ষাগত ও পেশাগত প্রোফাইল:' : 'Academic & Professional Profile:'}
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  {selectedOfficer.qualifications}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`mailto:${selectedOfficer.email}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>ইমেইল পাঠান</span>
                </a>
                <a
                  href={`tel:${selectedOfficer.phone || UNIVERSITY_INFO.contact.officePhone}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-slate-950 font-bold text-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>সরাসরি কল</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
