import {
  Program,
  LocalizedString,
  WaiverTier,
} from '../types';

export const UNIVERSITY_INFO = {
  name: {
    en: 'BGIFT Institute of Science & Technology (BIST)',
    bn: 'বিজিআইএফটি ইনস্টিটিউট অব সায়েন্স অ্যান্ড টেকনোলজি (বিআইএসটি)',
  },
  shortName: 'BIST Gazipur',
  tagline: {
    en: 'Engineer Your Future in Textile, Tech & Business',
    bn: 'টেক্সটাইল, প্রযুক্তি ও ব্যবসায় নিজের ভবিষ্যৎ গড়ুন',
  },
  codes: {
    nu: {
      name: 'National University College Code',
      bnName: 'জাতীয় বিশ্ববিদ্যালয় কলেজ কোড',
      code: '5526',
      badge: 'NU Affiliated #5526',
    },
    bteb: {
      name: 'BTEB College Code',
      bnName: 'কারিগরি শিক্ষা বোর্ড কলেজ কোড',
      code: '53098',
      badge: 'BTEB Recognized #53098',
    },
    nsda: {
      name: 'NSDA Accreditation Code',
      bnName: 'এনএসডিএ স্বীকৃতি কোড',
      code: 'STP-GAZ-000020',
      badge: 'NSDA Certified #STP-GAZ-000020',
    },
  },
  contact: {
    address: {
      en: 'Unishe Tower, Mymensingh Road, Chandona Chowrasta, Gazipur-1702, Bangladesh',
      bn: 'উনিশে টাওয়ার, ময়মনসিংহ রোড, চান্দনা চৌরাস্তা, গাজীপুর-১৭০২, বাংলাদেশ',
    },
    admissionPhone: '01913-555111',
    officePhone: '01908-909090',
    whatsapp: '+8801913555111',
    email: 'principal@bist.edu.bd',
    officeHours: {
      en: 'Saturday – Thursday: 8:30 AM – 5:30 PM (Friday Closed)',
      bn: 'শনিবার – বৃহস্পতিবার: সকাল ৮:৩০ – বিকাল ৫:৩০ (শুক্রবার বন্ধ)',
    },
    // Live portal address as published on bist.edu.bd (top utility bar).
    erpUrl: 'http://erp.institute.su.edu.bd:7191/bist_erp/home',
    jobPortalUrl: 'https://bist.edu.bd/apply-online',
    resultUrl: 'https://bist.edu.bd/result',
    alumniUrl: 'https://bist.edu.bd/alumni-list',
    applyUrl: 'https://bist.edu.bd/apply-online',
    noticeUrl: 'https://bist.edu.bd/notice',
    eventsUrl: 'https://bist.edu.bd/events',
    newsUrl: 'https://bist.edu.bd/blogs',
    diplomaSiteUrl: 'http://diploma.bist.edu.bd',
    website: 'https://bist.edu.bd',
  },
  socials: {
    facebook: 'https://www.facebook.com/www.bist.edu.bd/',
    youtube: 'https://www.youtube.com/channel/UCyJwM1AqTu4IRmrLOw-Js0w/featured',
    linkedin: 'https://www.linkedin.com/company/bgift-institute-of-science-technology-bist/',
  },
  /** Headline counters published on the bist.edu.bd homepage. */
  foundingYear: 2008, // bist.edu.bd/page/at-a-glance: "was set up since 2008"
  stats: {
    students: 5000,
    courses: 40,
    teachers: 60,
    awardsWon: 50,
  },
  /** Rotating admission announcement taken from the live site's top bar. */
  announcement: {
    en: 'Diploma graduates can now enrol in B.Sc. (Hons.) in CSE, TST, AMT & FDT. Admission applications for the 2025-26 academic year under National University — B.Sc. (Hons.) in CSE, TST, AMT, FDT and Professional BBA — are open. 100 students will receive a 100% scholarship on course fees (terms apply), and merit scholarships of 50%-100% are available for meritorious and financially disadvantaged students, including students with disabilities and ethnic minority students.',
    bn: 'ডিপ্লোমা পাস শিক্ষার্থীরাও বিএসসি (অনার্স) ইঞ্জিনিয়ারিং (CSE, TST, AMT & FDT) কোর্সে ভর্তি হতে পারবে। কোর্স ফি\'র উপর ধার্যকৃত ১০০% স্কলারশীপ পাবে ১০০ জন শিক্ষার্থী (শর্ত সাপেক্ষে), জাতীয় বিশ্ববিদ্যালয়ের অধীন ২০২৫-২৬ শিক্ষাবর্ষে স্নাতক সম্মান (প্রফেশনাল) B.Sc. (Hons.) in CSE, TST, AMT, FDT & Professional BBA কোর্সে ভর্তির আবেদন চলছে। মেধা ও আর্থিক অস্বচ্ছলতা বিবেচনায় বিশেষ বৃত্তিসহ শারীরিক প্রতিবন্ধী ও ক্ষুদ্র নৃ-গোষ্ঠি শিক্ষার্থীদের জন্য ৫০%-১০০% পর্যন্ত মেধাবৃত্তি।',
  },
};

/* ------------------------------------------------------------------ *
 * Official tuition fee tables
 * Source: https://bist.edu.bd/page/tuition-fee
 * Waiver bands are keyed on the SUM of SSC + HSC GPA (out of 10.00),
 * exactly as published by the BIST admission office.
 * ------------------------------------------------------------------ */

const WAIVER_BANDS: LocalizedString[] = [
  { en: 'Below 6.00', bn: '৬.০০ এর নিচে' },
  { en: '6.00 – 6.99', bn: '৬.০০ – ৬.৯৯' },
  { en: '7.00 – 7.99', bn: '৭.০০ – ৭.৯৯' },
  { en: '8.00 – 8.99', bn: '৮.০০ – ৮.৯৯' },
  { en: '9.00 – 9.99', bn: '৯.০০ – ৯.৯৯' },
  { en: '10.00 (5.00 + 5.00)', bn: '১০.০০ (৫.০০ + ৫.০০)' },
];

const buildTiers = (rows: [number, number, number][]): WaiverTier[] =>
  rows.map(([waiverPercent, monthlyTuition, totalCost], i) => ({
    band: WAIVER_BANDS[i],
    waiverPercent,
    monthlyTuition,
    totalCost,
  }));

/** AMT, FDT and TST share one published table. */
const WAIVER_TIERS_TEXTILE = buildTiers([
  [55, 3200, 201600],
  [60, 2850, 184800],
  [65, 2500, 168000],
  [70, 2150, 151200],
  [75, 1800, 134400],
  [90, 700, 81600],
]);

