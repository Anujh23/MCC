// Content collections. Insights articles live in src/content/insights/*.md
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    // Minutes. Optional: computed from word count when missing.
    readingTime: z.number().optional(),
    // Pin one post as the featured card on /insights (newest wins if none set).
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    // Product slug from site.ts: pre-fills the contact form from the post CTA.
    product: z.string().optional(),
    // Money pages this post supports, rendered as related cards. Site paths, e.g. /products/crm/.
    related: z.array(z.object({ label: z.string(), path: z.string() })).default([]),
  }),
});

export const collections = { insights };
