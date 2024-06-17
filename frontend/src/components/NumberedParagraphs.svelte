<script>
	import RichText from './RichText.svelte';
	export let items = [];
	export let title = '';
</script>

<h2>{title || ''}</h2>
<ol>
	{#each items as item}
		<li>
			<RichText text={item.text} />
		</li>
	{/each}
</ol>

<style lang="scss">
	@use '$lib/styling/breakpoints' as breakpoints;
	@use '$lib/styling/typography' as typography;

	ol {
		padding-left: 0;
		padding-bottom: 1em;
	}

	li {
		padding-left: 0;
		margin-top: 2em;
		list-style: none;
		position: relative;
		counter-increment: step-counter;
	}
	li::before {
		content: counter(step-counter, decimal-leading-zero);
		@include typography.subtitle;

		@include breakpoints.mq($from: large) {
			position: absolute;
			line-height: 1em;
			left: -2.5em;
		}
	}
</style>
