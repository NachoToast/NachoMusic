import React from 'react';
import { createTheme, CssBaseline, darkScrollbar, ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
    transitions: {
        easing: {
            easeInOut: 'cubic-bezier(0,.44,.2,1)',
        },
    },
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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </Provider>,
);

Neutralino.events.on('extensionLog', ({ detail }) => {
    console.log(`[${detail[0].id}]`, detail[0].message);
});

Neutralino.events.on('extensionError', ({ detail }) => {
    console.error(detail[0].id, detail[0].name, detail[0].message, detail[0].stack);
});

Neutralino.events.on('extensionReady', ({ detail }) => {
    console.log(`${detail} ready`);
});

Neutralino.init();
