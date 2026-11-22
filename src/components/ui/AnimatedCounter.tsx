import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface AnimatedCounterProps {
  to: number;
  /** Start counting when true (e.g. once the stats strip is in view). */
  start: boolean;
  durationMs?: number;
}

/** Counts 0 → `to` with an ease-out-cubic curve, as in the mockup. */
export function AnimatedCounter({ to, start, durationMs = 1500 }: AnimatedCounterProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start || reducedMotion) return;
    let frame = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / durationMs, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, to, durationMs, reducedMotion]);

  return <>{reducedMotion && start ? to : value}</>;
}
