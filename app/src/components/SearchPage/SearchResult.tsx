import React from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Slide,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import { SearchedYouTubeVideo } from '../../../../shared/YouTube';
import { DurationLabel, VideoTitle } from './SearchResult.styled';
import useHover from '../../hooks/useHover';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

import DownloadIcon from '@mui/icons-material/Download';
import AddLinkIcon from '@mui/icons-material/AddLink';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CopyLinkButton from '../Buttons/CopyLinkButton';
import ExternalLink from '../Links/ExternalLink';

/** Maps channel badge names to icons. */
function channelBadgesMap(badge: string): JSX.Element {
    let element: JSX.Element | null = null;
    switch (badge) {
        case 'Official Artist Channel':
            element = <MusicNoteIcon fontSize="small" />;
            break;
        case 'Verified':
            element = <CheckCircleIcon fontSize="small" />;
            break;
        default:
            break;
    }

    if (element === null) return <></>;

    return (
        <IconButton style={{ cursor: 'help', color: 'gray' }} disableTouchRipple title={badge}>
            {element}
        </IconButton>
    );
}

const SearchResult = ({ result }: { result: SearchedYouTubeVideo }) => {
    const [hoverRef, isHovered] = useHover();

    return (
        <Card sx={{ display: 'flex', alignItems: 'stretch' }} ref={hoverRef}>
            <div style={{ position: 'relative', display: 'flex' }}>
                <CardMedia component="img" sx={{ width: 250 }} image={result.bestThumbnail.url || ''} />
                <DurationLabel>{result.duration}</DurationLabel>
            </div>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
                <CardContent sx={{ flex: '1 0 auto' }} style={{ paddingBottom: 0 }}>
                    <ExternalLink href={result.url}>
                        <VideoTitle variant="h5" title={result.title}>
                            {result.title}
                        </VideoTitle>
                    </ExternalLink>
                    <Typography component="div" variant="body2" color="gray" gutterBottom>
                        {result.views !== null
                            ? Intl.NumberFormat('en', { notation: 'compact' }).format(result.views)
                            : '?'}{' '}
                        views • {result.uploadedAt}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                        <img
                            src={result.author?.bestAvatar?.url || ''}
                            style={{ borderRadius: '50%', height: '32px', width: '32px' }}
                            alt={`${result.author?.name || 'Unknown channel'} Youtube avatar`}
                        />
                        <Stack direction="row" alignItems="center">
                            <Typography component="div" variant="body2" color="gray">
                                {result.author?.name || 'Unknown'}
                            </Typography>
                            {result.author?.ownerBadges.map((e, i) => (
                                <span key={i}>{channelBadgesMap(e)}</span>
                            ))}
                        </Stack>
                    </Stack>
                    <Slide in={isHovered} direction="up" container={hoverRef.current}>
                        <Stack direction="row">
                            <Tooltip placement="top" disableInteractive title={<Typography>Download</Typography>}>
                                <Button>
                                    <DownloadIcon />
                                </Button>
                            </Tooltip>
                            <CopyLinkButton
                                initialTooltip="Copy Link"
                                value={result.url}
                                tooltipProps={{ disableInteractive: true, placement: 'top' }}
                            >
                                <AddLinkIcon />
                            </CopyLinkButton>
                            <Tooltip
                                placement="top"
                                disableInteractive
                                title={<Typography>Add to Playlist</Typography>}
                            >
                                <Button>
                                    <PlaylistAddIcon />
                                </Button>
                            </Tooltip>
                        </Stack>
                    </Slide>
                </CardContent>
            </Box>
        </Card>
    );
};

export default SearchResult;
