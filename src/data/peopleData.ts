/**
 * People, photos and gallery content — mirrored from the live site.
 *
 * Sources (snapshot 30 September 2026):
 *   · https://bist.edu.bd/all-teachers              → the roster, now in ./people.ts
 *   · https://bist.edu.bd/teacher-details/<slug>    → designation, qualification, email
 *   · https://bist.edu.bd/alumni-list               → ALUMNI_DIRECTORY
 *   · https://bist.edu.bd/gallery                   → GALLERY_ITEMS
 *
 * Only fields that the live site actually publishes are filled in. Anything it does
 * not publish (phone numbers, "years of experience", research specialisations) is
 * deliberately left out instead of being invented, and the UI hides those slots.
 *
 * Photographs were downloaded from the institute's own media backend into
 * /public/images/teachers, /public/images/gallery, /public/images/alumni and
 * /public/images (banners, departments, events).
 */

import { AlumniProfile, GalleryItem } from '../types';

/** The placeholders bist.edu.bd itself serves when a person has no photo on file. */
const NO_PHOTO = './images/person-placeholder.png';

/**
 * The complete BIST roster, in the order published on /all-teachers.
 *
 * `department` uses the programme code shown on the site (CSE/TST/AMT/FDT/BBA) or
 * 'ADMIN' for the Vice-Principal, Registrar and other administrative posts.
 */
