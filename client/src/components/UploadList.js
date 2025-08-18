import React, { useState, useCallback } from 'react';
import api from '../services/api';
import { useDropzone } from 'react-dropzone';
import { Button, Paper, Typography, Box, LinearProgress, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const UploadList = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/csv': ['.csv'],
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        },
        multiple: false,
    });

    const onUpload = async e => {
        e.preventDefault();
        if (!file) {
            toast.warn('Please select a file to upload.');
            return;
        }
        setLoading(true);
        setUploadProgress(0);

        const timer = setInterval(() => {
            setUploadProgress((oldProgress) => {
                if (oldProgress === 100) return 100;
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 90);
            });
        }, 300);

        const formData = new FormData();
        formData.append('listFile', file);

        try {
            const res = await api.post('/lists/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            setUploadProgress(100);
            toast.success(res.data.msg);
            setTimeout(() => {
                onUploadSuccess();
                setFile(null);
                setUploadProgress(0);
            }, 1000);
        } catch (err) {
            toast.error(err.response?.data?.msg || 'File upload failed!');
            setUploadProgress(0);
        } finally {
            clearInterval(timer);
            setLoading(false);
        }
    };
    
    const removeFile = () => {
        setFile(null);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} style={{ height: '100%' }}>
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    height: '100%',
                    borderTop: '3px solid',
                    borderColor: 'secondary.main',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Upload & Distribute List
                </Typography>

                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box
                        {...getRootProps()}
                        sx={{
                            border: '2px dashed',
                            borderColor: isDragActive ? 'primary.main' : 'grey.400',
                            borderRadius: 2,
                            p: 4,
                            textAlign: 'center',
                            cursor: 'pointer',
                            backgroundColor: isDragActive ? 'action.hover' : 'transparent',
                            transition: 'background-color 0.2s ease-in-out',
                            mb: 2
                        }}
                    >
                        <input {...getInputProps()} />
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
                            <CloudUploadIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} />
                        </motion.div>
                        <Typography>
                            {isDragActive ? "Drop the file here..." : "Drag 'n' drop file here, or click"}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            CSV, XLSX, or XLS files only
                        </Typography>
                    </Box>

                    {file && (
                        <Paper variant="outlined" sx={{ p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <InsertDriveFileIcon color="action" sx={{ mr: 1.5 }} />
                                <Typography variant="body2" noWrap>{file.name}</Typography>
                            </Box>
                            <IconButton onClick={removeFile} size="small"><CloseIcon /></IconButton>
                        </Paper>
                    )}

                    {uploadProgress > 0 && <LinearProgress variant="determinate" value={uploadProgress} sx={{ mt: 2 }} />}
                </Box>
                
                <Box sx={{ mt: 2, position: 'relative' }}>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button onClick={onUpload} fullWidth variant="contained" color="secondary" disabled={!file || loading}>
                            {loading ? 'Uploading...' : 'Upload and Distribute'}
                        </Button>
                    </motion.div>
                </Box>
            </Paper>
        </motion.div>
    );
};

export default UploadList;