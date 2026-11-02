// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// SITE_URL / BASE_PATH are injected by the GitHub Pages workflow (.github/workflows/deploy.yml).
// Locally they fall back to the dev server. With a custom domain BASE_PATH is empty.
if (process.env.CI && !process.env.SITE_URL) {
  throw new Error('SITE_URL is not set: canonical, og:url and the sitemap would point at localhost.');
}

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  base: process.env.BASE_PATH || '/',
  // Matches href() in src/data/site.ts, so a hand-written link without the slash 404s in dev.
  trailingSlash: 'always',
  // Self-hosted at build time (no Google Fonts request). latin-ext carries ₹ (U+20B9).
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Plus Jakarta Sans',
      cssVariable: '--font-jakarta',
      weights: [400, 500, 600, 700, 800],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
