<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { posthog } from 'posthog-js';
	import { tick } from 'svelte';
	import events from '$lib/events.ts';

	export let locations: Location[] = [];
	export let gameTypes: GameType[] = [];

	let instructionSayInput: HTMLElement;
	let selectedLocationId: Number;
	let selectedGameTypeId: Number;

	let newGame = {
		instructions: [] as Instruction[]
	} as Game;

	let instructions = [] as Instruction[];
	let newInstruction = {} as Instruction;
	let isAddingInstruction = true;

	async function addGame() {
		newGame.locationId = selectedLocationId;
		newGame.gameTypeId = selectedGameTypeId;
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
		posthog.capture(`${events.instruction.name} ${events.instruction.actions.addingStarted}`);
	}

	async function addInstruction() {
		if (newInstruction.action === '' || newInstruction.action === undefined) return;

		newInstruction.order = instructions.length + 1;
		instructions.push(newInstruction);
		newInstruction = {} as Instruction;
		instructions = instructions;
		addInstructionsToGame();
		posthog.capture(`${events.instruction.name} ${events.instruction.actions.added}`);
		await tick;
		instructionSayInput.focus();
	}

	function addInstructionsToGame() {
		newGame.instructions = instructions;
	}

	function createGame() {
		posthog.capture(`${events.game.name} ${events.game.actions.created}`);
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
				class="px-4 py-2 bg-white border-2 border-slate-400 rounded-lg capitalize"
				bind:value={selectedLocationId}
			>
				<option disabled value="0" selected>Valitse paikka</option>
				{#await locations}
					<option value="-1">Ladataan paikkoja</option>
				{:then value}
					{#each value as location}
						<option value={location.id} class="">{location.name}</option>
					{/each}
				{/await}
			</select>
		</div>
		<div>
			<label for="gameType" class="block font-bold mb-2"> Leikkitapa </label>
			<select
				name="gameType"
				id="gameType"
				class="px-4 py-2 bg-white border-2 border-slate-400 rounded-lg capitalize"
				bind:value={selectedGameTypeId}
			>
				<option disabled value="0" selected>Valitse tyyppi</option>
				{#await gameTypes}
					<option value="-1">Ladataan leikkitapoja</option>
				{:then value}
					{#each value as gameType}
						<option value={gameType.id} class="">{gameType.name}</option>
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
				<ol class="space-y-6">
					{#each instructions as instruction}
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
			{#if !isAddingInstruction}
				<div>
					<Button on:click={toggleNewInstruction} type="button" element="button">Lisää ohje</Button>
				</div>
			{:else}
				<div class="my-4 space-y-4">
					<label for="instructionSay" class="block font-bold mb-2">Sano</label>
					<textarea
						name="instructionSay"
						id="instructionSay"
						rows="3"
						class="block border-2 border-slate-400 w-full p-2 rounded-lg"
						bind:value={newInstruction.description}
						bind:this={instructionSayInput}
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
