import { expect, test } from '@playwright/test';

const routes = ['/', '/menus', '/extras', '/about', '/contact'];

test.describe('static pages', () => {
  for (const route of routes) {
    test(`${route} renders without console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (message) => {
        if (message.type() === 'error') {
          errors.push(message.text());
        }
      });

      await page.goto(route);
      await expect(page.locator('body')).toBeVisible();
      await expect(page.getByRole('link', { name: "La Table d'Amy home" })).toBeVisible();
      await expect(page.locator('img:not([src^="/_astro/"])')).toHaveCount(0);
      await expect(page.locator('img:not([width]), img:not([height]), img:not([alt])')).toHaveCount(0);
      expect(errors).toEqual([]);
    });
  }
});

test('homepage serves responsive Astro image assets', async ({ page }) => {
  await page.goto('/');

  const heroImage = page.locator('.hero-image');
  await expect(heroImage).toHaveAttribute('srcset', /\/_astro\//);
  await expect(heroImage).toHaveAttribute('loading', 'eager');
  await expect(heroImage).toHaveAttribute('decoding', 'sync');
  await expect(heroImage).toHaveAttribute('fetchpriority', 'high');
});

test('homepage shows the full visitor journey', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Home-cooked meals delivered to your gîte in the Gers' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'About Amy' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Our Menus' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'How It Works' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Enquire' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'View Full Menus' })).toBeVisible();
});

test('menus page resolves shared dessert references', async ({ page }) => {
  await page.goto('/menus');

  const signatureMenu = page.locator('.menu-card').filter({
    has: page.getByRole('heading', { name: 'Signature Menu' })
  });

  await expect(page.getByText('Minimum order: €200')).toBeVisible();
  await expect(signatureMenu).toBeVisible();
  await expect(signatureMenu.getByText('Pavlova Crown')).toBeVisible();
  await expect(signatureMenu.getByText('Fresh whipped cream and seasonal fruits (+€2)')).toBeVisible();
  await expect(signatureMenu.getByText('Burnt Basque Cheesecake')).toBeVisible();
});

test('mobile layout keeps primary navigation and enquiry form usable', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile-only responsive check');

  await page.goto('/');
  await expect(page.getByLabel('Main navigation').getByRole('link', { name: 'Menus' })).toBeVisible();
  await expect(page.getByLabel('Your name')).toBeVisible();
  await expect(page.getByLabel('Email address')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Send Enquiry' })).toBeVisible();
});
