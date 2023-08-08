<script>
	import '../app.css';
	import Navigation from '$lib/Navigation.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { posthog } from 'posthog-js';

	$: $page.url.pathname, browser && posthog.capture('$pageview');
</script>

<header>
	<Navigation />
</header>
<main class="container mx-auto px-4 my-8 xl:max-w-4xl">
	<slot />
</main>
