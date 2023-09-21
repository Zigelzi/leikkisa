import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ params }) => {
	const game = await prisma.game.findUnique({
		where: {
			id: Number(params.id)
		},
		include: {
			instructions: true,
			locations: true,
			gameType: true,
			ageCategories: true
		}
	});

	if (!game) {
		throw error(404, {
			message: 'Game with given ID was not found.'
		});
	}

	return { game };
};
