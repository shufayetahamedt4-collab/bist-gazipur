import React, { useState } from 'react';
import {
  ShieldAlert,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Send,
  Lock,
  Info,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GRIEVANCE_CHANNELS, GRIEVANCE_STEPS, GRIEVANCE_POLICY_NOTE } from '../../data/mockData';
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
      return ShieldAlert;
  }
};

export const GrievancePage: React.FC = () => {
  const { language } = useApp();
  const isBn = language === 'bn';

  const [form, setForm] = useState({ name: '', contact: '', category: 'Harassment', detail: '' });
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = form.name.trim() && form.contact.trim() && form.detail.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    // No backend exists for this site — the complaint is composed as an email to
    // the verified principal address so it reaches a real, published channel.
    const body = `Name: ${form.name}\nContact: ${form.contact}\nCategory: ${form.category}\n\n${form.detail}`;
    const mailto = `mailto:${GRIEVANCE_CHANNELS[0].value}?subject=${encodeURIComponent(
      'Grievance / Complaint — BIST Gazipur',
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto space-y-10">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-400 text-xs font-semibold">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>{isBn ? 'অভিযোগ ও অ্যান্টি-হ্যারাসমেন্ট সেল' : 'Grievance & Anti-Harassment Cell'}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isBn ? 'অভিযোগ ও অ্যান্টি-হ্যারাসমেন্ট সেল' : 'Grievance & Anti-Harassment Cell'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {isBn
            ? 'নিরাপদ ও গোপনীয়ভাবে অভিযোগ জানানোর যাচাইকৃত মাধ্যম।'
            : 'Verified channels for raising a complaint safely and confidentially.'}
        </p>
      </div>

      {/* Reporting channels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {GRIEVANCE_CHANNELS.map((channel) => {
          const Icon = iconFor(channel.type);
          return (
            <div
              key={channel.id}
              className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-2xl bg-rose-500/10 text-rose-700 dark:text-rose-400 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {isBn ? channel.label.bn : channel.label.en}
                </p>
                {channel.type === 'email' ? (
                  <a
                    href={`mailto:${channel.value}`}
                    className="text-sm font-semibold text-slate-900 dark:text-white hover:text-rose-600 dark:hover:text-rose-400 break-words"
                  >
                    {channel.value}
                  </a>
                ) : channel.type === 'phone' ? (
                  <a
                    href={`tel:${channel.value.replace(/[^+\d]/g, '')}`}
                    className="text-sm font-semibold text-slate-900 dark:text-white hover:text-rose-600 dark:hover:text-rose-400"
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

      {/* How it works */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 space-y-4">
        <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          {isBn ? 'অভিযোগ কীভাবে প্রক্রিয়া হয়' : 'How a complaint is handled'}
        </h2>
        <ol className="space-y-3">
          {GRIEVANCE_STEPS.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-400 flex items-center justify-center text-xs font-bold shrink-0">
                {idx + 1}
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {isBn ? step.bn : step.en}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Form */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 space-y-4">
        <div className="flex items-center gap-2">
          <Send className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
            {isBn ? 'অভিযোগ ফরম' : 'Submit a complaint'}
          </h2>
        </div>

        {submitted ? (
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700 dark:text-slate-200">
              {isBn
                ? 'আপনার ইমেইল অ্যাপে অভিযোগটি প্রস্তুত করা হয়েছে। অনুগ্রহ করে সেটি পাঠিয়ে নিশ্চিত করুন।'
                : 'Your complaint has been prepared in your email app. Please send it to complete the submission.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {isBn ? 'আপনার নাম' : 'Your name'}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
                  placeholder={isBn ? 'পূর্ণ নাম' : 'Full name'}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {isBn ? 'যোগাযোগ (ইমেইল বা ফোন)' : 'Contact (email or phone)'}
                </label>
                <input
                  type="text"
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
                  placeholder={isBn ? 'যোগাযোগের মাধ্যম' : 'How we can reach you'}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                {isBn ? 'অভিযোগের ধরন' : 'Type of complaint'}
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
              >
                <option>Harassment</option>
                <option>Academic</option>
                <option>Examination</option>
                <option>Financial</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                {isBn ? 'বিস্তারিত' : 'Details'}
              </label>
              <textarea
                value={form.detail}
                onChange={(e) => setForm({ ...form, detail: e.target.value })}
                rows={5}
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-rose-500 resize-y"
                placeholder={isBn ? 'ঘটনার বিবরণ লিখুন...' : 'Describe what happened...'}
              />
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-sm shadow-md hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span>{isBn ? 'অভিযোগ পাঠান' : 'Send complaint'}</span>
            </button>
          </form>
        )}
      </div>

      {/* Honest policy note */}
      <div className="p-5 rounded-3xl glass-panel border border-amber-300/50 dark:border-amber-500/30 space-y-2">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <h2 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
            {isBn ? 'গোপনীয়তা ও নীতিমালা' : 'Confidentiality & policy'}
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {isBn ? GRIEVANCE_POLICY_NOTE.bn : GRIEVANCE_POLICY_NOTE.en}
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
