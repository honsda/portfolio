import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://honsda.github.io',
  base: '/portfolio',
  integrations: [svelte(), tailwind()],
  output: 'static',
});
