<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let game = data.game;

	console.log($page.params);
</script>

<div class="mb-8">
	<h2 class="text-2xl font-heading mb-4">Ohjeet</h2>
	<ol class="space-y-6">
		{#each game.instructions as instruction}
			<li class="flex items-center">
				<div class="inline-block">
					<p class="text-4xl mr-4">{instruction.order}</p>
				</div>
				<div class="inline-block">
					{#if instruction.description}
						<p>{instruction.description}</p>
					{/if}
					<p class="italic">{instruction.action}</p>
				</div>
			</li>
		{/each}
	</ol>
</div>
<!-- Actions -->
<div>
	<Button href={'/leikki/' + $page.params.id + '/palaute'} element="a">Valmis!</Button>
</div>
