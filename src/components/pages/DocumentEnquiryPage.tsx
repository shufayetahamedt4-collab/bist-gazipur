import React, { useState } from 'react';
import {
  FileText,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Send,
  Lock,
  Info,
  Sparkles,
  ClipboardList,
  UserRound,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  DOCUMENT_REQUEST_TYPES,
  DOCUMENT_REQUEST_CHANNELS,
  DOCUMENT_REQUEST_STEPS,
  DOCUMENT_REQUEST_NOTE,
} from '../../data/mockData';
import { GrievanceChannel } from '../../types';

const iconFor = (type: GrievanceChannel['type']) => {
  switch (type) {
    case 'email':
      return Mail;
    case 'phone':
      return Phone;
    case 'address':
      return MapPin;
    default:
      return ClipboardList;
  }
};

const REQUESTER_TYPES: { value: string; label: { en: string; bn: string } }[] = [
  { value: 'Student', label: { en: 'Current student', bn: 'বর্তমান শিক্ষার্থী' } },
  { value: 'Alumni', label: { en: 'Alumnus / alumna', bn: 'প্রাক্তন শিক্ষার্থী' } },
  { value: 'Guardian', label: { en: 'Parent / guardian', bn: 'অভিভাবক' } },
  { value: 'Employer', label: { en: 'Employer / company', bn: 'নিয়োগকর্তা / প্রতিষ্ঠান' } },
  { value: 'University', label: { en: 'University / authority', bn: 'বিশ্ববিদ্যালয় / কর্তৃপক্ষ' } },
  { value: 'Other', label: { en: 'Other third party', bn: 'অন্য কোনো পক্ষ' } },
];

const DELIVERY_OPTIONS: { value: string; label: { en: string; bn: string } }[] = [
  { value: 'Collect in person', label: { en: 'Collect in person', bn: 'সশরীরে সংগ্রহ' } },
  { value: 'Email a scanned copy', label: { en: 'Email a scanned copy', bn: 'স্ক্যান কপি ইমেইলে' } },
  { value: 'Post / courier', label: { en: 'Post / courier', bn: 'ডাক / কুরিয়ার' } },
];

