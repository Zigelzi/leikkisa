<script lang="ts">
	export let element = 'button' || 'a';
</script>

<svelte:element
	this={element}
	class="px-3 py-2 text-sm bg-slate-600 rounded-lg text-white inline-block"
	{...$$restProps}
	on:click
	role="button"
	tabindex="0"
>
	<slot />
</svelte:element>
