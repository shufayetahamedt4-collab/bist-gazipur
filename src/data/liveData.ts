/**
 * Real content mirrored from the live BIST website (https://bist.edu.bd).
 *
 * Snapshot taken: 30 September 2026, from the homepage notice board, the event and
 * news listings, and the testimonials carousel. Titles are kept exactly as published;
 * English/Bangla pairs are filled in where the live site publishes only one language.
 *
 * The only things NOT taken from the live site are the short neutral descriptions in
 * `content` (the live notices are attachments only) and the Bangla rendering of the
 * English testimonial quotes.
 */

import { Notice, EventItem, NewsItem, Testimonial } from '../types';

/**
 * Notice attachments are mirrored into /public/notices so the downloads keep working
 * even if the old site is retired. The originals live at
 * https://bist.edu.bd/backend/announcement/notice/<fileName>.
 */
const NOTICE_BASE = '/notices';

export const NOTICES: Notice[] = [
  {
    id: 'notice-1',
    title: {
      en: 'Fateha-e-Yazdaham',
      bn: 'ফাতিহা-ই-ইয়াজদাহম',
    },
    date: '22 Sep 2026',
    category: 'holidays',
    fileType: 'pdf',
    fileSize: '',
    isNew: true,
    isPinned: true,
    content: {
      en: 'Official observance notice for Fateha-e-Yazdaham. See the attached document for the programme and campus timings.',
      bn: 'পবিত্র ফাতিহা-ই-ইয়াজদাহম উপলক্ষে প্রজ্ঞাপন। অনুষ্ঠানের সময়সূচি সংযুক্ত নোটিশে দেওয়া হয়েছে।',
    },
    downloadUrl: `${NOTICE_BASE}/2026-09-22_501954103.pdf`,
    fileName: '2026-09-22_501954103.pdf',
  },
  {
    id: 'notice-2',
    title: {
      en: 'Notice on Mid-Term Examination',
      bn: 'মিড-টার্ম পরীক্ষার নোটিশ',
    },
    date: '14 Sep 2026',
    category: 'examinations',
    fileType: 'pdf',
    fileSize: '',
    isNew: true,
    isPinned: true,
    content: {
      en: 'Official mid-term examination notice. Download the attached document for the full schedule and instructions.',
      bn: 'মিড-টার্ম পরীক্ষার অফিসিয়াল নোটিশ। বিস্তারিত সময়সূচি ও নির্দেশনা সংযুক্ত ফাইলে দেওয়া হয়েছে।',
    },
    downloadUrl: `${NOTICE_BASE}/2026-09-14_958054699.pdf`,
    fileName: '2026-09-14_958054699.pdf',
  },
  {
    id: 'notice-3',
    title: {
      en: 'Notice on Janmashtami',
      bn: 'শুভ জন্মাষ্টমী উপলক্ষে নোটিশ',
    },
    date: '03 Sep 2026',
    category: 'holidays',
    fileType: 'pdf',
    fileSize: '',
    content: {
      en: 'Campus notice regarding Janmashtami. See the attached document for the holiday arrangement.',
      bn: 'শুভ জন্মাষ্টমী উপলক্ষে ক্যাম্পাসের নোটিশ। ছুটি সংক্রান্ত বিস্তারিত সংযুক্ত ফাইলে দেওয়া হয়েছে।',
    },
    downloadUrl: `${NOTICE_BASE}/2026-09-03_273942482.pdf`,
    fileName: '2026-09-03_273942482.pdf',
  },
  {
    id: 'notice-4',
    title: {
      en: 'FDT 13th Mid-Term Exam Notice',
      bn: 'এফডিটি ১৩তম মিড-টার্ম পরীক্ষার নোটিশ',
    },
    date: '02 Sep 2026',
    category: 'examinations',
    fileType: 'pdf',
    fileSize: '',
    content: {
      en: 'Mid-term examination notice for the 13th batch of the Fashion Design & Technology programme.',
      bn: 'ফ্যাশন ডিজাইন অ্যান্ড টেকনোলজি (এফডিটি) ১৩তম ব্যাচের মিড-টার্ম পরীক্ষার নোটিশ।',
    },
    downloadUrl: `${NOTICE_BASE}/2026-09-02_1921328039.pdf`,
    fileName: '2026-09-02_1921328039.pdf',
  },
  {
    id: 'notice-5',
    title: {
      en: 'FDT 12th Mid-Term Exam Notice',
      bn: 'এফডিটি ১২তম মিড-টার্ম পরীক্ষার নোটিশ',
    },
    date: '02 Sep 2026',
    category: 'examinations',
    fileType: 'pdf',
    fileSize: '',
    content: {
      en: 'Mid-term examination notice for the 12th batch of the Fashion Design & Technology programme.',
      bn: 'ফ্যাশন ডিজাইন অ্যান্ড টেকনোলজি (এফডিটি) ১২তম ব্যাচের মিড-টার্ম পরীক্ষার নোটিশ।',
    },
    downloadUrl: `${NOTICE_BASE}/2026-09-02_1754660262.pdf`,
    fileName: '2026-09-02_1754660262.pdf',
  },
  {
    id: 'notice-6',
    title: {
      en: 'BBA 12th Mid-Term Exam Notice',
      bn: 'বিবিএ ১২তম মিড-টার্ম পরীক্ষার নোটিশ',
    },
    date: '02 Sep 2026',
    category: 'examinations',
    fileType: 'image',
    fileSize: '',
    content: {
      en: 'Mid-term examination notice for the 12th batch of the Professional BBA programme.',
      bn: 'প্রফেশনাল বিবিএ ১২তম ব্যাচের মিড-টার্ম পরীক্ষার নোটিশ।',
    },
    downloadUrl: `${NOTICE_BASE}/2026-09-02_374282392.jpeg`,
    fileName: '2026-09-02_374282392.jpeg',
  },
  {
    id: 'notice-7',
    title: {
      en: 'Mid-Term Exam Notice – AMT 12th Batch, 5th Semester',
      bn: 'মিড-টার্ম পরীক্ষার নোটিশ – এএমটি ১২তম ব্যাচ, ৫ম সেমিস্টার',
    },
    date: '01 Sep 2026',
    category: 'examinations',
    fileType: 'pdf',
    fileSize: '',
    content: {
      en: 'Mid-term examination notice for the 12th batch of Apparel Manufacturing & Technology, 5th semester.',
      bn: 'অ্যাপারেল ম্যানুফ্যাকচারিং অ্যান্ড টেকনোলজি (এএমটি) ১২তম ব্যাচের ৫ম সেমিস্টার মিড-টার্ম পরীক্ষার নোটিশ।',
    },
    downloadUrl: `${NOTICE_BASE}/2026-09-01_187523647.pdf`,
    fileName: '2026-09-01_187523647.pdf',
  },
  {
    id: 'notice-8',
    title: {
      en: 'Mid-Term Exam Notice – AMT 13th Batch, 3rd Semester',
      bn: 'মিড-টার্ম পরীক্ষার নোটিশ – এএমটি ১৩তম ব্যাচ, ৩য় সেমিস্টার',
    },
    date: '01 Sep 2026',
    category: 'examinations',
    fileType: 'pdf',
    fileSize: '',
    content: {
      en: 'Mid-term examination notice for the 13th batch of Apparel Manufacturing & Technology, 3rd semester.',
      bn: 'অ্যাপারেল ম্যানুফ্যাকচারিং অ্যান্ড টেকনোলজি (এএমটি) ১৩তম ব্যাচের ৩য় সেমিস্টার মিড-টার্ম পরীক্ষার নোটিশ।',
    },
    downloadUrl: `${NOTICE_BASE}/2026-09-01_2035887777.pdf`,
    fileName: '2026-09-01_2035887777.pdf',
  },
  {
    id: 'notice-9',
    title: {
      en: 'Mid-Term Exam Routine – CSE 2nd & 3rd Batch',
      bn: 'মিড-টার্ম পরীক্ষার রুটিন – সিএসই ২য় ও ৩য় ব্যাচ',
    },
    date: '01 Sep 2026',
    category: 'examinations',
    fileType: 'image',
    fileSize: '',
    content: {
      en: 'Examination routine for the 2nd and 3rd batches of the Computer Science & Engineering programme.',
      bn: 'কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (সিএসই) ২য় ও ৩য় ব্যাচের পরীক্ষার রুটিন।',
    },
    downloadUrl: `${NOTICE_BASE}/2026-09-01_805348.jpeg`,
    fileName: '2026-09-01_805348.jpeg',
  },
  {
    id: 'notice-10',
    title: {
      en: 'Certificate – AMT 9th & FDT 9th Batch',
      bn: 'সনদ (সার্টিফিকেট) এএমটি-৯ম এবং এফডিটি-৯ম ব্যাচ',
    },
    date: '27 Jul 2026',
    category: 'other',
    fileType: 'pdf',
    fileSize: '',
    content: {
      en: 'Certificate distribution notice for the 9th batch of AMT and the 9th batch of FDT.',
      bn: 'এএমটি-৯ম এবং এফডিটি-৯ম ব্যাচের সনদ বিতরণ সংক্রান্ত নোটিশ।',
    },
    downloadUrl: `${NOTICE_BASE}/2026-07-30_89525425.pdf`,
    fileName: '2026-07-30_89525425.pdf',
  },
  {
    id: 'notice-11',
    title: {
      en: 'Public Holiday on the Occasion of Eid-e-Miladunnabi',
      bn: 'পবিত্র ঈদে মিলাদুন্নবী (সা.) উপলক্ষে সাধারণ ছুটি ঘোষণা',
    },
    date: '25 Aug 2026',
    category: 'holidays',
    fileType: 'pdf',
    fileSize: '',
    content: {
      en: 'Official announcement of the general holiday observed on the occasion of Eid-e-Miladunnabi.',
      bn: 'পবিত্র ঈদে মিলাদুন্নবী (সা.) উপলক্ষে সাধারণ ছুটি ঘোষণা সংক্রান্ত নোটিশ।',
    },
    downloadUrl: `${NOTICE_BASE}/2026-08-25_925179649.pdf`,
    fileName: '2026-08-25_925179649.pdf',
  },
  {
    id: 'notice-12',
    title: {
      en: 'Application for Re-evaluation of 2024 B.Sc. (Hons.) AMT, KMT & FDT 3rd Year 5th Semester Answer Scripts',
      bn: '২০২৪ সালের বিএসসি (অনার্স) AMT, KMT ও FDT ৩য় বর্ষ ৫ম সেমিস্টার পরীক্ষার উত্তরপত্র পুনর্মূল্যায়নের আবেদন',
    },
    date: '23 Aug 2026',
    category: 'examinations',
    fileType: 'image',
    fileSize: '',
    content: {
      en: 'Notice on submitting applications for re-evaluation of 2024 B.Sc. (Hons.) AMT, KMT and FDT 3rd year 5th semester answer scripts.',
      bn: '২০২৪ সালের বিএসসি (অনার্স) এএমটি, কেএমটি ও এফডিটি ৩য় বর্ষ ৫ম সেমিস্টার পরীক্ষার উত্তরপত্র পুনর্মূল্যায়নের আবেদন সংক্রান্ত নোটিশ।',
    },
    downloadUrl: `${NOTICE_BASE}/2026-08-23_671321339.jpeg`,
    fileName: '2026-08-23_671321339.jpeg',
  },
  {
    id: 'notice-13',
    title: {
      en: 'Result Published – 2024 MBA in Apparel Merchandising (MBA in AM)',
      bn: '২০২৪ সালের এমবিএ ইন অ্যাপারেল মার্চেন্ডাইজিং (MBA in AM) পরীক্ষার ফলাফল প্রকাশ',
    },
    date: '23 Aug 2026',
    category: 'examinations',
    fileType: 'image',
    fileSize: '',
    content: {
      en: 'Results of the 2024 MBA in Apparel Merchandising examinations have been published.',
      bn: '২০২৪ সালের এমবিএ ইন অ্যাপারেল মার্চেন্ডাইজিং পরীক্ষার ফলাফল প্রকাশ করা হয়েছে।',
    },
    downloadUrl: `${NOTICE_BASE}/2026-08-23_1661763295.jpeg`,
    fileName: '2026-08-23_1661763295.jpeg',
  },
  {
    id: 'notice-14',
    title: {
      en: 'Urgent: Centre List for the 2025 B.Sc. (Hons.) AMT, KMT & FDT 1st Year 1st Semester Practical Examination',
      bn: 'জরুরি নোটিশ: ২০২৫ সালের বিএসসি (অনার্স) AMT, KMT ও FDT ১ম বর্ষ ১ম সেমিস্টার ব্যবহারিক পরীক্ষার কেন্দ্র তালিকা',
    },
    date: '23 Aug 2026',
    category: 'examinations',
    fileType: 'image',
    fileSize: '',
    content: {
      en: 'Urgent notice listing the examination centres for the 2025 B.Sc. (Hons.) AMT, KMT and FDT 1st year 1st semester practical examination.',
      bn: '২০২৫ সালের বিএসসি (অনার্স) এএমটি, কেএমটি ও এফডিটি ১ম বর্ষ ১ম সেমিস্টার ব্যবহারিক পরীক্ষার কেন্দ্র তালিকা সংক্রান্ত জরুরি নোটিশ।',
    },
    downloadUrl: `${NOTICE_BASE}/2026-08-23_53541324.jpeg`,
    fileName: '2026-08-23_53541324.jpeg',
  },
  {
    id: 'notice-15',
    title: {
      en: 'Form Fill-Up Notice: B.Sc. (Hons.) AMT, KMT & FDT, 4th Year 8th Semester',
      bn: 'ফরম পূরণ নোটিশ: BSc (Honours) AMT, KMT ও FDT, ৪র্থ বর্ষ ৮ম সেমিস্টার',
    },
    date: '23 Aug 2026',
    category: 'examinations',
    fileType: 'image',
    fileSize: '',
    content: {
      en: 'Form fill-up notice for the 4th year 8th semester of B.Sc. (Hons.) AMT, KMT and FDT.',
      bn: 'বিএসসি (অনার্স) এএমটি, কেএমটি ও এফডিটি ৪র্থ বর্ষ ৮ম সেমিস্টারের ফরম পূরণ নোটিশ।',
    },
    downloadUrl: `${NOTICE_BASE}/2026-08-23_1187041732.jpeg`,
    fileName: '2026-08-23_1187041732.jpeg',
  },
  {
    id: 'notice-16',
    title: {
      en: 'Form Fill-Up Notice: BBA (Professional), 4th Year 8th Semester',
      bn: 'ফরম পূরণ নোটিশ: BBA (Professional), ৪র্থ বর্ষ ৮ম সেমিস্টার',
    },
    date: '23 Aug 2026',
    category: 'examinations',
    fileType: 'image',
    fileSize: '',
    content: {
      en: 'Form fill-up notice for the 4th year 8th semester of the Professional BBA programme.',
      bn: 'প্রফেশনাল বিবিএ ৪র্থ বর্ষ ৮ম সেমিস্টারের ফরম পূরণ নোটিশ।',
    },
    downloadUrl: `${NOTICE_BASE}/2026-08-23_1283200469.jpeg`,
    fileName: '2026-08-23_1283200469.jpeg',
  },
  {
    id: 'notice-17',
    title: {
      en: 'Exam 2024 – 3rd Year 5th Semester (AMT & FDT) Result Published',
      bn: 'পরীক্ষা ২০২৪ – ৩য় বর্ষ ৫ম সেমিস্টার (এএমটি ও এফডিটি) ফলাফল প্রকাশ',
    },
    date: '20 Aug 2026',
    category: 'examinations',
    fileType: 'pdf',
    fileSize: '',
    content: {
      en: 'Results of the 2024 3rd year 5th semester examinations for AMT and FDT have been published.',
      bn: '২০২৪ সালের ৩য় বর্ষ ৫ম সেমিস্টার (এএমটি ও এফডিটি) পরীক্ষার ফলাফল প্রকাশ করা হয়েছে।',
    },
    downloadUrl: `${NOTICE_BASE}/2026-08-20_1448339620.pdf`,
    fileName: '2026-08-20_1448339620.pdf',
  },
  {
    id: 'notice-18',
    title: {
      en: 'Registration Fee Payment Guidelines – AMT 15th, FDT 15th, BBA 15th, CSE 5th & TST 4th Batch',
      bn: 'এএমটি-১৫তম, এফডিটি-১৫তম, বিবিএ-১৫তম, সিএসই-৫ম ও টিএসটি-৪র্থ ব্যাচের রেজিস্ট্রেশন ফি পরিশোধের নির্দেশনা',
    },
    date: '18 Aug 2026',
    category: 'academic',
    fileType: 'pdf',
    fileSize: '',
    content: {
      en: 'Guidelines for paying the registration fee for the AMT 15th, FDT 15th, BBA 15th, CSE 5th and TST 4th batches.',
      bn: 'এএমটি-১৫তম, এফডিটি-১৫তম, বিবিএ-১৫তম, সিএসই-৫ম ও টিএসটি-৪র্থ ব্যাচের রেজিস্ট্রেশন ফি পরিশোধের নির্দেশনা।',
    },
    downloadUrl: `${NOTICE_BASE}/2026-08-18_1001914281.pdf`,
    fileName: '2026-08-18_1001914281.pdf',
  },
  {
    id: 'notice-19',
    title: {
      en: 'Notice for Students of the 2024-25 Academic Session',
      bn: '২০২৪-২৫ শিক্ষাবর্ষের শিক্ষার্থীদের নোটিশ',
    },
    date: '10 Jul 2026',
    category: 'academic',
    fileType: 'pdf',
    fileSize: '',
    content: {
      en: 'Notice issued for students of the 2024-25 academic session.',
      bn: '২০২৪-২৫ শিক্ষাবর্ষের শিক্ষার্থীদের জন্য জারি করা নোটিশ।',
    },
    downloadUrl: `${NOTICE_BASE}/2026-07-10_1423270370.pdf`,
    fileName: '2026-07-10_1423270370.pdf',
  },
  {
    id: 'notice-20',
    title: {
      en: 'Holy Muharram (Ashura)',
      bn: 'পবিত্র মুহাররম (আশুরা)',
    },
    date: '24 Jun 2026',
    category: 'holidays',
    fileType: 'pdf',
    fileSize: '',
    content: {
      en: 'Campus notice regarding the observance of holy Muharram (Ashura).',
      bn: 'পবিত্র মুহাররম (আশুরা) উপলক্ষে ক্যাম্পাসের নোটিশ।',
    },
    downloadUrl: `${NOTICE_BASE}/2026-06-24_1039382058.pdf`,
    fileName: '2026-06-24_1039382058.pdf',
  },
];

