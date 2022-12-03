import { useEffect, useState } from 'react';
import { Card, CardActionArea, Fade, Grid, Slide, Typography } from '@mui/material';
import ExternalLink from '../Links/ExternalLink';
import './HomePage.css';

import GitHubIcon from '@mui/icons-material/GitHub';
import SettingsIcon from '@mui/icons-material/Settings';
import UnstyledLink from '../Links/UnstyledLink';
import { colors } from '../../constants/constants';

const HomePage = () => {
    const [skipFade] = useState(!!sessionStorage.getItem('homePageAnimated'));

    const [shouldFadeIn, setShouldFadeIn] = useState(false);
    const [shouldFadeIn2, setShouldFadeIn2] = useState(false);
    const [shouldFadeIn3, setShouldFadeIn3] = useState(false);

    useEffect(() => {
        sessionStorage.setItem('homePageAnimated', 'yep');

        const timeout = setTimeout(() => setShouldFadeIn(true), 200);

        const timeout2 = setTimeout(() => setShouldFadeIn2(true), 400);

        const timeout3 = setTimeout(() => setShouldFadeIn3(true), 1200);

        return () => {
            clearTimeout(timeout);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        };
    }, []);

    return (
        <>
            <Typography variant="h2" sx={{ display: 'flex', flexFlow: 'row nowrap', position: 'relative' }}>
                <Fade in timeout={skipFade ? 0 : 1000}>
                    <span>Nacho</span>
                </Fade>
                <Fade in={shouldFadeIn || skipFade} timeout={skipFade ? 0 : 1000}>
                    <span style={{ color: colors.purple }}>Music</span>
                </Fade>
                <Fade in={shouldFadeIn2 || skipFade} timeout={skipFade ? 0 : 1000}>
                    <div className={shouldFadeIn2 && !skipFade ? 'rotatingMusicNote' : undefined}>🎵</div>
                </Fade>
                <Slide direction="down" in={shouldFadeIn3 || skipFade} timeout={skipFade ? 0 : undefined}>
                    <Typography color="gray" sx={{ position: 'absolute', right: 0, top: '100%' }}>
                        {NL_APPVERSION}
                    </Typography>
                </Slide>
            </Typography>
            <Grid container spacing={1} sx={{ width: '95%', flexGrow: 1 }} alignItems="center" justifyContent="center">
                <Grid item>
                    <Card>
                        <ExternalLink href="https://github.com/NachoToast/NachoMusic">
                            <CardActionArea sx={{ p: 1 }}>
                                <GitHubIcon style={{ fontSize: '60' }} />
                            </CardActionArea>
                        </ExternalLink>
                    </Card>
                </Grid>
                <Grid item>
                    <Card>
                        <UnstyledLink to="/home/settings">
                            <CardActionArea sx={{ p: 1 }}>
                                <SettingsIcon style={{ fontSize: '60' }} />
                            </CardActionArea>
                        </UnstyledLink>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default HomePage;
