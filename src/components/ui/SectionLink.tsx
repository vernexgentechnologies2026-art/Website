import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SectionLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** Homepage section id, e.g. "book" */
  section: string;
  children: ReactNode;
}

/**
 * Link to a homepage section. On the homepage it is a native in-page anchor
 * (smooth CSS scrolling); on other routes it navigates to "/#section" and the
 * ScrollManager scrolls once the homepage has rendered.
 */
export function SectionLink({ section, children, ...rest }: SectionLinkProps) {
  const { pathname } = useLocation();
  if (pathname === '/') {
    return (
      <a href={`#${section}`} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link to={{ pathname: '/', hash: `#${section}` }} {...rest}>
      {children}
    </Link>
  );
}
