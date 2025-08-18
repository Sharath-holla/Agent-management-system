import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
  CssBaseline,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const quotes = [
  '“Efficiency is doing better what is already being done.” – Peter Drucker',
  '“The secret of getting ahead is getting started.” – Mark Twain',
  '“Great things are done by a series of small things brought together.” – Vincent Van Gogh',
  '“Don’t watch the clock; do what it does. Keep going.” – Sam Levenson',
];

const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [quote] = useState(getRandomQuote());
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      toast.success('Login Successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <Grid container component="main" sx={{ minHeight: '100vh' }}>
      <CssBaseline />
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Left Panel */}
      {!isSmallScreen && (
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            background: 'linear-gradient(45deg, #2E3B55 30%, #1a237e 90%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            p: 4,
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
          >
            <DashboardCustomizeIcon sx={{ fontSize: 80, mb: 2 }} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Agent Management System
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Typography
              variant="h6"
              align="center"
              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              {getGreeting()}, please sign in to continue.
            </Typography>
          </motion.div>
        </Grid>
      )}

      {/* Right Panel */}
      <Grid
        item
        xs={12}
        sm={isSmallScreen ? 12 : 8}
        md={isSmallScreen ? 12 : 6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: isSmallScreen
            ? 'linear-gradient(180deg, #1a237e 0%, #2E3B55 100%)'
            : 'linear-gradient(135deg, #ffffff 60%, #e8f0fe 100%)',
          position: 'relative',
          overflow: 'hidden',
          p: 4,
        }}
      >
        {/* Decorative circles in background */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
          style={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(33,150,243,0.1)',
            top: 50,
            right: -100,
          }}
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          style={{
            position: 'absolute',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(156,39,176,0.1)',
            bottom: 80,
            left: -60,
          }}
        />

        {/* Login Card */}
        <Paper
          elevation={isSmallScreen ? 0 : 12}
          sx={{
            p: { xs: 3, sm: 4 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 400,
            width: '100%',
            borderRadius: 2,
            background: isSmallScreen ? 'rgba(255,255,255,0.98)' : 'white',
            zIndex: 2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          {isSmallScreen && (
            <Typography
              variant="body1"
              align="center"
              sx={{ color: 'text.secondary', mt: 1, mb: 2 }}
            >
              {getGreeting()}, please sign in.
            </Typography>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={onSubmit}
            sx={{ mt: 1, width: '100%' }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={onChange}
            />
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
            </motion.div>
          </Box>
          <Divider sx={{ width: '100%', my: 2 }} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontStyle: 'italic',
                textAlign: 'center',
              }}
            >
              {quote}
            </Typography>
          </motion.div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
