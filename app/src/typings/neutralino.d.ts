declare type CustomEvents = import('../../../shared/CustomEvents').CustomEvents;

// https://neutralino.js.org/docs/api/global-variables

/** Operating system name. */
declare const NL_OS: 'Linux' | 'Windows' | 'Darwin';

/** Application identifier. */
declare const NL_APPID: string;

/** Application version. */
declare const NL_APPVERSION: string;

/** Application port. */
declare const NL_PORT: number;

/** Mode of the application. */
declare const NL_MODE: 'window' | 'browser' | 'cloud' | 'chrome';

/** Neutralinojs framework version. */
declare const NL_VERSION: string;

/** Neutralinojs client version, not defined until {@link Neutralino.init()} is done. */
declare const NL_CVERSION: string;

/** Current working directory. */
declare const NL_CWD: string;

/** Application path. */
declare const NL_PATH: string;

/** Command line arguments. */
declare const NL_ARGS: string[];

/** Identifier of the current process. */
declare const NL_PID: number;

/** Source of application resources. */
declare const NL_RESMODE: 'bundle' | 'directory';

/** Returns `true` if extensions are enabled. */
declare const NL_EXTENABLED: boolean;

/** Framework binary's release commit hash. */
declare const NL_COMMIT: string;

/** Client library's release commit has, not defined until {@link Neutralino.init()} is done. */
declare const NL_CCOMMIT: string;

declare namespace Neutralino {
    interface BaseResponse {
        success: boolean;
        message?: string;
    }

    /**
     * Contains methods related to the current application instance.
     *
     * {@link https://neutralino.js.org/docs/api/app API Reference}
     *
     * @version 3.8.0
     */
    namespace app {
        /**
         * Terminates the running application.
         * @param {number} [exitCode=0] - Process's exit code, default is 0 (success).
         *
         * {@link https://neutralino.js.org/docs/api/app#appexitexitcode API Reference}
         *
         * @example
         * ```ts
         * await Neutralino.app.exit(130);
         * ```
         * @example
         * ```ts
         * await Neutralino.app.exit();
         * ```
         */
        function exit(exitCode: number = 0): Promise<void>;

        /**
         * Kills the application process.
         *
         *  If the application becomes unresponsive, you can use this to terminate the process instantly.
         *
         * It is recommended to use the {@link exit()} method to close your application properly.
         *
         * {@link https://neutralino.js.org/docs/api/app#appkillprocess API Reference}
         *
         * @example
         * ```ts
         * await Neutralino.app.killProcess();
         * ```
         */
        function killProcess(): Promise<void>;

        /**
         * Restarts the current application instance.
         *
         * @param {object} args - Additional command-line arguments to be passed in the new process.
         *
         * {@link https://neutralino.js.org/docs/api/app#apprestartprocessoptions}
         *
         * @example
         * ```ts
         * await Neutralino.app.restartProcess();
         * ```
         * @example
         * ```ts
         * await Neutralino.app.restartProcess({ args: '--restarted' });
         * ```
         */
        function restartProcess(args?: { args: string }): Promise<void>;

        /**
         * Returns current application configuration as a JSON object.
         *
         * May not be identical to the configuration file since the framework updates during several situations, such as
         * config overrides via CLI arguments, or using 0 as the port.
         *
         * {@link https://neutralino.js.org/docs/api/app#appgetconfig API Reference}
         *
         * @example
         * ```ts
         * let config = await Neutralino.app.getConfig();
         * console.log('URL = ', config.url);
         * ```
         */
        function getConfig(): Promise<Record<string, unknown>>;

        /**
         * Dispatches a new event to all app instances.
         *
         * @param {string} eventName Name of event.
         * @param {object} [data] Additional data for the event.
         *
         * {@link https://neutralino.js.org/docs/api/app#appbroadcasteventname-data API Reference}
         */
        function broadcast(eventName: string, data?: string): Promise<BaseResponse>;
    }
    /**
     * Contains functions to access the system clipboard.
     *
     * {@link https://neutralino.js.org/docs/api/clipboard API Reference}
     *
     * @version 3.8.0
     */
    namespace clipboard {
        /**
         * Writes text into the system clipboard.
         *
         * {@link https://neutralino.js.org/docs/api/clipboard#clipboardwritetexttext API Reference}
         *
         * @example
         * ```ts
         * await Neutralino.clipboard.writeText('Test value');
         * ```
         */
        function writeText(text: string): Promise<BaseResponse>;

        /**
         * Reads and returns text from the system clipboard.
         *
         * {@link https://neutralino.js.org/docs/api/clipboard#clipboardreadtext API Reference}
         *
         * @example
         * ```ts
         * let clipboardText = await Neutralino.clipboard.readText();
         * console.log(`Text: ${clipboardText}`);
         * ```
         */
        function readText(): Promise<string>;
    }

    /**
     * Contains methods related to the user's hardware.
     *
     * {@link https://neutralino.js.org/docs/api/computer API Reference}
     *
     * @version 3.8.0
     */
    namespace computer {
        /**
         * Returns physical and virtual memory details in bytes.
         *
         * {@link https://neutralino.js.org/docs/api/computer#computergetmemoryinfo API Reference}
         *
         * @example
         * ```ts
         * let memoryInfo = await Neutralino.computer.getMemoryInfo();
         * console.log(`RAM size: ${memoryInfo.physical.total}B`);
         * ```
         */
        function getMemoryInfo(): Promise<{
            physical: { total: number; available: number };
            virtual: { total: number; available: number };
        }>;

        /**
         * Returns the CPU architecture identifier.
         *
         * {@link https://neutralino.js.org/docs/api/computer#computergetarch API Reference}
         *
         * @example
         * ```ts
         * let arch = await Neutralino.computer.getArch();
         * console.log(arch);
         * ```
         */
        function getArch(): Promise<'x64' | 'ia32' | 'arm' | 'itanium' | 'unknown'>;

