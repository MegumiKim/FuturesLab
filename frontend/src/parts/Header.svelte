<script>
	import Link from '../components/Link.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let navigation = [];

	let headerVisible = false;

	// Function to check if the current link is active
	const isActive = (link, currentPath) => {
		return currentPath.replace('/', '') === link.slug;
	};

	onMount(() => {
		headerVisible = true;
	});
</script>

<header class="container" class:visible={headerVisible}>
	<a href="/" class="logo">Futures Lab</a>

	<nav>
		{#each navigation as item}
			<Link link={item.internalLink || item.externalLink || ''}
				><div
					class:active={isActive(item.internalLink || item.externalLink || '', $page.url.pathname)}
				>
					{item.label}
				</div></Link
			>
		{/each}
	</nav>
</header>

<style lang="scss">
	@use '$lib/styling/typography' as typography;
	// Nav bar
	header {
		background: inherit;
		display: flex;
		position: sticky;
		top: 0;
		justify-content: space-between;
		z-index: 1000;
		align-items: center;
		padding-top: 1em;
		padding-bottom: 1em;
		transition:
			color 0.3s ease,
			transform 0.5s ease;
		transform: translateY(-100%);
	}

	.visible {
		transform: translateY(0);
	}

	.active {
		border-bottom: 1px solid;
		padding-bottom: 0.2em;
	}

	nav {
		display: flex;
		gap: 2em;
		@include typography.details;
	}

	/* On Scroll animation */
	:global(.is-scrolling-down) header {
		transform: translateY(-100%);
	}
</style>
