import { CustomEvents } from '../../../shared/CustomEvents';

/** Feedback for a sent {@link OutgoingMessage}. */
interface SentMessageFeedback {
    /** The sent message's {@link OutgoingMessage.id id}. */
    id: string;

    /** The sent message's {@link OutgoingMessage.method method}, always `app.broadcast`.  */
    method: 'app.broadcast';

    data: {
        /**
         * Whether the message was successfully sent.
         * TODO: Test whether other fields are included here on unsuccessful send.
         */
        success: boolean;
    };

    event?: undefined;
}

/**
 * A non-feedback message sent from app to extension.
 *
 * {@link https://neutralino.js.org/docs/how-to/extensions-overview#sending-a-message-from-the-extension-to-app API Reference}
 */
interface NewMessage {
    event: string;
    data?: unknown;
}

/**
 * A received message by the app, can either be a
 * {@link NewMessage new message} or a {@link SentMessageFeedback feedback message}.
 */
export type ReceivedMessage = SentMessageFeedback | NewMessage;

/**
 * An outgoing message, from an extension to the app.
 *
 * {@link https://neutralino.js.org/docs/how-to/extensions-overview#sending-a-message-from-the-extension-to-app API Reference}
 */
export interface OutgoingMessage<T extends keyof CustomEvents> {
    /** UUID v4 */
    id: string;
    method: 'app.broadcast';
    accessToken: string;
    data: {
        event: T;
        data: CustomEvents[T];
    };
}
