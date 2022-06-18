import React from 'react';
import { Box, Button, CircularProgress, Grid, Modal, Stack, Typography } from '@mui/material';
import { StoredYoutubeVideo } from '../../../../shared/YouTube';
import moment from 'moment';
import useThumbnail from '../../hooks/useThumbnail';

interface ConfirmDeleteModalProps {
    song: StoredYoutubeVideo;
    callback: (answer: 'confirm' | 'cancel') => void;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 4,
};

const ConfirmDeleteModal = ({ song, callback }: ConfirmDeleteModalProps) => {
    const handleClose = () => callback('cancel');

    const thumbnail = useThumbnail(song);

    return (
        <Modal open onClose={handleClose}>
            <Box sx={style}>
                <Grid container>
                    <Grid item xs={thumbnail !== null ? 8 : 12}>
                        <Typography variant="h6" gutterBottom>
                            Remove <span style={{ color: 'pink' }}>{song.title}</span> from downloads?
                        </Typography>
                        <Typography>
                            <span style={{ color: 'gray' }}>Size on disk: </span>
                            {(
                                Math.ceil(song.size / 1024) + Math.ceil((song.thumbnail?.size ?? 0) / 1024)
                            ).toLocaleString('en-NZ')}{' '}
                            KB
                        </Typography>
                        <Typography>
                            <span style={{ color: 'gray' }}>Downloaded: </span>
                            {new Date(song.dateDownloaded).toLocaleDateString('en-NZ')} (
                            {moment(song.dateDownloaded).fromNow()})
                        </Typography>
                    </Grid>
                    <Grid item xs={thumbnail !== null ? 4 : 0}>
                        {thumbnail !== null ? (
                            thumbnail !== undefined ? (
                                <img style={{ maxWidth: '100%' }} src={thumbnail} alt={`Thumbnail for ${song.title}`} />
                            ) : (
                                <CircularProgress />
                            )
                        ) : (
                            <></>
                        )}
                    </Grid>
                </Grid>
                <Stack direction="row" sx={{ width: '100%', pt: 3 }} justifyContent="space-evenly">
                    <Button color="success" variant="outlined" size="large" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button color="error" variant="outlined" size="large" onClick={() => callback('confirm')}>
                        Remove
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
};

export default ConfirmDeleteModal;