export const EVENTS: EventItem[] = [
  {
    id: 'event-1',
    title: {
      en: 'BDjobs Seminar',
      bn: 'বিডিজবস সেমিনার',
    },
    date: '18 Aug 2026',
    time: '',
    venue: {
      en: 'BIST Auditorium',
      bn: 'বিআইএসটি অডিটোরিয়াম',
    },
    category: 'Career & Industry',
    status: 'past',
    description: {
      en: 'Career seminar hosted on campus with the BDjobs team for final-year students and recent graduates.',
      bn: 'চূড়ান্ত বর্ষের শিক্ষার্থী ও সদ্য স্নাতকদের জন্য বিডিজবস টিমের ক্যাম্পাসভিত্তিক ক্যারিয়ার সেমিনার।',
    },
    image: '/images/event-bdjobs.jpeg',
    link: 'https://bist.edu.bd/event-details/20',
  },
  {
    id: 'event-2',
    title: {
      en: '17th Founding Anniversary of BIST & Prize Giving Ceremony-2025',
      bn: 'বিআইএসটি-এর ১৭তম প্রতিষ্ঠাবার্ষিকী ও পুরস্কার বিতরণী অনুষ্ঠান-২০২৫',
    },
    date: '28 Jun 2025',
    time: '',
    venue: {
      en: 'BIST Auditorium, Unishe Tower (3rd floor), Chandona Chowrasta, Gazipur-1702',
      bn: 'বিআইএসটি অডিটোরিয়াম, উনিশে টাওয়ার (৩য় তলা), চান্দনা চৌরাস্তা, গাজীপুর-১৭০২',
    },
    category: 'Celebration',
    status: 'past',
    description: {
      en: 'Founding anniversary celebration with a prize giving ceremony for meritorious students.',
      bn: 'প্রতিষ্ঠাবার্ষিকী উদযাপন এবং কৃতী শিক্ষার্থীদের মাঝে পুরস্কার বিতরণী অনুষ্ঠান।',
    },
    image: '/images/event-anniversary.jpeg',
    link: 'https://bist.edu.bd/event-details/19',
  },
  {
    id: 'event-3',
    title: {
      en: 'AMT & FDT 12th Batch Orientation Class',
      bn: 'এএমটি ও এফডিটি ১২তম ব্যাচের ওরিয়েন্টেশন ক্লাস',
    },
    date: '07 Aug 2023',
    time: '',
    venue: {
      en: 'Main Campus, Unishe Tower, BIST',
      bn: 'প্রধান ক্যাম্পাস, উনিশে টাওয়ার, বিআইএসটি',
    },
    category: 'Orientation',
    status: 'past',
    description: {
      en: 'Orientation class welcoming the 12th batch of the Apparel Manufacturing & Technology and Fashion Design & Technology programmes.',
      bn: 'অ্যাপারেল ম্যানুফ্যাকচারিং অ্যান্ড টেকনোলজি ও ফ্যাশন ডিজাইন অ্যান্ড টেকনোলজি ১২তম ব্যাচের ওরিয়েন্টেশন ক্লাস।',
    },
    image: '/images/event-orientation.jpeg',
    link: 'https://bist.edu.bd/event-details/18',
  },
];

