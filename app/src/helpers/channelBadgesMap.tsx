import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { Tooltip, Typography } from '@mui/material';

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
        <span style={{ cursor: 'help' }}>
            <Tooltip placement="top" title={<Typography>{badge}</Typography>}>
                {element}
            </Tooltip>
        </span>
    );
}

export default channelBadgesMap;