const WAIVER_TIERS_CSE = buildTiers([
  [50, 3550, 218400],
  [55, 3200, 201600],
  [60, 2850, 184800],
  [65, 2500, 168000],
  [70, 2150, 151200],
  [85, 1050, 98400],
]);

const WAIVER_TIERS_BBA = buildTiers([
  [50, 2175, 144400],
  [60, 1750, 124000],
  [70, 1300, 102400],
  [75, 1100, 92800],
  [80, 900, 83200],
  [85, 500, 64000],
]);

/** Published fee tables for programmes outside the four-year Honours list. */
export const OTHER_FEE_TABLES = [
  {
    id: 'executive',
    name: {
      en: 'Executive Batch — B.Sc. (Hons.) AMT, FDT, CSE, TST & BBA (Friday only)',
      bn: 'এক্সিকিউটিভ ব্যাচ — বি.এসসি (অনার্স) এএমটি, এফডিটি, সিএসই, টিএসটি ও বিবিএ (শুধু শুক্রবার)',
    },
    rows: [
      {
        label: { en: 'Admission fee', bn: 'ভর্তি ফি' },
        value: { en: '৳10,500', bn: '১০,৫০০ টাকা' },
      },
      {
        label: { en: 'Semester fee', bn: 'সেমিস্টার ফি' },
        value: { en: '৳6,000 × 8 = ৳48,000', bn: '৬,০০০ × ৮ = ৪৮,০০০ টাকা' },
      },
      {
        label: { en: 'Monthly tuition', bn: 'মাসিক টিউশন' },
        value: { en: 'Points based (BoP) + ৳500', bn: 'পয়েন্ট অনুযায়ী + ৫০০ টাকা' },
      },
      {
        label: { en: 'Total cost', bn: 'সর্বমোট খরচ' },
        value: { en: 'BoP + ৳24,000', bn: 'পয়েন্ট + ২৪,০০০ টাকা' },
      },
    ],
  },
  {
    id: 'mba-am',
    name: {
      en: 'MBA in Apparel Merchandising (Friday only)',
      bn: 'এমবিএ ইন অ্যাপারেল মার্চেন্ডাইজিং (শুধু শুক্রবার)',
    },
    rows: [
      { label: { en: 'Admission fee', bn: 'ভর্তি ফি' }, value: { en: '৳10,500', bn: '১০,৫০০ টাকা' } },
      { label: { en: 'Registration fee', bn: 'রেজিস্ট্রেশন ফি' }, value: { en: '৳18,500', bn: '১৮,৫০০ টাকা' } },
      {
        label: { en: 'Semester fee', bn: 'সেমিস্টার ফি' },
        value: { en: '৳6,000 × 3 = ৳18,000', bn: '৬,০০০ × ৩ = ১৮,০০০ টাকা' },
      },
      { label: { en: 'Monthly tuition', bn: 'মাসিক টিউশন' }, value: { en: '৳3,000', bn: '৩,০০০ টাকা' } },
      { label: { en: 'Total cost', bn: 'সর্বমোট খরচ' }, value: { en: '৳1,01,000', bn: '১,০১,০০০ টাকা' } },
    ],
  },
  {
    id: 'mba-ba',
    name: {
      en: 'MBA in Business Administration (Friday only)',
      bn: 'এমবিএ ইন বিজনেস অ্যাডমিনিস্ট্রেশন (শুধু শুক্রবার)',
    },
    rows: [
      { label: { en: 'Admission fee', bn: 'ভর্তি ফি' }, value: { en: '৳10,000', bn: '১০,০০০ টাকা' } },
      { label: { en: 'Registration fee', bn: 'রেজিস্ট্রেশন ফি' }, value: { en: '৳5,000', bn: '৫,০০০ টাকা' } },
      {
        label: { en: 'Semester fee', bn: 'সেমিস্টার ফি' },
        value: { en: '৳5,000 × 2 = ৳10,000', bn: '৫,০০০ × ২ = ১০,০০০ টাকা' },
      },
      {
        label: { en: 'Monthly tuition', bn: 'মাসিক টিউশন' },
        value: { en: '৳5,000 / ৳4,167 / ৳3,334', bn: '৫,০০০ / ৪,১৬৭ / ৩,৩৩৪ টাকা' },
      },
      {
        label: { en: 'Total cost', bn: 'সর্বমোট খরচ' },
        value: { en: '৳70,000 / ৳60,000 / ৳50,000', bn: '৭০,০০০ / ৬০,০০০ / ৫০,০০০ টাকা' },
      },
    ],
  },
] as const;

