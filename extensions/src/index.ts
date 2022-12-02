import BasicSocket from './base/BasicSocket';

const socket = new BasicSocket();

socket.events.once('ready', () => socket.log('Hello World!'));
