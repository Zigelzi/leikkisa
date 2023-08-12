<script lang="ts">
	import type { PageData } from './$types';
	import Card from '$lib/Card.svelte';
	import Button from '$lib/Button.svelte';
	import { browser } from '$app/environment';
	import { posthog } from 'posthog-js';

	export let data: PageData;
	let game = data.game;

	if (browser) {
		posthog.capture('Game viewed', {
			numberOfInstructions: Number(game.instructions.length),
			location: game.locations[0] ? game.locations[0].name : null
		});
	}

	function emitDeleteEvent() {
		posthog.capture('Game deleted', {
			gameId: game.id,
			gameName: game.name
		});
	}
</script>

<div class="space-y-4">
	<div class="mb-6">
		<h2 class="text-4xl font-bold sm:text-4xl mb-4 font-heading">{game.name}</h2>
		<p>{game.description}</p>
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
		<ol>
			{#each game.instructions as instruction}
				<li>{instruction.order} - {instruction.content}</li>
			{/each}
		</ol>
	</div>
</div>
<div class="my-8">
	<Card>
		<span slot="title">Toiminnot</span>
		<span slot="actions">
			<form action="/?/deleteGame&id={game.id}" method="POST" class="inline-block">
				<Button type="submit" element="button" on:click={emitDeleteEvent}>Poista</Button>
			</form>
		</span>
	</Card>
</div>
