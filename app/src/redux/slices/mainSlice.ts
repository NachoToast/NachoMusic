import { createSlice } from '@reduxjs/toolkit';
import { StoreState } from '../store';

export interface State {
    port: number | null;
}

export const initialState: State = {
    port: null,
};

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setPort(state, action: { payload: number }) {
            state.port = action.payload;
        },
    },
});

export const { setPort } = mainSlice.actions;

export const getPort = (state: StoreState) => state.main.port;

export default mainSlice.reducer;
