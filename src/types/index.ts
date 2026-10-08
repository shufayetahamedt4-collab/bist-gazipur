export type Language = 'en' | 'bn';
export type ThemeMode = 'dark' | 'light';

export type PageId =
  | 'home'
  | 'about'
  | 'departments'
  | 'department-detail'
  | 'programs'
  | 'admissions'
  | 'apply-online'
  | 'result'
  | 'notices'
  /** Staff-published activity feed: short posts, photos and videos from campus. */
  | 'activity'
  | 'faculty'
  | 'officers'
  | 'gallery'
  | 'alumni'
  | 'events'
  | 'news'
  | 'scholarships'
  | 'fees'
  | 'facilities'
  | 'projects'
  | 'faq'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'admin'
  | 'downloads'
  | 'academic-calendar'
  | 'academic-routines'
  | 'academic-regulations'
  | 'library'
  | 'student-life'
  | 'iqac'
  | 'grievance'
  | 'document-enquiry'
  /** Unified faculty/officer profile, reached via `#/people/:slug`. */
  | 'person-detail'
  /** About → the Principal's message, listed after Mission, Vision & Strategy. */
  | 'principal-message'
  /** About → Digital & IT Development. */
  | 'digital-it'
  /** Academics → the four-year Honours degrees under National University. */
  | 'honours-programs'
  /** Academics → Post Graduate Diploma programmes. */
  | 'pgd'
  /** Academics → the short skill courses run by the institute. */
  | 'short-courses'
  /** One affiliated or accrediting body, reached via `#/affiliated/:id`. */
  | 'affiliation-detail'
  /** One course outside the Honours degrees, reached via `#/courses/:courseId`. */
  | 'course-detail'
  /** Password-gated editor for the announcement popup, reached via `#/admin/popups`. */
  | 'admin-popups';

export interface LocalizedString {
  en: string;
  bn: string;
}

/**
 * One published waiver band from the official Tuition Fee table (bist.edu.bd/page/tuition-fee).
 * `band` is the SSC & HSC result range the waiver applies to.
 */
export interface WaiverTier {
  band: LocalizedString;
  waiverPercent: number;
  monthlyTuition: number;
  totalCost: number;
}

export interface Program {
  id: string;
  code: string;
  title: LocalizedString;
  shortTitle: string;
  degree: string;
  level: 'undergraduate' | 'diploma-textile' | 'diploma-engineering' | 'hsc-bm' | 'ssc-vocational';
  duration: LocalizedString;
  credits: number;
  affiliation: 'National University' | 'BTEB' | 'NSDA';
  seats: number;
  /** Total programme cost at 0% waiver, as published on bist.edu.bd. */
  totalFee: number;
  /** Semester fee (payable per semester, normally 8 semesters). */
  semesterFee: number;
  /** One-time admission fee. */
  admissionFee: number;
  /** Monthly tuition at 0% waiver. */
  monthlyTuition: number;
  /** Published GPA-wise waiver bands for this programme. */
  waiverTiers: WaiverTier[];
  /** Number of monthly installments charged over the full programme. */
  tuitionMonths: number;
  eligibility: LocalizedString;
  overview: LocalizedString;
  careerProspects: LocalizedString[];
  labs: string[];
  curriculum: {
    semester: number;
    title: LocalizedString;
    courses: string[];
  }[];
  featuredImage: string;
}

export interface Notice {
  id: string;
  title: LocalizedString;
  date: string;
  category: 'all' | 'examinations' | 'admissions' | 'academic' | 'holidays' | 'other';
  /** Official PDF/JPEG hosted by bist.edu.bd (or a mirrored copy in /notices). */
  fileName?: string;
  fileType: 'pdf' | 'doc' | 'image';
  fileSize: string;
  isNew?: boolean;
  isPinned?: boolean;
  content: LocalizedString;
  downloadUrl?: string;
}

export interface EventItem {
  id: string;
  title: LocalizedString;
  /** Empty when the live site does not publish a time. */
  date: string;
  time: string;
  venue: LocalizedString;
  category: string;
  status: 'upcoming' | 'past';
  description: LocalizedString;
  image: string;
  /** Original bist.edu.bd page for this item, when available. */
  link?: string;
}

export interface NewsItem {
  id: string;
  title: LocalizedString;
  /** Empty when the live site does not publish a date. */
  date: string;
  category: string;
  summary: LocalizedString;
  content: LocalizedString;
  image: string;
  author: string;
  /** Original bist.edu.bd article, when available. */
  link?: string;
}

/**
 * A member of the BIST roster, mirrored from bist.edu.bd/all-teachers.
 *
 * Only the fields the live site actually publishes are guaranteed: name,
 * designation, department and academic qualification. Everything else is
 * optional so no plausible-looking detail ever gets invented to fill a gap.
 */
