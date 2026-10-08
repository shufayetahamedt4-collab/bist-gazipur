/**
 * The course catalogue behind the Academics menu.
 *
 * Three levels are modelled here so a new course never requires touching a
 * component:
 *
 *   honours — the four-year B.Sc. (Hons.)/BBA degrees. These are projected
 *             straight from `PROGRAMS`, so the honours cards and the existing
 *             department pages can never drift apart.
 *   pgd     — Post Graduate Diploma programmes.
 *   short   — the skill courses the institute's own centre runs.
 *
 * `source` is the honesty switch: `live` means the row mirrors something the
 * institution publishes, `placeholder` means the course exists but its numbers
 * have not been supplied yet, so the UI shows "to be published" instead of a
 * fabricated fee, duration or outline.
 */

import { CourseLevel, CourseOffer } from '../types';
import { OTHER_FEE_TABLES, PROGRAMS } from './catalogData';

/** Honours degrees, projected from the single source of truth in catalogData. */
const HONOURS_FROM_PROGRAMS: CourseOffer[] = PROGRAMS.filter(
  (program) => program.level === 'undergraduate'
).map((program) => ({
  id: program.id,
  code: program.code,
  shortTitle: program.shortTitle,
  title: program.title,
  level: 'honours' as CourseLevel,
  affiliation: program.affiliation,
  duration: program.duration,
  credits: program.credits,
  seats: program.seats,
  totalFee: program.totalFee,
  summary: program.overview,
  highlights: program.careerProspects.slice(0, 4),
  eligibility: program.eligibility,
  honoursProgramId: program.id,
  image: program.featuredImage,
  source: 'live',
}));

/**
 * The Friday-only executive batch, published as its own fee table on
 * bist.edu.bd/page/tuition-fee and therefore a distinct way to take the same
 * degrees. It has no `PROGRAMS` entry, so its card deep-links to the generic
 * course page instead of a department page.
 */
const EXECUTIVE_BATCH: CourseOffer = {
  id: 'executive-honours',
  code: 'NU-5526-EXEC',
  shortTitle: 'Executive',
  title: {
    en: 'B.Sc. (Hons.) Executive Batch — CSE, TST, AMT, FDT & BBA (Friday only)',
    bn: 'বি.এসসি (অনার্স) এক্সিকিউটিভ ব্যাচ — সিএসই, টিএসটি, এএমটি, এফডিটি ও বিবিএ (শুধু শুক্রবার)',
  },
  level: 'honours',
  affiliation: 'National University',
  duration: { en: '4 Years (8 Semesters), Friday only', bn: '৪ বছর (৮ সেমিস্টার), শুধু শুক্রবার' },
  summary: {
    en: 'The same National University Honours degrees delivered on a Friday-only schedule for students who are already working, with a dedicated published fee table.',
    bn: 'কর্মরত শিক্ষার্থীদের জন্য শুক্রবার-ভিত্তিক সময়সূচিতে জাতীয় বিশ্ববিদ্যালয়ের একই অনার্স ডিগ্রি, আলাদা প্রকাশিত ফি তালিকা সহ।',
  },
  highlights: [
    { en: 'Friday-only class schedule', bn: 'শুধু শুক্রবার ক্লাস' },
    { en: 'Separate published fee table', bn: 'আলাদা প্রকাশিত ফি তালিকা' },
    { en: 'Open to working professionals', bn: 'কর্মরত পেশাজীবীদের জন্য উন্মুক্ত' },
  ],
  source: 'live',
};

export const HONOURS_COURSES: CourseOffer[] = [...HONOURS_FROM_PROGRAMS, EXECUTIVE_BATCH];

/**
 * Post Graduate Diploma programmes.
 *
 * PLACEHOLDER: BIST offers postgraduate diplomas, but the institution has not
 * published their fees, credit hours or full outlines in a form we could mirror.
 * The rows are therefore marked `placeholder` and the UI prints "To be
 * published" rather than inventing numbers. The admission office can simply fill
 * `duration`, `totalFee` and `curriculum` in here and flip `source` to 'live'.
 */
