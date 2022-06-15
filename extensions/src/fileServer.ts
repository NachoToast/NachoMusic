import BasicSocket from './helpers/BasicSocket';
import { readFile } from 'fs';
import { createServer } from 'http';
import { AddressInfo } from 'net';
import { extname } from 'path';

const extensionTypeMap: Record<string, string> = {
    '.mp4': 'video/mp4',
};

const server = createServer((req, res) => {
    if (req.url === undefined) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end('No URL specified', 'utf-8');
        return;
    }

    const contentType = extensionTypeMap[extname(req.url).toLowerCase()] || 'application/octet-stream';

    readFile(decodeURIComponent(req.url), (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(content, 'utf-8');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`${err?.code}`, 'utf-8');
            }
        }
        {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const socket = new BasicSocket();

socket.once('ready', () => {
    server.listen(0, () => {
        const { port } = server.address() as AddressInfo;
        socket.send('fileServerInfo', port);

        // tell app the port if it reloads
        socket.on('ready', () => {
            socket.send('fileServerInfo', port);
        });
    });
});
