<script lang="ts">
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { posthog } from 'posthog-js';
	import Button from '$lib/components/Button.svelte';

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
</script>

<div class="">
	<!-- Game description -->
	<div class="my-6">
		<div class="mb-4">
			<h2 class="text-4xl font-bold sm:text-4xl font-heading mb-2">{game.name}</h2>
			<div class="text-sm capitalize text-slate-600 space-y-1">
				<p>
					{game.gameType.name}
				</p>
			</div>
		</div>
		<p class="whitespace-pre-wrap">{game.description}</p>
	</div>
	<!-- Game details -->
	<div class="flex justify-between">
		<div>
			<h2 class="text-xl font-heading">Paikka</h2>
			{#if game.locations.length > 0}
				<ol class="text-sm">
					{#each game.locations as location}
						<li>{location.name}</li>
					{/each}
				</ol>
			{:else}
				<p class="text-sm">Sopivia paikkoja ei ole merkitty</p>
			{/if}
		</div>
		<div>
			<h2 class="text-xl font-heading">Lapsen ikä</h2>
			{#if game.ageCategories.length > 0}
				<ol class="text-sm">
					{#each game.ageCategories as ageCategory}
						<li>
							<span class="capitalize">{ageCategory.name}</span>
							<span>
								({ageCategory.minAge}-{ageCategory.maxAge} v)
							</span>
						</li>
					{/each}
				</ol>
			{:else}
				<p>Sopivia paikkoja ei ole merkitty</p>
			{/if}
		</div>
	</div>
	<!-- Actions -->
	<div>
		<Button href={$page.url.pathname + '/ohje'} element="a">Aloita leikki</Button>
	</div>
</div>
