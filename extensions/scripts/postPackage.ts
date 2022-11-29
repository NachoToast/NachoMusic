import { exec } from 'child_process';
import { appendFileSync, readdirSync, rmSync } from 'fs';
import { join } from 'path';

const basePath = join(__dirname, '../');

async function main(): Promise<void> {
    // creating autoclean file, which removes non-code files from dependencies (e.g. LICENSE, README, ...) when installed
    {
        process.stdout.write('Creating \x1b[35m.yarnclean\x1b[0m file');
        let failure = false;

        await new Promise<void>((resolve) => {
            const proc = exec('yarn autoclean --init', { cwd: basePath }, (err, stdout) => {
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
            appendFileSync(join(basePath, '.yarnclean'), ['changes', 'license', '.github'].join('\n') + '\n', 'utf-8');
        }
    }

    // installing production dependencies
    {
        process.stdout.write('Installing production dependencies');
        let failure = false;

        await new Promise<void>((resolve) => {
            const proc = exec('yarn install --prod', { cwd: basePath }, (err, stdout) => {
                if (err) failure = true;
                if (stdout && failure) process.stdout.write(stdout);
            });

            proc.once('close', resolve);
        });

        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);

        if (failure) {
            process.stdout.write('Dependency installation \x1b[31mfailed\x1b[0m\n');
            process.exit(1);
        } else {
            process.stdout.write('Installed dependencies\n');
        }
    }

    const allItems = readdirSync(basePath);

    let deletedFolders = 0;
    let deletedFiles = 0;
    for (const item of allItems) {
        if (item === 'build' || item === 'node_modules') continue;
        try {
            if (item.includes('.')) {
                rmSync(join(basePath, item));
                deletedFiles++;
            } else {
                rmSync(join(basePath, item), { recursive: true });
                deletedFolders++;
            }
        } catch (error) {
            console.log(`Failed to delete \x1b[31m${item}\x1b[0m`);
        }
    }

    console.log(`Cleaned up \x1b[32m${deletedFolders}\x1b[0m folders and \x1b[32m${deletedFiles}\x1b[0m files`);
}

main();
