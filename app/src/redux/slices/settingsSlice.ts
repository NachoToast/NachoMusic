import { createSlice } from '@reduxjs/toolkit';
import { FILES } from '../../classes/TrackedFile';
import { Settings } from '../../typings/Settings';
import { StoreState } from '../store';

export interface State {
    settings?: Settings;
}

export const initialState: State = {};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSettings(state, action: { payload: Settings }) {
            state.settings = action.payload;
            FILES.SettingsFile.save(state.settings);
        },
    },
});

// eslint-disable-next-line no-empty-pattern
export const { setSettings } = settingsSlice.actions;

export const getSettings = (state: StoreState) => state.settings;

export default settingsSlice.reducer;
