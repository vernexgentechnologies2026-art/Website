import { integrations } from '@/config/integrations';
import type { BookingDay, TimeSlot } from './types';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const TIME_SLOTS: TimeSlot[] = [
  { value: '10:00', label: '10:00 AM' },
  { value: '11:30', label: '11:30 AM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '14:30', label: '2:30 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '17:30', label: '5:30 PM' },
];

const pad = (n: number) => String(n).padStart(2, '0');

/** Next `count` bookable days starting tomorrow, skipping Sundays (as in the mockup). */
export function getBookingDays(from: Date = new Date(), count = 6): BookingDay[] {
  const days: BookingDay[] = [];
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) continue;
    days.push({
      iso: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
      weekday: WEEKDAYS[d.getDay()]!,
      day: d.getDate(),
      month: MONTHS[d.getMonth()]!,
    });
  }
  return days;
}

/**
 * Slot availability.
 *
 * DEMO MODE: reproduces the mockup's sample pattern of booked-out slots so the
 * UI can be reviewed. It does not reflect a real calendar.
 * API MODE: every slot is shown as open; the backend validates the slot on
 * submit. Replace with a call to `endpoints.bookings.availability` once the
 * backend exposes it.
 */
export function isSlotAvailable(dayIndex: number, slotIndex: number): boolean {
  if (integrations.booking.mode === 'demo') return (slotIndex + dayIndex) % 4 !== 1;
  return true;
}

export function firstAvailableSlot(dayIndex: number): number | null {
  const index = TIME_SLOTS.findIndex((_, i) => isSlotAvailable(dayIndex, i));
  return index === -1 ? null : index;
}

export const formatSlotLabel = (day: BookingDay, slot: TimeSlot) => `${day.weekday}, ${day.day} ${day.month} · ${slot.label}`;
