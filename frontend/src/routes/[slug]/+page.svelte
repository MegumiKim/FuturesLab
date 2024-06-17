<script>
	import ContentBlocks from '../../components/ContentBlocks.svelte';
	export let data;
	console.log('data from page', data);
</script>

<section class="container grid">
	<div class="cell large-span-10 large-start-2">
		<h1 class="header-2">{data.contentTitle || data.title}</h1>
	</div>
</section>

<ContentBlocks blocks={data.contentBlocks} />
