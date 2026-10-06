import { ActivityPost } from '../types';

/**
 * Bump this when the seed posts below change, so a browser holding an older cached
 * copy in localStorage is refreshed instead of staying stale. Mirrors the
 * `NOTICES_DATA_VERSION` convention in AppContext.
 */
export const ACTIVITY_DATA_VERSION = '2026-10-05-seed';

/**
 * Seed posts for the Activity feed.
 *
 * Every entry reuses media the site already owns and ships (`/public/images`,
 * `/public/videos`) and describes it in neutral terms — nothing here invents an
 * event, a result or a claim about the institution. Staff replace these from the
 * feed's own composer.
 */
export const ACTIVITY_POSTS: ActivityPost[] = [
  {
    id: 'activity-welcome',
    author: 'Administration',
    authorRole: 'administration',
    title: { en: 'Welcome to our Activity feed', bn: 'আমাদের অ্যাক্টিভিটি ফিডে স্বাগতম' },
    body: {
      en: 'From this page our teachers and the administration share short updates, classroom moments, campus photographs and video clips. Signed-in staff can add a post with the composer at the top of the feed.',
      bn: 'এই পেজ থেকে আমাদের শিক্ষক ও প্রশাসন সংক্ষিপ্ত আপডেট, ক্লাসরুমের মুহূর্ত, ক্যাম্পাসের ছবি ও ভিডিও শেয়ার করেন। সাইন-ইন করা স্টাফরা ফিডের উপরের কম্পোজার দিয়ে নতুন পোস্ট যোগ করতে পারেন।',
    },
    kind: 'text',
    createdAt: Date.parse('2026-10-05T04:30:00Z'),
  },
  {
    id: 'activity-campus-photo',
    author: 'Administration',
    authorRole: 'administration',
    body: {
      en: 'A view of our campus building at Chandona Chowrasta, Gazipur.',
      bn: 'চাঁদনা চৌরাস্তা, গাজীপুরে অবস্থিত আমাদের ক্যাম্পাস ভবনের একটি দৃশ্য।',
    },
    kind: 'photo',
    mediaUrl: './images/campus-2.webp',
    caption: { en: 'BGIFT campus building', bn: 'বিজিআইএফটি ক্যাম্পাস ভবন' },
    createdAt: Date.parse('2026-10-04T09:15:00Z'),
  },
  {
    id: 'activity-campus-video',
    author: 'Administration',
    authorRole: 'administration',
    body: {
      en: 'A short look inside our campus corridors and offices.',
      bn: 'আমাদের ক্যাম্পাসের করিডোর ও অফিসগুলোর একটি সংক্ষিপ্ত ভিডিও।',
    },
    kind: 'video',
    mediaUrl: './videos/hero-campus-loop.mp4',
    mediaPoster: './videos/hero-campus-loop-poster.jpg',
    caption: { en: 'Inside the BGIFT campus', bn: 'বিজিআইএফটি ক্যাম্পাসের ভেতরে' },
    createdAt: Date.parse('2026-10-03T06:45:00Z'),
  },
];
