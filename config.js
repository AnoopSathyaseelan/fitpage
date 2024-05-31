require('dotenv').config({ path: './.env' });
module.exports = {
  WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  WEATHER_API_URL: 'http://api.weatherapi.com/v1/current.json',
  WEATHER_API_HISTORY_URL: 'http://api.weatherapi.com/v1/history.json'
};