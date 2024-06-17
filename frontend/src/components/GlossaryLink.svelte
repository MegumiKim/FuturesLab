<script>
	import DialogBox from './DialogBox.svelte';
	import RichText from './RichText.svelte';
	import CloseBtn from './UI/CloseBtn.svelte';
	export let portableText;

	$: definition = portableText?.value?.definition.text;
	$: term = portableText?.value?.term;
	$: slug = portableText?.value?.slug;
	let isOpen = false;
	let isVisible;
</script>

{#if term && definition}
	<button on:click={() => (isOpen = true)} on:on:touchstart={() => (isOpen = true)}>
		<slot />
		<img src="/materialIcons/Glossary/glossary.black.svg" alt="glossary icon" class="small-icon" />
	</button>
	<div class="dialog-wrapper" class:is-hidden={!isVisible}>
		<DialogBox bind:isOpen bind:isVisible label={term}>
			<div>
				<h3 class="paragraph">{term}</h3>
				<CloseBtn handleClose={() => (isOpen = false)} />
			</div>
			<div class="is-small">
				<RichText text={definition} />
			</div>
			<a href="/glossary/#{slug}" class="is-small-faded">&rarr; View in Glossary</a>
		</DialogBox>
	</div>
{:else}
	<span><slot /> </span>
{/if}

<style lang="scss">
	@use '$lib/styling/breakpoints' as breakpoints;
	button {
		all: unset;
		text-decoration: dashed underline;
		display: inline-block;
	}
	button:hover,
	button:focus {
		outline: 2px solid var(--color-blue);
	}
	h3 {
		margin: 0;
	}
	div {
		display: flex;
		justify-content: space-between;
	}

	.dialog-wrapper {
		position: fixed;
		margin: 0;

		z-index: 1000;
		left: calc(var(--bleed) + 1em);
		right: calc(var(--bleed) - 1em);
		bottom: var(--bleed);

		@include breakpoints.mq($from: medium) {
			max-width: 500px;
			left: auto;
		}
		&.is-hidden {
			visibility: hidden;
		}

		& > :global(div) {
			background: #2e2e2e;
			color: white;
			padding: 1em;
			opacity: 1;
			border-radius: 16px;
			@include breakpoints.mq($from: medium) {
				border-radius: 16px;
			}
		}
	}

	a {
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
