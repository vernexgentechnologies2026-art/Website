import { useEffect, useRef, useState } from 'react';
import { Arrow } from '@/components/ui/Arrow';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLink } from '@/components/ui/SectionLink';
import { goals } from '@/data/home';

const FADE_MS = 200;

/** Hero "Quick plan" card: pick a goal → recommended services, target, timeline. */
export function GoalSelector() {
  const [selected, setSelected] = useState(0);
  const [shown, setShown] = useState(0);
  const [fading, setFading] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const choose = (index: number) => {
    if (index === selected) return;
    setSelected(index);
    setFading(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setShown(index);
      setFading(false);
    }, FADE_MS);
  };

  const goal = goals[shown]!;

  return (
    <Reveal className="goal glow">
      <span className="ey">Quick plan</span>
      <h2 id="goal-heading">What do you want to achieve?</h2>
      <div className="gopts" role="group" aria-labelledby="goal-heading">
        {goals.map((g, i) => (
          <button
            key={g.label}
            type="button"
            className={`gopt${i === selected ? ' on' : ''}`}
            aria-pressed={i === selected}
            onClick={() => choose(i)}
          >
            <span aria-hidden="true">{g.icon}</span>
            {g.label}
          </button>
        ))}
      </div>
      <div className={`gres${fading ? ' fade' : ''}`} aria-live="polite">
        <small>Recommended for you</small>
        <ul className="gchips">
          {goal.services.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="gout">
          <div>
            <small>Target</small>
            <strong>{goal.target}</strong>
          </div>
          <div>
            <small>Timeline</small>
            <strong>{goal.timeline}</strong>
          </div>
        </div>
        <SectionLink section="book" className="btn btn-acc">
          Get this plan — free call <Arrow />
        </SectionLink>
      </div>
    </Reveal>
  );
}