export const PROGRAMS: Program[] = [
  {
    id: 'cse',
    code: 'CSE-NU-5526',
    title: {
      en: 'B.Sc. (Hons.) in Computer Science & Engineering',
      bn: 'বি.এসসি (অনার্স) ইন কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (সিএসই)',
    },
    shortTitle: 'CSE',
    degree: 'B.Sc. (Hons.)',
    level: 'undergraduate',
    duration: { en: '4 Years (8 Semesters)', bn: '৪ বছর (৮ সেমিস্টার)' },
    credits: 148,
    affiliation: 'National University',
    seats: 80,
    totalFee: 390000,
    semesterFee: 6000,
    admissionFee: 10500,
    monthlyTuition: 7125,
    tuitionMonths: 48,
    waiverTiers: WAIVER_TIERS_CSE,
    eligibility: {
      en: 'HSC or Equivalent / Diploma in Engineering from Science background with minimum GPA 2.50 in both SSC & HSC.',
      bn: 'বিজ্ঞান বিভাগে এসএসসি ও এইচএসসি অথবা পলিটেকনিক ডিপ্লোমা সম্পন্ন এবং উভয় পরীক্ষায় ন্যূনতম জিপিএ ২.৫০।',
    },
    overview: {
      en: 'A comprehensive curriculum combining theoretical foundations with hands-on software development, Artificial Intelligence, Machine Learning, Cloud Architecture, Cyber Security, and IoT systems.',
      bn: 'সফটওয়্যার ডেভেলপমেন্ট, কৃত্রিম বুদ্ধিমত্তা, ক্লাউড আর্কিটেকচার, সাইবার সিকিউরিটি ও আইওটি প্রযুক্তিতে ব্যবহারিক দক্ষতা অর্জনের জাতীয় বিশ্ববিদ্যালয় অধিভুক্ত পূর্ণাঙ্গ কোর্স।',
    },
    careerProspects: [
      { en: 'Full-Stack Software Engineer', bn: 'ফুল-স্ট্যাক সফটওয়্যার ইঞ্জিনিয়ার' },
      { en: 'AI & Data Analyst', bn: 'এআই ও ডেটা অ্যানালিস্ট' },
      { en: 'DevOps & Cloud Architect', bn: 'ডেভঅপ্স ও ক্লাউড আর্কিটেক্ট' },
      { en: 'Cyber Security Specialist', bn: 'সাইবার সিকিউরিটি বিশেষজ্ঞ' },
      { en: 'Industrial Automation Engineer', bn: 'ইন্ডাস্ট্রিয়াল অটোমেশন ইঞ্জিনিয়ার' },
    ],
    labs: ['Advanced Software Lab', 'Artificial Intelligence & Robotics Rig', 'Cisco Network Engineering Lab', 'Microprocessor & IoT Lab'],
    curriculum: [
      {
        semester: 1,
        title: { en: '1st Semester - Fundamentals', bn: '১ম সেমিস্টার - মৌলিক জ্ঞান' },
        courses: ['Structured Programming with C', 'Discrete Mathematics', 'Physics I (Electricity & Magnetism)', 'Differential & Integral Calculus', 'English for Engineers'],
      },
      {
        semester: 2,
        title: { en: '2nd Semester - Data Structures', bn: '২য় সেমিস্টার - ডেটা স্ট্রাকচার' },
        courses: ['Object-Oriented Programming (Java/C++)', 'Data Structures & Algorithms I', 'Digital Logic Design', 'Linear Algebra & Matrices', 'Engineering Economics'],
      },
      {
        semester: 3,
        title: { en: '3rd Semester - Advanced Algorithms', bn: '৩য় সেমিস্টার - অ্যাডভান্সড অ্যালগরিদম' },
        courses: ['Algorithms Design & Analysis', 'Database Management Systems (RDBMS & NoSQL)', 'Computer Architecture', 'Numerical Methods', 'Technical Writing'],
      },
      {
        semester: 4,
        title: { en: '4th Semester - Systems & Web', bn: '৪র্থ সেমিস্টার - সিস্টেমস ও ওয়েব' },
        courses: ['Operating Systems & UNIX', 'Web Engineering & Modern Frameworks', 'Microprocessors & Microcontrollers', 'Software Engineering Principles', 'Statistics & Probability'],
      },
      {
        semester: 5,
        title: { en: '5th Semester - Networks & Security', bn: '৫ম সেমিস্টার - নেটওয়ার্ক ও নিরাপত্তা' },
        courses: ['Computer Networks & Protocols', 'Theory of Computation', 'Cyber Security & Cryptography', 'Mobile Application Development', 'Management Information Systems'],
      },
      {
        semester: 6,
        title: { en: '6th Semester - AI & Cloud', bn: '৬ষ্ঠ সেমিস্টার - এআই ও ক্লাউড' },
        courses: ['Artificial Intelligence & Expert Systems', 'Compiler Design', 'Cloud Computing & DevOps', 'Internet of Things (IoT) Systems', 'Software Project I'],
      },
      {
        semester: 7,
        title: { en: '7th Semester - Deep Tech & Specialization', bn: '৭ম সেমিস্টার - মেশিন লার্নিং ও স্পেশালাইজেশন' },
        courses: ['Machine Learning & Pattern Recognition', 'Big Data Analytics', 'Computer Graphics & Image Processing', 'Elective Course I', 'Capstone Project Phase I'],
      },
      {
        semester: 8,
        title: { en: '8th Semester - Industrial Internship & Defense', bn: '৮ম সেমিস্টার - ইন্ডাস্ট্রিয়াল ইন্টার্নশিপ ও থিসিস' },
        courses: ['Industrial Internship (3 Months)', 'Senior Design Thesis Defense', 'Professional Ethics & IT Law', 'Tech Entrepreneurship'],
      },
    ],
    featuredImage: '/images/dept-cse.jpg',
  },
  {
    id: 'tst',
    code: 'TST-NU-5526',
    title: {
      en: 'B.Sc. (Hons.) in Textile Science & Technology',
      bn: 'বি.এসসি (অনার্স) ইন টেক্সটাইল সায়েন্স অ্যান্ড টেকনোলজি (টিএসটি)',
    },
    shortTitle: 'TST',
    degree: 'B.Sc. (Hons.)',
    level: 'undergraduate',
    duration: { en: '4 Years (8 Semesters)', bn: '৪ বছর (৮ সেমিস্টার)' },
    credits: 152,
    affiliation: 'National University',
    seats: 80,
    totalFee: 390000,
    semesterFee: 6000,
    admissionFee: 10500,
    monthlyTuition: 7125,
    tuitionMonths: 48,
    waiverTiers: WAIVER_TIERS_TEXTILE,
    eligibility: {
      en: 'HSC / Equivalent (Science) or Diploma in Textile / Engineering with minimum GPA 2.50 in both SSC & HSC.',
      bn: 'এইচএসসি (বিজ্ঞান) বা টেক্সটাইল/ইঞ্জিনিয়ারিং ডিপ্লোমা পাস এবং উভয় স্তরে ন্যূনতম জিপিএ ২.৫০।',
    },
    overview: {
      en: 'Designed to produce future-ready textile engineers capable of leading Bangladesh’s multi-billion dollar export industry through smart manufacturing, sustainable dyeing, automated yarn spinning, and technical textiles.',
      bn: 'স্মার্ট টেক্সটাইল উৎপাদন, পরিবেশবান্ধব ডাইং, স্বয়ংক্রিয় স্পিনিং ও টেকনিক্যাল টেক্সটাইলে আন্তর্জাতিক মানের প্রকৌশলী গড়ে তোলার লক্ষ্যে প্রণীত কোর্স।',
    },
    careerProspects: [
      { en: 'Textile Production & Quality Manager', bn: 'টেক্সটাইল প্রোডাকশন ও কোয়ালিটি ম্যানেজার' },
      { en: 'Wet Processing / Dyeing Technologist', bn: 'ওয়েট প্রসেসিং ও ডাইং টেকনোলজিস্ট' },
      { en: 'Textile Testing & Lab Specialist', bn: 'টেক্সটাইল টেস্টিং ও ল্যাব বিশেষজ্ঞ' },
      { en: 'Technical Merchandiser', bn: 'টেকনিক্যাল মার্চেন্ডাইজার' },
      { en: 'R&D Sustainable Fabric Engineer', bn: 'সাসটেইনেবল ফ্যাব্রিক আরঅ্যান্ডডি ইঞ্জিনিয়ার' },
    ],
    labs: ['Textile Testing & Quality Control Lab', 'Yarn & Spinning Technology Lab', 'Fabric Manufacturing Machinery Floor', 'Wet Processing & Dyeing Chemistry Lab'],
    curriculum: [
      {
        semester: 1,
        title: { en: '1st Semester - Textile Foundation', bn: '১ম সেমিস্টার - টেক্সটাইল ভিত্তি' },
        courses: ['Introduction to Textile Engineering', 'Physics for Textiles', 'Inorganic & Organic Chemistry', 'Engineering Mathematics I', 'Communicative English'],
      },
      {
        semester: 2,
        title: { en: '2nd Semester - Fiber to Yarn', bn: '২য় সেমিস্টার - ফাইবার ও সুতা' },
        courses: ['Natural & Synthetic Fibers', 'Yarn Manufacturing Principles I', 'Textile Chemistry Lab', 'Engineering Mechanics', 'Computer Fundamentals'],
      },
      {
        semester: 3,
        title: { en: '3rd Semester - Fabric Technology', bn: '৩য় সেমিস্টার - ফ্যাব্রিক টেকনোলজি' },
        courses: ['Fabric Manufacturing Technology I (Weaving)', 'Yarn Manufacturing Technology II', 'Applied Statistics', 'Electrical Technology & Electronics', 'Textile Testing & Quality Control I'],
      },
      {
        semester: 4,
        title: { en: '4th Semester - Wet Processing & Knitting', bn: '৪র্থ সেমিস্টার - ডাইং ও নিটিং' },
        courses: ['Wet Processing Technology I (Pre-treatment)', 'Fabric Manufacturing Technology II (Knitting)', 'Textile Machinery Maintenance', 'Environmental Management in Textiles', 'Production Planning & Control'],
      },
      {
        semester: 5,
        title: { en: '5th Semester - Advanced Dyeing & Printing', bn: '৫ম সেমিস্টার - কালারেশন ও ফিনিশিং' },
        courses: ['Dyeing Technology (Cotton, Synthetic, Blends)', 'Textile Printing & Finishing Methods', 'Automation in Textile Machinery', 'Garment Manufacturing Fundamentals', 'Industrial Safety & Compliance'],
      },
      {
        semester: 6,
        title: { en: '6th Semester - Smart & Technical Textiles', bn: '৬ষ্ঠ সেমিস্টার - স্মার্ট টেক্সটাইল' },
        courses: ['Smart & Functional Technical Textiles', 'Advanced Textile Testing & Instrumental Analysis', 'Textile Supply Chain & Merchandising', 'Operations Research in Manufacturing', 'Comprehensive Project I'],
      },
      {
        semester: 7,
        title: { en: '7th Semester - Industrial Systems', bn: '৭ম সেমিস্টার - শিল্প ব্যবস্থাপনা' },
        courses: ['Lean Manufacturing in Garments & Textiles', 'Costing, Sourcing & Quality Audit', 'Sustainable Production & ETP Systems', 'Elective Specialization', 'Senior Capstone Thesis'],
      },
      {
        semester: 8,
        title: { en: '8th Semester - Industrial Attachment', bn: '৮ম সেমিস্টার - শিল্প কারখানায় ইন্টার্নশিপ' },
        courses: ['Full-Time Factory Internship (12 Weeks)', 'Industrial Project Report & Viva', 'Professional Engineering Practice'],
      },
    ],
    featuredImage: '/images/dept-tst.webp',
  },
  {
    id: 'amt',
    code: 'AMT-NU-5526',
    title: {
      en: 'B.Sc. (Hons.) in Apparel Manufacture & Technology',
      bn: 'বি.এসসি (অনার্স) ইন অ্যাপারেল ম্যানুফ্যাকচার অ্যান্ড টেকনোলজি (এএমটি)',
    },
    shortTitle: 'AMT',
    degree: 'B.Sc. (Hons.)',
    level: 'undergraduate',
    duration: { en: '4 Years (8 Semesters)', bn: '৪ বছর (৮ সেমিস্টার)' },
    credits: 148,
    affiliation: 'National University',
    seats: 70,
    totalFee: 390000,
    semesterFee: 6000,
    admissionFee: 10500,
    monthlyTuition: 7125,
    tuitionMonths: 48,
    waiverTiers: WAIVER_TIERS_TEXTILE,
    eligibility: {
      en: 'HSC or Equivalent (Any discipline) with minimum GPA 2.50. Diploma holders in Garments/Textile can also apply.',
      bn: 'যেকোনো বিভাগ থেকে এইচএসসি বা সমমান পরীক্ষায় ন্যূনতম জিপিএ ২.৫০ অথবা সংশ্লিষ্ট ডিপ্লোমা।',
    },
    overview: {
      en: 'Focuses on cutting-edge apparel industrial engineering, automated cutting and sewing technologies, garment washing, quality assurance protocols, lean line balancing, and international merchandising.',
      bn: 'গার্মেন্টস ইন্ডাস্ট্রিয়াল ইঞ্জিনিয়ারিং, অটোমেটেড কাটিং-স্যুইং প্রযুক্তি, ওয়াশিং, কোয়ালিটি ম্যানেজমেন্ট ও গ্লোবাল মার্চেন্ডাইজিংয়ে দক্ষ নেতৃত্ব তৈরির প্রোগ্রাম।',
    },
    careerProspects: [
      { en: 'Apparel Merchandiser / Buying House Head', bn: 'অ্যাপারেল মার্চেন্ডাইজার / বায়িং হাউস এক্সিকিউটিভ' },
      { en: 'Garment Production Manager (PM)', bn: 'গার্মেন্টস প্রোডাকশন ম্যানেজার (পিএম)' },
      { en: 'Industrial Engineer (IE Executive)', bn: 'ইন্ডাস্ট্রিয়াল ইঞ্জিনিয়ারিং (আইই এক্সিকিউটিভ)' },
      { en: 'Quality Assurance & Compliance Auditor', bn: 'কোয়ালিটি অ্যাসিওরেন্স ও কমপ্লায়েন্স অডিটর' },
      { en: 'Washing & Finishing Specialist', bn: 'ওয়াশিং ও ফিনিশিং বিশেষজ্ঞ' },
    ],
    labs: ['Industrial Garment Machinery Floor', 'Pattern Engineering & CAD Lab', 'Garment Washing & Color Fastness Lab', 'Textile Testing Suite'],
    curriculum: [
      {
        semester: 1,
        title: { en: '1st Semester - Fundamentals of Apparel', bn: '১ম সেমিস্টার - পোশাক বিজ্ঞানের ভিত্তি' },
        courses: ['Introduction to Clothing Technology', 'Textile Raw Materials & Fibers', 'Basic Mathematics', 'Chemistry for Garments', 'English Communication'],
      },
      {
        semester: 2,
        title: { en: '2nd Semester - Pattern Making & Cutting', bn: '২য় সেমিস্টার - প্যাটার্ন মেকিং ও কাটিং' },
        courses: ['Pattern Construction I (Manual & Flat Pattern)', 'Fabric Science & Analysis', 'Sewing Technology I', 'Applied Physics', 'Computer Applications in Garments'],
      },
      {
        semester: 3,
        title: { en: '3rd Semester - Advanced Sewing & Machinery', bn: '৩য় সেমিস্টার - সেলাই ও যন্ত্রপাতি' },
        courses: ['Sewing Technology II (Special Machinery)', 'Pattern Construction II (Grading & Draping)', 'Spreading & Cutting Room Management', 'Textile Testing & Quality Evaluation', 'Industrial Management Principles'],
      },
      {
        semester: 4,
        title: { en: '4th Semester - Apparel CAD & IE', bn: '৪র্থ সেমিস্টার - অ্যাপারেল ক্যাড ও আইই' },
        courses: ['Computer-Aided Pattern Design (CAD/CAM)', 'Industrial Engineering & Work Study (IE)', 'Garment Trims, Accessories & Packaging', 'Apparel Production Planning & Control', 'Environmental Compliance'],
      },
      {
        semester: 5,
        title: { en: '5th Semester - Merchandising & Costing', bn: '৫ম সেমিস্টার - মার্চেন্ডাইজিং ও কস্টিং' },
        courses: ['Apparel Merchandising & Sourcing', 'Garment Costing & Consumption Calculation', 'Washing & Dyeing of Garments', 'Quality Assurance & AQL Standards', 'International Trade & Export Procedures'],
      },
      {
        semester: 6,
        title: { en: '6th Semester - Supply Chain & Lean', bn: '৬ষ্ঠ সেমিস্টার - সাপ্লাই চেইন ও লিন' },
        courses: ['Supply Chain Logistics in RMG Sector', 'Lean Manufacturing & Six Sigma in Garments', 'RMG Social Compliance & Labor Law', 'Apparel Marketing & Brand Strategy', 'Technical Project I'],
      },
      {
        semester: 7,
        title: { en: '7th Semester - Smart Factory & Automation', bn: '৭ম সেমিস্টার - অটোমেশন ও অডিট' },
        courses: ['Smart Garment Automation & Industry 4.0', 'Buying House Operations Management', 'Sustainable Fast Fashion', 'Senior Capstone Project', 'Elective Subject'],
      },
      {
        semester: 8,
        title: { en: '8th Semester - Industrial Internship', bn: '৮ম সেমিস্টার - শিল্প কারখানায় ইন্টার্নশিপ' },
        courses: ['Factory Industrial Internship (12 Weeks)', 'Merchandising & Production Defense', 'Comprehensive RMG Viva Voce'],
      },
    ],
    featuredImage: '/images/dept-amt.webp',
  },
  {
    id: 'fdt',
    code: 'FDT-NU-5526',
    title: {
      en: 'B.Sc. (Hons.) in Fashion Design & Technology',
      bn: 'বি.এসসি (অনার্স) ইন ফ্যাশন ডিজাইন অ্যান্ড টেকনোলজি (এফডিটি)',
    },
    shortTitle: 'FDT',
    degree: 'B.Sc. (Hons.)',
    level: 'undergraduate',
    duration: { en: '4 Years (8 Semesters)', bn: '৪ বছর (৮ সেমিস্টার)' },
    credits: 148,
    affiliation: 'National University',
    seats: 60,
    totalFee: 390000,
    semesterFee: 6000,
    admissionFee: 10500,
    monthlyTuition: 7125,
    tuitionMonths: 48,
    waiverTiers: WAIVER_TIERS_TEXTILE,
    eligibility: {
      en: 'HSC or Equivalent from Science, Arts, or Commerce with minimum GPA 2.50. Creative aptitude appreciated.',
      bn: 'যেকোনো গ্রুপ থেকে এইচএসসি বা সমমান পরীক্ষায় ন্যূনতম জিপিএ ২.৫০। সৃজনশীলতায় আগ্রহী প্রার্থীরা অগ্রাধিকারযোগ্য।',
    },
    overview: {
      en: 'Fuses artistic creativity, runway aesthetics, and technological expertise in digital fashion illustration, trend forecasting, couture construction, surface ornamentation, and global fashion branding.',
      bn: 'ফ্যাশন ইলাস্ট্রেশন, ট্রেন্ড ফোরকাস্টিং, কোটিউর কনস্ট্রাকশন, টেক্সটাইল অলংকরণ ও আন্তর্জাতিক ফ্যাশন ব্র্যান্ডিংয়ের মাধ্যমে আধুনিক ফ্যাশন ডিজাইনার গড়ার উচ্চতর কোর্স।',
    },
    careerProspects: [
      { en: 'Chief Fashion Designer / Stylist', bn: 'প্রধান ফ্যাশন ডিজাইনার / স্টাইলিস্ট' },
      { en: 'Digital Apparel Illustrator & CAD Designer', bn: 'ডিজিটাল ফ্যাশন ইলাস্ট্রেটর ও ক্যাড ডিজাইনার' },
      { en: 'Trend Forecaster & Creative Director', bn: 'ট্রেন্ড ফোরকাস্টার ও ক্রিয়েটিভ ডিরেক্টর' },
      { en: 'Fashion Merchandiser & Buyer', bn: 'ফ্যাশন মার্চেন্ডাইজার ও বায়ার' },
      { en: 'Independent Brand Founder / Entrepreneur', bn: 'ফ্যাশন উদ্যোক্তা ও নিজস্ব ব্র্যান্ড প্রতিষ্ঠাতা' },
    ],
    labs: ['Fashion Illustration & Studio Workshop', 'Pattern Engineering & Draping Lab', 'Surface Ornamentation & Batik/Screen Lab', 'Digital 3D Fashion CAD Suite'],
    curriculum: [
      {
        semester: 1,
        title: { en: '1st Semester - Design Foundations', bn: '১ম সেমিস্টার - ডিজাইনের ভিত্তি' },
        courses: ['Elements & Principles of Fashion Design', 'Figure Drawing & Fashion Illustration I', 'Color Theory & Composition', 'Introduction to Textiles', 'Communicative English'],
      },
      {
        semester: 2,
        title: { en: '2nd Semester - Anatomy & Draping', bn: '২য় সেমিস্টার - অ্যানাটমি ও ড্রেপিং' },
        courses: ['Fashion Figure Anatomy & Styling II', 'Basic Pattern Making & Draping Techniques', 'History of World & Bengali Costumes', 'Fabric Manipulation & Surface Design', 'Computer Graphics for Fashion (Photoshop/Illustrator)'],
      },
      {
        semester: 3,
        title: { en: '3rd Semester - Advanced Pattern & CAD', bn: '৩য় সেমিস্টার - অ্যাডভান্সড ক্যাড ও পোশাক' },
        courses: ['Advanced Pattern Drafting & Grading', 'Apparel Construction I (Womenswear)', 'Computer-Aided Fashion Design (CAD)', 'Textile Printing, Dyeing & Embroidery', 'Trend Forecasting & Moodboards'],
      },
      {
        semester: 4,
        title: { en: '4th Semester - Menswear & Childrenswear', bn: '৪র্থ সেমিস্টার - মেন্সওয়্যার ও স্পেশাল পোশাক' },
        courses: ['Apparel Construction II (Menswear & Kids)', 'Traditional Textiles & Heritage Crafts', 'Knitwear Design & Technology', 'Fashion Marketing & Retail Management', 'Photography & Visual Merchandising'],
      },
      {
        semester: 5,
        title: { en: '5th Semester - Haute Couture & Evening Wear', bn: '৫ম সেমিস্টার - কোটিউর ও ইভিনিং ওয়্যার' },
        courses: ['Haute Couture & Bridal Wear Design', 'Digital 3D Garment Simulation (CLO 3D)', 'Fashion Brand Management & Identity', 'Garment Costing & Export Operations', 'Sustainable & Circular Fashion'],
      },
      {
        semester: 6,
        title: { en: '6th Semester - Runway Collection & Staging', bn: '৬ষ্ঠ সেমিস্টার - রানওয়ে কালেকশন' },
        courses: ['Runway Collection Design & Curation', 'Costume Design for Film & Performing Arts', 'Fashion PR, Media & Influencer Marketing', 'Design Portfolio Development', 'Pre-Graduation Design Thesis'],
      },
      {
        semester: 7,
        title: { en: '7th Semester - Graduation Collection Creation', bn: '৭ম সেমিস্টার - গ্র্যাজুয়েশন কালেকশন' },
        courses: ['Graduation Fashion Collection Construction (6 Ensembles)', 'Fashion Entrepreneurship & Business Launch', 'Intellectual Property & Copyright in Fashion', 'Elective Studio Specialization'],
      },
      {
        semester: 8,
        title: { en: '8th Semester - Fashion Show & Industry Attachment', bn: '৮ম সেমিস্টার - ফ্যাশন শো ও ইন্টার্নশিপ' },
        courses: ['Annual BIST Runway Gala Fashion Show', 'Fashion House / Buying House Internship (12 Weeks)', 'Comprehensive Portfolio Defense'],
      },
    ],
    featuredImage: '/images/dept-fdt.webp',
  },
  {
    id: 'bba',
    code: 'BBA-NU-5526',
    title: {
      en: 'Bachelor of Business Administration (Professional BBA)',
      bn: 'ব্যাচেলর অব বিজনেস অ্যাডমিনিস্ট্রেশন (প্রফেশনাল বিবিএ)',
    },
    shortTitle: 'BBA',
    degree: 'BBA (Professional)',
    level: 'undergraduate',
    duration: { en: '4 Years (8 Semesters)', bn: '৪ বছর (৮ সেমিস্টার)' },
    credits: 126,
    affiliation: 'National University',
    seats: 90,
    totalFee: 248800,
    semesterFee: 5000,
    admissionFee: 10500,
    monthlyTuition: 4350,
    tuitionMonths: 48,
    waiverTiers: WAIVER_TIERS_BBA,
    eligibility: {
      en: 'HSC or Equivalent from Business Studies, Science, or Humanities with minimum GPA 2.50 in both exams.',
      bn: 'ব্যবসায় শিক্ষা, বিজ্ঞান অথবা মানবিক বিভাগ থেকে এসএসসি ও এইচএসসিতে ন্যূনতম জিপিএ ২.৫০।',
    },
    overview: {
      en: 'Equips graduates with contemporary managerial, analytical, and leadership acumen across Finance, Marketing, Human Resource Management, and RMG Supply Chain Management.',
      bn: 'ফাইন্যান্স, মার্কেটিং, হিউম্যান রিসোর্স ও আরএমজি সাপ্লাই চেইন ম্যানেজমেন্টে নেতৃত্ব ও সিদ্ধান্ত গ্রহণে সক্ষম করপোরেট লিডার গড়ার যুগোপযোগী প্রফেশনাল ডিগ্রি।',
    },
    careerProspects: [
      { en: 'Corporate Branch & Operations Manager', bn: 'করপোরেট ব্রাঞ্চ ও অপারেশনস ম্যানেজার' },
      { en: 'Financial Analyst / Banking Executive', bn: 'আর্থিক বিশ্লেষক ও ব্যাংকিং অফিসার' },
      { en: 'Digital Marketing & Growth Strategist', bn: 'ডিজিটাল মার্কেটিং ও গ্রোথ স্ট্র্যাটেজিস্ট' },
      { en: 'HR & Talent Acquisition Lead', bn: 'এইচআর ও ট্যালেন্ট অ্যাকুইজিশন প্রধান' },
      { en: 'Supply Chain & Procurement Officer', bn: 'সাপ্লাই চেইন ও প্রকিউরমেন্ট অফিসার' },
    ],
    labs: ['Business Analytics & Statistical Lab', 'Digital Marketing Simulator', 'Language & Presentation Studio'],
    curriculum: [
      {
        semester: 1,
        title: { en: '1st Semester - Business Foundations', bn: '১ম সেমিস্টার - ব্যবসায়িক জ্ঞান' },
        courses: ['Introduction to Business', 'Financial Accounting I', 'Business Mathematics', 'Microeconomics', 'Business Communication in English'],
      },
      {
        semester: 2,
        title: { en: '2nd Semester - Management & Macroeconomics', bn: '২য় সেমিস্টার - ব্যবস্থাপনা ও সামষ্টিক অর্থনীতি' },
        courses: ['Principles of Management', 'Financial Accounting II', 'Macroeconomics', 'Business Statistics I', 'Computer Applications in Business'],
      },
      {
        semester: 3,
        title: { en: '3rd Semester - Marketing & Finance Basics', bn: '৩য় সেমিস্টার - বিপণন ও অর্থায়ন' },
        courses: ['Principles of Marketing', 'Business Statistics II', 'Managerial Accounting', 'Business Law & Corporate Governance', 'Organizational Behavior'],
      },
      {
        semester: 4,
        title: { en: '4th Semester - Financial Management', bn: '৪র্থ সেমিস্টার - ফাইন্যান্সিয়াল ম্যানেজমেন্ট' },
        courses: ['Financial Management', 'Marketing Management', 'Human Resource Management', 'Business Ethics & CSR', 'Operations Management'],
      },
      {
        semester: 5,
        title: { en: '5th Semester - Research & E-Commerce', bn: '৫ম সেমিস্টার - গবেষণা ও ই-কমার্স' },
        courses: ['Business Research Methods', 'Management Information Systems (MIS)', 'E-Commerce & Digital Business', 'Corporate Finance', 'International Business'],
      },
      {
        semester: 6,
        title: { en: '6th Semester - Strategic Leadership', bn: '৬ষ্ঠ সেমিস্টার - স্ট্র্যাটেজিক লিডারশিপ' },
        courses: ['Strategic Management', 'Entrepreneurship Development', 'Supply Chain Management', 'Major Elective Course I', 'Major Elective Course II'],
      },
      {
        semester: 7,
        title: { en: '7th Semester - Major Specialization', bn: '৭ম সেমিস্টার - স্পেশালাইজেশন' },
        courses: ['Major Elective Course III', 'Major Elective Course IV', 'Taxation & Auditing Practice', 'Project Management', 'Pre-Internship Seminar'],
      },
      {
        semester: 8,
        title: { en: '8th Semester - Corporate Internship', bn: '৮ম সেমিস্টার - করপোরেট ইন্টার্নশিপ' },
        courses: ['Corporate Organization Internship (12 Weeks)', 'Research Monograph & Defense', 'Comprehensive Viva Voce'],
      },
    ],
    featuredImage: '/images/dept-bba.webp',
  },
];

