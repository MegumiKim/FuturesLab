<script>
	import formatNumber from '$lib/utils/formatNumber.js';

	export let title = '';
	export let number = 0;
	export let unit = '';
	export let details = '';
	export let _type = 'statistics';
	export let _key = '';

	const formattedNumber = formatNumber(number);
</script>

<div class="card-stats">
	<h3>{title}</h3>
	<div>
		<p class="number">{formattedNumber}</p>
		<sub>{unit.toLocaleLowerCase()}</sub>
	</div>
	<p class="text_details">{details}</p>
</div>

<style lang="scss">
	@use '$lib/styling/breakpoints' as breakpoints;

	.card-stats {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		gap: 1em;
		height: 100%;
		padding: 1em 1.5em;
		border-radius: 16px;
		border: 1px solid #c6c6c6;
		box-shadow: 0px 3px 6px 0px #0000001a;

		@include breakpoints.mq($from: medium) {
			flex: 1 0 250px;
			font-size: 0.8em;
			gap: 1em;
		}
		@include breakpoints.mq($from: large) {
			flex: 1 0 300px;
			font-size: 1em;
		}
		@include breakpoints.mq($from: xlarge) {
			flex: 1 0 400px;
			font-size: 1.2em;
		}

		h3 {
			font-size: 0.8em;
			margin: 0;
		}

		.text_details {
			margin: 0;
			font-size: 1em;
		}

		div {
			display: flex;
			align-items: baseline;
			/* gap: 0.5em; */
		}
		.number {
			margin: 0;
			font-size: 3.2em;
			display: inline-flex;
			align-items: baseline;

			@include breakpoints.mq($from: large) {
				font-size: 3.5em;
			}
		}
		sub {
			display: inline;
			white-space: wrap;
			font-size: 1.5em;
			margin-left: 0.2em;
		}
	}
</style>
