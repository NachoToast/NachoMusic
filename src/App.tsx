import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, CssBaseline, darkScrollbar, ThemeProvider, responsiveFontSizes, Container } from '@mui/material';
import Title from './components/Title/Title';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import mainSlice from './redux/slices/main.slice';

let theme = createTheme({
    palette: {
        mode: 'dark',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: darkScrollbar(),
            },
        },
    },
});

const store = configureStore({
    reducer: {
        main: mainSlice,
    },
});

theme = responsiveFontSizes(theme, { factor: 4 });

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container>
                    <Title />
                </Container>
            </ThemeProvider>
        </Provider>
    </StrictMode>,
    document.getElementById('root'),
);
