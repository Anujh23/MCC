# Manka Commerce & Consultancy: Website

Company website built with Astro + Tailwind CSS 4, deployed to GitHub Pages.

## Run locally

Needs Node 22.23+.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Where things live

| What | File |
|---|---|
| Company details, nav, services/products lists | `src/data/site.ts` |
| Brand colours, fonts, button styles | `src/styles/global.css` |
| Logo | `src/components/Logo.astro`, `public/favicon.svg` |
| Header / footer | `src/components/` |
| Page shell + SEO tags | `src/layouts/Base.astro` |
| Brand guidelines page | `/brand` (not in nav, noindex) |

## Deploy

Every push to `main` builds and deploys via `.github/workflows/deploy.yml`.
One-time setup: repo **Settings → Pages → Source: GitHub Actions**.
