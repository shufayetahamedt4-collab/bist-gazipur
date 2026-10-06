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
  | 'calculator'
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
  | 'board-of-trustees'
  /** A single trustee's detailed profile, reached via `#/trustees/:slug`. */
  | 'trustee-detail'
  /** Unified faculty/officer profile, reached via `#/people/:slug`. */
  | 'person-detail';

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
 * A member of the Board of Trustees, mirrored from the section published on
 * https://bist.edu.bd/about-us and https://bist.edu.bd/page/history.
 *
 * The live site names each member, their role and, for the Principal, the
 * designation "Member Secretary". No photographs are published for the board, so
 * the UI falls back to an initials avatar rather than inventing a portrait.
 */
export interface BoardMember {
  id: string;
  /** URL segment used by the `#/trustees/:slug` route. */
  slug: string;
  /** Name exactly as the live site prints it. */
  name: string;
  role: LocalizedString;
  order: number;
  /** Local mirrored portrait, when the official page publishes one. */
  photo?: string;
  /** Published contact details; omitted rather than blanked when absent. */
  email?: string;
  phone?: string;
  /**
   * The "Profile" list on the trustee's page, grouped under the role heading the
   * official site prints (e.g. "Founder & Chairman") with the organisations it
   * lists beneath that heading.
   */
  positions?: BoardPositionGroup[];
  /** The "Education" table, reproduced in the order the official page prints it. */
  education?: BoardEducationEntry[];
  /** True when the official page shows no certifications yet ("Comming soon!"). */
  certificationPending?: boolean;
  /** The official page this profile is mirrored from. */
  sourceUrl?: string;
}

export interface BoardPositionGroup {
  /** Heading exactly as printed, e.g. "Founder & Chairman". */
  role: string;
  organisations: string[];
}

export interface BoardEducationEntry {
  /** e.g. "M.B.A (Apparel Merchandising)". */
  degree: string;
  /** e.g. "MBA in AM, Certificate Examination, 2017". */
  examination: string;
  /** e.g. "CGPA- 3.61 out of 4.00." — omitted when the page states none. */
  result?: string;
  /** Awarding body, e.g. "National University." */
  institution?: string;
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
