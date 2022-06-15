import { CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPort } from '../redux/slices/mainSlice';

const SongsPage = () => {
    const port = useSelector(getPort);

    return (
        <div>
            songs
            {port !== null ? (
                <video controls>
                    <source
                        type="video/mp4"
                        src={`http://localhost:${port}/Users/fuzzy/Music/NachoMusic/Alan Walker - Faded.mp4`}
                    />
                </video>
            ) : (
                <CircularProgress />
            )}
        </div>
    );
};

export default SongsPage;
