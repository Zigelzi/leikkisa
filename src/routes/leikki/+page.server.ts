import { type Actions, redirect, fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const gameTypes = await prisma.gameType.findMany();
	const selectedGameTypeId: string | null = url.searchParams.get('gameType');
	const gameTypeId: number | null = selectedGameTypeId !== null ? Number(selectedGameTypeId) : null;
	const selectedGameType = gameTypes.find((gameType) => gameType.id === gameTypeId) || null;

	const ageCategories = await prisma.ageCategory.findMany();
	const selectedAgeCategoryId: string | null = url.searchParams.get('ageCategory');
	const ageCategoryId: number | null =
		selectedAgeCategoryId !== null ? Number(selectedAgeCategoryId) : null;
	const selectedAgeCategory =
		ageCategories.find((ageCategory) => ageCategory.id === ageCategoryId) || null;

	let games;

	if (selectedGameTypeId === null && selectedAgeCategoryId === null) {
		games = await prisma.game.findMany({
			include: {
				locations: true,
				gameType: true,
				ageCategories: true,
				likes: true
			}
		});
	} else {
		games = await prisma.game.findMany({
			where: {
				...(gameTypeId && { gameTypeId }),
				...(ageCategoryId && {
					ageCategories: {
						some: {
							id: ageCategoryId
						}
					}
				})
			},
			include: {
				locations: true,
				gameType: true,
				ageCategories: true,
				likes: true
			}
		});
	}
	return {
		games,
		gameTypes,
		ageCategories,
		selectedGameType,
		selectedAgeCategory
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
