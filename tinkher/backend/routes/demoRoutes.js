const express = require('express');
const router = express.Router();
const demoController = require('../controllers/demoController');

router.post('/reset', demoController.resetDemo);
router.post('/abandon', demoController.abandonApplication);

module.exports = router;
