export interface SongMetadata {
    /** Full path this file was copied from. */
    originalPath: string;

    /** Timestamp for when this file was first copied. */
    addedAt: number;
}

export interface PlaylistMetadata {
    name: string;
}
