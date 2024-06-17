import { observe } from './index.js';

/**
 * @param callback - Callback function to trigger when intersection status changes
 * @param options - Intersection Observer options
 */
export function intersect(node, { onIntersect, options = {} }) {
	const unobserve = observe(node, onIntersect, options);

	return {
		destroy() {
			unobserve();
		}
	};
}
