class ExtensionLogger {
    private readonly _tracking: Record<string, 'ALL' | 'ERRORS'> = {};

    public constructor(verbose: boolean = false) {
        Neutralino.events.on('extensionReady', ({ detail: id }) => {
            if (this._tracking[id] === 'ALL') {
                console.log(`%c${id} is ready`, 'color: lime');
            }
        });

        Neutralino.events.on('extensionError', ({ detail }) => {
            const { id, message, stack } = detail[0];
            if (this._tracking[id] !== undefined) {
                console.error(id, '\n', message, '\n', stack);
            }
        });

        Neutralino.events.on('extensionLog', ({ detail }) => {
            const { id, message } = detail[0];
            if (this._tracking[id] !== undefined) {
                console.log(`%c${id}`, 'color: gray');
                console.log(message);
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

    public add(id: string, log: 'ALL' | 'ERRORS' = 'ALL'): boolean {
        if (this._tracking[id] !== undefined) return false;
        this._tracking[id] = log;
        return true;
    }

    public addEvent<T extends keyof CustomEvents>(
        id: string,
        eventName: T,
        handler: CustomEvents[T]['appHandler'],
    ): void {
        if (this._tracking[id] !== undefined) {
            Neutralino.events.on(eventName, handler);
        } else throw new Error(`Not tracking ${id}`);
    }
}

export default new ExtensionLogger(false);
