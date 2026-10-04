/**
 * Campus-life and library content.
 *
 * Every statement here is taken from the live BIST website — the at-a-glance /
 * history page, the Academic Regulation page and the facilities content already
 * mirrored elsewhere in this project. Where the live site says nothing (hostel,
 * transport, medical, clubs), the item is marked `pending: true` so the UI shows
 * an honest placeholder instead of an invented detail.
 */

import { CampusFacility, LocalizedString } from '../types';

export const LIBRARY_QUOTES: LocalizedString[] = [
  {
    en: 'BIST offers well-equipped laboratories, a library with a computer lab and a new, permanent campus.',
    bn: 'বিআইএসটিতে সুসজ্জিত ল্যাবরেটরি, কম্পিউটার ল্যাবসহ একটি লাইব্রেরি এবং একটি নতুন স্থায়ী ক্যাম্পাস রয়েছে।',
  },
  {
    en: 'The library has many useful and rare books for students and faculty.',
    bn: 'লাইব্রেরিতে শিক্ষার্থী ও শিক্ষকদের জন্য বহু প্রয়োজনীয় ও দুর্লভ বই রয়েছে।',
  },
];

export const LIBRARY_FACILITIES: CampusFacility[] = [
  {
    id: 'lib-reading-hall',
    title: { en: 'Central Library & Reading Hall', bn: 'কেন্দ্রীয় লাইব্রেরি ও রিডিং হল' },
    description: {
      en: 'A quiet reading hall stocked with textile, engineering and business titles, open through the class day.',
      bn: 'টেক্সটাইল, ইঞ্জিনিয়ারিং ও ব্যবসায় বিষয়ক বইয়ে সমৃদ্ধ শান্ত পাঠকক্ষ, ক্লাস চলাকালীন খোলা থাকে।',
    },
    icon: 'BookOpen',
  },
  {
    id: 'lib-computer',
    title: { en: 'Library Computer Lab', bn: 'লাইব্রেরি কম্পিউটার ল্যাব' },
    description: {
      en: 'A computer lab inside the library for online journal access and coursework research.',
      bn: 'অনলাইন জার্নাল অ্যাক্সেস ও কোর্সওয়ার্ক গবেষণার জন্য লাইব্রেরির ভেতরে একটি কম্পিউটার ল্যাব।',
    },
    icon: 'Monitor',
  },
  {
    id: 'lib-collection',
    title: { en: 'Book & Reference Collection', bn: 'বই ও রেফারেন্স সংগ্রহ' },
    description: {
      en: 'A curated collection that includes useful and rare titles for both students and faculty.',
      bn: 'শিক্ষার্থী ও শিক্ষক উভয়ের জন্য প্রয়োজনীয় ও দুর্লভ বইয়ের সংকলন।',
    },
    icon: 'Library',
  },
  {
    id: 'lib-ejournals',
    title: { en: 'E-Journal & Digital Access', bn: 'ই-জার্নাল ও ডিজিটাল অ্যাক্সেস' },
    description: {
      en: 'On-campus digital access for coursework research; the e-library portal is being expanded.',
      bn: 'কোর্সওয়ার্ক গবেষণার জন্য ক্যাম্পাসে ডিজিটাল অ্যাক্সেস; ই-লাইব্রেরি পোর্টাল সম্প্রসারিত হচ্ছে।',
    },
    icon: 'Globe',
    pending: true,
  },
];

export const STUDENT_LIFE_ITEMS: CampusFacility[] = [
  {
    id: 'sl-games',
    title: { en: 'Indoor Games Facilities', bn: 'ইনডোর গেমসের সুবিধা' },
    description: {
      en: 'Indoor games facilities are available on campus, as published by the institution.',
      bn: 'প্রতিষ্ঠানপ্রকাশিত তথ্য অনুযায়ী ক্যাম্পাসে ইনডোর গেমসের সুবিধা রয়েছে।',
    },
    icon: 'Trophy',
  },
  {
    id: 'sl-spoken',
    title: { en: 'Free Spoken English Course', bn: 'বিনামূল্যে স্পোকেন ইংলিশ কোর্স' },
    description: {
      en: 'A free spoken English course is offered to students.',
      bn: 'শিক্ষার্থীদের জন্য বিনামূল্যে স্পোকেন ইংলিশ কোর্স চালু রয়েছে।',
    },
    icon: 'Languages',
  },
  {
    id: 'sl-parttime',
    title: { en: 'Part-Time Job Facilities', bn: 'খণ্ডকালীন কাজের সুযোগ' },
    description: {
      en: 'Part-time job facilities are available for students.',
      bn: 'শিক্ষার্থীদের জন্য খণ্ডকালীন কাজের সুযোগ রয়েছে।',
    },
    icon: 'Briefcase',
  },
  {
    id: 'sl-cctv',
    title: { en: 'CCTV-Monitored Campus', bn: 'সিসিটিভি নিয়ন্ত্রিত ক্যাম্পাস' },
    description: {
      en: 'The whole campus is under CCTV, and the campus is non-smoking and politics-free.',
      bn: 'সম্পূর্ণ ক্যাম্পাস সিসিটিভির আওতায়; ক্যাম্পাস ধূমপানমুক্ত ও রাজনীতিমুক্ত।',
    },
    icon: 'ShieldCheck',
  },
  {
    id: 'sl-clubs',
    title: { en: 'Student Clubs & Societies', bn: 'শিক্ষার্থী ক্লাব ও সংগঠন' },
    description: {
      en: 'Student club and society listings have not yet been published on the official site.',
      bn: 'শিক্ষার্থী ক্লাব ও সংগঠনের তালিকা এখনো অফিসিয়াল সাইটে প্রকাশিত হয়নি।',
    },
    icon: 'Users',
    pending: true,
  },
  {
    id: 'sl-hostel',
    title: { en: 'Hostel & Residential Support', bn: 'হোস্টেল ও আবাসিক সহায়তা' },
    description: {
      en: 'Residential and hostel details are coordinated through the campus office; booking information is not yet published online.',
      bn: 'আবাসিক ও হোস্টেল সংক্রান্ত তথ্য ক্যাম্পাস অফিসের মাধ্যমে সমন্বয় করা হয়; বুকিং তথ্য এখনো অনলাইনে প্রকাশিত হয়নি।',
    },
    icon: 'Home',
    pending: true,
  },
  {
    id: 'sl-transport',
    title: { en: 'Campus Transport', bn: 'ক্যাম্পাস পরিবহন' },
    description: {
      en: 'Transport routes and schedules have not yet been published on the official site.',
      bn: 'পরিবহন রুট ও সময়সূচি এখনো অফিসিয়াল সাইটে প্রকাশিত হয়নি।',
    },
    icon: 'Bus',
    pending: true,
  },
  {
    id: 'sl-medical',
    title: { en: 'Medical & First Aid', bn: 'চিকিৎসা ও প্রাথমিক চিকিৎসা' },
    description: {
      en: 'A first-aid facility is available through the campus office; detailed medical service information is not yet published.',
      bn: 'ক্যাম্পাস অফিসের মাধ্যমে প্রাথমিক চিকিৎসার সুবিধা রয়েছে; বিস্তারিত চিকিৎসাসেবার তথ্য এখনো প্রকাশিত হয়নি।',
    },
    icon: 'HeartPulse',
    pending: true,
  },
];
