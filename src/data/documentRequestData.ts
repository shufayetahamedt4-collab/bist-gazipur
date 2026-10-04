/**
 * Document Enquiry / Request registry.
 *
 * Anyone outside the institution — an alumnus, an employer, a university, a
 * guardian, or a third party — may use this to ask the campus office for an
 * official document. This module defines *which* documents can be requested and
 * the verified channels a request travels through.
 *
 * Honesty rule (same as ./complianceData): the institution does not publish an
 * online document-request portal, an issuance fee schedule or a processing
 * timeline, so none of those are stated or invented here. The page presents only
 * the document classes a National University / BTEB affiliated institute
 * normally issues and the real published contact channels — the request itself
 * is composed as an email so it reaches a genuine inbox without any backend.
 */

import { DocumentRequestType, GrievanceChannel, LocalizedString } from '../types';
import { UNIVERSITY_INFO } from './catalogData';

/** Expand shorthand so each option carries an English + Bangla requirement line. */
const req = (en: string, bn: string): LocalizedString => ({ en, bn });

export const DOCUMENT_REQUEST_TYPES: DocumentRequestType[] = [
  {
    id: 'transcript',
    label: { en: 'Academic Transcript (official)', bn: 'একাডেমিক ট্রান্সক্রিপ্ট (অফিসিয়াল)' },
    requirement: req(
      'Programme, roll and registration number, and the years of study.',
      'প্রোগ্রাম, রোল ও রেজিস্ট্রেশন নম্বর এবং অধ্যয়নকালীন বছর।',
    ),
  },
  {
    id: 'certificate',
    label: { en: 'Academic / Degree Certificate', bn: 'একাডেমিক / ডিগ্রি সার্টিফিকেট' },
    requirement: req(
      'Programme, batch, roll and registration number.',
      'প্রোগ্রাম, ব্যাচ, রোল ও রেজিস্ট্রেশন নম্বর।',
    ),
  },
  {
    id: 'testimonial',
    label: { en: 'Testimonial', bn: 'প্রশংসাপত্র (টেস্টিমোনিয়াল)' },
    requirement: req(
      'Full name, programme, batch and the purpose it is needed for.',
      'পূর্ণ নাম, প্রোগ্রাম, ব্যাচ এবং কী উদ্দেশ্যে প্রয়োজন।',
    ),
  },
  {
    id: 'provisional',
    label: { en: 'Provisional Certificate', bn: 'প্রভিশনাল সার্টিফিকেট' },
    requirement: req(
      'Roll and registration number, plus proof of completion.',
      'রোল ও রেজিস্ট্রেশন নম্বর এবং কোর্স সম্পন্নের প্রমাণ।',
    ),
  },
  {
    id: 'character',
    label: { en: 'Character Certificate', bn: 'চারিত্রিক সনদপত্র' },
    requirement: req(
      'Full name, programme, batch and the reason it is required.',
      'পূর্ণ নাম, প্রোগ্রাম, ব্যাচ এবং কেন প্রয়োজন।',
    ),
  },
  {
    id: 'migration',
    label: { en: 'Migration Certificate', bn: 'মাইগ্রেশন সার্টিফিকেট' },
    requirement: req(
      'Roll, registration number and the receiving institution’s name.',
      'রোল, রেজিস্ট্রেশন নম্বর এবং যে প্রতিষ্ঠানে স্থানান্তর হবে তার নাম।',
    ),
  },
  {
    id: 'transfer',
    label: { en: 'Transfer Certificate', bn: 'ট্রান্সফার সার্টিফিকেট' },
    requirement: req(
      'Full name, programme, batch and last attended semester.',
      'পূর্ণ নাম, প্রোগ্রাম, ব্যাচ এবং সর্বশেষ সম্পন্ন সেমিস্টার।',
    ),
  },
  {
    id: 'duplicate-marksheet',
    label: { en: 'Duplicate Marksheet / Grade Sheet', bn: 'ডুপ্লিকেট মার্কশিট / গ্রেড শিট' },
    requirement: req(
      'Programme, semester, roll and registration number.',
      'প্রোগ্রাম, সেমিস্টার, রোল ও রেজিস্ট্রেশন নম্বর।',
    ),
  },
  {
    id: 'verification',
    label: { en: 'Document / Credential Verification', bn: 'ডকুমেন্ট / সনদের সত্যতা যাচাই' },
    requirement: req(
      'The applicant’s full name, programme and the requester’s organisation.',
      'আবেদনকারীর পূর্ণ নাম, প্রোগ্রাম এবং অনুসন্ধানকারী প্রতিষ্ঠানের নাম।',
    ),
  },
  {
    id: 'duplicate-id',
    label: { en: 'Duplicate Student ID Card', bn: 'ডুপ্লিকেট শিক্ষার্থী আইডি কার্ড' },
    requirement: req(
      'Student ID, programme, batch and a short reason for replacement.',
      'শিক্ষার্থী আইডি, প্রোগ্রাম, ব্যাচ এবং প্রতিস্থাপনের সংক্ষিপ্ত কারণ।',
    ),
  },
  {
    id: 'other',
    label: { en: 'Other document / not listed', bn: 'অন্য ডকুমেন্ট / তালিকায় নেই' },
    requirement: req(
      'Describe the document you need and why.',
      'আপনার প্রয়োজনীয় ডকুমেন্ট ও কারণ বর্ণনা করুন।',
    ),
  },
];

