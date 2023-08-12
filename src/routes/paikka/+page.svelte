<script lang="ts">
	import Button from '$lib/Button.svelte';
	import { currentPageTitle } from '$lib/stores';
	import type { PageData } from './$types';

	export let data: PageData;

	$currentPageTitle = 'Paikka';
	let locations = data.locations;
</script>

<h2 class="font-heading text-6xl mb-4">Paikat</h2>
{#if locations.length > 0}
	<ol class="space-y-2">
		{#each locations as location}
			<li class="flex justify-between">
				<span>{location.name}</span><Button element="button">X</Button>
			</li>
		{/each}
	</ol>
{/if}
