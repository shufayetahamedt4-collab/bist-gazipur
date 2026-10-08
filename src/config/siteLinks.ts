/**
 * Outbound links and embedding rules that the institution is expected to change.
 *
 * Everything a non-developer might need to edit lives here rather than being
 * scattered through components, so a URL swap is a one-line change.
 */

import type { AffiliationId } from '../types';

/**
 * Where the "Diploma" entry under Academics sends visitors.
 *
 * The institution runs a separate diploma portal, already recorded as
 * `UNIVERSITY_INFO.contact.diplomaSiteUrl` (`http://diploma.bist.edu.bd`). This
 * constant is deliberately kept as the plain institutional site for now; swap it
 * for the diploma portal when that is confirmed.
 */
export const DIPLOMA_SITE_URL = 'https://bist.edu.bd';

/** Label used on the Diploma menu entry, which leaves the app entirely. */
export const DIPLOMA_ENTRY_LABEL = {
  en: 'Diploma (BTEB)',
  bn: 'ডিপ্লোমা (বিটিইবি)',
} as const;

/**
 * Official pages where a visitor can verify BIST's registration with each body.
 *
 * `nu` points at the National University's searchable affiliated-college list,
 * where college code 5526 can be looked up directly. `bteb` and `nsda` still
 * point at the authority's official home page: the BTEB institute list lives on
 * `bteb.portal.gov.bd`, which does not resolve reliably from outside Bangladesh,
 * so a shallow link would be worse than the home page. Swap either value for the
 * exact deep link once it is confirmed — nothing else needs to change.
 */
export const AFFILIATION_VERIFY_URLS: Record<AffiliationId, string> = {
  nu: 'https://collegeportal.nu.ac.bd/college-list',
  bteb: 'https://bteb.gov.bd/',
  nsda: 'https://nsda.gov.bd/',
};

/**
 * How long to wait for an embedded official page before treating it as blocked.
 *
 * Government sites commonly send `X-Frame-Options: DENY` or a CSP
 * `frame-ancestors` rule, and none of that is readable from JavaScript. A frame
 * that never reports `load` is the only honest signal available, so we time out
 * and show the fallback card instead of an empty box.
 */
export const EMBED_TIMEOUT_MS = 4500;
