<script>
	import Link from '../components/Link.svelte';
	export let navigation = [];
	export let copyright = '';
</script>

<footer>
	<div class="footer_left">{copyright}</div>

	<div class="footer_right">
		{#each navigation as item}
			{#if item.externalLink && item.externalLink.startsWith(`mailto:`)}
				<span
					><a href={item.externalLink}>&rarr; {item.label}</a>
					<button on:click={navigator.clipboard.writeText(item.externalLink.split(`:`)[1])}>
						<img src="/materialIcons/Copy/copy.white.svg" alt="copy icon" />
					</button></span
				>
			{:else}
				<Link link={item.internalLink || item.externalLink || ''}>&rarr; {item.label}</Link>
			{/if}
		{/each}
	</div>
</footer>

<style lang="scss">
	@use '$lib/styling/typography' as typography;

	footer {
		background: #000;
		color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 1em;
		padding: 3em var(--bleed) 2em var(--bleed);

		.footer_right {
			display: flex;
			flex-direction: column;
			gap: 0.3em;
			@include typography.details;
		}

		span {
			display: flex;
			align-items: center;
			gap: 0.5em;
		}
	}

	button {
		color: inherit;
		background-color: inherit;
		border-radius: 50%;
		border: none;
		text-align: left;
		padding: 0;
		font-size: 1em;
		cursor: pointer;

		img {
			width: 1em;
			height: 1em;
		}
	}

	button:focus,
	button:hover {
		transform: scale(1.2);
	}

	button:active {
		transform: scale(1);
	}

	:global([data-theme='blue']) footer {
		background: #0000ff;
		color: #fff;
	}
</style>
