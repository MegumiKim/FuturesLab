<script>
	import { page } from '$app/stores';
	import GoBackBtn from '../components/UI/GoBackBtn.svelte';
</script>

<div class="container">
	<h1>{$page.status}: {$page.error?.message} :-/</h1>
	<GoBackBtn route="/" />
</div>
