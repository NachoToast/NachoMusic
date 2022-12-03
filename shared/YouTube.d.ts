/** A search request for YouTube videos. */
export interface SearchRequest {
    /** Whether the user wants actual video results, or just autocomplete suggestions for their search. */
    final: boolean;
    queryString: string;
    limit: number;
}

interface Image {
    url: string | null;
    width: number;
    height: number;
}

export interface StoredYoutubeVideo {
    url: string;
    id: string;
    title: string;
    artist: string;
    /** Duration in seconds. */
    duration: number;
    dateDownloaded: number;
    thumbnail: { extension: string; size: number } | null;
    size: number;
}

export interface SearchedYouTubeVideo {
    title: string;
    id: string;
    url: string;
    bestThumbnail: Image;
    badges: string[];

    author: {
        name: string;
        channelID: string;
        url: string;
        bestAvatar: Image | null;
        ownerBadges: string[];
        verified: boolean;
    } | null;

    description: string | null;
    views: number | null;
    duration: string | null;
    uploadedAt: string | null;
}

export type SearchResponse = SearchedYouTubeVideo[];

export interface DownloadRequest {
    url: string;
    destinationPath: string;
}

export type DownloadResponse = StoredYoutubeVideo;
