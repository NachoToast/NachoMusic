/**
 * Custom user-defined events for communicating between app and extensions.
 *
 * Because the app receives all events in a {@link CustomEvent} object, we must
 * define 2 nearly-identical handlers for each event.
 */
export interface CustomEvents {
    testEvent: {
        appHandler: (message: CustomEvent<string>) => void;
        generalHandler: (message: string) => void;
    };
}
