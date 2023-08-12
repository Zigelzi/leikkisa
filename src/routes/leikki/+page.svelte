<script lang="ts">
	import type { PageData } from './$types';
	import Game from '$lib/Game.svelte';
	import Button from '$lib/Button.svelte';
	import posthog from 'posthog-js';

	export let data: PageData;

	$: ({ games } = data);
</script>

<section class="mb-8">
	<h2 class="text-5xl mb-6 font-heading">Leikit</h2>
	<div class="mb-8">
		<Button
			href="/leikki/lisaa"
			element="a"
			on:click={() => {
				posthog.capture('Game creation started');
			}}>Lisää leikki</Button
		>
	</div>
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
