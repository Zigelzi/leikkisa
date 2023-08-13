import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const gameTypes = await prisma.gameType.findMany();
	return json(gameTypes);
};
