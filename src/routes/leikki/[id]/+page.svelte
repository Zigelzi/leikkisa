<script lang="ts">
	import type { PageData } from './$types';
	import Card from '$lib/Card.svelte';
	import Button from '$lib/Button.svelte';

	export let data: PageData;

	$: ({ game } = data);
</script>

<div class="mt-8">
	<div class="mb-8">
		<Button href="/" element="a">Etusivulle</Button>
	</div>
	<div class="space-y-4">
		<div class="mb-6">
			<h2 class="text-4xl font-bold sm:text-4xl mb-4 font-heading">{game.name}</h2>
			<p>{game.description}</p>
		</div>
		<div>
			<h2 class="text-2xl font-heading">Tarvikkeet</h2>
		</div>
		<div>
			<h2 class="text-2xl font-heading">Ohjeet</h2>
		</div>
	</div>
	<div class="my-8">
		<Card>
			<span slot="title">Toiminnot</span>
			<span slot="actions">
				<form action="/?/deleteGame&id={game.id}" method="POST" class="inline-block">
					<Button type="submit" element="button">Poista</Button>
				</form>
			</span>
		</Card>
	</div>
</div>
