import BasicSocket from './helpers/BasicSocket';
import FileServer from './modules/FileServer';
import YouTubeSearcher from './modules/YouTubeSearcher';

const socket = new BasicSocket();

new FileServer(socket);
YouTubeSearcher(socket);
