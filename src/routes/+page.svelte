<script lang="ts">
	import Button from '$lib/Button.svelte';
	import { currentPageTitle } from '$lib/stores';
	import { posthog } from 'posthog-js';

	$currentPageTitle = 'Etusivu';
</script>

<section class="min-h-[80vh] flex items-center">
	<div>
		<h1 class="text-8xl mb-6 font-heading">Leikkisä</h1>
		<p>Kirjasto leikeistä joiden avulla liikut ja pidät hauskaa lastesi kanssa!</p>
	</div>
</section>

<section class="mb-8">
	<div class="mb-6">
		<h2 class="text-5xl font-heading mb-6">Lisää leikki</h2>
		<p>Onko sinulla leikki jonka haluat jakaa muiden kanssa?</p>
	</div>
	<Button
		href="/leikki/lisaa"
		element="a"
		on:click={() => {
			posthog.capture('Game creation started');
		}}>Lisää se Leikkisään!</Button
	>
</section>
