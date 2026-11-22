import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingDetailsSchema, type BookingDetails } from '../schemas/bookingDetails';
import { StepHeading } from './StepHeading';

/**
 * Step 2 — visitor details. Code-split (with react-hook-form + zod) so the
 * validation stack is not part of the initial page load.
 */
interface Props {
  formId: string;
  slotLabel: string;
  /** Values typed so far; kept by the parent so "Change"/"Back" doesn't lose them. */
  draft: BookingDetails;
  onDraftChange: (values: BookingDetails) => void;
  onValidSubmit: (values: BookingDetails) => void;
  onChangeSlot: () => void;
  focusHeading: boolean;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p className="ferr" id={id} role="alert">
      {message}
    </p>
  );
}

export default function DetailsStep({ formId, slotLabel, draft, onDraftChange, onValidSubmit, onChangeSlot, focusHeading }: Props) {
  const {
    register,
    handleSubmit,
    subscribe,
    formState: { errors },
  } = useForm<BookingDetails>({
    resolver: zodResolver(bookingDetailsSchema),
    defaultValues: draft,
    mode: 'onTouched',
  });

  useEffect(
    () =>
      subscribe({
        formState: { values: true },
        callback: ({ values }) =>
          onDraftChange({ name: values.name ?? '', phone: values.phone ?? '', businessName: values.businessName ?? '' }),
      }),
    [subscribe, onDraftChange],
  );

  return (
    <div className="cs">
      <StepHeading autoFocus={focusHeading}>Your details</StepHeading>
      <div className="sub">So we can prepare for the call.</div>
      <div className="sel">
        <span>📅 {slotLabel}</span>
        <button type="button" onClick={onChangeSlot}>
          Change
        </button>
      </div>

      <form id={formId} onSubmit={handleSubmit(onValidSubmit)} noValidate>
        <label className="sr-only" htmlFor="bk-name">
          Your name
        </label>
        <input
          id="bk-name"
          className="inp"
          placeholder="Your name"
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? 'bk-name-err' : undefined}
          {...register('name')}
        />
        <FieldError id="bk-name-err" message={errors.name?.message} />

        <label className="sr-only" htmlFor="bk-phone">
          Phone / WhatsApp
        </label>
        <input
          id="bk-phone"
          className="inp"
          type="tel"
          inputMode="tel"
          placeholder="Phone / WhatsApp"
          autoComplete="tel"
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? 'bk-phone-err' : undefined}
          {...register('phone')}
        />
        <FieldError id="bk-phone-err" message={errors.phone?.message} />

        <label className="sr-only" htmlFor="bk-business">
          Business name &amp; website (optional)
        </label>
        <input
          id="bk-business"
          className="inp"
          placeholder="Business name & website (optional)"
          autoComplete="organization"
          aria-invalid={errors.businessName ? true : undefined}
          aria-describedby={errors.businessName ? 'bk-business-err' : undefined}
          {...register('businessName')}
        />
        <FieldError id="bk-business-err" message={errors.businessName?.message} />
      </form>
    </div>
  );
}
