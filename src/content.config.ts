import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
  const parsed = new Date(value + 'T00:00:00Z');
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}, 'Use a real calendar date in YYYY-MM-DD format');

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(10).max(100),
    seoTitle: z.string().min(10).max(70),
    description: z.string().min(60).max(180),
    category: z.enum(['ostriches', 'sheep', 'goats', 'crops', 'farm-life']),
    status: z.enum(['draft', 'published']).default('draft'),
    author: z.literal('Adam Crest Farms'),
    researchedAt: date,
    publishedAt: date.optional(),
    updatedAt: date.optional(),
    image: z.string().regex(/^\/assets\/[a-zA-Z0-9/_-]+\.(png|jpe?g|webp)$/),
    imageAlt: z.string().min(10),
    imageWidth: z.number().int().positive(),
    imageHeight: z.number().int().positive(),
    imageCaption: z.string().min(5),
    sources: z.array(z.object({ title: z.string().min(5), url: z.url().refine(url => url.startsWith('https://')), accessed: date })).min(1),
  }).superRefine((post, ctx) => {
    if (post.status === 'published' && !post.publishedAt) ctx.addIssue({ code: 'custom', message: 'Published articles need a genuine publishedAt date.' });
    if (post.updatedAt && (!post.publishedAt || post.updatedAt < post.publishedAt)) ctx.addIssue({ code: 'custom', message: 'updatedAt requires publishedAt and cannot precede it.' });
  }),
});
export const collections = { blog };
