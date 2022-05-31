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

declare namespace Neutralino {
    /** {@link https://neutralino.js.org/docs/api/app API Reference} */
    namespace app {
        /**
         * Terminates the running application.
         *
         * @param {number} exitCode - Process's exit code, default is 0 (success).
         */
        function exit(exitCode?: number): Promise<void>;

        /**
         * Kills the application process.
         *
         * Recommended to use {@link Neutralino.app.exit app.exit()} to properly close unresponsive apps.
         */
        function killProcess(): Promise<void>;

        /**
         * Restarts the current application instance.
         *
         * @param {object} args - Additional command-line arguments to be passed in the new process.
         */
        function restartProcess(args?: { args: string }): Promise<void>;

        /**Returns current application configuration as a JSON object. */
        function getConfig(): Promise<Record<string, unknown>>;

        /** Dispatches a new event to all app instances. */
        function broadcast(eventName: string, data?: string): Promise<{ success: boolean }>;
    }

    /** {@link https://neutralino.js.org/docs/api/clipboard API Reference} */
    namespace clipboard {
        /** Writes text into the system clipboard. */
        function writeText(text: string): Promise<{ success: boolean }>;

        /** Reads and returns text from the system clipboard. */
        function readText(): Promise<string>;
    }

    /** {@link https://neutralino.js.org/docs/api/computer API Reference} */
    namespace computer {
        /** Returns physical memory details in megabytes. */
        function getMemoryInfo(): Promise<{ total: number; available: number }>;
    }

    /** {@link https://neutralino.js.org/docs/api/debug API Reference} */
    namespace debug {
        /**
         * Writes a messsage to **neutralinojs.log** if `logging.writeToLogFile` is enabled.
         *
         * Otherwise writes to standard output streams.
         *
         * @param {String} [type] - Severity of message, default is `INFO`.
         *
         * @deprecated As of version 4.6.0 this function does not seem to work at all.
         */
        function log(
            message: string,
            type?: 'INFO' | 'WARNING' | 'ERROR',
        ): Promise<{ success: boolean; message: string }>;
    }

    /** {@link https://neutralino.js.org/docs/api/events API Reference} */
    namespace events {
        interface EventData {
            ready: null;
            trayMenuItemClicked: Neutralino.os.TrayMenuItem;
            windowClose: null;
            windowFocus: null;
            windowBlur: null;
            serverOffline: null;

            // untested
            clientConnect: number;
            clientDisconnect: number;
            appClientConnect: number;
            appClientDisconnect: number;
            extClientConnect: string;
            extClientDisconnect: string;

            // extension identifier
            extensionReady: unknown;

            spawnedProcess: { action: 'stdOut' | 'stdErr' | 'exit'; data: string; id: number };
        }

        /** Registers a native event handler. */
        function on<T extends keyof EventData>(
            eventType: T,
            handler: (data: CustomEvent<EventData[T]>) => void,
        ): Promise<{ success: boolean; message: string }>;

        /** Registers a custom event handler. */
        function on<T>(
            eventType: string,
            handler: (data: CustomEvent<T>) => void,
        ): Promise<{ success: boolean; message: string }>;

        /** Registers an unknown event handler. */
        function on(
            eventType: string,
            handler: (data: CustomEvent<unknown>) => void,
        ): Promise<{ success: boolean; message: string }>;

        /** Unregisters a native event handler. */
        function off<T extends keyof EventData>(
            eventType: T,
            handler: (data: CustomEvent<EventData[T]>) => void,
        ): Promise<{ success: boolean; message: string }>;

        /** Unregisters a custom native event handler. */
        function off<T>(
            eventType: string,
            handler: (data: CustomEvent<T>) => void,
        ): Promise<{ success: boolean; message: string }>;

        /** Unregisters an unknown event handler. */
        function off(
            eventType: string,
            handler: (data: CustomEvent<unknown>) => void,
        ): Promise<{ success: boolean; message: string }>;

        /** Dispatches a new event to the current app instance. */
        function dispatch(eventName: string, data?: unknown): Promise<void>;

        /** Dispatches a new event to all clients (app and extension clients). */
        function broadcast(eventName: string, data?: unknown): Promise<void>;
    }

