import { getGlossaries } from '$lib/sanity/sanity.js';
import { getPage } from '$lib/sanity/sanity.js';
import { error } from '@sveltejs/kit';

export async function load({ parent }) {
	const data = await getPage(`glossary`);

	if (!data) {
		return error(404, 'Page Not Found');
	}

	const glossaries = await getGlossaries();
	const layoutData = await parent();

	if (!glossaries) {
		return { status: 404 };
	}

	data.glossaries = glossaries;
	data.pageMeta = {
		title: data.contentTitle || data.title,
		description: data.seo?.description || layoutData?.siteSettings?.seo?.description || '',
		image: data.seo?.image || layoutData?.siteSettings?.seo?.image || '',
		focalPoint: data.seo?.focalPoint || layoutData?.siteSettings?.seo?.focalPoint || ''
	};

	return data;
}
