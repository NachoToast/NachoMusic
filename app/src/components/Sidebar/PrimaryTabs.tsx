import { SidebarPrimaryTabProps } from './SidebarPrimaryTab';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

const PrimaryTabs: Omit<SidebarPrimaryTabProps, 'isMaximised'>[] = [
    {
        href: '/home',
        secondaryHref: '/',
        name: 'Home',
        icon: <HomeIcon />,
    },
    {
        href: '/search',
        name: 'Search',
        icon: <SearchIcon />,
    },
    {
        href: '/library',
        name: 'Library',
        icon: <LibraryMusicIcon />,
    },
];

export default PrimaryTabs;
