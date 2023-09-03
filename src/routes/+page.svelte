<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import { currentPageTitle } from '$lib/stores';
	import { posthog } from 'posthog-js';
	import type { PageData } from './$types';

	export let data: PageData;
	$currentPageTitle = 'Etusivu';

	function emitGameListView(gameType: GameType) {
		posthog.capture('Game list navigated', {
			gameType: gameType.name,
			source: 'index'
		});
	}
</script>

<section class="min-h-[80vh] flex items-center">
	<div>
		<h1 class="text-8xl mb-6 font-heading">Leikkisä</h1>
		<p>Kirjasto puuhista ja leikeistä joiden avulla liikut ja pidät hauskaa lastesi kanssa!</p>
	</div>
</section>
<section class="">
	<h2 class="text-5xl font-heading mb-8">Minkä tänään leikittäisiin?</h2>
	<div class="mb-8">
		{#each data.gameTypes as gameType}
			<a
				href="/leikki?gameType={gameType.id}"
				class="mb-4 block"
				on:click={() => {
					emitGameListView(gameType);
				}}
			>
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
	</div>
	<div>
		<a
			href="/leikki"
			class="underline underline-offset-8"
			on:click={() => {
				emitGameListView({
					name: 'Kaikki'
				});
			}}>Katso kaikki leikit</a
		>
	</div>
</section>
