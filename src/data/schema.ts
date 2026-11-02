// JSON-LD builders (schema.org). Base.astro always emits organization() + website();
// pages pass the rest through <Base schema={[...]}>. Honest only: no ratings, offers, prices or address.
import { site, contact, href } from './site';

// Absolute URL with the base path. import.meta.env.SITE is `site` from astro.config.
export const abs = (path: string) => new URL(href(path), import.meta.env.SITE).href;
const ORG_ID = () => `${abs('/')}#organization`;
const WEBSITE_ID = () => `${abs('/')}#website`;
const INDIA = { '@type': 'Country', name: 'India' };

export const organization = () => ({
  '@type': 'Organization',
  '@id': ORG_ID(),
  name: site.name,
  alternateName: site.shortName,
  url: abs('/'),
  logo: abs('/logo-512.png'),
  description: site.description,
  areaServed: INDIA,
  ...(contact.email ? { email: contact.email } : {}),
  ...(contact.phone ? { telephone: contact.phone } : {}),
  ...(contact.linkedin ? { sameAs: [contact.linkedin] } : {}),
});

export const website = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID(),
  url: abs('/'),
  name: site.name,
  inLanguage: 'en-IN',
  publisher: { '@id': ORG_ID() },
});

// Same crumbs array PageHero / Breadcrumbs take. The last crumb (no path) is the current page.
export type Crumb = { label: string; path?: string };
export const breadcrumbList = (crumbs: Crumb[], currentPath: string) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [{ label: 'Home', path: '/' }, ...crumbs].map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.label,
    item: abs(c.path ?? currentPath),
  })),
});

export const serviceLd = (o: { name: string; description: string; path: string; audience?: string }) => ({
  '@type': 'Service',
  name: o.name,
  serviceType: o.name,
  description: o.description,
  url: abs(o.path),
  provider: { '@id': ORG_ID() },
  areaServed: INDIA,
  ...(o.audience ? { audience: { '@type': 'BusinessAudience', name: o.audience } } : {}),
});

export const softwareLd = (o: { name: string; description: string; path: string; category?: 'BusinessApplication' | 'DeveloperApplication' }) => ({
  '@type': 'SoftwareApplication',
  name: o.name,
  description: o.description,
  url: abs(o.path),
  applicationCategory: o.category ?? 'BusinessApplication',
  operatingSystem: 'Web browser',
  publisher: { '@id': ORG_ID() },
});

export const articleLd = (o: { title: string; description: string; path: string; date: Date; updated?: Date; tags?: string[]; image?: string }) => ({
  '@type': 'BlogPosting',
  headline: o.title,
  description: o.description,
  datePublished: o.date.toISOString(),
  dateModified: (o.updated ?? o.date).toISOString(),
  inLanguage: 'en-IN',
  ...(o.tags?.length ? { keywords: o.tags.join(', ') } : {}),
  image: o.image ?? abs('/og/default.png'),
  mainEntityOfPage: abs(o.path),
  author: { '@id': ORG_ID() },
  publisher: { '@id': ORG_ID() },
});

export const collectionLd = (o: { name: string; description: string; path: string }) => ({
  '@type': 'CollectionPage',
  name: o.name,
  description: o.description,
  url: abs(o.path),
  isPartOf: { '@id': WEBSITE_ID() },
});
