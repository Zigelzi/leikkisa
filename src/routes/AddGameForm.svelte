<script lang="ts">
	import Button from '$lib/Button.svelte';
</script>

<div class="space-y-4 bg-slate-200 px-6 py-8 rounded shadow">
	<h2 class="text-3xl font-heading">Lisää leikki</h2>
	<form action="?/createGame" method="POST" class="space-y-4">
		<div class="space-y-2">
			<label for="name" class="block"> Nimi </label>
			<input
				type="text"
				name="name"
				id="name"
				class="border-slate-400 border-2 w-full p-2 rounded-lg"
				required
			/>
		</div>
		<div class="space-y-2">
			<label for="description" class="block"> Kuvaus </label>
			<textarea
				name="description"
				id="description"
				class="block border-2 border-slate-400 w-full p-2 rounded-lg"
				rows="3"
				required
			/>
		</div>
		<div>
			<div class="mb-4">
				<h3 class="font-heading text-2xl">Ohjeet</h3>
				<p class="text-slate-600 text-sm">Lisää leikin ohjeet vaiheittain</p>
			</div>
			<div class="space-y-2">
				<label for="step" class="block">Lisää vaihe</label>
				<textarea
					name="step"
					id="step"
					rows="4"
					class="block border-2 border-slate-400 w-full p-2 rounded-lg"
				/>
			</div>
		</div>
		<div>
			<Button text="Lisää leikki" />
		</div>
	</form>
</div>
