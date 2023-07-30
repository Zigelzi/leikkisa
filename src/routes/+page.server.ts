import { error, type Actions } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		games: await prisma.game.findMany()
	};
};

export const actions: Actions = {
	createGame: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const description = data.get('description') as string;

		if (!hasRequiredFields(data))
			throw error(400, {
				message: 'Required fields missing'
			});

		await prisma.game.create({
			data: {
				name,
				description
			}
		});

		return {
			status: 201
		};
	},

	deleteGame: async ({ url }) => {
		const id = url.searchParams.get('id');
		if (!id) {
			throw error(404, {
				message: 'Game with given id was not found'
			});
		}
		await prisma.game.delete({
			where: {
				id: Number(id)
			}
		});

		return {
			status: 201
		};
	}
};

function hasRequiredFields(form: FormData) {
	const name = form.get('name');
	const description = form.get('description');

	if (!name || !description) {
		return false;
	}

	return true;
}
