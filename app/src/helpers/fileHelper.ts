import Settings from '../classes/Settings';

interface FileStructure {
    // folders
    root: string;
    localSongs: string;
    downloadedSongs: string;

    // files
    settings: string;
    localSongsManifest: string;
    downloadedSongsManifest: string;
    playlists: string;
}

interface BaseFile {
    name: string;
    defaultValue: string | (() => string);
}

const root = NL_RESMODE === 'bundle' ? `${NL_PATH}/data` : `${NL_CWD}/app/build/data`;
const localSongs = `${root}/localSongs`;
const downloadedSongs = `${root}/downloadedSongs`;

const settings: BaseFile = {
    name: `${root}/settings.json`,
    defaultValue: () => JSON.stringify(Settings.default, undefined, 4),
};
const localSongsManifest: BaseFile = { name: `${root}/localSongs.json`, defaultValue: '' };
const downloadedSongsManifest: BaseFile = { name: `${root}/downloadedSongs.json`, defaultValue: '' };
const playlists: BaseFile = { name: `${root}/playlists.json`, defaultValue: '' };

export const files: FileStructure = {
    root,
    localSongs,
    downloadedSongs,

    settings: settings.name,
    localSongsManifest: localSongsManifest.name,
    downloadedSongsManifest: downloadedSongsManifest.name,
    playlists: playlists.name,
};

let validationDone = false;
export async function validateAllFiles(): Promise<void> {
    if (validationDone) return;

    // validate root folder
    try {
        await Neutralino.filesystem.createDirectory(root);
    } catch (error) {
        //
    }

    // top-level folders
    await Promise.all(
        [localSongs, downloadedSongs].map((e) => Neutralino.filesystem.createDirectory(e).catch(() => void 0)),
    );

    // files
    await Promise.all(
        [settings, localSongsManifest, downloadedSongsManifest, playlists].map((e) =>
            Neutralino.filesystem
                .getStats(e.name)
                .catch(() =>
                    Neutralino.filesystem.writeFile(
                        e.name,
                        typeof e.defaultValue === 'string' ? e.defaultValue : e.defaultValue(),
                    ),
                ),
        ),
    );

    validationDone = true;
}
