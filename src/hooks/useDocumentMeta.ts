import { useEffect } from 'react';
import { absoluteUrl, pageMeta, type PageKey } from '@/config/seo';

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/**
 * Keeps <title>, description, canonical, robots and social tags in sync on
 * client-side navigation. The build also bakes these into each route's static
 * HTML (see build/static-routes.ts), so crawlers get them without JS.
 */
export function useDocumentMeta(key: PageKey): void {
  useEffect(() => {
    const meta = pageMeta[key];
    const url = absoluteUrl(meta.path);
    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[name="robots"]', 'content', meta.indexable ? 'index, follow' : 'noindex, follow');
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[name="twitter:title"]', 'content', meta.title);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);
  }, [key]);
}