        /**
         * Returns operating system kernel information.
         *
         * {@link https://neutralino.js.org/docs/api/computer#computergetkernelinfo API Reference}
         *
         * @example
         * ```ts
         * let kernelInfo = await Neutralino.computer.getKernelInfo();
         * console.log(`Kernel: ${kernelInfo.variant}`);
         * ```
         */
        function getKernelInfo(): Promise<{ variant: 'Linux' | 'Darwin' | 'Windows NT' | 'unknown'; version: string }>;

        /**
         * Returns operating system information.
         *
         * {@link https://neutralino.js.org/docs/api/computer#computergetosinfo API Reference}
         *
         * @example
         * ```ts
         * let osInfo = await Neutralino.computer.getOSInfo();
         * console.log(`OS: ${kernelInfo.name}`);
         * ```
         */
        function getOSInfo(): Promise<{ name: string; description: string; version: string }>;

        /**
         * Returns the CPU information.
         *
         * {@link https://neutralino.js.org/docs/api/computer#computergetcpuinfo API Reference}
         *
         * @example
         * ```ts
         * let cpuInfo = await Neutralino.computer.getCPUInfo();
         * console.log(`CPU model: ${cpuInfo.model}`);
         * ```
         */
        function getCPUInfo(): Promise<{
            /** Vendor name. */
            vendor: string;
            /** Model name. */
            model: string;
            /** Current CPU frequency in hertz (Hz). */
            frequency: number;
            /** CPU architecture name, same as {@link getArch} */
            architecture: string;
            /** Number of logical threads in the parallelism model. */
            logicalThreads: LargeNumberLike;
            /** Number of physical cores in the CPU. */
            physicalCores: number;
            /** Number of physical CPU hardware units in the motherboard. */
            physicalUnits: number;
        }>;

        interface Display {
            /** Virtual display identifier. */
            id: number;
            /** Display resolution information. */
            resolution: {
                width: number;
                height: number;
            };
            /** Dots per inch. */
            dpi: number;
            /** Bits per pixel (i.e. colour depth). */
            bpp: number;
            /** Refresh rate in hertz (Hz). */
            refreshRate: number;
        }

        /**
         * Returns information about all connected displays.
         *
         * {@link https://neutralino.js.org/docs/api/computer#computergetdisplays API Reference}
         *
         * @example
         * ```ts
         * const displays = await Neutralino.computer.getDisplays();
         * for (const display of displays) {
         *     console.log(display);
         * }
         * ```
         */
        function getDisplays(): Promise<Display[]>;

        /**
         * Returns the current mouse cursor position.
         *
         * {@link https://neutralino.js.org/docs/api/computer#computergetmouseposition API Reference}
         *
         * @example
         * ```ts
         * let pos = await Neutralino.computer.getMousePosition();
         * console.log(`Pos: ${pos.x}, ${pos.y}`);
         * ```
         */
        function getMousePosition(): Promise<{
            /** Distance from the left edge of the screen in pixels. */
            x: number;
            /** Distance from the top edge of the screen in pixels. */
            y: number;
        }>;
    }

    /**
     * Contains application debugging utilities.
     *
     * {@link https://neutralino.js.org/docs/api/debug API Reference}
     *
     * @version 3.8.0
     */
    namespace debug {
        /**
         * Writes a messsage to `neutralinojs.log` and/or standard output streams.
         *
         * If running via `neu run`, will show log messages in terminal.
         *
         * @param {String} message Content to be logged.
         * @param {'INFO'|'WARNING'|'ERROR'} [type] Type of the message.
         *
         * {@link https://neutralino.js.org/docs/api/debug#debuglogmessage-type API Reference}
         *
         * @example
         * ```ts
         * await Neutralino.debug.log('Hello Neutralinojs');
         * ```
         *
         * @example
         * ```ts
         * await Neutralino.debug.log('An error occured', 'ERROR');
         * ```
         *
         * @example
         * ```ts
         * await Neutralino.debug.log('A warning message', 'WARNING');
         * ```
         */
        function log(
            message: string,
            type: 'INFO' | 'WARNING' | 'ERROR' = 'INFO',
        ): Promise<{ success: boolean; message: string }>;
    }

    /**
     * Contains methods related to the native events handling.
     *
     * These events are often initiated by the Neutralinojs server based on native state changes.
     *
     * {@link https://neutralino.js.org/docs/api/events API Reference}
     *
     * @version 3.8.0
     */
    namespace events {
        /**
         * Native events. Their names are mapped to their payloads.
         *
         * {@link https://neutralino.js.org/docs/api/events#event-types API Reference}
         */
        interface EventTypes {
            ready: null;
            trayMenuItemClicked: os.TrayMenuItem;
            windowClose: null;
            windowFocus: null;
            windowBlur: null;
            serverOffline: null;
            clientConnect: number;
            clientDisconnect: number;
            appClientConnect: number;
            appClientDisconnect: number;
            extClientConnect: string;
            extClientDisconnect: string;
            extensionReady: string;
            spawnedProcess: os.SpawnedProcess & { action: 'stdOut' | 'stdErr' | 'exit'; data: unknown };
            openedFile: { action: 'read' | 'end'; data: unknown };
        }

        /**
         * Registers a native event handler.
         *
         * @param {string} eventName Name of the event.
         * @param {Function} handler Function to be called when the event occurs.
         *
         * {@link https://neutralino.js.org/docs/api/events#eventsoneventname-handler API Reference}
         *
         * @example
         * ```ts
         * function onTrayMenuItemClicked(event) {
         *   console.log(`Event data: ${event.detail}`);
         * }
         * await Neutralino.events.on('trayMenuItemClicked', onTrayMenuItemClicked);
         * ```
         */
        function on<T extends keyof EventTypes>(
            eventName: T,
            handler: (data: CustomEvent<EventTypes[T]>) => void,
        ): Promise<BaseResponse>;

        /** Registers a custom event handler documented in {@link CustomEvents}. */
        function on<T extends keyof CustomEvents>(
            eventName: T,
            handler: (data: CustomEvent<CustomEvents[T]>) => void,
        ): Promise<BaseResponse>;

