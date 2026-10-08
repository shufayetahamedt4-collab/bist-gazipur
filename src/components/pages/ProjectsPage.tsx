import React from 'react';
import { Layers, ShieldCheck, CheckCircle2, ArrowRight, Award, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { COLLABORATION_PROJECTS } from '../../data/mockData';

/** Badge tints for the development-partner cards. */
const PARTNER_ACCENTS: Record<string, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/25',
  cyan: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/25',
  amber: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25',
  indigo: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/25',
};

export const ProjectsPage: React.FC = () => {
  const { language, navigateTo, theme } = useApp();
  const isBn = language === 'bn';

  /** `ASSETS` → `AS`, `CICIP` → `CI`: the tile shown until real logos arrive. */
  const initialsOf = (name: string) => name.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase();

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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{isBn ? 'দক্ষতা ও প্রশিক্ষণ প্রকল্প' : 'Skills & Development Initiatives'}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isBn ? 'সরকারি ও আন্তর্জাতিক প্রকল্পসমূহ' : 'National Projects & RPL Center'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {isBn
            ? 'এসইআইপি, বিজিএমইএ, ইউএনডিপি এবং সুইসকনটাক্ট-এর সাথে যৌথভাবে পরিচালিত বিভিন্ন কারিগরি প্রশিক্ষণ কর্মসূচি।'
            : 'Government and international development initiatives transforming technicians into certified industry experts.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsDetail.map((proj, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-cyan-600 dark:text-cyan-400 font-semibold">{proj.code}</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-[10px]">
                  {proj.intake}
                </span>
              </div>

              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                {proj.title}
              </h3>

              <div className="text-xs text-amber-700 dark:text-amber-300 font-medium">
                Partner: {proj.partner}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {proj.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                Accredited Assessment Center
              </span>
              <button
                onClick={() => navigateTo('apply-online')}
                className="text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Enroll in Cohort</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Development-partner projects: one card per project, each naming the
          partner and that partner's role, with a logo placeholder until the
          partner supplies approved artwork. */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>{isBn ? 'উন্নয়ন সহযোগী প্রকল্প' : 'Development Partner Projects'}</span>
          </div>
          <h2 className={`font-heading text-2xl sm:text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
            {isBn ? 'আন্তর্জাতিক ও শিল্প সহযোগী প্রকল্পসমূহ' : 'Partners We Work With'}
          </h2>
          <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            {isBn
              ? 'প্রতিটি প্রকল্পে সহযোগী প্রতিষ্ঠানের ভূমিকা নিচে স্পষ্টভাবে উল্লেখ করা হয়েছে।'
              : 'Each card names the development partner and exactly what that partner does in the project.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COLLABORATION_PROJECTS.map((project) => (
            <div
              key={project.id}
              className={`p-6 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 hover:border-emerald-500/40 transition-all space-y-4 flex flex-col ${
                theme === 'dark' ? 'glass-panel-dark' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Logo placeholder: initials tile until approved artwork arrives. */}
                <div
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center font-heading font-extrabold text-lg shrink-0 ${PARTNER_ACCENTS[project.accent]}`}
                  aria-hidden="true"
                >
                  {initialsOf(project.name)}
                </div>
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className={`font-heading font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
                      {project.name}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${PARTNER_ACCENTS[project.accent]}`}
                    >
                      {isBn ? project.theme.bn : project.theme.en}
                    </span>
                  </div>
                  <p className={`text-[11px] leading-snug ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {isBn ? project.fullName.bn : project.fullName.en}
                  </p>
                </div>
              </div>

              {/* Partner and the partner's role */}
              <div
                className={`p-3.5 rounded-2xl border text-xs ${
                  theme === 'dark' ? 'bg-black/30 border-white/10' : 'bg-emerald-50/60 border-emerald-200'
                }`}
              >
                <div className={`text-[10px] uppercase tracking-wider font-bold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                  {isBn ? 'উন্নয়ন সহযোগী' : 'Development partner'}
                </div>
                <div className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>{project.partner}</div>
                <div className="text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5">
                  {isBn ? project.partnerRole.bn : project.partnerRole.en}
                </div>
              </div>

              <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                {isBn ? project.summary.bn : project.summary.en}
              </p>

              <div className="space-y-2">
                <div className={`text-[10px] uppercase tracking-wider font-bold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                  {isBn ? 'বিআইএসটি-র ভূমিকা' : "BIST's role"}
                </div>
                <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  {isBn ? project.bistRole.bn : project.bistRole.en}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.focusAreas.map((area) => (
                  <span
                    key={area.en}
                    className={`px-2.5 py-1 rounded-full text-[10px] ${
                      theme === 'dark'
                        ? 'bg-white/5 text-slate-300 border border-white/10'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {isBn ? area.bn : area.en}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
