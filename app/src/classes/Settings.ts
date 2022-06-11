import { files, validateAllFiles } from '../helpers/fileHelper';

interface SettingsData {
    navbarDisplay?: 'text' | 'icons' | 'both';
}

/** Handles showing of and changes to settings. */
class Settings {
    private static _instance?: Settings;

    public static async getInstance(): Promise<Settings> {
        if (this._instance) return this._instance;
        this._instance = new Settings();
        await validateAllFiles();
        const settings: SettingsData = JSON.parse(await Neutralino.filesystem.readFile(files.settings));
        this._instance._settings = settings;
        // this._instance.reloadPageButtons();
        return this._instance;
    }

    private constructor() {
        //
    }

    /** Default settings. */
    public static default: SettingsData = {
        navbarDisplay: 'both',
    };

    /** Current settings. */
    private _settings!: SettingsData;

    private readonly _playlistsPageButton = document.getElementById('playlistsPageButton') as HTMLHeadingElement;
    private readonly _songsPageButton = document.getElementById('songsPageButton') as HTMLHeadingElement;
    private readonly _searchPageButton = document.getElementById('searchPageButton') as HTMLHeadingElement;
    private readonly _settingsPageButton = document.getElementById('settingsPageButton') as HTMLHeadingElement;

    public reloadPageButtons() {
        const buttons = [
            this._playlistsPageButton,
            this._songsPageButton,
            this._searchPageButton,
            this._settingsPageButton,
        ];

        const textFunction =
            this._settings.navbarDisplay === 'text' || this._settings.navbarDisplay === 'both'
                ? (i: number) => ['Playlists', 'Songs', 'Search', 'Settings'][i]
                : () => '';

        const iconFunction =
            this._settings.navbarDisplay === 'icons' || this._settings.navbarDisplay === 'both'
                ? (i: number) => ['📁', '🎶', '🔍', '🔧'][i]
                : () => '';

        buttons.forEach((e, i) => {
            e.innerText = [iconFunction(i), textFunction(i)].join(' ');
        });
    }

    public async set<T extends keyof SettingsData>(key: T, value: SettingsData[T]): Promise<void> {
        this._settings[key] = value;
        await Neutralino.filesystem.writeFile(files.settings, JSON.stringify(this._settings, undefined, 4));

        switch (key) {
            case 'navbarDisplay':
                this.reloadPageButtons();
                break;
            default:
                break;
        }
    }
}

export default Settings;
