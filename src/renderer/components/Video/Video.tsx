import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getVideoURL } from '../../redux/slices/main.slice';

const Video = () => {
    const videoURL = useSelector(getVideoURL);
    if (videoURL === null) return <div style={{ width: '250px' }}>no video</div>;

    return (
        <video controls width="250">
            <source src={videoURL} type="video/mp4" />
        </video>
    );
};

export default Video;
