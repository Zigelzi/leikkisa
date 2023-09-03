<script lang="ts" context="module">
	import icons from '$lib/components/Icon/icons';
</script>

<script lang="ts">
	export let name: string = 'telescope';

	$: paths = getIconPaths();

	function getIconPaths(): string[] {
		const icon = icons.find((icon) => icon.name === name) || icons[0];
		return icon.paths;
	}
</script>

<svg
	viewBox="0 0 512 512"
	fill-rule="evenodd"
	clip-rule="evenodd"
	class="overflow-visible w-8"
	fill="none"
	stroke="currentColor"
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke-width="32"
>
	{#each paths as path}
		<path d={path} />
	{/each}
</svg>
