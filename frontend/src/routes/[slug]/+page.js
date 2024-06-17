import { error } from '@sveltejs/kit';
import { getPage } from '$lib/sanity/sanity.js';

export async function load({ params, parent }) {
	const data = await getPage(params.slug);

	if (!data) {
		return error(404, 'Page Not Found');
	}

	const layoutData = await parent();

	data.pageMeta = {
		title: data.contentTitle || data.title,
		description: data.seo?.description || layoutData?.siteSettings?.seo?.description || '',
		image: data.seo?.image || layoutData?.siteSettings?.seo?.image || '',
		focalPoint: data.seo?.focalPoint || layoutData?.siteSettings?.seo?.focalPoint || ''
	};

	return data;
}

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;
