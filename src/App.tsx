/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingActions } from './components/layout/FloatingActions';
import { AiChatbot } from './components/features/AiChatbot';
import { ProgramFinderQuiz } from './components/features/ProgramFinderQuiz';
import { CommandPalette } from './components/features/CommandPalette';
import { ClientChecklistModal } from './components/features/ClientChecklistModal';

// Pages
import { HomePage } from './components/pages/HomePage';
import { DepartmentPage } from './components/pages/DepartmentPage';
import { ApplyOnlinePage } from './components/pages/ApplyOnlinePage';
import { ResultPage } from './components/pages/ResultPage';
import { NoticePage } from './components/pages/NoticePage';
import { ActivityPage } from './components/pages/ActivityPage';
import { FacultyPage } from './components/pages/FacultyPage';
import { OfficersPage } from './components/pages/OfficersPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { AlumniPage } from './components/pages/AlumniPage';
import { ScholarshipsFeesPage } from './components/pages/ScholarshipsFeesPage';
import { ContactPage } from './components/pages/ContactPage';
import { AboutPage } from './components/pages/AboutPage';
import { FacilitiesPage } from './components/pages/FacilitiesPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { EventsNewsPage } from './components/pages/EventsNewsPage';
import { FaqPage } from './components/pages/FaqPage';
import { AdminDashboardPage } from './components/pages/AdminDashboardPage';
import { LegalPages } from './components/pages/LegalPages';
import { DownloadsPage } from './components/pages/DownloadsPage';
import { AcademicCalendarPage } from './components/pages/AcademicCalendarPage';
import { AcademicRoutinesPage } from './components/pages/AcademicRoutinesPage';
import { AcademicRegulationsPage } from './components/pages/AcademicRegulationsPage';
import { LibraryPage } from './components/pages/LibraryPage';
import { StudentLifePage } from './components/pages/StudentLifePage';
import { IqacPage } from './components/pages/IqacPage';
import { GrievancePage } from './components/pages/GrievancePage';
import { DocumentEnquiryPage } from './components/pages/DocumentEnquiryPage';
import { PersonProfilePage } from './components/pages/PersonProfilePage';
import { PrincipalMessagePage } from './components/pages/PrincipalMessagePage';
import { DigitalItPage } from './components/pages/DigitalItPage';
import { HonoursProgramsPage } from './components/pages/HonoursProgramsPage';
import { PgdCoursesPage } from './components/pages/PgdCoursesPage';
import { ShortCoursesPage } from './components/pages/ShortCoursesPage';
import { CourseDetailPage } from './components/pages/CourseDetailPage';
import { AffiliationPage } from './components/pages/AffiliationPage';
import { PopupAdminPage } from './components/pages/PopupAdminPage';
import { AnnouncementPopup } from './components/features/AnnouncementPopup';
import { ProgramExplorer } from './components/sections/ProgramExplorer';
import { AdmissionHighlight } from './components/sections/AdmissionHighlight';
import { useScrollReveal } from './hooks/useScrollReveal';

const MainContent: React.FC = () => {
  const { currentPage, theme } = useApp();

  // Reveal headings, text and card groups as they scroll into view. Runs on
  // every page change and is a no-op for visitors who ask for reduced motion.
  useScrollReveal(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'departments':
      case 'department-detail':
        return <DepartmentPage />;
      case 'apply-online':
        return <ApplyOnlinePage />;
      case 'result':
        return <ResultPage />;
      case 'notices':
        return <NoticePage />;
      case 'activity':
        return <ActivityPage />;
      case 'faculty':
        return <FacultyPage />;
      case 'officers':
        return <OfficersPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'alumni':
        return <AlumniPage />;
      case 'scholarships':
      case 'fees':
        return <ScholarshipsFeesPage />;
      case 'honours-programs':
        return <HonoursProgramsPage />;
      case 'pgd':
        return <PgdCoursesPage />;
      case 'short-courses':
        return <ShortCoursesPage />;
      case 'course-detail':
        return <CourseDetailPage />;
      case 'affiliation-detail':
        return <AffiliationPage />;
      case 'principal-message':
        return <PrincipalMessagePage />;
      case 'digital-it':
        return <DigitalItPage />;
      case 'admin-popups':
        return <PopupAdminPage />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage />;
      case 'programs':
        return (
          <div className="py-8">
            <ProgramExplorer />
          </div>
        );
      case 'admissions':
        return (
          <div className="space-y-8 py-8">
            <AdmissionHighlight />
            <ScholarshipsFeesPage />
          </div>
        );
      case 'facilities':
        return <FacilitiesPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'events':
      case 'news':
        return <EventsNewsPage />;
      case 'faq':
        return <FaqPage />;
      case 'admin':
        return <AdminDashboardPage />;
      case 'downloads':
        return <DownloadsPage />;
      case 'academic-calendar':
        return <AcademicCalendarPage />;
      case 'academic-routines':
        return <AcademicRoutinesPage />;
      case 'academic-regulations':
        return <AcademicRegulationsPage />;
      case 'library':
        return <LibraryPage />;
      case 'student-life':
        return <StudentLifePage />;
      case 'iqac':
        return <IqacPage />;
      case 'grievance':
        return <GrievancePage />;
      case 'document-enquiry':
        return <DocumentEnquiryPage />;
      case 'person-detail':
        return <PersonProfilePage />;
      case 'privacy':
        return <LegalPages type="privacy" />;
      case 'terms':
        return <LegalPages type="terms" />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-[#070b1a] text-slate-100 selection:bg-emerald-500 selection:text-black'
        : 'bg-[#f8fafc] text-slate-900 selection:bg-emerald-400 selection:text-slate-950'
    }`}>
      <Navbar />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <FloatingActions />
      <AnnouncementPopup />
      <AiChatbot />
      <ProgramFinderQuiz />
      <CommandPalette />
      <ClientChecklistModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
