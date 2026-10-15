import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
const manifest = JSON.parse(readFileSync(new URL('./docs/site-manifest.json', import.meta.url)));
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: Object.fromEntries(manifest.pages.map((url, i) => [String(i), resolve(decodeURIComponent(new URL(url).pathname.slice(1)) || 'index.html')])),
    },
  },
});
