import { TypedEmitter } from 'tiny-typed-emitter';
import { getProcessArgs, ProcessArgs } from './getProcessArgs';
import { ICloseEvent, IMessageEvent, w3cwebsocket as W3CWebsocket } from 'websocket';
import { v4 as uuid } from 'uuid';
import { CustomEvents } from '../../../shared/messages';
import { ReceivedMessage, OutgoingMessage } from './BasicSocketMessages';

class BasicSocket extends TypedEmitter<
    { [K in keyof CustomEvents]: CustomEvents[K]['generalHandler'] } & { ready: () => void }
> {
    private readonly _processArgs: ProcessArgs = getProcessArgs();
    private readonly _webSocket: W3CWebsocket;

    /** The extension ID of the connected websocket. */
    public get id(): string {
        return this._processArgs.extensionId;
    }

    public get port(): number {
        return this._processArgs.port;
    }

    private get _url(): string {
        return `ws://localhost:${this.port}?extensionId=${this.id}`;
    }

    public constructor() {
        super();

        this._webSocket = new W3CWebsocket(this._url);
        this._webSocket.onclose = (e) => this.handleClose(e);
        this._webSocket.onerror = (e) => this.handleError(e);
        this._webSocket.onmessage = (e) => this.handleMessage(e);
        this._webSocket.onopen = () => this.handleOpen();

        this.once('ready', () => {
            // uncomment this for more debug logging
            // this.log(`Connected on port ${this.port}`);
        });
    }

    private handleClose(e: ICloseEvent): void {
        process.exit(e.code);
    }

    /** Sends an error message to the main app instance. */
    public handleError({ message, name, stack }: Error, fromSend: boolean = false): void {
        if (fromSend) {
            // the error comes from a send message attempt,
            // which means we can't log it
            // since that would just generate more errors
            return;
        }

        this.send('extensionError', { id: this.id, message, name, stack: stack ?? 'Unknown' });
    }

    private handleMessage({ data }: IMessageEvent): void {
        if (typeof data !== 'string') return;

        const payload: ReceivedMessage = JSON.parse(data);
        if (payload?.event === undefined) {
            // no event specified = feedback from previously emitted message, or
            // a message of invalid shape

            // TODO: we can check if the message was successfully emitted by comparing id
            return;
        }

        if (payload.event === 'windowClose') {
            // close websocket if we somehow receive this event
            // shouldn't happen since process is terminated by app on close
            this._webSocket.close(0);
            return;
        }

        if (payload.event === 'appClientConnect') {
            this.emit('ready');
            return;
        }

        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.emit(payload.event, payload.data);
        } catch (error) {
            this.handleError(
                error instanceof Error
                    ? error
                    : new Error(`Unknown error occurred handling message: ${data.toString()}`),
            );
        }
    }

    private handleOpen(): void {
        // currently we don't need to do anything once the websocket has opened,
        // since communication can only start once the app is ready
    }

    /** Sends a custom event payload to the main app instance. */
    public send<T extends keyof CustomEvents>(event: T, ...data: Parameters<CustomEvents[T]['generalHandler']>): void {
        try {
            const message: OutgoingMessage<T> = {
                id: uuid(),
                method: 'app.broadcast',
                accessToken: this._processArgs.accessToken,
                data: {
                    event,
                    data: data,
                },
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
    public log(message: unknown) {
        this.send('extensionLog', { id: this.id, message });
    }
}

export default BasicSocket;
