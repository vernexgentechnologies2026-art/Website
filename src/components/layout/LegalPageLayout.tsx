import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { site } from '@/config/site';
import { legalNav } from '@/data/navigation';

interface LegalPageLayoutProps {
  title: string;
  /** Short line under the title */
  summary: string;
  children: ReactNode;
}

/**
 * Shared shell for policy pages. Content is PLACEHOLDER until the final,
 * legally reviewed documents are supplied — the banner says so on the page.
 */
export function LegalPageLayout({ title, summary, children }: LegalPageLayoutProps) {
  return (
    <section className="pt-14 pb-24 max-[980px]:pt-10 max-[980px]:pb-20">
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm font-semibold text-muted">
          <Link to="/" className="transition-colors hover:text-gold-deep">
            ← Back to home
          </Link>
        </nav>

        <div className="grid grid-cols-[minmax(0,1fr)_260px] gap-16 max-[980px]:grid-cols-1 max-[980px]:gap-10">
          <article className="min-w-0">
            <span className="ey">Legal</span>
            <h1 className="mt-5 mb-4 text-[calc(52px*var(--hs))] max-[980px]:text-[calc(36px*var(--hs))]">{title}</h1>
            <p className="max-w-[620px] text-[17px]">{summary}</p>

            <div
              role="note"
              className="mt-8 rounded-brand border border-gold/40 bg-gold/10 px-5 py-4 text-[15px] text-head"
            >
              <strong className="font-bold">Draft — placeholder content.</strong> This page is a temporary placeholder and
              has not been legally reviewed. It will be replaced with the final, approved policy of {site.name}. Nothing
              on this page should be relied on as a legal commitment.
            </div>

            <div className="legal-doc mt-4 max-w-[760px]">{children}</div>
          </article>

          <aside className="self-start rounded-[calc(var(--r)+8px)] border border-line bg-surface p-6 min-[981px]:sticky min-[981px]:top-[100px]">
            <p className="mb-3 font-body text-xs font-bold tracking-[.16em] uppercase text-muted">Policies</p>
            <ul className="space-y-1">
              {legalNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className="block rounded-lg px-3 py-2 text-[15px] font-semibold text-head transition-colors hover:bg-surface2 hover:text-gold-deep aria-[current=page]:bg-surface2 aria-[current=page]:text-gold-deep"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Link to="/" className="btn btn-out mt-5 w-full">
              Return to homepage
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
