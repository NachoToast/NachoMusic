import { createSlice } from '@reduxjs/toolkit';
import StoreState from '../state';

export interface State {
    time: number;
    videoURL: string | null;
}

export const initialState: State = {
    time: -1,
    videoURL: null,
};

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        incrementTime(state) {
            state.time++;
        },
        setVideoURL(state, { payload }: { payload: string | null }) {
            state.videoURL = payload;
        },
    },
});

export const { incrementTime, setVideoURL } = mainSlice.actions;

export default mainSlice.reducer;

export const getTime = (state: StoreState): number => state.main.time;

export const getVideoURL = (state: StoreState): string | null => state.main.videoURL;
