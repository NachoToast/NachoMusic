import { ytsr } from './ytsr';

/**
 * Custom user-defined events for communicating between app and extensions.
 *
 * Because the app receives all events in a {@link CustomEvent} object, we must
 * define 2 nearly-identical handlers for each event.
 */
export interface CustomEvents {
    testEvent: {
        appHandler: (message: CustomEvent<[string]>) => void;
        generalHandler: (message: string) => void;
    };
    // general events
    extensionError: {
        appHandler: (error: CustomEvent<[{ id: string; message: string; stack: string; name: string }]>) => void;
        generalHandler: (error: { id: string; message: string; stack: string; name: string }) => void;
    };
    extensionLog: {
        appHandler: (log: CustomEvent<[{ id: string; message: unknown }]>) => void;
        generalHandler: (log: { id: string; message: unknown }) => void;
    };
    // youtube search messages
    youtubeSearchQuery: {
        appHandler: (query: CustomEvent<[{ queryString: string; limit: number }]>) => void;
        generalHandler: (query: { queryString: string; limit: number }) => void;
    };
    youtubeSearchResult: {
        appHandler: (results: CustomEvent<[ytsr.Result]>) => void;
        generalHandler: (results: ytsr.Result) => void;
    };
    // file server messages
    fileServerInfo: {
        appHandler: (port: CustomEvent<[number]>) => void;
        generalHandler: (port: number) => void;
    };
}
