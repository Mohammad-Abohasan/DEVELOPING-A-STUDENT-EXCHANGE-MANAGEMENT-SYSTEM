import {
    Avatar,
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled,
    Tooltip,
    Typography,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import WidgetsIcon from '@mui/icons-material/Widgets';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { useContext, useMemo, useState } from 'react';
import { ChevronLeft, Logout } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Cookies from 'universal-cookie';
import { AccessTokenContext } from '../../context/AccessTokenProvider';
import khatibAvat from '../../images/avatarMutamed.jpg';
import ArchivedOffers from '../pages/ArchivedOffers';
import PublishedOffers from '../pages/PublishedOffers';
import PendingOffers from '../pages/PendingOffers';
import PageNotFound from '../../student/pages/PageNotFound';
import OfferDetails from '../pages/OfferDetails';
import AppliedStudents from '../pages/AppliedStudents';
import StudentArchive from '../pages/StudentArchive';
import StudentDetails from '../pages/StudentDetails';

const openedMixin = (theme) => ({
    width: 240,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: 240,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const Sidebar = ({ open, setOpen }) => {
    const [selectedLink, setSelectedLink] = useState('');
    const { setAccessToken } = useContext(AccessTokenContext);
    const cookie = new Cookies();

    const list = useMemo(() => [
        {
            title: 'View published offers',
            icon: <DashboardIcon />,
            link: 'publishedOffers',
            component: <PublishedOffers />,
        }, {
            title: 'View pending offers',
            icon: <TrackChangesIcon />,
            link: 'pendingOffers',
            component: <PendingOffers />,
        },
        {
            title: 'View archived offers',
            icon: <WidgetsIcon />,
            link: 'archivedOffers',
            component: <ArchivedOffers />,
        },
    ], []);

    const navigate = useNavigate();

    const handleLogout = () => {
        cookie.remove('Bearer');
        cookie.remove('Role');
        setAccessToken(null);
        navigate('/');
    };

    return (
        <>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={() => setOpen(false)}>
                        <ChevronLeft />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {list.map((item) => (
                        <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                onClick={() => { setSelectedLink(item.link); navigate(item.link) }}
                                selected={selectedLink === item.link}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 2 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.title}
                                    sx={{ opacity: open ? 1 : 0 }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Box sx={{ mx: 'auto', mt: 3, mb: 1 }}>
                    <Tooltip title={'m.t.Khatib' || ''}>
                        <Avatar
                            src={khatibAvat}
                            {...(open && { sx: { width: 100, height: 100 } })}
                        />
                    </Tooltip>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    {open && <Typography sx={{ fontWeight: 'bold' }}>{'Mutamed Khatib'}</Typography>}
                    <Typography variant="body2">{'UniRep' || 'role'}</Typography>
                    {open && (
                        <Typography variant="body2">{'PTUK'}</Typography>
                    )}
                    <Tooltip title="Logout" sx={{ mt: 1 }}>
                        <IconButton onClick={handleLogout}>
                            <Logout />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Drawer>
            <Box sx={{ p: 3, width: `calc(100vw - ${open ? '257px' : '82px'})` }}>
                <DrawerHeader />
                <Routes>
                    <Route path="/publishedOffers" element={<Outlet />}>
                        <Route path="" element={<PublishedOffers />} />
                    </Route>
                    <Route path="/pendingOffers" element={<Outlet />}>
                        <Route path="" element={<PendingOffers />} />
                        {/* <Route path=":offerID/:hasApply" element={<OfferDetails />} /> */}
                    </Route>
                    <Route path="/archivedOffers" element={<Outlet />}>
                        <Route path="" element={<ArchivedOffers />} />
                        {/* <Route path=":offerID/:hasApply" element={<OfferDetails />} /> */}
                    </Route>
                    <Route path=":offerType/:offerID" element={<OfferDetails />} />
                    <Route path="/AppliedStudents/:offerID" element={<AppliedStudents />} />
                    <Route path="/StudentArchive/:studentID" element={<StudentArchive />} />
                    <Route path="/StudentDetails/:studentID/:offerID" element={<StudentDetails />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Box>
        </>
    );
}

export default Sidebar;