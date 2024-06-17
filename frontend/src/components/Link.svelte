<script>
	export let link;
</script>

{#if link && link.slug}
	<a href={`${link?.type !== 'page' ? `/${link?.type}` : ''}/${link.slug}`}><slot /></a>
{:else}
	<a href={link} rel="noreferrer noopener"><slot /></a>
{/if}
