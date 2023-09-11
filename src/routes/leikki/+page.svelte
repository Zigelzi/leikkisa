<script lang="ts">
	import type { PageData } from './$types';
	import Game from '$lib/components/Game.svelte';
	import posthog from 'posthog-js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import Icon from '$lib/components/Icon/Icon.svelte';

	export let data: PageData;

	let gameTypes: GameType[] = [{ name: 'Kaikki', iconName: 'telescope' }, ...data.gameTypes];
	let selectedGameType: GameType = gameTypes[0];

	let ageCategories: AgeCategory[] = [
		{ id: 0, name: 'Kaikki', minAge: 0, maxAge: 12 },
		...data.ageCategories
	];
	let selectedAgeCategory: AgeCategory = ageCategories[0];

	function updateSearchParams(key: string, value: string) {
		const searchParams = new URLSearchParams($page.url.searchParams);
		searchParams.set(key, value);
		if (!browser) return;

		if (key === 'gameType') {
			posthog.capture('Game type selected', {
				gameType: selectedGameType.name
			});
		}

		if (key === 'ageCategory') {
			posthog.capture('Age category selected', {
				ageCategory: selectedAgeCategory.name
			});
		}

		goto(`?${searchParams}`);
	}
</script>

<section class="mb-8">
	<h2 class="text-5xl font-heading mb-8">Leikit</h2>
	<div class="mb-16">
		<h3 class="mb-2">Ikä</h3>
		<fieldset class="flex">
			{#each ageCategories as ageCategory}
				<label
					class="capitalize p-4 mr-2 bg-slate-100 focus-within:bg-slate-200 text-sm flex flex-col justify-center items-center"
					class:bg-slate-400={selectedAgeCategory.name === ageCategory.name}
					for={ageCategory.name}
				>
					<p>{ageCategory.minAge}-{ageCategory.maxAge}</p>
					<p>
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
		<h3 class="mb-2">Leikkitavat</h3>
		<fieldset class="flex">
			{#each gameTypes as gameType}
				<label
					class="capitalize w-20 h-20 mr-2 bg-slate-100 focus-within:bg-slate-200 text-sm flex flex-col justify-center items-center"
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
