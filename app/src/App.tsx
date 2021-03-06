import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import SongsPage from './components/SongsPage';
import PlaylistsPage from './components/PlaylistsPage';
import SettingsPage from './components/SettingsPage';
import Navbar from './components/Navbar';
import { useDispatch } from 'react-redux';
import { setPort } from './redux/slices/mainSlice';

function App() {
    const dispatch = useDispatch();

    // one-time event listener for file server port information
    useEffect(() => {
        const handleFileServerInfo: CustomEvents['fileServerInfo']['appHandler'] = ({ detail }) => {
            dispatch(setPort(detail[0]));
            Neutralino.events.off('fileServerInfo', handleFileServerInfo);
        };

        Neutralino.events.on('fileServerInfo', handleFileServerInfo);

        return () => {
            Neutralino.events.off('fileServerInfo', handleFileServerInfo);
        };
    }, [dispatch]);

    // load settings
    // useEffect(() => {
    //     FILES.SettingsFile.load().then((e) => dispatch(setSettings(e)));
    // }, [dispatch]);

    // load songs
    // useEffect(() => {
    //     FILES.DownloadedSongsFile.load().then((e) => dispatch(setDownloads(e)));
    // }, [dispatch]);

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route index element={<PlaylistsPage />} />
                <Route path="playlists" element={<PlaylistsPage />} />
                <Route path="songs" element={<SongsPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="settings" element={<SettingsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
