const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.post('/', applicationController.createApplication);
router.get('/:id', applicationController.getApplicationById);
router.put('/:id', applicationController.updateApplication);
router.get('/:id/status', applicationController.getApplicationStatus);

module.exports = router;
