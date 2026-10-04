/**
 * Compliance content: the Grievance / Anti-Harassment Cell and IQAC pages.
 *
 * Contact channels are the real published numbers and addresses from
 * ./catalogData.ts (UNIVERSITY_INFO.contact). The quality-assurance wording and
 * accreditation codes come from ./institutionFacts.ts, which mirrors
 * https://bist.edu.bd/page/at-a-glance.
 *
 * The institution does not publish a named grievance committee or a formal
 * anti-harassment policy document online yet, so those parts of the UI are
 * deliberately shown as "not yet published" rather than invented.
 */

import { GrievanceChannel, LocalizedString } from '../types';
import { UNIVERSITY_INFO } from './catalogData';
import { ACCREDITATIONS, QUALITY_POLICY, INSTITUTION_GOALS } from './institutionFacts';

export const GRIEVANCE_CHANNELS: GrievanceChannel[] = [
  {
    id: 'gc-email',
    label: { en: 'Principal (official email)', bn: 'অধ্যক্ষ (অফিসিয়াল ইমেইল)' },
    value: UNIVERSITY_INFO.contact.email,
    type: 'email',
  },
  {
    id: 'gc-office',
    label: { en: 'Campus office phone', bn: 'ক্যাম্পাস অফিস ফোন' },
    value: UNIVERSITY_INFO.contact.officePhone,
    type: 'phone',
  },
  {
    id: 'gc-admission',
    label: { en: 'Admission office phone', bn: 'ভর্তি অফিস ফোন' },
    value: UNIVERSITY_INFO.contact.admissionPhone,
    type: 'phone',
  },
  {
    id: 'gc-address',
    label: { en: 'In person — campus address', bn: 'সশরীরে — ক্যাম্পাস ঠিকানা' },
    value: UNIVERSITY_INFO.contact.address.en,
    type: 'address',
  },
];

/**
 * Neutral, non-factual description of how a complaint reaches the authority.
 * No names, dates or numbers are stated here.
 */
export const GRIEVANCE_STEPS: LocalizedString[] = [
  {
    en: 'Submit your complaint through any of the channels below, or use the form on this page.',
    bn: 'নিচের যেকোনো মাধ্যম ব্যবহার করে অভিযোগ জমা দিন, অথবা এই পেজের ফরমটি পূরণ করুন।',
  },
  {
    en: 'The campus office records the complaint and forwards it to the competent authority for review.',
    bn: 'ক্যাম্পাস অফিস অভিযোগটি নথিভুক্ত করে পর্যালোচনার জন্য সংশ্লিষ্ট কর্তৃপক্ষের কাছে পাঠায়।',
  },
  {
    en: 'A complainant may request that their identity be kept confidential during the process.',
    bn: 'অভিযোগকারী চাইলে প্রক্রিয়ার সময় তার পরিচয় গোপন রাখার অনুরোধ করতে পারেন।',
  },
  {
    en: 'Urgent safety matters should be raised directly with the campus office rather than through this form.',
    bn: 'জরুরি নিরাপত্তা সংক্রান্ত বিষয় এই ফরমের বদলে সরাসরি ক্যাম্পাস অফিসে জানানো উচিত।',
  },
];

export const GRIEVANCE_POLICY_NOTE: LocalizedString = {
  en: 'The official anti-harassment policy document and the names of the committee members have not yet been published on the institution’s website. This page therefore lists only the verified reporting channels.',
  bn: 'অফিসিয়াল অ্যান্টি-হ্যারাসমেন্ট নীতিমালা ও কমিটির সদস্যদের নাম এখনো প্রতিষ্ঠানের ওয়েবসাইটে প্রকাশিত হয়নি। তাই এই পেজে শুধু যাচাইকৃত অভিযোগ জানানোর মাধ্যমগুলো দেওয়া হয়েছে।',
};

export const IQAC_CONTENT = {
  qualityPolicy: QUALITY_POLICY,
  accreditations: ACCREDITATIONS,
  goals: INSTITUTION_GOALS,
  /**
   * The institution publishes a quality policy and accreditation codes but no
   * dedicated IQAC page, so a full IQAC narrative cannot be presented verbatim.
   */
  pendingNote: {
    en: 'A dedicated Internal Quality Assurance Cell (IQAC) page is not yet published on the official website. The quality policy, institutional goals and statutory affiliations below are reproduced from the live site.',
    bn: 'নিবেদিত ইন্টারনাল কোয়ালিটি অ্যাস্যুরেন্স সেল (আইকিউএসি) পেজ এখনো অফিসিয়াল ওয়েবসাইটে প্রকাশিত হয়নি। নিচের গুণগত নীতি, প্রাতিষ্ঠানিক লক্ষ্য ও স্বীকৃতিসমূহ লাইভ সাইট থেকে সংগৃহীত।',
  } as LocalizedString,
};