        /**
         * Unregisters a native event handler.
         *
         * @param {string} eventName Name of the event.
         * @param {Function} handler Function reference.
         *
         * {@link https://neutralino.js.org/docs/api/events#eventsoffeventname-handler API Reference}
         *
         * @example
         * ```ts
         * await Neutralino.events.off('trayMenuItemClicked', onTrayMenuItemClicked);
         * ```
         */
        function off<T extends keyof EventTypes>(
            eventName: T,
            handler: (data: CustomEvents<EventTypes[T]>) => void,
        ): Promise<BaseResponse>;

        /** Unregisters a custom event handler documented in {@link CustomEvents}. */
        function off<T extends keyof CustomEvents>(
            eventName: T,
            handler: (data: CustomEvent<CustomEvents[T]>) => void,
        ): Promise<BaseResponse>;

        /**
         * Dispatches a new event to the current app instance.
         *
         * Neutralinojs client uses this JavaScript function call internally to dispatch native events.
         *
         * @param {string} eventName Name of the event.
         * @param {object} [data] Additional data for the event.
         *
         * {@link https://neutralino.js.org/docs/api/events#eventsdispatcheventname-data API Reference}
         *
         * @example
         * ```ts
         * await Neutralino.events.dispatch('myTestEvent', {myData: 'Test data'});
         * ```
         */
        function dispatch<T extends keyof CustomEvents>(eventName: T, data: CustomEvents[T]): Promise<BaseResponse>;

        /**
         * Dispatches a new event to all clients (app and extension clients).
         *
         * @param {string} eventName Name of the event.
         * @param {object} [data] Additional data for the event.
         *
         * {@link https://neutralino.js.org/docs/api/events#eventsbroadcasteventname-data API Reference}
         *
         * @example
         * ```ts
         * await Neutralino.events.broadcast('myTestEvent', 'Hello');
         * ```
         *
         * @example
         * ```ts
         * await Neutralino.events.broadcast('myTestEvent', {myData: 'Test data'});
         * ```
         *
         * @example
         * ```ts
         * await Neutralino.events.broadcast('myTestEvent'); // without any data payload
         * ```
         */
        function broadcast<T extends keyof CustomEvents>(eventName: T, data: CustomEvents[T]): Promise<BaseResponse>;
    }

    /**
     * Contains methods related to Neutralino extensions, which let developers write custom backend APIs for
     * Neutralinojs applications.
     *
     * {@link https://neutralino.js.org/docs/how-to/extensions-overview/ Extension Guide}
     *
     * {@link https://neutralino.js.org/docs/api/extensions API Reference}
     *
     * @version 3.8.0
     *
     */
    namespace extensions {
        /**
         * Dispatches a new event to an extension instance.
         *
         * If the targeted extension is not connected yet, the Neutralino client library will queue the function call
         * and send it whenever the extension comes online.
         *
         * @param {string} extensionId Extension identifier.
         * @param {string} eventName Name of event.
         * @param {unknown} [data] Additional data for the event.
         *
         * {@link https://neutralino.js.org/docs/api/extensions#extensionsdispatchextensionid-eventname-data API Reference}
         *
         * @example
         * ```ts
         * await Neutralino.extensions.dispatch('js.neutralino.myextension', 'myTestEvent', { myData: 'Test data' });
         * ```
         *
         * @example
         * ```ts
         * await Neutralino.extensions.dispatch('js.neutralino.myextension', 'myTestEvent');
         * ```
         */
        function dispatch<T extends keyof CustomEvents>(
            extensionId: string,
            eventName: T,
            data: CustomEvents[T],
        ): Promise<BaseResponse>;

        /**
         * Dispatches a new event to all connected extensions.
         *
         * If an extension is loaded but not connected yet, it won't get the new event.
         *
         * Use {@link extensions.dispatch} to send messages even if the extension is not yet connected to the main
         * process.
         *
         * {@link https://neutralino.js.org/docs/api/extensions#extensionsbroadcasteventname-data API Reference}
         *
         * @example
         * ```ts
         * await Neutralino.extensions.broadcast('myTestEvent', 'Hello');
         * ```
         *
         * @example
         * ```ts
         * await Neutralino.extensions.broadcast('myTestEvent', {myData: 'Test data'});
         * ```
         *
         * @example
         * ```ts
         * await Neutralino.extensions.broadcast('myTestEvent');
         * ```
         */
        function broadcast<T extends keyof CustomEvents>(eventName: T, data: CustomEvents[T]): Promise<BaseResponse>;

        /**
         * Returns details about connected and loaded extensions.
         *
         * {@link https://neutralino.js.org/docs/api/extensions#extensionsgetstats API Reference}
         *
         * @example
         * ```ts
         * let stats = await Neutralino.extensions.getStats();
         * console.log('stats: ', stats);
         * ```
         */
        function getStats(): Promise<{
            /** Array of loaded extensions. */
            loaded: string[];
            /**
             * Array of connected extensions, these extensions have an active WebSocket-based IPC connection with the
             * main process.
             */
            connected: string[];
        }>;
    }
    /**
     * Contains methods for handling files.
     *
     * {@link https://neutralino.js.org/docs/api/filesystem API Reference}
     *
     * @version 3.8.0
     */
    namespace filesystem {
        /**
         * Creates a new directory.
         * @param {string} path New directory path.
         * @throws Throws `NE_FS_DIRCRER` if directory creation is not possible.
         *
         * {@link https://neutralino.js.org/docs/api/filesystem#filesystemcreatedirectorypath API Reference}
         *
         * @example
         * ```ts
         * await Neutralino.filesystem.createDirectory('./newDirectory');
         * ```
         *
         * @example
         * ```ts
         * await Neutralino.filesystem.createDirectory(NL_PATH + '/myFolder');
         * ```
         */
        function createDirectory(path: string): Promise<BaseResponse>;

