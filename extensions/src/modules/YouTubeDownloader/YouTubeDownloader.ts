import { createWriteStream } from 'fs';
import { downloadFromInfo, getInfo } from 'ytdl-core';
import { CustomEvents } from '../../../../shared/messages';
import BasicSocket from '../../helpers/BasicSocket';

export class YouTubeDownloader {
    private readonly _socket: BasicSocket;

    public constructor(socket: BasicSocket) {
        this._socket = socket;

        socket.on('youtubeDownloadStart', this.handleDownloadRequest);
    }

    private handleDownloadRequest: CustomEvents['youtubeDownloadStart']['generalHandler'] = async (query) => {
        const { url, destinationPath } = query;
        try {
            this._socket.log(`got a request to download ${url} to ${destinationPath}`);

            const info = await getInfo(url);

            this._socket.log(info);

            const readableStream = downloadFromInfo(info, { filter: 'audioonly' });
            const writableStream = readableStream.pipe(createWriteStream(destinationPath));

            writableStream.on('close', () => {
                this._socket.emit('youtubeDownloadDone', {
                    url,
                });
            });
        } catch (error) {
            this._socket.handleError(error instanceof Error ? error : new Error(`Error downloading ${query.url}`));
        }
    };
}

export default YouTubeDownloader;
