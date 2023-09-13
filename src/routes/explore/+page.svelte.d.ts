export type SearchTerm = {
	title: string;
  description: string;
  term: () => string;
	example?: string;
};

export type SearchResponse = {
  kind: 'youtube#searchListResponse';
  etag: etag;
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
	etag: etag;
	id: {
		kind: string;
		videoId: string;
		channelId: string;
		playlistId: string;
	};
	snippet: {
		publishedAt: datetime;
		channelId: string;
		title: string;
		description: string;
		thumbnails: {
			(key): {
				url: string;
				width: number;
				height: number;
			};
		};
		channelTitle: string;
		liveBroadcastContent: string;
	};
};
