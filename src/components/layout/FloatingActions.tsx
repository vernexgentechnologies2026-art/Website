import { SectionLink } from '@/components/ui/SectionLink';
import { telHref } from '@/config/site';
import { whatsappMessages, whatsappUrl } from '@/services/whatsapp.service';

/** Floating WhatsApp button (approved design). Number comes from config. */
export function FloatingWhatsApp() {
  return (
    <a
      className="wa"
      href={whatsappUrl(whatsappMessages.general())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Vernex on WhatsApp (opens in a new tab)"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true" focusable="false">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3z" />
      </svg>
    </a>
  );
}

/** Fixed bottom action bar on tablets/phones (≤980px). */
export function MobileActionBar() {
  return (
    <div className="mbar">
      <a className="btn btn-out" href={telHref}>
        Call
      </a>
      <SectionLink section="book" className="btn btn-acc">
        Book free call
      </SectionLink>
    </div>
  );
}
