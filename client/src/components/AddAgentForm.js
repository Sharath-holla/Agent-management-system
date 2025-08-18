import React, { useState } from 'react';
import api from '../services/api';
import { TextField, Button, Paper, Typography, Box, InputAdornment, CircularProgress } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const AddAgentForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { name, email, mobile, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/agents', formData);
            toast.success('Agent added successfully!');
            setFormData({ name: '', email: '', mobile: '', password: '' });
        } catch (err) {
            toast.error(err.response?.data?.msg || 'Error adding agent');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ height: '100%' }}>
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 3, 
                    borderTop: '3px solid', 
                    borderColor: 'primary.main', 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Add New Agent
                </Typography>
                <Box component="form" onSubmit={onSubmit} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <TextField fullWidth label="Name" name="name" value={name} onChange={onChange} required margin="normal" placeholder="e.g., John Doe" InputProps={{ startAdornment: (<InputAdornment position="start"><PersonAddIcon /></InputAdornment>), }} />
                        <TextField fullWidth label="Email" name="email" value={email} type="email" onChange={onChange} required margin="normal" placeholder="e.g., john.doe@example.com" InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon /></InputAdornment>), }} />
                        <TextField fullWidth label="Mobile (with country code)" name="mobile" value={mobile} onChange={onChange} required margin="normal" placeholder="e.g., +919876543210" InputProps={{ startAdornment: (<InputAdornment position="start"><PhoneIcon /></InputAdornment>), }} />
                        <TextField fullWidth label="Password" name="password" value={password} type="password" onChange={onChange} required margin="normal" placeholder="Enter a secure password" InputProps={{ startAdornment: (<InputAdornment position="start"><LockIcon /></InputAdornment>), }} />
                    </Box>
                    <Box sx={{ mt: 2, position: 'relative' }}>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button type="submit" fullWidth variant="contained" disabled={loading}>
                                Add Agent
                            </Button>
                        </motion.div>
                        {loading && (
                            <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />
                        )}
                    </Box>
                </Box>
            </Paper>
        </motion.div>
    );
};

export default AddAgentForm;