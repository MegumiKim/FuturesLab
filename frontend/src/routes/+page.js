import { getProjects } from '$lib/sanity/sanity.js';

export async function load({ parent }) {
	const projectData = await getProjects();

	if (!projectData) {
		return { status: 404 };
	}

	const layoutData = await parent();

	return {
		projectData,
		pageMeta: {
			title: layoutData?.siteSettings?.elevatorPitch || 'Home',
			description: layoutData?.siteSettings?.seo?.description || '',
			image: layoutData?.siteSettings?.seo?.image || '',
			focalPoint: layoutData?.siteSettings?.seo?.focalPoint || ''
		}
	};
}

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = true;
