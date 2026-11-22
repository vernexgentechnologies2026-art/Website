# Vernex Gen Technologies — website

Official website for **Vernex Gen Technologies** — <https://vernexgentech.in>

React 19 · TypeScript (strict) · Vite 8 · Tailwind CSS 4 · React Router 7 · React Hook Form + Zod

It is built from the approved mockup `../Vernex-3-Slate-Copper/index.html`. The layout, copy, interactions and animations match the mockup. There are two approved changes: the copper accent is now Vernex gold, and the footer has Privacy Policy, Terms and Conditions, and Cookies Policy links.

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build → dist/
npm run preview    # serve dist/ locally
npm run lint       # ESLint
npm run typecheck  # TypeScript only
```

Node 20.19+ is required.

## Configuration

Copy `.env.example` to `.env.local` and fill in the values. Set the same variables with your hosting provider for production builds.

| Variable | Purpose | If empty |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Backend API base URL | Booking runs in **demo mode**: nothing is sent or saved, and the UI says so |
| `VITE_WHATSAPP_PHONE` | WhatsApp number, digits only (e.g. `919876543210`) | Uses the mockup's placeholder `910000000000` |
| `VITE_CONTACT_PHONE` | "Call us" number (E.164) | Uses the mockup's placeholder `+910000000000` |
| `VITE_CONTACT_EMAIL` | Footer email | Uses the mockup's `hello@vernex.in` |

> Every `VITE_*` value is embedded in the public JavaScript bundle. Never put secrets, API keys or tokens in them.

**Before launch:** set the real WhatsApp number, phone and email, and replace the placeholder policy text, testimonials and sample case studies.

## Project structure

```text
src/
├── app/                 App + route table (legal pages are code-split)
├── components/
│   ├── layout/          Header, MobileNavigation, Footer, FloatingActions, SiteLayout, ScrollManager, LegalPageLayout
│   ├── sections/        Homepage sections, in mockup order
│   └── ui/              Reveal, AnimatedCounter, SectionLink, ServiceIcon, Logo, Arrow
├── features/booking/    Booking flow: state hook, Zod schema, availability, step components
├── services/
│   ├── api/             Typed fetch client + endpoint contract
│   ├── booking.service.ts   API implementation + clearly separated demo implementation
│   └── whatsapp.service.ts  wa.me click-to-chat links + prefilled messages
├── config/              env.ts · site.ts (contact details) · integrations.ts · seo.ts (page metadata)
├── data/                All site copy: services, pricing, goals, stats, results, process, testimonials, FAQ, nav
├── hooks/               useInView, useScrollState, useGlowEffect, useDocumentMeta, usePrefersReducedMotion
└── styles/              theme.css (brand tokens) · globals.css (component styles) · animations.css
build/static-routes.ts   Vite plugin: per-route static HTML, 404.html and sitemap.xml
```

## Brand colours

All colours live in `src/styles/theme.css`. Change them there only. The gold values were sampled from the official logo:

| Token | Value | Use |
| --- | --- | --- |
| `--brand-gold` | `#CD9E52` | Primary accent: buttons, bars, strokes, highlights |
| `--brand-gold-rich` | `#BF8E3E` | Depth / strokes |
| `--brand-gold-light` | `#E2B866` | Hover on gold fills, accent text on dark sections |
| `--brand-gold-deep` | `#9C7224` | Small accent text on light backgrounds (same contrast as the approved copper) |

Text on gold fills uses the slate ink `#1E262E` instead of white. White on this gold only reaches about 2.4:1 contrast; slate ink reaches about 6.3:1. The mockup already uses this pairing in its dark sections.

## Booking and backend integration

- `services/booking.service.ts` chooses the implementation. With `VITE_API_BASE_URL` set, it `POST`s a `BookingRequest` to `/bookings` and expects `{ id, status: 'confirmed' | 'pending' }`.
- Without a backend, the demo service returns `kind: 'demo'`. The confirmation screen then says **"Demo mode — not booked"** and offers a prefilled WhatsApp message instead of claiming the slot is booked.
- In demo mode, the struck-out time slots copy the mockup's sample pattern (`features/booking/availability.ts`). Replace this with `GET /bookings/availability` when the backend supports it.
- Calendar sync, email and WhatsApp confirmations, and CRM updates belong in the backend. The browser never holds credentials for them.
- WhatsApp currently uses click-to-chat (`wa.me`) only. Automated messages should go through the official WhatsApp Business Platform from the backend.

## SEO

- Each route gets its own title, description, canonical URL and Open Graph/Twitter tags. They are written into static HTML at build time (`dist/privacy-policy/index.html` and so on) and updated on client-side navigation.
- `sitemap.xml` is generated from `src/config/seo.ts`. `robots.txt` points to it.
- Organization and WebSite structured data (JSON-LD) are in `index.html`.

## Deployment

`dist/` is a fully static site. Every route has a real `index.html`, so direct URL visits work on any static host (Vercel, Netlify, Cloudflare Pages, Apache, nginx, S3). Unknown URLs should be served `404.html`; Vercel, Netlify and Cloudflare Pages do this automatically.

## Accessibility and motion

- Skip link, visible focus rings, labelled form fields, and errors announced to screen readers.
- Proper ARIA patterns for the tabs, accordion, carousel and menu dialog. Focus moves to each booking step's heading as you go.
- `prefers-reduced-motion` turns off reveals, the marquee, and the process/testimonial autoplay. Autoplay also pauses on hover or focus.
