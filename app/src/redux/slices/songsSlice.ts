import { createSlice } from '@reduxjs/toolkit';
import { StoredYoutubeVideo } from '../../../../shared/YouTube';
import { FILES } from '../../classes/TrackedFile';
import { DownloadedSongs } from '../../typings/DownloadedSongs';
import { StoreState } from '../store';

export interface State {
    downloads?: DownloadedSongs;
}

export const initialState: State = {};

const songsSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        setDownloads(state, action: { payload: DownloadedSongs }) {
            state.downloads = action.payload;
            FILES.DownloadedSongsFile.save(state.downloads);
        },
        addSongs(state, action: { payload: StoredYoutubeVideo[] }) {
            if (state.downloads === undefined) {
                throw new Error(`Trying to add songs before loaded!`);
            }
            action.payload.forEach((video) => {
                state.downloads!.items[video.id] = video;
            });

            FILES.DownloadedSongsFile.save(state.downloads!);
        },
    },
});

export const { setDownloads, addSongs } = songsSlice.actions;

export const getDownloadedSongs = (state: StoreState) => state.songs.downloads;

export default songsSlice.reducer;
