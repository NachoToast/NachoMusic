import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import SongsPage from './components/SongsPage';
import PlaylistsPage from './components/PlaylistsPage';
import SettingsPage from './components/SettingsPage';
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setPort } from './redux/slices/mainSlice';
import { FILES } from './classes/TrackedFile';
import { setSettings } from './redux/slices/settingsSlice';

function App() {
    const dispatch = useDispatch();
    // const filePaths = useSelector(getFilePaths);

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

    // file validation
    // useEffect(() => {
    //     validateFiles(filePaths).then(console.log);
    // }, []);

    // settings loading
    useEffect(() => {
        FILES.SettingsFile.load().then((e) => dispatch(setSettings(e)));
    }, [dispatch]);

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
