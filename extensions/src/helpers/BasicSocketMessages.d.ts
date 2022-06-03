import { CustomEvents } from '../../../shared/messages';

/** Base message type, at this point we have no idea what it's shape is. */
interface BaseMessage {
    event?: string;
}

/** Feedback for a sent {@link OutgoingMessage}. */
interface SentMessageFeedback extends BaseMessage {
    /** The sent message's {@link OutgoingMessage.id id}. */
    id: string;
    /** The sent message's {@link OutgoingMessage.method method}, always `app.broadcast`.  */
    method: 'app.broadcast';
    data: {
        /**
         * Whether the message was successfully sent.
         * @todo Test whether other fields are included here on unsuccessful send.
         */
        success: boolean;
    };
    /** Asserting the {@link BaseMessage.event event} property is undefined. */
    event?: undefined;
}

/**
 * A non-feedback message sent from app to extension.
 *
 * {@link https://neutralino.js.org/docs/how-to/extensions-overview#sending-a-message-from-the-extension-to-app API Reference}
 */
interface NewMessage extends BaseMessage {
    event: string;
    data?: unknown;
}

/**
 * A received message by the app, can either be a
 * {@link NewMessage new message} or a {@link SentMessageFeedback feedback message}.
 */
export type ReceivedMessage = SentMessageFeedback | NewMessage;

/**
 * An outgoing message, from extension socket to app.
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
        data: Parameters<CustomEvents[T]['generalHandler']>;
    };
}
