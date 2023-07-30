<script lang="ts">
	export let game: Game;
</script>

<div class="p-6 border border-slate-400 rounded shadow">
	<h5 class="text-lg text-bold mb-3">{game.name}</h5>
	<p class="mb-4 font-light">{game.description}</p>
	<div class="space-x-4">
		<a
			href="/leikki/{String(game.id)}"
			class="px-3 py-2 text-sm bg-slate-600 rounded-lg text-white inline-block">Pelaa</a
		>
		<form action="?/deleteGame&id={game.id}" method="POST" class="inline-block">
			<button type="submit" class="px-3 py-2 text-sm bg-slate-400 text-white rounded-lg"
				>Poista</button
			>
		</form>
	</div>
</div>
