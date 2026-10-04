/**
 * Academic content: the published Academic Regulations text, plus helpers that
 * turn the live notice feed into a calendar and a routine list.
 *
 * `ACADEMIC_REGULATIONS` is reproduced verbatim from the live page
 * https://bist.edu.bd/academic-regulations (snapshot 1 October 2026). The Bengali
 * renderings are translations added for the bilingual UI, matching the convention
 * already used for testimonials in ./liveData.ts.
 *
 * Calendar entries and routines are DERIVED from real published notices — nothing
 * here invents a date or a document.
 */

import { AcademicCalendarEntry, DownloadDoc, LocalizedString, Notice, RegulationSection } from '../types';

export const ACADEMIC_REGULATIONS: RegulationSection[] = [
  {
    id: 'why-bist',
    heading: { en: 'Why We Should Study at BIST', bn: 'কেন বিআইএসটিতে পড়বেন' },
    paragraphs: [],
    points: [
      { en: 'SEIP, NSDA & various government projects; free garments industry-based training', bn: 'এসইআইপি, এনএসডিএ ও বিভিন্ন সরকারি প্রকল্প; পোশাক শিল্পভিত্তিক বিনামূল্যে প্রশিক্ষণ' },
      { en: 'Opportunity to become a faculty member / trainer', bn: 'শিক্ষক/প্রশিক্ষক হওয়ার সুযোগ' },
      { en: 'Skilled & professional faculty', bn: 'দক্ষ ও পেশাদার শিক্ষকমণ্ডলী' },
      { en: 'IT focused', bn: 'আইটি-কেন্দ্রিক পাঠদান' },
      { en: 'Skill development / certification', bn: 'দক্ষতা উন্নয়ন ও সার্টিফিকেশন' },
      { en: 'Part-time job facilities for students', bn: 'শিক্ষার্থীদের জন্য খণ্ডকালীন কাজের সুযোগ' },
      { en: 'Free spoken English course', bn: 'বিনামূল্যে স্পোকেন ইংলিশ কোর্স' },
      { en: 'Politics-free institution', bn: 'রাজনীতিমুক্ত প্রতিষ্ঠান' },
      { en: 'Non-smoking campus', bn: 'ধূমপানমুক্ত ক্যাম্পাস' },
      { en: 'Scholarship facilities for meritorious and poor students', bn: 'মেধাবী ও অসচ্ছল শিক্ষার্থীদের জন্য বৃত্তির সুবিধা' },
      { en: 'Indoor games facilities', bn: 'ইনডোর গেমসের সুবিধা' },
      { en: 'The whole campus is under CCTV', bn: 'সম্পূর্ণ ক্যাম্পাস সিসিটিভির আওতায়' },
    ],
  },
  {
    id: 'teaching-method',
    heading: { en: 'Teaching Method', bn: 'শিক্ষাদান পদ্ধতি' },
    paragraphs: [
      {
        en: 'The medium of instruction for all academic programs at BGIFT is English. Each course focuses on the intellectual development of the students, and incorporates a variety of teaching methods in order to make the students proficient in the course. This ranges from case analysis, project work, presentations, research, group assignments, as well as various forms of competitions and simulations, etc. This holistic approach enables students to build their analytical abilities, develop professionalism and team work, as well as practically apply theoretical knowledge to derive innovative solutions for challenges and uncertainties, all of which are essential to thrive and survive in the real-life opportunities of the job market, in Bangladesh and around the world today.',
        bn: 'বিজিআইএফটির সকল একাডেমিক প্রোগ্রামে পাঠদানের মাধ্যম ইংরেজি। প্রতিটি কোর্স শিক্ষার্থীদের বৌদ্ধিক বিকাশে মনোযোগ দেয় এবং তাদের কোর্সে দক্ষ করে তুলতে নানা ধরনের শিক্ষণ পদ্ধতি ব্যবহার করে — কেস বিশ্লেষণ, প্রকল্প কাজ, উপস্থাপনা, গবেষণা, দলগত অ্যাসাইনমেন্ট, প্রতিযোগিতা ও সিমুলেশন ইত্যাদি। এই সামগ্রিক পদ্ধতি শিক্ষার্থীদের বিশ্লেষণী দক্ষতা, পেশাদারিত্ব ও দলগত কাজের মানসিকতা গড়ে তোলে এবং তাত্ত্বিক জ্ঞানকে বাস্তবে প্রয়োগ করে সমস্যার সৃজনশীল সমাধান বের করতে সহায়তা করে।',
      },
    ],
  },
  {
    id: 'sequence-of-subjects',
    heading: { en: 'Sequence of Subjects', bn: 'বিষয়ের ক্রমধারা' },
    paragraphs: [
      {
        en: 'Every undergraduate program of all 3 faculties is structured to follow a pre-denoted flow of courses over its time period. Students must successfully complete the ‘prerequisites’ of every course in order to proceed to the advanced courses and undertake major electives. Hence, it is crucial that students follow the proper sequence of the subjects of their degree requirements.',
        bn: 'সকল ৩টি অনুষদের প্রতিটি স্নাতক প্রোগ্রাম নির্দিষ্ট ক্রমধারায় সাজানো। উচ্চতর কোর্সে অগ্রসর হতে এবং মেজর ইলেকটিভ নিতে শিক্ষার্থীদের প্রতিটি কোর্সের ‘প্রিরিকুইজিট’ সফলভাবে সম্পন্ন করতে হবে। তাই ডিগ্রির প্রয়োজনীয় বিষয়গুলোর সঠিক ক্রম অনুসরণ করা অত্যন্ত জরুরি।',
      },
    ],
  },
  {
    id: 'academic-load',
    heading: { en: 'Academic Load', bn: 'একাডেমিক লোড' },
    paragraphs: [
      {
        en: 'Academic load for a regular full-time student: a minimum of 14–15 credits per semester (Spring / Summer / Fall) for undergraduate programmes.',
        bn: 'নিয়মিত পূর্ণকালীন শিক্ষার্থীর একাডেমিক লোড: স্নাতক প্রোগ্রামে প্রতি সেমিস্টারে (স্প্রিং / সামার / ফল) ন্যূনতম ১৪–১৫ ক্রেডিট।',
      },
    ],
  },
];

