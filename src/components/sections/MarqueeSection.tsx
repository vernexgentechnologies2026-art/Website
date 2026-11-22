import { Fragment } from 'react';
import { industries, services } from '@/data/services';

const words = [...services.map((s) => s.name), ...industries];

function Row({ copy }: { copy: number }) {
  return (
    <>
      {words.map((w) => (
        <Fragment key={`${copy}-${w}`}>
          <span>{w}</span>
          <span className="d">✦</span>
        </Fragment>
      ))}
    </>
  );
}

/** Seamless scrolling marquee: two identical rows, translated -50%. */
export function MarqueeSection() {
  return (
    <div className="mq">
      <p className="sr-only">Services: {services.map((s) => s.name).join(', ')}. Industries: {industries.join(', ')}.</p>
      <div className="t" aria-hidden="true">
        <Row copy={0} />
        <Row copy={1} />
      </div>
    </div>
  );
}
