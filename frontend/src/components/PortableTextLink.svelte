<script>
	import Link from './Link.svelte';
	export let portableText;
</script>

{#if portableText.value.internalLink}
	<Link link={portableText.value.internalLink}
		><slot />
		<img src="/materialIcons/Glossary/glossary.white.svg" alt="glossary icon" class="small-icon" />
	</Link>
{:else}
	<Link link={portableText.value.externalLink}><slot /></Link>
{/if}

<style lang="scss">
	a {
		cursor: pointer;
		text-decoration: underline;
	}
</style>
