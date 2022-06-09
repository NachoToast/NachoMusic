import { basename } from 'path';
import { files, validateAllFiles } from '../helpers/fileHelper';

class SongManager {
    private static _instance?: SongManager;

    public static async getInstance(): Promise<SongManager> {
        if (this._instance) return this._instance;
        this._instance = new SongManager();
        await validateAllFiles();

        const [local, downloaded] = await Promise.all([
            Neutralino.filesystem.readDirectory(files.localSongs),
            Neutralino.filesystem.readDirectory(files.downloadedSongs),
        ]);

        this._instance._localSongs = local.filter(({ type }) => type === 'FILE').map(({ entry }) => entry);
        this._instance._downloadedSongs = downloaded.filter(({ type }) => type === 'FILE').map(({ entry }) => entry);

        return this._instance;
    }

    private constructor() {
        //
    }

    private _localSongs: string[] = [];
    private _downloadedSongs: string[] = [];

    public get size(): number {
        return this._localSongs.length + this._downloadedSongs.length;
    }

    /**
     * Copies a file into the root folder.
     * @param {String} source Full path to source file.
     * @param {String} [name] Name to save file as, if different from original one.
     * @returns {String} The location the file was saved to.
     */
    public async addSong(source: string, name?: string): Promise<void> {
        if (source.includes('\\')) {
            // basename function only works with forward slashes
            source = source.replace(/\\/g, '/');
        }

        const finalName = name || basename(source);
        const destination = `${files.localSongs}/${finalName}`;

        try {
            await Neutralino.filesystem.getStats(destination);
            throw new Error(`${finalName} already exists!`);
        } catch (error) {
            // we expect a "no path" error here sincethe destination file shouldn't yet exist
            if (!((error as { code?: string })?.code === 'NE_FS_NOPATHE')) {
                throw error;
            }
        }

        await Neutralino.filesystem.copyFile(source, destination);

        this._localSongs.push(finalName);
    }

    /** Opens a file dialogue for adding song/video files to the library. */
    public async openAddSongsDialog(): Promise<number> {
        const sources = await Neutralino.os.showOpenDialog('Select Songs', {
            filters: [{ name: 'Audio Files', extensions: ['mp3', 'mp4', 'wav'] }],
        });

        await Promise.all(sources.map((e) => this.addSong(e)));

        console.log(sources);

        return sources.length;
    }

    private _app = document.getElementById('app')! as HTMLDivElement;

    public showSongsPage(): void {
        //
    }
}

export default SongManager;
