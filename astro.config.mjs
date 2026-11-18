// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dominio definitivo del sito: serve per URL canonici, sitemap e anteprime social.
// Si può impostare anche dall'hosting con la variabile d'ambiente SITE_URL.
const SITE = process.env.SITE_URL || 'https://leukoslabs.com';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  image: { responsiveStyles: false },
});
