import React, { useEffect, useState, useRef } from 'react';
import { Users, BookOpen, GraduationCap, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UNIVERSITY_INFO } from '../../data/mockData';

/**
 * The four counters published on the bist.edu.bd homepage
 * (HAPPY STUDENTS / OUR COURSES / OUR TEACHERS / AWARDS WON).
 * Counters start from a baseline so they never render as 0.
 */
export const StatsSection: React.FC = () => {
  const { language, theme } = useApp();
  const isBn = language === 'bn';

  const targets = {
    students: UNIVERSITY_INFO.stats.students,
    courses: UNIVERSITY_INFO.stats.courses,
    teachers: UNIVERSITY_INFO.stats.teachers,
    awards: UNIVERSITY_INFO.stats.awardsWon,
  };

  const baselines = {
    students: 3500,
    courses: 34,
    teachers: 45,
    awards: 35,
  };

  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState(baselines);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const steps = 30;
          const stepTime = 1600 / steps;
          let currentStep = 0;

          const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const at = (from: number, to: number) => Math.floor(from + (to - from) * progress);

            setCounts({
              students: at(baselines.students, targets.students),
              courses: at(baselines.courses, targets.courses),
              teachers: at(baselines.teachers, targets.teachers),
              awards: at(baselines.awards, targets.awards),
            });

            if (currentStep >= steps) {
              clearInterval(interval);
              setCounts(targets);
            }
          }, stepTime);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnimated]);

  const stats = [
    {
      label: isBn ? 'শিক্ষার্থী ও স্নাতক' : 'Happy Students',
      value: `${counts.students.toLocaleString()}+`,
      icon: Users,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      label: isBn ? 'চলমান কোর্স' : 'Our Courses',
      value: `${counts.courses}+`,
      icon: BookOpen,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      label: isBn ? 'শিক্ষকমণ্ডলী' : 'Our Teachers',
      value: `${counts.teachers}+`,
      icon: GraduationCap,
      color: 'text-amber-500 bg-yellow-50 border-yellow-200',
    },
    {
      label: isBn ? 'অর্জিত পুরস্কার' : 'Awards Won',
      value: `${counts.awards}+`,
      icon: Award,
      color: 'text-amber-600 bg-yellow-50 border-yellow-200',
    },
  ];

  return (
    <section ref={containerRef} className={`py-14 px-4 sm:px-6 border-y relative overflow-hidden transition-colors ${
      theme === 'dark' ? 'bg-[#050816]/95 border-white/5' : 'bg-white border-emerald-100 shadow-[0_4px_20px_-4px_rgba(5,150,105,0.04)]'
    }`}>
      {/* Subtle Background Campus Photo */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.06] dark:opacity-[0.04]">
        <img
          src="./images/campus-2.webp"
          alt="BIST campus"
          className="w-full h-full object-cover object-center filter blur-xs"
          loading="lazy"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-2 group">
              <div className={`p-2.5 rounded-xl border group-hover:scale-110 transition-transform ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`font-heading font-extrabold text-2xl sm:text-3xl tracking-tight tabular-nums ${
                theme === 'dark' ? 'text-white' : 'text-[#0b192c]'
              }`}>
                {stat.value}
              </div>
              <div className={`text-[11px] sm:text-xs font-medium leading-tight ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
