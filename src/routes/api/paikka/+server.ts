import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const locations = await prisma.location.findMany();
	return json(locations);
};
