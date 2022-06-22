import { Fade, Grow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setVideoURL } from '../../redux/slices/main.slice';

const Title = () => {
    const [fade, setFade] = useState(-1);
    const dispatch = useDispatch();

    useEffect(() => {
        if (fade < 4) {
            const myTimeout = setTimeout(() => {
                setFade(fade + 1);
            }, 1000);

            return () => {
                clearTimeout(myTimeout);
            };
        }
    }, [fade]);

    return fade < 4 ? (
        <Grow in={fade < 3}>
            <Typography variant="h1" textAlign="center" sx={{ pt: '3rem' }}>
                {[`🔉`, `🎵`, `🎶`].map((e, i) => (
                    <Fade in={fade >= i} key={i}>
                        <span>{e}</span>
                    </Fade>
                ))}
            </Typography>
        </Grow>
    ) : (
        <></>
    );
};

export default Title;
