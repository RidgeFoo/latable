import fs from 'node:fs';
import path from 'node:path';
import type { CollectionEntry } from 'astro:content';
import { z } from 'astro/zod';
import yaml from 'js-yaml';

export type Menu = CollectionEntry<'menus'>['data'];
export type Dessert = CollectionEntry<'desserts'>['data'];
export type Extra = CollectionEntry<'extras'>['data'];
export type MenuWithDesserts = Menu & { dessertOptions: Dessert[] };

const settingsSchema = z.object({
  business: z.object({
    name: z.string(),
    tagline: z.string(),
    area: z.string()
  }),
  contact: z.object({
    email: z.string(),
    phone: z.string()
  }),
  pricing: z.object({
    minimumOrder: z.number(),
    menuPriceLabel: z.string()
  }),
  notices: z.object({
    delivery: z.string(),
    allergies: z.string()
  })
});

export type Settings = z.infer<typeof settingsSchema>;

type Sortable = {
  active?: boolean;
  order?: number;
};

type MarkdownModule<T> = {
  frontmatter: T;
};

const root = process.cwd();

function activeSorted<T extends Sortable>(items: T[]): T[] {
  return items
    .filter((item) => item.active !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function loadMarkdownGlob<T>(glob: Record<string, MarkdownModule<T>>): T[] {
  return Object.values(glob).map((entry) => entry.frontmatter);
}

export function getSettings(): Settings {
  const file = path.join(root, 'src/content/settings.yaml');
  return settingsSchema.parse(yaml.load(fs.readFileSync(file, 'utf8')));
}

export function getDesserts(): Dessert[] {
  const modules = import.meta.glob<MarkdownModule<Dessert>>('../content/desserts/*.md', { eager: true });
  return activeSorted(loadMarkdownGlob(modules));
}

export function getMenus(): Menu[] {
  const modules = import.meta.glob<MarkdownModule<Menu>>('../content/menus/*.md', { eager: true });
  return activeSorted(loadMarkdownGlob(modules));
}

export function getExtras(): Extra[] {
  const modules = import.meta.glob<MarkdownModule<Extra>>('../content/extras/*.md', { eager: true });
  return activeSorted(loadMarkdownGlob(modules));
}

export function getMenusWithDesserts(): MenuWithDesserts[] {
  const dessertsBySlug = new Map<string, Dessert>();

  for (const dessert of getDesserts()) {
    if (dessert.slug) {
      dessertsBySlug.set(dessert.slug, dessert);
    }
  }

  return getMenus().map((menu) => ({
    ...menu,
    dessertOptions: (menu.desserts ?? [])
      .map((slug) => dessertsBySlug.get(slug))
      .filter((dessert): dessert is Dessert => dessert !== undefined)
  }));
}
