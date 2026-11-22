import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Reveal } from '@/components/ui/Reveal';
import { ServiceIcon } from '@/components/ui/ServiceIcon';
import { serviceAnchorId, serviceIndexFromHash, services } from '@/data/services';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const total = String(services.length).padStart(2, '0');
/** Where a non-sticky card lands: just below the 68px sticky header. */
const MOBILE_CARD_TOP = 88;
/** Safety release if the browser never fires `scrollend`. */
const SCROLL_LOCK_MS = 1600;

/**
 * Document Y to scroll to so card `index` is fully visible just below the header.
 *
 * - Non-sticky cards (the approved design: `.glow` overrides `.sc`'s sticky
 *   position, so cards are relatively positioned and offset by their inline
 *   `top`; also the ≤980px layout): the rendered rect is the true position.
 * - Sticky cards: a stuck card's rect is not its page position, so compute its
 *   in-flow position and land it where it sticks. Kept so the behaviour stays
 *   correct if the stacking effect is ever made truly sticky.
 */
function cardScrollTarget(cards: Array<HTMLElement | null>, index: number): number | null {
  const card = cards[index];
  const stack = card?.parentElement;
  if (!card || !stack) return null;
  const style = getComputedStyle(card);

  if (style.position !== 'sticky') {
    return Math.max(0, card.getBoundingClientRect().top + window.scrollY - MOBILE_CARD_TOP);
  }

  const gap = parseFloat(getComputedStyle(stack).rowGap) || 0;
  let naturalTop = stack.getBoundingClientRect().top + window.scrollY;
  for (let j = 0; j < index; j++) naturalTop += (cards[j]?.offsetHeight ?? 0) + gap;
  return Math.max(0, naturalTop - (parseFloat(style.top) || MOBILE_CARD_TOP));
}

/** Sticky service index + stacked sticky cards. */
export function ServicesSection() {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  /** While a programmatic scroll to a service runs, the observer must not override the selection. */
  const lockedTarget = useRef<number | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { hash, key } = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (lockedTarget.current !== null) return;
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Deep link to a service ("/#service-<id>", e.g. from the footer — on this page or
  // arriving from another route): smooth-scroll to the card, activate it in the index
  // and move focus to it. `key` changes on every navigation, so repeat clicks work too.
  useEffect(() => {
    const index = serviceIndexFromHash(hash);
    if (index === -1) return;

    let timer = 0;
    const release = () => {
      window.clearTimeout(timer);
      window.removeEventListener('scrollend', release);
      if (lockedTarget.current === index) lockedTarget.current = null;
    };

    // Next frame: the homepage has laid out (also when it just mounted).
    const frame = requestAnimationFrame(() => {
      const top = cardScrollTarget(cardRefs.current, index);
      if (top === null) return;
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      lockedTarget.current = index;
      setActive(index);
      window.scrollTo({ top, behavior: smooth ? 'smooth' : 'instant' });
      cardRefs.current[index]?.focus({ preventScroll: true });
      window.addEventListener('scrollend', release);
      timer = window.setTimeout(release, smooth ? SCROLL_LOCK_MS : 100);
    });

    return () => {
      cancelAnimationFrame(frame);
      release();
    };
  }, [hash, key]);

  const goTo = (index: number) => {
    cardRefs.current[index]?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
  };

  return (
    <section id="services" aria-labelledby="services-heading">
      <div className="wrap svc">
        <Reveal className="left">
          <span className="ey">Services</span>
          <h2 id="services-heading">Seven services. One growth system.</h2>
          <p>Each service works on its own — and works even better together.</p>
          <ul className="idx" aria-label="Jump to a service">
            {services.map((s, i) => (
              <li key={s.id} className={i === active ? 'on' : undefined}>
                <button type="button" onClick={() => goTo(i)} aria-current={i === active ? 'true' : undefined}>
                  {s.name}
                </button>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="stack">
          {services.map((s, i) => (
            <article
              key={s.id}
              id={serviceAnchorId(s.id)}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              tabIndex={-1}
              data-index={i}
              className="sc glow"
              style={{ top: 92 + i * 14 }}
              aria-labelledby={`service-${s.id}-title`}
            >
              <div>
                <div className="no">
                  {String(i + 1).padStart(2, '0')} / {total}
                </div>
                <h3 id={`service-${s.id}-title`}>{s.name}</h3>
                <p>{s.description}</p>
                <ul aria-label={`${s.name} includes`}>
                  {s.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="ico">
                <ServiceIcon name={s.icon} />
              </div>
              <div className="more">
                <span>
                  Outcome: <b>{s.outcome}</b>
                </span>
                <a href="#book" aria-label={`Discuss ${s.name} on a free call`}>
                  Discuss →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