export const DIPLOMA_TEXTILE_PROGRAMS = [
  {
    name: { en: 'Fabric Manufacturing Technology', bn: 'ফ্যাব্রিক ম্যানুফ্যাকচারিং টেকনোলজি' },
    duration: '4 Years',
    code: 'BTEB-53098-FMT',
    affiliation: 'BTEB',
    description: {
      en: 'Master weaving, circular knitting, warp preparation, and modern automated loom operations.',
      bn: 'উইভিং, নিটিং, ওয়ার্প প্রস্তুতি এবং আধুনিক টেক্সটাইল লুম পরিচালনার ব্যবহারিক শিক্ষা।',
    },
  },
  {
    name: { en: 'Apparel Manufacturing Technology', bn: 'অ্যাপারেল ম্যানুফ্যাকচারিং টেকনোলজি' },
    duration: '4 Years',
    code: 'BTEB-53098-AMT',
    affiliation: 'BTEB',
    description: {
      en: 'Complete garment construction, industrial sewing, pattern grading, and quality audit methods.',
      bn: 'গার্মেন্টস কাটিং, সুইং, প্যাটার্ন গ্রেডিং এবং রপ্তানিমুখী কোয়ালিটি নিয়ন্ত্রণ পদ্ধতি।',
    },
  },
  {
    name: { en: 'Wet Processing Technology', bn: 'ওয়েট প্রসেসিং টেকনোলজি' },
    duration: '4 Years',
    code: 'BTEB-53098-WPT',
    affiliation: 'BTEB',
    description: {
      en: 'Textile scouring, bleaching, synthetic & reactive dyeing, printing techniques, and ETP effluent management.',
      bn: 'ব্লিচিং, ডাইং, প্রিন্টিং রসায়ন, ফিনিশিং ও শিল্প বর্জ্য শোধনাগার (ইটিপি) ব্যবস্থাপনা।',
    },
  },
  {
    name: { en: 'Yarn Processing Technology', bn: 'ইয়ার্ন প্রসেসিং টেকনোলজি' },
    duration: '4 Years',
    code: 'BTEB-53098-YPT',
    affiliation: 'BTEB',
    description: {
      en: 'Cotton blending, blowroom operations, carding, drawing, roving, ring spinning, and rotor yarn manufacturing.',
      bn: 'তুলা বাছাই, ব্লো-রুম, কার্ডিং, ড্রয়িং, রিং ও রোটর স্পিনিংয়ের বিস্তারিত প্রযুক্তি।',
    },
  },
];

