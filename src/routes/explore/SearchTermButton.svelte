<script lang="ts">
	import type { SearchTerm } from './+page.svelte';

	export let term: SearchTerm;
	$: searchTerm = term.term();
</script>

<button on:click>
	<span class="title">{term.title}</span>
	<span class="description">{term.description}</span>
	{#if searchTerm !== 'random'}
		<a
			title={`Search "${searchTerm}" on YouTube`}
			href={`https://www.youtube.com/results?search_query=${searchTerm}`}
			target="_blank">⇗</a
		>
	{/if}
</button>

<style>
	button {
		background: #191e29;
		font-size: 0.8rem;
		width: 100%;
		color: #e1e8f5;
		text-align: left;
		gap: 0.1rem;

		display: grid;
		grid-template:
			'title link'
			'description link'
			/ 1fr 1rem;
	}

	.title {
		grid-area: title;
	}

	.description {
		grid-area: description;
		font-size: 0.9em;
		opacity: 0.8;
	}

	a {
		grid-area: link;
		font-size: 1.5em;
		width: 1.5em;
		height: 1.5em;
		text-align: center;
		text-decoration: none;
		margin-top: auto;
		margin-bottom: auto;
	}

	a:hover {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 3px;
	}
</style>
