<script lang="ts">
	import type { PageData } from './$types';
	import Game from '$lib/components/Game.svelte';
	import Button from '$lib/components/Button.svelte';
	import posthog from 'posthog-js';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let gameTypes: GameType[] = [{ id: 0, name: 'Kaikki' }];
	gameTypes = [...gameTypes, ...data.gameTypes];
	let selectedGameType: GameType =
		gameTypes.find((gameType) => gameType.id === data.selectedGameTypeId) || gameTypes[0];

	async function updateFilter() {
		goto(`?gameType=${selectedGameType.id}`);
	}
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
	<div class="mb-8">
		<label for="gameType" class="block font-bold mb-2"> Leikkitapa </label>
		<select
			name="gameType"
			id="gameType"
			class="px-4 py-2 bg-white border-2 border-slate-400 rounded-lg capitalize"
			bind:value={selectedGameType}
			on:change={updateFilter}
		>
			{#each gameTypes as gameType}
				<option value={gameType} class="">{gameType.name}</option>
			{/each}
		</select>
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