export interface FacultyMember {
  id: string;
  name: LocalizedString;
  designation: LocalizedString;
  /** Programme code: 'CSE' | 'TST' | 'AMT' | 'FDT' | 'BBA' | 'ADMIN'. */
  department: string;
  employmentType: string;
  qualifications: string;
  email: string;
  image: string;
  /** Live profile page on bist.edu.bd, when the roster publishes one. */
  profileUrl?: string;
  /** Not published on the live site — omitted rather than guessed. */
  specialization?: string;
  phone?: string;
  experienceYears?: number;
}

export interface AdministrativeOfficer {
  id: string;
  name: LocalizedString;
  designation: LocalizedString;
  office: LocalizedString;
  qualifications: string;
  /** Not published on the live site — omitted rather than guessed. */
  responsibilities?: LocalizedString;
  email: string;
  phone?: string;
  image: string;
  roomNo?: string;
  order: number;
}

export interface Testimonial {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  /** Only set when the live site states it; otherwise the UI shows initials. */
  company?: string;
  program?: string;
  batch?: string;
  /** Empty string means "no photo published" — the UI falls back to initials. */
  image?: string;
  quote: LocalizedString;
  linkedin?: string;
}

export interface GalleryItem {
  id: string;
  title: LocalizedString;
  category: 'campus' | 'labs' | 'events' | 'textile' | 'sports';
  image: string;
  date: string;
}

/** An entry from bist.edu.bd/alumni-list; only name/position/company are published. */
export interface AlumniProfile {
  id: string;
  name: string;
  position: string;
  company: string;
  /** Empty when the live site publishes no photo — the UI falls back to an avatar. */
  image: string;
  batch?: string;
  program?: string;
  location?: string;
}

/**
 * A document offered in the Downloads Centre.
 *
 * Every entry must point at a file that genuinely exists — either an attachment
 * already mirrored from bist.edu.bd into /public, or a live external document the
 * institution itself publishes. Nothing is ever listed speculatively.
 */
export interface DownloadDoc {
  id: string;
  title: LocalizedString;
  /** Publishing date exactly as printed on the notice/document, when one exists. */
  date: string;
  category: DownloadCategoryId;
  fileType: 'pdf' | 'doc' | 'image';
  /** May be empty — the live site does not always state a size. */
  fileSize: string;
  /** Local path under /public or an absolute https URL. */
  url: string;
  /** Where the document came from, so the UI can attribute it honestly. */
  source: LocalizedString;
}

export type DownloadCategoryId =
  | 'examinations'
  | 'admissions'
  | 'academic'
  | 'holidays'
  | 'other';

/** A dated entry shown on the academic calendar. Never invented. */
export interface AcademicCalendarEntry {
  id: string;
  date: string;
  title: LocalizedString;
  category: Notice['category'];
  /** Source notice this entry was derived from, when one exists. */
  sourceNoticeId?: string;
  downloadUrl?: string;
}

/** One section of the published Academic Regulations text. */
export interface RegulationSection {
  id: string;
  heading: LocalizedString;
  /** Paragraphs reproduced verbatim from the live Academic Regulation page. */
  paragraphs: LocalizedString[];
  /** Optional list items (e.g. the "Why we should study at BIST" points). */
  points?: LocalizedString[];
}

/** A campus-life or library facility, only included when the live site states it. */
export interface CampusFacility {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  /** True when the live site publishes no detail yet, so the UI shows an honest state. */
  pending?: boolean;
  icon: string;
}

/** A channel through which a student can raise a grievance. */
export interface GrievanceChannel {
  id: string;
  label: LocalizedString;
  /** Published email, phone or postal address. */
  value: string;
  type: 'email' | 'phone' | 'address' | 'portal';
}

/**
 * A class of document an outside party (alumni, employer, university, guardian)
 * can request from the institution.
 *
 * `requirement` states what the applicant must supply so the office can trace
 * the underlying record — it is deliberately generic where the live site does
 * not publish an exact checklist.
 */
export interface DocumentRequestType {
  id: string;
  label: LocalizedString;
  requirement: LocalizedString;
}

/** Who published an Activity post. Only staff roles can post. */
export type ActivityAuthorRole = 'teacher' | 'administration';

/** What an Activity post carries alongside its text. */
export type ActivityMediaKind = 'text' | 'photo' | 'video';

/**
 * One entry in the Activity feed.
 *
 * Activity is staff-published: a teacher or an administrator writes the body and,
 * optionally, attaches one photo or video. Media is stored as a URL/path under
 * /public, or as a data URL when the author uploaded a small file, so a post keeps
 * working from a static host with no backend.
 */
export interface ActivityPost {
  id: string;
  /** Display name typed by the author (no account system exists yet). */
  author: string;
  authorRole: ActivityAuthorRole;
  /** Optional headline; the feed falls back to the body when it is empty. */
  title?: LocalizedString;
  body: LocalizedString;
  kind: ActivityMediaKind;
  /** Image/video source: a `/public` path, an https URL, or a `data:` URL. */
  mediaUrl?: string;
  /** Poster frame for a video. */
  mediaPoster?: string;
  /** Short description shown under the media, and used as the image alt text. */
  caption?: LocalizedString;
  /** Epoch milliseconds — the feed sorts newest first and shows relative time. */
  createdAt: number;
}

