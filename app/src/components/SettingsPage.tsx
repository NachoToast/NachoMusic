import React from 'react';
import { CircularProgress, Container, Paper, Stack, Typography } from '@mui/material';
import useSettings from '../hooks/useSettings';

const SettingsPage = () => {
    const settings = useSettings();

    if (settings === undefined) {
        return (
            <Stack justifyContent="center" alignItems="center" spacing={1}>
                <CircularProgress size={60} />
                <Typography variant="h5">Loading Settings...</Typography>
            </Stack>
        );
    }

    return (
        <Container maxWidth="md" sx={{ pt: 3 }}>
            <Paper sx={{ whiteSpace: 'pre-wrap', p: 1 }}>{JSON.stringify(settings, undefined, 4)}</Paper>
        </Container>
    );
};

export default SettingsPage;
