<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	export let game: Game;
</script>

<Card>
	<span slot="title">{game.name}</span>
	<span slot="content" class="whitespace-pre-wrap">{game.description}</span>
	<div slot="actions" class="space-x-4">
		<Button href="/leikki/{String(game.id)}" element="a">Pelaa</Button>
	</div>
</Card>
