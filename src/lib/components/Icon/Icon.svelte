<script lang="ts" context="module">
	import icons from '$lib/components/Icon/icons';
</script>

<script lang="ts">
	export let name: string = 'telescope';
	export let size: 'xl' | 'lg' | 'm' | 's' = 'm';
	export let fill = 'none';
	$: scaleValue = setIconSize(size);

	function setIconSize(newSize: string): number {
		switch (newSize) {
			case 'xl':
				return 200;
			case 'lg':
				return 150;
			case 'm':
				return 100;
			case 's':
				return 50;
			default:
				return 100;
		}
	}

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
	class="overflow-visible w-8 scale-{scaleValue}"
	{fill}
	stroke="currentColor"
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke-width="32"
	on:click
	on:keyup
	role="button"
	tabindex="0"
>
	{#each paths as path}
		<path d={path} />
	{/each}
</svg>