        /**
         * Removes a given directory.
         * @param {string} path Directory path.
         * @throws Throws `NE_FS_RMDIRER` if the removal is not possible.
         *
         * {@link https://neutralino.js.org/docs/api/filesystem#filesystemremovedirectorypath API Reference}
         *
         * @example
         * ```ts
         * await Neutralino.filesystem.removeDirectory('./tmpDirectory');
         * ```
         */
        function removeDirectory(path: string): Promise<BaseResponse>;

        /**
         * Writes a text file.
         * @param {string} filename Filename.
         * @param {string} data Content of the file.
         * @throws Throws `NE_FS_FILWRER` for file write errors.
         *
         * {@link https://neutralino.js.org/docs/api/filesystem#filesystemwritefilefilename-data API Reference}
         *
         * @example
         * ```ts
         * await Neutralino.filesystem.writeFile('./myFile.txt', 'Sample content');
         * ```
         */
        function writeFile(filename: string, data: string): Promise<BaseResponse>;

        /**
         * Appends text content to file. If the file doesn't exist, will create a new one.
         * @param {string} filename Filename.
         * @param {string} data Content to append.
         * @throws Throws `NE_FS_FILWRER` for file write errors.
         *
         * {@link https://neutralino.js.org/docs/api/filesystem#filesystemappendfilefilename-data API Reference}
         *
         * @example
         * ```ts
         * await Neutralino.filesystem.appendFile('./myFile.txt', 'Sample ');
         * await Neutralino.filesystem.appendFile('./myFile.txt', 'content');
         * ```
         */
        function appendFile(filename: string, data: string): Promise<BaseResponse>;

        /**
         * Writes a binary file.
         * @param {string} filename Filename.
         * @param {ArrayBuffer} data Content of the binary file as an {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer ArrayBuffer}.
         * @throws Throws `NE_FS_FILWRER` for file write errors.
         *
         * {@link https://neutralino.js.org/docs/api/filesystem#filesystemwritebinaryfilefilename-data API Reference}
         *
         * @example
         * ```ts
         * let rawBin = new ArrayBuffer(1);
         * let view = new Uint8Array(rawBin);
         * view[0] = 64; // Saves ASCII '@' to the binary file
         *
         * await Neutralino.filesystem.writeBinaryFile('./myFile.bin', rawBin);
         * ```
         */
        function writeBinaryFile(filename: string, data: ArrayBuffer): Promise<BaseResponse>;

        /**
         * Appends binary data to a file. If the provided file doesn't exist, will create a new one.
         * @param {string} filename Filename.
         * @param {ArrayBuffer} data Binary content to append as an {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer ArrayBuffer}.
         * @throws Throws `NE_FS_FILWRER` for file write errors.
         *
         * {@link https://neutralino.js.org/docs/api/filesystem#filesystemappendbinaryfilefilename-data API Reference}
         *
         * @example
         * ```ts
         * let rawBin = new ArrayBuffer(1);
         * let view = new Uint8Array(rawBin);
         * view[0] = 64; // Saves ASCII '@' to the binary file
         *
         * await Neutralino.filesystem.appendBinaryFile('./myFile.bin', rawBin);
         * await Neutralino.filesystem.appendBinaryFile('./myFile.bin', rawBin);
         * ```
         */
        function appendBinaryFile(filename: string, data: ArrayBuffer): Promise<BaseResponse>;

        interface ReadOptions {
            /** File cursor position in bytes. */
            pos?: number;
            /** File reader buffer size in bytes. */
            size: number;
        }

        /**
         * Reads a text file.
         * @param {string} filename Filename.
         * @param {object} [options] Additional read options.
         * @throws Throws `NE_FS_FILRDER` for file read errors.
         *
         * {@link https://neutralino.js.org/docs/api/filesystem#filesystemreadfilefilename API Reference}
         *
         * @example
         * ```ts
         * let data = await Neutralino.filesystem.readFile('./myFile.txt');
         * console.log(`Content: ${data}`);
         * ```
         *
         * @example
         * ```ts
         * let data = await Neutralino.filesystem.readFile('./myFile.txt', {
         *     pos: 2,
         *     size: 10
         * });
         * console.log(`Content: ${data}`);
         * ```
         */
        function readFile(filename: string, options?: ReadOptions): Promise<string>;

        /**
         * Reads a binary file.
         * @param {string} filename Filename.
         * @param {object} [options] Additional read options.
         * @throws Throws `NE_FS_FILRDER` for file read errors.
         *
         * {@link https://neutralino.js.org/docs/api/filesystem#filesystemreadbinaryfilefilename API Reference}
         *
         * @example
         * ```ts
         * let data = await Neutralino.filesystem.readBinaryFile({
         * fileName: './myFile.bin'
         * });
         * let view = new Uint8Array(data);
         *
         * console.log('Binary content: ', view);
         * ```
         */
        function readBinaryFile(filename: string, options?: ReadOptions): Promise<ArrayBuffer>;

        /**
         * Creates a readable file stream.
         * @param {string} filename Filename.
         * @throws Throws `NE_FS_FILOPER` for file open errors.
         * @returns {number} File stream identifier.
         *
         * {@link https://neutralino.js.org/docs/api/filesystem#filesystemopenfilefilename API Reference}
         *
         * @example
         * ```ts
         * let fileId = await Neutralino.filesystem.openFile('./myFile.txt');
         * console.log(`ID: ${fileId}`);
         * ```
         */
        function openFile(filename: string): Promise<number>;

