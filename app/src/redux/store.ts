import { configureStore } from '@reduxjs/toolkit';
import mainSlice, { State as MainState } from './slices/mainSlice';
import settingsSlice, { State as SettingsState } from './slices/settingsSlice';

export interface StoreState {
    main: MainState;
    settings: SettingsState;
}

const store = configureStore({
    reducer: {
        main: mainSlice,
        settings: settingsSlice,
    },
});

export default store;
