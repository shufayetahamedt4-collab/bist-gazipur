/**
 * Seed content for the bottom-right announcement popup.
 *
 * This is only the starting point: once an administrator edits the popup at
 * `#/admin/popups`, their list is stored in localStorage under
 * `bist_announcements` and versioned with `ANNOUNCEMENTS_DATA_VERSION`, so
 * replacing this seed (and bumping the version) hands every visitor the new list
 * instead of leaving them on stale copy.
 *
 * Every seeded post reuses something the institution already publishes — the
 * 2025-26 admission notice, the short-course page and the separate diploma
 * portal. Nothing here is invented marketing.
 */

import { AnnouncementPost } from '../types';
import { DIPLOMA_SITE_URL } from '../config/siteLinks';

/** Bump this when the seed below changes, so returning visitors see the new list. */
export const ANNOUNCEMENTS_DATA_VERSION = '2026-10-07-seed';

export const ANNOUNCEMENT_POSTS: AnnouncementPost[] = [
  {
    id: 'ann-admission-2025-26',
    image: './images/campus-1.webp',
    title: {
      en: 'Admissions open for 2025-26',
      bn: '২০২৫-২৬ শিক্ষাবর্ষে ভর্তি চলছে',
    },
    description: {
      en: 'B.Sc. (Hons.) in CSE, TST, AMT, FDT and Professional BBA under National University. 100 students receive a 100% course-fee scholarship (terms apply).',
      bn: 'জাতীয় বিশ্ববিদ্যালয়ের অধীনে সিএসই, টিএসটি, এএমটি, এফডিটি ও প্রফেশনাল বিবিএ-তে ভর্তি চলছে। ১০০ জন শিক্ষার্থী ১০০% কোর্স ফি স্কলারশিপ পাবেন (শর্ত প্রযোজ্য)।',
    },
    link: '#/apply-online',
    linkLabel: { en: 'Apply online', bn: 'অনলাইন আবেদন' },
    active: true,
    order: 1,
    category: 'announcement',
  },
  {
    id: 'ann-short-courses',
    image: './images/dept-cse.jpg',
    title: {
      en: 'New short courses: Web Development & Digital Marketing',
      bn: 'নতুন শর্ট কোর্স: ওয়েব ডেভেলপমেন্ট ও ডিজিটাল মার্কেটিং',
    },
    description: {
      en: '3-month skill courses in Responsive Web Design, PHP & Laravel, Graphics Design and Digital Marketing. Admission going on.',
      bn: 'রেসপন্সিভ ওয়েব ডিজাইন, পিএইচপি ও লারাভেল, গ্রাফিক্স ডিজাইন ও ডিজিটাল মার্কেটিং-এ ৩ মাসের দক্ষতা কোর্স। ভর্তি চলছে।',
    },
    link: '#/short-courses',
    linkLabel: { en: 'See all short courses', bn: 'সব শর্ট কোর্স দেখুন' },
    active: true,
    order: 2,
    category: 'sister-concern',
  },
  {
    id: 'ann-nsda-free-seats',
    image: './images/gallery/g02.jpeg',
    title: {
      en: 'Government-funded free seats at the NSDA assessment centre',
      bn: 'এনএসডিএ মূল্যায়ন কেন্দ্রে সরকারি অর্থায়িত বিনামূল্যের আসন',
    },
    description: {
      en: 'Mobile Phone Servicing and IT Freelancing & Digital Marketing are offered free of course fee under the government skills scheme, subject to seat availability.',
      bn: 'সরকারি দক্ষতা প্রকল্পের অধীনে মোবাইল ফোন সার্ভিসিং এবং আইটি ফ্রিল্যান্সিং ও ডিজিটাল মার্কেটিং কোর্স ফি ছাড়াই, আসন সাপেক্ষে।',
    },
    link: '#/affiliated/nsda',
    linkLabel: { en: 'NSDA courses at BIST', bn: 'বিআইএসটি-র এনএসডিএ কোর্স' },
    active: true,
    order: 3,
    category: 'sister-concern',
  },
  {
    id: 'ann-diploma-portal',
    image: './images/dept-tst.webp',
    title: {
      en: 'Diploma in Engineering & Textile — admissions on the diploma portal',
      bn: 'ডিপ্লোমা ইন ইঞ্জিনিয়ারিং ও টেক্সটাইল — ডিপ্লোমা পোর্টালে ভর্তি',
    },
    description: {
      en: 'BTEB-approved four-year diplomas run on the institute\'s separate diploma portal.',
      bn: 'বিটিইবি-অনুমোদিত চার বছর মেয়াদি ডিপ্লোমা পরিচালিত হয় প্রতিষ্ঠানের আলাদা ডিপ্লোমা পোর্টালে।',
    },
    link: DIPLOMA_SITE_URL,
    linkLabel: { en: 'Open diploma portal', bn: 'ডিপ্লোমা পোর্টাল খুলুন' },
    active: true,
    order: 4,
    category: 'sister-concern',
  },
];
