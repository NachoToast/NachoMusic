import { Box, Grid, ListItemButton, Typography } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const pages = ['Playlists', 'Songs', 'Search', 'Settings'];

const Navbar = () => {
    const location = useLocation().pathname.slice(1);

    return (
        <Grid container>
            {pages.map((e) => (
                <Grid key={e} item xs={3} sx={{ width: '100%' }} className="noselect nodrag">
                    <Link
                        to={`/${e.toLowerCase()}`}
                        style={{ color: 'white', textDecoration: 'none' }}
                        draggable={false}
                    >
                        <ListItemButton sx={{ m: 0, p: 0 }} selected={location === e.toLowerCase()}>
                            <Box sx={{ p: 1, width: '100%' }}>
                                <Typography variant="h4" textAlign="center">
                                    {e}
                                </Typography>
                            </Box>
                        </ListItemButton>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default Navbar;
