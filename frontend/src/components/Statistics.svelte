<script>
	import { classNames } from '../lib/utils/classNames';
	import CardStatistics from './CardStatistics.svelte';
	import HorizontalScrollContainer from './HorizontalScrollContainer.svelte';

	export let items = [];
</script>

<HorizontalScrollContainer>
	<div
		class={classNames('grid', 'container', {
			'horizontal-scroll-until-medium': items.length > 2,
			'horizontal-scroll-until-large': items.length > 4
		})}
	>
		{#each items as item, i}
			<div
				class={classNames('cell', 'medium-span-9', 'large-span-6', {
					'large-start-1': items.length === 4 && i !== 0 && i % 2 == 0
				})}
			>
				<CardStatistics {...item} _key={i} />
			</div>
		{/each}
	</div>
</HorizontalScrollContainer>
