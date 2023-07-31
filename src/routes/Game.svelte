<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Card from '$lib/Card.svelte';
	export let game: Game;
</script>

<Card>
	<span slot="title">{game.name}</span>
	<span slot="content">{game.description}</span>
	<div slot="actions" class="space-x-4">
		<Button href="/leikki/{String(game.id)}" text="Pelaa" />
	</div>
</Card>
