const express = require('express');
const { getHistoricalWeather } = require('../controllers/historyController');
const cacheMiddleware = require('../middleware/cache');

const router = express.Router();

router.get('/:id/:period', cacheMiddleware, getHistoricalWeather);

module.exports = router;
