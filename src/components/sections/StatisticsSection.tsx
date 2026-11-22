import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { stats } from '@/data/home';
import { useInView } from '@/hooks/useInView';

/** Stats strip under the hero; counters start when it scrolls into view. */
export function StatisticsSection() {
  const [ref, inView] = useInView<HTMLDListElement>();

  return (
    <dl ref={ref} className={`stats rv${inView ? ' in' : ''}`}>
      {stats.map((s) => (
        <div className="st" key={s.label}>
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <b>
              <span className="sr-only">{`${s.value}${s.suffix}`}</span>
              <span aria-hidden="true">
                <AnimatedCounter to={s.value} start={inView} />
              </span>
              <i aria-hidden="true">{s.suffix}</i>
            </b>
            <span className="lb" aria-hidden="true">
              {s.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
