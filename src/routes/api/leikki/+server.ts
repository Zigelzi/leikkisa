import { error, json, type RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const GET: RequestHandler = async ({ url }) => {
	const gameTypeId: number = Number(url.searchParams.get('gameType')) || 0;
	let games;

	if (gameTypeId === 0) {
		games = await prisma.game.findMany();
	} else {
		games = await prisma.game.findMany({
			where: {
				gameTypeId: gameTypeId
			}
		});
	}

	return json(games);
};

export const POST: RequestHandler = async ({ request }) => {
	const gameData = (await request.json()) as Game;

	if (!gameData.name) {
		throw error(400, 'Leikin nimi puuttuu');
	}

	if (!gameData.description) {
		throw error(400, 'Leikin kuvaus puuttuu');
	}

	const createdGame = await prisma.game.create({
		data: {
			name: gameData.name,
			description: gameData.description,
			instructions: {
				create: gameData.instructions
			},
			locations: {
				connect: {
					id: Number(gameData.locationId)
				}
			},
			gameType: {
				connect: {
					id: Number(gameData.gameTypeId)
				}
			}
		}
	});
	return json(createdGame);
};
