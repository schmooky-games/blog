import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import remarkToc from "remark-toc";

import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://in-slots.schmooky.dev",
  target: 'server',
  integrations: [
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: { theme: "dracula" },
      remarkPlugins: [remarkToc],
      remarkRehype: { footnoteLabel: "Footnotes" },
      gfm: false,
    }),
    ,
    sitemap(),
    react(),
  ],
  vite: {
    ssr: {
      // Example: Force a broken package to skip SSR processing, if needed
      external: ['@pixi/settings',"@pixi/utils"],
      target: 'webworker'
    }
  }
});
