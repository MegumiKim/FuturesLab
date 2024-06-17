<script>
	export let handleClose;
</script>

<button on:click={handleClose()} aria-label="Close dialog">
	<img src="/materialIcons/Close/close.white.svg" alt="close" /></button
>

<style>
	button {
		all: unset;
		cursor: pointer;
		text-align: center;
		width: 1em;
		height: 1em;
		border-radius: 50%;
	}
	button:hover,
	button:focus {
		outline: blue auto 1px;
	}
</style>
