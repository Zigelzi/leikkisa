import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const gameTypeId = Number(params.id);
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
