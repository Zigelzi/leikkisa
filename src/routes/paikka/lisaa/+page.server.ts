import { fail, type Actions } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const locationName = data.get('name') as string;

		if (!locationName) {
			return fail(400, { locationName, missing: true });
		}

		const createdLocation = await prisma.location.create({
			data: {
				name: locationName
			}
		});

		return { success: true, data: createdLocation };
	}
};
