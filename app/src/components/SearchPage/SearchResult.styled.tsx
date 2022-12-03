import { styled, Typography } from '@mui/material';

export const DurationLabel = styled(Typography)(() => ({
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    margin: '1px',
    padding: '0 2px',
    borderRadius: '2px',
}));

export const VideoTitle = styled(Typography)(() => ({
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
}));
