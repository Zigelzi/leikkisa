<script lang="ts">
	import Button from '$lib/Button.svelte';

	let instructionContent = '';
	let instructions: { order: number; content: string }[] = [];

	function addInstruction() {
		let instruction = {
			order: instructions.length + 1,
			content: instructionContent
		};

		if (instructionContent) {
			instructions.push(instruction);
			instructionContent = '';
			instructions = instructions;
		}
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
			<div class="space-y-2">
				<label for="step" class="block">Kirjoita ohje</label>
				<textarea
					name="step"
					id="step"
					rows="4"
					class="block border-2 border-slate-400 w-full p-2 rounded-lg"
					bind:value={instructionContent}
				/>
			</div>
			<Button on:click={addInstruction} type="button" text="Lisää vaihe" />
		</div>
		<div>
			<Button action="?/createGame" text="Lisää leikki" />
		</div>
	</form>
</div>
