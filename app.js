require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
const weather = require('./weather');

/**
 * Custom error handler middleware
 * @param {Error} err - The error object
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'An unexpected error occurred',
    },
  });
};

/**
 * Get weather data for a specific city
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Promise<void>}
 */
app.get('/v1/weather/:city', async (req, res, next) => {
  try {
    const city = req.params.city;
    if (!city) {
      throw { status: 400, code: 'BAD_REQUEST', message: 'City parameter is required' };
    }
    const weatherData = await weather.getWeather(city);
    if (!weatherData) {
      throw { status: 404, code: 'NOT_FOUND', message: `Weather data not found for city: ${city}` };
    }
    res.json(weatherData);
  } catch (error) {
    next(error);
  }
});

/**
 * Get forecast data for a specific city
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Promise<void>}
 */
app.get('/v1/weather/:city/forecast', async (req, res, next) => {
  try {
    const city = req.params.city;
    if (!city) {
      throw { status: 400, code: 'BAD_REQUEST', message: 'City parameter is required' };
    }
    const forecastData = await weather.getForecast(city);
    if (!forecastData) {
      throw { status: 404, code: 'NOT_FOUND', message: `Forecast data not found for city: ${city}` };
    }
    res.json(forecastData);
  } catch (error) {
    next(error);
  }
});

// Register the custom error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});