import React from 'react';
import {
  Monitor,
  Layers,
  Cpu,
  FlaskConical,
  BookOpen,
  Briefcase,
  Home,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FacilitiesPage: React.FC = () => {
  const { language, navigateTo } = useApp();
  const isBn = language === 'bn';

  const facilitiesList = [
    {
      title: isBn ? 'কম্পিউটার ও এআই ওয়ার্কস্টেশন ল্যাব' : 'Advanced Computer & AI Software Lab',
      icon: Monitor,
      color: 'text-cyan-600 dark:text-cyan-400',
      description: isBn
        ? 'উচ্চগতির অপটিক্যাল ফাইবার ইন্টারনেট, কোর আই-৭ ওয়ার্কস্টেশন, সিসকো নেটওয়ার্ক রাউটার এবং আধুনিক সফটওয়্যার ডেভেলপমেন্ট ও রোবোটিক্স সুবিধা।'
        : 'High-speed gigabit fiber backbone, dedicated AI research terminals, Cisco routing gear, Linux environments, and software project incubators.',
      features: ['High-speed Dedicated Fiber', 'Cisco Network Testbed', 'AI & Machine Learning GPU Rig', '80 Workstations'],
    },
    {
      title: isBn ? 'ভারী টেক্সটাইল টেস্টিং ও লুম মেশিনারি' : 'Heavy Textile Testing & Loom Machinery Floor',
      icon: Layers,
      color: 'text-indigo-600 dark:text-indigo-400',
      description: isBn
        ? 'ইন্ডাস্ট্রিয়াল সার্কুলার নিটিং মেশিন, পাওয়ার লুম, সুতার টান শক্তি পরীক্ষক, কালার ফাস্টনেস টেস্টার ও ওয়েট প্রসেসিং ডাইং কেমিক্যাল সেটআপ।'
        : 'Industrial circular knitting machines, sample weaving looms, tensile yarn testers, spectrophotometer colorimeters, and dyeing baths.',
      features: ['Automated Circular Weaving Loom', 'Digital Tensile Strength Tester', 'Wash Fastness Machine', 'ASTM/AATCC Testing Tools'],
    },
    {
      title: isBn ? 'গার্মেন্টস ক্যাড/ক্যাম ও প্যাটার্ন স্টুডিও' : 'Garments CAD/CAM & Pattern Design Floor',
      icon: Cpu,
      color: 'text-amber-600 dark:text-amber-400',
      description: isBn
        ? 'গার্মেন্টস ডিজিটাল মার্কার মেকিং সফটওয়্যার, ড্রাফটিং টেবিল, ইন্ডাস্ট্রিয়াল কাটিং ও ওভারলক সেলাই মেশিন সজ্জিত স্বয়ংসম্পূর্ণ অ্যাপারেল ফ্লোর।'
        : 'Full Gerber/Optitex digitizing tables, pattern grading plotters, heavy lockstitch sewing setups, and industrial pressing units.',
      features: ['Digital Marker Making Software', 'Wide-Format Industrial Plotter', '30 Special Sewing Machines', 'Draping Mannequins'],
    },
    {
      title: isBn ? 'কেন্দ্রীয় ই-লাইব্রেরি ও রিডিং হল' : 'Central Library & Digital Knowledge Hub',
      icon: BookOpen,
      color: 'text-emerald-600 dark:text-emerald-400',
      description: isBn
        ? 'টেক্সটাইল, ইঞ্জিনিয়ারিং ও বিজনেস বিষয়ক বইয়ের সংগ্রহ, আন্তর্জাতিক জার্নাল অ্যাক্সেস এবং শান্ত শীতাতপ নিয়ন্ত্রিত রিডিং লাউঞ্জ।'
        : 'Textile, engineering and business book collections, journal access terminals, and quiet air-conditioned study rooms.',
      features: ['Academic Book Collection', 'E-Journal Access Terminal', 'Group Study Spaces', 'Photocopy & Printing Station'],
    },
    {
      title: isBn ? 'শিক্ষার্থী আবাসন ও আবাসিক সহায়তা' : 'Student Residential & Hall Assistance',
      icon: Home,
      color: 'text-rose-600 dark:text-rose-400',
      description: isBn
        ? 'দূর-দূরান্ত থেকে আগত ছাত্র ও ছাত্রীদের জন্য ক্যাম্পাসের নিকটবর্তী নিরাপদ হোস্টেল ও পেয়িং গেস্ট সহায়তা সেল।'
        : 'Affiliated and vetted residential student halls within walking distance from campus with 24/7 security and Wi-Fi.',
      features: ['Separate Female & Male Wings', '24/7 Monitored CCTV Security', 'Nutritious Dining Options', 'High-Speed Wi-Fi'],
    },
    {
      title: isBn ? 'সেন্ট্রাল ক্যারিয়ার ও ইন্টার্নশিপ সেল' : 'Career Placement & Industry Engagement',
      icon: Briefcase,
      color: 'text-sky-600 dark:text-sky-400',
      description: isBn
        ? 'সরাসরি চাকরি মেলা, সিভি প্রশিক্ষণ এবং শীর্ষস্থানীয় আরএমজি ও সফটওয়্যার কোম্পানিতে ৩ মাসের বাধ্যতামূলক ইন্টার্নশিপ।'
        : 'Dedicated full-time officers coordinating mock technical interviews, portfolio counseling, and factory internship placements.',
      features: ['Dedicated Placement Cell', 'On-Campus Job Fairs', 'Internship Coordination', 'Resume & Interview Clinics'],
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isBn ? 'আধুনিক সুযোগ-সুবিধা' : 'Campus Infrastructure'}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isBn ? 'বিআইএসটি ল্যাবরেটরি ও ক্যাম্পাস সুবিধাসমূহ' : 'Labs, Facilities & Student Life'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {isBn
            ? 'আন্তর্জাতিক মানের ১৬+ গবেষণাগার, আধুনিক টেক্সটাইল ফ্লোর এবং ক্যারিয়ার প্লেসমেন্ট সহায়তা।'
            : 'Explore the modern learning spaces that turn students into capable industry engineers.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilitiesList.map((fac, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className={`w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center ${fac.color}`}>
                <fac.icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                {fac.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {fac.description}
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-white/5">
              {fac.features.map((feat, fidx) => (
                <div key={fidx} className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                  <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${fac.color}`} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