        /**
         * Invokes file stream actions. Call this method to read and seek an opened file (aka a readable stream).
         * @param {number} id File stream identifier.
         * @param {'read'|'readAll'|'seek'} action An action to take, can be:
         * - `read` Reads a bytes segment from the file steam.
         * - `readAll` Triggers the `read` action until file stream cursor position reaches {@link https://en.wikipedia.org/wiki/End-of-file EOF}.
         * - `seek` Sets the file cursor position.
         * @param {number} [data] Additional data for the action.
         * - If the action is `read` or `readAll`, this is the buffer size in bytes, and defaults to 256.
         * - If the action is `seek` this, this is the file stram cursor position.
         * @throws Throws `NE_FS_UNLTOUP` if the framework can't update the stream.
         *
         * {@link https://neutralino.js.org/docs/api/filesystem#filesystemupdateopenedfileid-action-data API Reference}
         *
         * @example
         * ```ts
         * let fileId = await Neutralino.filesystem.openFile('./myFile.txt');
         *
         * let content = '';
         * Neutralino.events.on('openedFile', (evt) => {
         *   if(evt.detail.id == fileId) {
         *     switch(evt.detail.action) {
         *       case 'data':
         *         content += evt.detail.data;
         *         break;
         *       case 'end':
         *         console.log(content);
         *         break;
         *     }
         *   }
         * });
         *
         * // Sets the file stream cursor to 10th byte
         * await Neutralino.filesystem.updateOpenedFile(fileId, 'seek', 10);
         * // Reads 2 bytes from the cursor position
         * await Neutralino.filesystem.updateOpenedFile(fileId, 'read', 2);
         * // Reads the next bytes until the cursor reaches EOF (buffer size: 2)
         * await Neutralino.filesystem.updateOpenedFile(fileId, 'readAll', 2);
         * ```
         */
        function updateOpenedFile(
            id: number,
            action: 'read' | 'readAll' | 'seek',
            data?: number,
        ): Promise<BaseResponse>;

        /**
         * Returns file stream details.
         * @param {number} id File stream identifier.
         * @throws Throws `NE_FS_UNLTFOP` if the file stream identifier is not valid.
         *
         * {@link https://neutralino.js.org/docs/api/filesystem#filesystemgetopenedfileinfoid API Reference}
         *
         * @example
         * ```ts
         * let info = await Neutralino.filesystem.getOpenedFileInfo(0);
         * console.log(info);
         * ```
         */
        function getOpenedFileInfo(id: number): Promise<{
            /** File stream identifier. */
            id: number;
            /** Becomes `true` if the stream reached EOF. */
            eof: boolean;
            /** File stream cursor position. */
            pos: number;
            /** Last read bytes. */
            leastRead: number;
        }>;

        /**
         * Removes given file.
         * @param {string} filename Filename.
         * @throws Throws `NE_FS_FILRMER` for file removal errors.
         *
         * {@link https://neutralino.js.org/docs/api/filesystem#filesystemremovefilefilename API Reference}
         *
         * @example
         * ```ts
         * await Neutralino.filesystem.removeFile('./myFile.txt');
         * ```
         */
        function removeFile(filename: string): Promise<BaseResponse>;

        /**
         * Reads directory contents.
         * @param {string} path File/directory path.
         * @throws Throws `NE_FS_NOPATHE` if the path doesn't exist.
         *
         * {@link https://neutralino.js.org/docs/api/filesystem#filesystemreaddirectorypath API Reference}
         *
         * @example
         * ```ts
         * let entries = await Neutralino.filesystem.readDirectory(NL_PATH);
         * console.log('Content: ', entries);
         * ```
         */
        function readDirectory(path: string): Promise<
            {
                /** File or directory name. */
                entry: string;

                type: 'FILE' | 'DIRECTORY';
            }[]
        >;

        /**
         * Copies a file to a new destination.
         * @param {string} source Source path.
         * @param {string} destination Destination path.
         * @throws Throws `NE_FS_COPYFER` if the system cannot copy the file.
         *
         * {@link https://neutralino.js.org/docs/api/filesystem#filesystemcopyfilesource-destination API Reference}
         *
         * @example
         * ``ts
         * await Neutralino.filesystem.copyFile('./source.txt', './destination.txt');
         * ```
         */
        function copyFile(source: string, destination: string): Promise<BaseResponse>;

        /**
         * Moves a file to a new destination.
         * @param {string} source Source path.
         * @param {string} destination Destination path.
         * @throws Throws `NE_FS_MOVEFER` if the system cannot move the file.
         *
         * {@link https://neutralino.js.org/docs/api/filesystem#filesystemmovefilesource-destination API Reference}
         *
         * @example
         * ```ts
         * await Neutralino.filesystem.moveFile('./source.txt', './destination.txt');
         * ```
         */
        function moveFile(source: string, destination: string): Promise<BaseResponse>;

        /**
         * Returns file statistics for the given path.
         * @param {string} path File or directory path.
         * @throws Throws `NE_FS_NOPATHE` if the given path doesn't exist or is inaccessible.
         *
         * Because of the throw, this can be used to check the existence of a file or directory.
         *
         * {@link https://neutralino.js.org/docs/api/filesystem#filesystemgetstatspath API Reference}
         *
         * @example
         * ```ts
         * let stats = await Neutralino.filesystem.getStats('./sampleVideo.mp4');
         * console.log('Stats:', stats);
         * ```
         */
        function getStats(path: string): Promise<{
            /** Size in bytes. */
            size: number;
            /** `true` if the path represents a normal file. */
            isFile: boolean;
            /** `true` if the path represents a directory. */
            isDirectory: boolean;
            /**
             * On Windows: UNIX milliseconds of the file creation time.
             *
             * On Unix/Unix-like: Unix milliseconds of the last {@link https://en.wikipedia.org/wiki/Inode inode} modification time.
             */
            createdAt?: number;
            /** Unix milliseconds of the last file modification time. */
            modifiedAt?: number;
        }>;
    }

    /**
     * Not a namespace, this is a function initializes a Neutralinojs application:
     *
     * - Starts a WebSocket connection with the Neutralinojs server asynchronously.
     * - Registers auto-reload event handler if the `--neu-dev-auto-reload` flag is provided (`neu run` sets this).
     * - Defines `NL_CVERSION` with the client library version in the `window` scope.
     *
     * {@link https://neutralino.js.org/docs/api/init API Reference}
     *
     * @example
     * ```ts
     * Neutralino.init();
     *
     * Neutralino.os.showMessageBox('Welcome', 'Hello Neutralinojs');
     * ```
     *
     * @example
     * Neutralino.init();
     *
     * Neutralino.events.on('ready', () => {
     *     Neutralino.os.showMessageBox('Welcome', 'Hello Neutralinojs');
     * });
     *
     * @version 3.8.0
     */
    function init(): void;

