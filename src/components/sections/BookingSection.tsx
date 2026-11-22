import { Reveal } from '@/components/ui/Reveal';
import { bookingPoints } from '@/data/home';
import { BookingWidget } from '@/features/booking/components/BookingWidget';

export function BookingSection() {
  return (
    <section className="dark" id="book" aria-labelledby="book-heading">
      <div className="wrap book">
        <Reveal>
          <span className="ey">Free strategy call</span>
          <h2 id="book-heading">Book a free 30-minute call.</h2>
          <p className="intro">
            Pick a time that suits you. We&apos;ll look at your business and tell you honestly what will help you grow —
            no pressure, no obligation.
          </p>
          <ul className="pts">
            {bookingPoints.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </Reveal>
        <BookingWidget />
      </div>
    </section>
  );
}
