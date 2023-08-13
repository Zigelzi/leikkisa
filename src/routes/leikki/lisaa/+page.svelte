<script lang="ts">
	import type { PageData } from './$types';
	import AddGameForm from './AddGameForm.svelte';

	export let data: PageData;

	const locations = data.locations;
	const gameTypes = data.gameTypes;
</script>

<h2 class="text-4xl font-heading mb-6">Lisää leikki</h2>
<AddGameForm {locations} {gameTypes} />
