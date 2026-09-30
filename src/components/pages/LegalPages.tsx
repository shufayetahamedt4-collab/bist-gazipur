import React from 'react';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LegalPages: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  const { language, navigateTo } = useApp();
  const isBn = language === 'bn';

  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-8">
      <button
        onClick={() => navigateTo('home')}
        className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </button>

      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-6">
        <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider">
          {type === 'privacy' ? <ShieldCheck className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
          <span>Institutional Policies & Governance</span>
        </div>

        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
          {type === 'privacy'
            ? isBn
              ? 'গোপনীয়তা নীতি ও ডেটা সুরক্ষা'
              : 'Privacy Policy & Data Protection'
            : isBn
            ? 'ব্যবহারের নিয়মাবলি ও শর্তাবলি'
            : 'Terms of Admission & Academic Regulations'}
        </h1>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          {type === 'privacy' ? (
            <>
              <p>
                BGIFT Institute of Science & Technology (BIST) is committed to safeguarding the privacy and security of applicant and student personal information. Any information collected through this admission portal (including academic certificates, phone numbers, and NID records) is utilized exclusively for enrollment verification under the National University and Bangladesh Technical Education Board (BTEB) frameworks.
              </p>
              <h3 className="font-heading font-bold text-base text-white pt-2">Data Sharing & Security</h3>
              <p>
                We do not sell, rent, or lease personal student records to any third-party marketing entities. Information is only transmitted to authorized university accreditation authorities and affiliated examination boards for registration purposes.
              </p>
            </>
          ) : (
            <>
              <p>
                By applying or registering at BGIFT Institute of Science & Technology (BIST), Gazipur, students agree to adhere strictly to the academic calendar, code of conduct, anti-ragging mandates, and examination policies set forth by the National University, BTEB, and NSDA.
              </p>
              <h3 className="font-heading font-bold text-base text-white pt-2">Campus Discipline & Code</h3>
              <p>
                A minimum of 75% class and laboratory attendance is mandatory to sit for semester-final examinations. Tuition fee installments must be settled in accordance with the specified academic calendar timelines.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
