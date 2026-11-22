import { Link } from 'react-router-dom';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

export default function NotFoundPage() {
  useDocumentMeta('notFound');

  return (
    <section className="py-32 text-center max-[980px]:py-24">
      <div className="wrap">
        <span className="ey">404</span>
        <h1 className="mt-5 mb-4 text-[calc(52px*var(--hs))] max-[980px]:text-[calc(36px*var(--hs))]">
          This page doesn&apos;t exist.
        </h1>
        <p className="mx-auto mb-8 max-w-[460px] text-[17px]">The link may be broken or the page may have moved.</p>
        <Link to="/" className="btn btn-acc">
          Back to homepage <span className="ar" aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
