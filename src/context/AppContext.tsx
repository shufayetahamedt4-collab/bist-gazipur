import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, ThemeMode, PageId, Notice, ApplicationFormData } from '../types';
import { NOTICES } from '../data/mockData';

interface AppContextType {
  language: Language;
  toggleLanguage: () => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  currentPage: PageId;
  navigateTo: (page: PageId, deptId?: string, noticeId?: string) => void;
  selectedDeptId: string;
  setSelectedDeptId: (id: string) => void;
  selectedNoticeId: string | null;
  setSelectedNoticeId: (id: string | null) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isChatbotOpen: boolean;
  setIsChatbotOpen: (open: boolean) => void;
  isQuizOpen: boolean;
  setIsQuizOpen: (open: boolean) => void;
  isClientNotesOpen: boolean;
  setIsClientNotesOpen: (open: boolean) => void;
  applications: ApplicationFormData[];
  submitApplication: (data: Omit<ApplicationFormData, 'id' | 'referenceNumber' | 'submissionDate' | 'status'>) => string;
  noticesList: Notice[];
  addNotice: (notice: Omit<Notice, 'id'>) => void;
  deleteNotice: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

/**
 * Bump this whenever the notices in ./data/liveData.ts change, so browsers holding an
 * older cached copy are refreshed from the official source instead of staying stale.
 */
const NOTICES_DATA_VERSION = '2026-09-30-live';

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_APPLICATIONS: ApplicationFormData[] = [
  {
    id: 'app-1',
    fullName: 'Tanvir Hossain Mahin',
    banglaName: 'তানভীর হোসেন মাহিন',
    email: 'tanvir.mahin@gmail.com',
    phone: '01712-334455',
    fatherName: 'Md. Delowar Hossain',
    motherName: 'Mahmuda Begum',
    dateOfBirth: '2005-04-12',
    gender: 'Male',
    bloodGroup: 'B+',
    presentAddress: 'Board Bazar, Gazipur Sadar, Gazipur',
    permanentAddress: 'Kishoreganj Sadar, Kishoreganj',
    sscBoard: 'Dhaka',
    sscRoll: '341902',
    sscReg: '1810492812',
    sscYear: '2022',
    sscGpa: '4.89',
    hscBoard: 'Dhaka',
    hscRoll: '581923',
    hscReg: '1810492812',
    hscYear: '2024',
    hscGpa: '4.75',
    programChoice: 'cse',
    shift: 'Day Shift',
    quota: 'General Merit',
    submissionDate: '2026-09-24',
    referenceNumber: 'BIST-2026-8941',
    status: 'admitted',
  },
  {
    id: 'app-2',
    fullName: 'Sadia Sultana Bristy',
    banglaName: 'সাদিয়া সুলতানা বৃষ্টি',
    email: 'sadia.bristy@yahoo.com',
    phone: '01912-998877',
    fatherName: 'Sultan Mahmud',
    motherName: 'Nasrin Sultana',
    dateOfBirth: '2006-01-20',
    gender: 'Female',
    bloodGroup: 'O+',
    presentAddress: 'Joydebpur Road, Gazipur',
    permanentAddress: 'Tangail Sadar, Tangail',
    sscBoard: 'Dhaka',
    sscRoll: '210984',
    sscReg: '1910294821',
    sscYear: '2022',
    sscGpa: '5.00',
    hscBoard: 'Dhaka',
    hscRoll: '492019',
    hscReg: '1910294821',
    hscYear: '2024',
    hscGpa: '5.00',
    programChoice: 'fdt',
    shift: 'Day Shift',
    quota: 'Female Special Quota',
    submissionDate: '2026-09-26',
    referenceNumber: 'BIST-2026-9214',
    status: 'verified',
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedDeptId, setSelectedDeptId] = useState<string>('cse');
  const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isClientNotesOpen, setIsClientNotesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Persisted state
  const [applications, setApplications] = useState<ApplicationFormData[]>(() => {
    try {
      const saved = localStorage.getItem('bist_applications');
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  const [noticesList, setNoticesList] = useState<Notice[]>(() => {
    try {
      const saved = localStorage.getItem('bist_notices');
      const savedVersion = localStorage.getItem('bist_notices_version');
      // Only trust the cached list when it came from the current dataset, otherwise a
      // returning visitor would keep seeing notices that have since been replaced.
      if (saved && savedVersion === NOTICES_DATA_VERSION) {
        return JSON.parse(saved);
      }
      return NOTICES;
    } catch {
      return NOTICES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bist_applications', JSON.stringify(applications));
    } catch (e) {
      console.error(e);
    }
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem('bist_notices', JSON.stringify(noticesList));
      localStorage.setItem('bist_notices_version', NOTICES_DATA_VERSION);
    } catch (e) {
      console.error(e);
    }
  }, [noticesList]);

  // Global key listener for Command Palette (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync theme with DOM
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('bg-[#f8fafc]', 'text-slate-900');
      document.body.classList.add('bg-[#070b1a]', 'text-slate-100');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-[#070b1a]', 'text-slate-100');
      document.body.classList.add('bg-[#f8fafc]', 'text-slate-900');
    }
  }, [theme]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const navigateTo = (page: PageId, deptId?: string, noticeId?: string) => {
    setCurrentPage(page);
    if (deptId) setSelectedDeptId(deptId);
    if (noticeId) setSelectedNoticeId(noticeId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitApplication = (
    data: Omit<ApplicationFormData, 'id' | 'referenceNumber' | 'submissionDate' | 'status'>
  ) => {
    const rand = Math.floor(1000 + Math.random() * 9000);
    const refNum = `BIST-2026-${rand}`;
    const newApp: ApplicationFormData = {
      ...data,
      id: `app-${Date.now()}`,
      referenceNumber: refNum,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setApplications((prev) => [newApp, ...prev]);
    return refNum;
  };

  const addNotice = (noticeData: Omit<Notice, 'id'>) => {
    const newNotice: Notice = {
      ...noticeData,
      id: `notice-${Date.now()}`,
    };
    setNoticesList((prev) => [newNotice, ...prev]);
  };

  const deleteNotice = (id: string) => {
    setNoticesList((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        language,
        toggleLanguage,
        theme,
        toggleTheme,
        currentPage,
        navigateTo,
        selectedDeptId,
        setSelectedDeptId,
        selectedNoticeId,
        setSelectedNoticeId,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isChatbotOpen,
        setIsChatbotOpen,
        isQuizOpen,
        setIsQuizOpen,
        isClientNotesOpen,
        setIsClientNotesOpen,
        applications,
        submitApplication,
        noticesList,
        addNotice,
        deleteNotice,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
