/**
 * This module expects api.js to be loaded and window.gapi to be defined.
 */

import { searchTerms } from './searchTerms';

export type SearchTerm = {
	title: string;
	description: string;
	term: () => string;
	example?: string;
	excludeFromRandom?: boolean;
};

export type SearchResponse = {
	kind: 'youtube#searchListResponse';
	etag: string;
	nextPageToken: string;
	prevPageToken: string;
	regionCode: string;
	pageInfo: {
		totalResults: number;
		resultsPerPage: number;
	};
	items: SearchResult[];
};

export type SearchResult = {
	kind: 'youtube#searchResult';
	etag: string;
	id: {
		kind: string;
		videoId: string;
		channelId: string;
		playlistId: string;
	};
	snippet: {
		publishedAt: string;
		channelId: string;
		title: string;
		description: string;
		thumbnails: {
			(key: string): {
				url: string;
				width: number;
				height: number;
			};
		};
		channelTitle: string;
		liveBroadcastContent: string;
	};
};

const API_KEY = 'AIzaSyBlJ533t5_xnU8rYiNi-whBp9a1lCrNbjc';
const MAX_RESULTS = 50;

// TODO: This cache will be cleared each time the website is refreshed.
// Consider storing this in local/session storage.
const searchCache = new Map<string, SearchResponse>();

export const initializeApi = async () => {
	console.log('Initializing the YouTube API...');
	// @ts-ignore
	gapi.load('client', async () => await loadClient());
};

export const getRandomVideo = async (searchTerm: SearchTerm) => {
	return new Promise<string>(async (resolve, reject) => {
		// return; // temporary short-circuit to preserve quota
		let query = searchTerm.term();

		if (query === 'random') {
			// Get a random index between 1 and n-1, where n is the number of search term options.
			const filteredSearchTerms = searchTerms.filter((t) => !t.excludeFromRandom);
			const randomIndex = Math.floor(Math.random() * (filteredSearchTerms.length - 1));
			query = filteredSearchTerms[randomIndex].term();
		}

		if (!searchCache.has(query)) {
			const response = await performSearch(query);
			searchCache.set(query, response);
		}

		// TODO: This has the possibility of returning the same video more than
		// once. Consider removing the video from the cache as they are played and
		// refilling the cache when it's empty.
		console.log('Fetching random video from cache.');

		const cachedSearch = searchCache.get(query)!;
		const randomVideoIndex = Math.floor(Math.random() * (cachedSearch.items.length - 1));
		const randomVideoId = cachedSearch.items[randomVideoIndex].id.videoId;
		resolve(randomVideoId);
	});
};

// It seems to work without this.
const authenticate = () => {
	return new Promise<void>((resolve, reject) => {
		// @ts-ignore
		gapi.auth2
			.getAuthInstance()
			.signIn({ scope: 'https://www.googleapis.com/auth/youtube.force-ssl' })
			.then(
				() => {
					console.log('Sign-in successful');
					resolve();
				},
				(err: Error) => {
					console.error('Error signing in', err);
					reject(err);
				}
			);
	});
};

const loadClient = async () => {
	return new Promise<void>((resolve, reject) => {
		// @ts-ignore
		gapi.client.setApiKey(API_KEY);

		// @ts-ignore
		gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest').then(
			() => {
				console.log('GAPI client loaded for API');
				// await loadNextVideo();
				resolve();
			},
			(err: Error) => {
				console.error('Error loading GAPI client for API', err);
				reject(err);
			}
		);
	});
};

const performSearch = async (query: string) => {
	return new Promise<SearchResponse>((resolve, reject) => {
		// @ts-ignore
		gapi.client.youtube.search
			.list({
				part: ['snippet'],
				maxResults: MAX_RESULTS,
				q: query,
				type: 'video',
				order: 'date'
			})
			.then(
				function (response: { result: SearchResponse }) {
					console.log('Response', response);
					// searchCache.set(query, response.result);
					resolve(response.result);
				},
				function (err: Error) {
					console.error('Execute error', err);
					reject(err);
				}
			);
	});
};
