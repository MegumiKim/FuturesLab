<script>
	//Reference: https://github.schibsted.io/futures-lab/2023-intern-project/blob/master/frontend/src/pages/components/Modal.svelte
	import { tick } from 'svelte';
	import { clickOutside } from '$lib/utils/clickOutside';

	const focusableElements =
		'[autofocus],[tabindex]:not([tabindex="-1"]),a,button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),summary,audio,video,iframe,area,[contenteditable],[draggable]';

	const KEYS = {
		TAB: 'Tab',
		ESC: 'Escape',
		ENTER: 'Enter'
	};

	export let isOpen;
	export let isVisible = isOpen;
	export let label = '';
	let root;
	let _previouslyFocusedElement; //storing where the focus was before opening the dialog box

	//https://svelte.dev/repl/c25bdd71c9764f1f809bd35737fbaeb9?version=3.53.1
	$: isOpen, onChange();

	function handleClose() {
		isOpen = false;
	}

	// func to control the focus between the initial element and dialog box
	async function onChange() {
		if (isOpen) {
			_previouslyFocusedElement = document.activeElement || document.body;

			if (!root || root.contains(document.activeElement)) return;

			await tick();

			const focusable = root.querySelector(focusableElements);
			try {
				focusable.focus();
			} catch (error) {
				console.log('failed to focus on an element');
			}
		} else {
			await tick();
			try {
				_previouslyFocusedElement.focus();
			} catch (err) {}
		}
	}

	// keyboard navigation WITHIN the dialog box
	function handleKeyDown(event) {
		// if the dialog box isn't open, do nothing
		if (!isOpen) return;

		const key = event.key;
		const isHandledKey = [KEYS.TAB, KEYS.ESC, KEYS.ENTER].includes(key);
		if (!isHandledKey) return;

		if (key === KEYS.TAB) {
			const focusable = root.querySelectorAll(focusableElements);
			const onEdge = focusable[event.shiftKey ? 0 : focusable.length - 1];

			// move back the focus to the first item
			if (event.target === onEdge) {
				event.preventDefault();
				focusable[event.shiftKey ? focusable.length - 1 : 0].focus();
			}
		}

		if (key == KEYS.ESC) {
			event.preventDefault();
			handleClose();
		}
	}

	function onTransitionEnd(event) {
		if (event.propertyName === 'visibility') {
			isVisible = isOpen;
		}
	}
</script>

<!-- dialog box -->
<div
	class:dialog-open={isOpen}
	class="DialogBox"
	bind:this={root}
	on:keydown={handleKeyDown}
	role="dialog"
	hidden={!isOpen}
	aria-label={label}
	aria-modal="true"
	use:clickOutside={handleClose}
	on:transitionend={onTransitionEnd}
>
	<slot />
</div>

<style lang="scss">
	:global(.DialogBox) {
		visibility: visible;
		opacity: 1;
		transform: translateY(0px);
		transition:
			opacity 0.5s cubic-bezier(0.83, 0, 0.17, 1),
			transform 0.5s cubic-bezier(0.83, 0, 0.17, 1),
			visibility 0.5s;

		&[hidden] {
			display: block;
			visibility: hidden;
			opacity: 0;
			transform: translateY(60px);
			transition:
				opacity 0.5s cubic-bezier(0.83, 0, 0.17, 1),
				transform 0.5s cubic-bezier(0.83, 0, 0.17, 1),
				visibility 0s 0.5s;
		}
	}
</style>
