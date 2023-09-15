<script lang="ts">
	export const ssr = false;

	import SearchTermButton from './SearchTermButton.svelte';
	import YouTube from './YouTube.svelte';
	import type { SearchTerm } from './+page.svelte';
	import { onMount } from 'svelte';
	import { searchTerms } from './searchTerms';
	import { getRandomVideo, initializeApi } from './youTubeApi';
	import Logo from '../Logo.svelte';

	$: currentSearchTerm = searchTerms[0];
	$: videoId = '';

	onMount(async () => {
		await initializeApi();
		videoId = await getRandomVideo(currentSearchTerm);
	});

	const handleSearchTermClick = async (searchTerm: SearchTerm) => {
		currentSearchTerm = searchTerm;
		videoId = await getRandomVideo(searchTerm);
	};

	const loadNextVideo = async () => {
		videoId = await getRandomVideo(currentSearchTerm);
	};
</script>

<svelte:head>
	<script src="https://apis.google.com/js/api.js"></script>
</svelte:head>

<div class="container">
	<div class="left-panel">
		<div class="header">
			<a id="home-link" title="return home" href="/">↩</a>
			<h5 id="category-title">Categories</h5>
			<span class="spacer" />
		</div>

		{#each Object.values(searchTerms) as term}
			<SearchTermButton {term} on:click={() => handleSearchTermClick(term)} />
		{/each}
	</div>

	<div class="right-panel">
		<Logo />
		<h4>Current category: {currentSearchTerm.title}</h4>
		<YouTube {videoId} options={{ width: 960, height: 540, playerVars: { autoplay: 1 } }} />
		<!-- TODO: add video info and rarity -->
		<button on:click={loadNextVideo}>Next ↝</button>
	</div>
</div>

<style>
	.container {
		display: flex;
		height: 100vh;
	}

	.left-panel {
		background: #0b0e14;
		width: 300px;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.5rem;
		height: 100%;
		overflow-y: scroll;
	}

	.left-panel > .header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	#category-title {
		margin: 0.5rem;
	}

	.right-panel {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	button {
		margin: 1rem;
	}

	#home-link {
		text-decoration: none;
	}
</style>
