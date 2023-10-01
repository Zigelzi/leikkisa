<script lang="ts">
	import type { LayoutData } from './$types';
	import { afterNavigate } from '$app/navigation';
	import { posthog } from 'posthog-js';
	import events from '$lib/events';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	export let data: LayoutData;

	const gameRouteId = '/leikki/[id]';
	const gameInstructionRouteId = '/leikki/[id]/ohje';

	let previousPage: string;
	$: previousPage = $page.url.pathname.substring(0, $page.url.pathname.lastIndexOf('/'));

	let game = data.game;
	let gameFilters: URLSearchParams;

	function emitBackEvent() {
		if ($page.route.id === gameRouteId) {
			posthog.capture(`${events.game.name} ${events.game.actions.returnedFrom}`, {
				gameId: game.id,
				gameName: game.name,
				gameType: game.gameType.name,
				source: events.game.name
			});
		}
		if ($page.route.id === gameInstructionRouteId) {
			posthog.capture(`${events.instruction.name} ${events.instruction.actions.returnedFrom}`, {
				gameId: game.id,
				gameName: game.name,
				numberOfInstructions: Number(game.instructions.length),
				location: game.locations[0] ? game.locations[0].name : null,
				source: events.instruction.name
			});
		}
	}

	afterNavigate(({ from }) => {
		if (from?.url.searchParams && from?.url.searchParams.size > 0) {
			gameFilters = from?.url.searchParams;
		}

		if ($page.route.id === gameRouteId && gameFilters) {
			previousPage += '?' + gameFilters;
		}
	});
</script>

<div class="mt-2 mb-8">
	<a href={previousPage} class="underline underline-offset-8" on:click={emitBackEvent}>Takaisin</a>
</div>
<div class="mb-4">
	<h2 class="text-4xl font-bold sm:text-4xl font-heading">{game.name}</h2>
	<div class="flex justify-between">
		<p class="text-sm capitalize text-slate-600">
			{game.gameType.name}
		</p>
		<p class="text-sm text-slate-600">
			Tykätty {data.likes} kertaa
		</p>
	</div>
</div>

<slot />
