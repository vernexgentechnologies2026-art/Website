import { Link } from 'react-router-dom';
import logoUrl from '@/assets/logo/vernex-logo.webp';
import { site } from '@/config/site';

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

/** Official Vernex logo on its white plate (as in the approved header/footer). */
export function Logo({ className = '', onClick }: LogoProps) {
  return (
    <Link to="/" className={`logo ${className}`.trim()} aria-label={`${site.name} — home`} onClick={onClick}>
      <span>
        <img src={logoUrl} alt={site.name} width={124} height={44} decoding="async" />
      </span>
    </Link>
  );
}
