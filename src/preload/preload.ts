import { contextBridge } from 'electron';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import path from 'path';
import ytdl from 'ytdl-core';
import ytsr, { Video } from 'ytsr';

async function playAVideo() {
    const pog = (await ytsr('faded', { limit: 10 })).items.filter((e) => e.type === 'video') as Video[];

    if (!pog.length) return;

    const stream = ytdl(pog[0].url);

    if (!existsSync(path.join(__dirname, '../', '../', '../', 'videos'))) {
        mkdirSync(path.join(__dirname, '../', '../', '../', 'videos'));
    }

    const fileName = path.join(__dirname, '../', '../', '../', 'videos', pog[0].title.replace(/\s/g, '_') + '.mp4');

    const pipe = stream.pipe(createWriteStream(fileName));

    return new Promise<string>((resolve) => {
        pipe.once('close', () => {
            resolve(fileName);
        });
    });
}

export const API = {
    pog: 'champ',
    e: () => true,
    a: playAVideo,
};

contextBridge.exposeInMainWorld('api', API);
