<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/Button.svelte';
</script>

<div class="flex items-center min-h-[80vh] text-center justify-center">
	<div>
		<h1 class="text-4xl mb-8 text-center font-heading">Something went wrong!</h1>
		{#if $page.error}
			<p class="text-center mb-6">{$page.error.message}</p>
			<Button href="/" element="a">Takaisin etusivulle</Button>
		{/if}
	</div>
</div>
