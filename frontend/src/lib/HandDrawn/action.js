import { getTotalLength } from './index.js';

export function pathLength(node, { name = 'length' }) {
	console.log(node.getTotalLength());
	const length = getTotalLength(node);
	node.style.setProperty(`--${name}`, length);
	return {
		destroy() {}
	};
}
