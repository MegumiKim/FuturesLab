import { getSiteSettings } from '$lib/sanity/sanity.js';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ url }) {
	const siteSettings = await getSiteSettings();

	if (!siteSettings) {
		return { status: 404 };
	}

	return {
		siteSettings,
		url: url.pathname
	};
}
