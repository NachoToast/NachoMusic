import { exec } from 'child_process';
import { rmSync } from 'fs';
import { join } from 'path';

async function remove(paths: string[], areFolders: boolean): Promise<void> {
    const plural = areFolders ? 'folders' : 'files';
    const singular = plural.slice(0, -1);

    process.stdout.write(`Removing ${plural}: \x1b[35m${paths.join('\x1b[0m, \x1b[35m')}\x1b[0m`);
    const awaitedPromises: Promise<boolean>[] = new Array(paths.length);

    for (let i = 0, len = paths.length; i < len; i++) {
        const path = join(__dirname, paths[i]);
        awaitedPromises[i] = new Promise((resolve) => {
            try {
                rmSync(path, { recursive: areFolders });
                resolve(true);
            } catch (error) {
                resolve(false);
            }
        });
    }

    const deletedItems = await Promise.all(awaitedPromises);
    const successfulDeletions = deletedItems.filter((e) => e === true).length;
    if (successfulDeletions !== deletedItems.length) {
        process.stdout.write('\n');
        for (let i = 0, len = deletedItems.length; i < len; i++) {
            if (deletedItems[i] === true) continue;
            process.stdout.write(`Failed to delete ${singular} \x1b[31m${paths[i]}\x1b[0m\n`);
        }
        if (successfulDeletions) {
            process.stdout.write(`Successfully deleted \x1b[32m${successfulDeletions}\x1b[0m ${plural}\n`);
        }
    } else {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(`Removed ${plural}: \x1b[32m${paths.join('\x1b[0m, \x1b[32m')}\x1b[0m\n`);
    }
}

async function main(): Promise<void> {
    // remove source files
    await remove(['src'], true);
    await remove(['nodemon.json', 'tsconfig.json', 'postPackage.ts'], false);

    // creating autoclean file
    {
        process.stdout.write('Creating \x1b[35m.yarnclean\x1b[0m file');
        let failure = false;

        await new Promise<void>((resolve) => {
            const proc = exec('yarn autoclean --init', { cwd: __dirname }, (err, stdout) => {
                if (err) failure = true;
                if (stdout && failure) process.stdout.write(stdout);
            });

            proc.once('close', resolve);
        });

        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);

        if (failure) {
            process.stdout.write('\x1b[31m.yarnclean\x1b[0m\n creation \x1b[31mfailed\x1b[0m\n');
        } else {
            process.stdout.write('Created \x1b[32m.yarnclean\x1b[0m file\n');
        }
    }

    // installing production dependencies
    {
        process.stdout.write('Installing production dependencies');
        let failure = false;

        await new Promise<void>((resolve) => {
            const proc = exec('yarn install --prod', { cwd: __dirname }, (err, stdout) => {
                if (err) failure = true;
                if (stdout && failure) process.stdout.write(stdout);
            });

            proc.once('close', resolve);
        });

        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);

        if (failure) {
            process.stdout.write('Dependency installation \x1b[31mfailed\x1b[0m\n');
        } else {
            process.stdout.write('Installed dependencies\n');
        }
    }

    // removing post-build files
    await remove(['yarn.lock', 'package.json', '.yarnclean'], false);
}

main();
