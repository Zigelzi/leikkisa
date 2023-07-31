<script lang="ts">
	export let href: string = '';
	export let text: string = 'Action';
	export let type: 'submit' | 'reset' | 'button' | undefined | null = 'submit';
</script>

{#if href}
	<a {href} class="px-3 py-2 text-sm bg-slate-600 rounded-lg text-white inline-block">{text}</a>
{:else}
	<button {type} class="mt-16 block px-6 py-2 bg-slate-600 text-white rounded-lg">{text}</button>
{/if}
