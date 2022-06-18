import { TypedEmitter } from 'tiny-typed-emitter';
import { DefaultDownloadedSongs, DownloadedSongs } from '../typings/DownloadedSongs';
import { DefaultSettings, Settings } from '../typings/Settings';
import FileSystemHelper from './FileSystemHelper';

export interface TrackedFileEvents<T> {
    loaded: (d: T) => void;
    newDataSaved: (d: T) => void;
}

/**
 * A JSON file that is being used by NachoMusic to store data.
 *
 * These are **not** safe to store in state.
 */
export class TrackedFile<T = object> extends TypedEmitter<TrackedFileEvents<T>> {
    /** The full path to this file, may have OS-dependent flags like `%MUSIC_PATH%`. */
    public readonly path: string;

    public readonly defaultValue: T;

    private _data?: T;

    public constructor(path: string, defaultValue: T) {
        super();
        this.path = path;
        this.defaultValue = defaultValue;
    }

    /** Saves data to file. */
    public async save(): Promise<void> {
        if (this._data === undefined) throw new Error(`Trying to save no data`);
        let actualPath = this.path;
        if (this.path.includes('%MUSIC_PATH%')) {
            actualPath = actualPath.replaceAll(/%MUSIC_PATH%/g, await FileSystemHelper.getMusicPath());
        }

        await Neutralino.filesystem.writeFile(actualPath, JSON.stringify(this._data, undefined, 4));
        this.emit('newDataSaved', this._data);
    }

    public async setData(data: T): Promise<void> {
        this._data = data;
        return await this.save();
    }

    public async getData(): Promise<T> {
        if (this._data !== undefined) return this._data;
        return await this.load();
    }

    /** Loads data from file, this should only be done once. */
    private async load(): Promise<T> {
        if (this._data !== undefined) throw new Error(`Tried to load file twice: '${this.path}'`);
        await FileSystemHelper.validateFolders();

        let actualPath = this.path;
        if (this.path.includes('%MUSIC_PATH%')) {
            const musicPath = await FileSystemHelper.getMusicPath();
            actualPath = actualPath.replaceAll(/%MUSIC_PATH%/g, musicPath);
        }

        try {
            const existingFile = await Neutralino.filesystem.readFile(actualPath);
            this._data = JSON.parse(existingFile) as T;
        } catch (error) {
            this._data = this.defaultValue;
            await this.save();
        }
        this.emit('loaded', this._data);
        return this._data;
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
