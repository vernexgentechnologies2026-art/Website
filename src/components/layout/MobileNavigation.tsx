import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { SectionLink } from '@/components/ui/SectionLink';
import { mainNav } from '@/data/navigation';

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
}

/** Full-screen slide-down menu (≤980px). */
export function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-nav"
      className={`mnav${open ? ' open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
    >
      <button ref={closeRef} type="button" className="x" aria-label="Close menu" onClick={onClose}>
        <X size={22} strokeWidth={2} aria-hidden="true" />
      </button>
      {mainNav.map((item) => (
        <SectionLink key={item.sectionId} section={item.sectionId} onClick={onClose}>
          {item.label}
        </SectionLink>
      ))}
      <SectionLink section="book" className="acc" onClick={onClose}>
        Book a free call →
      </SectionLink>
    </div>
  );
}
