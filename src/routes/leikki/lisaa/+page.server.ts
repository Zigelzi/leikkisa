import { error, type Actions, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	createGame: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const description = data.get('description') as string;

		if (!hasRequiredFields(data))
			throw error(400, {
				message: 'Required fields missing'
			});

		const newGame = await prisma.game.create({
			data: {
				name,
				description,
				instructions: {
					create: { content: 'Testing' }
				}
			}
		});

		throw redirect(303, `/leikki/${String(newGame.id)}`);
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
