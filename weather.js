require('dotenv').config();

const axios = require('axios');
const API_KEY = process.env.WEATHER_API_KEY;

/**
 * Get the current weather for a specific city.
 * @param {string} city - The name of the city.
 * @returns {Promise<object|null>} - A promise that resolves to the weather data object, or null if the city is not found.
 * @throws {Error} - If there is an error while fetching the weather data.
 */
const getWeather = async (city) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

/**
 * Get the weather forecast for a specific city.
 * @param {string} city - The name of the city.
 * @returns {Promise<object|null>} - A promise that resolves to the forecast data object, or null if the city is not found.
 * @throws {Error} - If there is an error while fetching the forecast data.
 */
const getForecast = async (city) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

module.exports = {
  getWeather,
  getForecast,
};