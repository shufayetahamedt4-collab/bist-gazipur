import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { PrincipalMessage } from '../sections/PrincipalMessage';
import { AdmissionHighlight } from '../sections/AdmissionHighlight';
import { TrustBar } from '../sections/TrustBar';
import { AboutSection } from '../sections/AboutSection';
import { StatsSection } from '../sections/StatsSection';
import { ProgramExplorer } from '../sections/ProgramExplorer';
import { WhyChooseSection } from '../sections/WhyChooseSection';
import { FacultySection } from '../sections/FacultySection';
import { OfficersSection } from '../sections/OfficersSection';
import { NoticeBoardSection } from '../sections/NoticeBoardSection';
import { EventsSection } from '../sections/EventsSection';
import { ProjectsPartnersMarquee } from '../sections/ProjectsPartnersMarquee';
import { CareerSection } from '../sections/CareerSection';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import { LatestNewsSection } from '../sections/LatestNewsSection';
import { CtaBand } from '../sections/CtaBand';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* 1. HERO WITH HIGH VISIBILITY BACKGROUND CAMPUS IMAGE & 2-SEC WAVE EFFECT */}
      <HeroSection />

      {/* 2. MESSAGE FROM PRINCIPAL & FOUNDER (2ND SECTION) */}
      <PrincipalMessage />

      {/* 3. ADMISSION HIGHLIGHT */}
      <AdmissionHighlight />

      {/* 4. TRUST BAR */}
      <TrustBar />

      {/* 5. WELCOME / ABOUT */}
      <AboutSection />

      {/* 6. ANIMATED STATS */}
      <StatsSection />

      {/* 7. PROGRAM EXPLORER */}
      <ProgramExplorer />

      {/* 8. WHY CHOOSE BIST */}
      <WhyChooseSection />

      {/* 9. DEDICATED FACULTY SECTION */}
      <FacultySection />

      {/* 10. DEDICATED ADMINISTRATIVE OFFICERS SECTION */}
      <OfficersSection />

      {/* 11. NOTICE BOARD */}
      <NoticeBoardSection />

      {/* 12. UPCOMING EVENTS */}
      <EventsSection />

      {/* 13. PROJECTS & PARTNERS */}
      <ProjectsPartnersMarquee />

      {/* 14. CAREER & PLACEMENT */}
      <CareerSection />

      {/* 15. TESTIMONIALS */}
      <TestimonialsSection />

      {/* 16. LATEST NEWS */}
      <LatestNewsSection />

      {/* 17. FINAL CTA BAND */}
      <CtaBand />
    </div>
  );
};

