import { defineCollection, z } from 'astro:content';

const menus = defineCollection({
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    price: z.number(),
    active: z.boolean(),
    featured: z.boolean(),
    order: z.number(),
    summary: z.string(),
    mains: z.array(z.object({
      title: z.string(),
      description: z.string()
    })),
    desserts: z.array(z.string())
  })
});

const desserts = defineCollection({
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    active: z.boolean(),
    order: z.number(),
    description: z.string(),
    supplement: z.number().optional()
  })
});

const extras = defineCollection({
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    active: z.boolean(),
    featured: z.boolean(),
    order: z.number(),
    summary: z.string()
  })
});

export const collections = { menus, desserts, extras };
