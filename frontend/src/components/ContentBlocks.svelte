<script>
	import Image from './Image.svelte';
	import Video from './Video.svelte';
	import RichText from './RichText.svelte';
	import Quote from './Quote.svelte';
	import Gallery from './Gallery.svelte';
	import Media from './Media.svelte';
	import Statistics from './Statistics.svelte';
	import LargeText from './LargeText.svelte';
	import NumberedParagraphs from './NumberedParagraphs.svelte';
	import EmbededVideo from './EmbededVideo.svelte';
	import { classNames } from '../lib/utils/classNames.js';

	export let blocks = [];
	console.log('blocks', blocks);

	const blockTypes = {
		richText: RichText,
		quote: Quote,
		gallery: Gallery,
		statistics: Statistics,
		largeText: LargeText,
		numberedParagraphs: NumberedParagraphs,
		videoEmbed: EmbededVideo
	};
</script>

<div class="container">
	<div class="grid">
		{#each blocks || [] as { type, ...data }}
			<!-- Block with 2/3 width with indent-->
			{#if type === 'quote'}
				<div
					class="cell medium-start-2 large-start-3 large-span-12 xxlarge-start-3 xxlarge-span-10"
				>
					<svelte:component this={blockTypes[type]} {...data} />
				</div>

				<!-- Block with negative margin -->
			{:else if type === 'gallery' || type === 'statistics'}
				<div class="cell container--negative">
					<svelte:component this={blockTypes[type]} {...data} />
				</div>

				<!-- Block with 2/3 width / default -->
			{:else if type === 'richText' || type === 'largeText'}
				<div class="cell medium-span-15 large-span-10 large-start-2 richText">
					<svelte:component this={blockTypes[type]} {...data} />
				</div>
				<!-- Block with 2/3, right align -->
			{:else if type === 'numberedParagraphs'}
				<div class="cell medium-span-15 large-span-10 large-start-7">
					<svelte:component this={blockTypes[type]} {...data} />
				</div>
			{:else if type === 'videoEmbed'}
				<div class="cell medium-span-15 large-span-10 large-start-2">
					<svelte:component this={blockTypes[type]} {...data} />
				</div>
			{:else if type === 'media'}
				<div
					class={classNames({
						cell: true,
						'large-span-14 large-start-3':
							data.orientation === 'landscape' && data.displaySize === 'large',
						'large-span-12': data.orientation === 'landscape' && data.displaySize === 'normal',
						'large-span-8 large-start-6':
							data.orientation === 'portrait' && data.displaySize === 'large',
						'large-span-7 large-start-2':
							data.orientation === 'portrait' && data.displaySize === 'normal'
					})}
				>
					<Media caption={data.caption} description={data.asset.description}>
						{#if data.asset._type == 'sanity.imageAsset'}
							<Image asset={data.asset} focalPoint={data.focalPoint} />
						{:else if data.asset._type == 'sanity.fileAsset'}
							<Video asset={data.asset} />
						{/if}
					</Media>
				</div>
			{/if}
		{/each}
	</div>
</div>
