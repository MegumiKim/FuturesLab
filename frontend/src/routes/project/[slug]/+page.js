import { error } from '@sveltejs/kit';
import { getProject } from '$lib/sanity/sanity.js';

export async function load({ params }) {
	const data = await getProject(params.slug);
	if (!data) {
		return error(404, 'Not Found');
	}

	data.pageMeta = {
		title: data.title,
		description: data.seo?.description || data.subtitle,
		image: data.seo?.image || data.image || null,
		focalPoint: data.seo?.focalPoint || data.focalPoint || null
	};

	return data;
}

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;
