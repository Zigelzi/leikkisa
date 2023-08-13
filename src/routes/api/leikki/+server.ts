import { error, json, type RequestHandler } from '@sveltejs/kit';

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
