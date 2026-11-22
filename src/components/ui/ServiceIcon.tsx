import type { ReactNode } from 'react';
import type { ServiceIconKey } from '@/data/services';

/** Custom line icons from the approved mockup (24×24, 1.6 stroke). */
const paths: Record<ServiceIconKey, ReactNode> = {
  software: <path d="M4 5h16v11H4zM8 20h8M12 16v4" />,
  automation: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  dashboards: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  websites: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  branding: <path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5 6.7 19.4l1.2-6L3.4 9.3l6-.7z" />,
  content: <path d="M4 20h4L19 9l-4-4L4 16zM14 6l4 4" />,
  marketing: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
};

export function ServiceIcon({ name }: { name: ServiceIconKey }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
