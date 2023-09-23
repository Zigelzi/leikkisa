<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let game = data.game;
</script>

<div>
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
