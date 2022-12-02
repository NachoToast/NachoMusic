export interface ProcessArgs {
    /** Port of the Neutralinojs server. */
    port: number;

    /** Access token to use the native API. */
    accessToken: string;

    /** Extension identifier. */
    extensionId: string;
}

/**
 * Retrieves the Neutralino process arguments.
 * - `--nl-port=<port>`
 * - `--nl-token=<token>`
 * - `--nl-extension-id=<id>`
 * @throws Throws an error if any arguments are missing.
 *
 * {@link https://neutralino.js.org/docs/how-to/extensions-overview/#connecting-an-extension-with-neutralinojs API Reference}
 */
export function getProcessArgs(): ProcessArgs {
    const rawPort = process.argv.find((e) => e.startsWith('--nl-port'));
    if (rawPort === undefined) throw new Error('Missing "--nl-port" argument');

    const rawToken = process.argv.find((e) => e.startsWith('--nl-token'));
    if (rawToken === undefined) throw new Error('Missing "--nl-token" argument');

    const rawExtension = process.argv.find((e) => e.startsWith('--nl-extension-id'));
    if (rawExtension === undefined) throw new Error('Missing "--nl-extension-id" argument');

    const port = Number(rawPort.slice('--nl-port='.length));
    const accessToken = rawToken.slice('--nl-token='.length);
    const extensionId = rawExtension.slice('--nl-extension-id='.length);

    return { port, accessToken, extensionId };
}
