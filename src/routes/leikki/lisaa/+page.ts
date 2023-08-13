import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const locationResponse = await fetch('/api/paikka');
	const gameTypeResponse = await fetch('/api/leikkitapa');
	if (locationResponse.ok && gameTypeResponse.ok) {
		return {
			locations: await locationResponse.json(),
			gameTypes: await gameTypeResponse.json()
		};
	}
};
