import React from 'react';
import { Sparkles, Compass, Briefcase, HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WhyChooseSection: React.FC = () => {
  const { language, navigateTo, theme } = useApp();
  const isBn = language === 'bn';

  const cards = [
    {
      id: 'flexibility',
      title: isBn ? 'একাডেমিক নমনীয়তা ও আধুনিক পাঠ্যক্রম' : 'Academic Flexibility & Modern Syllabi',
      icon: Compass,
      image: './images/dept-cse.jpg',
      color: 'from-emerald-500/20 to-emerald-500/5',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      iconColor: 'text-emerald-600',
      subtitle: isBn ? 'শিল্পের চাহিদানুযায়ী আপডেট পাঠ্যক্রম' : 'Industry-Aligned Tech Syllabi',
      description: isBn
        ? 'পলিটেকনিক ডিপ্লোমা শিক্ষার্থীদের জন্য সরাসরি বি.এসসি ইঞ্জিনিয়ারিং ভর্তির সুযোগ, বিশেষ সান্ধ্যকালীন শিফট, এবং চতুর্থ শিল্পবিপ্লবের (4IR) আধুনিক এআই ও অটোমেশন কেন্দ্রিক কারিকুলাম।'
        : 'Smooth credit-transfer pathways for Polytechnic Diploma graduates directly into B.Sc. Engineering, flexible shifts, and updated Industry 4.0 modules covering AI, automation, and sustainable production.',
      points: [
        isBn ? 'ডিপ্লোমা টু ডিগ্রি ক্রেডিট ট্রান্সফার সুবিধা' : 'Direct Diploma-to-Degree credit transfer',
        isBn ? 'কর্মজীবী শিক্ষার্থীদের জন্য নমনীয় শিডিউল' : 'Flexible schedules & weekend mentor access',
        isBn ? 'নিয়মিত সিলেবাস আপডেট ও রিসার্চ প্রজেক্ট' : 'Annual curriculum review with corporate advisory',
      ],
    },
    {
      id: 'career',
      title: isBn ? 'নিশ্চিত ক্যারিয়ার ও প্লেসমেন্ট সহায়তা' : 'Superior Career & Industrial Placement',
      icon: Briefcase,
      image: './images/gallery/g08.jpeg',
      color: 'from-yellow-500/20 to-yellow-500/5',
      badgeColor: 'text-amber-800 bg-yellow-50 border-yellow-200',
      iconColor: 'text-amber-600',
      subtitle: isBn ? 'গাজীপুর শিল্প এলাকার কেন্দ্রস্থলে অবস্থান' : 'At the Heart of Bangladesh Industry',
      description: isBn
        ? 'দেশের প্রধান টেক্সটাইল ও প্রযুক্তি হাব গাজীপুরে অবস্থিত হওয়ায় শিক্ষার্থীরা শীর্ষস্থানীয় ৪৪০+ কারখানা, সফটওয়্যার প্রতিষ্ঠান ও বায়িং হাউসে সরাসরি ইন্টার্নশিপ ও চাকরির সুযোগ পান।'
        : 'Strategically located in Chandona Chowrasta, Gazipur — the industrial heartland of Bangladesh — giving students direct access to internships and recruitment at nearby garment factories, buying houses and tech companies.',
      points: [
        isBn ? 'শিক্ষার্থীদের জন্য নিয়মিত ক্যারিয়ার প্লেসমেন্ট ও ইন্টার্নশিপ সহায়তা' : 'Dedicated career placement and internship support for graduating students',
        isBn ? 'ক্যাম্পাসে বিডিজবস ও ক্যারিয়ার ফেয়ার আয়োজন' : 'Annual BDjobs Campus Placement Summit',
        isBn ? 'সরাসরি করপোরেট ইন্টার্নশিপ ও মেন্টরশিপ' : '12-week mandatory industry internship placement',
      ],
    },
    {
      id: 'holistic',
      title: isBn ? 'কেবল শিক্ষার চেয়েও বেশি—পূর্ণাঙ্গ বিকাশ' : 'More Than an Education—Holistic Growth',
      icon: HeartHandshake,
      image: './images/gallery/g12.jpg',
      color: 'from-emerald-500/20 to-yellow-500/10',
      badgeColor: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      iconColor: 'text-emerald-600',
      subtitle: isBn ? '১০০% স্কলারশিপ ও নেতৃত্ব বিকাশ' : '100% Scholarships & Student Clubs',
      description: isBn
        ? 'মেধা ও আর্থিক অসচ্ছলতার ভিত্তিতে ১০০ জন শিক্ষার্থীর শতভাগ স্কলারশিপ, রোবোটিক্স ক্লাব, টেক্সটাইল ফ্যাশন সোসাইটি, সাংস্কৃতিক সংগঠন এবং নারী ও প্রতিবন্ধী শিক্ষার্থীদের বিশেষ সহায়তা।'
        : '100 full scholarships for deserving talents every cohort, active student-led innovation clubs (Robotics, Textile Society, Programming Club), and dedicated affirmative action quotas.',
      points: [
        isBn ? '১০০ জন শিক্ষার্থীর জন্য ১০০% পূর্ণাঙ্গ ওয়েভার' : '100 full tuition waivers awarded annually',
        isBn ? 'অ্যাক্টিভ টেক্সটাইল, কোডিং ও স্পোর্টস ক্লাব' : 'Active clubs: Robotics, Textile Society, Sports',
        isBn ? 'ক্ষুদ্র নৃগোষ্ঠী ও বিশেষ চাহিদাসম্পন্নদের কোটা' : 'Special scholarships for minority & disabled students',
      ],
    },
  ];

  return (
    <section className={`py-20 px-4 sm:px-6 relative transition-colors ${
      theme === 'dark' ? 'bg-[#050816]/50' : 'bg-white'
    }`}>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            theme === 'dark'
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isBn ? 'কেন বিআইএসটি সেরা?' : 'The BIST Advantage'}</span>
          </div>

          <h2 className={`font-heading text-3xl sm:text-4xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
          }`}>
            {isBn ? 'কেন বিআইএসটি-কে বেছে নেবেন আপনার উচ্চশিক্ষায়?' : 'Why Choose BIST Gazipur?'}
          </h2>

          <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            {isBn
              ? 'ব্যবহারিক প্রযুক্তি, আন্তর্জাতিক কারিকুলাম এবং বাস্তব ক্যারিয়ার গড়ার অনন্য প্রতিশ্রুতি।'
              : 'Empowering pragmatic skills, industry connections, and lifelong leadership.'}
          </p>
        </div>

        {/* Three Interactive Cards with Visual Header Photos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`group rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${
                theme === 'dark'
                  ? 'glass-panel-dark hover:border-emerald-500/40 shadow-xl'
                  : 'bg-white/95 border-emerald-100 hover:border-emerald-300 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
              }`}
            >
              <div>
                {/* Visual Card Image Banner */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex items-end p-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                        <card.icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-white drop-shadow-sm">
                        {card.subtitle}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className={`font-heading font-bold text-xl transition-colors ${
                    theme === 'dark' ? 'text-white group-hover:text-emerald-700 dark:hover:text-emerald-300' : 'text-[#0b192c] group-hover:text-emerald-700'
                  }`}>
                    {card.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {card.description}
                  </p>

                  <div className={`space-y-2 pt-3 border-t ${
                    theme === 'dark' ? 'border-white/10' : 'border-emerald-100'
                  }`}>
                    {card.points.map((pt, idx) => (
                      <div key={idx} className={`flex items-start gap-2 text-xs ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          theme === 'dark' ? 'text-emerald-600 dark:text-emerald-400' : 'text-emerald-600'
                        }`} />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => navigateTo('admissions')}
                  className={`text-xs font-bold flex items-center gap-1 group/btn cursor-pointer ${
                    theme === 'dark'
                      ? 'text-yellow-400 hover:text-yellow-300'
                      : 'text-emerald-700 hover:text-emerald-900'
                  }`}
                >
                  <span>{isBn ? 'বিস্তারিত জানুন' : 'Learn More'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
