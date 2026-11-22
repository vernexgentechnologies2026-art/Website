import { integrations } from '@/config/integrations';
import type { BookingApiResponse, BookingRequest, BookingResult } from '@/features/booking/types';
import { apiRequest } from './api/client';
import { endpoints } from './api/endpoints';

/**
 * Booking service.
 *
 * Two implementations behind one interface:
 *  - `apiBookingService` — real backend (enabled when VITE_API_BASE_URL is set).
 *    The backend is responsible for calendar sync, email and WhatsApp
 *    confirmations and CRM updates.
 *  - `demoBookingService` — used until the backend exists. It sends nothing,
 *    stores nothing, and returns `kind: 'demo'` so the UI can say so.
 */
export interface BookingService {
  readonly mode: 'api' | 'demo';
  createBooking(request: BookingRequest, signal?: AbortSignal): Promise<BookingResult>;
}

const apiBookingService: BookingService = {
  mode: 'api',
  async createBooking(request, signal) {
    const response = await apiRequest<BookingApiResponse>(endpoints.bookings.create, {
      method: 'POST',
      body: request,
      signal,
    });
    return { kind: response.status, reference: response.id, request };
  },
};

const demoBookingService: BookingService = {
  mode: 'demo',
  async createBooking(request, signal) {
    // Short delay so the loading state is exercised; nothing is transmitted.
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(resolve, 600);
      signal?.addEventListener('abort', () => {
        clearTimeout(timer);
        reject(signal.reason);
      });
    });
    return { kind: 'demo', request };
  },
};

export const bookingService: BookingService =
  integrations.booking.mode === 'api' ? apiBookingService : demoBookingService;
