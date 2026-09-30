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
  | 'admin';

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
