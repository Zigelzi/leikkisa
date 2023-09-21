<script lang="ts">
	import type { LayoutData } from './$types';
	import { afterNavigate } from '$app/navigation';
	import { posthog } from 'posthog-js';
	import { page } from '$app/stores';

	export let data: LayoutData;
	let previousPage: string = $page.url.pathname.substring(0, $page.url.pathname.lastIndexOf('/'));
	let game = data.game;

	function emitBackToGamesEvent() {
		posthog.capture('Game list navigated', {
			gameId: game.id,
			gameName: game.name,
			gameType: game.gameType.name,
			source: 'game'
		});
	}

	afterNavigate(({ from }) => {
		// TODO: Fix back button going to previous page, not to parent path.
		let previousPageWithSearchParams: string | undefined = from?.url.pathname;
		if (from?.url.searchParams && from?.url.searchParams.size > 0) {
			previousPageWithSearchParams += '?' + from?.url.searchParams;
		}
		previousPage = previousPageWithSearchParams || previousPage;
	});
	$: console.log(previousPage);
</script>

<div class="mt-2 mb-8">
	<a href={previousPage} class="underline underline-offset-8" on:click={emitBackToGamesEvent}
		>Takaisin</a
	>
</div>
<slot />