/**
 * Verified channels a document request may travel through. Every value is a
 * real, already-published contact point from ./catalogData — nothing invented.
 */
export const DOCUMENT_REQUEST_CHANNELS: GrievanceChannel[] = [
  {
    id: 'dr-email',
    label: { en: 'Office of the Registrar (email)', bn: 'রেজিস্ট্রার অফিস (ইমেইল)' },
    value: UNIVERSITY_INFO.contact.email,
    type: 'email',
  },
  {
    id: 'dr-phone',
    label: { en: 'Campus office phone', bn: 'ক্যাম্পাস অফিস ফোন' },
    value: UNIVERSITY_INFO.contact.officePhone,
    type: 'phone',
  },
  {
    id: 'dr-admission',
    label: { en: 'Admission desk phone', bn: 'ভর্তি ডেস্ক ফোন' },
    value: UNIVERSITY_INFO.contact.admissionPhone,
    type: 'phone',
  },
  {
    id: 'dr-address',
    label: { en: 'In person — campus address', bn: 'সশরীরে — ক্যাম্পাস ঠিকানা' },
    value: UNIVERSITY_INFO.contact.address.en,
    type: 'address',
  },
];

/**
 * Neutral, non-factual description of how a request is handled. No processing
 * times, fees or document counts are stated — the live site publishes none.
 */
export const DOCUMENT_REQUEST_STEPS: LocalizedString[] = [
  {
    en: 'Choose the document you need and tell us who the applicant is, using the form below or any listed channel.',
    bn: 'নিচের ফরম বা তালিকাভুক্ত যেকোনো মাধ্যম ব্যবহার করে আপনার প্রয়োজনীয় ডকুমেন্ট এবং আবেদনকারীর পরিচয় জানান।',
  },
  {
    en: 'The campus office traces the academic record and confirms the document is available to issue.',
    bn: 'ক্যাম্পাস অফিস একাডেমিক রেকর্ড খুঁজে ডকুমেন্টটি ইস্যু করা সম্ভব কিনা তা নিশ্চিত করে।',
  },
  {
    en: 'The office replies with the collection or delivery arrangement for that specific document.',
    bn: 'অফিস সেই নির্দিষ্ট ডকুমেন্ট সংগ্রহের বা সরবরাহের ব্যবস্থা জানিয়ে উত্তর দেয়।',
  },
  {
    en: 'Requests from employers or other institutions for verification of a genuine credential are handled the same way.',
    bn: 'কোনো প্রতিষ্ঠান বা নিয়োগকর্তার সত্যতা যাচাইয়ের অনুরোধও একইভাবে প্রক্রিয়া করা হয়।',
  },
];

export const DOCUMENT_REQUEST_NOTE: LocalizedString = {
  en: 'The institution has not yet published an online request portal, an issuance fee schedule or a processing timeline. This page therefore routes every request to the verified office channels above — it stores nothing on a server.',
  bn: 'প্রতিষ্ঠান এখনো অনলাইন রিকোয়েস্ট পোর্টাল, ইস্যু ফি তালিকা বা প্রক্রিয়াকরণের সময়সীমা প্রকাশ করেনি। তাই এই পেজ প্রতিটি অনুরোধ উপরের যাচাইকৃত অফিস চ্যানেলে পাঠায় — এটি কোনো সার্ভারে তথ্য সংরক্ষণ করে না।',
};
