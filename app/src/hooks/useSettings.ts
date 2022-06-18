import { useCallback, useEffect, useState } from 'react';
import { FILES } from '../classes/TrackedFile';
import { Settings } from '../typings/Settings';

function useSettings(): {
    songs: Settings | undefined;
    setSongs: (d: Settings) => Promise<void>;
} {
    const [data, setData] = useState<Settings | undefined>(undefined);

    useEffect(() => {
        FILES.SettingsFile.getData().then((d) => setData(d));

        const handleNewData = (d: Settings) => setData(d);

        FILES.SettingsFile.on('newDataSaved', handleNewData);

        return () => {
            FILES.SettingsFile.off('newDataSaved', handleNewData);
        };
    }, []);

    const handleSetSongs = useCallback(async (d: Settings) => {
        await FILES.SettingsFile.setData(d);
        await FILES.SettingsFile.save();
    }, []);

    return { songs: data, setSongs: handleSetSongs };
}

export default useSettings;
