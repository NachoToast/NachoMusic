import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import theme from './theme';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import SearchPage from './components/SearchPage/SearchPage';

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                <Sidebar />
                <div id="content">
                    <Routes>
                        <Route index element={<HomePage />} />
                        <Route path="home" element={<HomePage />} />
                        <Route path="search" element={<SearchPage />} />
                    </Routes>
                </div>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
