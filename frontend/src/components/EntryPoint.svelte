<script>
	import Image from './Image.svelte';
	import Video from './Video.svelte';
	import { formatDate } from '../lib/utils/formatDate.js';

	export let link;
	export let title = '';
	export let video;
	export let image;
	export let focalPoint;
	export let date;
</script>

<!-- TODO: Consider adding check if we have link etc -->
<div class="entry-point">
	{#if video}
		<Video asset={video} />
	{:else}
		<Image
			asset={image}
			config={{ ar: 1 }}
			{focalPoint}
			attributes={{
				sizes: '(min-width: 768px) 50vw, 100vw'
			}}
		/>
	{/if}

	<p>{title}</p>
	<p class="is-small-faded">{formatDate(date || null)}</p>
	<a href={link}> </a>
</div>

<style lang="scss">
	.entry-point {
		position: relative;
		cursor: pointer;
		overflow: clip;
		transition: transform 0.2s ease-in-out;
		margin-bottom: 1em;

		a::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			overflow: clip;
		}

		:global(video),
		:global(img) {
			object-fit: cover;
			width: 100%;
			aspect-ratio: 1/1;
			border-radius: 16px;
		}

		&:hover,
		&:focus-within {
			transform: scale(1.03);
		}

		p {
			margin-top: 0.5em;
			line-height: 1.2;
		}
	}
</style>
