<script lang="ts">
	import AddGameForm from '$lib/AddGameForm.svelte';
	import Button from '$lib/Button.svelte';
</script>

<div class="max-w-xl mx-auto">
	<div class="mb-8">
		<Button href="/" element="a">Etusivulle</Button>
	</div>
	<h2 class="text-4xl font-heading mb-6">Lisää leikki</h2>
	<AddGameForm />
</div>
