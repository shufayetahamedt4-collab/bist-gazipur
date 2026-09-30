import React, { useState } from 'react';
import { Sparkles, X, CheckCircle2, ArrowRight, BookOpen, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PROGRAMS } from '../../data/mockData';

export const ProgramFinderQuiz: React.FC = () => {
  const { language, isQuizOpen, setIsQuizOpen, navigateTo, theme } = useApp();
  const isBn = language === 'bn';

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [recommendedProgId, setRecommendedProgId] = useState<string | null>(null);

  const questions = [
    {
      question: isBn
        ? '১. আপনি সাধারণত কোন ধরনের সমস্যা সমাধান করতে সবচেয়ে বেশি আনন্দ পান?'
        : '1. Which kind of problems excite you the most when learning or building?',
      options: [
        { text: isBn ? 'কোডিং, মোবাইল অ্যাপ, এআই এবং সফটওয়্যার তৈরি' : 'Writing software, AI algorithms, and digital systems', dept: 'cse' },
        { text: isBn ? 'টেক্সটাইল প্রযুক্তি, স্মার্ট সুতা এবং বৃহৎ শিল্প কারখানা পরিচালনা' : 'Smart textiles, yarn spinning, and manufacturing operations', dept: 'tst' },
        { text: isBn ? 'পোশাকের আধুনিক কাট, ক্যাড প্যাটার্ন ও মার্কার ইঞ্জিনিয়ারিং' : 'Garments engineering, automated apparel CAD, and production lines', dept: 'amt' },
        { text: isBn ? 'পোশাকের নান্দনিক ডিজাইন, কালার থিওরি এবং ফ্যাশন রানওয়ে' : 'Creative runway fashion, digital illustration, and luxury couture', dept: 'fdt' },
        { text: isBn ? 'ব্যবসা পরিচালনা, ফাইন্যান্স, মার্কেটিং ও আন্তর্জাতিক সাপ্লাই চেইন' : 'Corporate leadership, financial planning, marketing, and logistics', dept: 'bba' },
      ],
    },
    {
      question: isBn
        ? '২. ভবিষ্যতের পেশাগত জীবনে আপনি নিজেকে কোন ভূমিকায় দেখতে চান?'
        : '2. In which executive role do you envision yourself 5 years post-graduation?',
      options: [
        { text: isBn ? 'সফটওয়্যার আর্কিটেক্ট বা ক্লাউড ও সাইবার সিকিউরিটি ইঞ্জিনিয়ার' : 'Chief Software Engineer / DevOps Architect', dept: 'cse' },
        { text: isBn ? 'টেক্সটাইল মিলের টেকনিক্যাল হেড বা কোয়ালিটি ডিরেক্টর' : 'Textile Production Head / Sustainable Dyeing Technologist', dept: 'tst' },
        { text: isBn ? 'গার্মেন্টস বায়িং হাউস মার্চেন্ডাইজার বা প্রোডাকশন ম্যানেজার (PM)' : 'Apparel Merchandiser / Industrial Engineering (IE) Lead', dept: 'amt' },
        { text: isBn ? 'ফ্যাশন ব্র্যান্ডের চিফ ডিজাইনার অথবা নিজস্ব বুটিক ব্র্যান্ডের প্রতিষ্ঠাতা' : 'Creative Fashion Director or Independent Label Founder', dept: 'fdt' },
        { text: isBn ? 'করপোরেট ব্যাংক ম্যানেজার, সিএফও বা গ্লোবাল সাপ্লাই চেইন অফিসার' : 'Corporate Branch Manager, Financial Analyst, or Growth Lead', dept: 'bba' },
      ],
    },
    {
      question: isBn
        ? '৩. কোন বিষয়ের ব্যবহারিক ল্যাবরেটরিতে কাজ করতে আপনি সবচেয়ে বেশি আগ্রহী?'
        : '3. Which hands-on laboratory environment inspires you most?',
      options: [
        { text: isBn ? 'উচ্চক্ষমতাসম্পন্ন কম্পিউটার, সার্ভার ও রোবোটিক্স ল্যাব' : 'High-performance AI workstation & network testing labs', dept: 'cse' },
        { text: isBn ? 'ভারী টেক্সটাইল লুম, নিটিং মেশিন ও টেক্সটাইল রসায়ন ল্যাব' : 'Heavy circular weaving looms & chemical dyeing laboratories', dept: 'tst' },
        { text: isBn ? 'গার্মেন্টস কাটিং ও ডিজিটাল ক্যাড/ক্যাম মার্কার প্লটার' : 'Garment CAD digitizers, automated cutting & sewing floors', dept: 'amt' },
        { text: isBn ? 'ফ্যাশন ইলাস্ট্রেশন স্টুডিও, ড্রেপিং ও সারফেস আর্ট ল্যাব' : 'Couture draping mannequins, batik styling & runway halls', dept: 'fdt' },
        { text: isBn ? 'বিজনেস সিমুলেশন, ডেটা অ্যানালিটিক্স ও করপোরেট কনফারেন্স' : 'Business analytics suite and corporate negotiation halls', dept: 'bba' },
      ],
    },
  ];

  const handleSelectOption = (dept: string) => {
    const nextAnswers = [...answers, dept];
    setAnswers(nextAnswers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const counts: { [key: string]: number } = {};
      nextAnswers.forEach((a) => {
        counts[a] = (counts[a] || 0) + 1;
      });
      let highestDept = 'cse';
      let maxCount = 0;
      Object.keys(counts).forEach((key) => {
        if (counts[key] > maxCount) {
          maxCount = counts[key];
          highestDept = key;
        }
      });
      setRecommendedProgId(highestDept);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setRecommendedProgId(null);
  };

  if (!isQuizOpen) return null;

  const matchedProgram = PROGRAMS.find((p) => p.id === recommendedProgId) || PROGRAMS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-lg rounded-3xl border p-6 sm:p-8 shadow-2xl space-y-6 ${
        theme === 'dark'
          ? 'bg-[#0a0f24] border-emerald-500/40 text-white'
          : 'bg-white border-emerald-200 text-slate-900 shadow-[0_20px_60px_rgba(5,150,105,0.15)]'
      }`}>
        <button
          onClick={() => setIsQuizOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!recommendedProgId ? (
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-emerald-600 font-bold font-mono">
                <span>Program Finder Quiz</span>
                <span>Question {currentQuestion + 1} of {questions.length}</span>
              </div>
              <h3 className="font-heading font-bold text-lg">
                {questions[currentQuestion].question}
              </h3>
            </div>

            <div className="space-y-2.5">
              {questions[currentQuestion].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectOption(opt.dept)}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between group ${
                    theme === 'dark'
                      ? 'bg-white/[0.04] hover:bg-emerald-500/10 border-white/10 hover:border-emerald-500/40 text-slate-200 hover:text-white'
                      : 'bg-slate-50 hover:bg-emerald-50/80 border-emerald-100 hover:border-emerald-300 text-slate-800 hover:text-emerald-950'
                  }`}
                >
                  <span>{opt.text}</span>
                  <ArrowRight className="w-4 h-4 text-emerald-600 opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-5 animate-fadeIn">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-300">
              <Sparkles className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-emerald-600 font-bold tracking-wider block">
                Your Ideal Academic Match
              </span>
              <h2 className="font-heading font-extrabold text-2xl">
                {isBn ? matchedProgram.title.bn : matchedProgram.title.en}
              </h2>
              <p className={`text-xs max-w-sm mx-auto leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {isBn ? matchedProgram.overview.bn : matchedProgram.overview.en}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border text-xs font-mono ${
              theme === 'dark' ? 'bg-white/[0.04] border-white/10 text-slate-300' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}>
              Duration: 4 Years · 8 Semesters · National University Affiliated
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  setIsQuizOpen(false);
                  navigateTo('department-detail', matchedProgram.id);
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold text-xs transition-colors cursor-pointer"
              >
                View Syllabus & Labs
              </button>
              <button
                onClick={() => {
                  setIsQuizOpen(false);
                  navigateTo('apply-online');
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-yellow-400 hover:from-emerald-400 hover:to-yellow-300 text-slate-950 font-bold text-xs shadow transition-all cursor-pointer"
              >
                Apply for this Degree
              </button>
            </div>

            <button
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-emerald-700 inline-flex items-center gap-1 pt-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Retake Quiz</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
