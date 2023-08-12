<script lang="ts">
	import Button from '$lib/Button.svelte';
	import { goto } from '$app/navigation';
	import { posthog } from 'posthog-js';

	const locations = getLocations();

	let newGame = {
		instructions: [] as Instruction[],
		locations: [] as Location[]
	} as Game;
	let instructions = [] as Instruction[];
	let newInstruction = {} as Instruction;
	let isAddingInstruction = true;

	async function getLocations() {
		const response = await fetch('/api/paikka');
		const locations = await response.json();
		return locations;
	}

	async function addGame() {
		const response = await fetch('/api/leikki', {
			method: 'POST',
			body: JSON.stringify(newGame)
		});
		const data = await response.json();
		if (!response.ok) {
			return;
		}
		goto(`/leikki/${data.id}`);
	}

	function toggleNewInstruction() {
		isAddingInstruction = !isAddingInstruction;
		posthog.capture('Instruction create started');
	}

	function addInstruction() {
		if (newInstruction.action === '' || newInstruction.action === undefined) return;

		newInstruction.order = instructions.length + 1;
		instructions.push(newInstruction);
		newInstruction = {} as Instruction;
		instructions = instructions;
		addInstructionsToGame();
		posthog.capture('Instruction added');
	}

	function addInstructionsToGame() {
		newGame.instructions = instructions;
	}

	function createGame() {
		posthog.capture('Game created');
	}
</script>

<div>
	<form on:submit|preventDefault={addGame} class="space-y-6">
		<div>
			<label for="name" class="block font-bold mb-2"> Nimi </label>
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
			<label for="description" class="block font-bold mb-2"> Kuvaus </label>
			<textarea
				name="description"
				id="description"
				class="block border-2 border-slate-400 w-full p-2 rounded-lg"
				rows="3"
				required
				bind:value={newGame.description}
			/>
		</div>
		<div>
			<label for="location" class="block font-bold mb-2"> Paikka </label>
			<select
				name="location"
				id="location"
				class="px-4 py-2 bg-white border-2 border-slate-400 rounded-lg"
				bind:value={newGame.locations}
			>
				{#await locations}
					<option value="none">Ladataan paikkoja</option>
				{:then value}
					{#each value as location}
						<option value={location.id}>{location.name}</option>
					{/each}
				{/await}
			</select>
		</div>
		<div class="my-6">
			<div class="mb-2">
				<h3 class="font-heading text-2xl">Ohjeet</h3>
				<p class="text-slate-600 text-sm">Lisää leikin ohjeet vaiheittain</p>
			</div>
			<div class="mb-6">
				<ol>
					{#each instructions as instruction}
						<li>
							{instruction.order}.
							<div>
								<p>{instruction.description}</p>
								<p class="italic">{instruction.action}</p>
							</div>
						</li>
					{/each}
				</ol>
			</div>
			{#if !isAddingInstruction}
				<div>
					<Button on:click={toggleNewInstruction} type="button" element="button">Lisää ohje</Button>
				</div>
			{:else}
				<div class="my-4 space-y-4">
					<h4>Kirjoita ohje</h4>
					<label for="instructionSay" class="block font-bold mb-2">Sano</label>
					<textarea
						name="instructionSay"
						id="instructionSay"
						rows="3"
						class="block border-2 border-slate-400 w-full p-2 rounded-lg"
						bind:value={newInstruction.description}
					/>
					<label for="instructionDo" class="block font-bold mb-2">Tee</label>
					<textarea
						name="instructionDo"
						id="instructionDo"
						rows="3"
						class="block border-2 border-slate-400 w-full p-2 rounded-lg"
						bind:value={newInstruction.action}
					/>
				</div>
				<Button on:click={addInstruction} type="button" element="button">Lisää ohje</Button>
			{/if}
		</div>
		<div class="py-8">
			<Button element="button" on:click={createGame}>Lisää leikki</Button>
		</div>
	</form>
</div>
