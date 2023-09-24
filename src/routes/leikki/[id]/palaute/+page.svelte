<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	const numberOfStars = 5;
	let currentGameRating = 0;
	let isFeedbackPending = true;
</script>

<div>
	{#if isFeedbackPending}
		<form
			method="POST"
			class="mb-8"
			use:enhance={() => {
				return async ({ update }) => {
					isFeedbackPending = false;
					await update();
				};
			}}
		>
			<fieldset>
				<legend class="text-center mx-auto">Kuinka kivaa teillä oli tässä leikissä?</legend>

				<div class="flex space-x-4 my-6 justify-center">
					{#each Array(numberOfStars) as star, index}
						<label for="star-{index + 1}">
							<Icon name="star" fill={index < currentGameRating ? 'yellow' : 'none'} />
							<input
								type="radio"
								id="star-{index + 1}"
								name="gameRating"
								class="sr-only"
								bind:group={currentGameRating}
								value={index + 1}
								required
							/>
						</label>
					{/each}
				</div>
				{#if form?.gameRatingMissing}
					<p class="text-red-500 text-sm text-center my-4">Arvio puuttuu</p>
				{/if}
			</fieldset>
			<div class="flex justify-center">
				<input
					type="submit"
					value="Tallenna arvio"
					class="px-3 py-2 text-sm bg-slate-600 rounded-lg text-white inline-block"
					class:bg-slate-200={currentGameRating === 0}
					disabled={currentGameRating === 0}
				/>
			</div>
		</form>
	{/if}
	{#if form?.gameRatedSuccessfully}
		<div class="text-center mb-8">
			{#if Number(form?.gameRating) >= 3}
				<h3 class="text-xl font-bold mb-2">Mahtavaa!</h3>
				<p>Kiva kuulla että teillä oli hauskaa tämän leikin parissa!</p>
			{:else}
				<h3 class="text-xl font-bold mb-2">Höh!</h3>
				<p>Löytyisikö Leikkisästä jokin toinen leikki joka sopisi teille paremmin?</p>
			{/if}
		</div>
		<div class="flex justify-center">
			<Button element="a" href="/leikki">Valitse seuraava leikki</Button>
		</div>
	{/if}
</div>
