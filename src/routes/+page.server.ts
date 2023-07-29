import type { Actions } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { fail } from 'assert';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		games: await prisma.game.findMany()
	};
};

export const actions: Actions = {
	createGame: async ({ request }) => {
		const { name, description } = Object.fromEntries(await request.formData()) as {
			name: string;
			description: string;
		};

		try {
			await prisma.game.create({
				data: {
					name,
					description
				}
			});
		} catch (err) {
			console.log(err);
			return fail('Could not create a new game.');
		}

		return {
			status: 201
		};
	}
};
