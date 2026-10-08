/**
 * Development-partner projects shown on the Projects page.
 *
 * The four entries the institution asked to add are ASSETS, CICIP, BGMEA and
 * BWCCI. Two of them are donor-funded programmes, two are industry associations;
 * `partnerRole` states which, so the card can never imply the partner is
 * something it is not.
 *
 * `logoPlaceholder` is intentionally empty for now — the card renders an
 * initials tile until the partner supplies approved artwork. Nothing here
 * invents a funding amount or a completion date.
 */

import { CollaborationProject } from '../types';

export const COLLABORATION_PROJECTS: CollaborationProject[] = [
  {
    id: 'assets',
    name: 'ASSETS',
    fullName: {
      en: 'Accelerating and Strengthening Skills for Economic Transformation',
      bn: 'অ্যাক্সিলারেটিং অ্যান্ড স্ট্রেংদেনিং স্কিলস ফর ইকোনমিক ট্রান্সফরমেশন',
    },
    partner: 'World Bank',
    partnerRole: {
      en: 'Development Partner',
      bn: 'উন্নয়ন সহযোগী',
    },
    summary: {
      en: 'A World Bank-financed national skills programme that helps technical institutes produce graduates the export industries can actually employ.',
      bn: 'বিশ্ব ব্যাংক-অর্থায়িত জাতীয় দক্ষতা কর্মসূচি, যা কারিগরি প্রতিষ্ঠানগুলোকে রপ্তানি শিল্পের চাহিদা অনুযায়ী গ্র্যাজুয়েট তৈরি করতে সহায়তা করে।',
    },
    bistRole: {
      en: 'BIST participates as an implementing institute: industry-aligned curriculum review, trainer development and workplace-based training for its students.',
      bn: 'বিআইএসটি বাস্তবায়নকারী প্রতিষ্ঠান হিসেবে অংশ নেয়: শিল্প-সংশ্লিষ্ট সিলেবাস পর্যালোচনা, প্রশিক্ষক উন্নয়ন এবং শিক্ষার্থীদের জন্য কর্মক্ষেত্রভিত্তিক প্রশিক্ষণ।',
    },
    focusAreas: [
      { en: 'Employability and job placement', bn: 'কর্মসংস্থানযোগ্যতা ও চাকরি Placement' },
      { en: 'Trainer capacity development', bn: 'প্রশিক্ষকের সক্ষমতা উন্নয়ন' },
      { en: 'Industry-aligned curriculum', bn: 'শিল্প-সংশ্লিষ্ট সিলেবাস' },
    ],
    theme: { en: 'Skills & Employment', bn: 'দক্ষতা ও কর্মসংস্থান' },
    logoPlaceholder: '',
    accent: 'emerald',
  },
  {
    id: 'cicip',
    name: 'CICIP',
    fullName: {
      en: 'CICIP (project full name to be confirmed)',
      bn: 'সিআইসিআইপি (প্রকল্পের পূর্ণ নাম নিশ্চিত হতে হবে)',
    },
    partner: 'Asian Development Bank (ADB)',
    partnerRole: {
      en: 'Development Partner',
      bn: 'উন্নয়ন সহযোগী',
    },
    summary: {
      en: 'An Asian Development Bank-supported programme working through technical institutes to modernise skills training and industry competitiveness.',
      bn: 'এশীয় উন্নয়ন ব্যাংক-সমর্থিত কর্মসূচি, যা কারিগরি প্রতিষ্ঠানের মাধ্যমে দক্ষতা প্রশিক্ষণ ও শিল্প প্রতিযোগিতামূলক সক্ষমতা আধুনিকায়নে কাজ করে।',
    },
    bistRole: {
      en: 'BIST takes part as a partner institute, contributing campus training capacity and industry linkage through the Gazipur garment and textile cluster.',
      bn: 'বিআইএসটি সহযোগী প্রতিষ্ঠান হিসেবে অংশ নেয় এবং গাজীপুরের পোশাক ও টেক্সটাইল ক্লাস্টারের মাধ্যমে প্রশিক্ষণ সক্ষমতা ও শিল্প সংযোগে অবদান রাখে।',
    },
    focusAreas: [
      { en: 'TVET modernisation', bn: 'টিভেট আধুনিকায়ন' },
      { en: 'Industry competitiveness', bn: 'শিল্প প্রতিযোগিতামূলক সক্ষমতা' },
      { en: 'Public–private partnership', bn: 'পাবলিক–প্রাইভেট অংশীদারিত্ব' },
    ],
    theme: { en: 'Technical Education', bn: 'কারিগরি শিক্ষা' },
    logoPlaceholder: '',
    accent: 'cyan',
  },
  {
    id: 'bgmea',
    name: 'BGMEA',
    fullName: {
      en: 'Bangladesh Garment Manufacturers and Exporters Association',
      bn: 'বাংলাদেশ পোশাক প্রস্তুতকারক ও রপ্তানিকারক সমিতি',
    },
    partner: 'BGMEA',
    partnerRole: {
      en: 'Industry Association Partner',
      bn: 'শিল্প সমিতি সহযোগী',
    },
    summary: {
      en: 'The apex association of the country\'s readymade garment exporters, and the industry voice BIST aligns its apparel and textile training with.',
      bn: 'দেশের তৈরি পোশাক রপ্তানিকারকদের শীর্ষ সংগঠন; বিআইএসটি তার অ্যাপারেল ও টেক্সটাইল প্রশিক্ষণ এই শিল্পের চাহিদার সঙ্গে সমন্বয় করে।',
    },
    bistRole: {
      en: 'BIST works with BGMEA on member-factory placements, industrial attachment for diploma and degree students, and joint skills programmes for serving mid-level staff.',
      bn: 'বিআইএসটি বিজিএমইএর সঙ্গে সদস্য কারখানায় ইন্টার্নশিপ, ডিপ্লোমা ও ডিগ্রি শিক্ষার্থীদের শিল্প সংযুক্তি এবং কর্মরত মধ্যস্তরের কর্মীদের যৌথ দক্ষতা কর্মসূচিতে কাজ করে।',
    },
    focusAreas: [
      { en: 'Factory placement & internship', bn: 'কারখানা প্লেসমেন্ট ও ইন্টার্নশিপ' },
      { en: 'Apparel & textile skills', bn: 'অ্যাপারেল ও টেক্সটাইল দক্ষতা' },
      { en: 'Compliance and workplace safety', bn: 'কমপ্লায়েন্স ও কর্মক্ষেত্র নিরাপত্তা' },
    ],
    theme: { en: 'Garment Industry', bn: 'পোশাক শিল্প' },
    logoPlaceholder: '',
    accent: 'amber',
  },
  {
    id: 'bwcci',
    name: 'BWCCI',
    fullName: {
      en: 'Bangladesh Women Chamber of Commerce and Industry',
      bn: 'বাংলাদেশ উইমেন চেম্বার অব কমার্স অ্যান্ড ইন্ডাস্ট্রি',
    },
    partner: 'BWCCI',
    partnerRole: {
      en: 'Industry Association Partner',
      bn: 'শিল্প সমিতি সহযোগী',
    },
    summary: {
      en: 'The national chamber for women entrepreneurs, supporting BIST\'s women-focused technical and entrepreneurship training.',
      bn: 'নারী উদ্যোক্তাদের জাতীয় চেম্বার, যা বিআইএসটি-র নারী-কেন্দ্রিক কারিগরি ও উদ্যোক্তা প্রশিক্ষণে সহায়তা করে।',
    },
    bistRole: {
      en: 'BIST runs women-only cohorts in fashion technology, digital merchandising and CAD with BWCCI, aimed at female professionals already in the industry.',
      bn: 'বিআইএসটি বিডব্লিউসিসিআই-এর সঙ্গে ফ্যাশন টেকনোলজি, ডিজিটাল মার্চেন্ডাইজিং ও সিএডি-তে শুধুমাত্র নারীদের জন্য কোহর্ট পরিচালনা করে, যার লক্ষ্য শিল্পে কর্মরত নারী পেশাজীবীরা।',
    },
    focusAreas: [
      { en: 'Women-only technical cohorts', bn: 'শুধু নারীদের কারিগরি কোহর্ট' },
      { en: 'Entrepreneurship development', bn: 'উদ্যোক্তা উন্নয়ন' },
      { en: 'Digital merchandising & CAD', bn: 'ডিজিটাল মার্চেন্ডাইজিং ও সিএডি' },
    ],
    theme: { en: 'Women Empowerment', bn: 'নারী ক্ষমতায়ন' },
    logoPlaceholder: '',
    accent: 'indigo',
  },
];