export const PGD_COURSES: CourseOffer[] = [
  {
    id: 'pgd-apparel-merchandising',
    code: 'BIST-PGD-AM',
    shortTitle: 'PGD AM',
    title: {
      en: 'Post Graduate Diploma in Apparel Merchandising',
      bn: 'পোস্ট গ্র্যাজুয়েট ডিপ্লোমা ইন অ্যাপারেল মার্চেন্ডাইজিং',
    },
    level: 'pgd',
    affiliation: 'National University',
    summary: {
      en: 'Advanced merchandising practice for graduates moving into export order management, costing, sourcing and buyer negotiation.',
      bn: 'রপ্তানি অর্ডার ব্যবস্থাপনা, কস্টিং, সোর্সিং ও বায়ার নেগোসিয়েশনে কর্মরত গ্র্যাজুয়েটদের জন্য উন্নত মার্চেন্ডাইজিং প্রশিক্ষণ।',
    },
    highlights: [
      { en: 'Apparel costing & consumption', bn: 'অ্যাপারেল কস্টিং ও কনজাম্পশন' },
      { en: 'Sourcing and supply chain', bn: 'সোর্সিং ও সাপ্লাই চেইন' },
      { en: 'Buyer communication', bn: 'বায়ার কমিউনিকেশন' },
    ],
    image: './images/dept-amt.webp',
    source: 'placeholder',
  },
  {
    id: 'pgd-textile-technology',
    code: 'BIST-PGD-TT',
    shortTitle: 'PGD TT',
    title: {
      en: 'Post Graduate Diploma in Textile Technology',
      bn: 'পোস্ট গ্র্যাজুয়েট ডিপ্লোমা ইন টেক্সটাইল টেকনোলজি',
    },
    level: 'pgd',
    affiliation: 'National University',
    summary: {
      en: 'Spinning, fabric formation, wet processing and quality assurance for professionals who need the textile chain end to end.',
      bn: 'স্পিনিং, ফ্যাব্রিক ফর্মেশন, ওয়েট প্রসেসিং ও কোয়ালিটি অ্যাস্যুরেন্স — সম্পূর্ণ টেক্সটাইল চেইনের ব্যবহারিক জ্ঞান।',
    },
    highlights: [
      { en: 'Yarn & fabric manufacturing', bn: 'ইয়ার্ন ও ফ্যাব্রিক ম্যানুফ্যাকচারিং' },
      { en: 'Dyeing, printing & finishing', bn: 'ডাইং, প্রিন্টিং ও ফিনিশিং' },
      { en: 'Textile testing standards', bn: 'টেক্সটাইল টেস্টিং স্ট্যান্ডার্ড' },
    ],
    image: './images/dept-tst.webp',
    source: 'placeholder',
  },
  {
    id: 'pgd-computer-science',
    code: 'BIST-PGD-CS',
    shortTitle: 'PGD CS',
    title: {
      en: 'Post Graduate Diploma in Computer Science & Information Technology',
      bn: 'পোস্ট গ্র্যাজুয়েট ডিপ্লোমা ইন কম্পিউটার সায়েন্স অ্যান্ড ইনফরমেশন টেকনোলজি',
    },
    level: 'pgd',
    affiliation: 'National University',
    summary: {
      en: 'A conversion programme for non-CSE graduates: programming fundamentals, databases, networking and applied software development.',
      bn: 'নন-সিএসই গ্র্যাজুয়েটদের জন্য প্রোগ্রামিং, ডাটাবেজ, নেটওয়ার্কিং ও প্রয়োগভিত্তিক সফটওয়্যার ডেভেলপমেন্টের কোর্স।',
    },
    highlights: [
      { en: 'Programming fundamentals', bn: 'প্রোগ্রামিং ফান্ডামেন্টাল' },
      { en: 'Database & networking', bn: 'ডাটাবেজ ও নেটওয়ার্কিং' },
      { en: 'Applied project work', bn: 'প্রায়োগিক প্রজেক্ট' },
    ],
    image: './images/dept-cse.jpg',
    source: 'placeholder',
  },
  {
    id: 'pgd-business-administration',
    code: 'BIST-PGD-BA',
    shortTitle: 'PGD BA',
    title: {
      en: 'Post Graduate Diploma in Business Administration',
      bn: 'পোস্ট গ্র্যাজুয়েট ডিপ্লোমা ইন বিজনেস অ্যাডমিনিস্ট্রেশন',
    },
    level: 'pgd',
    affiliation: 'National University',
    summary: {
      en: 'Management, accounting, marketing and human resource foundations for graduates preparing for an MBA or a management role.',
      bn: 'ম্যানেজমেন্ট, অ্যাকাউন্টিং, মার্কেটিং ও এইচআর-এর মৌলিক জ্ঞান — এমবিএ বা ম্যানেজমেন্ট পদে প্রস্তুতির জন্য।',
    },
    highlights: [
      { en: 'Management & accounting', bn: 'ম্যানেজমেন্ট ও অ্যাকাউন্টিং' },
      { en: 'Marketing & HR', bn: 'মার্কেটিং ও এইচআর' },
      { en: 'Pathway to MBA', bn: 'এমবিএ-তে উত্তরণের সুযোগ' },
    ],
    image: './images/dept-bba.webp',
    source: 'placeholder',
  },
];

