import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const root = process.cwd();

function activeSorted(items) {
  return items
    .filter((item) => item.active !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function loadMarkdownGlob(glob) {
  return Object.values(glob).map((entry) => entry.frontmatter);
}

export function getSettings() {
  const file = path.join(root, 'src/content/settings.yaml');
  return yaml.load(fs.readFileSync(file, 'utf8'));
}

export function getDesserts() {
  return activeSorted(loadMarkdownGlob(import.meta.glob('../content/desserts/*.md', { eager: true })));
}

export function getMenus() {
  return activeSorted(loadMarkdownGlob(import.meta.glob('../content/menus/*.md', { eager: true })));
}

export function getExtras() {
  return activeSorted(loadMarkdownGlob(import.meta.glob('../content/extras/*.md', { eager: true })));
}

export function getMenusWithDesserts() {
  const dessertsBySlug = new Map(getDesserts().map((dessert) => [dessert.slug, dessert]));

  return getMenus().map((menu) => ({
    ...menu,
    dessertOptions: (menu.desserts ?? [])
      .map((slug) => dessertsBySlug.get(slug))
      .filter(Boolean)
  }));
}
