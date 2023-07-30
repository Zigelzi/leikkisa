<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ game } = data);
</script>

<div class="mt-8">
	<div class="mb-8">
		<a href="/" class="px-6 py-2 bg-slate-600 text-white rounded-lg">Etusivulle</a>
	</div>
	<div class="space-y-4">
		<div class="mb-6">
			<h2 class="text-2xl font-bold sm:text-4xl mb-4">{game.name}</h2>
			<p>{game.description}</p>
		</div>
		<div>
			<h2 class="text-xl">Tarvikkeet</h2>
		</div>
		<div>
			<h2 class="text-xl">Ohjeet</h2>
		</div>
	</div>
</div>
