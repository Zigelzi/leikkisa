<script lang="ts">
	import Button from '$lib/Button.svelte';

	let newGame = {
		instructions: [] as Instruction[]
	} as Game;
	let instructions = [] as Instruction[];
	let newInstruction = {} as Instruction;
	let isAddingInstruction = false;

	function toggleNewInstruction() {
		isAddingInstruction = !isAddingInstruction;
	}

	function addInstruction() {
		if (newInstruction.content === '' || newInstruction.content === undefined) return;

		newInstruction.order = instructions.length + 1;
		newInstruction.game = newGame;
		instructions.push(newInstruction);
		newInstruction = {} as Instruction;
		instructions = instructions;
		addInstructionsToGame();
		isAddingInstruction = false;
	}

	function addInstructionsToGame() {
		newGame.instructions = instructions;
	}
</script>

<div class="space-y-">
	<form action="?/createGame" method="POST" class="">
		<div class="space-y-2">
			<label for="name" class="block"> Nimi </label>
			<input
				type="text"
				name="name"
				id="name"
				class="border-slate-400 border-2 w-full p-2 rounded-lg"
				required
				bind:value={newGame.name}
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
				bind:value={newGame.description}
			/>
		</div>
		<div class="my-6">
			<div class="mb-4">
				<h3 class="font-heading text-2xl">Ohjeet</h3>
				<p class="text-slate-600 text-sm">Lisää leikin ohjeet vaiheittain</p>
			</div>
			<div class="my-6">
				<ol>
					{#each instructions as instruction}
						<li>{instruction.order} - {instruction.content}</li>
					{/each}
				</ol>
			</div>
			{#if !isAddingInstruction}
				<div>
					<Button on:click={toggleNewInstruction} type="button" element="button">Lisää ohje</Button>
				</div>
			{:else}
				<div class="space-y-2 my-6">
					<label for="step" class="block">Kirjoita ohje</label>
					<textarea
						name="step"
						id="step"
						rows="4"
						class="block border-2 border-slate-400 w-full p-2 rounded-lg"
						bind:value={newInstruction.content}
					/>
					<Button on:click={addInstruction} type="button" element="button">Lisää ohje</Button>
				</div>
			{/if}
		</div>
		<div class="py-8">
			<Button action="?/createGame" element="button" type="submit">Lisää leikki</Button>
		</div>
	</form>
</div>
