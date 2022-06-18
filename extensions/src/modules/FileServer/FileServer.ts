import { readFile } from 'fs';
import { createServer, RequestListener, Server } from 'http';
import { AddressInfo } from 'net';
import { extname } from 'path';
import BasicSocket from '../../helpers/BasicSocket';

export class FileServer {
    private readonly _socket: BasicSocket;
    private readonly _server: Server;

    public constructor(socket: BasicSocket) {
        this._socket = socket;
        this._server = createServer(this.handleRequest);

        socket.once('ready', () => {
            this._server.listen(0, () => {
                const { port } = this._server.address() as AddressInfo;
                this._socket.send('fileServerInfo', port);

                // if app reloads, tell it the port currently in use
                this._socket.on('ready', () => {
                    this._socket.send('fileServerInfo', port);
                });
            });
        });
    }

    private handleRequest: RequestListener = (req, res) => {
        if (req.url === undefined) {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end('No URL specified', 'utf-8');
            return;
        }

        const contentType = FileServer.getContentType(req.url);

        readFile(decodeURIComponent(req.url), (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                } else {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end(`${err?.code}`, 'utf-8');
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    };

    public static getContentType(url: string): string {
        const extension = extname(url).toLowerCase();

        switch (extension) {
            case '.mp4':
                return 'video/mp4';
            case '.mp3':
                return 'audio/mpeg';
            default:
                return 'application/octet-stream';
        }
    }
}

export default FileServer;
