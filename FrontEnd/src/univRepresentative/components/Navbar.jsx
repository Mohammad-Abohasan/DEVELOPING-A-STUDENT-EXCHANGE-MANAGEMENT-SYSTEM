import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import {
    Box,
    Toolbar,
    CssBaseline,
    Typography,
    IconButton,
    Tooltip,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { Brightness4, Brightness7, Menu } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import logo from '../../images/AArU.png';

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: 240,
            width: "calc(100% - 240px)",
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
        backgroundColor: theme.palette.mode === 'dark' ? '#121212' : 'whitesmoke'
    }));

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [dark, setDark] = useState(false);
    const navigate = useNavigate();

    const darkTheme = useMemo(() => createTheme({
        palette: {
            mode: dark ? 'dark' : 'light'
        }
    }), [dark]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="fixed" open={open}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{
                                    marginRight: 3,
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <Menu sx={{ color: '#764ABC' }} />
                            </IconButton>

                            <Tooltip title="Go back to home page">
                                <IconButton onClick={() => navigate('/')}>
                                    <img src={logo} alt="AArU-Logo" style={{ height: "3rem", width: "3rem" }} />
                                </IconButton>
                            </Tooltip>
                            <Typography component="div" sx={{ flexGrow: 1 }}>
                                <Link className="navbar-brand" to="/">
                                    <h4 style={{ color: '#764ABC', position: 'relative', top: '0.2rem' }}>
                                        Student Exchange Management System
                                    </h4>
                                </Link>
                            </Typography>
                            <IconButton onClick={() => setDark(!dark)}>
                                {dark ? <Brightness7 /> : <Brightness4 />}
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Sidebar {...{ open, setOpen }} />
                </Box>
            </ThemeProvider>
        </>
    )
}

export default Navbar;