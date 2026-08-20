
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  /**
   * GitHub Pages serves this repository from a sub-path, not from a domain root:
   *
   *   https://platical-developments.github.io/habitxp-waitlist/
   *
   * Vite defaults `base` to "/", which emits asset URLs like
   * `/assets/index-abc.js`. Those resolve against the domain root, where nothing
   * exists, so the deployed page is a blank white screen with 404s in the
   * console while working perfectly on localhost. It is the most common way a
   * Vite build fails on Pages, and it fails only after deploy.
   *
   * If a custom domain is ever bought and pointed at this repo, this becomes "/".
   */
  base: '/habitxp-waitlist/',

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: { '@': new URL('./src', import.meta.url).pathname },
  },

  build: {
    /**
     * Emitted into `docs/` rather than `dist/`, because GitHub Pages serves a
     * repository from exactly two places without any CI: the branch root, or
     * `/docs`. Root is already occupied by the old hand-written page, and
     * building over it would mix source and output in one directory.
     *
     * The trade-off is that build output gets committed. For a solo operator
     * pushing through GitHub Desktop that is the right call: what you push is
     * exactly what goes live, with no build server in between to debug at the
     * moment traffic starts arriving.
     */
    outDir: '../docs',
    emptyOutDir: true,
    // Every visitor is on a phone over mobile data. Inlining anything under 4KB
    // saves a round trip that costs more than the bytes do.
    assetsInlineLimit: 4096,
  },
});
