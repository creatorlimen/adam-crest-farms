import { defineConfig } from 'astro/config';
import { siteUrl } from './src/lib/site.mjs';

export default defineConfig({
  site: siteUrl,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  server: { host: '127.0.0.1', port: 4173 },
  devToolbar: { enabled: false },
  compressHTML: false,
});