export const NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: {
      en: 'BIST Textile Club (BTC) introduces the Deputy Directors of its five wings',
      bn: 'বিআইএসটি টেক্সটাইল ক্লাব (বিটিসি)-এর পাঁচটি উইঙের ডেপুটি ডিরেক্টরদের পরিচিতি',
    },
    date: '18 Aug 2026',
    category: 'Student Clubs',
    author: 'Engr. MD. Shohidul Islam',
    summary: {
      en: 'The club introduced the Deputy Directors of its five wings — Academic & Research, Corporate Relations & Career Development, Event Management & Operations, Media, Branding & IT, and Finance, Administration & Membership.',
      bn: 'ক্লাবটি তাদের পাঁচটি উইঙের ডেপুটি ডিরেক্টরদের পরিচয় করিয়ে দিয়েছে — একাডেমিক ও রিসার্চ, কর্পোরেট রিলেশনস ও ক্যারিয়ার ডেভেলপমেন্ট, ইভেন্ট ম্যানেজমেন্ট ও অপারেশনস, মিডিয়া, ব্র্যান্ডিং ও আইটি এবং ফিন্যান্স, অ্যাডমিনিস্ট্রেশন ও মেম্বারশিপ।',
    },
    content: {
      en: 'Strengthening the leadership: the BIST Textile Club welcomed the Deputy Directors who will support wing leadership, coordinate activities and turn ideas into meaningful initiatives. Together the team is ready to learn, lead, innovate and grow — from campus to industry.',
      bn: 'নেতৃত্ব আরও শক্তিশালী করতে বিআইএসটি টেক্সটাইল ক্লাব ডেপুটি ডিরেক্টরদের বরণ করে নেয়, যারা উইঙের নেতৃত্বে সহায়তা করবেন, কার্যক্রম সমন্বয় করবেন এবং আইডিয়াকে বাস্তবে রূপ দেবেন। ক্যাম্পাস থেকে ইন্ডাস্ট্রি — আমরা একসাথে শেখা, নেতৃত্ব, উদ্ভাবন ও বিকাশের জন্য প্রস্তুত।',
    },
    image: '/images/news-btc.jpg',
    link: 'https://bist.edu.bd/news/bist-textile-club-btc',
  },
  {
    id: 'news-2',
    title: {
      en: 'Heartiest congratulations to our Honorable Principal Sir on being elected President of the PIANU Committee',
      bn: 'পিআইএএনইউ কমিটির সভাপতি নির্বাচিত হওয়ায় মাননীয় অধ্যক্ষ মহোদয়কে আন্তরিক অভিনন্দন',
    },
    date: '02 Apr 2026',
    category: 'Leadership',
    author: 'BIST',
    summary: {
      en: 'Md. Deluwar Hosain, Principal of BIST, has been elected President of the PIANU Committee.',
      bn: 'বিআইএসটি-এর অধ্যক্ষ মোঃ দেলোয়ার হোসেন পিআইএএনইউ কমিটির সভাপতি নির্বাচিত হয়েছেন।',
    },
    content: {
      en: 'The BIST family congratulates Md. Deluwar Hosain, Principal, on being elected as the President of the PIANU Committee.',
      bn: 'পিআইএএনইউ কমিটির সভাপতি নির্বাচিত হওয়ায় বিআইএসটি পরিবারের পক্ষ থেকে অধ্যক্ষ মোঃ দেলোয়ার হোসেনকে আন্তরিক অভিনন্দন জানানো হচ্ছে।',
    },
    image: '/images/news-pianu.jpeg',
    link: 'https://bist.edu.bd/news/heartiest-congratulations-to-our-honorable-principal-sir-on-being-elected-as-the-president-of-the-pianu-committee',
  },
  {
    id: 'news-3',
    title: {
      en: 'Meritorious students felicitated at the BIST campus',
      bn: 'বিজিআইএফটি ক্যাম্পাসে কৃতী শিক্ষার্থী সংবর্ধনা অনুষ্ঠিত',
    },
    date: '',
    category: 'Academics',
    author: 'BIST',
    summary: {
      en: 'A reception was held on the BIST campus to honour students for outstanding academic achievement.',
      bn: 'অসাধারণ একাডেমিক অর্জনের জন্য শিক্ষার্থীদের সম্মান জানাতে বিআইএসটি ক্যাম্পাসে সংবর্ধনা অনুষ্ঠানের আয়োজন করা হয়।',
    },
    content: {
      en: 'The institute felicitated meritorious students at a ceremony on the BIST campus.',
      bn: 'বিআইএসটি ক্যাম্পাসে আয়োজিত অনুষ্ঠানে কৃতী শিক্ষার্থীদের সংবর্ধনা দেওয়া হয়।',
    },
    image: '/images/news-meritorious.jpg',
    link: 'https://bist.edu.bd/news/bijiaiefti-kzampase-krriti-siksharthee-sngbrdhna-onushthit',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: { en: 'Azizul Islam', bn: 'আজিজুল ইসলাম' },
    role: { en: 'Software Developer', bn: 'সফটওয়্যার ডেভেলপার' },
    image: '/images/testimonial-azizul.jpg',
    quote: {
      en: 'It was a great experience studying at BGIFT Institute Science & Technology, a memory to cherish for lifetime. My experience at BGIFT was full of learning and grooming.',
      bn: 'বিজিআইএফটি ইনস্টিটিউট অব সায়েন্স অ্যান্ড টেকনোলজিতে পড়াশোনার অভিজ্ঞতা সারা জীবনের স্মরণীয় হয়ে থাকবে। এখানে শেখা ও পরিশীলিত হওয়ার পূর্ণ সুযোগ পেয়েছি।',
    },
  },
  {
    id: 'test-2',
    name: { en: 'Md Shohidul Islam', bn: 'মোঃ শহীদুল ইসলাম' },
    role: { en: 'Front-End Developer', bn: 'ফ্রন্ট-এন্ড ডেভেলপার' },
    image: '/images/testimonial-shohidul.jpg',
    quote: {
      en: 'My experience at BGIFT was full of learning and grooming. It was a great experience studying at BGIFT Institute Science & Technology, a memory to cherish for lifetime.',
      bn: 'বিজিআইএফটিতে আমার অভিজ্ঞতা ছিল শেখা ও বিকাশে ভরপুর। এখানে পড়াশোনার অভিজ্ঞতা সারা জীবনের স্মরণীয় হয়ে থাকবে।',
    },
  },
  {
    id: 'test-3',
    name: { en: 'Md. Rezone Rahman', bn: 'মোঃ রেজোয়ান রহমান' },
    role: { en: 'Basic Computer Course graduate', bn: 'বেসিক কম্পিউটার কোর্সের স্নাতক' },
    image: '',
    quote: {
      en: 'I recently completed a basic computer course from this institute. I had a great time doing this course and everyone involved made it a great experience.',
      bn: 'সম্প্রতি এই ইনস্টিটিউট থেকে বেসিক কম্পিউটার কোর্স সম্পন্ন করেছি। কোর্সটি করতে গিয়ে দারুণ সময় কেটেছে এবং সংশ্লিষ্ট সবাই এটিকে চমৎকার অভিজ্ঞতায় পরিণত করেছেন।',
    },
  },
  {
    id: 'test-4',
    name: { en: 'Alamgir Hossain', bn: 'আলমগীর হোসেন' },
    role: { en: 'Assistant Teacher, Gazipur United College', bn: 'সহকারী শিক্ষক, গাজীপুর ইউনাইটেড কলেজ' },
    image: '/images/testimonial-alamgir.jpg',
    quote: {
      en: 'Dear Principal Sir, for your kind information, BGIFT Institute of Science And Technology is a great and charming institution in the world. It becomes very popular day by day.',
      bn: 'মাননীয় অধ্যক্ষ মহোদয়, আপনার অবগতির জন্য জানাচ্ছি — বিজিআইএফটি ইনস্টিটিউট অব সায়েন্স অ্যান্ড টেকনোলজি একটি অসাধারণ ও আকর্ষণীয় প্রতিষ্ঠান, যা দিন দিন আরও জনপ্রিয় হয়ে উঠছে।',
    },
  },
  {
    id: 'test-5',
    name: { en: 'Khairul Islam Minhaj', bn: 'খায়রুল ইসলাম মিনহাজ' },
    role: { en: 'IT Executive', bn: 'আইটি এক্সিকিউটিভ' },
    image: '/images/testimonial-khairul.jpg',
    quote: {
      en: 'It was my immense luck and fortune to be the part of BGIFT Institute of Science (BIST) & Technology where I can grow. The entire faculty and department leaves no stone unturned to shape one\u2019s future.',
      bn: 'বিজিআইএফটি ইনস্টিটিউট অব সায়েন্স অ্যান্ড টেকনোলজি (বিআইএসটি)-র অংশ হতে পারা আমার বড় সৌভাগ্য, যেখানে আমি বিকশিত হতে পেরেছি। শিক্ষকমণ্ডলী ও বিভাগ কারও ভবিষ্যৎ গড়তে কোনো ত্রুটি রাখেনি।',
    },
  },
];
