declare type CustomEvents = import('../../shared/messages').CustomEvents;

interface BaseResponse {
    success: boolean;
}

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
        function broadcast(eventName: string, data?: string): Promise<BaseResponse>;
    }

    /** {@link https://neutralino.js.org/docs/api/clipboard API Reference} */
    namespace clipboard {
        /** Writes text into the system clipboard. */
        function writeText(text: string): Promise<BaseResponse>;

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
            ready: (_: CustomEvent<null>) => void;
            trayMenuItemClicked: (item: CustomEvent<Neutralino.os.TrayMenuItem>) => void;
            windowClose: (_: CustomEvent<null>) => void;
            windowFocus: (_: CustomEvent<null>) => void;
            windowBlur: (_: CustomEvent<null>) => void;
            serverOffline: (_: CustomEvent<null>) => void;
            clientConnect: (totalClients: CustomEvent<number>) => void;
            clientDisconnect: (totalClients: CustomEvent<number>) => void;
            appClientConnect: (totalAppClients: CustomEvent<number>) => void;
            appClientDisconnect: (totalAppClients: CustomEvent<number>) => void;
            extClientConnect: (extensionId: CustomEvent<string>) => void;
            extClientDisconnect: (extensionId: CustomEvent<string>) => void;
            extensionReady: (extensionId: CustomEvent<string>) => void;
            spawnedProcess: (
                spawned: CustomEvent<{ action: 'stdOut' | 'stdErr' | 'exit'; data: string; id: number }>,
            ) => void;
        }

        /** Registers a native event handler. */
        function on<T extends keyof EventData>(
            eventType: T,
            handler: EventData[T],
        ): Promise<{ success: boolean; message: string }>;

        /** Registers a custom event handler documented in {@link CustomEvents}. */
        function on<T extends keyof CustomEvents>(
            eventType: T,
            handler: CustomEvents[T]['appHandler'],
        ): Promise<{ success: boolean; message: string }>;

        /** Unregisters a native event handler. */
        function off<T extends keyof EventData>(
            eventType: T,
            handler: EventData[T],
        ): Promise<{ success: boolean; message: string }>;

        /** Unregisters a custom event handler documented in {@link CustomEvents}. */
        function off<T extends keyof CustomEvents>(
            eventType: T,
            handler: CustomEvents[T]['appHandler'],
        ): Promise<{ success: boolean; message: string }>;

        /** Dispatches a new event to the current app instance. */
        function dispatch<T extends keyof CustomEvents>(
            eventName: T,
            ...data: Parameters<CustomEvents[T]['generalHandler']>
        ): Promise<BaseResponse>;

        /** Dispatches a new event to all clients (app and extension clients). */
        function broadcast<T extends keyof CustomEvents>(
            eventName: T,
            ...data: Parameters<CustomEvents[T]['generalHandler']>
        ): Promise<BaseResponse>;
    }

    /** {@link https://neutralino.js.org/docs/api/extensions API Reference} */
    namespace extensions {
        /**
         * Dispatches a new event to an extension instance.
         *
         * If the targeted extension is not connected yet,
         * Neutralino client library will queue the function call and send whenever the extension comes online.
         */
        function dispatch<T extends keyof CustomEvents>(
            identifier: string,
            eventName: T,
            ...data: Parameters<CustomEvents[T]['generalHandler']>
        ): Promise<BaseResponse>;

        /**
         * Dispatches a new event to all connected extensions.
         *
         * If an extension is loaded but not connected yet,
         * the particular extension won't get the new event.
         *
         * Use `extensions.dispatch` to send messages even if the extension is not connected to the main process.
         */
        function broadcast<T extends keyof CustomEvents>(
            eventName: T,
            ...data: Parameters<CustomEvents[T]['generalHandler']>
        ): Promise<BaseResponse>;

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

    /** {@link https://neutralino.js.org/docs/api/os API Reference} */
    namespace os {
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
