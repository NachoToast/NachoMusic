import { appendFileSync } from 'fs';
import { IMessageEvent, w3cwebsocket as websocket } from 'websocket';
import { join } from 'path';
import { v4 as uuid } from 'uuid';
import getProcessArgs from './helpers/getProcessArgs';

const { port, accessToken, extensionId } = getProcessArgs();

const WS_URL = `ws://localhost:${port}?extensionId=${extensionId}`;

log(`Attempting port ${port}, WS ${WS_URL}`);

function log(msg: string): void {
    appendFileSync(join(__dirname, 'log.txt'), msg + '\n', 'utf-8');
}

function onError(e: unknown) {
    console.log(e);
    log(e instanceof Error ? e.message : 'Unknown error');
}

function onOpen() {
    log('connected to application!');
}

function onClose() {
    log('connection has been closed');
    process.exit();
}

function onMessage(e: IMessageEvent) {
    log(`got message, data type: ${typeof e.data}`);
    if (typeof e.data === 'string') {
        const msg = JSON.parse(e.data);

        const eventName = msg.event as string;
        switch (eventName) {
            case 'windowClose':
                ws.close(0);
                break;
            case 'fromAppToExtension': {
                const data = msg.data as string;
                log('message received is ' + data);

                ws.send(
                    JSON.stringify({
                        id: uuid(),
                        method: 'app.broadcast',
                        accessToken,
                        data: {
                            event: 'fromExtensionToApp',
                            data: `Hey neu app, Node JS 2 here - you sent me: ${data}`,
                        },
                    }),
                );
                break;
            }
            default:
                log('unknown message' + JSON.stringify(msg));
                break;
        }
    }
}

const ws = new websocket(WS_URL);
ws.onopen = onOpen;
ws.onmessage = onMessage;
ws.onclose = onClose;
ws.onerror = onError;
