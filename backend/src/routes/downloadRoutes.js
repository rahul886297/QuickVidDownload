const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController');

router.post('/download', downloadController.getVideoInfo);
router.get('/proxy', downloadController.proxyDownload);

module.exports = router;
