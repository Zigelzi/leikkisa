import posthog from 'posthog-js';
import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';

export const load: LayoutLoad = async () => {
	if (browser) {
		posthog.init('phc_3eQ8MJ5FapTO3x95QR2v1OMiGkBLpzJBUJZySQ1QQuL', {
			api_host: 'https://eu.posthog.com'
		});
		console.log('Test');
	}

	return;
};
