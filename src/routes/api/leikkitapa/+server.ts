import { json, type RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const GET: RequestHandler = async ({ url }) => {
	const includeGames = Boolean(url.searchParams.get('includeGames')) || false;
	const gameTypes = await prisma.gameType.findMany({
		include: {
			games: includeGames
		}
	});
	return json(gameTypes);
};
