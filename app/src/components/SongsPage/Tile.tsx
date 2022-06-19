import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { StoredYoutubeVideo } from '../../../../shared/YouTube';
import useThumbnail from '../../hooks/useThumbnail';

const Tile = ({ song }: { song: StoredYoutubeVideo }) => {
    const thumbnail = useThumbnail(song);

    return (
        <Grid item xs={3}>
            <Paper elevation={5} sx={{ height: 200 }}>
                <Typography>{song.title}</Typography>
                {!!thumbnail && <img src={thumbnail} style={{ width: '90%' }} alt="" />}
            </Paper>
        </Grid>
    );
};

export default Tile;