/**
 * Photo gallery mirrored from https://bist.edu.bd/gallery — the institute's own
 * photographs, captioned with the descriptions it publishes alongside them.
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-founding-17',
    title: {
      en: '17th Founding Anniversary of BIST & Prize Giving Ceremony-2025',
      bn: 'বিআইএসটি-এর ১৭তম প্রতিষ্ঠাবার্ষিকী ও পুরস্কার বিতরণী অনুষ্ঠান-২০২৫',
    },
    category: 'events',
    image: './images/gallery/g01.jpg',
    date: '2025',
  },
  {
    id: 'gal-seip-certificate',
    title: {
      en: 'SEIP–BGMEA Project (T3) Certificate Awarding Ceremony',
      bn: 'এসইআইপি–বিজিএমইএ প্রকল্প (T3) সনদ প্রদান অনুষ্ঠান',
    },
    category: 'events',
    image: './images/gallery/g04.jpeg',
    date: '',
  },
  {
    id: 'gal-dua-mahfil',
    title: {
      en: 'Dua Mahfil for those martyred and injured in the Anti-Discrimination Student Movement',
      bn: 'বৈষম্য বিরোধী ছাত্র আন্দোলনে যারা শহীদ ও আহত হয়েছেন তাদের জন্য দুয়া মাহফিল',
    },
    category: 'events',
    image: './images/gallery/g02.jpeg',
    date: '',
  },
  {
    id: 'gal-childrens-day',
    title: {
      en: "Bangabandhu's 103rd Birth Anniversary & National Children's Day",
      bn: 'বঙ্গবন্ধুর ১০৩তম জন্মদিন ও জাতীয় শিশু দিবস উদযাপন',
    },
    category: 'events',
    image: './images/gallery/g05.jpg',
    date: '2023',
  },
  {
    id: 'gal-nu-sports',
    title: {
      en: 'National University Inter-College Sports Competition 2023',
      bn: 'জাতীয় বিশ্ববিদ্যালয় আন্তঃকলেজ ক্রীড়া প্রতিযোগিতা ২০২৩',
    },
    category: 'sports',
    image: './images/gallery/g06.jpg',
    date: '2023',
  },
  {
    id: 'gal-computer-course',
    title: {
      en: 'SSC Free Basic Computer Course — Certificate Giving Ceremony 2022',
      bn: 'এসএসসি ফ্রি বেসিক কম্পিউটার কোর্স — সার্টিফিকেট প্রদান অনুষ্ঠান ২০২২',
    },
    category: 'labs',
    image: './images/gallery/g07.jpg',
    date: '2022',
  },
  {
    id: 'gal-job-fair',
    title: {
      en: 'Certificate Awarding Ceremony, Professional Excellency Award & Job Fair-2022',
      bn: 'সার্টিফিকেট অ্যাওয়ার্ডিং, প্রফেশনাল এক্সিলেন্সি অ্যাওয়ার্ড ও জব ফেয়ার-২০২২',
    },
    category: 'events',
    image: './images/gallery/g08.jpeg',
    date: '2022',
  },
  {
    id: 'gal-foundation-stone',
    title: {
      en: 'Bangabandhu Corner Inauguration & Permanent Campus Foundation Stone Ceremony-2022',
      bn: 'বঙ্গবন্ধু কর্নার উদ্বোধন ও স্থায়ী ক্যাম্পাসের ভিত্তিপ্রস্তর স্থাপন অনুষ্ঠান-২০২২',
    },
    category: 'campus',
    image: './images/gallery/g09.jpeg',
    date: '2022',
  },
  {
    id: 'gal-iftar',
    title: {
      en: 'Iftar Mahfil organised by BIST-2022',
      bn: 'বিআইএসটি কর্তৃক আয়োজিত ইফতার মাহফিল-২০২২',
    },
    category: 'events',
    image: './images/gallery/g10.jpg',
    date: '2022',
  },
  {
    id: 'gal-freelancing',
    title: {
      en: 'IT Freelancing Certificate Giving Ceremony',
      bn: 'আইটি ফ্রিল্যান্সিং সার্টিফিকেট প্রদান অনুষ্ঠান',
    },
    category: 'labs',
    image: './images/gallery/g11.jpeg',
    date: '',
  },
  {
    id: 'gal-picnic',
    title: { en: 'Annual Picnic Day', bn: 'বার্ষিক পিকনিক দিবস' },
    category: 'sports',
    image: './images/gallery/g12.jpg',
    date: '',
  },
  {
    id: 'gal-independence-day',
    title: {
      en: 'Independence Day Programme (26 March) — Discussion, Recitation & Essay Competition',
      bn: 'মহান স্বাধীনতা দিবস (২৬ মার্চ) উপলক্ষে আলোচনা সভা, কবিতা আবৃত্তি ও রচনা প্রতিযোগিতা',
    },
    category: 'events',
    image: './images/gallery/g13.jpg',
    date: '',
  },
  {
    id: 'gal-library',
    title: { en: 'Our Library', bn: 'আমাদের লাইব্রেরি' },
    category: 'campus',
    image: './images/gallery/g14.jpeg',
    date: '',
  },
  {
    id: 'gal-final-presentation',
    title: {
      en: 'Final Presentation & Under-Graduation Last Year Celebration-2022',
      bn: 'ফাইনাল প্রেজেন্টেশন ও শেষ বর্ষের বিদায় উদযাপন-২০২২',
    },
    category: 'events',
    image: './images/gallery/g15.JPG',
    date: '2022',
  },
  {
    id: 'gal-free-computer-training',
    title: {
      en: 'Free Computer Training — Certificate & Award Distribution',
      bn: 'ফ্রি কম্পিউটার প্রশিক্ষণ — সার্টিফিকেট ও পুরস্কার বিতরণ',
    },
    category: 'labs',
    image: './images/gallery/g16.jpg',
    date: '',
  },
  {
    id: 'gal-dept-tst',
    title: {
      en: 'Textile Science & Technology (TST) Department',
      bn: 'টেক্সটাইল সায়েন্স অ্যান্ড টেকনোলজি (TST) বিভাগ',
    },
    category: 'textile',
    image: './images/dept-tst.webp',
    date: '2026',
  },
  {
    id: 'gal-dept-amt',
    title: {
      en: 'Apparel Manufacturing & Technology (AMT) Department',
      bn: 'অ্যাপারেল ম্যানুফ্যাকচারিং অ্যান্ড টেকনোলজি (AMT) বিভাগ',
    },
    category: 'textile',
    image: './images/dept-amt.webp',
    date: '2026',
  },
  {
    id: 'gal-dept-fdt',
    title: {
      en: 'Fashion Design & Technology (FDT) Studio',
      bn: 'ফ্যাশন ডিজাইন অ্যান্ড টেকনোলজি (FDT) স্টুডিও',
    },
    category: 'textile',
    image: './images/dept-fdt.webp',
    date: '2026',
  },
  {
    id: 'gal-dept-cse',
    title: {
      en: 'Computer Science & Engineering (CSE) Department',
      bn: 'কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (CSE) বিভাগ',
    },
    category: 'labs',
    image: './images/dept-cse.jpg',
    date: '2026',
  },
  {
    id: 'gal-dept-bba',
    title: {
      en: 'Bachelor of Business Administration (BBA) Department',
      bn: 'ব্যাচেলর অব বিজনেস অ্যাডমিনিস্ট্রেশন (BBA) বিভাগ',
    },
    category: 'campus',
    image: './images/dept-bba.webp',
    date: '2026',
  },
];

/**
 * Alumni directory mirrored from https://bist.edu.bd/alumni-list.
 * The live site publishes only name, job title and employer — batch, programme and
 * location are therefore left unset rather than guessed.
 */
