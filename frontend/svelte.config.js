import adapter from 'svelte-kit-sst';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// https://docs.sst.dev/constructs/SvelteKitSite
		adapter: adapter(),
		alias: {
			$styles: 'src/routes/styles',
			$sst: 'sst'
		}
	},
	preprocess: vitePreprocess(),
	exclude: [
		'**/node_modules/**',
		'**/sanity/**',
		'**/dist/**',
		'**/build/**',
		'**/.svelte-kit/**',
		'**/.svelte/**'
	]
};

export default config;
