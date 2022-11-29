import { existsSync, rmSync } from 'fs';
import { join } from 'path';

async function main() {
    const existingDistPath = join(__dirname, '../../', 'dist', 'NachoMusic');
    if (!existsSync(existingDistPath)) return;

    try {
        rmSync(existingDistPath, { recursive: true });
        console.log(`Removed existing dist`);
    } catch (error) {
        console.log(`Failed to delete existing dist`);
        process.exit(1);
    }
}

main();
