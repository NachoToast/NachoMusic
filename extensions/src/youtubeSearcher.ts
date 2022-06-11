import ytsr from 'ytsr';
import BasicSocket from './helpers/BasicSocket';

const socket = new BasicSocket();

socket.on('youtubeSearchQuery', async ({ queryString, limit }) => {
    try {
        const results = await ytsr(queryString, { limit });

        socket.send('youtubeSearchResult', results);
    } catch (error) {
        socket.handleError(error instanceof Error ? error : new Error(`Error getting results for ${queryString}`));
    }
});
