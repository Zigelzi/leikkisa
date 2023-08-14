<script lang="ts">
	import type { PageData } from './$types';
	import Game from '$lib/components/Game.svelte';
	import Button from '$lib/components/Button.svelte';
	import posthog from 'posthog-js';

	export let data: PageData;

	$: ({ games } = data);
	let gameTypes = data.gameTypes;
	let selectedGameType = gameTypes[0].id;
</script>

<section class="mb-8">
	<div class="mb-8 flex justify-between items-center">
		<h2 class="text-5xl font-heading">Leikit</h2>
		<div>
			<Button
				href="/leikki/lisaa"
				element="a"
				on:click={() => {
					posthog.capture('Game creation started');
				}}>Lisää leikki</Button
			>
		</div>
	</div>
	<div>
		<label for="selectedGameType">Valitse</label>
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
