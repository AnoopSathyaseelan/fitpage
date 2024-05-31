const { locations } = require('../utils/db');
const Location = require('../models/location');

let currentId = 1;

const getAllLocations = (req, res) => {
    res.json(locations);
};

const addLocation = (req, res) => {
    const { name, latitude, longitude } = req.body;
    if (!name || !latitude || !longitude) {
        return res.status(400).json({ error: 'Name, latitude, and longitude are required' });
    }
    const location = new Location(currentId++, name, latitude, longitude);
    locations.push(location);
    res.status(201).json(location);
};

const getLocation = (req, res) => {
    const location = locations.find(loc => loc.id === parseInt(req.params.id));
    if (!location) {
        return res.status(404).json({ error: 'Location not found' });
    }
    res.json(location);
};

const updateLocation = (req, res) => {
    const location = locations.find(loc => loc.id === parseInt(req.params.id));
    if (!location) {
        return res.status(404).json({ error: 'Location not found' });
    }
    const { name, latitude, longitude } = req.body;
    if (name) location.name = name;
    if (latitude) location.latitude = latitude;
    if (longitude) location.longitude = longitude;
    res.json(location);
};

const deleteLocation = (req, res) => {
    const locationIndex = locations.findIndex(loc => loc.id === parseInt(req.params.id));
    if (locationIndex === -1) {
        return res.status(404).json({ error: 'Location not found' });
    }
    locations.splice(locationIndex, 1);
    res.status(200).send({ message: "location removed" });
};

module.exports = {
    getAllLocations,
    addLocation,
    getLocation,
    updateLocation,
    deleteLocation
};
