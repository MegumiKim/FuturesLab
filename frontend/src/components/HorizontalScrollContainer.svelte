<script>
	import { onMount } from 'svelte';

	export let disabled = false;
	export let dragEasing = 0.5;
	export let friction = 0.03;
	export let dragEasingConstraint = 0.2;
	export let frictionConstraint = 0.9;

	let contentWidth = 0;
	let viewportWidth = 0;
	let velocity = 0;
	let translateX = 0;
	let clientXStart = 0;
	let clientX = 0;
	let element = null;
	let isDragging = false;
	let isAnimating = false;

	$: isDisabled = disabled || contentWidth <= viewportWidth;

	function onPointerDown(event) {
		if (isDisabled) {
			return;
		}

		element.setPointerCapture(event.pointerId);
		element.addEventListener('pointermove', onPointerMove);
		event.preventDefault();
		isDragging = true;
		isAnimating = true;
		clientXStart = event.clientX - translateX;
		clientX = event.clientX;
	}

	function onPointerUp(event) {
		isDragging = false;
		element.releasePointerCapture(event.pointerId);
		element.removeEventListener('pointermove', onPointerMove);
	}

	function onPointerMove(event) {
		if (isDisabled) {
			return;
		}

		event.preventDefault();
		clientX = event.clientX;
	}

	function onUpdate(timestamp) {
		if (!isAnimating) {
			return;
		}

		if (isDragging) {
			const previousOffsetX = translateX;
			translateX += (clientX - clientXStart - translateX) * dragEasing;
			velocity = translateX - previousOffsetX;
		} else {
			velocity *= 1 - friction;

			translateX += velocity;

			if (Math.abs(velocity) < 0.01) {
				velocity = 0;
				isAnimating = false;
			}
		}

		// Check constraints
		if (0 < translateX) {
			velocity *= frictionConstraint;
			translateX -= translateX * dragEasingConstraint;
		} else if (translateX < -(contentWidth - element.offsetWidth)) {
			velocity *= frictionConstraint;
			translateX -= (contentWidth - element.offsetWidth + translateX) * dragEasingConstraint;
		}
	}

	onMount(() => {
		let rid = requestAnimationFrame(update);

		function update(timestamp) {
			rid = requestAnimationFrame(update);
			onUpdate(timestamp);
		}

		return () => {
			cancelAnimationFrame(rid);
			element.removeEventListener('pointermove', onPointerMove);
		};
	});
</script>

<section
	bind:this={element}
	bind:offsetWidth={viewportWidth}
	on:pointerdown={onPointerDown}
	on:pointerup={onPointerUp}
	on:pointercancel={onPointerUp}
	class:is-grabbing={isDragging}
	class:is-disabled={isDisabled}
>
	<div
		bind:offsetWidth={contentWidth}
		style:transform="translateX({isDisabled ? 0 : translateX}px)"
		class:is-animating={isAnimating}
	>
		<slot />
	</div>
</section>

<style lang="scss">
	section {
		position: relative;
		display: block;
		overflow-x: hidden;
		touch-action: pan-y;

		&:hover {
			cursor: grab;
		}

		&.is-grabbing {
			cursor: grabbing;
		}

		&.is-disabled {
			cursor: default;
		}
	}

	div {
		width: min-content;
		min-width: 100%;

		&.is-animating {
			will-change: transform;
		}
	}
</style>