export const ALUMNI_DIRECTORY: AlumniProfile[] = [
  {
    id: 'alm-rifat-hasan',
    name: 'Md Rifat Hasan',
    position: 'Sr. Executive, Industrial Engineering (IE) & Planning',
    company: 'Northern Tosrifa Group',
    image: './images/alumni/alumni-rifat.jpg',
  },
  {
    id: 'alm-nasir-uddin',
    name: 'Nasir Uddin',
    position: 'Asst. Manager (Merchandising)',
    company: 'IT Apparels Ltd.',
    image: NO_PHOTO,
  },
  {
    id: 'alm-masum-billa',
    name: 'Masum Billa',
    position: 'QA Executive',
    company: 'Cencosud Retail S.A.',
    image: NO_PHOTO,
  },
  {
    id: 'alm-mohammad-emon',
    name: 'Mohammad Emon',
    position: 'Freelancer',
    company: 'Eurofins Buying House',
    image: './images/alumni/alumni-emon.jpg',
  },
  {
    id: 'alm-milon-ahmed',
    name: 'Milon Ahmed',
    position: 'Service Associate Officer (Cash)',
    company: 'Midland Bank Ltd (MDB)',
    image: NO_PHOTO,
  },
  {
    id: 'alm-mahmudul-hasan',
    name: 'Mahmudul Hasan',
    position: 'Merchandiser',
    company: 'Islam Knit Design Ltd (ISLAM GROUP)',
    image: './images/alumni/alumni-mahmudul.jpg',
  },
  {
    id: 'alm-abdullah-al-mubin',
    name: 'Abdullah-Al Mubin',
    position: 'Assistant Sample Man',
    company: 'Tusuka',
    image: './images/alumni/alumni-mubin.jpg',
  },
  {
    id: 'alm-akash-mia',
    name: 'Md. Akash Mia',
    position: 'Jr. Executive',
    company: 'Style Craft LTD.',
    image: './images/alumni/alumni-akash.jpg',
  },
  {
    id: 'alm-masum-hossain',
    name: 'Md. Masum Hossain',
    position: 'Teacher',
    company: 'Model Education Touch School',
    image: './images/alumni/alumni-masum.jpg',
  },
  {
    id: 'alm-sharif-bapari',
    name: 'Md. Sharif Bapari',
    position: 'Trainee Merchandiser',
    company: 'XYZ Group',
    image: './images/alumni/alumni-sharif.jpg',
  },
  {
    id: 'alm-zakir-hossain',
    name: 'Zakir Hossain',
    position: 'Asst. Manager',
    company: 'Aman Graphics & Designs Ltd',
    image: './images/alumni/alumni-zakir.jpeg',
  },
  {
    id: 'alm-alamin',
    name: 'Alamin',
    position: 'Officer',
    company: 'Noman Group',
    image: NO_PHOTO,
  },
];
