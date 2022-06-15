import { createSlice } from '@reduxjs/toolkit';
import { FILES } from '../../classes/TrackedFile';
import { Settings } from '../../typings/Settings';
import { StoreState } from '../store';

export interface State {
    data?: Settings;
}

export const initialState: State = {};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSettings(state, action: { payload: Settings }) {
            state.data = action.payload;
            FILES.SettingsFile.save(state.data);
        },
    },
});

// eslint-disable-next-line no-empty-pattern
export const { setSettings } = settingsSlice.actions;

export const getSettings = (state: StoreState) => state.settings.data;

export default settingsSlice.reducer;