export const DIPLOMA_ENGINEERING_PROGRAMS = [
  { name: { en: 'Computer Technology', bn: 'কম্পিউটার টেকনোলজি' }, duration: '4 Years', code: 'BTEB-53098-CT' },
  { name: { en: 'Electrical Technology', bn: 'ইলেকট্রিক্যাল টেকনোলজি' }, duration: '4 Years', code: 'BTEB-53098-ET' },
  { name: { en: 'Electronics Technology', bn: 'ইলেকট্রনিক্স টেকনোলজি' }, duration: '4 Years', code: 'BTEB-53098-ENT' },
  { name: { en: 'Civil Technology', bn: 'সিভিল টেকনোলজি' }, duration: '4 Years', code: 'BTEB-53098-CV' },
  { name: { en: 'Mechanical Technology', bn: 'মেকানিক্যাল টেকনোলজি' }, duration: '4 Years', code: 'BTEB-53098-ME' },
  { name: { en: 'Marine Technology', bn: 'মেরিন টেকনোলজি' }, duration: '4 Years', code: 'BTEB-53098-MR' },
  { name: { en: 'Garment Design & Pattern Making', bn: 'গার্মেন্ট ডিজাইন অ্যান্ড প্যাটার্ন মেকিং' }, duration: '4 Years', code: 'BTEB-53098-GDPM' },
  { name: { en: 'Automobile Technology', bn: 'অটোমোবাইল টেকনোলজি' }, duration: '4 Years', code: 'BTEB-53098-AT' },
  { name: { en: 'Refrigeration & Air Conditioning (RAC)', bn: 'রেফ্রিজারেশন অ্যান্ড এয়ার কন্ডিশনিং (আরএসি)' }, duration: '4 Years', code: 'BTEB-53098-RAC' },
  { name: { en: 'Architecture & Interior Design', bn: 'আর্কিটেকচার অ্যান্ড ইন্টেরিয়র ডিজাইন' }, duration: '4 Years', code: 'BTEB-53098-AID' },
];

