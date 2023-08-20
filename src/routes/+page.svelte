<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import { currentPageTitle } from '$lib/stores';
	import { posthog } from 'posthog-js';
	import type { PageData } from './$types';

	export let data: PageData;
	$currentPageTitle = 'Etusivu';
</script>

<section class="min-h-[80vh] flex items-center">
	<div>
		<h1 class="text-8xl mb-6 font-heading">Leikkisä</h1>
		<p>Kirjasto puuhista ja leikeistä joiden avulla liikut ja pidät hauskaa lastesi kanssa!</p>
	</div>
</section>
<section class="mb-6">
	{#each data.gameTypes as gameType}
		<a href="/leikki?gameType={gameType.id}" class="mb-4 block">
			<Card>
				<h3 class="capitalize" slot="title">{gameType.name}</h3>
				<p slot="content">
					{#if gameType.games.length === 1}
						{gameType.games.length} puuha tai leikki!
					{:else}
						{gameType.games.length} puuhaa ja leikkiä!
					{/if}
				</p>
			</Card>
		</a>
	{/each}
</section>
<section class="mb-8">
	<div class="mb-6">
		<h2 class="text-5xl font-heading mb-6">Lisää leikki</h2>
		<p>Onko sinulla leikki jonka haluat jakaa muiden kanssa?</p>
	</div>
	<Button
		href="/leikki/lisaa"
		element="a"
		on:click={() => {
			posthog.capture('Game creation started');
		}}>Lisää se Leikkisään!</Button
	>
</section>
