const express = require('express');
const { addSymptomLog, getSymptomLogs } = require('../controllers/SLcontroller');
const router = express.Router();

router.post('/', addSymptomLog);
router.get('/:userId', getSymptomLogs);

module.exports = router;
