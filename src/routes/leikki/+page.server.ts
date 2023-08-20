import { type Actions, redirect, fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const gameTypeId: number = Number(url.searchParams.get('gameType')) || 0;
	let games;
	let gameTypes = await prisma.gameType.findMany();

	if (gameTypeId === 0) {
		games = await prisma.game.findMany({
			include: {
				locations: true,
				gameType: true
			}
		});
	} else {
		games = await prisma.game.findMany({
			where: {
				gameTypeId: gameTypeId
			},
			include: {
				locations: true,
				gameType: true
			}
		});
	}
	return {
		games,
		gameTypes
	};
};

export const actions: Actions = {
	deleteGame: async ({ url }) => {
		const id = url.searchParams.get('id');
		if (!id) {
			return fail(404, {
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
		try {
			await prisma.$transaction([deleteInstructions, deleteGame]);
			throw redirect(301, '/');
		} catch (err) {
			return fail(502, {
				message: 'Something went wrong while deleting the game. Try again later'
			});
		}
	}
};
