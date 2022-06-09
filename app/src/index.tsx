import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ExtensionLogger, { WatchEventLevels } from './classes/ExtensionHelper';
import Settings from './classes/Settings';
import SongManager from './classes/SongManager';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

Neutralino.init();

function main() {
    Neutralino.init();

    ExtensionLogger.add(
        'js.neutralino.sample.my_nodejs_extension',
        [WatchEventLevels.Errors, WatchEventLevels.Logs],
        'sampleExt',
    );

    ExtensionLogger.add('js.nachotoast.youtubesearch', 'ALL', 'ytsr');

    Settings.getInstance();
    SongManager.getInstance();

    ExtensionLogger.addEvent('ytsr', 'testEvent', ({ detail }) => console.log(detail[0]));

    (window as unknown as { extTest: () => void }).extTest = () => {
        const value = Math.random().toString(36).substring(2);
        console.log(`Calling extension with input: ${value}`);

        Neutralino.extensions.dispatch('js.nachotoast.youtubesearch', 'testEvent', value);
    };

    document.getElementById('songSearchInputGoButton')!.onclick = () => {
        const queryString = (document.getElementById('songSearchInput')! as HTMLInputElement).value;

        console.log('querying with value', queryString);

        Neutralino.events.dispatch('youtubeSearchQuery', queryString);
    };
}

main();