/**
 * Short courses, mirrored from https://bist.edu.bd/short-courses.
 *
 * Fee, class count and duration are reproduced exactly as the institution
 * publishes them; a fee of 0 is a government-funded seat, not a missing value.
 * The syllabus outline and lecturer are not published there, so none is shown.
 */
export const SHORT_COURSES: CourseOffer[] = [
  {
    id: 'short-responsive-web-design',
    code: 'SC-WD-01',
    shortTitle: 'RWD',
    title: { en: 'Responsive Web Design', bn: 'রেসপন্সিভ ওয়েব ডিজাইন' },
    level: 'short',
    affiliation: 'NSDA',
    duration: { en: '3 Months', bn: '৩ মাস' },
    classCount: 40,
    totalFee: 12000,
    summary: {
      en: 'The visual design and page layout side of the web: how a modern, device-agnostic interface is laid out and built.',
      bn: 'ওয়েবসাইটের ভিজ্যুয়াল ডিজাইন ও পেজ লেআউট: আধুনিক, সব ডিভাইসে মানানসই ইন্টারফেস তৈরি করা।',
    },
    highlights: [
      { en: 'HTML, CSS & layout systems', bn: 'HTML, CSS ও লেআউট সিস্টেম' },
      { en: 'Mobile-first responsive grids', bn: 'মোবাইল-ফার্স্ট রেসপন্সিভ গ্রিড' },
      { en: 'UI composition practice', bn: 'ইউআই কম্পোজিশন প্র্যাকটিস' },
    ],
    source: 'live',
  },
  {
    id: 'short-web-development-php',
    code: 'SC-WD-02',
    shortTitle: 'PHP',
    title: { en: 'Web Development (PHP, Laravel)', bn: 'ওয়েব ডেভেলপমেন্ট (পিএইচপি, লারাভেল)' },
    level: 'short',
    affiliation: 'NSDA',
    duration: { en: '3 Months', bn: '৩ মাস' },
    classCount: 40,
    totalFee: 15000,
    summary: {
      en: 'Server-side web development end to end: request handling, databases and shipping a working application with a modern PHP framework.',
      bn: 'সার্ভার-সাইড ওয়েব ডেভেলপমেন্ট: ডাটাবেজ, রিকোয়েস্ট হ্যান্ডলিং এবং আধুনিক পিএইচপি ফ্রেমওয়ার্কে অ্যাপ্লিকেশন তৈরি।',
    },
    highlights: [
      { en: 'PHP & MySQL fundamentals', bn: 'পিএইচপি ও মাইএসকিউএল' },
      { en: 'Laravel MVC', bn: 'লারাভেল এমভিসি' },
      { en: 'Deployment basics', bn: 'ডিপ্লয়মেন্ট বেসিক' },
    ],
    source: 'live',
  },
  {
    id: 'short-digital-marketing',
    code: 'SC-IT-01',
    shortTitle: 'DM',
    title: { en: 'IT Freelancing & Digital Marketing', bn: 'আইটি ফ্রিল্যান্সিং ও ডিজিটাল মার্কেটিং' },
    level: 'short',
    affiliation: 'NSDA',
    duration: { en: '3 Months', bn: '৩ মাস' },
    classCount: 40,
    totalFee: 10000,
    summary: {
      en: 'Digital marketing concepts, strategy and implementation, paired with the freelancing workflow used to sell those services online.',
      bn: 'ডিজিটাল মার্কেটিংয়ের ধারণা, কৌশল ও বাস্তবায়ন, সঙ্গে অনলাইনে সেবা বিক্রির ফ্রিল্যান্সিং কার্যপদ্ধতি।',
    },
    highlights: [
      { en: 'Campaign strategy & analytics', bn: 'ক্যাম্পেইন কৌশল ও অ্যানালিটিক্স' },
      { en: 'Social & content marketing', bn: 'সোশ্যাল ও কনটেন্ট মার্কেটিং' },
      { en: 'Marketplace freelancing', bn: 'মার্কেটপ্লেস ফ্রিল্যান্সিং' },
    ],
    source: 'live',
  },
  {
    id: 'short-graphics-design',
    code: 'SC-IT-02',
    shortTitle: 'GD',
    title: { en: 'IT Freelancing & Graphics Design', bn: 'আইটি ফ্রিল্যান্সিং ও গ্রাফিক্স ডিজাইন' },
    level: 'short',
    affiliation: 'NSDA',
    duration: { en: '3 Months', bn: '৩ মাস' },
    classCount: 40,
    totalFee: 10000,
    summary: {
      en: 'Composing symbols, images and type into visual messages, then delivering that work to clients through freelance channels.',
      bn: 'সিম্বল, ছবি ও টাইপোগ্রাফি দিয়ে ভিজ্যুয়াল মেসেজ তৈরি এবং ফ্রিল্যান্স চ্যানেলে ক্লায়েন্টের কাছে পৌঁছে দেওয়া।',
    },
    highlights: [
      { en: 'Vector & raster tooling', bn: 'ভেক্টর ও র্যাস্টার টুল' },
      { en: 'Brand & layout design', bn: 'ব্র্যান্ড ও লেআউট ডিজাইন' },
      { en: 'Client delivery workflow', bn: 'ক্লায়েন্ট ডেলিভারি ওয়ার্কফ্লো' },
    ],
    source: 'live',
  },
  {
    id: 'short-mobile-servicing',
    code: 'SC-TR-01',
    shortTitle: 'Mobile',
    title: { en: 'Mobile Phone Servicing', bn: 'মোবাইল ফোন সার্ভিসিং' },
    level: 'short',
    affiliation: 'NSDA',
    duration: { en: '2 Months', bn: '২ মাস' },
    classCount: 30,
    totalFee: 10000,
    summary: {
      en: 'Hands-on hardware repair: dismantling, fault tracing, component-level replacement and software flashing.',
      bn: 'ব্যবহারিক হার্ডওয়্যার মেরামত: খোলা, ত্রুটি নির্ণয়, কম্পোনেন্ট পরিবর্তন ও সফটওয়্যার ইনস্টলেশন।',
    },
    highlights: [
      { en: 'Fault diagnosis', bn: 'ত্রুটি নির্ণয়' },
      { en: 'Soldering & component work', bn: 'সল্ডারিং ও কম্পোনেন্ট কাজ' },
      { en: 'Software & flashing tools', bn: 'সফটওয়্যার ও ফ্ল্যাশিং টুল' },
    ],
    source: 'live',
  },
  {
    id: 'short-digital-marketing-free',
    code: 'SC-GOV-01',
    shortTitle: 'DM (Free)',
    title: {
      en: 'IT Freelancing & Digital Marketing (Government-funded)',
      bn: 'আইটি ফ্রিল্যান্সিং ও ডিজিটাল মার্কেটিং (সরকারি অর্থায়নে)',
    },
    level: 'short',
    affiliation: 'NSDA',
    duration: { en: '3 Months', bn: '৩ মাস' },
    classCount: 40,
    totalFee: 0,
    summary: {
      en: 'The same digital-marketing syllabus delivered free of course fee under the government-funded skills scheme, subject to seat availability.',
      bn: 'সরকারি অর্থায়নে পরিচালিত দক্ষতা প্রকল্পের অধীনে একই ডিজিটাল মার্কেটিং সিলেবাস বিনা কোর্স ফিতে, আসন সাপেক্ষে।',
    },
    highlights: [
      { en: 'No course fee', bn: 'কোর্স ফি নেই' },
      { en: 'Government-funded seats', bn: 'সরকারি অর্থায়িত আসন' },
      { en: 'Same syllabus as the paid batch', bn: 'পেইড ব্যাচের সমান সিলেবাস' },
    ],
    source: 'live',
  },
  {
    id: 'short-electrical-house-wiring',
    code: 'SC-TR-02',
    shortTitle: 'Wiring',
    title: {
      en: 'Electrical House Wiring & Installation',
      bn: 'ইলেকট্রিক্যাল হাউস ওয়্যারিং অ্যান্ড ইনস্টলেশন',
    },
    level: 'short',
    affiliation: 'NSDA',
    duration: { en: '3 Months', bn: '৩ মাস' },
    classCount: 30,
    totalFee: 10000,
    summary: {
      en: 'Domestic electrical installation practice: circuit design, wiring methods, protective devices and safe working standards.',
      bn: 'আবাসিক ইলেকট্রিক্যাল ইনস্টলেশন: সার্কিট ডিজাইন, ওয়্যারিং পদ্ধতি, প্রোটেকটিভ ডিভাইস ও নিরাপদ কাজের মান।',
    },
    highlights: [
      { en: 'Domestic circuit design', bn: 'আবাসিক সার্কিট ডিজাইন' },
      { en: 'Wiring methods & materials', bn: 'ওয়্যারিং পদ্ধতি ও উপকরণ' },
      { en: 'Electrical safety', bn: 'ইলেকট্রিক্যাল নিরাপত্তা' },
    ],
    source: 'live',
  },
  {
    id: 'short-mobile-servicing-free',
    code: 'SC-GOV-02',
    shortTitle: 'Mobile (Free)',
    title: {
      en: 'Mobile Phone Servicing (Government-funded)',
      bn: 'মোবাইল ফোন সার্ভিসিং (সরকারি অর্থায়নে)',
    },
    level: 'short',
    affiliation: 'NSDA',
    duration: { en: '3 Months', bn: '৩ মাস' },
    classCount: 40,
    totalFee: 0,
    summary: {
      en: 'Mobile handset repair delivered free of course fee under the government-funded skills scheme, subject to seat availability.',
      bn: 'সরকারি অর্থায়নে পরিচালিত দক্ষতা প্রকল্পের অধীনে মোবাইল হ্যান্ডসেট মেরামত প্রশিক্ষণ বিনা কোর্স ফিতে, আসন সাপেক্ষে।',
    },
    highlights: [
      { en: 'No course fee', bn: 'কোর্স ফি নেই' },
      { en: 'Government-funded seats', bn: 'সরকারি অর্থায়িত আসন' },
      { en: 'Hardware repair practice', bn: 'হার্ডওয়্যার মেরামত অনুশীলন' },
    ],
    source: 'live',
  },
  {
    id: 'short-fashion-design-production',
    code: 'SC-TX-01',
    shortTitle: 'FDPD',
    title: {
      en: 'Fashion Design & Production Development',
      bn: 'ফ্যাশন ডিজাইন অ্যান্ড প্রোডাকশন ডেভেলপমেন্ট',
    },
    level: 'short',
    affiliation: 'NSDA',
    duration: { en: '3 Months', bn: '৩ মাস' },
    classCount: 40,
    totalFee: 20000,
    summary: {
      en: 'Taking a garment from sketch to production-ready: illustration, pattern development, sampling and production planning.',
      bn: 'স্কেচ থেকে প্রোডাকশন-রেডি গার্মেন্টস: ইলাস্ট্রেশন, প্যাটার্ন ডেভেলপমেন্ট, স্যাম্পলিং ও প্রোডাকশন প্ল্যানিং।',
    },
    highlights: [
      { en: 'Fashion illustration', bn: 'ফ্যাশন ইলাস্ট্রেশন' },
      { en: 'Pattern & sample development', bn: 'প্যাটার্ন ও স্যাম্পল ডেভেলপমেন্ট' },
      { en: 'Production planning', bn: 'প্রোডাকশন প্ল্যানিং' },
    ],
    source: 'live',
  },
];

