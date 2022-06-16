import { DefaultDownloadedSongs, DownloadedSongs } from '../typings/DownloadedSongs';
import { DefaultSettings, Settings } from '../typings/Settings';
import FileSystemHelper from './FileSystemHelper';

/**
 * A JSON file that is being used by NachoMusic to store data.
 *
 * These are **not** safe to store in state.
 */
export class TrackedFile<T = object> {
    /** The full path to this file, may have OS-dependent flags like `%MUSIC_PATH%`. */
    public readonly path: string;

    public readonly defaultValue: T;

    private _loaded: boolean = false;

    public constructor(path: string, defaultValue: T) {
        this.path = path;
        this.defaultValue = defaultValue;
    }

    /** Saves data to file. */
    public async save(data: T): Promise<void> {
        let actualPath = this.path;
        if (this.path.includes('%MUSIC_PATH%')) {
            actualPath = actualPath.replaceAll(/%MUSIC_PATH%/g, await FileSystemHelper.getMusicPath());
        }

        await Neutralino.filesystem.writeFile(actualPath, JSON.stringify(data, undefined, 4));
    }

    /** Loads data from file, this should only be done once. */
    public async load(): Promise<T> {
        if (this._loaded) throw new Error(`Tried to load file twice: '${this.path}'`);
        await FileSystemHelper.validateFolders();

        let actualPath = this.path;
        if (this.path.includes('%MUSIC_PATH%')) {
            const musicPath = await FileSystemHelper.getMusicPath();
            actualPath = actualPath.replaceAll(/%MUSIC_PATH%/g, musicPath);
        }

        try {
            const existingFile = await Neutralino.filesystem.readFile(actualPath);
            return JSON.parse(existingFile) as T;
        } catch (error) {
            await this.save(this.defaultValue);
            return this.defaultValue;
        }
    }
}

const SettingsFile = new TrackedFile<Settings>('%MUSIC_PATH%/NachoMusic/settings.json', DefaultSettings);
const PlaylistsFile = new TrackedFile<{ playlists: true }>('%MUSIC_PATH%/NachoMusic/playlists.json', {
    playlists: true,
});
const DownloadedSongsFile = new TrackedFile<DownloadedSongs>(
    '%MUSIC_PATH%/NachoMusic/downloadedSongs.json',
    DefaultDownloadedSongs,
);

export const FILES = { SettingsFile, PlaylistsFile, DownloadedSongsFile };
