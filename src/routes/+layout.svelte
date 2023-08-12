<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { posthog } from 'posthog-js';
	import { currentPageTitle } from '$lib/stores';
	import Navigation from '$lib/Navigation.svelte';

	$: $page.url.pathname, browser && posthog.capture('$pageview');
</script>

<svelte:head>
	<title>Leikkisä - {$currentPageTitle}</title>
</svelte:head>
<header>
	<Navigation />
</header>
<main class="container mx-auto px-4 my-8 xl:max-w-4xl">
	<slot />
</main>