    /**
     * Contains methods related to the user's operating system.
     *
     * {@link https://neutralino.js.org/docs/api/os API Reference}
     *
     * @version 3.8.0
     */
    namespace os {
        /** {@link https://neutralino.js.org/docs/api/os/#spawnedprocess API Reference} */
        interface SpawnedProcess {
            /** A Neutralino-scoped process identifier. */
            id: number;
            /** Process identifier from the operating system. */
            pid: number;
        }

        /** {@link https://neutralino.js.org/docs/api/os#options API Reference} */
        interface CommandOptions {
            /**
             * If `true` will execute command in the background and resolve the promise immediately,
             * use this for making detached API function calls.
             */
            background?: boolean;

            /** Standard input as a string. */
            stdIn?: string;
        }

        /**
         * Executes a command and returns the output.
         * @param {string} command The command that is to be executed.
         * @param {CommandOptions} [options] Additional execution options.
         *
         * {@link https://neutralino.js.org/docs/api/os#osexeccommandcommand-options API Reference}
         *
         * @example
         * ```ts
         * let info = await Neutralino.os.execCommand('python --version');
         * console.log(`Your Python version: ${info.stdOut}`);
         * ```
         *
         * @example
         * ```ts
         * await Neutralino.os.execCommand('npm start', { background: true });
         * ```
         */
        function execCommand(
            command: string,
            options?: CommandOptions,
        ): Promise<{
            /** Exit code of the process. */
            exitCode: number;
            /** Process identifier. */
            pid: number;
            /** Standard error. */
            stdErr: string;
            /** Standard output. */
            stdOut: string;
        }>;

        /**
         * Spawns a process based on a command in background and lets developers control it.
         * @param {string} command The command that is to be executed in a new process.
         *
         * {@link https://neutralino.js.org/docs/api/os#osspawnprocesscommand API Reference}
         *
         * @example
         * ```ts
         * let pingProc = await Neutralino.os.spawnProcess('ping neutralino.js.org');
         *
         * Neutralino.events.on('spawnedProcess', (evt) => {
         *     if(pingProc.id == evt.detail.id) {
         *         switch(evt.detail.action) {
         *             case 'stdOut':
         *                 console.log(evt.detail.data);
         *                 break;
         *             case 'stdErr':
         *                 console.error(evt.detail.data);
         *                 break;
         *             case 'exit':
         *                 console.log(`Ping process terminated with exit code: ${evt.detail.data}`);
         *                 break;
         *         }
         *     }
         * });
         * ```
         */
        function spawnProcess(command: string): Promise<SpawnedProcess>;

        /**
         * Updates a spawned process based on a provided action and data.
         * @param {number} id Neutralino-scoped process identifier.
         * @param {'stdIn'|'stdInEnd'|'exit'} action Action to take, can be:
         * - `stdIn` Sends data to the process via the standard input stream.
         * - `stdInEnd` Closes the standard input stream file descriptor.
         * - `exit` Terminates the process.
         * @param {string} [data] Additional data for the `action`, should be a standard input string if `action` is
         * `stdIn`.
         * @throws Throws `NE_OS_UNLTOUP` if the process cannot be updated.
         *
         * {@link https://neutralino.js.org/docs/api/os#osupdatespawnedprocessid-action-data API Reference}
         *
         * @example
         * ```ts
         * await Neutralino.os.updateSpawnedProcess(nodeProc.id, 'stdIn', 'console.log(5 + 5);');
         * await Neutralino.os.updateSpawnedProcess(nodeProc.id, 'stdInEnd');
         * ```
         */
        function updateSpawnedProcess(
            id: number,
            action: 'stdIn' | 'stdInEnd' | 'exit',
            data?: string,
        ): Promise<BaseResponse>;

        /**
         * Returns all spawned processes.
         *
         * {@link https://neutralino.js.org/docs/api/os#osgetspawnedprocesses API Reference}
         *
         * @example
         * ```ts
         * await Neutralino.os.spawnProcess('ping neutralino.js.org');
         * await Neutralino.os.spawnProcess('ping codezri.org');
         *
         * let processes = await Neutralino.os.getSpawnedProcesses();
         * console.log(processes);
         * ```
         */
        function getSpawnedProcesses(): Promise<SpawnedProcess[]>;

        /**
         * Provides the value of a given environment variable.
         * @param {string} key The name of the environment variable.
         *
         * {@link https://neutralino.js.org/docs/api/os#osgetenvkey API Reference}
         *
         * @example
         * ```ts
         * let value = await Neutralino.os.getEnv('USER');
         * console.log(`USER = ${value}`);
         * ```
         */
        function getEnv(key: string): Promise<string>;

        /**
         * Returns all environment variables and their values.
         *
         * {@link https://neutralino.js.org/docs/api/os#osgetenvs API Reference}
         *
         * @example
         * ```ts
         * let envs = await Neutralino.os.getEnvs();
         * console.log(envs);
         * ```
         */
        function getEnvs(): Promise<Record<string, string>>;

        /** {@link https://neutralino.js.org/docs/api/os#filter API Reference} */
        interface Filter {
            /** Filter name. */
            name: string;
            /** Array of file extensions, e.g. `['jpg', 'png']` */
            extensions: string[];
        }

        /**
         * Shows the file open dialog. You can use this function to obtain paths of existing files.
         * @param {string} [title] Title of the dialog.
         * @param {object} [options] Additional dialog options.
         *
         * {@link https://neutralino.js.org/docs/api/os#osshowopendialogtitle-options API Reference}
         *
         * @example
         * ```ts
         * let entries = await Neutralino.os.showOpenDialog('Open a file', {
         * defaultPath: '/home/my/directory/',
         * filters: [
         *     {name: 'Images', extensions: ['jpg', 'png']},
         *     {name: 'All files', extensions: ['*']}
         * ]
         * });
         * console.log('You have selected:', entries);
         * ```
         */
        function showOpenDialog(
            title?: string,
            options?: {
                /** Array of filter objects to filter the files list. */
                filters?: Filter[];
                /** Enables multi selections. */
                multiSelections?: boolean;
                /** Initial path/filename displayed by the dialog. */
                defaultPath?: string;
            },
        ): Promise<string[]>;

