const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

router.post('/', uploadController.handleUpload.single('file'),uploadController.uploader);

module.exports = router;