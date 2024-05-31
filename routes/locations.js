const express = require('express');
const {
    getAllLocations,
    addLocation,
    getLocation,
    updateLocation,
    deleteLocation
} = require('../controllers/locationController');

const router = express.Router();

router.get('/', getAllLocations);
router.post('/', addLocation);
router.get('/:id', getLocation);
router.put('/:id', updateLocation);
router.delete('/:id', deleteLocation);

module.exports = router;
