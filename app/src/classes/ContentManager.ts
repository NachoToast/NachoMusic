import { basename } from 'path';

/** Handles file reading, creation, and general management. */
class ContentManager {
    /** Root folder of all songs and other data files. */
    public readonly rootFolder = NL_RESMODE === 'bundle' ? `${NL_PATH}/data` : `${NL_CWD}/app/build/data`;
    public readonly songsFolder = 'songs';

    private _numSongs = 0;
    public get numSongs(): number {
        return this._numSongs;
    }

    private static _instance?: ContentManager;
    public static async getInstance(): Promise<ContentManager> {
        if (this._instance) return this._instance;
        this._instance = new ContentManager();
        await this._instance.validateFolders();
        return this._instance;
    }

    /**
     * Checks the root folder and it's children exist, making them if it they don't.
     * @returns {number} Number of songs found.
     */
    private async validateFolders(): Promise<void> {
        // creating root folder
        try {
            await Neutralino.filesystem.readDirectory(this.rootFolder);
        } catch (error) {
            if ((error as { code?: string })?.code === 'NE_FS_NOPATHE') {
                await Neutralino.filesystem.createDirectory(this.rootFolder);
                await Neutralino.filesystem.createDirectory(`${this.rootFolder}/${this.songsFolder}`);
                this._numSongs = 0;
                return;
            } else throw error;
        }

        // creating songs folder
        try {
            const songs = await Neutralino.filesystem.readDirectory(`${this.rootFolder}/${this.songsFolder}`);
            this._numSongs = songs.length;
        } catch (error) {
            if ((error as { code?: string })?.code === 'NE_FS_NOPATHE') {
                await Neutralino.filesystem.createDirectory(`${this.rootFolder}/${this.songsFolder}`);
                this._numSongs = 0;
            } else throw error;
        }
    }

    /**
     * Copies a file into the root folder.
     * @param {String} source Full path to source file.
     * @param {String} [name] Name to save file as, if different from original one.
     * @returns {String} The location the file was saved to.
     */
    public async addSong(source: string, name?: string): Promise<string> {
        if (source.includes('\\')) {
            // basename function only works with forward slashes
            source = source.replace(/\\/g, '/');
        }

        const finalName = name || basename(source);
        const destination = `${this.rootFolder}/${this.songsFolder}/${finalName}`;

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
        this._numSongs++;

        return `data/${finalName}`;
    }
}

export default ContentManager;
