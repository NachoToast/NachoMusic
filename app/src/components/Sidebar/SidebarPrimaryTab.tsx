import React, { ReactNode, useMemo } from 'react';
import { Collapse, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { useLocation } from 'react-router-dom';
import UnstyledLink from '../Links/UnstyledLink';

export interface SidebarPrimaryTabProps {
    /** Where to go if clicked, e.e. `/search`. */
    href: string;
    /** Name in the sidebar, e.g. `Library`. */
    name: string;
    /** MUI icon to show next to name. */
    icon: ReactNode;
    /** Whether to show name as well as icon. */
    isMaximised: boolean;
}

const SidebarPrimaryTab = (props: SidebarPrimaryTabProps) => {
    const { href, name, icon, isMaximised } = props;

    const location = useLocation();

    const selected = useMemo(() => location.pathname === href, [href, location.pathname]);

    return (
        <ListItem disablePadding>
            <UnstyledLink to={href} replace={true}>
                <Tooltip placement="right" title={isMaximised ? undefined : name} arrow>
                    <ListItemButton selected={selected}>
                        <ListItemIcon sx={{ minWidth: 0 }}>{icon}</ListItemIcon>

                        <Collapse orientation="horizontal" in={isMaximised}>
                            <ListItemText sx={{ ml: 1 }} primary={name} />
                        </Collapse>
                    </ListItemButton>
                </Tooltip>
            </UnstyledLink>
        </ListItem>
    );
};

export default SidebarPrimaryTab;
