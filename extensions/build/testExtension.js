"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const websocket_1 = require("websocket");
const path_1 = require("path");
const uuid_1 = require("uuid");
const getProcessArgs_1 = require("./helpers/getProcessArgs");
const { port, accessToken, extensionId } = (0, getProcessArgs_1.default)();
const WS_URL = `ws://localhost:${port}?extensionId=${extensionId}`;
log(`Attempting port ${port}, WS ${WS_URL}`);
function log(msg) {
    (0, fs_1.appendFileSync)((0, path_1.join)(__dirname, 'log.txt'), msg + '\n', 'utf-8');
}
function onError(e) {
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
function onMessage(e) {
    log(`got message, data type: ${typeof e.data}`);
    if (typeof e.data === 'string') {
        const msg = JSON.parse(e.data);
        const eventName = msg.event;
        switch (eventName) {
            case 'windowClose':
                ws.close(0);
                break;
            case 'fromAppToExtension': {
                const data = msg.data;
                log('message received is ' + data);
                ws.send(JSON.stringify({
                    id: (0, uuid_1.v4)(),
                    method: 'app.broadcast',
                    accessToken,
                    data: {
                        event: 'fromExtensionToApp',
                        data: `Hey neu app, Node JS 2 here - you sent me: ${data}`,
                    },
                }));
                break;
            }
            default:
                log('unknown message' + JSON.stringify(msg));
                break;
        }
    }
}
const ws = new websocket_1.w3cwebsocket(WS_URL);
ws.onopen = onOpen;
ws.onmessage = onMessage;
ws.onclose = onClose;
ws.onerror = onError;
//# sourceMappingURL=testExtension.js.map