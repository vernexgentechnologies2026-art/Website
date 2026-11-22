import { z } from 'zod';
import type { BookingDetails } from '../types';

const digitCount = (value: string) => value.replace(/\D/g, '').length;

export const bookingDetailsSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(80, 'Name is too long.'),
  phone: z
    .string()
    .trim()
    .min(1, 'Please enter your phone / WhatsApp number.')
    .regex(/^\+?[\d\s()-]+$/, 'Use digits only, e.g. +91 98765 43210.')
    .refine((v) => digitCount(v) >= 10 && digitCount(v) <= 15, 'Enter a valid phone number with country code.'),
  businessName: z.string().trim().max(160, 'Please keep this under 160 characters.'),
}) satisfies z.ZodType<BookingDetails>;

export type { BookingDetails };
