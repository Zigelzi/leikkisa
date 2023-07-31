<script lang="ts">
	import Button from '$lib/Button.svelte';
	import type { PageData } from './$types';
	import Game from './Game.svelte';

	export let data: PageData;

	$: ({ games } = data);
</script>

<div class="min-h-[80vh] flex items-center">
	<div>
		<h1 class="text-8xl mb-6 font-heading">Leikkisä</h1>
		<p>Kirjasto leikeistä joiden avulla liikut ja pidät hauskaa lastesi kanssa!</p>
	</div>
</div>
<div class="mb-8">
	<h2 class="text-5xl mb-6 font-heading">Leikit</h2>
	<div class="space-y-4">
		{#if games.length > 0}
			{#each games as game}
				<Game {game} />
			{/each}
		{:else}
			<p class="text-light">Yhtään peliä ei löytynyt. :(</p>
		{/if}
	</div>
</div>
<div class="mb-8">
	<h2 class="text-5xl font-heading mb-6">Lisää leikki</h2>
	<p>Onko sinulla leikki jonka haluat jakaa muiden kanssa?</p>
	<Button href="/leikki/lisaa" element="a">Lisää se Leikkisään!</Button>
</div>
