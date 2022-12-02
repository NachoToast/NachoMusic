import { TypedEmitter } from 'tiny-typed-emitter';
import { getProcessArgs, ProcessArgs } from './getProcessArgs';
import { ICloseEvent, IMessageEvent, w3cwebsocket as W3CWebsocket } from 'websocket';
import { v4 as uuid } from 'uuid';
import { CustomEvents } from '../../../shared/CustomEvents';
import { ReceivedMessage, OutgoingMessage } from './BasicSocketMessages';

type SocketEvents = { [K in keyof CustomEvents]: (data: CustomEvents[K]) => void } & { ready: () => void };

export default class BasicSocket {
    public readonly events = new TypedEmitter<SocketEvents>();

    private readonly _processArgs: ProcessArgs = getProcessArgs();

    private readonly _webSocket = new W3CWebsocket(this._url);

    /** The extension ID of the connected websocket. */
    public get id(): string {
        return this._processArgs.extensionId;
    }

    /** Port of the Neutralino app instance. */
    public get port(): number {
        return this._processArgs.port;
    }

    private get _url(): string {
        return `ws://localhost:${this.port}?extensionId=${this.id}`;
    }

    public constructor() {
        this._webSocket.onclose = (e) => this.handleClose(e);
        this._webSocket.onerror = (e) => this.handleError(e);
        this._webSocket.onmessage = (e) => this.handleMessage(e);
        this._webSocket.onopen = () => this.handleOpen();
    }

    private handleClose(e: ICloseEvent): void {
        process.exit(e.code);
    }

    /** Sends an error message to the main app instance. */
    public handleError({ message, name, stack }: Error, fromSend: boolean = false): void {
        if (fromSend) {
            // the error comes from a send message attempt,
            // which means we can't log it (aka send a message about it)
            // since that would just generate more errors
            // so just have to silently fail :(
            return;
        }

        this.send('extensionError', { id: this.id, message, name, stack: stack ?? 'Unknown' });
    }

    private handleMessage({ data }: IMessageEvent): void {
        if (typeof data !== 'string') return;

        let payload: ReceivedMessage;

        try {
            payload = JSON.parse(data);
        } catch (error) {
            if (error instanceof Error) this.handleError(error);
            else this.handleError(new Error(`Failed to parse JSON: ${data}`));
            return;
        }

        if (payload?.event === undefined) {
            // no event specified = feedback from previously emitted message, or a message of unrecognised shape

            // TODO: we can check if the message was successfully emitted by comparing id
            return;
        }

        if (payload.event === 'windowClose') {
            // close websocket if we somehow receive this event
            // shouldn't happen since this process is terminated by app on close
            this._webSocket.close(0, 'app exited');
            return;
        }

        if (payload.event === 'appClientConnect') {
            this.events.emit('ready');
            return;
        }

        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.events.emit(payload.event as keyof CustomEvents, payload.data as any);
        } catch (error) {
            if (error instanceof Error) this.handleError(error);
            else
                this.handleError(
                    new Error(`Unknown error occurred handling message (${payload.event}): ${payload.data}`),
                );
        }
    }

    private handleOpen(): void {
        // currently we don't need to do anything once the websocket has opened,
        // since communication can only start once the app is ready
    }

    /** Sends a custom event payload to the main app instance. */
    public send<T extends keyof CustomEvents>(event: T, data: CustomEvents[T]): void {
        try {
            const message: OutgoingMessage<T> = {
                id: uuid(),
                method: 'app.broadcast',
                accessToken: this._processArgs.accessToken,
                data: { event, data },
            };

            this._webSocket.send(JSON.stringify(message));
        } catch (error) {
            this.handleError(
                error instanceof Error ? error : new Error(`Unknowng error occurred trying to send event ${event}`),
                event === 'extensionError',
            );
        }
    }

    /** Sends an informative logging message to the main app instance. */
    public log(...messages: unknown[]) {
        messages.forEach((message) => {
            this.send('extensionLog', { id: this.id, message });
        });
    }
}
