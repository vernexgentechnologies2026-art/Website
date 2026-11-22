import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { processSteps } from '@/data/home';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const STEP_MS = 5000;

/**
 * Process tabs. Auto-plays every 5s (with the progress line filling) until the
 * visitor picks a step; autoplay is off for reduced-motion users.
 */
export function ProcessSection() {
  const [step, setStep] = useState(0);
  const [stopped, setStopped] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const autoplay = !stopped && !reducedMotion;

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => setStep((s) => (s + 1) % processSteps.length), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [step, autoplay]);

  const select = (index: number) => {
    setStopped(true);
    setStep(index);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const n = processSteps.length;
    const next =
      event.key === 'ArrowRight' ? (step + 1) % n
      : event.key === 'ArrowLeft' ? (step - 1 + n) % n
      : event.key === 'Home' ? 0
      : event.key === 'End' ? n - 1
      : null;
    if (next === null) return;
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  const current = processSteps[step]!;
  const showStopped = stopped || reducedMotion;

  return (
    <section id="process" className="sec-tight" aria-labelledby="process-heading">
      <div className="wrap">
        <Reveal className="sh">
          <div>
            <span className="ey">Process</span>
            <h2 id="process-heading">Clear steps. No surprises.</h2>
          </div>
          <p>Click a step — or watch them play.</p>
        </Reveal>

        <Reveal className="ptabs" role="tablist" aria-label="Our process" onKeyDown={onKeyDown}>
          {processSteps.map((p, i) => (
            <button
              key={p.number}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`process-tab-${i}`}
              aria-selected={i === step}
              aria-controls="process-panel"
              tabIndex={i === step ? 0 : -1}
              className={`pt${i === step ? ' on' : ''}${showStopped ? ' stopped' : ''}`}
              onClick={() => select(i)}
            >
              <span className="tm" aria-hidden="true" />
              <small>{p.number}</small>
              <b>{p.title}</b>
            </button>
          ))}
        </Reveal>

        <Reveal className="ppanel" role="tabpanel" id="process-panel" aria-labelledby={`process-tab-${step}`}>
          <div className="pfade" key={`a${step}`}>
            <h3>{current.title}</h3>
            <p>{current.description}</p>
            <span className="wkb">{current.when}</span>
          </div>
          <ul className="pfade" key={`b${step}`}>
            {current.items.map((item, k) => (
              <li key={item}>
                <span aria-hidden="true">{k + 1}</span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
