import { useCallback, useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { Arrow } from '@/components/ui/Arrow';
import { SectionLink } from '@/components/ui/SectionLink';
import { telHref } from '@/config/site';
import { mainNav } from '@/data/navigation';
import { useScrollState } from '@/hooks/useScrollState';
import { MobileNavigation } from './MobileNavigation';

const SECTION_IDS = mainNav.map((item) => item.sectionId);
const NO_SECTIONS: string[] = [];

export function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const progressRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrolled, activeId } = useScrollState({ progressRef, sectionIds: isHome ? SECTION_IDS : NO_SECTIONS });

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    burgerRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <div className="prog" ref={progressRef} aria-hidden="true" />

      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap hb">
          <Logo />
          <nav className="main" aria-label="Main">
            {mainNav.map((item) => (
              <SectionLink
                key={item.sectionId}
                section={item.sectionId}
                className={activeId === item.sectionId ? 'on' : undefined}
                aria-current={activeId === item.sectionId ? 'location' : undefined}
              >
                {item.label}
              </SectionLink>
            ))}
          </nav>
          <div className="hr">
            <a className="btn btn-out" href={telHref}>
              Call us
            </a>
            <SectionLink section="book" className="btn btn-acc">
              Book a free call <Arrow />
            </SectionLink>
            <button
              ref={burgerRef}
              type="button"
              className="burger"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={20} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileNavigation open={menuOpen} onClose={closeMenu} />
    </>
  );
}
