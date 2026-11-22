/**
 * Backend endpoint paths (relative to VITE_API_BASE_URL).
 * These are the contract the future backend is expected to implement.
 */
export const endpoints = {
  bookings: {
    /** POST BookingRequest → BookingApiResponse */
    create: '/bookings',
    /** GET ?from=YYYY-MM-DD&to=YYYY-MM-DD → availability (future) */
    availability: '/bookings/availability',
  },
  contact: {
    /** POST enquiry (future contact form) */
    create: '/enquiries',
  },
} as const;
