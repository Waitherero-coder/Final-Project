const express = require('express');
const { getResources } = require('../controllers/Resourcecontroller');
const router = express.Router();

router.get('/', getResources);

module.exports = router;
