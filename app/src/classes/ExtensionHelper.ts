export enum WatchEventLevels {
    Errors,
    Ready,
    Logs,
}

class ExtensionLogger {
    private readonly _tracking: Record<string, { watching: Set<WatchEventLevels>; alias?: string }> = {};
    private readonly _aliases: Set<string> = new Set<string>();

    public constructor(verbose: boolean = false) {
        Neutralino.events.on('extensionReady', ({ detail: id }) => {
            if (this._tracking[id]?.watching.has(WatchEventLevels.Ready)) {
                console.log(`%c${this._tracking[id].alias ?? id} is ready`, 'color: lime');
            }
        });

        Neutralino.events.on('extensionError', ({ detail }) => {
            const { id, message, stack } = detail[0];
            if (this._tracking[id]?.watching.has(WatchEventLevels.Errors)) {
                console.error(this._tracking[id].alias ?? id, '\n', message, '\n', stack);
            }
        });

        Neutralino.events.on('extensionLog', ({ detail }) => {
            const { id, message } = detail[0];
            if (this._tracking[id]?.watching.has(WatchEventLevels.Logs)) {
                console.log(`%c[${this._tracking[id].alias ?? id}]%c`, 'color: gray', 'color: white', message);
            }
        });

        if (verbose) this.addAllListeners();
    }

    private addAllListeners() {
        Neutralino.events.on('appClientConnect', ({ detail }) => {
            console.log(`appClientConnect - ${detail}`);
        });

        Neutralino.events.on('appClientDisconnect', ({ detail }) => {
            console.log(`appClientDisconnect - ${detail}`);
        });

        Neutralino.events.on('clientConnect', ({ detail }) => {
            console.log(`clientConnect - ${detail}`);
        });

        Neutralino.events.on('clientDisconnect', ({ detail }) => {
            console.log(`clientDisconnect - ${detail}`);
        });

        Neutralino.events.on('extClientConnect', ({ detail }) => {
            console.log(`extClientConnect - ${detail[0]}`);
        });

        Neutralino.events.on('extClientDisconnect', ({ detail }) => {
            console.log(`extClientDisconnect - ${detail}`);
        });

        Neutralino.events.on('ready', ({ detail }) => {
            console.log(`ready - ${detail}`);
        });

        Neutralino.events.on('serverOffline', ({ detail }) => {
            console.log(`serverOffline - ${detail}`);
        });

        Neutralino.events.on('spawnedProcess', ({ detail }) => {
            console.log('spawnedProcess', detail);
        });

        Neutralino.events.on('trayMenuItemClicked', ({ detail }) => {
            console.log('trayMenuItemClicked', detail);
        });

        Neutralino.events.on('windowBlur', ({ detail }) => {
            console.log(`windowBlur - ${detail}`);
        });

        Neutralino.events.on('windowClose', ({ detail }) => {
            console.log(`windowClose - ${detail}`);
        });

        Neutralino.events.on('windowFocus', ({ detail }) => {
            console.log(`windowFocus - ${detail}`);
        });
    }

    public add(id: string, log: WatchEventLevels[] | 'ALL', alias?: string): boolean {
        if (alias !== undefined && this._aliases.has(alias)) {
            throw new Error(`Already tracking an extension with alias "${alias}"`);
        }
        if (this._tracking[id] !== undefined) {
            throw new Error(`Already tracking an extension with id "${id}"`);
        }

        let watching: Set<WatchEventLevels>;
        if (log === 'ALL') {
            watching = new Set([WatchEventLevels.Errors, WatchEventLevels.Logs, WatchEventLevels.Ready]);
        } else {
            watching = new Set(log);
        }

        this._tracking[id] = { watching, alias };
        if (alias !== undefined) this._aliases.add(alias);
        return true;
    }

    public addEvent<T extends keyof CustomEvents>(
        id: string,
        eventName: T,
        handler: CustomEvents[T]['appHandler'],
    ): void {
        if (this._tracking[id] !== undefined || this._aliases.has(id)) {
            Neutralino.events.on(eventName, handler);
        } else throw new Error(`Not tracking "${id}"`);
    }
}

export default new ExtensionLogger(false);
