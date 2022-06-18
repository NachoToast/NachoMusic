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
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SearchedYouTubeVideo, StoredYoutubeVideo } from '../../../shared/YouTube';
import { MAIN_EXTENSION } from '../typings/Main';
import FileSystemHelper from '../classes/FileSystemHelper';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import ErrorIcon from '@mui/icons-material/Error';
import useDownloadedSongs from '../hooks/useDownloadedSongs';
import { FILES } from '../classes/TrackedFile';
import { DownloadedSongs } from '../typings/DownloadedSongs';
import ConfirmDeleteModal from './Modals/ConfirmDeleteModal';

enum DownloadStatus {
    /** An error has occurred while trying to download this resource. */
    Errored,
    /** User can initiate download process. */
    Able,
    /** Download in progress. */
    InProgress,
    /** Download has been initialized and completed. */
    Done,
    /** Download was done at an earlier time. */
    AlreadyDone,
}

const SearchResult = ({ result }: { result: SearchedYouTubeVideo }) => {
    const { songs, setSongs } = useDownloadedSongs();
    const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>(DownloadStatus.Able);
    const [progress, setProgress] = useState<number>(0);

    // for showing size of the song (and thumbnail) on disk
    const [localSize, setLocalSize] = useState<number>(0);

    const handleSizeChange = useCallback(({ size, thumbnail }: StoredYoutubeVideo) => {
        const songSize = Math.ceil(size / 1024);
        const thumbnailSize = thumbnail !== null ? Math.ceil(thumbnail.size / 1024) : 0;
        setLocalSize(songSize + thumbnailSize);
    }, []);

    // mark as already downloaded if the video ID is in local songs,
    // this is a useEffect because local songs takes time to load, meaning
    // it cant be put straight into the initial value of useState
    useEffect(() => {
        const handleLoad = (d: DownloadedSongs) => {
            if (d.items[result.id] !== undefined) {
                setDownloadStatus(DownloadStatus.AlreadyDone);
                handleSizeChange(d.items[result.id]);
            }
        };

        FILES.DownloadedSongsFile.on('loaded', handleLoad);

        return () => {
            FILES.DownloadedSongsFile.off('loaded', handleLoad);
        };
    }, [handleSizeChange, result.id]);

    // download progress handling
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
                    if (songs === undefined) {
                        setDownloadStatus(DownloadStatus.Errored);
                        console.error(`Tried to save "${res.title}" but songs file hasn't loaded yet`);
                    } else {
                        songs.items[result.id] = res;
                        setSongs(songs).then(() => {
                            setDownloadStatus(DownloadStatus.Done);
                            handleSizeChange(songs.items[result.id]);
                        });
                    }
                }
            };

            Neutralino.events.on('youtubeDownloadDone', handleFinished);
            Neutralino.events.on('youtubeDownloadProgress', handleProgress);
            return () => {
                Neutralino.events.off('youtubeDownloadDone', handleFinished);
                Neutralino.events.off('youtubeDownloadProgress', handleProgress);
            };
        }
    }, [downloadStatus, handleSizeChange, result.id, result.url, setSongs, songs]);

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
        Neutralino.extensions.dispatch(MAIN_EXTENSION, 'youtubeDownloadStart', {
            url: result.url,
            destinationPath: `${await FileSystemHelper.getMusicPath()}/NachoMusic/downloads/${result.id}`,
        });
        setDownloadStatus(DownloadStatus.InProgress);
    }, [downloadStatus, result.id, result.url]);

    const downloadIconTitle = useMemo<string>(() => {
        switch (downloadStatus) {
            case DownloadStatus.Errored:
                return 'Errored';
            case DownloadStatus.Able:
                return 'Download';
            case DownloadStatus.InProgress:
                return 'Downloading';
            case DownloadStatus.Done:
                return `Downloaded (${localSize !== 0 ? localSize.toLocaleString('en-NZ') : '??'} KB)`;
            case DownloadStatus.AlreadyDone:
                return `Already Downloaded (${localSize !== 0 ? localSize.toLocaleString('en-NZ') : '??'} KB)`;
        }
    }, [downloadStatus, localSize]);

    const [isConfirmingDelete, setIsConfirmingDelete] = useState<boolean>(false);
    const handleConfirmDelete = useCallback(
        async (answer: 'confirm' | 'cancel') => {
            setIsConfirmingDelete(false);
            if (answer === 'cancel') return;

            if (songs === undefined) {
                setDownloadStatus(DownloadStatus.Errored);
                console.error(`Tried to delete "${result.title}" but songs file hasn't loaded yet`);
            } else if (songs.items[result.id] === undefined) {
                setDownloadStatus(DownloadStatus.Errored);
                console.error(`Tried to delete "${result.title}" but song isn't downloaded`);
            } else {
                const { thumbnail } = songs.items[result.id];
                const destinationPath = `${await FileSystemHelper.getMusicPath()}/NachoMusic/downloads/${result.id}`;

                const removeMain = Neutralino.filesystem.removeFile(`${destinationPath}.mp4`);
                const removeThumbnail = thumbnail
                    ? Neutralino.filesystem.removeFile(`${destinationPath}${thumbnail.extension}`)
                    : Promise.resolve();

                await Promise.all([removeMain, removeThumbnail]);
                delete songs.items[result.id];

                setSongs(songs).then(() => setDownloadStatus(DownloadStatus.Able));
            }
        },
        [result.id, result.title, setSongs, songs],
    );

    return (
        <Card sx={{ display: 'flex', alignItems: 'stretch', height: 150 }}>
            {isConfirmingDelete && songs && (
                <ConfirmDeleteModal song={songs.items[result.id]} callback={handleConfirmDelete} />
            )}
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
                        <Tooltip placement="top" title={<Typography>{downloadIconTitle}</Typography>}>
                            <span>
                                <Button disabled={downloadStatus !== DownloadStatus.Able} onClick={handleDownload}>
                                    {downloadStatus === DownloadStatus.Able ? (
                                        <DownloadIcon />
                                    ) : downloadStatus >= DownloadStatus.Done ? (
                                        <DownloadDoneIcon color="success" />
                                    ) : downloadStatus === DownloadStatus.Errored ? (
                                        <ErrorIcon color="error" />
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
                        <Fade in={downloadStatus >= DownloadStatus.Done}>
                            <Tooltip placement="top" title={<Typography>Add to Playlist</Typography>}>
                                <Button>
                                    <PlaylistAddIcon />
                                </Button>
                            </Tooltip>
                        </Fade>
                        <Fade in={downloadStatus >= DownloadStatus.Done}>
                            <Tooltip placement="top" title={<Typography>Remove</Typography>}>
                                <Button onClick={() => setIsConfirmingDelete(true)}>
                                    <DeleteIcon color="error" />
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
