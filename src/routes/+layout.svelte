<script>
	import '../app.css';
	import Navigation from '$lib/Navigation.svelte';
</script>

<header>
	<Navigation />
</header>
<main class="container mx-auto px-4 my-8 xl:max-w-4xl">
	<slot />
</main>
