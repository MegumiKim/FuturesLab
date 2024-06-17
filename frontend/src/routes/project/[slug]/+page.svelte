<script>
	import ContentBlocks from '../../../components/ContentBlocks.svelte';
	import Image from '../../../components/Image.svelte';
	import Video from '../../../components/Video.svelte';
	import { formatDate } from '../../../lib/utils/formatDate.js';
	import Media from '../../../components/Media.svelte';

	export let data;
</script>

<section class="container grid">
	<div class="cell large-span-12 large-start-2">
		<h1>{data.title}</h1>
		<p class="is-large">{data.subtitle}</p>
		<p class="is-small-faded">{formatDate(data.date || null)}</p>
	</div>

	<div class="cell">
		{#if data.video}
			<Media description={data.video.description}>
				<Video asset={data.video} autoplay />
			</Media>
		{:else}
			<Media description={data.image.description}>
				<Image
					asset={data.image}
					config={{ ar: 1 }}
					focalPoint={data.focalPoint}
					attributes={{
						sizes: '(min-width: 300px) 50vw, 100vw'
					}}
				/>
			</Media>
		{/if}
	</div>
</section>

<ContentBlocks blocks={data.contentBlocks} />
