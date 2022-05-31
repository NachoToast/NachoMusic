/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const { join } = require('path');
const { exec } = require('node:child_process');
async function main() {
    const validCommands = ['build', 'typecheck', 'install'];
    const action = process.argv[2];

    if (!validCommands.includes(action)) {
        console.log(`Please specify a valid command: ${validCommands.join(', ')}`);
    }

    const extensionFolders = fs
        .readdirSync(__dirname)
        .filter((e) => !e.includes('.'))
        .filter((folder) => fs.existsSync(join(__dirname, folder, 'package.json')));
    console.log(
        `${action.slice(0, 1).toUpperCase() + action.slice(1)}ing ${extensionFolders.length} extension${
            extensionFolders.length !== 1 ? 's' : ''
        }:`,
    );

    const promiseArray = [];

    for (const folder of extensionFolders) {
        const modPath = join(__dirname, folder);

        promiseArray.push(
            new Promise((resolve) => {
                const collected = [];
                let exitCode = 0;

                const proc = exec(
                    `yarn ${action}`,
                    {
                        cwd: modPath,
                    },
                    (err, stdOut) => {
                        if (err) exitCode = 1;
                        if (stdOut) collected.push(stdOut);
                    },
                );

                proc.once('close', () => resolve({ collected, exitCode, folder }));
            }),
        );
    }

    const res = (await Promise.allSettled(promiseArray)).map(({ value }) => value);

    // res.map((e) => console.log(e.exitCode, e.collected.length));

    let overallFail = false;
    for (const { exitCode, collected, folder } of res) {
        if (exitCode === 0) {
            process.stdout.write(`\x1b[32m${folder} - PASS\x1b[0m\n`);
            // console.log(`${folder} - PASS`);
        } else {
            process.stdout.write(`\x1b[31m${folder} - FAIL\x1b[0m\n`);
            console.log(collected.join(''));
            overallFail = true;
        }
    }

    if (overallFail) process.exit(1);
}

main();

// console.log('Done!');
