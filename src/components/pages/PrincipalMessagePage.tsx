import React from 'react';
import { Quote, Award, ArrowRight, Mail, GraduationCap, Building2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../ui/PageHeader';
import { UNIVERSITY_INFO } from '../../data/mockData';

/**
 * The Principal's message as its own About page.
 *
 * The message text is reproduced verbatim from bist.edu.bd's
 * "Message from Founder & Principal", and the photograph is the one the site
 * publishes. Like the homepage section, no academic credentials are invented:
 * the live site states none.
 */
export const PrincipalMessagePage: React.FC = () => {
  const { language, navigateTo, theme } = useApp();
  const isBn = language === 'bn';

  const principal = {
    name: { en: 'Md. Deluwar Hosain', bn: 'মোঃ দেলোয়ার হোসেন' },
    role: { en: 'Principal & Founder, BIST', bn: 'অধ্যক্ষ ও প্রতিষ্ঠাতা, বিআইএসটি' },
    honour: {
      en: 'President, PIANU Central Committee',
      bn: 'সভাপতি, পিআইএএনইউ কেন্দ্রীয় কমিটি',
    },
  };

  /** Verbatim from bist.edu.bd → "Message from Founder & Principal". */
  const message = {
    en: 'The world is moving towards the development of civilization very fast through the use of science and technology, where our country is one of the significant participants. Our educational institutes are working very effectively to make the country go ahead in this digital age. BGIFT Institute of Science and Technology is one of those institutes that is working with great efforts to create manpower that can contribute to the development of the country.',
    bn: 'বিজ্ঞান ও প্রযুক্তির ব্যবহারে বিশ্ব সভ্যতার অগ্রযাত্রা অত্যন্ত দ্রুত এগিয়ে চলছে এবং আমাদের দেশ তার অন্যতম গুরুত্বপূর্ণ অংশীদার। ডিজিটাল যুগে দেশকে এগিয়ে নিতে আমাদের শিক্ষা প্রতিষ্ঠানগুলো অত্যন্ত কার্যকরভাবে কাজ করছে। বিজিআইএফটি ইনস্টিটিউট অব সায়েন্স অ্যান্ড টেকনোলজি তেমনই একটি প্রতিষ্ঠান, যা দেশের উন্নয়নে অবদান রাখতে পারে এমন দক্ষ মানবসম্পদ গড়ে তুলতে সর্বাত্মক প্রচেষ্টা চালিয়ে যাচ্ছে।',
  };

  /** What the office of the Principal stands for, as the institution describes itself. */
  const commitments = isBn
    ? [
        'শিল্পের চাহিদা অনুযায়ী দক্ষ মানবসম্পদ তৈরি',
        'সবার জন্য সহজলভ্য, মানসম্মত কারিগরি ও উচ্চশিক্ষা',
        'নৈতিকতা, শৃঙ্খলা ও সৃজনশীলতার চর্চা',
      ]
    : [
        'Producing skilled manpower for the demands of industry',
        'Accessible, quality technical and higher education for all',
        'Discipline, ethics and creative practice on campus',
      ];

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      <PageHeader
        icon={Quote}
        accent="emerald"
        badge={{ en: 'Message from the Principal', bn: 'অধ্যক্ষের বাণী' }}
        title={{
          en: 'Building the manpower for a digital Bangladesh',
          bn: 'ডিজিটাল বাংলাদেশ গড়তে দক্ষ মানবসম্পদ',
        }}
        subtitle={{
          en: 'The founding Principal of BGIFT Institute of Science & Technology on why technical education matters to the country.',
          bn: 'কারিগরি শিক্ষা কেন দেশের জন্য গুরুত্বপূর্ণ — বিজিআইএফটি ইনস্টিটিউট অব সায়েন্স অ্যান্ড টেকনোলজির প্রতিষ্ঠাতা অধ্যক্ষের বাণী।',
        }}
      />

      <div
        className={`relative rounded-3xl p-6 sm:p-10 lg:p-12 border overflow-hidden shadow-xl ${
          theme === 'dark'
            ? 'glass-panel-dark border-emerald-500/30'
            : 'bg-white/95 border-emerald-200/90 shadow-[0_12px_40px_rgba(5,150,105,0.07)]'
        }`}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Portrait */}
          <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden p-1.5 bg-gradient-to-tr from-emerald-500 via-teal-400 to-yellow-400 shadow-2xl group">
              <img
                src="./images/principal.jpg"
                alt={principal.name.en}
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold text-center border border-white/20">
                {isBn ? 'অধ্যক্ষ ও প্রতিষ্ঠাতা' : 'Principal & Founder'}
              </div>
            </div>

            <div>
              <h2 className={`font-heading font-extrabold text-xl ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
                {isBn ? principal.name.bn : principal.name.en}
              </h2>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-extrabold mt-0.5 tracking-wide">
                {isBn ? principal.role.bn : principal.role.en}
              </p>
              <div
                className={`inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                  theme === 'dark'
                    ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>{isBn ? principal.honour.bn : principal.honour.en}</span>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="lg:col-span-8 space-y-6">
            <h3
              className={`font-heading text-2xl sm:text-3xl font-extrabold leading-snug ${
                theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
              }`}
            >
              {isBn ? 'দক্ষ মানবসম্পদ সৃষ্টিতে অবিচল অঙ্গীকার' : 'A commitment to skilled manpower'}
            </h3>

            <p
              className={`text-sm sm:text-base leading-relaxed italic border-l-4 border-emerald-500 pl-4 py-1 ${
                theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
              }`}
            >
              {isBn ? message.bn : message.en}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {commitments.map((item) => (
                <li
                  key={item}
                  className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                    theme === 'dark'
                      ? 'bg-white/[0.03] border-white/10 text-slate-300'
                      : 'bg-emerald-50/60 border-emerald-200 text-slate-700'
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigateTo('about')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-yellow-400 hover:from-emerald-400 hover:to-yellow-300 text-slate-950 text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <span>{isBn ? 'প্রতিষ্ঠানের ইতিহাস জানুন' : 'Read Institutional History'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigateTo('officers')}
                className={`text-xs font-bold transition-colors cursor-pointer ${
                  theme === 'dark'
                    ? 'text-emerald-700 dark:text-emerald-300 hover:text-white'
                    : 'text-emerald-800 hover:text-emerald-950'
                }`}
              >
                {isBn ? 'প্রশাসনিক কর্মকর্তাবৃন্দ →' : 'Administrative Officers →'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Office of the Principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-2xl border space-y-3 ${theme === 'dark' ? 'glass-panel-dark' : 'glass-panel'}`}>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className={`font-heading font-bold text-base ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
            {isBn ? 'অধ্যক্ষের কার্যালয়' : "Office of the Principal"}
          </h3>
          <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
            {isBn
              ? 'প্রতিষ্ঠানের একাডেমিক ও প্রশাসনিক নেতৃত্ব, জাতীয় বিশ্ববিদ্যালয় ও বিটিইবি-র সঙ্গে সমন্বয় এবং ক্যাম্পাস পরিচালনার দায়িত্বে।'
              : 'Leads the academic and administrative direction of the institute, coordinates with National University and BTEB, and runs day-to-day campus governance.'}
          </p>
        </div>

        <div className={`p-6 rounded-2xl border space-y-3 ${theme === 'dark' ? 'glass-panel-dark' : 'glass-panel'}`}>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className={`font-heading font-bold text-base ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
            {isBn ? 'গভর্নিং বডি ও একাডেমিক পরিষদ' : 'Governance & Academic Council'}
          </h3>
          <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
            {isBn
              ? 'প্রতিষ্ঠানটি একাডেমিক পরিষদের সুপারিশে পরিচালিত হয়, যা জাতীয় বিশ্ববিদ্যালয় ও বিটিইবি-র নীতিমালা অনুসরণ করে সিলেবাস ও পরীক্ষার মান পর্যালোচনা করে।'
              : 'The institute runs on the advice of its academic council, which reviews syllabi and examination standards in line with National University and BTEB regulations.'}
          </p>
        </div>

        <div className={`p-6 rounded-2xl border space-y-3 ${theme === 'dark' ? 'glass-panel-dark' : 'glass-panel'}`}>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className={`font-heading font-bold text-base ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
            {isBn ? 'যোগাযোগ' : 'Contact the office'}
          </h3>
          <a
            href={`mailto:${UNIVERSITY_INFO.contact.email}`}
            className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold hover:underline block"
          >
            {UNIVERSITY_INFO.contact.email}
          </a>
          <a
            href={`tel:${UNIVERSITY_INFO.contact.officePhone}`}
            className="text-xs text-slate-700 dark:text-slate-300 font-mono block"
          >
            {UNIVERSITY_INFO.contact.officePhone}
          </a>
          <button
            onClick={() => navigateTo('contact')}
            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 cursor-pointer"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{isBn ? 'ক্যাম্পাস অবস্থান ও ফোন' : 'Campus location & phones'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
