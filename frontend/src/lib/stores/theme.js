import { writable, readonly } from 'svelte/store';

const theme = writable('default');
export const setThemeDefault = () => theme.set('default');
export const setThemeBlue = () => theme.set('blue');
export const currentTheme = readonly(theme);

export function setThemeFromRoute(id) {
	switch (id) {
		case '/glossary':
		case '/something-else':
			setThemeBlue();
			break;
		default:
			setThemeDefault();
	}
}
