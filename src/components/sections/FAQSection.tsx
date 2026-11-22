import { useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { faqs } from '@/data/home';

/** Single-open accordion; the first answer starts open (as in the mockup). */
export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-heading">
      <div className="wrap faqg">
        <Reveal>
          <span className="ey">FAQ</span>
          <h2 id="faq-heading">Good questions.</h2>
          <p className="intro">Still unsure? Talk to us directly.</p>
          <a className="btn btn-out" href="#book">
            Ask on a free call
          </a>
        </Reveal>
        <Reveal>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.question} className={`qa${isOpen ? ' open' : ''}`}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {f.question}
                    <i aria-hidden="true">+</i>
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="an" inert={!isOpen}>
                  <div>
                    <p>{f.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
