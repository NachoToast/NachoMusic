import { SearchRequest, SearchResponse } from './YouTube';

/**
 * Custom user-defined events for communicating between app and extensions.
 *
 * Because the app receives all events in a {@link CustomEvent} object, we must
 * define 2 nearly-identical handlers for each event.
 */
export interface CustomEvents {
    // general
    extensionError: {
        appHandler: (error: CustomEvent<[{ id: string; message: string; stack: string; name: string }]>) => void;
        generalHandler: (error: { id: string; message: string; stack: string; name: string }) => void;
    };
    extensionLog: {
        appHandler: (log: CustomEvent<[{ id: string; message: unknown }]>) => void;
        generalHandler: (log: { id: string; message: unknown }) => void;
    };
    // youtube search
    youtubeSearchQuery: {
        appHandler: (query: CustomEvent<[SearchRequest]>) => void;
        generalHandler: (query: SearchRequest) => void;
    };
    youtubeSearchResult: {
        appHandler: (results: CustomEvent<[SearchResponse]>) => void;
        generalHandler: (results: SearchResponse) => void;
    };
    // file server
    fileServerInfo: {
        appHandler: (port: CustomEvent<[number]>) => void;
        generalHandler: (port: number) => void;
    };
    // youtube download
    // youtubeDownloadStart: {
    //     appHandler: (info: CustomEvent<[{ url: string; destination: string }]>) => void;
    //     generalHandler: (info: { url: string; destination: string }) => void;
    // };
    // youtubeDownloadDone
}