export const DocumentEnquiryPage: React.FC = () => {
  const { language } = useApp();
  const isBn = language === 'bn';

  const [form, setForm] = useState({
    name: '',
    requesterType: 'Alumni',
    contact: '',
    programme: '',
    identifier: '',
    documentType: DOCUMENT_REQUEST_TYPES[0].id,
    delivery: 'Collect in person',
    purpose: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const selectedDoc = DOCUMENT_REQUEST_TYPES.find((d) => d.id === form.documentType)!;
  const canSubmit =
    form.name.trim() && form.contact.trim() && form.purpose.trim() && form.programme.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    // No backend exists for this site — the request is composed as an email to the
    // office's verified address so it lands in a real inbox. Nothing is stored.
    const body = [
      `Document requested: ${selectedDoc.label.en}`,
      `Requester name: ${form.name}`,
      `Requester type: ${form.requesterType}`,
      `Contact: ${form.contact}`,
      `Programme / department: ${form.programme}`,
      `Roll / registration / student ID: ${form.identifier || '—'}`,
      `Preferred delivery: ${form.delivery}`,
      '',
      'Reason / purpose:',
      form.purpose,
    ].join('\n');
    const mailto = `mailto:${DOCUMENT_REQUEST_CHANNELS[0].value}?subject=${encodeURIComponent(
      `Document Request — ${selectedDoc.label.en} — BIST Gazipur`,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto space-y-10">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" />
          <span>{isBn ? 'ডকুমেন্ট রিকোয়েস্ট ডেস্ক' : 'Document Request Desk'}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isBn ? 'ডকুমেন্টের জন্য অনুরোধ' : 'Request a Document'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {isBn
            ? 'শিক্ষার্থী, প্রাক্তন শিক্ষার্থী, অভিভাবক, নিয়োগকর্তা বা অন্য যেকোনো পক্ষ যেকোনো অফিসিয়াল ডকুমেন্টের জন্য অনুরোধ করতে পারেন।'
            : 'Students, alumni, guardians, employers or any third party may request any official document from the institution.'}
        </p>
      </div>

      {/* Verified channels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {DOCUMENT_REQUEST_CHANNELS.map((channel) => {
          const Icon = iconFor(channel.type);
          return (
            <div
              key={channel.id}
              className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {isBn ? channel.label.bn : channel.label.en}
                </p>
                {channel.type === 'email' ? (
                  <a
                    href={`mailto:${channel.value}`}
                    className="text-sm font-semibold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 break-words"
                  >
                    {channel.value}
                  </a>
                ) : channel.type === 'phone' ? (
                  <a
                    href={`tel:${channel.value.replace(/[^+\d]/g, '')}`}
                    className="text-sm font-semibold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400"
                  >
                    {channel.value}
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-slate-900 dark:text-white break-words">
                    {channel.value}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Which documents can be requested */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 space-y-4">
        <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          {isBn ? 'যে ডকুমেন্টগুলো অনুরোধ করা যায়' : 'Documents you can request'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {DOCUMENT_REQUEST_TYPES.filter((d) => d.id !== 'other').map((doc) => (
            <div
              key={doc.id}
              className="p-3 rounded-xl bg-white/40 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 space-y-1"
            >
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {isBn ? doc.label.bn : doc.label.en}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {isBn ? doc.requirement.bn : doc.requirement.en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How a request is handled */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 space-y-4">
        <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          {isBn ? 'একটি অনুরোধ কীভাবে প্রক্রিয়া হয়' : 'How a request is handled'}
        </h2>
        <ol className="space-y-3">
          {DOCUMENT_REQUEST_STEPS.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 flex items-center justify-center text-xs font-bold shrink-0">
                {idx + 1}
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {isBn ? step.bn : step.en}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Enquiry form */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 space-y-4">
        <div className="flex items-center gap-2">
          <Send className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
            {isBn ? 'অনুরোধ ফরম' : 'Submit a document request'}
          </h2>
        </div>

        {submitted ? (
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700 dark:text-slate-200">
              {isBn
                ? 'আপনার অনুরোধটি ইমেইল অ্যাপে প্রস্তুত করা হয়েছে। অনুগ্রহ করে সেটি পাঠিয়ে নিশ্চিত করুন।'
                : 'Your request has been prepared in your email app. Please send it to complete the enquiry.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {isBn ? 'আবেদনকারীর নাম' : 'Requester name'}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  placeholder={isBn ? 'পূর্ণ নাম' : 'Full name'}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {isBn ? 'আপনি কে?' : 'You are a…'}
                </label>
                <select
                  value={form.requesterType}
                  onChange={(e) => setForm({ ...form, requesterType: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                >
                  {REQUESTER_TYPES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {isBn ? r.label.bn : r.label.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                {isBn ? 'যোগাযোগ (ইমেইল বা ফোন)' : 'Contact (email or phone)'}
              </label>
              <input
                type="text"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                placeholder={isBn ? 'যে মাধ্যমে উত্তর পেতে চান' : 'How we can reply to you'}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {isBn ? 'প্রোগ্রাম / ডিপার্টমেন্ট' : 'Programme / department'}
                </label>
                <input
                  type="text"
                  value={form.programme}
                  onChange={(e) => setForm({ ...form, programme: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  placeholder={isBn ? 'যেমন CSE, TST, AMT, FDT, BBA' : 'e.g. CSE, TST, AMT, FDT, BBA'}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {isBn ? 'রোল / রেজিস্ট্রেশন / আইডি (যদি থাকে)' : 'Roll / registration / ID (optional)'}
                </label>
                <input
                  type="text"
                  value={form.identifier}
                  onChange={(e) => setForm({ ...form, identifier: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  placeholder={isBn ? 'শনাক্তকরণ নম্বর' : 'Identifying number'}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {isBn ? 'প্রয়োজনীয় ডকুমেন্ট' : 'Document needed'}
                </label>
                <select
                  value={form.documentType}
                  onChange={(e) => setForm({ ...form, documentType: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                >
                  {DOCUMENT_REQUEST_TYPES.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {isBn ? doc.label.bn : doc.label.en}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{isBn ? selectedDoc.requirement.bn : selectedDoc.requirement.en}</span>
                </p>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {isBn ? 'কীভাবে পেতে চান' : 'Preferred delivery'}
                </label>
                <select
                  value={form.delivery}
                  onChange={(e) => setForm({ ...form, delivery: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                >
                  {DELIVERY_OPTIONS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {isBn ? d.label.bn : d.label.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                {isBn ? 'কারণ / উদ্দেশ্য' : 'Reason / purpose'}
              </label>
              <textarea
                value={form.purpose}
                onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 resize-y"
                placeholder={
                  isBn
                    ? 'ডকুমেন্টটি কী উদ্দেশ্যে প্রয়োজন তা লিখুন...'
                    : 'Explain what you need the document for...'
                }
              />
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-sm shadow-md hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span>{isBn ? 'অনুরোধ পাঠান' : 'Send request'}</span>
            </button>
          </form>
        )}
      </div>

      {/* Honest note */}
      <div className="p-5 rounded-3xl glass-panel border border-amber-300/50 dark:border-amber-500/30 space-y-2">
        <div className="flex items-center gap-2">
          <UserRound className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <h2 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
            {isBn ? 'গুরুত্বপূর্ণ তথ্য' : 'Good to know'}
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {isBn ? DOCUMENT_REQUEST_NOTE.bn : DOCUMENT_REQUEST_NOTE.en}
        </p>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
          <Lock className="w-3.5 h-3.5" />
          <span>
            {isBn
              ? 'এই ফরমটি কোনো সার্ভারে তথ্য সংরক্ষণ করে না — এটি সরাসরি আপনার ইমেইল অ্যাপ খোলে।'
              : 'This form stores nothing on a server — it opens your email app directly.'}
          </span>
        </div>
      </div>
    </div>
  );
};
