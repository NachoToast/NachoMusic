import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Title from './components/Title/Title';
import Video from './components/Video/Video';
import { setVideoURL } from './redux/slices/main.slice';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const asyncAction = async () => {
            const res = await window.api.a();
            dispatch(setVideoURL(res || null));
        };

        asyncAction();
    }, []);

    return (
        <Container>
            <Title />
            <Video />
        </Container>
    );
};

export default App;
