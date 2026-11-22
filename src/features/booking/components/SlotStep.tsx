import { site } from '@/config/site';
import { isSlotAvailable } from '../availability';
import type { BookingController } from '../hooks/useBooking';
import { StepHeading } from './StepHeading';

type Props = Pick<BookingController, 'days' | 'slots' | 'dayIndex' | 'slotIndex' | 'selectDay' | 'selectSlot'> & {
  focusHeading: boolean;
};

export function SlotStep({ days, slots, dayIndex, slotIndex, selectDay, selectSlot, focusHeading }: Props) {
  return (
    <div className="cs">
      <StepHeading autoFocus={focusHeading}>Choose a day &amp; time</StepHeading>
      <div className="sub">All times in {site.timezoneLabel} · 30 minutes · Google Meet or phone</div>

      <div className="days" role="radiogroup" aria-label="Day">
        {days.map((d, i) => (
          <button
            key={d.iso}
            type="button"
            role="radio"
            aria-checked={i === dayIndex}
            aria-label={`${d.weekday} ${d.day} ${d.month}`}
            className={`day${i === dayIndex ? ' on' : ''}`}
            onClick={() => selectDay(i)}
          >
            <small aria-hidden="true">{d.weekday}</small>
            <b aria-hidden="true">{d.day}</b>
            <small aria-hidden="true">{d.month}</small>
          </button>
        ))}
      </div>

      <div className="lab" id="slot-label">
        Available times
      </div>
      <div className="times" role="radiogroup" aria-labelledby="slot-label">
        {slots.map((s, i) => {
          const available = dayIndex !== null && isSlotAvailable(dayIndex, i);
          return (
            <button
              key={s.value}
              type="button"
              role="radio"
              aria-checked={i === slotIndex}
              aria-label={available ? s.label : `${s.label} (unavailable)`}
              disabled={!available}
              className={`tm2${!available ? ' off' : ''}${i === slotIndex ? ' on' : ''}`}
              onClick={() => selectSlot(i)}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