        /**
         * Shows the file save dialog. You can use this funciton to obtain a path to create a new file.
         * @param {string} [title] Title of the dialog.
         * @param {object} [options] Additional dialog options.
         *
         * {@link https://neutralino.js.org/docs/api/os#osshowsavedialogtitle-options API Reference}
         *
         * @example
         * ```ts
         * let entry = await Neutralino.os.showSaveDialog('Save as', {
         *   defaultPath: 'untitled.jpg',
         *   filters: [
         *     {name: 'Images', extensions: ['jpg', 'png']},
         *     {name: 'All files', extensions: ['*']}
         *   ]
         * });
         * console.log('You have selected:', entry);
         * ```
         */
        function showSaveDialog(
            title?: string,
            options?: {
                /** Array of filter objects to filter the files list. */
                filters?: Filter[];
                /** Skip file overwrite warning message. */
                forceOverwrite?: boolean;
                /** Initial path/filename displayed by the dialog. */
                defaultPath?: string;
            },
        ): Promise<string[]>;

        /**
         * Shows the folder open dialog.
         * @param {string} [title] Title of the dialog.
         * @param {object} [options] Additional dialog options.
         *
         * {@link https://neutralino.js.org/docs/api/os#osshowfolderdialogtitle API Reference}
         *
         * @example
         * ```ts
         * let entry = await Neutralino.os.showFolderDialog('Select installation directory', {
         *   defaultPath: '/home/my/directory/'
         * });
         * console.log('You have selected:', entry);
         * ```
         */
        function showFolderDialog(
            title?: string,
            options?: {
                /** Initial path displayed by the dialog. */
                defaultPath?: string;
            },
        ): Promise<string>;

        /**
         * Displays a notification message.
         * @param {string} title Notification title.
         * @param {string} content Content of the notification.
         * @param {'INFO'|'WARNING'|'ERROR'|'QUESTION'} [icon] Icon name, default is `INFO`.
         *
         * {@link https://neutralino.js.org/docs/api/os#osshownotificationtitle-content-icon API Reference}
         *
         * @example
         * ```ts
         * await Neutralino.os.showNotification('Hello world', 'It works! Have a nice day');
         * ```
         *
         * @example
         * ```ts
         * await Neutralino.os.showNotification('Oops :/', 'Something went wrong', 'ERROR');
         * ```
         */
        function showNotification(
            title: string,
            content: string,
            icon: 'INFO' | 'WARNING' | 'ERROR' | 'QUESTION' = 'INFO',
        ): Promise<void>;

        interface MessageBoxChoices {
            OK: 'OK';
            OK_CANCEL: 'OK' | 'CANCEL';
            YES_NO: 'YES' | 'NO';
            YES_NO_CANCEL: 'YES' | 'NO' | 'CANCEL';
            RETRY_CANCEL: 'RETRY' | 'CANCEL';
            ABORT_RETRY_IGNORE: 'ABORT' | 'RETRY' | 'IGNORE';
        }

        /**
         * Displays a message box.
         * @param {string} title Title of the message box.
         * @param {string} content Content of the message box.
         * @param {string} [choice] Message box buttons, default is `OK`.
         * @param {'INFO'|'WARNING'|'ERROR'|'QUESTION'} [icon] Icon name, default is `INFO`.
         *
         * {@link https://neutralino.js.org/docs/api/os#osshowmessageboxtitle-content-choice-icon API Reference}
         *
         * @example
         * ```ts
         * await Neutralino.os.showMessageBox('Hello', 'Welcome');
         *
         * let button = await Neutralino.os
         *             .showMessageBox('Confirm',
         *                             'Are you sure you want to quit?',
         *                             'YES_NO', 'QUESTION');
         * if(button == 'YES') {
         *     Neutralino.app.exit();
         * }
         * ```
         */
        function showMessageBox<T extends keyof MessageBoxChoices = 'OK'>(
            title: string,
            content: string,
            choice?: T,
            icon?: 'INFO' | 'WARNING' | 'ERROR' | 'QUESTION',
        ): Promise<MessageBoxChoices[T]>;

        /** {@link https://neutralino.js.org/docs/api/os#traymenuitem API Reference} */
        interface TrayMenuItem {
            /** Unique identifier for each menu item. */
            id?: string;
            /** Label of the menu item. Use `-` for a menu separator. */
            text: string;
            /** Disable/enable a specific menu item. */
            isDisabled?: boolean;
            /** Mark a specific menu item as selected. */
            isChecked?: boolean;
        }

        /**
         * Creates/updates the tray icon and menu.
         * @param {object} tray Options for the tray.
         *
         * {@link https://neutralino.js.org/docs/api/os#ossettrayoptions API Reference}
         *
         * @example
         * ```ts
         * let tray = {
         *   icon: '/resources/icons/trayIcon.png',
         *   menuItems: [
         *     {id: "about", text: "About"},
         *     {text: "-"},
         *     {id: "quit", text: "Quit"}
         *   ]
         * };
         *
         * await Neutralino.os.setTray(tray);
         * ```
         */
        function setTray(tray: {
            /**
             * Tray icon path, e.g. `/resources/icons/trayIcon.png`. A 20x20-sized PNG works fine on all supported
             * operating systems.
             */
            icon: string;
            /** An array of {@link TrayMenuItem} objects. */
            menuItems: TrayMenuItem[];
        }): Promise<BaseResponse>;

