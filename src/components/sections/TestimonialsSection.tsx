import { useEffect, useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { testimonials } from '@/data/home';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const ROTATE_MS = 7000;
const n = testimonials.length;

/** Rotating testimonial with prev/next. Pauses on hover/focus and for reduced motion. */
export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % n), ROTATE_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, reducedMotion]);

  const t = testimonials[index]!;

  return (
    <section
      className="sec-tight"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      <div className="wrap">
        <Reveal className="quote">
          <figure className="pfade" key={index} aria-roledescription="slide" aria-label={`${index + 1} of ${n}`}>
            <blockquote>
              <q>“{t.quote}”</q>
            </blockquote>
            <figcaption className="who">
              <div className="av" aria-hidden="true">
                {t.initials}
              </div>
              <div>
                <b>{t.name}</b>
                <span>{t.role}</span>
              </div>
            </figcaption>
          </figure>
        </Reveal>
        <div className="qnav">
          <button type="button" aria-label="Previous testimonial" onClick={() => setIndex((i) => (i - 1 + n) % n)}>
            ←
          </button>
          <button type="button" aria-label="Next testimonial" onClick={() => setIndex((i) => (i + 1) % n)}>
            →
          </button>
        </div>
      </div>
    </section>
  );
}
