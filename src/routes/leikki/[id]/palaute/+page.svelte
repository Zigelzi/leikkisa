<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	const numberOfStars = 5;
	let likeStatus: 'liked' | 'disliked' | undefined;
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
				<legend class="text-center mx-auto">Tykkäsittekö tästä leikistä?</legend>

				<div class="flex space-x-16 my-16 justify-center">
					<label for="thumbs-down">
						<Icon name="thumbs-down" size="xl" fill={likeStatus === 'disliked' ? 'red' : 'none'} />
						<input
							type="radio"
							id="thumbs-down"
							name="gameRating"
							class="sr-only"
							bind:group={likeStatus}
							value="disliked"
							required
						/>
					</label>
					<label for="thumbs-up">
						<Icon name="thumbs-up" size="xl" fill={likeStatus === 'liked' ? 'green' : 'none'} />
						<input
							type="radio"
							id="thumbs-up"
							name="gameRating"
							class="sr-only"
							bind:group={likeStatus}
							value="liked"
							required
						/>
					</label>
				</div>
				{#if form?.gameRatingMissing}
					<p class="text-red-500 text-sm text-center my-4">Arvio puuttuu</p>
				{/if}
			</fieldset>
			<div class="flex justify-center">
				<input
					type="submit"
					value="Tallenna arvio"
					class="px-3 py-2 text-sm rounded-lg text-white inline-block
					{likeStatus === undefined ? 'bg-slate-200' : 'bg-slate-600'}"
					disabled={likeStatus === undefined}
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
