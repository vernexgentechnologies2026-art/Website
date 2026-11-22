/** Values from the details form (validated by schemas/bookingDetails.ts). */
export interface BookingDetails {
  name: string;
  phone: string;
  businessName: string;
}

export const emptyBookingDetails: BookingDetails = { name: '', phone: '', businessName: '' };

/** Payload sent to the backend when a visitor requests a call. */
export interface BookingRequest {
  name: string;
  phone: string;
  businessName?: string;
  /** Calendar date, YYYY-MM-DD (IST) */
  date: string;
  /** Slot start time, 24h HH:mm (IST) */
  time: string;
  timezone: 'Asia/Kolkata';
}

/** Expected backend response for POST /bookings. */
export interface BookingApiResponse {
  id: string;
  status: 'confirmed' | 'pending';
}

/**
 * Result shown to the visitor.
 * - `confirmed` / `pending`: the backend accepted the booking.
 * - `demo`: no backend is connected — nothing was saved or reserved.
 */
export type BookingResult =
  | { kind: 'confirmed' | 'pending'; reference: string; request: BookingRequest }
  | { kind: 'demo'; request: BookingRequest };

export interface TimeSlot {
  /** 24h HH:mm, used in API payloads */
  value: string;
  /** Display label, e.g. "10:00 AM" */
  label: string;
}

export interface BookingDay {
  /** YYYY-MM-DD */
  iso: string;
  weekday: string;
  day: number;
  month: string;
}