/** Notices whose title marks them as a routine rather than a plain circular. */
export const buildRoutines = (notices: Notice[]): DownloadDoc[] =>
  notices
    .filter((n) => Boolean(n.downloadUrl) && /routine|রুটিন/i.test(n.title.en + n.title.bn))
    .map((n) => ({
      id: `routine-${n.id}`,
      title: n.title,
      date: n.date,
      category: n.category === 'all' ? 'other' : n.category,
      fileType: n.fileType,
      fileSize: n.fileSize,
      url: n.downloadUrl as string,
      source: {
        en: 'Routine published on bist.edu.bd',
        bn: 'bist.edu.bd-এ প্রকাশিত রুটিন',
      },
    }));

/**
 * Build the academic calendar from real published notices. Each entry keeps a
 * link back to its source circular so nothing is presented without provenance.
 */
export const buildCalendarEntries = (notices: Notice[]): AcademicCalendarEntry[] =>
  notices
    .filter((n) => /^\d{2} [A-Za-z]{3} \d{4}$/.test(n.date.trim()))
    .map((n) => ({
      id: `cal-${n.id}`,
      date: n.date,
      title: n.title,
      category: n.category,
      sourceNoticeId: n.id,
      downloadUrl: n.downloadUrl,
    }));

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Parse the site's "22 Sep 2026" date format into a sortable month bucket. */
export const parseNoticeDate = (value: string): { month: string; year: string } => {
  const parts = value.trim().split(' ');
  if (parts.length < 3) return { month: '', year: '' };
  return { month: parts[1], year: parts[2] };
};

export const MONTH_ORDER = MONTHS;
