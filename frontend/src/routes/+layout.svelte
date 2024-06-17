<script>
	import Footer from '../parts/Footer.svelte';
	import Header from '../parts/Header.svelte';
	import { page } from '$app/stores';
	import { currentTheme, setThemeFromRoute } from '$lib/stores/theme.js';
	import { fly } from 'svelte/transition';
	import './styles.scss';
	import MetaTags from '../components/MetaTags.svelte';

	export let data;
	let isScrollingDown = false;
	let lastScrollY = 0;

	// Set theme once on ssr and client
	setThemeFromRoute($page.route.id);

	function onScroll(event) {
		const currentY = Math.max(window.pageYOffset || document.documentElement.scrollTop, 0);
		isScrollingDown = currentY > lastScrollY;
		lastScrollY = currentY;

		document.body.classList.toggle('is-scrolling-down', isScrollingDown);
	}
</script>

<svelte:head>
	{#if $page.data.pageMeta}
		<MetaTags {...$page.data.pageMeta} />
	{/if}
</svelte:head>

<svelte:window on:scroll={onScroll} />

<div data-theme={$currentTheme}>
	<Header navigation={data?.siteSettings.navHeader || []} />
	{#key data.url}
		<main
			in:fly={{ y: -40, duration: 666, delay: 666 }}
			out:fly={{ y: 40, duration: 666 }}
			on:outroend={() => setThemeFromRoute($page.route.id)}
		>
			<slot />
		</main>
	{/key}
	<Footer
		navigation={data?.siteSettings.navFooter || []}
		copyright={data?.siteSettings.copyright || 'Schibsted Futures Lab'}
	/>
</div>

<style lang="scss">
	[data-theme] {
		background-color: #ffffff;
		color: #000000;
		transition:
			background-color 0.3s,
			color 0.3s;
	}

	[data-theme='blue'] {
		background-color: var(--color-blue);
		color: #ffffff;
	}
</style>
