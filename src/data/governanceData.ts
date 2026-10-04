/**
 * Governance data: the Board of Trustees.
 *
 * Primary source of truth is the dedicated page https://bist.edu.bd/board-of-trustees,
 * which lists two members and, for the Member Secretary, a full "Profile" list and an
 * "Education" table (its "Certification" tab reads "Coming soon!"). That content is
 * reproduced here verbatim — nothing is inferred.
 *
 * The institution's About and History pages (https://bist.edu.bd/about-us and
 * https://bist.edu.bd/page/history) additionally name Abdul Alim, Md. Abdul Azizi and
 * Md. Aminul Islam, and print Abdul Alim as Chairman, whereas the dedicated Board page
 * prints Dalia Parvin as Chairman. Both are on the official site; the dedicated Board
 * page is treated as the current roster, and the other names are recorded in
 * `BOARD_ALSO_PUBLISHED` so nothing published is silently dropped.
 *
 * No portraits are published for any trustee except the Member Secretary.
 */

import { BoardMember, LocalizedString } from '../types';

const BOARD_PAGE = 'https://bist.edu.bd/board-of-trustees';
const EDUCATION_PAGE = 'https://bist.edu.bd/chairman';

export const BOARD_OF_TRUSTEES: BoardMember[] = [
  {
    id: 'bot-chairman',
    slug: 'dalia-parvin',
    name: 'Dalia Parvin',
    role: { en: 'Chairman', bn: 'চেয়ারম্যান' },
    order: 1,
    // The official Board page shows empty E-mail and Cell fields for the Chairman,
    // and publishes no portrait, so none are shown here either.
    sourceUrl: BOARD_PAGE,
  },
  {
    id: 'bot-member-secretary',
    slug: 'md-deluwar-hosain',
    name: 'Md. Deluwar Hosain',
    role: { en: 'Member Secretary (Principal)', bn: 'সদস্য সচিব (অধ্যক্ষ)' },
    order: 2,
    photo: './images/trustees/deluwar-hosain.jpg',
    email: 'deluwar.principal@gmail.com',
    phone: '+8801714621128',
    positions: [
      {
        role: 'Founder & Principal (Member Secretary)',
        organisations: ['BGIFT Institute of Science & Technology (BIST)'],
      },
      {
        role: 'Founder & Chairman',
        organisations: [
          'Bhawal Gazipur Institute of Fashion Technology (BGIFT)',
          'Bhawal Gazipur Medical Institute (BGMI)',
          'Human Research Social Development Foundation (HRSD)',
        ],
      },
      {
        role: 'Founder & Director',
        organisations: ['Agrani Model College (AMC)', 'Agrani Model School (AMS)'],
      },
      {
        role: 'Founder & Chairman',
        organisations: ['Thikana Properties & Developers Ltd.'],
      },
      {
        role: 'Proprietor',
        organisations: [
          'DA Group it & Consultant',
          'DA Group Agro Enterprise',
          'DA Group Supplier',
        ],
      },
      {
        role: 'General Secretary',
        organisations: ['Professional Institute Association of National University (PIANU)'],
      },
    ],
    education: [
      {
        degree: 'M.B.A (Apparel Merchandising)',
        examination: 'MBA in AM, Certificate Examination, 2017',
        result: 'CGPA- 3.61 out of 4.00.',
        institution: 'National University.',
      },
      {
        degree: 'M.S.S (Social Work)',
        examination: 'Sub-Economic, Certificate Examination, 2007',
        result: '2nd Division.',
        institution: 'National University.',
      },
      {
        degree: "Hon's (Social Work)",
        examination: "Hon's Certificate Examination, 2005",
        result: '2nd Division.',
        institution: 'National University.',
      },
      {
        degree: 'HSC',
        examination: 'Higher Secondary Certificate Examination, 2001',
        result: 'Obtained 2nd Class.',
      },
      {
        degree: 'SSC',
        examination: 'Secondary School Certificate Examination, 1999',
        result: 'Obtained 1st Class.',
      },
    ],
    certificationPending: true,
    sourceUrl: EDUCATION_PAGE,
  },
];

/**
 * Trustees additionally named on the institution's About and History pages. Kept
 * separately because those pages print a different Chairman, so they cannot be merged
 * into the roster without asserting something unverified.
 */
export const BOARD_ALSO_PUBLISHED: { name: string; role: LocalizedString }[] = [
  { name: 'Abdul Alim', role: { en: 'Chairman (as printed on About & History pages)', bn: 'চেয়ারম্যান (আবাউট ও হিস্টরি পেজে উল্লিখিত)' } },
  { name: 'Md. Abdul Azizi', role: { en: 'Member', bn: 'সদস্য' } },
  { name: 'Md. Aminul Islam', role: { en: 'Member', bn: 'সদস্য' } },
];

/**
 * Neutral, non-factual description of the board's purpose. Mirrors only the sentiment
 * the live site itself publishes — that the board works for the institution's welfare.
 */
export const BOARD_ROLE_NOTE: LocalizedString = {
  en: 'The Board of Trustees provides governance and oversight for the institution, and its members work for the academic and institutional welfare of BIST. It operates alongside the Office of the Chairman and the Academic Council under the affiliation framework of the National University.',
  bn: 'বোর্ড অফ ট্রাস্টিজ প্রতিষ্ঠানের পরিচালনা ও তত্ত্বাবধান করে এবং এর সদস্যবৃন্দ বিআইএসটির একাডেমিক ও প্রাতিষ্ঠানিক কল্যাণে কাজ করেন। এটি জাতীয় বিশ্ববিদ্যালয়ের অধিভুক্তি কাঠামোর অধীনে চেয়ারম্যান অফিস ও একাডেমিক কাউন্সিলের পাশাপাশি পরিচালিত হয়।',
};

export const BOARD_PENDING_NOTE: LocalizedString = {
  en: 'The dedicated Board of Trustees page names the members listed above; the institute’s About and History pages also name Abdul Alim, Md. Abdul Azizi and Md. Aminul Islam (printing Abdul Alim as Chairman). The dedicated page is shown as the current board. Only published details are displayed — where the official site has no information, the field is marked as not published.',
  bn: 'নিবেদিত বোর্ড অফ ট্রাস্টিজ পেজ উপরের সদস্যদের নাম প্রকাশ করে; প্রতিষ্ঠানের আবাউট ও হিস্টরি পেজে অতিরিক্তভাবে আব্দুল আলিম, মো. আব্দুল আজিজি ও মো. আমিনুল ইসলামের নাম রয়েছে (সেখানে আব্দুল আলিমকে চেয়ারম্যান বলা হয়েছে)। এখানে নিবেদিত পেজকেই বর্তমান বোর্ড হিসেবে দেখানো হয়েছে। শুধুমাত্র প্রকাশিত তথ্য দেখানো হয় — যেখানে অফিসিয়াল সাইটে তথ্য নেই, সেখানে তা প্রকাশিত হয়নি বলে উল্লেখ করা হয়।',
};

/** The page on bist.edu.bd this roster is mirrored from. */
export const BOARD_SOURCE_PAGE = BOARD_PAGE;
