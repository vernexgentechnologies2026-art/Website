import { useEffect, useState, type RefObject } from 'react';

interface Options {
  /** Element that receives the `--progress` (0–1) custom property. */
  progressRef: RefObject<HTMLElement | null>;
  /** Section ids to track for the active nav link (homepage only). */
  sectionIds: readonly string[];
}

/**
 * Single rAF-throttled scroll listener that drives:
 *  - the top progress bar (written straight to a CSS variable, no re-render)
 *  - the header's "scrolled" state
 *  - the active navigation section (section whose top is < 200px, as in the mockup)
 */
export function useScrollState({ progressRef, sectionIds }: Options) {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('');
  const idsKey = sectionIds.join('|');

  useEffect(() => {
    const ids = idsKey ? idsKey.split('|') : [];
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      progressRef.current?.style.setProperty('--progress', String(max > 0 ? Math.min(doc.scrollTop / max, 1) : 0));
      setScrolled(window.scrollY > 10);

      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) current = id;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [idsKey, progressRef]);

  return { scrolled, activeId };
}
