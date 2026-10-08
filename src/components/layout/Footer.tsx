import React from 'react';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  ShieldCheck,
  Award,
  ChevronRight,
  Heart,
  Facebook,
  Youtube,
  Linkedin,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UNIVERSITY_INFO, PROGRAMS } from '../../data/mockData';

export const Footer: React.FC = () => {
  const { language, navigateTo } = useApp();
  const isBn = language === 'bn';

  return (
    <footer className="relative bg-[#0b192c] text-slate-300 border-t border-emerald-900/40 pt-16 pb-12 overflow-hidden">
      {/* Decorative subtle green and yellow radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Accreditation Badges Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-12 border-b border-emerald-900/50">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-emerald-500/20">
            <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">
                {isBn ? 'জাতীয় বিশ্ববিদ্যালয় অধিভুক্ত' : 'Affiliated with National University'}
              </div>
              <div className="text-sm font-semibold text-white tracking-wide">
                College Code: <span className="text-emerald-400 font-mono">5526</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-emerald-500/20">
            <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">
                {isBn ? 'বাংলাদেশ কারিগরি শিক্ষা বোর্ড' : 'Technical Education Board (BTEB)'}
              </div>
              <div className="text-sm font-semibold text-white tracking-wide">
                Institute Code: <span className="text-emerald-400 font-mono">53098</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-yellow-500/20">
            <div className="p-2.5 rounded-lg bg-yellow-500/20 text-yellow-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">
                {isBn ? 'জাতীয় দক্ষতা উন্নয়ন কর্তৃপক্ষ' : 'National Skills Development Authority'}
              </div>
              <div className="text-sm font-semibold text-white tracking-wide">
                NSDA Code: <span className="text-yellow-400 font-mono">STP-GAZ-000020</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* Col 1: University Identity & Intro */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-yellow-400 p-[1.5px] shadow-lg shadow-emerald-950/40">
                <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src="./images/bist-logo.gif"
                    alt="BIST Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                  BIST <span className="text-emerald-400">Gazipur</span>
                </span>
                <p className="text-xs text-slate-400 font-medium">
                  BGIFT Institute of Science & Technology
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              {isBn
                ? '২০০৮ সালে প্রতিষ্ঠিত বিআইএসটি টেক্সটাইল ইঞ্জিনিয়ারিং, কম্পিউটার বিজ্ঞান, ফ্যাশন ডিজাইন ও ব্যবসায় প্রশাসনে উচ্চমানের শিক্ষা ও ব্যবহারিক গবেষণায় অগ্রণী ভূমিকা পালন করছে।'
                : 'Affiliated with the National University and BTEB, BIST was set up in 2008 and delivers industry-ready education in textiles, apparel, computer science, fashion design and business administration.'}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={UNIVERSITY_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 flex items-center justify-center transition-all border border-white/5 hover:border-emerald-500/30"
                aria-label="BIST Facebook page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={UNIVERSITY_INFO.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 flex items-center justify-center transition-all border border-white/5 hover:border-red-500/30"
                aria-label="BIST YouTube channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={UNIVERSITY_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 flex items-center justify-center transition-all border border-white/5 hover:border-emerald-500/30"
                aria-label="BIST LinkedIn page"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Academic Programs */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {isBn ? 'স্নাতক প্রোগ্রামসমূহ' : 'Honours Programs'}
            </div>
            <ul className="space-y-2 text-xs">
              {PROGRAMS.map((prog) => (
                <li key={prog.id}>
                  <button
                    onClick={() => navigateTo('department-detail', prog.id)}
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-left text-slate-300"
                  >
                    <ChevronRight className="w-3 h-3 text-emerald-500/70" />
                    <span>{prog.shortTitle} - {isBn ? prog.title.bn : prog.title.en}</span>
                  </button>
                </li>
              ))}
              <li className="pt-1">
                <button
                  onClick={() => navigateTo('programs')}
                  className="text-yellow-400 hover:text-yellow-300 font-medium flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3" />
                  <span>{isBn ? 'ডিপ্লোমা ইন ইঞ্জিনিয়ারিং (BTEB)' : 'Diploma in Engineering'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {isBn ? 'প্রয়োজনীয় লিংক' : 'Quick Navigation'}
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-emerald-400 transition-colors text-slate-300">
                  {isBn ? 'প্রতিষ্ঠান পরিচিতি' : 'About BIST'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admissions')} className="hover:text-emerald-400 transition-colors text-slate-300">
                  {isBn ? 'ভর্তি প্রক্রিয়া ও যোগ্যতা' : 'Admission Guidelines'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('honours-programs')} className="hover:text-emerald-400 transition-colors text-slate-300">
                  {isBn ? 'অনার্স (গ্র্যাজুয়েট) প্রোগ্রাম' : 'Honours (Graduate) Programs'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faculty')} className="hover:text-emerald-400 transition-colors text-slate-300">
                  {isBn ? 'শিক্ষকমণ্ডলীর তালিকা' : 'Faculty Directory'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('officers')} className="hover:text-emerald-400 transition-colors text-slate-300">
                  {isBn ? 'প্রশাসনিক কর্মকর্তা ও স্টাফ' : 'Administrative Officers'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('notices')} className="hover:text-emerald-400 transition-colors text-slate-300">
                  {isBn ? 'নোটিশ ও ফলাফল' : 'Notices & Circulars'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('facilities')} className="hover:text-emerald-400 transition-colors text-slate-300">
                  {isBn ? 'ল্যাবরেটরি ও সুযোগ-সুবিধা' : 'Labs & Facilities'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-emerald-400 transition-colors text-slate-400">
                  {isBn ? 'প্রশাসনিক প্যানেল' : 'Admin Management'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {isBn ? 'যোগাযোগ ও ঠিকানা' : 'Campus Location'}
            </div>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {isBn ? UNIVERSITY_INFO.contact.address.bn : UNIVERSITY_INFO.contact.address.en}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-slate-400">Admission: </span>
                  <a href={`tel:${UNIVERSITY_INFO.contact.admissionPhone}`} className="text-white hover:text-emerald-400 font-medium">
                    {UNIVERSITY_INFO.contact.admissionPhone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <div>
                  <span className="text-slate-400">Office: </span>
                  <a href={`tel:${UNIVERSITY_INFO.contact.officePhone}`} className="text-white hover:text-yellow-400 font-medium">
                    {UNIVERSITY_INFO.contact.officePhone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`mailto:${UNIVERSITY_INFO.contact.email}`} className="text-white hover:text-emerald-400">
                  {UNIVERSITY_INFO.contact.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
                <span>{isBn ? UNIVERSITY_INFO.contact.officeHours.bn : UNIVERSITY_INFO.contact.officeHours.en}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Useful External Portals Bar */}
        <div className="py-6 border-t border-emerald-900/40 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-slate-300">
            <span className="font-semibold text-slate-400">{isBn ? 'গুরুত্বপূর্ণ পোর্টাল:' : 'Portals:'}</span>
            <a
              href="https://www.nu.ac.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
            >
              <span>National University (NU)</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
            <a
              href="http://www.bteb.gov.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
            >
              <span>BTEB</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
            <a
              href="https://nsda.gov.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
            >
              <span>NSDA</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
            <a
              href={UNIVERSITY_INFO.contact.diplomaSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
            >
              <span>{isBn ? 'ডিপ্লোমা সাইট' : 'Diploma Site'}</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
            <a
              href={UNIVERSITY_INFO.contact.erpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
            >
              <span>ERP Portal</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => navigateTo('privacy')} className="hover:text-emerald-400 transition-colors">
              {isBn ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
            </button>
            <button onClick={() => navigateTo('terms')} className="hover:text-emerald-400 transition-colors">
              {isBn ? 'শর্তাবলী' : 'Terms of Use'}
            </button>
            <button onClick={() => navigateTo('faq')} className="hover:text-emerald-400 transition-colors">
              {isBn ? 'সাধারণ জিজ্ঞাসা' : 'FAQ'}
            </button>
            <button onClick={() => navigateTo('contact')} className="hover:text-emerald-400 transition-colors">
              {isBn ? 'যোগাযোগ' : 'Contact'}
            </button>
          </div>
        </div>

        {/* Embedded Responsive Interactive Map & Copyright */}
        <div className="pt-6 border-t border-emerald-900/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>
              © {new Date().getFullYear()} BGIFT Institute of Science & Technology (BIST). All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <span>Affiliated with National University & BTEB · Gazipur, Bangladesh</span>
            <a
              href={UNIVERSITY_INFO.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-emerald-400 underline decoration-dotted ml-1"
            >
              bist.edu.bd
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
