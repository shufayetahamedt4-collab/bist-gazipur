import React from 'react';
import { Building2, Award, Target, Compass, Users, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  UNIVERSITY_INFO,
  INSTITUTION_OVERVIEW,
  QUALITY_POLICY,
  INSTITUTION_GOALS,
  LINKAGES,
  DIPLOMA_SUBJECTS,
} from '../../data/mockData';

export const AboutPage: React.FC = () => {
  const { language, navigateTo } = useApp();
  const isBn = language === 'bn';

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-16">
      {/* Hero / Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
          <Building2 className="w-3.5 h-3.5" />
          <span>{isBn ? 'প্রতিষ্ঠান পরিচিতি ও ইতিহাস' : 'About BIST Gazipur'}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {isBn
            ? 'কারিগরী ও উচ্চশিক্ষায় দেশের অগ্রগামী প্রতিষ্ঠান'
            : 'Pioneering Higher Technical Education in Bangladesh'}
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed font-light">
          {isBn
            ? 'বিজিআইএফটি ইনস্টিটিউট অব সায়েন্স অ্যান্ড টেকনোলজি (বিআইএসটি) জাতীয় বিশ্ববিদ্যালয়, কারিগরি শিক্ষা বোর্ড এবং এনএসডিএ অনুমোদিত একটি স্বনামধন্য উচ্চশিক্ষা প্রতিষ্ঠান।'
            : 'BGIFT Institute of Science & Technology (BIST) is a premier higher academic institute affiliated with National University, BTEB, and accredited by NSDA.'}
        </p>
      </div>

      {/* BIST at a Glance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl glass-panel space-y-3 border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">
            {isBn ? 'বিআইএসটি একনজরে' : 'BIST at a Glance'}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {isBn
              ? 'গাজীপুরের চান্দনা চৌরাস্তায় উনিশে টাওয়ারে অবস্থিত ক্যাম্পাস। ২০০৮ সাল থেকে পরিচালিত এই প্রতিষ্ঠানে ৫,০০০+ শিক্ষার্থী, ৪০+ কোর্স ও ৬০ জন শিক্ষক রয়েছেন। প্রতিষ্ঠানটি একাডেমিক পরিষদের সমন্বয়ে পরিচালিত।'
              : 'Set up in 2008 at Unishe Tower, Chandona Chowrasta, Gazipur-1702. Today the institute has more than 5,000 students, 40+ courses and 60 teachers.'}
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-3 border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">
            {isBn ? 'আমাদের ভিশন ও মিশন' : 'Mission & Vision'}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {isBn
              ? 'চতুর্থ শিল্পবিপ্লবের উপযোগী টেক্সটাইল ইঞ্জিনিয়ারিং, কম্পিউটার সফটওয়্যার ও আধুনিক ম্যানেজমেন্টে দক্ষ, সৃজনশীল ও মানবিক নেতৃত্ব গড়ে তোলা।'
              : 'To be a nationally recognized technological powerhouse driving Industry 4.0 innovations, smart textile manufacturing, and software engineering leadership.'}
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-3 border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">
            {isBn ? 'জাতীয় স্বীকৃতি ও কোড' : 'Accreditations & Codes'}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {isBn
              ? 'জাতীয় বিশ্ববিদ্যালয় কোড ৫৫২৬, বাংলাদেশ কারিগরি শিক্ষাবোর্ড কোড ৫৩০৯৮ এবং জাতীয় দক্ষতা উন্নয়ন কর্তৃপক্ষ (NSDA) আরটিও কোড STP-GAZ-000020।'
              : 'Officially recognized by National University (Code: 5526), BTEB (Code: 53098), and NSDA Registered Center (Code: STP-GAZ-000020).'}
          </p>
        </div>
      </div>

      {/* History Narrative */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
          <Building2 className="w-4 h-4" />
          <span>{isBn ? 'প্রতিষ্ঠা ও গৌরবময় ইতিহাস' : 'Institutional Heritage & Growth'}</span>
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
          {isBn
            ? '২০০৮ থেকে ২০২৬: প্রযুক্তি ও শিল্পের সেবায় অবিচল যাত্রা'
            : 'From 2008 to 2026: An Unbroken Legacy of Engineering Excellence'}
        </h2>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          <p>
            {isBn
              ? 'বাংলাদেশের তৈরি পোশাক ও টেক্সটাইল শিল্পের প্রাণকেন্দ্র গাজীপুর। ২০০৮ সালে এই অঞ্চলের শিল্পকারখানার কারিগরি জনবলের তীব্র চাহিদা অনুধাবন করে একদল প্রাজ্ঞ শিক্ষাবিদ ও প্রকৌশলীর যৌথ উদ্যোগে প্রতিষ্ঠিত হয় বিজিআইএফটি ইনস্টিটিউট অব সায়েন্স অ্যান্ড টেকনোলজি (বিআইএসটি)।'
              : 'Gazipur has long stood as the industrial beating heart of Bangladesh’s export economy. BIST was set up in 2008 at Chandona Chowrasta to meet the growing need for advanced technical education, and it is dedicated to developing human resources for the readymade garment, textile and allied sectors of Bangladesh.'}
          </p>
          <p>
            {isBn
              ? 'মাত্র ৬০ জন শিক্ষার্থী নিয়ে শুরু হওয়া বিআইএসটি ক্রমান্বয়ে জাতীয় বিশ্ববিদ্যালয়ের অধীনে ৪ বছর মেয়াদি বি.এসসি (অনার্স) প্রোগ্রাম এবং বাংলাদেশ কারিগরি শিক্ষা বোর্ডের অধীনে ৪ বছর মেয়াদি ডিপ্লোমা ইন ইঞ্জিনিয়ারিং চালু করে। আধুনিক ল্যাবরেটরি, নিজস্ব টেক্সটাইল টেস্টিং ফ্লোর, ক্যাড-ক্যাম ডিজাইন স্টুডিও এবং এআই গবেষণাগারের সমন্বয়ে আজ প্রতিষ্ঠানটিতে পাঁচ সহস্রাধিক শিক্ষার্থী নিয়মিত শিক্ষা গ্রহণ করছে।'
              : 'Commencing with an initial batch of 60 students, BIST expanded into National University 4-year B.Sc. (Hons.) degrees (CSE, TST, AMT, FDT, BBA) alongside BTEB diploma tracks in engineering and textile technology. Today the campus hosts more than 5,000 students.'}
          </p>
        </div>
      </div>

      {/* Governing Bodies Section */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            {isBn ? 'গভর্নিং বডি ও প্রশাসনিক পরিষদ' : 'Governing Bodies & Leadership'}
          </h2>
          <p className="text-xs text-slate-400">
            {isBn
              ? 'জাতীয় বিশ্ববিদ্যালয়ের নীতিমালা অনুযায়ী ট্রাস্টি বোর্ড ও একাডেমিক কাউন্সিলের দিকনির্দেশনায় পরিচালিত।'
              : 'Operating under the governance of the Board of Trustees, Chairman, and Academic Advisory Council.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <Users className="w-6 h-6 text-cyan-400" />
            <h3 className="font-heading font-bold text-base text-white">Board of Trustees</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Provides strategic oversight, fiscal governance, campus infrastructure expansion, and ensures non-profit academic focus.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <Award className="w-6 h-6 text-indigo-400" />
            <h3 className="font-heading font-bold text-base text-white">Office of the Chairman</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ensures holistic institutional alignment with national higher education benchmarks and international industrial accreditation.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <h3 className="font-heading font-bold text-base text-white">Academic Advisory Council</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Reviews syllabi and examination integrity in line with National University and BTEB regulations.
            </p>
          </div>
        </div>
      </div>

      {/* Overview, quality policy and goals — transcribed from bist.edu.bd */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <Compass className="w-4 h-4" />
            <span>{isBn ? 'একনজরে বিআইএসটি' : 'BIST at a Glance'}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            {isBn ? INSTITUTION_OVERVIEW.bn : INSTITUTION_OVERVIEW.en}
          </p>
        </div>

        <div className="space-y-3 border-t border-white/10 pt-6">
          <h3 className="font-heading font-bold text-lg text-white">
            {isBn ? 'মান নীতি' : 'Quality Policy'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            {isBn ? QUALITY_POLICY.bn : QUALITY_POLICY.en}
          </p>
        </div>

        <div className="space-y-4 border-t border-white/10 pt-6">
          <h3 className="font-heading font-bold text-lg text-white">
            {isBn ? 'প্রাতিষ্ঠানিক লক্ষ্যসমূহ' : 'Institutional Goals'}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {INSTITUTION_GOALS.map((goal, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300 leading-relaxed">{isBn ? goal.bn : goal.en}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 border-t border-white/10 pt-6">
          <h3 className="font-heading font-bold text-lg text-white">
            {isBn ? 'সংযোগ ও নেটওয়ার্কিং' : 'Linkages & Networking'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {LINKAGES.map((link) => (
              <span
                key={link.name}
                title={link.full}
                className="px-3 py-1.5 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
              >
                {link.name}
              </span>
            ))}
          </div>

          <h4 className="font-heading font-bold text-sm text-white pt-2">
            {isBn ? 'ডিপ্লোমা ইন ইঞ্জিনিয়ারিং বিষয়সমূহ (বিটিইবি)' : 'Diploma in Engineering subjects (BTEB)'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {DIPLOMA_SUBJECTS.map((subject) => (
              <span
                key={subject}
                className="px-3 py-1.5 rounded-full text-[11px] bg-white/5 text-slate-300 border border-white/10"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
