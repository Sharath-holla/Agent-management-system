import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Grid, Card, CardHeader, CardContent, Typography, Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { motion, AnimatePresence } from 'framer-motion';

const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

const DistributedLists = () => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLists = async () => {
            setLoading(true);
            try {
                const res = await api.get('/lists/distributed');
                setLists(res.data);
            } catch (err) {
                console.error("Error fetching lists", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLists();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress color="secondary" /></Box>;
    }

    if (lists.length === 0) {
        return (
            <Paper elevation={3} sx={{ p: 3, mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <InfoIcon sx={{ mr: 1 }} />
                <Typography>No lists have been distributed yet. Upload a file to begin.</Typography>
            </Paper>
        );
    }

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <Typography variant="h5" gutterBottom>Distributed Lists</Typography>
            </motion.div>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
                <Grid container spacing={3}>
                    <AnimatePresence>
                        {lists.map(group => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={group.agent._id}>
                                <motion.div variants={itemVariants} whileHover={{ scale: 1.03, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                                    <Card elevation={3}>
                                        <CardHeader
                                            avatar={<Avatar sx={{ bgcolor: stringToColor(group.agent.name) }}>{group.agent.name.charAt(0)}</Avatar>}
                                            title={group.agent.name}
                                            subheader={group.agent.email}
                                        />
                                        <CardContent sx={{ pt: 0 }}>
                                            <TableContainer component={Paper} variant="outlined">
                                                <Table size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>FirstName</TableCell>
                                                            <TableCell>Phone</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {group.items.map(item => (
                                                            <TableRow key={item._id} hover>
                                                                <TableCell>{item.firstName}</TableCell>
                                                                <TableCell>{item.phone}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </AnimatePresence>
                </Grid>
            </motion.div>
        </>
    );
};

export default DistributedLists;