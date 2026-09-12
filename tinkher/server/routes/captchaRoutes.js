const express = require('express');
const router = express.Router();
const captchaController = require('../controllers/captchaController');

router.post('/generate', captchaController.generateCaptcha);
router.post('/verify', captchaController.verifyCaptcha);
router.get('/stats/:applicationId', captchaController.getCaptchaStats);

module.exports = router;
