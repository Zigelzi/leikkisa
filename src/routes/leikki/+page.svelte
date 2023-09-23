<script lang="ts">
	import type { PageData } from './$types';
	import Game from '$lib/components/Game.svelte';
	import posthog from 'posthog-js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';
	import events from '$lib/events';

	export let data: PageData;

	let gameTypes: GameType[] = [{ name: 'Kaikki', iconName: 'telescope' }, ...data.gameTypes];
	let selectedGameType: GameType = data.selectedGameType || gameTypes[0];

	let ageCategories: AgeCategory[] = [
		{ id: 0, name: 'Kaikenikäiset', minAge: 0, maxAge: 12 },
		...data.ageCategories
	];
	let selectedAgeCategory: AgeCategory = data.selectedAgeCategory || ageCategories[0];

	function updateSearchParams(key: string, value: string) {
		const searchParams = new URLSearchParams($page.url.searchParams);
		searchParams.set(key, value);

		if (!browser) return;

		if (key === 'gameType') {
			posthog.capture(`${events.gameType.name} ${events.gameType.actions.selected}`, {
				gameType: selectedGameType.name
				// TODO: Add count of games to both filters.
				// TODO: Simplify filters to game filtered with event type and number of games.
			});
		}

		if (key === 'ageCategory') {
			posthog.capture(`${events.ageCategory.name} ${events.ageCategory.actions.selected}`, {
				ageCategory: selectedAgeCategory.name
			});
		}
		goto(`?${searchParams}`);
	}

	function clearFilters() {
		selectedAgeCategory = ageCategories[0];
		selectedGameType = gameTypes[0];
		goto('?');
	}
</script>

<section class="mb-8">
	<h2 class="text-5xl font-heading mb-4">Leikit</h2>
	<div class="mb-16">
		<div id="game-type-filter" class="mb-8">
			<fieldset class="flex gap-2">
				{#each gameTypes as gameType}
					<label
						class="capitalize w-20 h-20 bg-slate-100 focus-within:bg-slate-200 text-sm flex flex-col justify-center items-center"
						class:bg-slate-400={selectedGameType.name === gameType.name}
						for={gameType.id?.toString()}
					>
						<Icon name={gameType.iconName} />
						<span>
							{gameType.name}
						</span>
						<input
							type="radio"
							class="sr-only"
							name={gameType.name}
							id={gameType.id?.toString()}
							value={gameType}
							bind:group={selectedGameType}
							on:change={() => updateSearchParams('gameType', gameType.id?.toString() ?? '0')}
						/>
					</label>
				{/each}
			</fieldset>
		</div>
		<div id="age-category-filter">
			<fieldset class="flex flex-wrap gap-2">
				{#each ageCategories as ageCategory}
					<label
						class="text-center capitalize p-4 bg-slate-100 focus-within:bg-slate-200 text-sm flex flex-col justify-center items-center w-[90px]"
						class:bg-slate-400={selectedAgeCategory.name === ageCategory.name}
						for={ageCategory.name}
					>
						<p class="text-lg mb-2">{ageCategory.minAge}-{ageCategory.maxAge}</p>
						<p class="text-xs">
							{ageCategory.name}
						</p>
						<input
							type="radio"
							class="sr-only"
							name={ageCategory.name}
							id={ageCategory.name}
							value={ageCategory}
							bind:group={selectedAgeCategory}
							on:change={() => updateSearchParams('ageCategory', ageCategory.id?.toString() ?? '0')}
						/>
					</label>
				{/each}
			</fieldset>
		</div>
	</div>
	<div class="space-y-4">
		{#if data.games.length > 0}
			{#each data.games as game}
				<Game {game} />
			{/each}
		{:else}
			<h2 class="text-4xl font-heading">Täh?!</h2>
			<p class="">Näillä suodattimilla ei löytynyt muka yhtään leikkiä.</p>
			<Button on:click={clearFilters}>Nollaa suodattimet</Button>
			<p>tai vaihda suodattimia sivun alusta.</p>
		{/if}
	</div>
</section>
