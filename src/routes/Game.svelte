<script lang="ts">
	import Card from '$lib/Card.svelte';
	export let game: Game;
</script>

<Card>
	<span slot="title">{game.name}</span>
	<span slot="content">{game.description}</span>
	<div slot="actions" class="space-x-4">
		<a
			href="/leikki/{String(game.id)}"
			class="px-3 py-2 text-sm bg-slate-600 rounded-lg text-white inline-block">Pelaa</a
		>
	</div>
</Card>
