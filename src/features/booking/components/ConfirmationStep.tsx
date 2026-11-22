import { Arrow } from '@/components/ui/Arrow';
import { site } from '@/config/site';
import { whatsappMessages, whatsappUrl } from '@/services/whatsapp.service';
import type { BookingResult } from '../types';
import { StepHeading } from './StepHeading';

interface Props {
  result: BookingResult;
  slotLabel: string;
  onRestart: () => void;
}

/**
 * Final step. A real booking (backend accepted it) and a demo submission
 * (no backend — nothing saved) are deliberately worded differently.
 */
export function ConfirmationStep({ result, slotLabel, onRestart }: Props) {
  const when = `Free call: ${slotLabel} ${site.timezoneLabel}`;

  if (result.kind === 'demo') {
    return (
      <div className="cs ok" role="status">
        <span className="badge">Demo mode — not booked</span>
        <StepHeading autoFocus>Almost there — confirm with us</StepHeading>
        <div className="sub when">Requested: {slotLabel} {site.timezoneLabel}</div>
        <div className="sub">
          Online booking isn&apos;t connected yet, so this time has not been reserved and your details were not sent.
          Message us on WhatsApp to confirm the slot.
        </div>
        <a
          className="btn btn-acc"
          href={whatsappUrl(whatsappMessages.booking(slotLabel, result.request.name))}
          target="_blank"
          rel="noopener noreferrer"
        >
          Confirm on WhatsApp <Arrow />
        </a>
        <button type="button" className="restart" onClick={onRestart}>
          ← Pick another time
        </button>
      </div>
    );
  }

  const confirmed = result.kind === 'confirmed';
  return (
    <div className="cs ok" role="status">
      <div className="tick" aria-hidden="true">
        ✓
      </div>
      <StepHeading autoFocus>{confirmed ? "You're booked!" : 'Request received!'}</StepHeading>
      <div className="sub when">{when}</div>
      <div className="sub">
        {confirmed ? "We'll send a confirmation on WhatsApp." : "We'll confirm your slot on WhatsApp shortly."}
      </div>
      <div className="sub">Reference: {result.reference}</div>
    </div>
  );
}
