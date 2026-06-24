import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  image: {
    responsiveStyles: true
  },
  site: 'https://ridgefoo.github.io',
  base: '/latable',
});
