<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex items-center min-h-[80vh]">
	<div>
		<h1 class="text-4xl mb-8 text-center font-heading">Something went wrong!</h1>
		{#if $page.error}
			<p class="text-center">{$page.error.message}</p>
		{/if}
	</div>
</div>