/*
 * Archived placeholder rosters and demo content (invented people, notices,
 * testimonials and Unsplash portraits) were removed on 30 Sep 2026. The app
 * renders real mirrored data from ./peopleData and ./liveData only.
 */

/** Linkages and networking exactly as listed on bist.edu.bd/page/at-a-glance. */
export const PARTNERS_PROJECTS = [
  {
    name: 'BGMEA',
    category: 'Industry Association',
    desc: 'Bangladesh Garment Manufacturers and Exporters Association',
  },
  {
    name: 'SEIP',
    category: 'Government Skills Project',
    desc: 'Skills for Employment Investment Program',
  },
  {
    name: 'BACI',
    category: 'Industry Association',
    desc: 'Bangladesh Association of Construction Industry',
  },
  {
    name: 'Sudokkho',
    category: 'Skills & Employment Programme',
    desc: 'Skills and Employment Programme in Bangladesh',
  },
  {
    name: 'B-SkillFUL',
    category: 'Skills Programme',
    desc: 'Building Skills for Unemployed and Underemployed Labour',
  },
  {
    name: 'NSDA',
    category: 'Government Regulator',
    desc: 'National Skills Development Authority — recognised RPL assessment centre',
  },
];

export const FAQS = [
  {
    question: {
      en: 'What are the admission requirements for National University B.Sc. (Hons.) at BIST?',
      bn: 'বিআইএসটি-তে জাতীয় বিশ্ববিদ্যালয় অধিভুক্ত বি.এসসি (অনার্স) ভর্তির যোগ্যতা কী?',
    },
    answer: {
      en: 'Applicants must have passed SSC and HSC (or Diploma in Engineering) with a minimum GPA of 2.50 in both examinations from relevant science or equivalent backgrounds. Candidates can apply online or directly at the campus admission booth.',
      bn: 'আবেদনকারীকে বিজ্ঞান বা সংশ্লিষ্ট বিভাগ থেকে এসএসসি ও এইচএসসি অথবা সমমানের ডিপ্লোমা পরীক্ষায় উভয় ক্ষেত্রে ন্যূনতম জিপিএ ২.৫০ পেয়ে উত্তীর্ণ হতে হবে। অনলাইনে অথবা সরাসরি ক্যাম্পাসে এসে আবেদন করা যাবে।',
    },
    category: 'admissions',
  },
  {
    question: {
      en: 'Can Polytechnic Diploma-in-Engineering holders enroll directly in B.Sc. (Honours)?',
      bn: 'পলিটেকনিক ডিপ্লোমাধারীরা কি সরাসরি বি.এসসি (অনার্স) ইঞ্জিনিয়ারিংয়ে ভর্তি হতে পারবেন?',
    },
    answer: {
      en: 'Yes! Diploma graduates in Computer, Textile, Electrical, Garments, etc. from BTEB can enroll directly into B.Sc. (Hons.) in CSE, TST, AMT, and FDT with special fee waivers and credit equivalency.',
      bn: 'হ্যাঁ! কারিগরি শিক্ষা বোর্ডের অধীনে ৪ বছর মেয়াদি ডিপ্লোমা সম্পন্ন শিক্ষার্থীরা সরাসরি সিএসই, টিএসটি, এএমটি ও এফডিটি কোর্সে বিশেষ ওয়েভার ও ক্রেডিট সমন্বয়ের মাধ্যমে ভর্তি হতে পারবেন।',
    },
    category: 'admissions',
  },
  {
    question: {
      en: 'What scholarship facilities are available at BIST Gazipur?',
      bn: 'বিআইএসটি-তে কী কী স্কলারশিপ বা বৃত্তি সুবিধা রয়েছে?',
    },
    answer: {
      en: 'BIST offers up to 100% tuition fee waiver for 100 students every academic session based on merit and financial need. Additionally, students with GPA 5.00 in SSC and HSC receive special scholarships. Quotas are available for physically challenged students, female candidates, and ethnic minorities.',
      bn: 'প্রতি শিক্ষাবর্ষে ১০০ জন শিক্ষার্থীর জন্য ১০০% সম্পূর্ণ টিউশন ফি মওকুফ বৃত্তি পরীক্ষা অনুষ্ঠিত হয়। এছাড়া এসএসসি ও এইচএসসিতে জিপিএ ৫.০০ প্রাপ্তরা বিশেষ ওয়েভার পান। নারী শিক্ষার্থী, ক্ষুদ্র নৃগোষ্ঠী ও বিশেষ চাহিদাসম্পন্ন শিক্ষার্থীদের জন্য বিশেষ কোটা প্রযোজ্য।',
    },
    category: 'scholarships',
  },
  {
    question: {
      en: 'Is BIST recognized by National University, BTEB, and NSDA?',
      bn: 'বিআইএসটি কি জাতীয় বিশ্ববিদ্যালয়, কারিগরি বোর্ড ও এনএসডিএ অনুমোদিত?',
    },
    answer: {
      en: 'Yes, BIST holds official accreditations: National University College Code: 5526, Bangladesh Technical Education Board (BTEB) Code: 53098, and National Skills Development Authority (NSDA) Registered Training Organization Code: STP-GAZ-000020.',
      bn: 'হ্যাঁ, বিআইএসটি জাতীয় বিশ্ববিদ্যালয়ের কলেজ কোড ৫৫২৬, কারিগরি শিক্ষাবোর্ড কোড ৫৩০৯৮ এবং এনএসডিএ কোড STP-GAZ-000020 এর অধীনে পূর্ণাঙ্গ স্বীকৃতিপ্রাপ্ত।',
    },
    category: 'accreditation',
  },
  {
    question: {
      en: 'Where is the campus located and how can I visit?',
      bn: 'ক্যাম্পাসটি কোথায় অবস্থিত এবং কীভাবে যোগাযোগ করা যাবে?',
    },
    answer: {
      en: 'BIST is located at Unishe Tower, Mymensingh Road, Chandona Chowrasta, Gazipur-1702. For admissions, call 01913-555111, or for general queries call 01908-909090. WhatsApp is also available at +8801913555111.',
      bn: 'ক্যাম্পাসটি গাজীপুরের চান্দনা চৌরাস্তায় ময়মনসিংহ রোডে অবস্থিত উনিশে টাওয়ারে। ভর্তির জন্য সরাসরি ০১৯১৩-৫৫৫১১১ নম্বরে এবং অফিসের জন্য ০১৯০৮-৯০৯০৯০ নম্বরে কল করুন।',
    },
    category: 'general',
  },
];
