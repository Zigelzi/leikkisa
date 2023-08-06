import { fail } from 'assert';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const game = await prisma.game.findUnique({
		where: {
			id: Number(params.id)
		},
		include: { instructions: true, locations: true }
	});

	if (!game) {
		throw error(404, {
			message: 'Game with given ID was not found.'
		});
	}

	return { game };
};
