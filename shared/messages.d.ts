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
    extensionError: {
        appHandler: (error: CustomEvent<[{ id: string; message: string; stack: string; name: string }]>) => void;
        generalHandler: (error: { id: string; message: string; stack: string; name: string }) => void;
    };
    extensionLog: {
        appHandler: (log: CustomEvent<[{ id: string; message: unknown }]>) => void;
        generalHandler: (log: { id: string; message: unknown }) => void;
    };
    youtubeSearchQuery: {
        appHandler: (queryString: CustomEvent<[string]>) => void;
        generalHandler: (queryString: string) => void;
    };
    youtubeSearchResult: {
        appHandler: (results: unknown) => void;
        generalHandler: (results: unknown) => void;
    };
}
