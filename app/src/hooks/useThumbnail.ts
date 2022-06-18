import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoredYoutubeVideo } from '../../../shared/YouTube';
import FileSystemHelper from '../classes/FileSystemHelper';
import { getPort } from '../redux/slices/mainSlice';

function useThumbnail({ thumbnail, id }: StoredYoutubeVideo): string | undefined | null {
    const [src, setSrc] = useState<string | undefined>(undefined);
    const port = useSelector(getPort);

    useEffect(() => {
        if (thumbnail !== null && port !== null) {
            FileSystemHelper.getMusicPath().then((musicPath) => {
                setSrc(
                    `http://localhost:${port}${FileSystemHelper.convertPath(musicPath)}/NachoMusic/downloads/${id}${
                        thumbnail.extension
                    }`,
                );
            });
        }
    }, [id, port, thumbnail]);

    if (thumbnail === null) return null;
    return src;
}

export default useThumbnail;
