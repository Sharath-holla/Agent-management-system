import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import AddAgentForm from '../components/AddAgentForm';
import UploadList from '../components/UploadList';
import DistributedLists from '../components/DistributedLists';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const drawerWidth = 240;

function Footer(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            Developed By Sharath NS
        </Typography>
    );
}

const DashboardPage = () => {
    const [refreshKey, setRefreshKey] = React.useState(0);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const onUploadSuccess = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    const drawer = (
        <Box>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
                <DashboardIcon sx={{ mr: 1, color: 'secondary.main' }} />
                <Typography variant="h6">Dashboard</Typography>
            </Toolbar>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon><PeopleIcon color="secondary" /></ListItemIcon>
                        <ListItemText primary="Add Agent" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon><CloudUploadIcon color="secondary" /></ListItemIcon>
                        <ListItemText primary="Upload List" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: 'linear-gradient(90deg, #9c27b0 0%, #00bcd4 100%)' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Agent Management Panel
                    </Typography>
                    <Button color="inherit" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                {drawer}
            </Drawer>

            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Container maxWidth="xl">
                    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={5} lg={4}>
                            <AddAgentForm />
                        </Grid>
                        <Grid item xs={12} md={7} lg={8}>
                            <UploadList onUploadSuccess={onUploadSuccess} />
                        </Grid>
                    </Grid>
                    <Box sx={{ pt: 4 }}>
                        <DistributedLists key={refreshKey} />
                    </Box>
                    <Footer sx={{ pt: 4 }} />
                </Container>
            </Box>
        </Box>
    );
};

export default DashboardPage;