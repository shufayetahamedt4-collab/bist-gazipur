import React, { useState } from 'react';
import { Briefcase, Phone, Mail, Building, Clock, MapPin, ShieldCheck, CheckCircle2, Headphones } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ADMINISTRATIVE_OFFICERS, UNIVERSITY_INFO } from '../../data/mockData';
import { AdministrativeOfficer } from '../../types';

export const OfficersSection: React.FC = () => {
  const { language, navigateTo, theme } = useApp();
  const isBn = language === 'bn';

  const [activeOfficerModal, setActiveOfficerModal] = useState<AdministrativeOfficer | null>(null);

  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold ${
              theme === 'dark'
                ? 'bg-yellow-950/80 text-yellow-300 border border-yellow-500/40'
                : 'bg-yellow-50 text-yellow-900 border border-yellow-400 shadow-sm'
            }`}
          >
            <Briefcase className="w-4 h-4 text-amber-500" />
            <span>
              {isBn ? 'প্রশাসনিক নেতৃত্ব ও সেবা' : 'Administration & Student Services'}
            </span>
          </div>

          <h2
            className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
            }`}
          >
            {isBn ? (
              <>
                বিআইএসটি{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500">
                  প্রশাসনিক কর্মকর্তা ও স্টাফবৃন্দ
                </span>
              </>
            ) : (
              <>
                BIST{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500">
                  Administrative Officers & Staff
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
              ? 'শিক্ষার্থীদের ভর্তি, সেমিস্টার পরীক্ষা, রেজিস্ট্রেশন, ফি পরিশোধ, আইটি সাপোর্ট এবং সার্বিক প্রাতিষ্ঠানিক সমন্বয়ে নিবেদিত অভিজ্ঞ কর্মকর্তাবৃন্দ।'
              : 'Our dedicated leadership and administrative heads facilitating admissions, university examinations, student records, accounts, library access, and campus operations.'}
          </p>
        </div>

        {/* Quick Office Schedule Pill */}
        <div
          className={`shrink-0 p-4 rounded-2xl border text-xs space-y-1.5 backdrop-blur-md ${
            theme === 'dark'
              ? 'bg-slate-900/90 border-white/10 text-slate-300'
              : 'bg-white border-slate-200 text-slate-700 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
            <Clock className="w-4 h-4" />
            <span>{isBn ? 'অফিস সময়সূচি:' : 'Official Office Hours:'}</span>
          </div>
          <p className="font-medium">
            {isBn ? 'শনিবার – বৃহস্পতিবার: সকাল ৯:০০ – বিকাল ৫:০০' : 'Saturday – Thursday: 9:00 AM – 5:00 PM'}
          </p>
          <div className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1 font-semibold">
            <Headphones className="w-3.5 h-3.5" />
            <span>{isBn ? 'ভর্তি হটলাইন: ০১9১৩-৫৫৫১১১' : 'Admission Desk: 01913-555111'}</span>
          </div>
        </div>
      </div>

      {/* Officers Bento Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ADMINISTRATIVE_OFFICERS.map((officer) => (
          <div
            key={officer.id}
            className={`group rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between border relative overflow-hidden ${
              theme === 'dark'
                ? 'bg-slate-900/90 border-white/10 hover:border-yellow-500/50 hover:shadow-[0_10px_30px_rgba(250,204,21,0.12)]'
                : 'bg-white border-slate-200/90 hover:border-yellow-400 hover:shadow-[0_12px_32px_rgba(234,179,8,0.12)]'
            }`}
          >
            {/* Ambient gold/emerald corner glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none group-hover:bg-yellow-400/20 transition-colors" />

            <div className="space-y-4">
              {/* Photo & Room Pill */}
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
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600/90 text-white backdrop-blur-md flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{isBn ? 'কর্মকর্তা' : 'Officer'}</span>
                </div>
              </div>

              {/* Officer Details */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 block line-clamp-1">
                  {isBn ? officer.office.bn : officer.office.en}
                </span>
                <h3
                  className={`font-heading font-extrabold text-base transition-colors line-clamp-1 ${
                    theme === 'dark'
                      ? 'text-white group-hover:text-yellow-300'
                      : 'text-[#0b192c] group-hover:text-yellow-800'
                  }`}
                >
                  {isBn ? officer.name.bn : officer.name.en}
                </h3>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 line-clamp-1">
                  {isBn ? officer.designation.bn : officer.designation.en}
                </p>
                <p
                  className={`text-[11px] line-clamp-2 leading-relaxed pt-1 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {officer.qualifications}
                </p>
              </div>

              {/* Core Responsibility box */}
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

            {/* Bottom Actions */}
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
                onClick={() => setActiveOfficerModal(officer)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-800 hover:bg-slate-700 text-yellow-300'
                    : 'bg-slate-100 hover:bg-yellow-50 text-yellow-900'
                }`}
              >
                {isBn ? 'বিস্তারিত সেবা →' : 'Services →'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Officer Detail Modal */}
      {activeOfficerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div
            className={`max-w-lg w-full rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative border ${
              theme === 'dark' ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <button
              onClick={() => setActiveOfficerModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-start gap-4">
              <img
                src={activeOfficerModal.image}
                alt={activeOfficerModal.name.en}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-yellow-400"
              />
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-300">
                  {isBn ? activeOfficerModal.office.bn : activeOfficerModal.office.en}
                </span>
                <h3
                  className={`font-heading font-extrabold text-lg ${
                    theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
                  }`}
                >
                  {isBn ? activeOfficerModal.name.bn : activeOfficerModal.name.en}
                </h3>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {isBn ? activeOfficerModal.designation.bn : activeOfficerModal.designation.en}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-white/5 space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">
                  {isBn ? 'কার্যপরিধি ও সেবা প্রদান:' : 'Scope of Responsibility & Services:'}
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {activeOfficerModal.responsibilities
                    ? isBn
                      ? activeOfficerModal.responsibilities.bn
                      : activeOfficerModal.responsibilities.en
                    : isBn
                    ? activeOfficerModal.office.bn
                    : activeOfficerModal.office.en}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-white/5 space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">
                  {isBn ? 'শিক্ষাগত ও পেশাগত প্রোফাইল:' : 'Academic & Professional Profile:'}
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  {activeOfficerModal.qualifications}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`mailto:${activeOfficerModal.email}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>ইমেইল পাঠান</span>
                </a>
                <a
                  href={`tel:${activeOfficerModal.phone || UNIVERSITY_INFO.contact.officePhone}`}
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
    </section>
  );
};
