import React from 'react';
import { Layers, ShieldCheck, CheckCircle2, ArrowRight, Award, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PARTNERS_PROJECTS } from '../../data/mockData';

export const ProjectsPage: React.FC = () => {
  const { language, navigateTo } = useApp();
  const isBn = language === 'bn';

  const projectsDetail = [
    {
      title: 'Recognition of Prior Learning (RPL) - NSDA Certified',
      code: 'STP-GAZ-000020',
      partner: 'National Skills Development Authority (NSDA) & Prime Minister Office',
      desc: 'Certifies informal and skilled factory technicians with government-standard Level 1 to 4 vocational certificates in Sewing Machine Operation, Pattern Making, and Electrical Maintenance.',
      intake: 'Quarterly Assessment Batches',
    },
    {
      title: 'BGMEA-SEIP Skills Investment Project',
      code: 'SEIP-BGMEA-BIST-04',
      partner: 'Ministry of Finance & Asian Development Bank (ADB)',
      desc: 'Provides free specialized industrial engineering, mid-level management, and quality control training for graduates entering the export garment manufacturing sectors.',
      intake: 'Free Tuition with Stipend & Placement',
    },
    {
      title: 'BWCCI-SEIP Female Technical Empowerment',
      code: 'BWCCI-SEIP-TECH',
      partner: 'Bangladesh Women Chamber of Commerce and Industry',
      desc: 'Specialized skill enhancement program targeted specifically at uplifting female professionals in fashion technology, digital merchandising, and CAD operations.',
      intake: 'Exclusive Female Cohorts',
    },
    {
      title: 'B-SkillFUL (Swisscontact)',
      code: 'SWISS-BSKILL-GAZ',
      partner: 'Swiss Agency for Development and Cooperation (SDC)',
      desc: 'Improves the productivity and working conditions of SME workers in Gazipur through customized dual-workplace training and workplace safety certifications.',
      intake: 'Industry Apprenticeship',
    },
    {
      title: 'Sudokkho Technical Vocational Project',
      code: 'UK-SUDOKKHO-BIST',
      partner: 'UK Foreign, Commonwealth & Development Office (FCDO)',
      desc: 'Quality-assured competency training for disadvantaged youth in mechanical maintenance, refrigeration, and textile spinning.',
      intake: 'Full Subsidy Training',
    },
    {
      title: 'UNDP Youth Livelihoods & Smart Apprenticeship',
      code: 'UNDP-BD-SMART-YOUTH',
      partner: 'United Nations Development Programme (UNDP)',
      desc: 'Green skills, sustainable apparel manufacturing, and digital entrepreneurship mentoring for young engineers and startup founders in greater Gazipur.',
      intake: 'Annual Innovation Challenge',
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{isBn ? 'দক্ষতা ও প্রশিক্ষণ প্রকল্প' : 'Skills & Development Initiatives'}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {isBn ? 'সরকারি ও আন্তর্জাতিক প্রকল্পসমূহ' : 'National Projects & RPL Center'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          {isBn
            ? 'এসইআইপি, বিজিএমইএ, ইউএনডিপি এবং সুইসকনটাক্ট-এর সাথে যৌথভাবে পরিচালিত বিভিন্ন কারিগরি প্রশিক্ষণ কর্মসূচি।'
            : 'Government and international development initiatives transforming technicians into certified industry experts.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsDetail.map((proj, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl glass-panel border border-white/10 hover:border-cyan-500/40 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-cyan-400 font-semibold">{proj.code}</span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300 text-[10px]">
                  {proj.intake}
                </span>
              </div>

              <h3 className="font-heading font-bold text-lg text-white">
                {proj.title}
              </h3>

              <div className="text-xs text-amber-300 font-medium">
                Partner: {proj.partner}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {proj.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-emerald-400 font-medium">
                Accredited Assessment Center
              </span>
              <button
                onClick={() => navigateTo('apply-online')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Enroll in Cohort</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
