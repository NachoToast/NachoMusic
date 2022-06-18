import { useCallback, useEffect, useState } from 'react';
import { FILES } from '../classes/TrackedFile';
import { DownloadedSongs } from '../typings/DownloadedSongs';

function useDownloadedSongs(): {
    songs: DownloadedSongs | undefined;
    setSongs: (d: DownloadedSongs) => Promise<void>;
} {
    const [data, setData] = useState<DownloadedSongs | undefined>(undefined);

    useEffect(() => {
        FILES.DownloadedSongsFile.getData().then((d) => setData(d));

        const handleNewData = (d: DownloadedSongs) => setData(d);

        FILES.DownloadedSongsFile.on('newDataSaved', handleNewData);

        return () => {
            FILES.DownloadedSongsFile.off('newDataSaved', handleNewData);
        };
    }, []);

    const handleSetSongs = useCallback(async (d: DownloadedSongs) => {
        await FILES.DownloadedSongsFile.setData(d);
        await FILES.DownloadedSongsFile.save();
    }, []);

    return { songs: data, setSongs: handleSetSongs };
}

export default useDownloadedSongs;
