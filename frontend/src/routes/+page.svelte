<script>
	import EntryPoint from '../components/EntryPoint.svelte';
	export let data;
</script>

<div class="container grid">
	{#if data?.siteSettings?.elevatorPitch}
		<div class="cell large-span-10 large-start-2">
			<h1>
				{data.siteSettings.elevatorPitch}
			</h1>
		</div>
	{/if}

	<div class="cell xlarge-start-1 grid">
		{#each data.projectData || [] as project}
			<div class="small-span-18 medium-span-9">
				<EntryPoint
					link={`/project/${project.slug}`}
					title={project.title}
					video={project.video}
					image={project.image}
					focalPoint={project.focalPoint}
					date={project.date}
				/>
			</div>
		{/each}
	</div>
</div>
