<script>
	export let id = '';
	export let provider = '';
	export let caption = '';

	$: url = getEmbedURL(provider, id);

	function getEmbedURL(provider, id) {
		if (provider === 'youtube') {
			return `https://www.youtube.com/embed/${id}`;
		} else if (provider === 'vimeo') {
			return `https://player.vimeo.com/video/${id}`;
		}
		return '';
	}
</script>

{#if url}
	<iframe
		src={url}
		frameborder="0"
		allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
		allowfullscreen
		loading="lazy"
		referrerpolicy="no-referrer"
		X-Frame-Options=""
		title="Embedded video"
	></iframe>
	{#if caption}
		<p class="caption">{caption}</p>
	{/if}
{/if}