/**
 * The NSDA-approved course list shown on the NSDA affiliation page.
 *
 * Mirrors what BIST itself prints: the trades its NSDA-registered assessment
 * centre certifies (see the institution's project page) plus the two
 * government-funded short courses above, which are the skills-agency seats.
 *
 * PLACEHOLDER: replace these rows with the official NSDA course list when the
 * authority's own export is supplied — no component change is needed.
 */
export const NSDA_COURSES: CourseOffer[] = [
  {
    id: 'nsda-rmg-sewing',
    code: 'NSDA-L2-RMG',
    shortTitle: 'Sewing',
    title: {
      en: 'Sewing Machine Operation (RMG)',
      bn: 'সুইং মেশিন অপারেশন (আরএমজি)',
    },
    level: 'short',
    affiliation: 'NSDA',
    nsdaLevel: 2,
    summary: {
      en: 'Competency assessment and certification for industrial sewing-machine operators under the NSDA level framework.',
      bn: 'এনএসডিএ লেভেল কাঠামোর অধীনে শিল্প সুইং মেশিন অপারেটরদের দক্ষতা মূল্যায়ন ও সনদায়ন।',
    },
    highlights: [
      { en: 'Assessment at Level 1–2', bn: 'লেভেল ১–২ মূল্যায়ন' },
      { en: 'Recognition of Prior Learning', bn: 'পূর্ব অভিজ্ঞতার স্বীকৃতি' },
    ],
    source: 'live',
  },
  {
    id: 'nsda-pattern-making',
    code: 'NSDA-L3-PAT',
    shortTitle: 'Pattern',
    title: {
      en: 'Pattern Making & Garment Construction',
      bn: 'প্যাটার্ন মেকিং ও গার্মেন্ট কনস্ট্রাকশন',
    },
    level: 'short',
    affiliation: 'NSDA',
    nsdaLevel: 3,
    summary: {
      en: 'Pattern drafting, grading and garment construction assessed against the NSDA competency standard.',
      bn: 'এনএসডিএ দক্ষতার মানদণ্ড অনুযায়ী প্যাটার্ন ড্রাফটিং, গ্রেডিং ও গার্মেন্ট কনস্ট্রাকশন মূল্যায়ন।',
    },
    highlights: [
      { en: 'Assessment at Level 3', bn: 'লেভেল ৩ মূল্যায়ন' },
      { en: 'Recognition of Prior Learning', bn: 'পূর্ব অভিজ্ঞতার স্বীকৃতি' },
    ],
    source: 'live',
  },
  {
    id: 'nsda-electrical-maintenance',
    code: 'NSDA-L3-ELEC',
    shortTitle: 'Electrical',
    title: {
      en: 'Electrical & Electronic Maintenance',
      bn: 'ইলেকট্রিক্যাল অ্যান্ড ইলেকট্রনিক মেইনটেন্যান্স',
    },
    level: 'short',
    affiliation: 'NSDA',
    nsdaLevel: 3,
    summary: {
      en: 'Industrial electrical and electronic maintenance competency assessment for factory technicians.',
      bn: 'কারখানার টেকনিশিয়ানদের জন্য শিল্প ইলেকট্রিক্যাল ও ইলেকট্রনিক মেইনটেন্যান্স দক্ষতা মূল্যায়ন।',
    },
    highlights: [
      { en: 'Assessment at Level 1–3', bn: 'লেভেল ১–৩ মূল্যায়ন' },
      { en: 'Recognition of Prior Learning', bn: 'পূর্ব অভিজ্ঞতার স্বীকৃতি' },
    ],
    source: 'live',
  },
  {
    id: 'nsda-mobile-servicing',
    code: 'NSDA-L3-MOB',
    shortTitle: 'Mobile',
    title: {
      en: 'Mobile Phone Servicing',
      bn: 'মোবাইল ফোন সার্ভিসিং',
    },
    level: 'short',
    affiliation: 'NSDA',
    nsdaLevel: 3,
    summary: {
      en: 'Handset-level fault diagnosis and repair competency, delivered through the government-funded skills seats.',
      bn: 'সরকারি অর্থায়িত দক্ষতা আসনের মাধ্যমে হ্যান্ডসেট ত্রুটি নির্ণয় ও মেরামতের দক্ষতা প্রশিক্ষণ।',
    },
    highlights: [
      { en: 'Assessment at Level 1–3', bn: 'লেভেল ১–৩ মূল্যায়ন' },
      { en: 'Government-funded seats', bn: 'সরকারি অর্থায়িত আসন' },
    ],
    source: 'live',
  },
  {
    id: 'nsda-digital-marketing',
    code: 'NSDA-L3-DM',
    shortTitle: 'Marketing',
    title: {
      en: 'IT Freelancing & Digital Marketing',
      bn: 'আইটি ফ্রিল্যান্সিং ও ডিজিটাল মার্কেটিং',
    },
    level: 'short',
    affiliation: 'NSDA',
    nsdaLevel: 3,
    summary: {
      en: 'Digital marketing competency delivered through the government-funded skills seats.',
      bn: 'সরকারি অর্থায়িত দক্ষতা আসনের মাধ্যমে ডিজিটাল মার্কেটিং দক্ষতা প্রশিক্ষণ।',
    },
    highlights: [
      { en: 'Assessment at Level 1–3', bn: 'লেভেল ১–৩ মূল্যায়ন' },
      { en: 'Government-funded seats', bn: 'সরকারি অর্থায়িত আসন' },
    ],
    source: 'live',
  },
  {
    id: 'nsda-house-wiring',
    code: 'NSDA-L3-WIR',
    shortTitle: 'Wiring',
    title: {
      en: 'Electrical House Wiring & Installation',
      bn: 'ইলেকট্রিক্যাল হাউস ওয়্যারিং অ্যান্ড ইনস্টলেশন',
    },
    level: 'short',
    affiliation: 'NSDA',
    nsdaLevel: 3,
    summary: {
      en: 'Domestic installation competency assessment under the NSDA level framework.',
      bn: 'এনএসডিএ লেভেল কাঠামোর অধীনে আবাসিক ইনস্টলেশন দক্ষতা মূল্যায়ন।',
    },
    highlights: [
      { en: 'Assessment at Level 1–3', bn: 'লেভেল ১–৩ মূল্যায়ন' },
      { en: 'Recognition of Prior Learning', bn: 'পূর্ব অভিজ্ঞতার স্বীকৃতি' },
    ],
    source: 'live',
  },
  {
    id: 'nsda-fashion-design',
    code: 'NSDA-L4-FD',
    shortTitle: 'Fashion',
    title: {
      en: 'Fashion Design & Production Development',
      bn: 'ফ্যাশন ডিজাইন অ্যান্ড প্রোডাকশন ডেভেলপমেন্ট',
    },
    level: 'short',
    affiliation: 'NSDA',
    nsdaLevel: 4,
    summary: {
      en: 'Higher-level fashion design and production development competency assessment.',
      bn: 'উচ্চ স্তরের ফ্যাশন ডিজাইন ও প্রোডাকশন ডেভেলপমেন্ট দক্ষতা মূল্যায়ন।',
    },
    highlights: [
      { en: 'Assessment at Level 4', bn: 'লেভেল ৪ মূল্যায়ন' },
      { en: 'Recognition of Prior Learning', bn: 'পূর্ব অভিজ্ঞতার স্বীকৃতি' },
    ],
    source: 'live',
  },
];

/** Every catalogued course, in menu order. */
export const ALL_COURSES: CourseOffer[] = [
  ...HONOURS_COURSES,
  ...PGD_COURSES,
  ...SHORT_COURSES,
];

/** Look up a course by its URL id, or `undefined` so callers can show a miss. */
export const findCourse = (id: string): CourseOffer | undefined =>
  ALL_COURSES.find((course) => course.id === id);

/** The courses at one level, in catalogue order. */
export const coursesAtLevel = (level: CourseLevel): CourseOffer[] =>
  ALL_COURSES.filter((course) => course.level === level);
