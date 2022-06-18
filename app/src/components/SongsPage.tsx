import React from 'react';
import { CircularProgress } from '@mui/material';
import useDownloadedSongs from '../hooks/useDownloadedSongs';

const SongsPage = () => {
    const { songs } = useDownloadedSongs();

    if (songs === undefined) {
        return (
            <div>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div>
            {Object.values(songs.items).map((e) => (
                <div key={e.id}>
                    <p>
                        {e.title} ({e.id})
                    </p>
                </div>
            ))}
        </div>
    );
};

export default SongsPage;
