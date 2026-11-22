import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { Plugin } from 'vite';
import { absoluteUrl, pageMeta, type PageMeta } from '../src/config/seo.ts';

/**
 * After the client build, writes:
 *  - dist/<route>/index.html for every non-home route, with that route's
 *    <title>, description, canonical and social tags baked in. Direct URL
 *    visits work on any static host and crawlers see correct metadata
 *    without executing JavaScript.
 *  - dist/404.html (noindex) as the SPA fallback for unknown URLs.
 *  - dist/sitemap.xml generated from the same metadata.
 */
const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function applyMeta(html: string, meta: PageMeta): string {
  const url = absoluteUrl(meta.path);
  const title = escapeAttr(meta.title);
  const description = escapeAttr(meta.description);
  const replacements: Array<[RegExp, string]> = [
    [/<title>[^<]*<\/title>/, `<title>${title}</title>`],
    [/(<meta name="description" content=")[^"]*(")/, `$1${description}$2`],
    [/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`],
    [/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`],
    [/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`],
    [/(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`],
    [/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`],
    [/(<meta name="twitter:description" content=")[^"]*(")/, `$1${description}$2`],
    [/(<meta name="robots" content=")[^"]*(")/, `$1${meta.indexable ? 'index, follow' : 'noindex, follow'}$2`],
  ];
  return replacements.reduce((out, [pattern, value]) => {
    if (!pattern.test(out)) throw new Error(`[static-routes] index.html is missing a tag matching ${pattern}`);
    return out.replace(pattern, value);
  }, html);
}

function sitemap(pages: PageMeta[]): string {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = pages
    .filter((p) => p.indexable)
    .map(
      (p) =>
        `  <url>\n    <loc>${absoluteUrl(p.path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n` +
        (p.changefreq ? `    <changefreq>${p.changefreq}</changefreq>\n` : '') +
        (p.priority !== undefined ? `    <priority>${p.priority.toFixed(1)}</priority>\n` : '') +
        '  </url>',
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function staticRoutes(): Plugin {
  let outDir = 'dist';
  return {
    name: 'vernex-static-routes',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      const template = await readFile(path.join(outDir, 'index.html'), 'utf8');
      const pages: PageMeta[] = Object.values(pageMeta);

      for (const meta of pages) {
        if (meta.path === '/') continue;
        const html = applyMeta(template, meta);
        if (meta === pageMeta.notFound) {
          // An error page has no canonical URL.
          await writeFile(path.join(outDir, '404.html'), html.replace(/\s*<link rel="canonical"[^>]*>/, ''));
          continue;
        }
        const dir = path.join(outDir, meta.path.replace(/^\//, ''));
        await mkdir(dir, { recursive: true });
        await writeFile(path.join(dir, 'index.html'), html);
      }

      await writeFile(path.join(outDir, 'sitemap.xml'), sitemap(pages));
    },
  };
}
