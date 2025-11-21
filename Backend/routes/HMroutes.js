const express = require('express');
const { createHealthMetric, getHealthMetrics } = require('../controllers/HMcontroller');
const router = express.Router();

router.post('/', createHealthMetric);
router.get('/', getHealthMetrics);

module.exports = router;
