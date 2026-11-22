import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import HomePage from '@/pages/HomePage';
import { pageMeta } from '@/config/seo';

// Secondary routes are code-split; the homepage ships in the main bundle.
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage'));
const TermsAndConditionsPage = lazy(() => import('@/pages/TermsAndConditionsPage'));
const CookiesPolicyPage = lazy(() => import('@/pages/CookiesPolicyPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: pageMeta.home.path, element: <HomePage /> },
      { path: pageMeta.privacy.path, element: <PrivacyPolicyPage /> },
      { path: pageMeta.terms.path, element: <TermsAndConditionsPage /> },
      { path: pageMeta.cookies.path, element: <CookiesPolicyPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
