import { env } from './env';

/**
 * Third-party / backend integration switches.
 *
 * Everything here is public configuration. Server-side credentials (WhatsApp
 * Business Platform tokens, Google Calendar service accounts, CRM keys, SMTP)
 * belong in the backend — never in this file or in VITE_* variables.
 */

/** Placeholder from the approved mockup — replace via VITE_WHATSAPP_PHONE. */
const PLACEHOLDER_WHATSAPP = '910000000000';

export type BookingMode = 'api' | 'demo';

export const integrations = {
  api: {
    baseUrl: env.apiBaseUrl,
    enabled: env.apiBaseUrl.length > 0,
    timeoutMs: 15_000,
  },
  booking: {
    /**
     * 'demo' until a backend is configured. In demo mode nothing is sent or
     * stored, and the UI says so explicitly.
     */
    mode: (env.apiBaseUrl ? 'api' : 'demo') as BookingMode,
  },
  whatsapp: {
    /** Digits only, international format (e.g. 919876543210). */
    phoneNumber: env.whatsappPhone || PLACEHOLDER_WHATSAPP,
    /** True only when a real number has been configured. */
    enabled: env.whatsappPhone.length > 0,
  },
} as const;

if (env.isDev) {
  if (!integrations.whatsapp.enabled) {
    console.warn('[vernex] VITE_WHATSAPP_PHONE is not set — the WhatsApp button uses a placeholder number.');
  }
  if (integrations.booking.mode === 'demo') {
    console.warn('[vernex] VITE_API_BASE_URL is not set — booking runs in demo mode (nothing is saved).');
  }
}
