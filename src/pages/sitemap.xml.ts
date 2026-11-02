// No-package sitemap. Indexable pages only: /privacy/, /terms/ and 404 are noindex and stay out.
// Add a new top-level page to `pages` by hand.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { services, products, industries } from '../data/site';
import { abs } from '../data/schema';

const pages = ['/', '/about/', '/careers/', '/contact/', '/services/', '/products/', '/industries/', '/insights/'];

export const GET: APIRoute = async () => {
  const posts = await getCollection('insights', ({ data }) => !data.draft);
  const urls: { loc: string; lastmod?: string }[] = [
    ...pages.map((p) => ({ loc: abs(p) })),
    ...services.map((s) => ({ loc: abs(`/services/${s.slug}/`) })),
    ...products.map((p) => ({ loc: abs(`/products/${p.slug}/`) })),
    ...industries.map((i) => ({ loc: abs(`/industries/${i.slug}/`) })),
    ...posts.map((p) => ({ loc: abs(`/insights/${p.id}/`), lastmod: p.data.date.toISOString().slice(0, 10) })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
