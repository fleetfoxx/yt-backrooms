<script lang="ts">
	export const ssr = false;

	import SearchTermButton from './SearchTermButton.svelte';
	import YouTube from './YouTube.svelte';
	import type { SearchResponse, SearchResult, SearchTerm } from './+page.svelte';
	import { onMount } from 'svelte';
	import { searchTerms } from './searchTerms';

	const API_KEY = 'AIzaSyBlJ533t5_xnU8rYiNi-whBp9a1lCrNbjc';

	// TODO: This cache will be cleared each time the website is refreshed.
	// Consider storing this in local/session storage.
	const searchCache = new Map<string, SearchResponse>();

	// onMount(async () => {
	// 	authenticate();
	// 	loadClient();
	// 	// loadNextVideo();
	// });

	$: currentSearchTerm = searchTerms[0];
	$: videoId = '';

	const handleSearchTermClick = (searchTerm: SearchTerm) => {
		currentSearchTerm = searchTerm;
		loadNextVideo();
	};

	const loadNextVideo = () => {
		// return; // temporary short-circuit to preserve quota
		const maxResults = 50;
		let query = currentSearchTerm.term();

		if (query === 'random') {
			// Get a random index between 1 and n-1, where n is the number of search term options.
			const randomIndex = Math.floor(Math.random() * searchTerms.length - 2) + 1;
			query = searchTerms[randomIndex].term();
		}

		if (searchCache.has(query)) {
			// TODO: This has the possibility of returning the same video more than
			// once. Consider removing the video from the cache as they are played and
			// refilling the cache when it's empty.
			console.log('Loading video from cache.');

			const cachedSearch = searchCache.get(query)!;
			const randomVideoIndex = Math.floor(Math.random() * (cachedSearch.items.length - 1));
			const randomVideoId = cachedSearch.items[randomVideoIndex].id.videoId;
			videoId = randomVideoId;
			return;
		} else {
			// @ts-ignore
			return gapi.client.youtube.search
				.list({
					part: ['snippet'],
					maxResults,
					q: query,
					type: 'video',
					order: 'date'
				})
				.then(
					function (response: { result: SearchResponse }) {
						// Handle the results here (response.result has the parsed body).
						console.log('Response', response);

						const randomVideoIndex = Math.floor(Math.random() * (response.result.items.length - 1));
						const randomVideoId = response.result.items[randomVideoIndex].id.videoId;
						videoId = randomVideoId;

						searchCache.set(query, response.result);
					},
					function (err: Error) {
						console.error('Execute error', err);
					}
				);
		}
	};

	const authenticate = () => {
		// @ts-ignore
		return gapi.auth2
			.getAuthInstance()
			.signIn({ scope: 'https://www.googleapis.com/auth/youtube.force-ssl' })
			.then(
				() => {
					console.log('Sign-in successful');
				},
				(err: Error) => {
					console.error('Error signing in', err);
				}
			);
	};

	const loadClient = () => {
		// console.log('Loading GAPI client');
		// @ts-ignore
		gapi.client.setApiKey(API_KEY);
		// @ts-ignore
		return gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest').then(
			() => {
				console.log('GAPI client loaded for API');
				loadNextVideo();
			},
			(err: Error) => {
				console.error('Error loading GAPI client for API', err);
			}
		);
	};

	const initializeGapi = async () => {
		console.log('Initialize GAPI');
		// @ts-ignore
		gapi.load('client', loadClient);
	};
</script>

<svelte:head>
	<script src="https://apis.google.com/js/api.js" on:load={initializeGapi}></script>
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
		<h4>Current category: {currentSearchTerm.title}</h4>
		<YouTube {videoId} options={{ width: 960, height: 540, playerVars: { autoplay: 1 } }} />
		<!-- TODO: add video info and rarity -->
		<button on:click={loadNextVideo}>next</button>
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
		justify-content: center;
		align-items: center;
	}

	button {
		margin: 1rem;
	}

	#home-link {
		text-decoration: none;
	}
</style>
