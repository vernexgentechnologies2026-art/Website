import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { Arrow } from '@/components/ui/Arrow';
import { Reveal } from '@/components/ui/Reveal';
import { useBooking } from '../hooks/useBooking';
import { emptyBookingDetails, type BookingDetails } from '../types';
import { ConfirmationStep } from './ConfirmationStep';
import { SlotStep } from './SlotStep';

// Details form (react-hook-form + zod) is code-split and prefetched shortly
// after load, so it is ready by the time the visitor presses "Continue".
const loadDetailsStep = () => import('./DetailsStep');
const DetailsStep = lazy(loadDetailsStep);

const FORM_ID = 'booking-details';

/** The booking card: 3-step progress, slot picker, details form, result. */
export function BookingWidget() {
  const booking = useBooking();
  const [draft, setDraft] = useState<BookingDetails>(emptyBookingDetails);
  // Step headings take focus only after the visitor has moved between steps
  // (never on initial page load).
  const [navigated, setNavigated] = useState(false);
  const { step } = booking;

  useEffect(() => {
    const timer = window.setTimeout(() => void loadDetailsStep(), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  const onDraftChange = useCallback((values: BookingDetails) => setDraft(values), []);

  const goToDetails = () => {
    setNavigated(true);
    booking.goToDetails();
  };

  const backToSlots = () => {
    setNavigated(true);
    booking.backToSlots();
  };

  const onRestart = () => {
    setNavigated(true);
    setDraft(emptyBookingDetails);
    booking.reset();
  };

  return (
    <Reveal className="cal" role="group" aria-label="Book a free call">
      <div>
        <div
          className="steps3"
          role="progressbar"
          aria-label="Booking progress"
          aria-valuemin={1}
          aria-valuemax={3}
          aria-valuenow={step + 1}
        >
          {[0, 1, 2].map((i) => (
            <i key={i} className={i <= step ? 'on' : undefined} />
          ))}
        </div>

        {step === 0 && (
          <SlotStep
            days={booking.days}
            slots={booking.slots}
            dayIndex={booking.dayIndex}
            slotIndex={booking.slotIndex}
            selectDay={booking.selectDay}
            selectSlot={booking.selectSlot}
            focusHeading={navigated}
          />
        )}

        {step === 1 && (
          <Suspense fallback={<div className="min-h-[260px]" aria-busy="true" />}>
            <DetailsStep
              formId={FORM_ID}
              slotLabel={booking.slotLabel}
              draft={draft}
              onDraftChange={onDraftChange}
              onValidSubmit={booking.submit}
              onChangeSlot={backToSlots}
              focusHeading={navigated}
            />
          </Suspense>
        )}

        {step === 2 && booking.result && (
          <ConfirmationStep result={booking.result} slotLabel={booking.slotLabel} onRestart={onRestart} />
        )}

        {booking.error && step === 1 && (
          <p className="ferr form" role="alert">
            {booking.error}
          </p>
        )}

        {step < 2 && (
          <div className="cnav">
            <button
              type="button"
              className="bk"
              style={{ visibility: step === 1 ? 'visible' : 'hidden' }}
              onClick={backToSlots}
            >
              ← Back
            </button>
            {step === 0 ? (
              <button type="button" className="btn btn-acc" disabled={!booking.canContinue} onClick={goToDetails}>
                Continue <Arrow />
              </button>
            ) : (
              <button type="submit" form={FORM_ID} className="btn btn-acc" disabled={booking.submitting}>
                {booking.submitting ? 'Confirming…' : 'Confirm booking'} <Arrow />
              </button>
            )}
          </div>
        )}
      </div>
    </Reveal>
  );
}
