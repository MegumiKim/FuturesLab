<script>
	import HorizontalScrollContainer from './HorizontalScrollContainer.svelte';
	import Media from './Media.svelte';
	import Video from './Video.svelte';
	import Image from './Image.svelte';
	export let items = [];
</script>

<HorizontalScrollContainer>
	<div class="horizontal-scroll">
		{#each items as item}
			<Media caption={item.caption} description={item.asset.description}>
				{#if item.asset._type == 'sanity.imageAsset'}
					<Image asset={item.asset} focalPoint={item.focalPoint} />
				{:else if item.asset._type == 'sanity.fileAsset'}
					<Video asset={item.asset} />
				{/if}
			</Media>
		{/each}
	</div>
</HorizontalScrollContainer>
