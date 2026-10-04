/**
 * Unified person model.
 *
 * Mirrors the Supabase schema in `supabase/migrations/0001_init.sql`:
 * one `people` row per human, with a variable number of `person_roles`.
 *
 * This is deliberately *not* re-exported from `./index` — `person.ts` imports
 * `LocalizedString` from there, so re-exporting would create a module cycle.
 *
 * Only the fields the official roster actually publishes are guaranteed.
 * Everything else is optional so no plausible-looking detail is ever invented
 * to fill a gap (same rule as the legacy FacultyMember / AdministrativeOfficer
 * types these are projected from).
 */

import { LocalizedString } from './index';

/** A person may teach, administrate, or both. */
export type PersonRoleKind = 'faculty' | 'officer' | 'leadership';

/**
 * One role a person holds. A lecturer who is also the Registrar gets two of
 * these, which is why the roster is 39 people rather than 47 records.
 */
export interface PersonRoleRecord {
  /** Programme or office code: 'CSE' | 'ADMIN' | 'office-of-the-registrar' … */
  unitCode: string;
  role: PersonRoleKind;
  designation: LocalizedString;
  /** Office name for officers; omitted for faculty (the unit name covers it). */
  unitName?: LocalizedString;
  employmentType?: string;
  responsibilities?: LocalizedString;
  displayOrder: number;
  isPrimary?: boolean;
  /**
   * The id this role used before the arrays were unified (e.g. `prof-nurul-amin`
   * for the faculty role, `off-vice-principal` for the officer role). Kept so
   * React keys and the legacy projections stay stable across the migration.
   */
  legacyId?: string;
}

/** One row of the profile Education table. */
export interface EducationEntry {
  degree: string;
  groupMajor?: string;
  boardInstitute?: string;
  country?: string;
  passingYear?: number;
}

export interface ExperienceEntry {
  role: string;
  organization: string;
  fromYear?: number;
  toYear?: number;
  isCurrent?: boolean;
}

export interface PublicationEntry {
  title: string;
  venue?: string;
  year?: number;
  doi?: string;
  url?: string;
}

export interface AwardEntry {
  title: string;
  body?: string;
  year?: number;
}

export interface MembershipEntry {
  body: string;
  role?: string;
  year?: number;
}

export type IdentityLinkKind = 'scholar' | 'orcid' | 'linkedin' | 'scopus' | 'researchgate';

export interface IdentityLink {
  kind: IdentityLinkKind;
  url: string;
}

/** Flags published alongside a name, e.g. "(on study leave)". */
export type PersonStatusFlag = 'on_study_leave';

export interface Person {
  /** Stable client id. Equals `slug` for mirrored people; becomes a uuid once Supabase is the source. */
  id: string;
  /** URL segment used by the `#/person/:slug` route. */
  slug: string;
  name: LocalizedString;
  /** At least one; the first is the primary role. */
  roles: PersonRoleRecord[];
  /** Free-text qualification string as published, e.g. "M.Sc In Mathematics, Diploma In Education". */
  qualifications?: string;
  statusFlags?: PersonStatusFlag[];
  photo: string;
  cvUrl?: string;
  shortBio?: LocalizedString;
  fullBio?: LocalizedString;
  email?: string;
  phone?: string;
  roomNo?: string;
  /** Source page on bist.edu.bd, when the roster publishes one. */
  profileUrl?: string;
  education?: EducationEntry[];
  experience?: ExperienceEntry[];
  publications?: PublicationEntry[];
  awards?: AwardEntry[];
  memberships?: MembershipEntry[];
  researchAreas?: string[];
  links?: IdentityLink[];
}
