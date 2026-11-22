import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { serviceIndexFromHash } from '@/data/services';

/**
 * Scroll handling on route changes:
 *  - "/#section" from another route (or a direct visit) → scroll to the section
 *    once it exists (sections may still be rendering).
 *  - any other route change → back to top.
 * Same-page hash changes are left to the browser's native anchor scrolling.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Service deep links are handled by ServicesSection (smooth scroll + selection);
    // just start the new page from the top so that scroll is smooth and predictable.
    if (!hash || serviceIndexFromHash(hash) !== -1) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let attempts = 0;
    let frame = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
        return;
      }
      if (++attempts < 60) frame = requestAnimationFrame(tryScroll);
    };
    frame = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(frame);
    // Only route (pathname) changes — not in-page hash navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