export interface ApplicationFormData {
  id?: string;
  fullName: string;
  banglaName?: string;
  email: string;
  phone: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  sscBoard: string;
  sscRoll: string;
  sscReg: string;
  sscYear: string;
  sscGpa: string;
  hscBoard: string;
  hscRoll: string;
  hscReg: string;
  hscYear: string;
  hscGpa: string;
  programChoice: string;
  shift: string;
  quota: string;
  submissionDate: string;
  referenceNumber: string;
  status: 'pending' | 'verified' | 'admitted';
}

/* ------------------------------------------------------------------ *
 * Courses, affiliations, collaborations and site announcements
 * ------------------------------------------------------------------ */

/**
 * Where a course sits in the academic ladder the Academics menu exposes.
 *
 * `honours` — the four-year B.Sc. (Hons.)/BBA degrees under National University.
 * `pgd`     — Post Graduate Diploma programmes.
 * `short`   — non-degree skill courses run by the institute's own centre.
 */
export type CourseLevel = 'honours' | 'pgd' | 'short';

/** The statutory bodies BIST is affiliated with or accredited by. */
export type AffiliationId = 'nu' | 'bteb' | 'nsda';

/**
 * One course offered outside the four-year Honours curriculum.
 *
 * Every number here is either published by the institution or deliberately
 * absent — `source: 'placeholder'` marks an entry whose published details are
 * still being collected, so the UI never dresses up an invented figure.
 */
export interface CourseOffer {
  id: string;
  code: string;
  shortTitle: string;
  title: LocalizedString;
  level: CourseLevel;
  affiliation: 'National University' | 'BTEB' | 'NSDA';
  /** Omitted for a course whose published duration has not been collected yet. */
  duration?: LocalizedString;
  credits?: number;
  seats?: number;
  /** Published total cost, in BDT. Omitted when the institution publishes none. */
  totalFee?: number;
  /** Number of classes, as printed on the short-course page. */
  classCount?: number;
  summary: LocalizedString;
  highlights: LocalizedString[];
  /** Structured outline for the detail page, when one is published. */
  curriculum?: { title: LocalizedString; items: LocalizedString[] }[];
  eligibility?: LocalizedString;
  /** Set when this course is one of the `PROGRAMS` entries, so cards can deep-link. */
  honoursProgramId?: string;
  /** NSDA course level 1–4, for skills assessed under the RTO. */
  nsdaLevel?: number;
  image?: string;
  /** `live` mirrors a published page; `placeholder` needs confirming. */
  source: 'live' | 'placeholder';
}

/** An affiliated or accrediting body, and how a visitor verifies BIST under it. */
export interface AffiliationBody {
  id: AffiliationId;
  shortName: string;
  name: LocalizedString;
  /** Registration/college code printed on official documents. */
  code: string;
  codeLabel: LocalizedString;
  description: LocalizedString;
  /** What the affiliation covers for BIST. */
  scope: LocalizedString[];
  /** What the visitor should look up on the authority's own site. */
  verification: LocalizedString;
}

/** A development-partner project BIST takes part in (ASSETS, CICIP, …). */
export interface CollaborationProject {
  id: string;
  /** Short code the institution uses, e.g. `ASSETS`. */
  name: string;
  fullName: LocalizedString;
  /** The development partner backing the project. */
  partner: string;
  /** What that partner's role in the project is. */
  partnerRole: LocalizedString;
  summary: LocalizedString;
  /** What BIST itself delivers inside the project. */
  bistRole: LocalizedString;
  focusAreas: LocalizedString[];
  theme: LocalizedString;
  period?: LocalizedString;
  /** Placeholder artwork path until the partner supplies a logo. */
  logoPlaceholder?: string;
  accent: 'emerald' | 'cyan' | 'amber' | 'indigo';
}

/**
 * One card in the bottom-right announcement popup.
 *
 * Admins create, reorder, schedule and switch these off; visitors see the active
 * ones inside their date window, once per browser session.
 */
export interface AnnouncementPost {
  id: string;
  image?: string;
  title: LocalizedString;
  description: LocalizedString;
  /** Internal hash route (`#/pgd`) or an absolute `https://` URL. */
  link?: string;
  linkLabel?: LocalizedString;
  active: boolean;
  /** Ascending display order; ties fall back to the stored array order. */
  order: number;
  /** ISO `yyyy-mm-dd` bounds. Empty means unbounded on that side. */
  startDate?: string;
  endDate?: string;
  /** Sister-concern posts advertise another concern's courses. */
  category: 'announcement' | 'sister-concern';
}
