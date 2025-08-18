const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadAndDistribute, getDistributedLists } = require('../controllers/listController');
const auth = require('../middlewares/authMiddleware');

// Multer setup for in-memory file storage
const storage = multer.memoryStorage();
// File type validation
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/csv' || 
        file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.mimetype === 'application/vnd.ms-excel') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only CSV, XLSX, and XLS are allowed.'), false);
    }
};
const upload = multer({ storage, fileFilter });


// @route   POST api/lists/upload
// @desc    Upload CSV and distribute
// @access  Private
router.post('/upload', auth, upload.single('listFile'), uploadAndDistribute);

// @route   GET api/lists/distributed
// @desc    Get all distributed items grouped by agent
// @access  Private
router.get('/distributed', auth, getDistributedLists);


module.exports = router;