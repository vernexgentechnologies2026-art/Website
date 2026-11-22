import { integrations } from '@/config/integrations';
import { site } from '@/config/site';

/**
 * Click-to-chat links (wa.me). This only opens WhatsApp on the visitor's
 * device — it does not send anything on our behalf. Automated messages
 * (e.g. booking confirmations) must be sent by the backend through the
 * official WhatsApp Business Platform, never from the browser.
 */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${integrations.whatsapp.phoneNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Prefilled enquiry messages. */
export const whatsappMessages = {
  general: () => `Hi ${site.shortName}, I'd like to know more about your services.`,
  service: (serviceName: string) => `Hi ${site.shortName}, I'm interested in ${serviceName}. Can we talk?`,
  booking: (slotLabel: string, name?: string) =>
    `Hi ${site.shortName}${name ? `, this is ${name}` : ''}. I'd like to book a free strategy call on ${slotLabel} (${site.timezoneLabel}).`,
} as const;
