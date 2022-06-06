interface Settings {
    navbarDisplay?: 'text' | 'icons' | 'both';
}

class SettingsHelper {
    private readonly _path =
        NL_RESMODE === 'bundle' ? `${NL_PATH}/data/settings.json` : `${NL_CWD}/app/build/data/settings.json`;

    private _settings!: Settings;
    private _navbar = document.getElementById('navbar')! as HTMLDivElement;

    public readonly defaultSettings: Settings = {
        navbarDisplay: 'both',
    };

    private static _instance?: SettingsHelper;
    public static async getInstance(): Promise<SettingsHelper> {
        if (this._instance) return this._instance;
        this._instance = new SettingsHelper();
        await this._instance.load();
        return this._instance;
    }

    /** Load or create a settings.json file. */
    private async load(): Promise<void> {
        try {
            this._settings = JSON.parse(await Neutralino.filesystem.readFile(this._path));
        } catch (error) {
            if ((error as { code?: string })?.code === 'NE_FS_FILRDER') {
                await Neutralino.filesystem.writeFile(this._path, JSON.stringify(this.defaultSettings, undefined, 4));

                // somewhat deep copy
                this._settings = { ...this.defaultSettings };
            } else throw error;
        }

        this.reloadNavbar();
    }

    private reloadNavbar(): void {
        const iconMap: Record<string, string> = {
            playlists: '📁',
            songs: '🎶',
            search: '🔍',
            settings: '🔧',
        };

        const iconFn =
            this._settings.navbarDisplay === 'both' || this._settings.navbarDisplay === 'icons'
                ? (x: string) => iconMap[x]
                : () => '';

        const txtFn =
            this._settings.navbarDisplay === 'both' || this._settings.navbarDisplay === 'text'
                ? (x: string) => x.slice(0, 1).toUpperCase() + x.slice(1)
                : () => '';

        for (let i = 0, len = this._navbar.childElementCount; i < len; i++) {
            const e = this._navbar.children.item(i)!;
            e.innerHTML = [iconFn(e.id), txtFn(e.id)].join(' ');
        }
    }

    public async set<T extends keyof Settings>(key: T, value: Settings[T]): Promise<void> {
        this._settings[key] = value;
        await Neutralino.filesystem.writeFile(this._path, JSON.stringify(this._settings, undefined, 4));
    }
}

export default SettingsHelper;
