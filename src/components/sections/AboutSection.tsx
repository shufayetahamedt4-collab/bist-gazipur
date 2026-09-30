import React from 'react';
import { ArrowRight, Cpu, FlaskConical, Layers, Monitor, Sparkles, Building2, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutSection: React.FC = () => {
  const { language, navigateTo, theme } = useApp();
  const isBn = language === 'bn';

  const labsList = [
    { name: isBn ? 'কম্পিউটার ও এআই ল্যাব' : 'Advanced Computer & AI Lab', icon: Monitor },
    { name: isBn ? 'টেক্সটাইল টেস্টিং ও ফ্লোর' : 'Textile Testing & Loom Floor', icon: Layers },
    { name: isBn ? 'ডিজিটাল ইলেকট্রনিক্স ও আইওটি' : 'Digital Electronics & Microprocessor', icon: Cpu },
    { name: isBn ? 'পদার্থ ও রসায়ন গবেষণাগার' : 'Physics & Applied Chemistry Labs', icon: FlaskConical },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Grid */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-4/3 group border border-emerald-100">
                  <img
                    src="/images/dept-cse.jpg"
                    alt="BIST Computer and AI Lab"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                    <span className="text-xs font-semibold text-white">
                      {isBn ? 'কম্পিউটার ও আইওটি ল্যাব' : 'Computer & IoT Lab'}
                    </span>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-square group border border-emerald-100">
                  <img
                    src="/images/dept-fdt.webp"
                    alt="Apparel CAD Design Floor"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                    <span className="text-xs font-semibold text-white">
                      {isBn ? 'অ্যাপারেল ডিজাইন ও ক্যাড' : 'Apparel CAD Studio'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-square group border border-emerald-100">
                  <img
                    src="/images/dept-tst.webp"
                    alt="Textile Machinery Floor"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                    <span className="text-xs font-semibold text-white">
                      {isBn ? 'হেভি টেক্সটাইল লুম ফ্লোর' : 'Textile Loom Floor'}
                    </span>
                  </div>
                </div>

                {/* Growth Metric Box */}
                <div className={`p-5 rounded-2xl border flex flex-col justify-center transition-colors ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-emerald-950/60 to-slate-900/60 border-emerald-500/30'
                    : 'bg-gradient-to-br from-emerald-50 via-white to-yellow-50/80 border-emerald-200/90 shadow-md'
                }`}>
                  <div className={`text-2xl sm:text-3xl font-heading font-extrabold ${
                    theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
                  }`}>
                    60 <span className="text-emerald-600">→</span> 5,000+
                  </div>
                  <p className={`text-xs mt-1 leading-relaxed ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {isBn
                      ? 'মাত্র ৬০ জন শিক্ষার্থী নিয়ে শুরু করে আজ ৫,০০০+ দক্ষ স্নাতকের আস্থার ঠিকানা।'
                      : 'From humble beginnings with 60 students to 5,000+ engineers, innovators & entrepreneurs.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>{isBn ? 'বিআইএসটি পরিচিতি' : 'Welcome to BIST Gazipur'}</span>
            </div>

            <h2 className={`font-heading text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
            }`}>
              {isBn ? (
                <>
                  বাংলাদেশের প্রধান শিল্প বলয়ে{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500">
                    আন্তর্জাতিক মানের
                  </span>{' '}
                  প্রকৌশল ও কারিগরি শিক্ষা
                </>
              ) : (
                <>
                  Engineering Excellence in the{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500">
                    Industrial Epicenter
                  </span>{' '}
                  of Bangladesh
                </>
              )}
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {isBn
                ? '২০০৭ সালে প্রতিষ্ঠিত বিজিআইএফটি ইনস্টিটিউট অব সায়েন্স অ্যান্ড টেকনোলজি (বিআইএসটি) গাজীপুরের চান্দনা চৌরাস্তায় অবস্থিত একটি অগ্রগামী উচ্চশিক্ষা প্রতিষ্ঠান। মাত্র ৬০ জন শিক্ষার্থী নিয়ে যাত্রা শুরু করা প্রতিষ্ঠানটি আজ পাঁচ সহস্রাধিক শিক্ষার্থীর পাঠদানের কেন্দ্রবিন্দু।'
                : 'BGIFT Institute of Science & Technology (BIST) stands tall in the industrial hub of Gazipur at Chandona Chowrasta. Originating with an inaugural cohort of 60 motivated students, BIST now empowers over 5,000 enrolled engineers, managers, and designers.'}
            </p>

            <p className={`text-xs sm:text-sm leading-relaxed ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {isBn
                ? 'আমাদের রয়েছে নিজস্ব স্বয়ংসম্পূর্ণ কম্পিউটার ল্যাব, ডিজিটাল ল্যাব, পদার্থ ও রসায়ন ল্যাবরেটরি, টেক্সটাইল টেস্টিং ল্যাব এবং ইন্ডাস্ট্রিয়াল মেশিনারি স্টোর—যা শিক্ষার্থীদের পাঠ্যপুস্তকের তাত্ত্বিক জ্ঞানের পাশাপাশি সরাসরি শিল্পকারখানার বাস্তব কাজের জন্য প্রস্তুত করে।'
                : 'Our sprawling academic floors house specialized computer & AI rigs, heavy textile testing workshops, digital microprocessor facilities, chemistry suites, and machine stores matching the highest contemporary industry standards.'}
            </p>

            {/* Labs highlight pill list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {labsList.map((lab, i) => (
                <div key={i} className={`flex items-center gap-2.5 text-xs ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                    <lab.icon className="w-3.5 h-3.5" />
                  </div>
                  <span>{lab.name}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={() => navigateTo('about')}
                className={`px-5 py-2.5 rounded-xl font-heading font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                  theme === 'dark'
                    ? 'text-white bg-white/10 hover:bg-white/15 border border-white/10'
                    : 'text-slate-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 shadow-sm'
                }`}
              >
                <span>{isBn ? 'আরও বিস্তারিত জানুন' : 'Know More About Us'}</span>
                <ArrowRight className="w-4 h-4 text-emerald-600" />
              </button>
              <button
                onClick={() => navigateTo('facilities')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-colors"
              >
                {isBn ? 'ল্যাবরেটরি ট্যুর →' : 'Explore All Labs & Facilities →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
