import { useLayoutEffect, useRef, useState } from 'react';
import { Arrow } from '@/components/ui/Arrow';
import { Reveal } from '@/components/ui/Reveal';
import { planCategories } from '@/data/pricing';

interface KnobPosition {
  left: number;
  width: number;
}

export function PricingSection() {
  const [category, setCategory] = useState(0);
  const [knob, setKnob] = useState<KnobPosition>({ left: 5, width: 0 });
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Position the sliding knob under the active button; re-measure on resize
  // and after web fonts load (button widths change).
  useLayoutEffect(() => {
    const measure = () => {
      const btn = buttonRefs.current[category];
      if (btn) setKnob({ left: btn.offsetLeft, width: btn.offsetWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    let cancelled = false;
    void document.fonts?.ready.then(() => {
      if (!cancelled) measure();
    });
    return () => {
      cancelled = true;
      window.removeEventListener('resize', measure);
    };
  }, [category]);

  const active = planCategories[category]!;

  return (
    <section id="plans" aria-labelledby="plans-heading">
      <div className="wrap">
        <Reveal className="sh">
          <div>
            <span className="ey">Plans</span>
            <h2 id="plans-heading">Pick a starting point.</h2>
          </div>
          <p>Every plan is tailored after a free call. Switch to see plans for your need.</p>
        </Reveal>

        <Reveal className="toggle" role="group" aria-label="Plan category">
          <span className="k" style={{ left: knob.left, width: knob.width }} aria-hidden="true" />
          {planCategories.map((c, i) => (
            <button
              key={c.id}
              ref={(el) => {
                buttonRefs.current[i] = el;
              }}
              type="button"
              className={i === category ? 'on' : undefined}
              aria-pressed={i === category}
              onClick={() => setCategory(i)}
            >
              {c.label}
            </button>
          ))}
        </Reveal>

        {/* keyed so the staggered entry animation replays on every switch */}
        <div className="pk sw" key={active.id}>
          {active.plans.map((p) => (
            <article key={p.name} className={`p glow${p.featured ? ' f' : ''}`} aria-label={`${p.name} plan`}>
              {p.featured && <span className="bd">Most popular</span>}
              <h3>{p.name}</h3>
              <div className="for">{p.audience}</div>
              <div className="pr">{p.priceNote}</div>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a className={`btn ${p.featured ? 'btn-acc' : 'btn-out'}`} href="#book">
                Get a quote <Arrow />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
