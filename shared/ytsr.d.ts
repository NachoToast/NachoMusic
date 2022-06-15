export namespace ytsr {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface Continuation {}

    export interface Filter {
        url: string | null;
        name: string;
        description: string;
        active: boolean;
    }

    export interface Result {
        originalQuery: string;
        correctedQuery: string;
        results: number;
        activeFilters: Filter[];
        refinements: Refinement[];
        items: Item[];
        continuation: Continuation | null;
    }

    // Subtypes
    export interface VideoSmall {
        // Generalization for Mix and Playlist
        id: string;
        shortURL: string;
        url: string;
        title: string;
        length: string;
        thumbnails: Image[];
        bestThumbnail: Image;
    }

    export interface Image {
        url: string | null;
        width: number;
        height: number;
    }

    export interface Refinement {
        q: string;
        url: string;
        // Only provided for HorizontalCardListRenderer
        thumbnails: string[] | null;
        bestThumbnail: string | null;
    }

    // Response Items
    export interface Video {
        type: 'video';
        title: string;
        id: string;
        url: string;
        bestThumbnail: Image;
        thumbnails: Image[];
        isUpcoming: boolean;
        upcoming: number | null;
        isLive: boolean;
        badges: string[];

        author: {
            name: string;
            channelID: string;
            url: string;
            bestAvatar: Image | null;
            avatars: Image[];
            ownerBadges: string[];
            verified: boolean;
        } | null;
        description: string | null;
        views: number | null;
        duration: string | null;
        uploadedAt: string | null;
    }

    export interface Channel {
        type: 'channel';
        name: string;
        channelID: string;
        url: string;
        bestAvatar: Image;
        avatars: Image[];
        verified: boolean;
        subscribers: string | null;
        descriptionShort: string | null;
        videos: number | null;
    }

    export interface Playlist {
        type: 'playlist';
        title: string;
        playlistID: string;
        url: string;
        firstVideo: VideoSmall | null;
        owner: {
            name: string;
            channelID: string;
            url: string;
            ownerBadges: string[];
            verified: boolean;
        } | null;
        publishedAt: string | null;
        length: number;
    }

    export interface Mix {
        type: 'mix';
        title: string;
        url: string;
        firstVideo: VideoSmall;
    }

    export interface GridMovie {
        type: 'gridMovie';
        title: string;
        videoID: string;
        url: string;
        thumbnails: Image[];
        bestThumbnail: Image;
        duration: string;
    }

    export interface Movie {
        type: 'movie';
        title: string;
        videoID: string;
        url: string;
        bestThumbnail: Image;
        thumbnails: Image[];
        author: {
            name: string;
            channelID: string;
            url: string;
            ownerBadges: string[];
            verified: boolean;
        };
        description: string | null;
        meta: string[];
        actors: string[];
        directors: string[];
        duration: string;
    }

    export interface Show {
        type: 'show';
        title: string;
        thumbnails: Image[];
        bestThumbnail: Image;
        url: string;
        videoID: string;
        playlistID: string;
        episodes: number;
        owner: {
            // No owner badges in here :shrug:
            name: string;
            channelID: string;
            url: string;
        };
    }

    export interface Shelf {
        type: 'shelf';
        title: string;
        items: Item[];
    }

    export interface Clarification {
        type: 'clarification';
        title: string;
        text: string;
        sources: {
            text: string;
            url: string;
        }[];
    }

    export interface HorizontalChannelList {
        type: 'horizontalChannelList';
        title: string;
        // ATM only subtype channel supported
        channels: {
            type: 'channelPreview';
            name: string;
            channelID: string;
            url: string;
            bestAvatar: Image;
            avatars: Image[];
            subscribers: string;
            videos: Video[];
        }[];
    }

    type Item =
        | Video
        | Channel
        | Playlist
        | Mix
        | GridMovie
        | Movie
        | Show
        | Shelf
        | Clarification
        | HorizontalChannelList;
}
