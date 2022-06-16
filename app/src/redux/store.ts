import { configureStore } from '@reduxjs/toolkit';
import mainSlice, { State as MainState } from './slices/mainSlice';
import settingsSlice, { State as SettingsState } from './slices/settingsSlice';
import songsSlice, { State as SongsState } from './slices/songsSlice';

export interface StoreState {
    main: MainState;
    settings: SettingsState;
    songs: SongsState;
}

const store = configureStore({
    reducer: {
        main: mainSlice,
        settings: settingsSlice,
        songs: songsSlice,
    },
});

export default store;
