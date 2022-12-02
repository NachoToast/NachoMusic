import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

Neutralino.events.on('extensionLog', ({ detail: { id, message } }) => {
    console.log(`[${id}]`, message);
});

Neutralino.events.on('extensionError', ({ detail: error }) => {
    console.log(error.id, error.name, error.message, error.stack);
});

Neutralino.events.on('extensionReady', ({ detail: id }) => {
    console.log(`${id} ready`);
});

Neutralino.init();
