/**
 * Typed access to public build-time configuration.
 * Only VITE_* variables reach the browser — never put secrets in them.
 */
const read = (value: string | undefined): string => (value ?? '').trim();

export const env = {
  apiBaseUrl: read(import.meta.env.VITE_API_BASE_URL).replace(/\/+$/, ''),
  whatsappPhone: read(import.meta.env.VITE_WHATSAPP_PHONE).replace(/\D/g, ''),
  contactPhone: read(import.meta.env.VITE_CONTACT_PHONE).replace(/[^\d+]/g, ''),
  contactEmail: read(import.meta.env.VITE_CONTACT_EMAIL),
  isDev: import.meta.env.DEV,
} as const;
