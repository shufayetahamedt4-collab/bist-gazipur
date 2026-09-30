import React from 'react';
import { CheckCircle2, AlertTriangle, X, ShieldAlert, FileText, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ClientChecklistModal: React.FC = () => {
  const { isClientNotesOpen, setIsClientNotesOpen, theme } = useApp();

  if (!isClientNotesOpen) return null;

  const appliedFixes = [
    {
      issue: 'Spelling Corrections',
      status: 'Fixed',
      details: 'Corrected "College Code" (was "Collage"), "Campus Rules", "Vision", "Yarn Processing", "platform", and "Bangladesh" across all UI and data files.',
    },
    {
      issue: 'Campus Geographic Location',
      status: 'Fixed',
      details: 'Set address to "Unishe Tower, Mymensingh Road, Chandona Chowrasta, Gazipur-1702", eliminating the outdated Dhaka misclassification.',
    },
    {
      issue: 'Dual Phone Number Discrepancy',
      status: 'Fixed & Labeled',
      details: 'Clearly labeled both numbers across headers, footers and contact pages: 01913-555111 labeled as "Admission Hotline" and 01908-909090 labeled as "General Office & Reception".',
    },
    {
      issue: 'Official University Email',
      status: 'Fixed',
      details: 'Consistently standardized to "principal@bist.edu.bd" (with secondary info@bist.edu.bd for inquiries).',
    },
    {
      issue: 'Founding Year Inconsistency (2007 vs 2008)',
      status: 'Flagged for Confirmation',
      details: 'Standardized to 2007 in data layer (17+ years celebrated in 2024/2025). Flagged for client trustees to confirm if 2007 is academic inception or official charter date.',
    },
    {
      issue: 'Empty Social Links (Twitter/X)',
      status: 'Removed',
      details: 'Removed dead Twitter/X anchor tags; maintained active links only for Facebook, YouTube, and LinkedIn.',
    },
    {
      issue: 'ERP Link Security',
      status: 'Enforced HTTPS',
      details: 'Configured https://erp.bist.edu.bd with safe protocol handling and environment variable support.',
    },
    {
      issue: 'Bilingual Consistency',
      status: 'Standardized',
      details: 'Unified English and Bangla toggle for every header, section, department syllabus, notice, and footer.',
    },
  ];

  const clientPlaceholders = [
    'Official high-resolution photography of Unishe Tower campus facade, classrooms, and BIST Central Auditorium.',
    'Confirmation of Founding Year: 2007 vs 2008 for the official charter records.',
    'Official digital PDF circulars with stamps for the download archive.',
    'Custom Google Maps API Key if dynamic 3D street view embed is preferred over standard coordinates.',
    'Payment Gateway Merchant API keys (bKash / Nagad / SSLCommerz) when activating direct semester fee online checkout.',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-2xl rounded-3xl border p-6 sm:p-8 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto ${
        theme === 'dark'
          ? 'bg-[#0a0f24] border-emerald-500/40 text-white'
          : 'bg-white border-emerald-200 text-slate-900 shadow-[0_20px_60px_rgba(5,150,105,0.15)]'
      }`}>
        <button
          onClick={() => setIsClientNotesOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-900 text-xs font-semibold border border-yellow-300">
            <Info className="w-3.5 h-3.5 text-amber-600" />
            <span>Audit & Verification Report</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl">
            Client Review & Quality Checklist
          </h2>
          <p className="text-xs text-slate-500">
            All corrections required from the legacy site analysis have been implemented and documented below.
          </p>
        </div>

        {/* Applied Content & Structural Fixes */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-mono block">
            1. Applied Content Fixes
          </span>
          <div className={`divide-y rounded-2xl border p-3 ${
            theme === 'dark'
              ? 'divide-white/5 bg-white/[0.02] border-white/5'
              : 'divide-emerald-100 bg-slate-50/50 border-emerald-100'
          }`}>
            {appliedFixes.map((item, idx) => (
              <div key={idx} className="py-2.5 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{item.issue}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === 'Fixed'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">{item.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Placeholders for Client Delivery */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-mono block">
            2. Assets & Inputs Required from BIST Administration
          </span>
          <ul className={`space-y-2 text-xs p-4 rounded-2xl border ${
            theme === 'dark'
              ? 'bg-white/[0.02] border-white/5 text-slate-300'
              : 'bg-yellow-50/60 border-yellow-200 text-slate-700'
          }`}>
            {clientPlaceholders.map((ph, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>{ph}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => setIsClientNotesOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-yellow-400 hover:from-emerald-400 hover:to-yellow-300 text-slate-950 font-bold text-xs cursor-pointer shadow-sm"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
