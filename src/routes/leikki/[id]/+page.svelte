<script lang="ts">
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { posthog } from 'posthog-js';
	import Button from '$lib/components/Button.svelte';
	import events from '$lib/events';

	export let data: PageData;
	let game = data.game;

	if (browser) {
		posthog.capture(`${events.game.name} ${events.game.actions.viewed}`, {
			gameId: game.id,
			gameName: game.name,
			numberOfInstructions: Number(game.instructions.length),
			location: game.locations[0] ? game.locations[0].name : null
		});
	}
</script>

<!-- Game description -->
<div class="mb-6">
	<div class="mb-4" />
	<p class="whitespace-pre-wrap">{game.description}</p>
</div>
<!-- Game details -->
<div class="flex justify-between mb-8">
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
	<Button href={'/leikki/' + $page.params.id + '/ohje'} element="a">Aloita leikki</Button>
</div>
