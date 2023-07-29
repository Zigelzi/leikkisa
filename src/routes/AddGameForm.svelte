<div class="space-y-4 bg-slate-200 px-6 py-8 rounded shadow">
	<h2 class="text-xl font-bold">Lisää leikki</h2>
	<form action="?/createGame" method="POST" class="space-y-4">
		<div>
			<label for="name" class="block mb-2"> Nimi </label>
			<input
				type="text"
				name="name"
				id="name"
				class="border-slate-400 border-2 w-full p-2 rounded-lg"
				required
			/>
		</div>
		<div>
			<label for="description" class="block"> Kuvaus </label>
			<textarea
				name="description"
				id="description"
				class="block border-2 border-slate-400 w-full p-2 rounded-lg"
				rows="3"
				required
			/>
		</div>
		<button type="submit" class="px-6 py-2 bg-slate-600 text-white rounded-lg">Lisää</button>
	</form>
</div>
