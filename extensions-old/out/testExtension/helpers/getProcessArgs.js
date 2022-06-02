"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Retrieves the Neutralino process arguments.
 * - `--nl-port=<port>`
 * - `--nl-token=<token>`
 * - `--nl-extension-id=<id>`
 *
 * For more information see the {@link https://neutralino.js.org/docs/how-to/extensions-overview#connecting-an-extension-with-neutralinojs API docs}.
 *
 * @throws Throws an error if arguments are missing.
 */
function getProcessArgs() {
    const rawPort = process.argv.find((e) => e.startsWith('--nl-port'));
    if (rawPort === undefined)
        throw new Error('Missing "--nl-port" argument');
    const rawToken = process.argv.find((e) => e.startsWith('--nl-token'));
    if (rawToken === undefined)
        throw new Error('Missing "--nl-token" argument');
    const rawExtension = process.argv.find((e) => e.startsWith('--nl-extension-id'));
    if (rawExtension === undefined)
        throw new Error('Missing "--nl-extension-id" argument');
    const port = Number(rawPort.slice('--nl-port='.length));
    const accessToken = rawToken.slice('--nl-token='.length);
    const extensionId = rawExtension.slice('--nl-extension-id='.length);
    return { port, accessToken, extensionId };
}
exports.default = getProcessArgs;
//# sourceMappingURL=getProcessArgs.js.map