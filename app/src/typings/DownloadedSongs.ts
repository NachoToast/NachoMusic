import { StoredYoutubeVideo } from '../../../shared/YouTube';

export interface DownloadedSongs {
    /** Indexed by YouTube video ID */
    items: Record<string, StoredYoutubeVideo>;
}

export const DefaultDownloadedSongs: DownloadedSongs = {
    items: {},
};
