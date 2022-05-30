/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const { join } = require('path');
const { exec } = require('node:child_process');

const extensionFolders = fs.readdirSync(__dirname).filter((e) => !e.includes('.'));

console.log(`Recompiling ${extensionFolders.length} extensions`);

const templateFile = fs.readFileSync(join(__dirname, 'webpack.config.js'), 'utf-8');

for (const folder of extensionFolders) {
    fs.writeFileSync(join(__dirname, folder, 'webpack.config.js'), templateFile.replace(/%NAME%/g, folder));
    exec(`yarn webpack --config extensions/source/${folder}/webpack.config.js --mode production`, (err, stdout) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
}
