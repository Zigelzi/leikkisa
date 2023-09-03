<script lang="ts">
	import type { PageData } from './$types';
	import Game from '$lib/components/Game.svelte';
	import posthog from 'posthog-js';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	export let data: PageData;

	let gameTypes: GameType[] = [{ id: 0, name: 'Kaikki' }];
	gameTypes = [...gameTypes, ...data.gameTypes];
	let selectedGameType: GameType =
		gameTypes.find((gameType) => gameType.id === data.selectedGameTypeId) || gameTypes[0];

	$: if (selectedGameType) getGamesByType();

	function getGamesByType() {
		const searchParams = new URLSearchParams({
			gameType: selectedGameType.id?.toString() || '0'
		});
		if (browser) {
			goto(`?${searchParams}`);
		}
		posthog.capture('Game type selected', {
			gameType: selectedGameType.name
		});
	}
</script>

<section class="mb-8">
	<h2 class="text-5xl font-heading mb-8">Leikit</h2>
	<div class="mb-16">
		<h3 class="font-bold mb-2">Leikkitavat</h3>
		<fieldset class="flex">
			{#each gameTypes as gameType}
				<label
					class="capitalize py-4 px-3 mr-6 bg-slate-100 focus-within:bg-slate-200 text-sm"
					class:bg-slate-400={selectedGameType.name === gameType.name}
					for={gameType.id?.toString()}
					>{gameType.name}
					<input
						type="radio"
						class="sr-only"
						name={gameType.name}
						id={gameType.id?.toString()}
						value={gameType}
						bind:group={selectedGameType}
					/>
				</label>
			{/each}
		</fieldset>
	</div>
	<div class="space-y-4">
		{#if data.games.length > 0}
			{#each data.games as game}
				<Game {game} />
			{/each}
		{:else}
			<p class="text-light">Yhtään peliä ei löytynyt. :(</p>
		{/if}
	</div>
</section>
