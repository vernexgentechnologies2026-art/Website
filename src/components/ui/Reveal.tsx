import type { HTMLAttributes, ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Fade-and-rise on first scroll into view (mockup `.rv` → `.rv.in`). */
export function Reveal({ className, children, ...rest }: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={['rv', inView && 'in', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  );
}
