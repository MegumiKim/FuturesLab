/** Dispatch event on click outside of node */
export function clickOutside(
	node,
	onClick = (event) => {
		event.preventDefault();
	}
) {
	const handleClick = (event) => {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			onClick instanceof Function && onClick(event);
			// node.dispatchEvent(new CustomEvent('click_outside', node));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}

//src https://svelte.dev/repl/0ace7a508bd843b798ae599940a91783?version=3.16.7
// use enhance https://kit.svelte.dev/docs/form-actions
