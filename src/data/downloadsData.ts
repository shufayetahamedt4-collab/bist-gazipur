/**
 * Downloads Centre registry.
 *
 * Honesty rule for this file: only documents that genuinely exist appear here.
 * Every currently-listed file is an attachment the institution itself published
 * and that has already been mirrored from bist.edu.bd into /public/notices.
 *
 * The live site does not (yet) publish a prospectus PDF, downloadable syllabus
 * or blank admission form. Those categories are declared in
 * `PENDING_DOCUMENT_CATEGORIES` so the UI can say so plainly instead of showing
 * an empty list or an invented file.
 */

import { DownloadCategoryId, DownloadDoc, LocalizedString, Notice } from '../types';

export const DOWNLOAD_CATEGORIES: { id: DownloadCategoryId; label: LocalizedString }[] = [
  { id: 'examinations', label: { en: 'Examination & Routines', bn: 'পরীক্ষা ও রুটিন' } },
  { id: 'admissions', label: { en: 'Admission', bn: 'ভর্তি' } },
  { id: 'academic', label: { en: 'Academic & Registration', bn: 'একাডেমিক ও রেজিস্ট্রেশন' } },
  { id: 'holidays', label: { en: 'Holidays', bn: 'ছুটি' } },
  { id: 'other', label: { en: 'Other Circulars', bn: 'অন্যান্য সার্কুলার' } },
];

/**
 * Document types a visitor would expect in a Downloads Centre but that the live
 * site does not publish as downloadable files. Surfaced as an honest notice.
 */
export const PENDING_DOCUMENT_CATEGORIES: LocalizedString[] = [
  {
    en: 'Prospectus & programme brochure',
    bn: 'প্রসপেক্টাস ও প্রোগ্রাম ব্রোশিওর',
  },
  {
    en: 'Downloadable syllabus & course outlines',
    bn: 'ডাউনলোডযোগ্য সিলেবাস ও কোর্স আউটলাইন',
  },
  {
    en: 'Blank admission & scholarship application forms',
    bn: 'ফাঁকা ভর্তি ও স্কলারশিপ আবেদন ফরম',
  },
  {
    en: 'Official academic calendar (full-year PDF)',
    bn: 'অফিসিয়াল একাডেমিক ক্যালেন্ডার (পূর্ণ বছরের পিডিএফ)',
  },
];

const NOTICE_SOURCE: LocalizedString = {
  en: 'Official circular published on bist.edu.bd',
  bn: 'bist.edu.bd-এ প্রকাশিত অফিসিয়াল সার্কুলার',
};

/**
 * Build the document registry from the live notice list. Only notices that carry
 * a real attachment are included.
 */
export const buildDownloads = (notices: Notice[]): DownloadDoc[] =>
  notices
    .filter((n) => Boolean(n.downloadUrl))
    .map((n) => ({
      id: `dl-${n.id}`,
      title: n.title,
      date: n.date,
      category: n.category === 'all' ? 'other' : n.category,
      fileType: n.fileType,
      fileSize: n.fileSize,
      url: n.downloadUrl as string,
      source: NOTICE_SOURCE,
    }));

export const fileTypeLabel = (type: DownloadDoc['fileType']): string =>
  type === 'pdf' ? 'PDF' : type === 'doc' ? 'DOC' : 'IMAGE';
