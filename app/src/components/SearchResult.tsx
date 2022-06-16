import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Stack,
    Tooltip,
    Typography,
    Box,
    Fade,
    CircularProgress,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { viewCountFormatter } from '../helpers/viewCountFormatter';
import channelBadgesMap from '../helpers/channelBadgesMap';
import { useCallback, useEffect, useState } from 'react';
import { SearchedYouTubeVideo } from '../../../shared/YouTube';
import { MAIN_EXTENSION } from '../typings/Main';
import FileSystemHelper from '../classes/FileSystemHelper';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import { useDispatch, useSelector } from 'react-redux';
import { addSongs, getDownloadedSongs } from '../redux/slices/songsSlice';

enum DownloadStatus {
    Able,
    InProgress,
    Done,
}

const SearchResult = ({ result }: { result: SearchedYouTubeVideo }) => {
    const dispatch = useDispatch();
    const songs = useSelector(getDownloadedSongs);
    const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>(
        songs?.items && songs.items[result.id] !== undefined ? DownloadStatus.Done : DownloadStatus.Able,
    );
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        if (downloadStatus === DownloadStatus.InProgress) {
            const handleProgress: CustomEvents['youtubeDownloadProgress']['appHandler'] = ({ detail: [progress] }) => {
                const { done, total, url } = progress;
                if (url === result.url) {
                    setProgress(Math.floor((100 * done) / total));
                }
            };

            const handleFinished: CustomEvents['youtubeDownloadDone']['appHandler'] = ({ detail: [res] }) => {
                if (res.url === result.url) {
                    dispatch(addSongs([res]));
                    setDownloadStatus(DownloadStatus.Done);
                }
            };

            Neutralino.events.on('youtubeDownloadDone', handleFinished);
            Neutralino.events.on('youtubeDownloadProgress', handleProgress);
            return () => {
                Neutralino.events.off('youtubeDownloadDone', handleFinished);
                Neutralino.events.off('youtubeDownloadProgress', handleProgress);
            };
        }
    }, [dispatch, downloadStatus, result.url]);

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

    const handleDownload = useCallback(async () => {
        if (downloadStatus !== DownloadStatus.Able) return;
        setDownloadStatus(DownloadStatus.InProgress);
        Neutralino.extensions.dispatch(MAIN_EXTENSION, 'youtubeDownloadStart', {
            url: result.url,
            destinationPath: `${await FileSystemHelper.getMusicPath()}/NachoMusic/downloads/${result.id}`,
        });
    }, [downloadStatus, result.id, result.url]);

    return (
        <Card sx={{ display: 'flex', alignItems: 'stretch', height: 150 }}>
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
                    <Typography component="div" variant="h5" sx={{ whiteSpace: 'nowrap' }}>
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
                                <span style={{ color: 'gray', marginBottom: '-5px' }} key={i}>
                                    {channelBadgesMap(e)}
                                </span>
                            ))}
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={0}>
                        <Tooltip
                            placement="top"
                            title={
                                <Typography>
                                    {downloadStatus === DownloadStatus.Able
                                        ? 'Download'
                                        : downloadStatus === DownloadStatus.InProgress
                                        ? 'Downloading'
                                        : 'Downloaded!'}
                                </Typography>
                            }
                        >
                            <span>
                                <Button disabled={downloadStatus !== DownloadStatus.Able} onClick={handleDownload}>
                                    {downloadStatus === DownloadStatus.Able ? (
                                        <DownloadIcon />
                                    ) : downloadStatus === DownloadStatus.Done ? (
                                        <DownloadDoneIcon color="success" />
                                    ) : (
                                        <CircularProgress
                                            variant={progress !== 0 ? 'determinate' : 'indeterminate'}
                                            value={progress}
                                            sx={{ mb: -1.5 }}
                                            size={20}
                                        />
                                    )}
                                </Button>
                            </span>
                        </Tooltip>
                        <Tooltip placement="top" title={<Typography>{copied ? 'Copied!' : 'Copy Link'}</Typography>}>
                            <Button color={copied ? 'success' : 'primary'} onClick={handleCopyLink}>
                                <AddLinkIcon />
                            </Button>
                        </Tooltip>
                        <Fade in={downloadStatus === DownloadStatus.Done}>
                            <Tooltip placement="top" title={<Typography>Add to Playlist</Typography>}>
                                <Button>
                                    <PlaylistAddIcon />
                                </Button>
                            </Tooltip>
                        </Fade>
                    </Stack>
                </CardContent>
            </Box>
        </Card>
    );
};

export default SearchResult;
