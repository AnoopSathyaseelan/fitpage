const express = require('express');
const bodyParser = require('body-parser');
const locationRoutes = require('./routes/locations');
const weatherRoutes = require('./routes/weather');
const historyRoutes = require('./routes/history');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');
const rateLimiter = require('./middleware/rateLimiter');

dotenv.config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(logger);
app.use(rateLimiter);

app.use('/locations', locationRoutes);
app.use('/weather', weatherRoutes);
app.use('/history', historyRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
