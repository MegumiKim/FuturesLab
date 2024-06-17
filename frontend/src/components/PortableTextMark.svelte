<script>
	import { onMount } from 'svelte';
	import { intersect } from '$lib/IntersectionObserver/action.js';
	import { createCirclePath } from '$lib/HandDrawn/index.js';

	export let portableText;
	let isInView = false;

	let width = 0;
	let height = 0;
	$: circle = width && height ? createCirclePath(width, height * 1) : '';
</script>

{#if portableText.plainTextContent.length < 32 && portableText.plainTextContent.split(' ').length < 3}
	<mark
		class="is-circled"
		class:in-view={isInView}
		use:intersect={{
			onIntersect: (inView) => inView && (isInView = true),
			options: {
				rootMargin: `${0}% 0px ${-20}%`
			}
		}}
		bind:offsetWidth={width}
		bind:offsetHeight={height}
		><svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={`-${width / 2} -${height} ${width} ${height * 2}`}
			><path pathLength="100" d={circle} /></svg
		>
		<slot />
	</mark>
{:else}
	<mark><slot /></mark>
{/if}

<style lang="scss">
	mark.is-circled {
		position: relative;
		display: inline-block;
		background-color: transparent;

		> svg {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			width: 140%;
			fill: none;
			visibility: hidden;
			// Line animation
			> path {
				stroke: #0000ff;
				stroke-width: 0.1em;
				stroke-linecap: round;
				stroke-dasharray: 101;
				stroke-dashoffset: 100.5;
				transition: stroke-dashoffset 1s cubic-bezier(0.83, 0, 0.17, 1);
			}
		}

		&.in-view {
			> svg {
				visibility: visible;

				> path {
					stroke-dashoffset: 0;
				}
			}
		}
	}
</style>
