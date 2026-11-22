import { useState, type CSSProperties } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { results } from '@/data/home';

/**
 * Results cards. Details reveal on hover (desktop), keyboard focus, or tap
 * (touch devices, where hover is not available).
 */
export function ResultsSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="dark" id="work" aria-labelledby="work-heading">
      <div className="wrap">
        <Reveal className="sh">
          <div>
            <span className="ey">Results</span>
            <h2 id="work-heading">Work that moves the numbers.</h2>
          </div>
          <p>Hover a project to see what we did. (Sample projects — replace with real case studies.)</p>
        </Reveal>
        <Reveal className="work">
          {results.map((r, i) => (
            <article key={r.industry} className={`wk glow${open === i ? ' open' : ''}`}>
              <button
                type="button"
                className="wk-toggle"
                aria-expanded={open === i}
                aria-controls={`wk-det-${i}`}
                aria-label={`${r.industry}: ${r.metric}${r.metricSuffix} ${r.headline} — show details`}
                onClick={() => setOpen((cur) => (cur === i ? null : i))}
              />
              <div className="tg">
                <span>{r.industry}</span>
                <em>{r.services}</em>
              </div>
              <div>
                <div className="m">
                  {r.metric}
                  <i>{r.metricSuffix}</i>
                </div>
                <h3>{r.headline}</h3>
                <div className="det" id={`wk-det-${i}`}>
                  {r.detail}
                </div>
                <div className="bar" aria-hidden="true">
                  <i style={{ '--w': `${r.bar}%` } as CSSProperties} />
                </div>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
