import React from 'react';
import { CircularProgress, Grid } from '@mui/material';
import useDownloadedSongs from '../../hooks/useDownloadedSongs';
import Tile from './Tile';

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
        <Grid container spacing={1} sx={{ p: 1 }}>
            {Object.values(songs.items).map((e) => (
                <Tile key={e.id} song={e} />
            ))}
        </Grid>
    );
};

export default SongsPage;
