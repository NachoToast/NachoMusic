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
     * TODO: Proper documentation for this.
     */
    namespace filesystem {
        function createDirectory(path: string): Promise<BaseResponse>;

        function removeDirectory(path: string): Promise<BaseResponse>;

        function writeFile(filename: string, data: string): Promise<BaseResponse>;

        function appendFile(filename: string, data: string): Promise<BaseResponse>;

        function writeBinaryFile(filename: string, data: ArrayBuffer): Promise<BaseResponse>;

        function appendBinaryFile(filename: string, data: ArrayBuffer): Promise<BaseResponse>;

        function readFile(filename: string): Promise<string>;

        function readBinaryFile(filename: string): Promise<ArrayBuffer>;

        function removeFile(filename: string): Promise<BaseResponse>;

        function readDirectory(path: string): Promise<
            Array<{
                /** File or directory name. */
                entry: string;

                type: 'FILE' | 'DIRECTORY';
            }>
        >;

        function copyFile(source: string, destination: string): Promise<BaseResponse>;

        function moveFile(source: string, destination: string): Promise<BaseResponse>;

        interface FileStats {
            /** Size in bytes. */
            size: number;

            isFile: boolean;

            isDirectory: boolean;

            createdAt?: number;

            modifiedAt?: number;
        }

        function getStats(path: string): Promise<FileStats>;
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

    /** {@link https://neutralino.js.org/docs/api/os API Reference} */
    namespace os {
        /** {@link https://neutralino.js.org/docs/api/os/#spawnedprocess API Reference} */
        interface SpawnedProcess {
            /** A Neutralino-scoped process identifier. */
            id: number;
            /** Process identifier from the operating system. */
            pid: number;
        }

        /** Detached for commenting and reusability. */
        interface CommandOptions {
            /**
             * If true will execute command in the background and resolve the promise immediately,
             * use this for making detached API function calls.
             */
            background?: boolean;

            /** Standard input as a string. */
            stdIn?: string;
        }
        /** Executes a command and returns the output. */
        function execCommand(
            command: string,
            options?: CommandOptions,
        ): Promise<{ exitCode: number; pid: number; stdErr: string; stdOut: string }>;

        /** @deprecated Doesn't seem to exist. */
        function spawnProcess(command: string): Promise<unknown>;

        /** @deprecated Doesn't seem to exist. */
        function updateSpawnedProcess(
            id: number,
            action: 'stdIn' | 'stdInEnd' | 'exit',
            data?: unknown,
        ): Promise<BaseResponse>;

        /** @deprecated Doesn't seem to exist. */
        function getSpawnedProcesses(): Promise<unknown[]>;

        function getEnv(key: string): Promise<string>;

        interface Filter {
            name: string;
            extensions: string[];
        }

        function showOpenDialog(
            title: string,
            options: { filters?: Filter[]; multiSelections?: boolean },
        ): Promise<string[]>;

        function showSaveDialog(
            title: string,
            options?: { filters?: Filter[]; forceOverwrite?: boolean },
        ): Promise<string[]>;

        function showFolderDialog(title?: string): Promise<string>;

        function showNotification(
            title: string,
            content: string,
            icon?: 'INFO' | 'WARNING' | 'ERROR' | 'QUESTION',
        ): Promise<void>;

        interface MessageBoxChoices {
            OK: 'OK';
            OK_CANCEL: 'OK' | 'CANCEL';
            YES_NO: 'YES' | 'NO';
            YES_NO_CANCEL: 'YES' | 'NO' | 'CANCEL';
            RETRY_CANCEL: 'RETRY' | 'CANCEL';
            ABORT_RETRY_IGNORE: 'ABORT' | 'RETRY' | 'IGNORE';
        }

        function showMessageBox<T extends keyof MessageBoxChoices = 'OK'>(
            title: string,
            content: string,
            choice?: T,
            icon?: 'INFO' | 'WARNING' | 'ERROR' | 'QUESTION',
        ): Promise<MessageBoxChoices[T]>;

        interface TrayMenuItem {
            id?: string;
            text: string;
            isDisabled?: boolean;
            isChecked?: boolean;
        }

        /** Creates/updates the tray icon and menu. */
        function setTray(tray: { icon: string; menuItems: TrayMenuItem[] }): Promise<void>;

        /** Returns known platform-specific folders such as Downloads, Music, Videos, etc. */
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

        /** Opens a URL with the default web browser. */
        function open(url: string): Promise<BaseResponse>;
    }

    /** {@link https://neutralino.js.org/docs/api/storage API Reference} */
    namespace storage {
        // TODO: typing for custom data keys and payloads

        function setData(key: string, data: string): Promise<void>;

        function getData(key: string): Promise<string>;
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
