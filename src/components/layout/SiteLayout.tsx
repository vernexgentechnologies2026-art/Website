import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useGlowEffect } from '@/hooks/useGlowEffect';
import { Footer } from './Footer';
import { FloatingWhatsApp, MobileActionBar } from './FloatingActions';
import { Header } from './Header';
import { ScrollManager } from './ScrollManager';

/** Shared chrome for every route: header, footer, floating actions. */
export function SiteLayout() {
  useGlowEffect();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileActionBar />
    </>
  );
}
