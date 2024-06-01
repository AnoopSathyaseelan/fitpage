# Real-time Weather Forecast API

This project is a RESTful API that provides real-time weather forecasts based on geographical locations. It fetches data from an external weather service (e.g., OpenWeatherMap, WeatherAPI) and exposes endpoints to manage locations, retrieve weather information, and access historical data.

## Requirements
- npm run install
- npm run start:dev or npm run prod

### Location Management

- **GET /locations**: Get all locations or add a new location.
- **POST /locations**: Add a new location.
- **GET /locations/<location_id>**: Get a specific location by ID.
- **PUT /locations/<location_id>**: Update a specific location by ID.
- **DELETE /locations/<location_id>**: Delete a specific location by ID.

Each location should have a name, latitude, and longitude.

### Weather Forecast

- **GET /weather/<location_id>**: Get the weather forecast for a specific location.
  - Parameters: temperature, humidity, wind speed, etc.

### Historical Data

- **GET /history**: Get historical data for the last 7, 15, or 30 days and show the summary.

  
### Api Documentation

- https://documenter.getpostman.com/view/17362184/2sA3Qv9WYn.

