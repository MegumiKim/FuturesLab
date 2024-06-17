import { createClient } from '@sanity/client';
import { projectQuery, projectQueryBySlug } from './queries/project.js';
import { pageQuery, pageQueryBySlug } from './queries/page.js';
import { glossariesQuery } from './queries/glossaries.js';
import { siteSettingsQuery } from './queries/siteSettings.js';

export const client = createClient({
	projectId: 'r9xfdek3',
	dataset: 'production',
	useCdn: true, // `false` if you want to ensure fresh data
	apiVersion: '2022-03-07' // use a UTC date string
});

//
// Site Settings
//
export async function getSiteSettings() {
	return await client.fetch(siteSettingsQuery);
}

//
//Project
//
//fetch a single project by slug
export async function getProject(slug) {
	return await client.fetch(projectQueryBySlug, {
		slug
	});
}

//fetch multiple projects
export async function getProjects() {
	return await client.fetch(projectQuery);
}

//
//Page
//
//fetch a single page by slug
export async function getPage(slug) {
	return await client.fetch(pageQueryBySlug, {
		slug
	});
}

//fetch multiple pages
export async function getPages() {
	return await client.fetch(pageQuery);
}

//
//Glossaries
//
//fetch all glossaries
export async function getGlossaries() {
	return await client.fetch(glossariesQuery);
}
