import { error, type Actions, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		games: await prisma.game.findMany()
	};
};

export const actions: Actions = {
	deleteGame: async ({ url }) => {
		const id = url.searchParams.get('id');
		if (!id) {
			throw error(404, {
				message: 'Game with given id was not found'
			});
		}
		const deleteInstructions = prisma.instruction.deleteMany({
			where: {
				gameId: Number(id)
			}
		});
		const deleteGame = prisma.game.delete({
			where: {
				id: Number(id)
			}
		});
		await prisma.$transaction([deleteInstructions, deleteGame]);

		throw redirect(301, '/');
	}
};
