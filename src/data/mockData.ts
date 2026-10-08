/**
 * Public data API for the BIST website.
 *
 * The site imports everything from this module, so the underlying files can be
 * reorganised without touching a single component:
 *
 *   ./catalogData  – institution profile, programmes, official fee tables and
 *                    diploma tracks.
 *   ./people       – the unified roster (one row per person, with roles), plus
 *                    lossless FACULTY_MEMBERS / ADMINISTRATIVE_OFFICERS projections.
 *   ./peopleData   – photo gallery and alumni directory, mirrored from bist.edu.bd.
 *   ./liveData     – notices, events, news and testimonials mirrored from the
 *                    live site at https://bist.edu.bd (snapshot 30 Sep 2026).
 *   ./institutionFacts – overview, quality policy, goals, linkages and
 *                    accreditations published on the live site.
 */

export {
  UNIVERSITY_INFO,
  OTHER_FEE_TABLES,
  PROGRAMS,
  DIPLOMA_TEXTILE_PROGRAMS,
  DIPLOMA_ENGINEERING_PROGRAMS,
  PARTNERS_PROJECTS,
  FAQS,
} from './catalogData';

export { PEOPLE } from './people';
export { FACULTY_MEMBERS, ADMINISTRATIVE_OFFICERS } from './people';

/** Gallery and alumni content still lives alongside the original mirror. */
export { GALLERY_ITEMS, ALUMNI_DIRECTORY } from './peopleData';

export { NOTICES, EVENTS, NEWS, TESTIMONIALS } from './liveData';

export {
  INSTITUTION_OVERVIEW,
  QUALITY_POLICY,
  INSTITUTION_GOALS,
  LINKAGES,
  ACCREDITATIONS,
  DIPLOMA_SUBJECTS,
  ADMISSION_REQUIREMENTS,
  ADMISSION_DOCUMENTS,
} from './institutionFacts';

export {
  DOWNLOAD_CATEGORIES,
  PENDING_DOCUMENT_CATEGORIES,
  buildDownloads,
  fileTypeLabel,
} from './downloadsData';

export {
  ACADEMIC_REGULATIONS,
  buildCalendarEntries,
  buildRoutines,
  parseNoticeDate,
  MONTH_ORDER,
} from './academicData';

export { LIBRARY_QUOTES, LIBRARY_FACILITIES, STUDENT_LIFE_ITEMS } from './campusLifeData';

export {
  GRIEVANCE_CHANNELS,
  GRIEVANCE_STEPS,
  GRIEVANCE_POLICY_NOTE,
  IQAC_CONTENT,
} from './complianceData';

export {
  DOCUMENT_REQUEST_TYPES,
  DOCUMENT_REQUEST_CHANNELS,
  DOCUMENT_REQUEST_STEPS,
  DOCUMENT_REQUEST_NOTE,
} from './documentRequestData';

export {
  HONOURS_COURSES,
  PGD_COURSES,
  SHORT_COURSES,
  NSDA_COURSES,
  ALL_COURSES,
  findCourse,
  coursesAtLevel,
} from './coursesData';

export { AFFILIATION_BODIES, findAffiliation } from './affiliationData';

export { COLLABORATION_PROJECTS } from './collaborationData';

export { ANNOUNCEMENT_POSTS, ANNOUNCEMENTS_DATA_VERSION } from './announcementData';
