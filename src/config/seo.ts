/**
 * Page metadata — single source of truth.
 *
 * Pure data (no browser APIs) so it can be imported both by the app at runtime
 * and by the Vite build plugin that writes a static HTML entry + sitemap entry
 * for every route.
 */

export const SITE_URL = 'https://vernexgentech.in';
export const SITE_NAME = 'Vernex Gen Technologies';
export const OG_IMAGE_PATH = '/og-image.jpg';

export interface PageMeta {
  /** Route path, always starting with "/" */
  path: string;
  title: string;
  description: string;
  /** Whether search engines should index the page and list it in the sitemap. */
  indexable: boolean;
  /** Sitemap hints */
  changefreq?: 'weekly' | 'monthly' | 'yearly';
  priority?: number;
}

export const pageMeta = {
  home: {
    path: '/',
    title: 'Vernex Gen Technologies — Technology, Automation & Marketing',
    description:
      'Vernex builds business software, automation systems, dashboards, websites, branding, content and digital marketing for growing businesses.',
    indexable: true,
    changefreq: 'weekly',
    priority: 1,
  },
  privacy: {
    path: '/privacy-policy',
    title: 'Privacy Policy — Vernex Gen Technologies',
    description: 'How Vernex Gen Technologies collects, uses and protects personal information.',
    indexable: true,
    changefreq: 'yearly',
    priority: 0.3,
  },
  terms: {
    path: '/terms-and-conditions',
    title: 'Terms and Conditions — Vernex Gen Technologies',
    description: 'The terms that govern use of the Vernex Gen Technologies website and services.',
    indexable: true,
    changefreq: 'yearly',
    priority: 0.3,
  },
  cookies: {
    path: '/cookies-policy',
    title: 'Cookies Policy — Vernex Gen Technologies',
    description: 'How the Vernex Gen Technologies website uses cookies and similar technologies.',
    indexable: true,
    changefreq: 'yearly',
    priority: 0.3,
  },
  notFound: {
    path: '/404',
    title: 'Page not found — Vernex Gen Technologies',
    description: 'The page you were looking for could not be found.',
    indexable: false,
  },
} as const satisfies Record<string, PageMeta>;

export type PageKey = keyof typeof pageMeta;

export const absoluteUrl = (path: string): string => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);
