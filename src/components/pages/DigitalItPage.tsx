import React from 'react';
import {
  MonitorSmartphone,
  Server,
  GraduationCap,
  FileSearch,
  BellRing,
  Users,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../ui/PageHeader';
import { UNIVERSITY_INFO } from '../../data/mockData';
import { LocalizedString, PageId } from '../../types';

/** One initiative card: either an in-app page or an outbound/hash link. */
interface Initiative {
  icon: React.ComponentType<{ className?: string }>;
  title: LocalizedString;
  body: LocalizedString;
  action: { label: LocalizedString; page?: PageId; href?: string; internal?: boolean };
}

/**
 * About → Digital & IT Development.
 *
 * Every initiative listed here is something the institution already runs and
 * publishes: the ERP portal in the utility bar, the online application flow, the
 * notice board, the result and document services, and the IT skill courses. The
 * team block is deliberately an honest placeholder rather than a fabricated
 * roster — the unit's staff have not been supplied yet.
 */
export const DigitalItPage: React.FC = () => {
  const { language, navigateTo, theme } = useApp();
  const isBn = language === 'bn';

  const initiatives: Initiative[] = [
    {
      icon: Server,
      title: { en: 'Institute ERP', bn: 'ইনস্টিটিউট ইআরপি' },
      body: {
        en: 'The campus ERP portal carries student records, attendance, results and accounts for National University and BTEB students.',
        bn: 'ক্যাম্পাস ইআরপি পোর্টালে জাতীয় বিশ্ববিদ্যালয় ও বিটিইবি শিক্ষার্থীদের রেকর্ড, উপস্থিতি, ফলাফল ও হিসাব সংরক্ষিত থাকে।',
      },
      action: { label: { en: 'Open ERP portal', bn: 'ইআরপি পোর্টাল' }, href: UNIVERSITY_INFO.contact.erpUrl },
    },
    {
      icon: MonitorSmartphone,
      title: { en: 'Online admission', bn: 'অনলাইন ভর্তি' },
      body: {
        en: 'Applicants submit the full admission form online and receive a reference number for tracking, instead of queueing at the campus counter.',
        bn: 'আবেদনকারীরা সম্পূর্ণ ভর্তি ফরম অনলাইনে জমা দিয়ে রেফারেন্স নম্বর পান, ক্যাম্পাসে লাইনে দাঁড়ানোর প্রয়োজন হয় না।',
      },
      action: { label: { en: 'Apply online', bn: 'অনলাইন আবেদন' }, page: 'apply-online' },
    },
    {
      icon: FileSearch,
      title: { en: 'Results & document desk', bn: 'ফলাফল ও ডকুমেন্ট ডেস্ক' },
      body: {
        en: 'Students look up semester results and request transcripts, certificates and testimonials through a tracked enquiry desk.',
        bn: 'শিক্ষার্থীরা সেমিস্টার ফলাফল দেখতে পারেন এবং ট্রান্সক্রিপ্ট, সনদ ও প্রশংসাপত্রের জন্য অনুরোধ জানাতে পারেন।',
      },
      action: { label: { en: 'Request a document', bn: 'ডকুমেন্টের অনুরোধ' }, page: 'document-enquiry' },
    },
    {
      icon: BellRing,
      title: { en: 'Digital notices & activity feed', bn: 'ডিজিটাল নোটিশ ও অ্যাক্টিভিটি ফিড' },
      body: {
        en: 'Circulars, exam schedules and campus activity are published straight to the website by staff, so nothing waits for a printed notice.',
        bn: 'সার্কুলার, পরীক্ষার সময়সূচি ও ক্যাম্পাসের কার্যক্রম স্টাফরা সরাসরি ওয়েবসাইটে প্রকাশ করেন, মুদ্রিত নোটিশের অপেক্ষা করতে হয় না।',
      },
      action: { label: { en: 'Notice board', bn: 'নোটিশ বোর্ড' }, page: 'notices' },
    },
    {
      icon: GraduationCap,
      title: { en: 'IT skills training', bn: 'আইটি দক্ষতা প্রশিক্ষণ' },
      body: {
        en: 'The IT and design short courses train students and industry staff in web development, graphics design and digital marketing.',
        bn: 'আইটি ও ডিজাইন শর্ট কোর্সে শিক্ষার্থী ও শিল্পের কর্মীদের ওয়েব ডেভেলপমেন্ট, গ্রাফিক্স ডিজাইন ও ডিজিটাল মার্কেটিং শেখানো হয়।',
      },
      action: { label: { en: 'Short courses', bn: 'শর্ট কোর্স' }, page: 'short-courses' },
    },
    {
      icon: CheckCircle2,
      title: { en: 'Skills certification data', bn: 'দক্ষতা সনদায়ন ডেটা' },
      body: {
        en: 'Assessment records for the NSDA-registered centre — candidate registration, level results and certificate issue — are maintained digitally.',
        bn: 'এনএসডিএ-নিবন্ধিত কেন্দ্রের মূল্যায়ন রেকর্ড — প্রার্থী নিবন্ধন, লেভেল ফলাফল ও সনদ প্রদান — ডিজিটালভাবে সংরক্ষিত হয়।',
      },
      action: { label: { en: 'NSDA courses at BIST', bn: 'এনএসডিএ কোর্স' }, href: '#/affiliated/nsda', internal: true },
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      <PageHeader
        icon={MonitorSmartphone}
        accent="cyan"
        badge={{ en: 'About BIST · Digital & IT', bn: 'পরিচিতি · ডিজিটাল ও আইটি' }}
        title={{
          en: 'Digital & IT Development',
          bn: 'ডিজিটাল ও আইটি ডেভেলপমেন্ট',
        }}
        subtitle={{
          en: 'The unit that runs the institute\'s information systems, online services and IT skills training — from the campus ERP to the admission portal on this website.',
          bn: 'প্রতিষ্ঠানের তথ্যপ্রযুক্তি সিস্টেম, অনলাইন সেবা ও আইটি দক্ষতা প্রশিক্ষণ পরিচালনার ইউনিট — ক্যাম্পাস ইআরপি থেকে এই ওয়েবসাইটের ভর্তি পোর্টাল পর্যন্ত।',
        }}
      />

      {/* Mandate */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${
          theme === 'dark' ? 'glass-panel-dark border-emerald-500/25' : 'bg-white/95 border-emerald-100 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
        }`}
      >
        <h2 className={`font-heading font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
          {isBn ? 'আমাদের কাজ' : 'What the unit does'}
        </h2>
        <p className={`text-xs sm:text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
          {isBn
            ? 'ডিজিটাল ও আইটি ইউনিট প্রতিষ্ঠানের সকল তথ্যপ্রযুক্তি অবকাঠামো ও অনলাইন সেবা পরিচালনা করে: ইআরপি, অনলাইন ভর্তি, নোটিশ ও ফলাফল ব্যবস্থাপনা, ওয়েবসাইট রক্ষণাবেক্ষণ এবং শিক্ষার্থী ও শিল্পকর্মীদের জন্য আইটি প্রশিক্ষণ। লক্ষ্য হলো প্রশাসনিক কাজ দ্রুততর করা এবং শিক্ষার্থীদের কাছে সেবা পৌঁছে দেওয়া।'
            : 'The Digital & IT unit runs the institute\'s information systems and online services: the ERP, online admission, notice and result management, upkeep of this website, and IT training for students and industry staff. The aim is faster administration and services that reach students without a trip to the counter.'}
        </p>
      </div>

      {/* Initiatives */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className={`font-heading text-2xl sm:text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
            {isBn ? 'চলমান উদ্যোগসমূহ' : 'Ongoing Initiatives'}
          </h2>
          <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            {isBn
              ? 'প্রতিষ্ঠানের বর্তমানে চালু ডিজিটাল সেবাসমূহ।'
              : 'The digital services the institute currently runs.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initiatives.map((item) => (
            <div
              key={item.title.en}
              className={`p-6 rounded-3xl border flex flex-col gap-3 transition-all hover:border-cyan-400/60 ${
                theme === 'dark' ? 'glass-panel-dark border-white/10' : 'bg-white/95 border-emerald-100 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 flex items-center justify-center">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className={`font-heading font-bold text-base ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
                {isBn ? item.title.bn : item.title.en}
              </h3>
              <p className={`text-xs leading-relaxed flex-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                {isBn ? item.body.bn : item.body.en}
              </p>

              {item.action.href ? (
                <a
                  href={item.action.href}
                  {...(item.action.internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300"
                >
                  <span>{isBn ? item.action.label.bn : item.action.label.en}</span>
                  {item.action.internal ? <ArrowRight className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
                </a>
              ) : (
                <button
                  onClick={() => item.action.page && navigateTo(item.action.page)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 cursor-pointer"
                >
                  <span>{isBn ? item.action.label.bn : item.action.label.en}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Team — honest placeholder until the unit's roster is supplied */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${
          theme === 'dark' ? 'glass-panel-dark border-white/10' : 'bg-white/95 border-emerald-100 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h2 className={`font-heading font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
            {isBn ? 'ইউনিটের টিম' : 'The Unit Team'}
          </h2>
        </div>
        <p className={`text-xs sm:text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
          {isBn
            ? 'ইউনিটের কর্মকর্তা ও টেকনিশিয়ানদের নাম ও দায়িত্ব সংগ্রহ করা হচ্ছে। তথ্য পাওয়া গেলে এই তালিকা হালনাগাদ করা হবে।'
            : 'The names and responsibilities of the unit\'s officers and technicians are being collected. This list will be published as soon as the roster is finalised.'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[0, 1, 2].map((slot) => (
            <div
              key={slot}
              className={`rounded-2xl border border-dashed p-5 flex flex-col items-center justify-center gap-2 text-center min-h-[120px] ${
                theme === 'dark' ? 'border-white/15' : 'border-emerald-200'
              }`}
            >
              <div className={`w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-white/5' : 'bg-emerald-50'}`} />
              <span className={`text-[11px] ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                {isBn ? 'প্রোফাইল সংযোজনের অপেক্ষায়' : 'Profile to be added'}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigateTo('contact')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
        >
          <span>{isBn ? 'ইউনিটের সঙ্গে যোগাযোগ করুন' : 'Contact the unit'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
