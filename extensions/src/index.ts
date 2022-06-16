import BasicSocket from './helpers/BasicSocket';
import FileServer from './modules/FileServer';
import YouTubeDownloader from './modules/YouTubeDownloader';
import YouTubeSearcher from './modules/YouTubeSearcher';

const socket = new BasicSocket();

new FileServer(socket);
new YouTubeDownloader(socket);
YouTubeSearcher(socket);
