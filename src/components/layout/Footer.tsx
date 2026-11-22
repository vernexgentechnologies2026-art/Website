import { Link, NavLink } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { Arrow } from '@/components/ui/Arrow';
import { SectionLink } from '@/components/ui/SectionLink';
import { mailHref, site } from '@/config/site';
import { legalNav } from '@/data/navigation';
import { footerServiceGroups, serviceAnchorId } from '@/data/services';

export function Footer() {
  return (
    <footer className="site-footer dark">
      <div className="wrap">
        <div className="fcta">
          <h2>
            Ready to grow your business with <span className="acc">Vernex?</span>
          </h2>
          <SectionLink section="book" className="btn btn-acc">
            Book a free call <Arrow />
          </SectionLink>
        </div>

        <div className="fg">
          <div>
            <Logo />
            <p className="fdesc">{site.tagline}</p>
          </div>
          {footerServiceGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="fh5">{group.title}</h2>
              <ul>
                {group.items.map((service) => (
                  <li key={service.id}>
                    {/* Router navigation (new history entry per click) — ServicesSection
                        reacts to the hash: scrolls to, activates and focuses the card. */}
                    <Link to={{ pathname: '/', hash: `#${serviceAnchorId(service.id)}` }}>{service.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <h2 className="fh5">Contact</h2>
            <ul>
              <li>
                <a href={mailHref}>{site.contact.email}</a>
              </li>
              <li>
                <a href={site.url}>{site.domainLabel}</a>
              </li>
              <li>{site.location}</li>
            </ul>
          </div>
        </div>

        <div className="fb">
          <span>
            © {site.foundedYear} {site.name}
          </span>
          <nav aria-label="Legal">
            <ul className="legal">
              {legalNav.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
