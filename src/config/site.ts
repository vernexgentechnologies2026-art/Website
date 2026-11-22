import { env } from './env';
import { SITE_NAME, SITE_URL } from './seo';

/**
 * Business details used across the site. Change contact details here (or via
 * environment variables) — never hardcode them inside components.
 *
 * PLACEHOLDERS: the fallback phone number and email below come from the
 * approved mockup and must be replaced with the real values before launch
 * (set VITE_CONTACT_PHONE / VITE_CONTACT_EMAIL).
 */
const PLACEHOLDER_PHONE = '+910000000000';
const PLACEHOLDER_EMAIL = 'hello@vernex.in';

export const site = {
  name: SITE_NAME,
  shortName: 'Vernex',
  url: SITE_URL,
  domainLabel: 'vernexgentech.in',
  tagline: 'Technology, automation and marketing for growing businesses.',
  location: 'India',
  timezoneLabel: 'IST',
  foundedYear: 2026,
  contact: {
    phone: env.contactPhone || PLACEHOLDER_PHONE,
    phoneIsPlaceholder: !env.contactPhone,
    email: env.contactEmail || PLACEHOLDER_EMAIL,
    emailIsPlaceholder: !env.contactEmail,
  },
} as const;

export const telHref = `tel:${site.contact.phone}`;
export const mailHref = `mailto:${site.contact.email}`;
