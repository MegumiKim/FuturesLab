<script>
	export let quote = '';
	export let by = '';
</script>

<blockquote>
	<p>"{quote}"</p>
	{#if by}
		<div class="is-small"> &mdash; {by}</div>
	{/if}
</blockquote>
