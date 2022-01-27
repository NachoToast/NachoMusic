import { createSlice } from '@reduxjs/toolkit';
import StoreState from '../state';

export interface State {
    time: number;
}

export const initialState: State = {
    time: -1,
};

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        incrementTime(state) {
            state.time++;
        },
    },
});

export const { incrementTime } = mainSlice.actions;

export default mainSlice.reducer;

export const getTime = (state: StoreState): number => state.main.time;
