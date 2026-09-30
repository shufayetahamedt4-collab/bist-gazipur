import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Globe,
  Sun,
  Moon,
  Search,
  Menu,
  X,
  Phone,
  ArrowRight,
  ChevronDown,
  Layers,
  Sparkles,
  Info,
  Calendar,
  FileText,
  UserCheck,
  Building,
  Award,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UNIVERSITY_INFO, PROGRAMS } from '../../data/mockData';

export const Navbar: React.FC = () => {
  const {
    language,
    toggleLanguage,
    theme,
    toggleTheme,
    navigateTo,
    currentPage,
    setIsCommandPaletteOpen,
    setIsClientNotesOpen,
    setIsChatbotOpen,
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isBn = language === 'bn';

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* 1. TOP UTILITY BAR (Minimal Navy Blue Accent Grounding) */}
      <div className="bg-[#0b192c] text-xs text-slate-200 border-b border-emerald-900/40 py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Quick Portal Links */}
          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-0.5">
            <a
              href={UNIVERSITY_INFO.contact.erpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-medium whitespace-nowrap text-slate-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {isBn ? 'ইআরপি পোর্টাল' : 'ERP Portal'}
            </a>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <button
              onClick={() => navigateTo('facilities')}
              className="hover:text-emerald-400 transition-colors whitespace-nowrap cursor-pointer text-slate-300"
            >
              {isBn ? 'জব পোর্টাল' : 'Job Portal'}
            </button>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <button
              onClick={() => navigateTo('result')}
              className="hover:text-emerald-400 transition-colors whitespace-nowrap cursor-pointer text-slate-300"
            >
              {isBn ? 'ফলাফল অনুসন্ধান' : 'Student Result'}
            </button>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <button
              onClick={() => navigateTo('alumni')}
              className="hover:text-emerald-400 transition-colors whitespace-nowrap cursor-pointer text-slate-300"
            >
              {isBn ? 'অ্যালামনাই' : 'Alumni'}
            </button>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <button
              onClick={() => setIsClientNotesOpen(true)}
              className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium flex items-center gap-1 whitespace-nowrap"
              title="Client audit notes & confirmed data points"
            >
              <Info className="w-3.5 h-3.5" />
              <span>{isBn ? 'ক্লায়েন্ট চেকলিস্ট' : 'Client Notes'}</span>
            </button>
          </div>

          {/* Right: Hotline, Language & Theme Toggle */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Admission Hotline */}
            <a
              href={`tel:${UNIVERSITY_INFO.contact.admissionPhone}`}
              className="hidden md:flex items-center gap-1.5 text-yellow-300 hover:text-yellow-200 font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {isBn ? 'ভর্তি হটলাইন: ' : 'Admission: '}
                {UNIVERSITY_INFO.contact.admissionPhone}
              </span>
            </a>

            <span className="hidden md:inline text-slate-600" aria-hidden="true">|</span>

            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-0.5 rounded border border-emerald-500/40 text-emerald-300 hover:text-white hover:bg-emerald-800/40 transition-all font-medium cursor-pointer"
              aria-label="Toggle language"
            >
              <Globe className="w-3 h-3 text-emerald-400" />
              <span>{isBn ? 'English' : 'বাংলা'}</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1 rounded text-slate-400 hover:text-yellow-300 hover:bg-white/5 transition-all cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-yellow-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. STICKY MAIN NAVBAR (Light Theme Modern Glass) */}
      <nav
        className={`w-full transition-all duration-300 ${
          theme === 'dark'
            ? isScrolled
              ? 'bg-[#070b1a]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20 py-2.5'
              : 'bg-[#070b1a]/70 backdrop-blur-sm border-b border-white/5 py-3.5'
            : isScrolled
              ? 'bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-[0_4px_20px_-4px_rgba(5,150,105,0.08)] py-2.5'
              : 'bg-white/90 backdrop-blur-sm border-b border-emerald-100/70 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <div
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-yellow-400 p-[1.5px] shadow-md shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform ${
                theme === 'dark' ? 'bg-[#0b192c]' : 'bg-white'
              }`}>
                <img
                  src="./images/bist-logo.gif"
                  alt="BIST Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className={`font-heading font-extrabold text-lg sm:text-xl tracking-tight transition-colors ${
                  theme === 'dark' ? 'text-white group-hover:text-emerald-400' : 'text-slate-900 group-hover:text-emerald-600'
                }`}>
                  BIST
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-emerald-800 border border-emerald-200 px-1.5 py-0.2 rounded bg-emerald-50">
                  Gazipur
                </span>
              </div>
              <span className={`text-[11px] tracking-tight line-clamp-1 max-w-[200px] sm:max-w-[340px] ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {isBn
                  ? 'বিজিআইএফটি ইনস্টিটিউট অব সায়েন্স অ্যান্ড টেকনোলজি'
                  : 'BGIFT Institute of Science & Technology'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links / Mega Menu */}
          <div className={`hidden lg:flex items-center gap-1 text-[13.5px] font-medium ${
            theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
          }`}>
            {/* Home */}
            <button
              onClick={() => navigateTo('home')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentPage === 'home'
                  ? theme === 'dark' ? 'text-emerald-400 bg-emerald-950/40' : 'text-emerald-700 bg-emerald-50 font-bold'
                  : theme === 'dark' ? 'hover:text-emerald-300 hover:bg-white/5' : 'hover:text-emerald-700 hover:bg-emerald-50/80'
              }`}
            >
              {isBn ? 'হোম' : 'Home'}
            </button>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => navigateTo('about')}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  theme === 'dark' ? 'hover:text-emerald-300 hover:bg-white/5' : 'hover:text-emerald-700 hover:bg-emerald-50/80'
                }`}
              >
                <span>{isBn ? 'পরিচিতি' : 'About'}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 w-64 pt-2 animate-fadeIn z-50">
                  <div className={`p-2 rounded-xl shadow-2xl space-y-1 ${
                    theme === 'dark' ? 'glass-panel bg-slate-900/90' : 'glass-panel bg-white/95 border-emerald-100 text-slate-700'
                  }`}>
                    <button
                      onClick={() => {
                        navigateTo('about');
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center gap-2"
                    >
                      <Building className="w-4 h-4 text-emerald-600" />
                      <span>{isBn ? 'বিআইএসটি একনজরে' : 'BIST at a Glance'}</span>
                    </button>
                    <button
                      onClick={() => {
                        navigateTo('about');
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center gap-2"
                    >
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>{isBn ? 'লক্ষ্য ও উদ্দেশ্য' : 'Mission, Vision & Strategy'}</span>
                    </button>
                    <button
                      onClick={() => {
                        navigateTo('about');
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center gap-2"
                    >
                      <UserCheck className="w-4 h-4 text-emerald-600" />
                      <span>{isBn ? 'গভর্নিং বডি ও ট্রাস্টি' : 'Governing Bodies'}</span>
                    </button>
                    <button
                      onClick={() => {
                        navigateTo('faculty');
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center gap-2"
                    >
                      <GraduationCap className="w-4 h-4 text-emerald-600" />
                      <span>{isBn ? 'শিক্ষকমণ্ডলী' : 'Faculty Members'}</span>
                    </button>
                    <button
                      onClick={() => {
                        navigateTo('officers');
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center gap-2"
                    >
                      <Building className="w-4 h-4 text-amber-500" />
                      <span>{isBn ? 'কর্মকর্তা ও প্রশাসন' : 'Administrative Officers'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Programs Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('programs')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => navigateTo('programs')}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  theme === 'dark' ? 'hover:text-emerald-300 hover:bg-white/5' : 'hover:text-emerald-700 hover:bg-emerald-50/80'
                }`}
              >
                <span>{isBn ? 'প্রোগ্রামসমূহ' : 'Programs'}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {activeDropdown === 'programs' && (
                <div className="absolute top-full left-0 w-80 pt-2 animate-fadeIn z-50">
                  <div className={`p-3 rounded-xl shadow-2xl space-y-2 ${
                    theme === 'dark' ? 'glass-panel bg-slate-900/90' : 'glass-panel bg-white/95 border-emerald-100 text-slate-700'
                  }`}>
                    <div className="text-[11px] font-semibold tracking-wider text-emerald-600 uppercase px-2">
                      {isBn ? 'স্নাতক (অনার্স) কোর্সসমূহ' : 'Undergraduate (Honours)'}
                    </div>
                    {PROGRAMS.map((prog) => (
                      <button
                        key={prog.id}
                        onClick={() => {
                          navigateTo('department-detail', prog.id);
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left px-2 py-1.5 rounded-lg text-xs hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-bold text-emerald-600 w-10">
                            {prog.shortTitle}
                          </span>
                          <span className="line-clamp-1">
                            {isBn ? prog.title.bn : prog.title.en}
                          </span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all" />
                      </button>
                    ))}

                    <div className="pt-2 border-t border-emerald-100">
                      <button
                        onClick={() => {
                          navigateTo('programs');
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left px-2 py-1 rounded text-xs text-amber-600 hover:text-amber-700 font-semibold flex items-center justify-between"
                      >
                        <span>{isBn ? 'ডিপ্লোমা ও বৃত্তিমূলক প্রোগ্রাম' : 'Diploma, HSC & SSC Programs'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Admissions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('admissions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => navigateTo('admissions')}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  theme === 'dark' ? 'hover:text-emerald-300 hover:bg-white/5' : 'hover:text-emerald-700 hover:bg-emerald-50/80'
                }`}
              >
                <span>{isBn ? 'ভর্তি তথ্য' : 'Admissions'}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {activeDropdown === 'admissions' && (
                <div className="absolute top-full left-0 w-64 pt-2 animate-fadeIn z-50">
                  <div className={`p-2 rounded-xl shadow-2xl space-y-1 ${
                    theme === 'dark' ? 'glass-panel bg-slate-900/90' : 'glass-panel bg-white/95 border-emerald-100 text-slate-700'
                  }`}>
                    <button
                      onClick={() => {
                        navigateTo('admissions');
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span>{isBn ? 'ভর্তি প্রক্রিয়া ও নির্দেশিকা' : 'Process & Guidelines'}</span>
                    </button>
                    <button
                      onClick={() => {
                        navigateTo('scholarships');
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center gap-2"
                    >
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>{isBn ? 'স্কলারশিপ ও ওয়েভার' : 'Scholarships & Waiver'}</span>
                    </button>
                    <button
                      onClick={() => {
                        navigateTo('calculator');
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>{isBn ? 'ফি ক্যালকুলেটর' : 'Fee Calculator'}</span>
                    </button>
                    <button
                      onClick={() => {
                        navigateTo('fees');
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center gap-2"
                    >
                      <Layers className="w-4 h-4 text-emerald-600" />
                      <span>{isBn ? 'টিউশন ফি তালিকা' : 'Tuition Fee Structure'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notices */}
            <button
              onClick={() => navigateTo('notices')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentPage === 'notices'
                  ? theme === 'dark' ? 'text-emerald-400 bg-emerald-950/40' : 'text-emerald-700 bg-emerald-50 font-bold'
                  : theme === 'dark' ? 'hover:text-emerald-300 hover:bg-white/5' : 'hover:text-emerald-700 hover:bg-emerald-50/80'
              }`}
            >
              {isBn ? 'নোটিশ বোর্ড' : 'Notices'}
            </button>

            {/* Projects & SEIP */}
            <button
              onClick={() => navigateTo('projects')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentPage === 'projects'
                  ? theme === 'dark' ? 'text-emerald-400 bg-emerald-950/40' : 'text-emerald-700 bg-emerald-50 font-bold'
                  : theme === 'dark' ? 'hover:text-emerald-300 hover:bg-white/5' : 'hover:text-emerald-700 hover:bg-emerald-50/80'
              }`}
            >
              {isBn ? 'প্রকল্প (SEIP/NSDA)' : 'Projects'}
            </button>

            {/* Contact */}
            <button
              onClick={() => navigateTo('contact')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentPage === 'contact'
                  ? theme === 'dark' ? 'text-emerald-400 bg-emerald-950/40' : 'text-emerald-700 bg-emerald-50 font-bold'
                  : theme === 'dark' ? 'hover:text-emerald-300 hover:bg-white/5' : 'hover:text-emerald-700 hover:bg-emerald-50/80'
              }`}
            >
              {isBn ? 'যোগাযোগ' : 'Contact'}
            </button>
          </div>

          {/* Right Actions: Command Search, Apply Now Button, Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Command Palette Trigger (Cmd+K) */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs cursor-pointer transition-all ${
                theme === 'dark'
                  ? 'border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-emerald-500/50'
                  : 'border-emerald-200 bg-emerald-50/70 text-slate-700 hover:text-slate-900 hover:border-emerald-400'
              }`}
              title="Global search (Ctrl+K or Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden xl:inline">Search</span>
              <kbd className="hidden xl:inline-block px-1.5 py-0.5 rounded bg-black/10 text-[10px] font-mono border border-black/10">
                ⌘K
              </kbd>
            </button>

            {/* Apply Now Glowing CTA (Green + Light Yellow High-Tech Aesthetic) */}
            <button
              onClick={() => navigateTo('apply-online')}
              className="relative group overflow-hidden px-4 sm:px-5 py-2 rounded-lg font-semibold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-emerald-500 via-emerald-400 to-yellow-400 hover:from-emerald-600 hover:to-yellow-500 shadow-md shadow-emerald-500/25 hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5 font-heading"
            >
              <span className="relative z-10 font-bold tracking-wide">
                {isBn ? 'ভর্তি আবেদন' : 'Apply Now'}
              </span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg border transition-colors ${
                theme === 'dark'
                  ? 'border-white/10 bg-white/5 text-slate-200 hover:text-white'
                  : 'border-emerald-200 bg-emerald-50 text-slate-700 hover:text-slate-950'
              }`}
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* 3. ADMISSION ALERT TICKER BANNER (Light Green & Solar Yellow) */}
      <div className={`border-b py-1.5 px-4 backdrop-blur-md text-xs ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-emerald-950/80 via-slate-950/90 to-emerald-950/80 border-emerald-900/50 text-slate-200'
          : 'bg-gradient-to-r from-emerald-50 via-yellow-50/70 to-emerald-50 border-emerald-200/60 text-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-600 text-white font-bold uppercase tracking-wider text-[10px] shadow-sm shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-ping"></span>
              {isBn ? 'ভর্তি বিজ্ঞপ্তি' : 'ADMISSION ALERT'}
            </span>
            <span className="truncate font-medium">
              {isBn
                ? 'জাতীয় বিশ্ববিদ্যালয় অধিবেশন ২০২৫-২৬: বি.এসসি ইঞ্জিনিয়ারিং (সিএসই, টিএসটি, এএমটি, এফডিটি) ও বিবিএ কোর্সে ১০০% পর্যন্ত স্কলারশিপে ভর্তি চলছে!'
                : 'Admissions Open 2025-26: B.Sc. in CSE, TST, AMT, FDT & BBA (Honours) — 100% Scholarships available for 100 students!'}
            </span>
          </div>
          <button
            onClick={() => navigateTo('apply-online')}
            className="hidden sm:inline-flex text-emerald-700 hover:text-emerald-800 font-bold items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>{isBn ? 'আবেদন করুন' : 'Apply Today'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4. MOBILE FULL-SCREEN / SLIDE-DOWN NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className={`lg:hidden fixed inset-x-0 top-[108px] bottom-0 backdrop-blur-2xl z-40 p-6 overflow-y-auto border-t ${
          theme === 'dark' ? 'bg-[#070b1a]/95 border-white/10 text-slate-200' : 'bg-white/95 border-emerald-100 text-slate-800'
        }`}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2 pb-4 border-b border-emerald-100">
              <button
                onClick={() => {
                  navigateTo('apply-online');
                  setMobileMenuOpen(false);
                }}
                className="py-3 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-yellow-400 text-slate-950 font-bold text-center text-sm shadow-md"
              >
                {isBn ? 'ভর্তি আবেদন' : 'Apply Online'}
              </button>
              <button
                onClick={() => {
                  navigateTo('result');
                  setMobileMenuOpen(false);
                }}
                className="py-3 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-semibold text-center text-sm"
              >
                {isBn ? 'ফলাফল অনুসন্ধান' : 'Check Result'}
              </button>
            </div>

            <div className="space-y-1">
              {[
                { label: isBn ? 'হোম' : 'Home', page: 'home' },
                { label: isBn ? 'পরিচিতি ও ইতিহাস' : 'About BIST', page: 'about' },
                { label: isBn ? 'সকল প্রোগ্রামসমূহ' : 'Academic Programs', page: 'programs' },
                { label: isBn ? 'ভর্তি নির্দেশিকা' : 'Admission Guidelines', page: 'admissions' },
                { label: isBn ? 'স্কলারশিপ ও ফি ক্যালকুলেটর' : 'Scholarships & Calculator', page: 'calculator' },
                { label: isBn ? 'নোটিশ বোর্ড' : 'Notice Board', page: 'notices' },
                { label: isBn ? 'শিক্ষকমণ্ডলী' : 'Faculty Directory', page: 'faculty' },
                { label: isBn ? 'কর্মকর্তাবৃন্দ' : 'Administrative Officers', page: 'officers' },
                { label: isBn ? 'ক্যাম্পাস গ্যালারি' : 'Photo Gallery', page: 'gallery' },
                { label: isBn ? 'প্রকল্প (SEIP / NSDA)' : 'Government Projects', page: 'projects' },
                { label: isBn ? 'ক্যাম্পাস সুযোগ-সুবিধা' : 'Campus Facilities', page: 'facilities' },
                { label: isBn ? 'ইভেন্টস ও সেমিনার' : 'Events & Seminars', page: 'events' },
                { label: isBn ? 'সংবাদ ও মিডিয়া' : 'Latest News', page: 'news' },
                { label: isBn ? 'সাধারণ জিজ্ঞাসা (FAQ)' : 'Frequently Asked Questions', page: 'faq' },
                { label: isBn ? 'যোগাযোগ ও অবস্থান' : 'Contact & Location', page: 'contact' },
              ].map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    navigateTo(item.page as any);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-3 px-3 rounded-lg hover:bg-emerald-50 hover:text-emerald-800 transition-colors font-medium flex items-center justify-between min-h-[44px]"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-emerald-100 space-y-2">
              <a
                href={`tel:${UNIVERSITY_INFO.contact.admissionPhone}`}
                className="w-full py-3 px-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call Hotline: {UNIVERSITY_INFO.contact.admissionPhone}</span>
              </a>
              <button
                onClick={() => {
                  setIsChatbotOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 px-3 rounded-xl bg-yellow-50 border border-yellow-300 text-yellow-900 font-bold flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{isBn ? 'এআই ভর্তি সহকারী' : 'AI Admission Chatbot'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
