import React, { useState } from 'react';
import { Button, Divider, Grow, List, Paper, Stack } from '@mui/material';

import PrimaryTabs from './PrimaryTabs';
import SidebarPrimaryTab from './SidebarPrimaryTab';

import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import useHover from '../../hooks/useHover';

const primaryTabNames = PrimaryTabs.map((e) => e.name.toLowerCase()).join(' ');

const Sidebar = () => {
    const [isMaximised, setIsMaximised] = useState(true);

    const [hoverRef, isHovered] = useHover();

    return (
        <Paper elevation={10} square>
            <Stack alignItems="flex-end" ref={hoverRef} sx={{ height: '100%' }}>
                <Grow in={isHovered}>
                    <Button
                        size="small"
                        sx={{
                            minWidth: 0,
                        }}
                        onClick={() => setIsMaximised(!isMaximised)}
                    >
                        {isMaximised ? (
                            <KeyboardDoubleArrowLeftIcon htmlColor="grey" />
                        ) : (
                            <KeyboardDoubleArrowRightIcon htmlColor="grey" />
                        )}
                    </Button>
                </Grow>
                <nav aria-label={primaryTabNames}>
                    <List disablePadding>
                        {PrimaryTabs.map((e, i) => (
                            <SidebarPrimaryTab key={i} {...e} isMaximised={isMaximised} />
                        ))}
                        <Divider />
                    </List>
                </nav>
            </Stack>
        </Paper>
    );
};

export default Sidebar;
