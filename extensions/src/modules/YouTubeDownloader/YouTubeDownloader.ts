import { createWriteStream, statSync, writeFileSync } from 'fs';
import { request } from 'https';
import { extname } from 'path';
import { Stream } from 'stream';
import ytdl from 'ytdl-core';
import ytsr, { Video } from 'ytsr';
import { CustomEvents } from '../../../../shared/messages';
import BasicSocket from '../../helpers/BasicSocket';
import { stringToNumerical } from '../../helpers/timeConverters';

export class YouTubeDownloader {
    private readonly _socket: BasicSocket;

    public constructor(socket: BasicSocket) {
        this._socket = socket;

        socket.on('youtubeDownloadStart', this.handleDownloadRequest);
    }

    private downloadThumbnail(url: string, destination: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            request(url, (res) => {
                const data = new Stream.Transform();

                res.on('data', (chunk) => data.push(chunk));

                res.on('end', () => {
                    try {
                        writeFileSync(destination, data.read());
                        resolve(true);
                    } catch (error) {
                        this._socket.handleError(
                            error instanceof Error ? error : new Error(`Error writing thumbnail of ${url}`),
                        );
                        resolve(false);
                    }
                });

                res.on('error', (e) => {
                    this._socket.handleError(e);
                    resolve(false);
                });
            }).end();
        });
    }

    private handleDownloadRequest: CustomEvents['youtubeDownloadStart']['generalHandler'] = async (query) => {
        const { url, destinationPath } = query;
        try {
            const str = ytdl(url, { filter: 'audioonly' });

            str.on('progress', (chunk: number, done: number, total: number) => {
                this._socket.send('youtubeDownloadProgress', { chunk, done, total, url });
            });

            str.on('error', (err) => this._socket.handleError(err));

            const str2 = str.pipe(createWriteStream(`${destinationPath}.mp4`));
            str2.on('error', (err) => this._socket.handleError(err));

            const closePromise = new Promise<void>((res) => {
                str2.on('close', res);
            });

            const infoPromise = await ytsr(url, { limit: 1 });

            const [, info] = await Promise.all([closePromise, infoPromise]);

            if (info.items.length < 1) {
                this._socket.handleError(new Error(`Got no search results from ${url}`));
                return;
            }
            if (info.items[0].type !== 'video') {
                this._socket.handleError(new Error(`Got a non-video (${info.items[0].type}) result from ${url}`));
                return;
            }

            const video = info.items[0] as Video;

            let thumbnail: { extension: string; size: number } | null = null;
            if (video.bestThumbnail.url !== null) {
                const thumbnailType = extname(new URL(video.bestThumbnail.url).pathname);
                if (await this.downloadThumbnail(video.bestThumbnail.url, `${destinationPath}${thumbnailType}`)) {
                    const { size } = statSync(`${destinationPath}${thumbnailType}`);
                    thumbnail = { extension: thumbnailType, size };
                }
            }

            const { size } = statSync(`${destinationPath}.mp4`);

            this._socket.send('youtubeDownloadDone', {
                url,
                id: video.id,
                title: video.title,
                artist: video.author?.name || 'Unknown Artist',
                duration: stringToNumerical(video.duration || '0:00'),
                dateDownloaded: Date.now(),
                thumbnail,
                size,
            });
        } catch (error) {
            this._socket.handleError(error instanceof Error ? error : new Error(`Error downloading ${query.url}`));
        }
    };
}

export default YouTubeDownloader;
