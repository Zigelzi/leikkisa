<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
</script>

<div>
	<h2 class="text-4xl font-heading mb-4">Lisää paikka</h2>
	<p>Eri leikit sopivat eri paikkoihin. Lisää paikka jossa leikkiä voi leikkiä.</p>
</div>
{#if form?.success}
	<div class="my-6 p-4 bg-green-400 rounded-lg">
		<p>{form.data.name} luotiin onnistuneesti!</p>
	</div>
{/if}
<form action="" method="post" class="my-8">
	<label for="name" class="block font-bold mb-2">Nimi</label>
	<input
		type="text"
		name="name"
		id="name"
		class="border-slate-400 border-2 w-full p-2 rounded-lg"
		class:bg-red-200={form?.missing}
	/>
	{#if form?.missing}
		<p class="mt-2 text-red-500 text-sm">Paikan nimi puuttuu</p>
	{/if}
	<div class="mt-8">
		<Button element="button" type="submit">Lisää paikka</Button>
	</div>
</form>
