import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

process.stdout.write('Restoring \x1b[35mindex.html\x1b[0m\n');

const filePath = join(__dirname, '../../', 'app', 'public', 'index.html');

const contents = readFileSync(filePath, 'utf-8').replace(
    /http:\/\/localhost:[0-9]+\/neutralino\.js/g,
    '%PUBLIC_URL%/neutralino.js',
);

writeFileSync(filePath, contents, 'utf-8');
