<script lang="ts">
	import type { PageData } from './$types';
	import AddGameForm from './AddGameForm.svelte';

	export let data: PageData;

	$: ({ games } = data);
</script>

<div class="min-h-[80vh] flex items-center">
	<div>
		<h1 class="text-6xl mb-6">Leikkisä</h1>
		<p>Kirjasto leikeistä joiden avulla liikut ja pidät hauskaa lastesi kanssa!</p>
	</div>
</div>
<div class="mb-8">
	<AddGameForm />
</div>
<div class="mb-8">
	<h2 class="text-2xl">Leikit</h2>
	{#each games as game}
		<p class="text-lg text-bold">{game.name}</p>
		<p>{game.description}</p>
	{/each}
</div>
