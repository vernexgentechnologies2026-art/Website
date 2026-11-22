import { Arrow } from '@/components/ui/Arrow';
import { Reveal } from '@/components/ui/Reveal';
import { GoalSelector } from './GoalSelector';
import { StatisticsSection } from './StatisticsSection';

export function HeroSection() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <div className="wrap">
        <div className="hg">
          <Reveal>
            <span className="ey">Technology · Automation · Marketing</span>
            <h1 id="hero-heading">
              We build the engine behind{' '}
              <em>
                growing
                <svg viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                  <path d="M2 12 C 80 2, 200 2, 298 10" />
                </svg>
              </em>{' '}
              businesses.
            </h1>
            <p className="lead">
              Vernex builds business software, automation systems, dashboards, websites, branding, content and digital
              marketing — one team, one plan, measurable results.
            </p>
            <div className="ctas">
              <a className="btn btn-acc" href="#book">
                Book a free strategy call <Arrow />
              </a>
              <a className="btn btn-out" href="#services">
                Explore services
              </a>
            </div>
            <div className="avail">
              <i aria-hidden="true" />
              Taking on 3 new projects this month
            </div>
          </Reveal>
          <GoalSelector />
        </div>
        <StatisticsSection />
      </div>
    </section>
  );
}
