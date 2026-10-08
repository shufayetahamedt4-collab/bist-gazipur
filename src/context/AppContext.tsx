import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, ThemeMode, PageId, Notice, ActivityPost, ApplicationFormData, AnnouncementPost } from '../types';
import { NOTICES } from '../data/mockData';
import { ACTIVITY_POSTS, ACTIVITY_DATA_VERSION } from '../data/activityData';
import { ANNOUNCEMENT_POSTS, ANNOUNCEMENTS_DATA_VERSION } from '../data/announcementData';
import { RouteState, currentHash, parseHash, routeToHash } from '../router/hashRoute';

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
  /** Slug of the person being viewed on `#/people/:slug`. */
  selectedPersonSlug: string | null;
  setSelectedPersonSlug: (slug: string | null) => void;
  /** Course being viewed on `#/courses/:courseId`. */
  selectedCourseId: string | null;
  /** Open a course page at `#/courses/:courseId`. */
  navigateToCourse: (courseId: string) => void;
  /** Affiliation being viewed on `#/affiliated/:bodyId` (nu | bteb | nsda). */
  selectedAffiliationId: string | null;
  /** Open an affiliation page at `#/affiliated/:bodyId`. */
  navigateToAffiliation: (affiliationId: string) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isChatbotOpen: boolean;
  setIsChatbotOpen: (open: boolean) => void;
  isQuizOpen: boolean;
  setIsQuizOpen: (open: boolean) => void;
  isClientNotesOpen: boolean;
  setIsClientNotesOpen: (open: boolean) => void;
  /**
   * True while the bottom-right announcement popup is on screen. The floating
   * action stack reads this so the two never cover each other.
   */
  isAnnouncementOpen: boolean;
  setIsAnnouncementOpen: (open: boolean) => void;
  applications: ApplicationFormData[];
  submitApplication: (data: Omit<ApplicationFormData, 'id' | 'referenceNumber' | 'submissionDate' | 'status'>) => string;
  noticesList: Notice[];
  addNotice: (notice: Omit<Notice, 'id'>) => void;
  deleteNotice: (id: string) => void;
  activityPosts: ActivityPost[];
  addActivityPost: (post: Omit<ActivityPost, 'id' | 'createdAt'>) => void;
  deleteActivityPost: (id: string) => void;
  announcements: AnnouncementPost[];
  /** Create a new announcement, or replace the one with the same id. */
  upsertAnnouncement: (post: AnnouncementPost) => void;
  deleteAnnouncement: (id: string) => void;
  /** Move a post one slot earlier or later in the display order. */
  moveAnnouncement: (id: string, direction: 'up' | 'down') => void;
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
  // Resolve the initial route from the URL so a deep link or a refresh lands on
  // the right page instead of always falling back to Home.
  const [bootRoute] = useState<RouteState>(() => parseHash(currentHash()) ?? { page: 'home' });

  const [currentPage, setCurrentPage] = useState<PageId>(bootRoute.page);
  const [selectedDeptId, setSelectedDeptId] = useState<string>(bootRoute.deptId ?? 'cse');
  const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>(bootRoute.noticeId ?? null);
  const [selectedPersonSlug, setSelectedPersonSlug] = useState<string | null>(
    bootRoute.personSlug ?? null
  );
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(
    bootRoute.courseId ?? null
  );
  const [selectedAffiliationId, setSelectedAffiliationId] = useState<string | null>(
    bootRoute.affiliationId ?? null
  );
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isClientNotesOpen, setIsClientNotesOpen] = useState(false);
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);
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

  const [activityPosts, setActivityPosts] = useState<ActivityPost[]>(() => {
    try {
      const saved = localStorage.getItem('bist_activity_posts');
      const savedVersion = localStorage.getItem('bist_activity_posts_version');
      // Same rule as notices: only trust the cache when it came from the current
      // seed, so a returning visitor is not stuck on replaced sample content.
      if (saved && savedVersion === ACTIVITY_DATA_VERSION) {
        return JSON.parse(saved);
      }
      return ACTIVITY_POSTS;
    } catch {
      return ACTIVITY_POSTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bist_applications', JSON.stringify(applications));
    } catch (e) {
      console.error(e);
    }
  }, [applications]);

  const [announcements, setAnnouncements] = useState<AnnouncementPost[]>(() => {
    try {
      const saved = localStorage.getItem('bist_announcements');
      const savedVersion = localStorage.getItem('bist_announcements_version');
      // Same rule as notices and activity: only trust the cache when it came
      // from the current seed, so an edited list is not silently reverted and a
      // replaced seed is not silently kept.
      if (saved && savedVersion === ANNOUNCEMENTS_DATA_VERSION) {
        return JSON.parse(saved);
      }
      return ANNOUNCEMENT_POSTS;
    } catch {
      return ANNOUNCEMENT_POSTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bist_announcements', JSON.stringify(announcements));
      localStorage.setItem('bist_announcements_version', ANNOUNCEMENTS_DATA_VERSION);
    } catch (e) {
      console.error('Could not persist the announcements', e);
    }
  }, [announcements]);

  useEffect(() => {
    try {
      localStorage.setItem('bist_activity_posts', JSON.stringify(activityPosts));
      localStorage.setItem('bist_activity_posts_version', ACTIVITY_DATA_VERSION);
    } catch (e) {
      // An uploaded photo/video can push the list past the ~5 MB storage quota.
      // Surface it rather than dying silently, so the author knows the post is
      // only visible in this tab until they use a smaller file.
      console.error('Could not persist the activity feed', e);
    }
  }, [activityPosts]);

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

  /** Apply a decoded route to React state. Idempotent, so double-firing is safe. */
  const applyRoute = (route: RouteState) => {
    setCurrentPage(route.page);
    // Only overwrite the department when the route names one, so the explorer
    // keeps remembering the last programme the visitor looked at.
    if (route.deptId) setSelectedDeptId(route.deptId);
    setSelectedNoticeId(route.noticeId ?? null);
    setSelectedPersonSlug(route.personSlug ?? null);
    setSelectedCourseId(route.courseId ?? null);
    setSelectedAffiliationId(route.affiliationId ?? null);
  };

  // Keep the URL hash and the app state in step, in both directions. pushState
  // does not itself fire popstate, so there is no feedback loop here.
  useEffect(() => {
    if (!parseHash(currentHash())) {
      // Normalise an unrecognised hash rather than leaving a misleading URL.
      window.history.replaceState(null, '', routeToHash({ page: 'home' }));
    }

    const syncFromUrl = () => {
      const route = parseHash(currentHash());
      if (route) {
        applyRoute(route);
      } else {
        window.history.replaceState(null, '', routeToHash({ page: 'home' }));
        applyRoute({ page: 'home' });
      }
    };

    window.addEventListener('popstate', syncFromUrl);
    window.addEventListener('hashchange', syncFromUrl);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
      window.removeEventListener('hashchange', syncFromUrl);
    };
  }, []);

  const navigateTo = (page: PageId, deptId?: string, noticeId?: string) => {
    setCurrentPage(page);
    if (deptId) setSelectedDeptId(deptId);
    if (noticeId) setSelectedNoticeId(noticeId);

    const nextHash = routeToHash({ page, deptId, noticeId });
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /** Open a course page — mirrors navigateTo, but carries the course id. */
  const navigateToCourse = (courseId: string) => {
    setCurrentPage('course-detail');
    setSelectedCourseId(courseId);
    const nextHash = routeToHash({ page: 'course-detail', courseId });
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /** Open an affiliation page — mirrors navigateTo, but carries the body id. */
  const navigateToAffiliation = (affiliationId: string) => {
    setCurrentPage('affiliation-detail');
    setSelectedAffiliationId(affiliationId);
    const nextHash = routeToHash({ page: 'affiliation-detail', affiliationId });
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }
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

  const addActivityPost = (postData: Omit<ActivityPost, 'id' | 'createdAt'>) => {
    const newPost: ActivityPost = {
      ...postData,
      id: `activity-${Date.now()}`,
      createdAt: Date.now(),
    };
    setActivityPosts((prev) => [newPost, ...prev]);
  };

  const deleteActivityPost = (id: string) => {
    setActivityPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const upsertAnnouncement = (post: AnnouncementPost) => {
    setAnnouncements((prev) => {
      const exists = prev.some((item) => item.id === post.id);
      return exists
        ? prev.map((item) => (item.id === post.id ? post : item))
        : [...prev, post];
    });
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((post) => post.id !== id));
  };

  /**
   * Swap a post with its neighbour after sorting by `order`, then rewrite every
   * `order` value so the sequence stays 1..n and reordering never drifts.
   */
  const moveAnnouncement = (id: string, direction: 'up' | 'down') => {
    setAnnouncements((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex((post) => post.id === id);
      const target = direction === 'up' ? index - 1 : index + 1;
      if (index === -1 || target < 0 || target >= sorted.length) return prev;
      [sorted[index], sorted[target]] = [sorted[target], sorted[index]];
      return sorted.map((post, position) => ({ ...post, order: position + 1 }));
    });
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
        selectedPersonSlug,
        setSelectedPersonSlug,
        selectedCourseId,
        navigateToCourse,
        selectedAffiliationId,
        navigateToAffiliation,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isChatbotOpen,
        setIsChatbotOpen,
        isQuizOpen,
        setIsQuizOpen,
        isClientNotesOpen,
        setIsClientNotesOpen,
        isAnnouncementOpen,
        setIsAnnouncementOpen,
        applications,
        submitApplication,
        noticesList,
        addNotice,
        deleteNotice,
        activityPosts,
        addActivityPost,
        deleteActivityPost,
        announcements,
        upsertAnnouncement,
        deleteAnnouncement,
        moveAnnouncement,
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
