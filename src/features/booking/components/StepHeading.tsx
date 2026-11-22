import { useEffect, useRef, type ReactNode } from 'react';

interface StepHeadingProps {
  /** Focus on mount — true once the visitor has moved between steps. */
  autoFocus: boolean;
  children: ReactNode;
}

/**
 * Heading of the current booking step. When the step changes it takes focus,
 * so keyboard and screen-reader users land on the new content. Works for
 * lazily loaded steps too, since it runs when the heading actually mounts.
 */
export function StepHeading({ autoFocus, children }: StepHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (autoFocus) ref.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  return (
    <h3 ref={ref} id="booking-step-title" tabIndex={-1}>
      {children}
    </h3>
  );
}
