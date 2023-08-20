import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const request = await fetch('/api/leikkitapa?includeGames=true');
	const gameTypes = await request.json();
	return {
		gameTypes
	};
};
