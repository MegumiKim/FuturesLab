<script>
	export let route = '/';
</script>

<a href={route} class="go-back-btn">Go Back</a>

<style lang="scss">
	.go-back-btn {
		border: 2px solid black;
		border-radius: 30px;
		color: black;
		padding: 10px 32px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 4px 2px;
		transition-duration: 0.4s;
		cursor: pointer;
	}
</style>
