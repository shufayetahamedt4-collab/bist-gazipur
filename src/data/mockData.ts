/**
 * Public data API for the BIST website.
 *
 * The site imports everything from this module, so the underlying files can be
 * reorganised without touching a single component:
 *
 *   ./catalogData  – institution profile, programmes, official fee tables and
 *                    diploma tracks.
 *   ./peopleData   – faculty roster, administrative officers, photo gallery and
 *                    alumni directory, all mirrored from bist.edu.bd.
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

export {
  FACULTY_MEMBERS,
  ADMINISTRATIVE_OFFICERS,
  GALLERY_ITEMS,
  ALUMNI_DIRECTORY,
} from './peopleData';

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
