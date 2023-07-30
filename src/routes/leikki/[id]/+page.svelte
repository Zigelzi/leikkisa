<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ game } = data);
</script>

<div class="mt-8">
	<a href="/" class="px-6 py-2 bg-slate-600 text-white rounded-lg">Etusivulle</a>
	<h2 class="text-4xl my-4">{game.name}</h2>
	<p>{game.description}</p>
</div>