        /**
         * Returns known platform-specific folders such as Downloads, Music, Videos, etc...
         * @param {string} title Name of the folder.
         * @throws Throws `NE_OS_INVKNPT` for invalid folder names.
         *
         * {@link https://neutralino.js.org/docs/api/os#osgetpathname API Reference}
         *
         * @example
         * ```ts
         * let downloadsPath = await Neutralino.os.getPath('downloads');
         * console.log(`Downloads folder: ${downloadsPath}`);
         * ```
         */
        function getPath(
            title:
                | 'config'
                | 'data'
                | 'cache'
                | 'documents'
                | 'pictures'
                | 'music'
                | 'video'
                | 'downloads'
                | 'savedGames1'
                | 'savedGames2',
        ): Promise<string>;

        /**
         * Opens a URL with the default web browser.
         * @param {string} url URL to be opened.
         *
         * {@link https://neutralino.js.org/docs/api/os#osopenurl API Reference}
         *
         * @example
         * ```ts
         * Neutralino.os.open('https://neutralino.js.org');
         * ```
         */
        function open(url: string): Promise<BaseResponse>;
    }

    /**
     * Neutralino has built-in key-value storage, global like {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage LocalStorage} for all Neutralinojs modes.
     *
     * Exposes methods for interacting with this storage feature.
     *
     * {@link https://neutralino.js.org/docs/api/storage API Reference}
     *
     * @version 3.8.0
     */
    namespace storage {
        /**
         * Writes data into Neutralinojs shared storage.
         * @param {string} key A unique idenfitier.
         * @param {string|null} [data] Data as a string. If omitted or null or undefined,
         * the specified data record will be erased from the disk.
         *
         * {@link https://neutralino.js.org/docs/api/storage#storagesetdatakey-data API Reference}
         *
         * @example
         * ```ts
         * await Neutralino.storage.setData('userDetails', JSON.stringify({ username: 'TestValue'}));
         * ```
         */
        function setData(key: string, data?: string | null): Promise<BaseResponse>;

        /**
         * Reads and returns data for a given Neutralinojs shared storage key.
         * @param {string} key Storage data record identifier.
         * @throws Throws `NE_ST_NOSTKEX` if the provided key doesn't exist.
         *
         * {@link https://neutralino.js.org/docs/api/storage#storagegetdatakey API Reference}
         *
         * @example
         * ```ts
         * let data = await Neutralino.storage.getData('userDetails');
         * console.log(`Data: ${data}`);
         * ```
         */
        function getData(key: string): Promise<string>;

        /**
         * Returns all storage keys.
         * @throws Throws `NE_ST_NOSTDIR` if unable to read the storage directory
         * (for example when no keys have yet been set).
         *
         * {@link https://neutralino.js.org/docs/api/storage#storagegetkeys API Reference}
         *
         * @example
         * ```ts
         * let keys = await Neutralino.storage.getKeys();
         * console.log('Keys: ', keys);
         * ```
         */
        function getKeys(): Promise<string[]>;
    }

    /** {@link https://neutralino.js.org/docs/api/updater API Reference} */
    namespace updater {
        // TODO: manifset shape interface
        function checkForUpdates(url: string): Promise<object>;

        function install(): Promise<void>;
    }

    /** {@link https://neutralino.js.org/docs/api/window API Reference} */
    namespace window {
        function setTitle(title: string): Promise<BaseResponse>;

        function getTitle(): Promise<string>;

        function minimize(): Promise<BaseResponse>;
        function maximize(): Promise<BaseResponse>;
        function unmaximize(): Promise<BaseResponse>;
        function isMaximized(): Promise<boolean>;

        function setFullScreen(): Promise<BaseResponse>;
        function exitFullScreen(): Promise<BaseResponse>;
        function isFullScreen(): Promise<boolean>;

        function show(): Promise<BaseResponse>;
        function hide(): Promise<BaseResponse>;
        function isVisible(): Promise<boolean>;

        function focus(): Promise<BaseResponse>;

        function setAlwaysOnTop(onTop: boolean): Promise<BaseResponse>;

        /**
         * Moves the native window into given coordinates.
         *
         * Neutralinojs's cross-platform coordinate system starts from top-left corner of the screen.
         *
         * In other words, `x=0,y=0` point refers to the top-left corner of the device's main screen.
         */
        function move(x: number, y: number): Promise<BaseResponse>;

        /**
         * Sets an icon for the native window or Dock.
         * @param {String} icon Path of the icon, e.g. `/resources/icons/appIcon.png`.
         */
        function setIcon(icon: string): Promise<BaseResponse>;

        /**
         * Converts a given DOM element to a draggable region.
         *
         * The user will be able to drag the native window by dragging the given DOM element.
         *
         * Suitable to make custom window bars along with the borderless mode.
         */
        function setDraggableRegion(domId: string): Promise<BaseResponse>;

        function unsetDraggableRegion(domId: string): Promise<BaseResponse>;

        interface InputSizeInfo {
            width?: number;
            height?: number;
            minWidth?: number;
            minHeight?: number;
            maxWidth?: number;
            maxHeight?: number;
            resizable?: boolean;
        }

        interface OutputSizeInfo {
            width: number;
            height: number;
            minWidth: number;
            minHeight: number;
            maxWidth: number;
            maxHeight: number;
            resizable: boolean;
        }

        /** Always expects width and height couples,
         * so make sure if you are setting a width value you also set the height one.
         */
        function setSize(options: InputSizeInfo): Promise<BaseResponse>;

        function getSize(): Promise<OutputSizeInfo>;

        function getPosition(): Promise<{ x: number; y: number }>;

        interface WindowOptions {
            title?: string;
            icon?: string;
            fullScreen?: boolean;
            alwaysOnTop?: boolean;
            enableInspector?: boolean;
            borderless?: boolean;
            maximize?: boolean;
            hidden?: boolean;
            maximizable?: boolean;
            exitProcessOnClose?: boolean;
            processArgs?: string;
        }

        function create(
            url: string,
            windowOptions?: WindowOptions,
        ): Promise<{ pid: number; stdOut: string; stdErr: string; exitCode: number }>;
    }
}
