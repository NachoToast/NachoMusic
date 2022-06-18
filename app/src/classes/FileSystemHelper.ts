/** Path storing and subfolder validation. */
class FileSystemHelper {
    /** OS music path (see {@link Neutralino.os.getPath}), e.g. `C:/Users/Joe/Music` */
    private _musicPath?: string;

    public async getMusicPath(): Promise<string> {
        if (this._musicPath !== undefined) return this._musicPath;
        this._musicPath = await Neutralino.os.getPath('music');
        return this._musicPath;
    }

    public constructor() {
        this.getMusicPath();
        this.validateFolders();
    }

    private _validated: boolean = false;
    public async validateFolders(): Promise<void> {
        if (this._validated) return;
        const musicPath = await this.getMusicPath();

        // root folder
        try {
            await Neutralino.filesystem.createDirectory(`${musicPath}/NachoMusic`);
        } catch (error) {}

        // downloads folder
        try {
            await Neutralino.filesystem.createDirectory(`${musicPath}/NachoMusic/downloads`);
        } catch (error) {}
    }

    /** Removes the drive (`C:/`) on Windows paths.
     *
     * Useful for querying fileserver.
     */
    public convertPath(fullPath: string): string {
        const colonIndex = fullPath.indexOf(':');
        if (colonIndex === -1) {
            // not Windows
            return fullPath;
        }

        return fullPath.slice(colonIndex + 1);
    }
}

export default new FileSystemHelper();