    /** {@link https://neutralino.js.org/docs/api/extensions API Reference} */
    namespace extensions {
        /**
         * Dispatches a new event to an extension instance.
         *
         * If the targeted extension is not connected yet,
         * Neutralino client library will queue the function call and send whenever the extension comes online.
         */
        function dispatch(identifier: string, eventName: string, data?: unknown): Promise<void>;

        /**
         * Dispatches a new event to all connected extensions.
         *
         * If an extension is loaded but not connected yet,
         * the particular extension won't get the new event.
         *
         * Use `extensions.dispatch` to send messages even if the extension is not connected to the main process.
         */
        function broadcast(eventName: string, data?: unknown): Promise<void>;

        /**
         * Returns details about connected and loaded extensions.
         * @returns Object with the following fields:
         * - `loaded` - Array of loaded extensions.
         * - `connected` - Array of connected extensions, these have active WebSocket-based IPC connections with
         * the main process.
         */
        function getStats(): Promise<{ connected: string[]; loaded: string[] }>;
    }

    /** {@link https://neutralino.js.org/docs/api/filesystem API Reference} */
    namespace filesystem {
        // TODO: documentation for this

        function createDirectory(path: string): Promise<void>;

        function removeDirectory(path: string): Promise<void>;

        function writeFile(filename: string, data: string): Promise<void>;

        function appendFile(filename: string, data: string): Promise<void>;

        function writeBinaryFile(filename: string, data: ArrayBuffer): Promise<void>;

        function appendBinaryFile(filename: string, data: ArrayBuffer): Promise<void>;

        function readFile(filename: string): Promise<string>;

        function readBinaryFile(filename: string): Promise<ArrayBuffer>;

        function removeFile(filename: string): Promise<void>;

        function readDirectory(path: string): Promise<
            Array<{
                /** File or directory name. */
                entry: string;

                type: 'FILE' | 'DIRECTORY';
            }>
        >;

        function copyFile(source: string, destination: string): Promise<void>;

        function moveFile(source: string, destination: string): Promise<void>;

        function getStats(path: string): Promise<{
            /** Size in bytes. */
            size: number;

            isFile: boolean;

            isDirectory: boolean;

            createdAt: number;

            modifiedAt: number;
        }>;
    }

    /**
     * Not a namespace, this function initializes a Neutralinojs application.
     *
     * {@link https://neutralino.js.org/docs/api/init API Reference}
     */
    function init(): void;

    interface CommandOptions {
        /**
         * If true will execute command in the background and resolve the promise immediately,
         * use this for making detached API function calls.
         */
        background?: boolean;

        /** Standard input as a string. */
        stdIn?: string;
    }

    namespace os {
        /** Executes a command and returns the output. */
        function execCommand(
            command: string,
            options?: CommandOptions,
        ): Promise<{ exitCode: number; pid: number; stdErr: string; stdOut: string }>;

        function spawnProcess(command: string): Promise<unknown>;

        function updateSpawnedProcess(id: number, action: 'stdIn' | 'stdInEnd' | 'exit', data?: unknown): Promise<void>;

        function getSpawnedProcesses(): Promise<unknown[]>;

        function getEnv(key: string): Promise<string>;

        function showOpenDialog(
            title: string,
            options: { filters?: unknown[]; multiSelections?: boolean },
        ): Promise<unknown>;

        function showSaveDialog(
            title: string,
            options?: { filters?: unknown[]; forceOverwrite?: boolean },
        ): Promise<string>;

        function showFolderDialog(title?: string): Promise<string>;

        function showNotification(
            title: string,
            content: string,
            icon?: 'INFO' | 'WARNING' | 'ERROR' | 'QUESTION',
        ): Promise<void>;

        function showMessageBox(
            title: string,
            content: string,
            choice?: 'OK' | 'OK_CANCEL' | 'YES_NO' | 'YES_NO_CANCEL' | 'RETRY_CANCEL' | 'ABORT_RETRY_IGNORE',
            icon?: 'INFO' | 'WARNING' | 'ERROR' | 'QUESTION',
        ): Promise<string>;

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
        function open(url: string): Promise<{ success: boolean }>;
    }
}
