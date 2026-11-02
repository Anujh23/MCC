// robots.txt with an absolute, base-aware sitemap URL. No Disallow: noindex pages must stay
// crawlable so search engines can see their noindex. (On a *.github.io/repo project site this file
// sits below the host root and is ignored; it only takes effect on a custom domain.)
import type { APIRoute } from 'astro';
import { abs } from '../data/schema';

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
