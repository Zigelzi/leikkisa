import type { PageServerLoad } from '../$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	return {
		locations: await prisma.location.findMany()
	};
};
