import BasicSocket from './helpers/BasicSocket';

const idk = new BasicSocket();
idk.on('testEvent', (a) => {
    idk.send('testEvent', `received ${a}`);
});
