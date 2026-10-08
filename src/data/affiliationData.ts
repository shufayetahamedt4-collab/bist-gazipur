/**
 * The three bodies BIST is affiliated with or accredited by, one row per
 * "Academics → Affiliated By" sub-page.
 *
 * Names, codes and scopes are taken from what the institution already publishes
 * (the footer, the About page and bist.edu.bd/page/at-a-glance). The verification
 * URL for each body lives in `src/config/siteLinks.ts` because it is expected to
 * change.
 */

import { AffiliationBody } from '../types';
import { UNIVERSITY_INFO } from './catalogData';

export const AFFILIATION_BODIES: AffiliationBody[] = [
  {
    id: 'nu',
    shortName: 'NU',
    name: {
      en: 'National University',
      bn: 'জাতীয় বিশ্ববিদ্যালয়',
    },
    code: UNIVERSITY_INFO.codes.nu.code,
    codeLabel: {
      en: 'National University College Code',
      bn: 'জাতীয় বিশ্ববিদ্যালয় কলেজ কোড',
    },
    description: {
      en: 'National University is the affiliating body for BIST\'s four-year Honours degrees. It approves the curriculum, registers students, conducts the terminal examinations and awards the B.Sc. (Hons.) and BBA certificates in CSE, TST, AMT, FDT and Business Administration.',
      bn: 'বিআইএসটি-র চার বছর মেয়াদি অনার্স ডিগ্রির অধিভুক্ত প্রতিষ্ঠান জাতীয় বিশ্ববিদ্যালয়। এটি সিলেবাস অনুমোদন, শিক্ষার্থী নিবন্ধন, পরীক্ষা পরিচালনা এবং সিএসই, টিএসটি, এএমটি, এফডিটি ও বিবিএ-তে বি.এসসি (অনার্স) সনদ প্রদান করে।',
    },
    scope: [
      { en: 'Four-year B.Sc. (Hons.) in CSE, TST, AMT & FDT', bn: 'সিএসই, টিএসটি, এএমটি ও এফডিটি-তে চার বছর মেয়াদি বি.এসসি (অনার্স)' },
      { en: 'Professional BBA (Honours)', bn: 'প্রফেশনাল বিবিএ (অনার্স)' },
      { en: 'Student registration, transcripts and certificates', bn: 'শিক্ষার্থী নিবন্ধন, ট্রান্সক্রিপ্ট ও সনদ' },
      { en: 'Examination scheduling and results', bn: 'পরীক্ষার সময়সূচি ও ফলাফল' },
    ],
    verification: {
      en: 'Search the National University institution list for college code 5526 to confirm BIST\'s affiliation.',
      bn: 'বিআইএসটি-র অধিভুক্তি নিশ্চিত করতে জাতীয় বিশ্ববিদ্যালয়ের প্রতিষ্ঠান তালিকায় কলেজ কোড ৫৫২৬ অনুসন্ধান করুন।',
    },
  },
  {
    id: 'bteb',
    shortName: 'BTEB',
    name: {
      en: 'Bangladesh Technical Education Board',
      bn: 'বাংলাদেশ কারিগরি শিক্ষা বোর্ড',
    },
    code: UNIVERSITY_INFO.codes.bteb.code,
    codeLabel: {
      en: 'BTEB College Code',
      bn: 'কারিগরি শিক্ষা বোর্ড কলেজ কোড',
    },
    description: {
      en: 'BTEB is the statutory board that regulates technical and vocational education in Bangladesh. BIST runs its four-year Diploma-in-Engineering and Diploma-in-Textile programmes under BTEB approval, following the board\'s published curriculum and sitting its assessments.',
      bn: 'কারিগরি ও বৃত্তিমূলক শিক্ষা নিয়ন্ত্রণকারী সংবিধিবদ্ধ বোর্ড হলো বিটিইবি। বিটিইবি-র অনুমোদনে বিআইএসটি চার বছর মেয়াদি ডিপ্লোমা ইন ইঞ্জিনিয়ারিং ও ডিপ্লোমা ইন টেক্সটাইল পরিচালনা করে এবং বোর্ডের নির্ধারিত মূল্যায়নে অংশ নেয়।',
    },
    scope: [
      { en: 'Diploma in Engineering (10 technologies)', bn: 'ডিপ্লোমা ইন ইঞ্জিনিয়ারিং (১০টি টেকনোলজি)' },
      { en: 'Diploma in Textile Technology (4 technologies)', bn: 'ডিপ্লোমা ইন টেক্সটাইল টেকনোলজি (৪টি টেকনোলজি)' },
      { en: 'Probidhan curriculum and board examinations', bn: 'প্রবিধান সিলেবাস ও বোর্ড পরীক্ষা' },
      { en: 'Industrial attachment and certification', bn: 'শিল্প সংযুক্তি ও সনদায়ন' },
    ],
    verification: {
      en: 'Look up institute code 53098 in BTEB\'s published list of approved institutions.',
      bn: 'বিটিইবি-র অনুমোদিত প্রতিষ্ঠানের তালিকায় প্রতিষ্ঠান কোড ৫৩০৯৮ দেখুন।',
    },
  },
  {
    id: 'nsda',
    shortName: 'NSDA',
    name: {
      en: 'National Skills Development Authority',
      bn: 'জাতীয় দক্ষতা উন্নয়ন কর্তৃপক্ষ',
    },
    code: UNIVERSITY_INFO.codes.nsda.code,
    codeLabel: {
      en: 'NSDA Registered Training Organisation Code',
      bn: 'এনএসডিএ নিবন্ধিত প্রশিক্ষণ প্রতিষ্ঠান কোড',
    },
    description: {
      en: 'NSDA is the national authority for skills development, sitting under the Prime Minister\'s Office. BIST is an NSDA-registered training organisation and assessment centre: it delivers competency-based short courses and certifies experienced workers through Recognition of Prior Learning, at levels 1 to 4 of the national skills framework.',
      bn: 'দক্ষতা উন্নয়নের জাতীয় কর্তৃপক্ষ এনএসডিএ, যা প্রধানমন্ত্রীর কার্যালয়ের অধীন। বিআইএসটি এনএসডিএ-নিবন্ধিত প্রশিক্ষণ প্রতিষ্ঠান ও মূল্যায়ন কেন্দ্র: এটি দক্ষতাভিত্তিক শর্ট কোর্স পরিচালনা করে এবং পূর্ব অভিজ্ঞতার স্বীকৃতির (আরপিএল) মাধ্যমে অভিজ্ঞ কর্মীদের জাতীয় দক্ষতা কাঠামোর লেভেল ১ থেকে ৪ পর্যন্ত সনদ দেয়।',
    },
    scope: [
      { en: 'Competency-based short courses', bn: 'দক্ষতাভিত্তিক শর্ট কোর্স' },
      { en: 'Recognition of Prior Learning (RPL) assessment', bn: 'পূর্ব অভিজ্ঞতার স্বীকৃতি (আরপিএল) মূল্যায়ন' },
      { en: 'National skills framework levels 1–4', bn: 'জাতীয় দক্ষতা কাঠামোর লেভেল ১–৪' },
      { en: 'Government-funded free seats for selected trades', bn: 'নির্বাচিত ট্রেডে সরকারি অর্থায়িত বিনামূল্যের আসন' },
    ],
    verification: {
      en: 'Search the NSDA registered training organisation list for code STP-GAZ-000020 to confirm BIST\'s registration.',
      bn: 'বিআইএসটি-র নিবন্ধন নিশ্চিত করতে এনএসডিএ-র নিবন্ধিত প্রশিক্ষণ প্রতিষ্ঠানের তালিকায় কোড STP-GAZ-000020 অনুসন্ধান করুন।',
    },
  },
];

/** One affiliation body by id, or `undefined` when the id is not a body we know. */
export const findAffiliation = (id: string): AffiliationBody | undefined =>
  AFFILIATION_BODIES.find((body) => body.id === id);
