import { Button, Card, CardContent, CardMedia, Stack, Tooltip, Typography, Box } from '@mui/material';
import { ytsr } from '../../../shared/ytsr';
import DownloadIcon from '@mui/icons-material/Download';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { viewCountFormatter } from '../helpers/viewCountFormatter';
import channelBadgesMap from '../helpers/channelBadgesMap';
import { useCallback, useEffect, useState } from 'react';

const SearchResult = ({ result }: { result: ytsr.Video }) => {
    const [copied, setCopied] = useState<boolean>(false);
    const handleCopyLink = useCallback(() => {
        setCopied(true);
        Neutralino.clipboard.writeText(result.url);
    }, [result.url]);
    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;
        if (copied) {
            timeout = setTimeout(() => setCopied(false), 1000);
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [copied]);

    return (
        <Card sx={{ display: 'flex', alignItems: 'stretch' }}>
            <div style={{ position: 'relative', display: 'flex' }}>
                <CardMedia component="img" sx={{ width: 250 }} image={result.bestThumbnail.url || ''} />
                <Typography
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        margin: '1px',
                        padding: '0 2px',
                        borderRadius: '2px',
                    }}
                >
                    {result.duration}
                </Typography>
            </div>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardContent sx={{ flex: '1 0 auto' }} style={{ paddingBottom: 0 }}>
                    <Typography component="div" variant="h5">
                        {result.title}
                    </Typography>
                    <Typography component="div" variant="body2" color="gray" gutterBottom>
                        {result.views !== null ? viewCountFormatter(result.views).toUpperCase() : '?'} views •{' '}
                        {result.uploadedAt}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                        <img
                            src={result.author?.bestAvatar?.url || ''}
                            style={{ borderRadius: '50%', height: '32px', width: '32px' }}
                            alt={`${result.author?.name || 'Unknown channel'} Youtube avatar`}
                        />
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography component="div" variant="body2" color="gray">
                                {result.author?.name || '?'}
                            </Typography>
                            {result.author?.ownerBadges.map((e, i) => (
                                <span style={{ color: 'gray' }} key={i}>
                                    {channelBadgesMap(e)}
                                </span>
                            ))}
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={0}>
                        <Tooltip placement="top" title={<Typography>Download</Typography>}>
                            <Button>
                                <DownloadIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip placement="top" title={<Typography>Add to Playlist</Typography>}>
                            <Button>
                                <PlaylistAddIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip placement="top" title={<Typography>{copied ? 'Copied!' : 'Copy Link'}</Typography>}>
                            <Button color={copied ? 'success' : 'primary'} onClick={handleCopyLink}>
                                <AddLinkIcon />
                            </Button>
                        </Tooltip>
                    </Stack>
                </CardContent>
            </Box>
        </Card>
    );
};

export default SearchResult;
