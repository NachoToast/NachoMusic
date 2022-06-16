export interface SearchRequest {
    queryString: string;
    limit: number;
}

interface Image {
    url: string | null;
    width: number;
    height: number;
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
    /** UUID */
    requestId: string;
    url: string;
    destinationPath: string;
    // options coming soon
}

export interface DownloadResponse {
    /** UUID */
    requestId: string;
}
