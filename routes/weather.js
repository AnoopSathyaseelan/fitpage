const express = require('express');
const { getWeather } = require('../controllers/weatherController');
const cacheMiddleware = require('../middleware/cache');

const router = express.Router();

router.get('/:id', cacheMiddleware, getWeather);

module.exports = router;
