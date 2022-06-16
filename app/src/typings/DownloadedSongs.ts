import { StoredYoutubeVideo } from '../../../shared/YouTube';

export interface DownloadedSongs {
    items: Record<string, StoredYoutubeVideo>;
}

export const DefaultDownloadedSongs: DownloadedSongs = {
    items: {},
};
