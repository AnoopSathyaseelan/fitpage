const axios = require('axios');
const { WEATHER_API_KEY, WEATHER_API_URL } = require('../config');
const { locations } = require('../utils/db');

const getWeather = async (req, res) => {
    const location = locations.find(loc => loc.id === parseInt(req.params.id));
    console.log(location)
    if (!location) {
        return res.status(404).json({ error: 'Location not found' });
    }

    try {
        console.log(WEATHER_API_KEY, WEATHER_API_URL)
        const response = await axios.get(WEATHER_API_URL, {
            params: {
                key: WEATHER_API_KEY,
                q: `${location.latitude},${location.longitude}`
            }
        });

        const weatherData = response.data;
        res.json({
            location: location.name,
            temperature: weatherData.current.temp_c,
            condition: weatherData.current.condition.text,
            humidity: weatherData.current.humidity,
            windSpeed: weatherData.current.wind_kph
        });
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json({ error: error.response.data.error.message });
        }
        res.status(500).json({ error: 'An error occurred while fetching the weather data' });
    }
};

module.exports = {
    getWeather
};
