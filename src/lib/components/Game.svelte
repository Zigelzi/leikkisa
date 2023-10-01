<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	export let game: Game;

	const likes = game.likes.filter((like) => like.isLiked).length;
</script>

<Card>
	<span slot="title">{game.name}</span>
	<div slot="content">
		<div class="text-sm text-slate-600">
			{#each game.ageCategories as ageCategory}
				<span class="mr-2 inline-block capitalize"
					>{ageCategory.name}
					<span class="lowercase">
						({ageCategory.minAge}-{ageCategory.maxAge} v)
					</span>
				</span>
			{/each}
			<p class="mb-2">{likes} tykkäystä</p>
		</div>
		<span class="whitespace-pre-wrap">{game.description}</span>
	</div>
	<div slot="actions" class="space-x-4">
		<Button href="/leikki/{String(game.id)}" element="a">Pelaa</Button>
	</div>
</Card>
