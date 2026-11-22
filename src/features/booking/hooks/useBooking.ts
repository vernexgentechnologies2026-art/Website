import { useEffect, useMemo, useRef, useState } from 'react';
import { ApiError } from '@/services/api/client';
import { bookingService } from '@/services/booking.service';
import { firstAvailableSlot, formatSlotLabel, getBookingDays, isSlotAvailable, TIME_SLOTS } from '../availability';
import type { BookingDetails, BookingResult } from '../types';

export type BookingStep = 0 | 1 | 2;

/** State machine for the 3-step booking card: pick slot → details → result. */
export function useBooking() {
  const days = useMemo(() => getBookingDays(), []);
  const [step, setStep] = useState<BookingStep>(0);
  const [dayIndex, setDayIndex] = useState<number | null>(0);
  const [slotIndex, setSlotIndex] = useState<number | null>(() => firstAvailableSlot(0));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BookingResult | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const day = dayIndex !== null ? days[dayIndex] : undefined;
  const slot = slotIndex !== null ? TIME_SLOTS[slotIndex] : undefined;
  const slotLabel = day && slot ? formatSlotLabel(day, slot) : '';
  const canContinue = Boolean(day && slot);

  const selectDay = (index: number) => {
    setDayIndex(index);
    setSlotIndex(null);
  };

  const selectSlot = (index: number) => {
    if (dayIndex !== null && isSlotAvailable(dayIndex, index)) setSlotIndex(index);
  };

  const goToDetails = () => {
    if (canContinue) setStep(1);
  };

  const backToSlots = () => {
    setError(null);
    setStep(0);
  };

  const submit = async (details: BookingDetails) => {
    if (!day || !slot || submitting) return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setSubmitting(true);
    setError(null);
    try {
      const outcome = await bookingService.createBooking(
        {
          name: details.name,
          phone: details.phone,
          businessName: details.businessName || undefined,
          date: day.iso,
          time: slot.value,
          timezone: 'Asia/Kolkata',
        },
        controller.signal,
      );
      setResult(outcome);
      setStep(2);
    } catch (err) {
      if (controller.signal.aborted) return;
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again or message us on WhatsApp.');
    } finally {
      if (abortRef.current === controller) setSubmitting(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setDayIndex(0);
    setSlotIndex(firstAvailableSlot(0));
    setStep(0);
  };

  return {
    days,
    slots: TIME_SLOTS,
    step,
    dayIndex,
    slotIndex,
    slotLabel,
    canContinue,
    submitting,
    error,
    result,
    selectDay,
    selectSlot,
    goToDetails,
    backToSlots,
    submit,
    reset,
  };
}

export type BookingController = ReturnType<typeof useBooking>;
