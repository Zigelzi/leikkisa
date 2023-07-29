<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ games } = data);
</script>

<div class="mb-8">
	<h1 class="text-6xl">Leikkisä</h1>
	<p>Kirjasto leikeistä joiden avulla liikut ja pidät hauskaa lastesi kanssa!</p>
</div>
<div class="mb-8">
	<h2 class="text-2xl">Lisää leikki</h2>
	<form action="?/createGame" method="POST">
		<label for="name" class="block">
			Nimi
			<input type="text" name="name" id="name" class="border-slate-100 border-2 block" />
		</label>
		<label for="description" class="block">
			Kuvaus
			<textarea
				name="description"
				id="description"
				class="block border-2 border-slate-100"
				rows="3"
			/>
		</label>
		<button type="submit" class="px-4 py-2 bg-slate-100">Lisää</button>
	</form>
</div>
<div class="mb-8">
	<h2 class="text-2xl">Leikit</h2>
	{#each games as game}
		<p class="text-lg text-bold">{game.name}</p>
		<p>{game.description}</p>
	{/each}
</div>
