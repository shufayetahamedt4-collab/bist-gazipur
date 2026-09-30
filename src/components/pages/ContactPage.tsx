import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Building,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UNIVERSITY_INFO } from '../../data/mockData';

export const ContactPage: React.FC = () => {
  const { language } = useApp();
  const isBn = language === 'bn';

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    programInterest: 'cse',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in your name and phone number.');
      return;
    }
    setFormSubmitted(true);
  };

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5" />
          <span>{isBn ? 'যোগাযোগ ও সরাসরি ক্যাম্পাস ভিজিট' : 'Connect with Admissions'}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {isBn ? 'বিআইএসটি গাজীপুর ক্যাম্পাসে স্বাগতম' : 'Visit or Contact BIST Gazipur'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          {isBn
            ? 'ভর্তি সংক্রান্ত পরামর্শ, স্কলারশিপ যাচাই অথবা ল্যাবরেটরি পরিদর্শনের জন্য সরাসরি যোগাযোগ করুন।'
            : 'Schedule an on-campus counseling tour or talk directly to our admission advisors.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Info & Hotline Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
            <h2 className="font-heading font-bold text-lg text-white border-b border-white/10 pb-3">
              {isBn ? 'ক্যাম্পাস তথ্য ও ফোন লাইন' : 'Official Helpdesk & Lines'}
            </h2>

            <div className="space-y-4 text-xs">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">
                    {isBn ? 'ক্যাম্পাসের ঠিকানা:' : 'Campus Address:'}
                  </span>
                  <p className="text-white text-xs sm:text-sm leading-relaxed font-medium mt-0.5">
                    {isBn ? UNIVERSITY_INFO.contact.address.bn : UNIVERSITY_INFO.contact.address.en}
                  </p>
                </div>
              </div>

              {/* Admission Phone */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">
                    {isBn ? 'ভর্তি হটলাইন ও তথ্য (Admission):' : 'Admission Hotline:'}
                  </span>
                  <a
                    href={`tel:${UNIVERSITY_INFO.contact.admissionPhone}`}
                    className="text-emerald-400 text-sm font-bold font-mono hover:underline block"
                  >
                    {UNIVERSITY_INFO.contact.admissionPhone}
                  </a>
                  <span className="text-[11px] text-slate-400">
                    Direct call or WhatsApp support
                  </span>
                </div>
              </div>

              {/* Office Phone */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">
                    {isBn ? 'সাধারণ অফিস ও রেজিস্ট্রেশন (Office):' : 'General Office & Reception:'}
                  </span>
                  <a
                    href={`tel:${UNIVERSITY_INFO.contact.officePhone}`}
                    className="text-indigo-300 text-sm font-bold font-mono hover:underline block"
                  >
                    {UNIVERSITY_INFO.contact.officePhone}
                  </a>
                </div>
              </div>

              {/* Official Email */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">
                    {isBn ? 'অফিসিয়াল ইমেইল:' : 'Official Email:'}
                  </span>
                  <a
                    href={`mailto:${UNIVERSITY_INFO.contact.email}`}
                    className="text-white hover:text-cyan-400 font-medium block"
                  >
                    {UNIVERSITY_INFO.contact.email}
                  </a>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">
                    {isBn ? 'অফিস সময়সূচি:' : 'Visiting Hours:'}
                  </span>
                  <p className="text-slate-300 mt-0.5">
                    {isBn ? UNIVERSITY_INFO.contact.officeHours.bn : UNIVERSITY_INFO.contact.officeHours.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${UNIVERSITY_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  'Hello BIST Admission Office, I would like to visit the Gazipur campus.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isBn ? 'হোয়াটসঅ্যাপে সরাসরি চ্যাট করুন' : 'Chat on WhatsApp Now'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Message Form & Location Map Visual */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-5">
            <h2 className="font-heading font-bold text-lg text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <Send className="w-4 h-4 text-cyan-400" />
              <span>{isBn ? 'ভর্তি পরামর্শের জন্য মেসেজ পাঠান' : 'Send an Admission Query'}</span>
            </h2>

            {formSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-white">
                  {isBn ? 'আপনার বার্তা সফলভাবে গৃহীত হয়েছে!' : 'Inquiry Submitted Successfully!'}
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {isBn
                    ? 'আমাদের ভর্তি কাউন্সিলর অতি দ্রুত আপনার মোবাইল নম্বরে যোগাযোগ করবেন।'
                    : 'Our admission counselor will review your query and contact you within 24 hours.'}
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white text-xs hover:bg-white/15"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Your Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Asif Mahmud"
                      className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="017XXXXXXXX"
                      className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white font-mono focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="asif@gmail.com"
                      className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Program of Interest</label>
                    <select
                      value={formData.programInterest}
                      onChange={(e) => setFormData({ ...formData, programInterest: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="cse">B.Sc. in CSE (Computer Science)</option>
                      <option value="tst">B.Sc. in TST (Textile Science)</option>
                      <option value="amt">B.Sc. in AMT (Apparel Manufacture)</option>
                      <option value="fdt">B.Sc. in FDT (Fashion Design)</option>
                      <option value="bba">Bachelor of Business Administration (BBA)</option>
                      <option value="diploma">Diploma in Engineering / Textile (BTEB)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Your Message or Questions</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Ask about admission requirements, course fee, hostel facility, or scholarship tests..."
                    className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:opacity-95 text-slate-950 font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>{isBn ? 'বার্তা পাঠান' : 'Submit Admission Inquiry'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Location Interactive Visual / Map Card */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Building className="w-4 h-4 text-cyan-400" />
                <span>Chandona Chowrasta, Gazipur Campus Location</span>
              </span>
              <span className="text-slate-400 font-mono">24.0021° N, 90.3984° E</span>
            </div>

            <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-900 border border-white/5 flex items-center justify-center">
              {/* Stylized dark map illustration */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
              <div className="relative z-10 flex flex-col items-center text-center p-4 space-y-2">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/40 animate-bounce">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="font-heading font-bold text-sm text-white">
                  Unishe Tower, Mymensingh Road
                </div>
                <p className="text-[11px] text-slate-400 max-w-sm">
                  Centrally located right by Chandona Chowrasta with convenient bus and BRT transit access from Dhaka, Gazipur bypass & Joydebpur.
                </p>
                <a
                  href="https://maps.google.com/?q=Chandona+Chowrasta+Gazipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4 pt-1"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
