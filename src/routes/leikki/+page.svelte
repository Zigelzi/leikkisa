<script lang="ts">
	import type { PageData } from './$types';
	import Game from '$lib/components/Game.svelte';
	import Button from '$lib/components/Button.svelte';
	import posthog from 'posthog-js';

	export let data: PageData;

	$: ({ games } = data);
	let gameTypes: GameType[] = [{ id: 0, name: 'Kaikki' }];
	gameTypes = [...gameTypes, ...data.gameTypes];
	let selectedGameType: GameType;

	$: {
		console.log(selectedGameType);
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
		>
			{#each gameTypes as gameType}
				<option value={gameType} class="">{gameType.name}</option>
			{/each}
		</select>
		<form action="" />
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
