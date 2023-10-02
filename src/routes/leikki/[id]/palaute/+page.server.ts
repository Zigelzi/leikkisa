import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const gameRating = form.get('gameRating');
		const gameId = form.get('gameId');
		let isLiked: boolean = gameRating === 'liked' ? true : false;

		if (!gameRating) {
			return fail(400, { gameRatingMissing: true });
		}

		await prisma.gameLike.create({
			data: {
				gameId: Number(gameId),
				isLiked
			}
		});

		const gameLikes = await prisma.gameLike.findMany({
			where: {
				AND: [
					{
						gameId: Number(gameId)
					},
					{
						isLiked: true
					}
				]
			}
		});

		return { gameRatedSuccessfully: true, isLiked, gameLikes };
	}
};
