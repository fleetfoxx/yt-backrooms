<script lang="ts">
	export let title: string = '';
	export let description: string = '';
	// export let example: string | undefined = '';
</script>

<button on:click>
	<span class="title">{title}</span>
	<span class="description">{description}</span>
</button>

<style>
	button {
		background: #191e29;
		font-size: 0.8rem;
		width: 100%;
		color: #e1e8f5;
		text-align: left;
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	button > .description {
		font-size: 0.9em;
		opacity: 0.8;
	}
</style>
