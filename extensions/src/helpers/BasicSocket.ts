import { TypedEmitter } from 'tiny-typed-emitter';
import { getProcessArgs, ProcessArgs } from './getProcessArgs';
import { ICloseEvent, IMessageEvent, w3cwebsocket as W3CWebsocket } from 'websocket';
import { v4 as uuid } from 'uuid';
import { CustomEvents } from '../../../shared/messages';
import { ReceivedMessage, OutgoingMessage } from './BasicSocketMessages';

class BasicSocket extends TypedEmitter<{ [K in keyof CustomEvents]: CustomEvents[K]['generalHandler'] }> {
    private readonly _processArgs: ProcessArgs = getProcessArgs();
    private readonly _webSocket: W3CWebsocket;

    private get _url(): string {
        return `ws://localhost:${this._processArgs.port}?extensionId=${this._processArgs.extensionId}`;
    }

    public constructor() {
        super();

        this._webSocket = new W3CWebsocket(this._url);
        this._webSocket.onclose = (e) => this.handleClose(e);
        this._webSocket.onerror = () => this.handleError();
        this._webSocket.onmessage = (e) => this.handleMessage(e);
        this._webSocket.onopen = () => this.handleOpen();
    }

    private handleClose(e: ICloseEvent): void {
        process.exit(e.code);
    }

    private handleError(): void {
        // TODO: error logging
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

        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.emit(payload.event, payload.data);
        } catch (error) {
            // TODO: error handling
        }
    }

    private handleOpen(): void {
        // TODO: open logging
    }

    public send<T extends keyof CustomEvents>(event: T, ...data: Parameters<CustomEvents[T]['generalHandler']>): void {
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
    }
}

export default BasicSocket;
