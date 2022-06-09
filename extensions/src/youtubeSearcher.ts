import ytsr from 'ytsr';
import BasicSocket from './helpers/BasicSocket';

const socket = new BasicSocket();

socket.on('youtubeSearchQuery', async (queryString) => {
    try {
        const results = await ytsr(queryString);

        socket.log(results);
    } catch (error) {
        socket.log('error');
    }
});

socket.on('testEvent', (a) => {
    socket.log('testEvent', `received ${a}`);
});
