import BasicSocket from './base/BasicSocket';
import YouTubeSearcher from './modules/YouTubeSearcher/YouTubeSearcher';

const socket = new BasicSocket();

socket.events.once('ready', () => socket.log('Hello World!'));

YouTubeSearcher(socket);
