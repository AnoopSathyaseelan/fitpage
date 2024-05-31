const axios = require('axios');
const { WEATHER_API_KEY, WEATHER_API_HISTORY_URL } = require('../config');
const { locations } = require('../utils/db');

const getHistoricalWeather = async (req, res) => {
    const { period } = req.params;
    const validPeriods = ['7', '15', '30'];
    if (!validPeriods.includes(period)) {
        return res.status(400).json({ error: 'Invalid period. Use 7, 15, or 30 days.' });
    }

    const location = locations.find(loc => loc.id === parseInt(req.params.id));
    if (!location) {
        return res.status(404).json({ error: 'Location not found' });
    }

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - parseInt(period));

    try {
        const response = await axios.get(WEATHER_API_HISTORY_URL, {
            params: {
                key: WEATHER_API_KEY,
                q: `${location.latitude},${location.longitude}`,
                dt: startDate.toISOString().split('T')[0],
                end_dt: endDate.toISOString().split('T')[0]
            }
        });

        const historicalData = response.data.forecast.forecastday;
        const summary = historicalData.map(day => ({
            date: day.date,
            avgTemp: day.day.avgtemp_c,
            maxTemp: day.day.maxtemp_c,
            minTemp: day.day.mintemp_c,
            avgHumidity: day.day.avghumidity,
            maxWindSpeed: day.day.maxwind_kph
        }));

        res.json({
            location: location.name,
            period: `${period} days`,
            summary
        });
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json({ error: error.response.data.error.message });
        }
        res.status(500).json({ error: 'An error occurred while fetching the historical weather data' });
    }
};

module.exports = {
    getHistoricalWeather
};
