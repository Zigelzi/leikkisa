<script lang="ts">
	import type { LayoutData } from './$types';
	import { afterNavigate } from '$app/navigation';
	import { posthog } from 'posthog-js';
	import { page } from '$app/stores';

	export let data: LayoutData;

	const gameRouteId = '/leikki/[id]';
	let previousPage: string;
	$: previousPage = $page.url.pathname.substring(0, $page.url.pathname.lastIndexOf('/'));

	let game = data.game;
	let gameFilters: URLSearchParams;

	function emitBackToGamesEvent() {
		posthog.capture('Game list navigated', {
			gameId: game.id,
			gameName: game.name,
			gameType: game.gameType.name,
			source: 'game'
		});
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
	<a href={previousPage} class="underline underline-offset-8" on:click={emitBackToGamesEvent}
		>Takaisin</a
	>
</div>
<slot />
