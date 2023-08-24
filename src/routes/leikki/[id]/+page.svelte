<script lang="ts">
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import { posthog } from 'posthog-js';

	export let data: PageData;
	let game = data.game;

	if (browser) {
		posthog.capture('Game viewed', {
			gameId: game.id,
			gameName: game.name,
			numberOfInstructions: Number(game.instructions.length),
			location: game.locations[0] ? game.locations[0].name : null
		});
	}

	function emitBackToGamesEvent() {
		posthog.capture('Game list navigated', {
			gameId: game.id,
			gameName: game.name,
			gameType: game.gameType.name,
			source: 'game'
		});
	}
</script>

<div class="space-y-4">
	<div class="my-8">
		<a
			href="/leikki?gameType={game.gameType.id}"
			class="underline underline-offset-8"
			on:click={emitBackToGamesEvent}>Takaisin</a
		>
	</div>
	<div class="mb-6">
		<div class="mb-4">
			<h2 class="text-4xl font-bold sm:text-4xl font-heading mb-2">{game.name}</h2>
			<div class="text-sm capitalize text-slate-600 space-y-1">
				<p>
					{game.gameType.name}
				</p>
				<div>
					{#each game.ageCategories as ageCategory}
						<span class="mr-2 inline-block"
							>{ageCategory.name}
							<span class="lowercase">
								({ageCategory.minAge}-{ageCategory.maxAge} v)
							</span>
						</span>
					{/each}
				</div>
			</div>
		</div>
		<p class="whitespace-pre-wrap">{game.description}</p>
	</div>
	<div>
		<h2 class="text-2xl font-heading">Paikat</h2>
		{#if game.locations.length > 0}
			<ol>
				{#each game.locations as location}
					<li>{location.name}</li>
				{/each}
			</ol>
		{:else}
			<p>Sopivia paikkoja ei ole merkitty</p>
		{/if}
	</div>
	<div>
		<h2 class="text-2xl font-heading mb-4">Ohjeet</h2>
		<ol class="space-y-6">
			{#each game.instructions as instruction}
				<li class="flex items-center">
					<div class="inline-block">
						<p class="text-4xl mr-4">{instruction.order}</p>
					</div>
					<div class="inline-block">
						{#if instruction.description}
							<p>{instruction.description}</p>
						{/if}
						<p class="italic">{instruction.action}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</div>
