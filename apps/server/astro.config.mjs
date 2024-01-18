import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import remarkToc from 'remark-toc';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://in-slots.schmooky.dev',
	integrations: [    mdx({
		syntaxHighlight: 'shiki',
		shikiConfig: { theme: 'dracula' },
		remarkPlugins: [remarkToc],
		remarkRehype: { footnoteLabel: 'Footnotes' },
		gfm: false,
	  }),, sitemap()],
});