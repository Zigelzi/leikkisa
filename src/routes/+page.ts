import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const request = await fetch('/api/leikkitapa?includeGames=true');
	const gameTypes = await request.json();
	return {
		gameTypes
	};
};
