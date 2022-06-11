import React from 'react';
import { createTheme, CssBaseline, darkScrollbar, ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ExtensionLogger, { WatchEventLevels } from './classes/ExtensionHelper';
import Settings from './classes/Settings';
import SongManager from './classes/SongManager';

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
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>,
);

Neutralino.init();
Settings.getInstance();
SongManager.getInstance();

function main() {
    // Neutralino.init();

    ExtensionLogger.add(
        'js.neutralino.sample.my_nodejs_extension',
        [WatchEventLevels.Errors, WatchEventLevels.Logs],
        'sampleExt',
    );

    ExtensionLogger.add('js.nachotoast.youtubesearch', 'ALL', 'ytsr');

    // ExtensionLogger.addEvent('ytsr', 'youtubeSearchResult', (e) => console.log(e));
    // ExtensionLogger.addEvent('ytsr', 'extensionError', (e) => console.log(e));
    // ExtensionLogger.addEvent('ytsr', 'extensionLog', (e) => console.log(e));

    (window as unknown as { extTest: (value: string) => void }).extTest = (queryString: string) => {
        // const value = Math.random().toString(36).substring(2);
        console.log(`Calling extension with input: ${queryString}`);

        Neutralino.extensions.dispatch('js.nachotoast.youtubesearch', 'youtubeSearchQuery', { queryString, limit: 10 });
    };

    // document.getElementById('songSearchInputGoButton')!.onclick = () => {
    //     const queryString = (document.getElementById('songSearchInput')! as HTMLInputElement).value;

    //     console.log('querying with value', queryString);

    //     // Neutralino.events.dispatch('youtubeSearchQuery', queryString);
    // };
}

main();
