<script lang="ts">
	import type { PageData } from './$types';
	import Game from '$lib/Game.svelte';

	export let data: PageData;

	$: ({ games } = data);
</script>

<section class="mb-8">
	<h2 class="text-5xl mb-6 font-heading">Leikit</h2>
	<div class="space-y-4">
		{#if games.length > 0}
			{#each games as game}
				<Game {game} />
			{/each}
		{:else}
			<p class="text-light">Yhtään peliä ei löytynyt. :(</p>
		{/if}
	</div>
</section>
