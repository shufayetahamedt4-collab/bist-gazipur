/**
 * Two-way codec between the in-app route state and the URL hash.
 *
 * Hash routing is used instead of the History API on purpose: the site is
 * published to a GitHub Pages *project subpath* with `base: './'` in
 * vite.config.ts, where history routing needs a 404.html SPA-fallback hack.
 * Hash routing works on any static host with the deploy workflow unchanged.
 *
 * Routes:
 *   #/                          → home
 *   #/about, #/library, …       → the PageId verbatim
 *   #/programs                  → the programme explorer
 *   #/programs/:deptId          → department-detail
 *   #/courses/:courseId         → course-detail (PGD, short and NSDA courses)
 *   #/affiliated/:bodyId        → affiliation-detail (nu | bteb | nsda)
 *   #/notices/:id               → notices, with that circular selected
 *   #/people/:slug              → person-detail (unified faculty/officer profile)
 *   #/admin/popups              → admin-popups (announcement popup editor)
 */

import { PageId } from '../types';

export interface RouteState {
  page: PageId;
  deptId?: string;
  courseId?: string;
  affiliationId?: string;
  personSlug?: string;
  noticeId?: string;
}

/**
 * Every PageId that maps one-to-one onto a single hash segment. Listed
 * exhaustively (rather than derived) so that adding a PageId without deciding
 * its URL is a visible omission here.
 *
 * `department-detail`, `course-detail`, `affiliation-detail` and `admin-popups`
 * are deliberately absent: each is only reachable through its own multi-segment
 * route, never as a bare segment.
 */
const FLAT_PAGES: PageId[] = [
  'home',
  'about',
  'principal-message',
  'digital-it',
  'departments',
  'programs',
  'honours-programs',
  'pgd',
  'short-courses',
  'admissions',
  'apply-online',
  'result',
  'notices',
  'activity',
  'faculty',
  'officers',
  'gallery',
  'alumni',
  'events',
  'news',
  'scholarships',
  'fees',
  'facilities',
  'projects',
  'faq',
  'contact',
  'privacy',
  'terms',
  'admin',
  'downloads',
  'academic-calendar',
  'academic-routines',
  'academic-regulations',
  'library',
  'student-life',
  'iqac',
  'grievance',
  'document-enquiry',
  'person-detail',
];

/** Route state → the hash that should appear in the address bar. */
export const routeToHash = (route: RouteState): string => {
  switch (route.page) {
    case 'home':
      return '#/';
    case 'department-detail':
      return route.deptId ? `#/programs/${encodeURIComponent(route.deptId)}` : '#/programs';
    case 'course-detail':
      // Without a course there is nothing to show, so fall back to the explorer.
      return route.courseId ? `#/courses/${encodeURIComponent(route.courseId)}` : '#/honours-programs';
    case 'affiliation-detail':
      return route.affiliationId
        ? `#/affiliated/${encodeURIComponent(route.affiliationId)}`
        : '#/honours-programs';
    case 'person-detail':
      // Without a slug there is nothing to show, so fall back to the directory.
      return route.personSlug ? `#/people/${encodeURIComponent(route.personSlug)}` : '#/faculty';
    case 'notices':
      return route.noticeId ? `#/notices/${encodeURIComponent(route.noticeId)}` : '#/notices';
    case 'admin-popups':
      return '#/admin/popups';
    default:
      return `#/${route.page}`;
  }
};

/**
 * The hash → route state, or `null` when the hash is not a route we know.
 * Callers should treat `null` as "not found" and normalise the URL, rather than
 * rendering a plausible-looking wrong page.
 */
export const parseHash = (hash: string): RouteState | null => {
  const raw = (hash || '')
    .replace(/^#/, '')
    .replace(/^\/+/, '')
    .replace(/\/+$/, '');

  if (!raw) return { page: 'home' };

  const segments = raw.split('/');
  const [first, second] = segments;

  if (first === 'programs') {
    return second
      ? { page: 'department-detail', deptId: decodeURIComponent(second) }
      : { page: 'programs' };
  }

  if (first === 'courses') {
    return second ? { page: 'course-detail', courseId: decodeURIComponent(second) } : null;
  }

  if (first === 'affiliated') {
    return second ? { page: 'affiliation-detail', affiliationId: decodeURIComponent(second) } : null;
  }

  if (first === 'people') {
    return second ? { page: 'person-detail', personSlug: decodeURIComponent(second) } : null;
  }

  if (first === 'admin' && second === 'popups') {
    return { page: 'admin-popups' };
  }

  if (first === 'notices' && second) {
    return { page: 'notices', noticeId: decodeURIComponent(second) };
  }

  // Anything with an extra segment that we did not expect is not a route.
  if (segments.length > 1) return null;

  return FLAT_PAGES.includes(first as PageId) ? { page: first as PageId } : null;
};

/** True when the current hash is a route this app can render. */
export const isKnownHash = (hash: string): boolean => parseHash(hash) !== null;

/** The hash for the current location, defaulting to the home route. */
export const currentHash = (): string =>
  typeof window === 'undefined' ? '#/' : window.location.hash || '#/';
