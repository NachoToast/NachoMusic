import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import SongsPage from './components/SongsPage';
import PlaylistsPage from './components/PlaylistsPage';
import SettingsPage from './components/SettingsPage';
import Navbar from './components/Navbar';

function App() {
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
