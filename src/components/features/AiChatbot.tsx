import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  Phone,
  MessageCircle,
  Bot,
  User,
  ExternalLink,
  GraduationCap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UNIVERSITY_INFO, PROGRAMS } from '../../data/mockData';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AiChatbot: React.FC = () => {
  const { language, isChatbotOpen, setIsChatbotOpen, navigateTo, theme } = useApp();
  const isBn = language === 'bn';

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: isBn
        ? 'আসসালামু আলাইকুম! আমি বিআইএসটি এআই ভর্তি সহকারী। ভর্তি যোগ্যতা, ১০০% পর্যন্ত স্কলারশিপ, কোর্স ফি বা যেকোনো তথ্যে আপনাকে কীভাবে সাহায্য করতে পারি?'
        : 'Welcome to BIST Gazipur! I am your AI Admission Counselor. How can I assist you today regarding courses, 100% scholarships, fee structures, or campus visits?',
      timestamp: 'Just now',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsTyping(true);

    // AI knowledge-grounded response simulator
    setTimeout(() => {
      const q = textToSend.toLowerCase();
      let reply = '';

      if (q.includes('fee') || q.includes('cost') || q.includes('খরচ') || q.includes('টাকা') || q.includes('টিউশন ফি')) {
        reply = isBn
          ? 'বিআইএসটি-তে জাতীয় বিশ্ববিদ্যালয় অধিভুক্ত ৪ বছর মেয়াদি বি.এসসি ইন সিএসই সেমিস্টার ফি ৩২,৫০০ টাকা (মোট ২,৬০,০০০ টাকা), টেক্সটাইল (টিএসটি) সেমিস্টার ফি ৩৫,০০০ টাকা (মোট ২,৮০,০০০ টাকা), অ্যাপারেল (এএমটি) ৩১,২৫০ টাকা এবং প্রফেশনাল বিবিএ ২৭,৫০০ টাকা। এসএসসি ও এইচএসসি ফলাফলের ওপর ৫০% থেকে ১০০% পর্যন্ত স্কলারশিপ সুবিধা রয়েছে।'
          : 'Under National University, semester fees are: B.Sc. in CSE (৳32,500/term, total ৳2,60,000), B.Sc. in TST (৳35,000/term, total ৳2,80,000), B.Sc. in AMT (৳31,250/term), and Professional BBA (৳27,500/term). We offer up to 100% scholarship discounts based on merit and financial need.';
      } else if (q.includes('scholarship') || q.includes('স্কলারশিপ') || q.includes('বৃত্তি') || q.includes('waiver') || q.includes('100%') || q.includes('১০০%')) {
        reply = isBn
          ? 'বিআইএসটি গভর্নিং কাউন্সিল প্রতি সেশনে ১০০ জন শিক্ষার্থীর জন্য ১০০% সম্পূর্ণ টিউশন ফি মওকুফ বৃত্তি দিয়ে থাকে। এছাড়া গোল্ডেন জিপিএ ৫.০০ প্রাপ্তদের জন্য ৬০% ওয়েভার, পলিটেকনিক ডিপ্লোমা শিক্ষার্থীদের জন্য ৪০% ওয়েভার এবং নারী, শারীরিক প্রতিবন্ধী ও ক্ষুদ্র নৃগোষ্ঠীর জন্য বিশেষ ৫০%–৭৫% সহায়তা রয়েছে।'
          : 'BIST offers full 100% scholarships for 100 deserving students each academic session through a dedicated scholarship examination. In addition, candidates with GPA 5.00 receive a 60% merit waiver, Polytechnic diploma holders receive a 40% waiver, and special affirmative quotas provide 50%–75% assistance.';
      } else if (q.includes('diploma') || q.includes('ডিপ্লোমা') || q.includes('polytechnic') || q.includes('পলিটেকনিক')) {
        reply = isBn
          ? 'হ্যাঁ! কারিগরি শিক্ষা বোর্ডের অধীনে যে কোনো পলিটেকনিক ইনস্টিটিউট থেকে ৪ বছর মেয়াদি ডিপ্লোমা সম্পন্ন শিক্ষার্থীরা সরাসরি বি.এসসি (অনার্স) ইঞ্জিনিয়ারিং (সিএসই, টিএসটি, এএমটি ও এফডিটি) কোর্সে ভর্তি হতে পারেন। ডিপ্লোমা শিক্ষার্থীদের জন্য কোর্স ফির ওপর বিশেষ ৪০% ছাড় ও সুবিধাজনক শিফট রয়েছে।'
          : 'Yes! Polytechnic Diploma in Engineering holders from BTEB can enroll directly into 4-year B.Sc. (Hons.) Engineering degrees (CSE, TST, AMT, FDT) with 40% lateral fee waivers and credit transfer allowances.';
      } else if (q.includes('location') || q.includes('address') || q.includes('কোথায়') || q.includes('ঠিকানা') || q.includes('ক্যাম্পাস') || q.includes('phone') || q.includes('contact') || q.includes('নম্বর')) {
        reply = isBn
          ? `বিআইএসটি গাজীপুর ক্যাম্পাসের ঠিকানা: উনিশে টাওয়ার, ময়মনসিংহ রোড, চান্দনা চৌরাস্তা, গাজীপুর-১৭০২। ভর্তি হটলাইন: ${UNIVERSITY_INFO.contact.admissionPhone}, সাধারণ অফিস: ${UNIVERSITY_INFO.contact.officePhone}, ইমেইল: ${UNIVERSITY_INFO.contact.email}। আপনি যে কোনো দিন সকাল ৮:৩০ থেকে বিকাল ৫:৩০ পর্যন্ত সরাসরি ক্যাম্পাস পরিদর্শন করতে পারেন।`
          : `BIST Gazipur Campus is located at: Unishe Tower, Mymensingh Road, Chandona Chowrasta, Gazipur-1702. Admission Hotline: ${UNIVERSITY_INFO.contact.admissionPhone}, Office: ${UNIVERSITY_INFO.contact.officePhone}, Email: ${UNIVERSITY_INFO.contact.email}. Visiting hours: Sat-Thu 8:30 AM - 5:30 PM.`;
      } else if (q.includes('apply') || q.includes('ভর্তি') || q.includes('how to')) {
        reply = isBn
          ? 'ভর্তির জন্য আপনি আমাদের ওয়েবসাইটের "ভর্তি আবেদন" মেনু থেকে এখনই সরাসরি অনলাইনে ফরম পূরণ করতে পারেন অথবা প্রয়োজনীয় কাগজপত্রসহ ক্যাম্পাসের ভর্তি ডেস্কে উপস্থিত হতে পারেন।'
          : 'You can apply directly via our online multi-step application form right here on the portal, or visit our central campus counseling booth at Chandona Chowrasta Gazipur.';
      } else {
        reply = isBn
          ? 'ধন্যবাদ আপনার বার্তার জন্য। বিআইএসটি-এর জাতীয় বিশ্ববিদ্যালয় অনুমোদিত বি.এসসি ও বিবিএ কোর্স এবং কারিগরি বোর্ডের ডিপ্লোমা ইঞ্জিনিয়ারিং বিষয়ে যেকোনো সুনির্দিষ্ট তথ্য জানতে অনুগ্রহ করে প্রশ্ন করুন, অথবা আমাদের ভর্তি হটলাইনে ০১9১৩-৫৫৫১১১ নম্বরে কথা বলুন।'
          : 'Thank you for inquiring. BIST Gazipur offers National University affiliated Honours degrees in CSE, TST, AMT, FDT, and BBA, as well as BTEB Diplomas. For personalized admission counseling, please call our hotline at 01913-555111 or chat on WhatsApp.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  if (!isChatbotOpen) return null;

  return (
    <div className={`fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 w-[94vw] sm:w-[400px] h-[550px] max-h-[85vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden animate-fadeIn backdrop-blur-2xl ${
      theme === 'dark'
        ? 'bg-[#070b1a]/95 border-emerald-500/40 glow-green text-white'
        : 'bg-white/95 border-emerald-200 shadow-[0_20px_60px_rgba(5,150,105,0.15)] text-slate-900'
    }`}>
      {/* Header */}
      <div className="p-4 bg-[#0b192c] border-b border-emerald-900/50 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0b192c]" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
              <span>BIST AI Admission Guide</span>
            </h3>
            <span className="text-[10px] text-emerald-300 font-medium">
              {isBn ? 'বাংলা ও ইংরেজিতে সার্বক্ষণিক সহায়তা' : 'Bilingual 24/7 Smart Assistant'}
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsChatbotOpen(false)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] ${
                m.sender === 'user'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-yellow-100 text-yellow-900 border border-yellow-300'
              }`}
            >
              {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5 text-emerald-700" />}
            </div>

            <div
              className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none'
                  : theme === 'dark'
                  ? 'bg-white/[0.08] border border-white/10 text-slate-200 rounded-tl-none'
                  : 'bg-emerald-50/80 border border-emerald-200 text-slate-800 rounded-tl-none'
              }`}
            >
              <p>{m.text}</p>
              <span className={`text-[9px] block mt-1 font-mono text-right ${
                m.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'
              }`}>
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-500 text-xs pl-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></span>
            <span className="text-[11px] font-mono">BIST AI is analyzing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className={`px-4 py-2 border-t flex items-center gap-1.5 overflow-x-auto no-scrollbar ${
        theme === 'dark' ? 'border-white/10 bg-black/20' : 'border-emerald-100 bg-emerald-50/40'
      }`}>
        {[
          { label: isBn ? 'কোর্স ফি কত?' : 'Tuition Fee?', query: 'What is the tuition fee?' },
          { label: isBn ? '১০০% স্কলারশিপ?' : '100% Scholarship?', query: 'How to get 100% scholarship?' },
          { label: isBn ? 'ডিপ্লোমা ভর্তি?' : 'Diploma Entry?', query: 'Can polytechnic diploma students apply?' },
          { label: isBn ? 'ক্যাম্পাস কোথায়?' : 'Location & Phone?', query: 'Where is the campus located?' },
        ].map((btn, i) => (
          <button
            key={i}
            onClick={() => handleSend(btn.query)}
            className={`px-2.5 py-1 rounded-full border text-[10px] whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
              theme === 'dark'
                ? 'bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border-white/10'
                : 'bg-white hover:bg-emerald-100 text-emerald-800 border-emerald-200'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Fallback to Human Admission Officer */}
      <div className={`px-4 py-2 border-t flex items-center justify-between text-[11px] ${
        theme === 'dark' ? 'bg-[#0b192c] border-emerald-900/50 text-slate-300' : 'bg-emerald-50 border-emerald-200 text-slate-700'
      }`}>
        <span className="font-medium">{isBn ? 'কাউন্সিলরের সাথে কথা বলুন:' : 'Need human counselor?'}</span>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${UNIVERSITY_INFO.contact.admissionPhone}`}
            className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 hover:underline font-bold"
          >
            <Phone className="w-3 h-3" />
            <span>Call</span>
          </a>
          <span className="text-slate-400">|</span>
          <a
            href={`https://wa.me/${UNIVERSITY_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 hover:underline font-bold"
          >
            <MessageCircle className="w-3 h-3" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Input box */}
      <div className={`p-3 border-t flex items-center gap-2 ${
        theme === 'dark' ? 'border-white/10 bg-black/40' : 'border-emerald-100 bg-white'
      }`}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={isBn ? 'ভর্তি সম্পর্কে যেকোনো প্রশ্ন লিখুন...' : 'Ask about admission, fees, rules...'}
          className={`flex-1 px-3 py-2 rounded-xl text-xs border transition-colors focus:outline-none ${
            theme === 'dark'
              ? 'bg-black/50 border-white/10 text-white placeholder-slate-500 focus:border-emerald-500'
              : 'bg-slate-50 border-emerald-200 text-slate-900 placeholder-slate-400 focus:border-emerald-500'
          }`}
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-yellow-400 text-slate-950 disabled:opacity-40 transition-all cursor-pointer shrink-0 shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
