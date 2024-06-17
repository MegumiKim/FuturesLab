import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
	return {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `$is-dev: ${command === 'serve'};`,
					includePaths: [
						// 'node_modules/normalize-scss/sass',
						'../node_modules/sass-mq'
					]
				}
			}
		},
		plugins: [sveltekit()]
	};
});
