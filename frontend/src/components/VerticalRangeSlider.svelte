<script>
	import { onMount } from 'svelte';

	let progress = 0;
	let range = 0;
	let translateY = 0;
	let isDragging = false;
	let isAnimating = false;
	let clientYStart = 0;
	let clientY = 0;

	function onPointerDown(event) {
		window.setPointerCapture(event.pointerId);
		window.addEventListener('pointermove', onPointerMove);
		event.preventDefault();
		isDragging = true;
		isAnimating = true;
		clientYStart = event.clientY - translateY;
		clientY = event.clientY;
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

<div bind:offsetHeight={range}>
	<button on:pointerdown={onPointerDown} on:pointerup={onPointerUp} on:pointercancel={onPointerUp}
		>Scroll</button
	>
</div>

<style lang="scss">
	div {
		position: relative;
		float: right;
		height: 100%;
		width: 5px;
		background-color: green;
	}
</style>
