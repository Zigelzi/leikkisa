import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const gameRating = form.get('gameRating');

		if (!gameRating) {
			return fail(400, { gameRatingMissing: true });
		}
		// TODO: Add rating to games
		// TODO: Store rating to DB.
		return { gameRatedSuccessfully: true, gameRating };
	}
};
