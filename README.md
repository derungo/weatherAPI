Weather API


A simple API for retrieving weather data for a given city.


Endpoints
GET /v1/weather/:city
Retrieves the current weather data for a specific city.
Requires the city parameter in the URL path.
Returns a JSON object with the weather data.
GET /v1/weather/:city/forecast
Retrieves the weather forecast for a specific city.
Requires the city parameter in the URL path.
Returns a JSON object with the forecast data.


Error Handling
The API uses a custom error handler middleware to catch and handle errors.
Errors are returned in the response with a JSON object containing the error code and message.


Environment Variables
WEATHER_API_KEY: The API key for the OpenWeatherMap API.


Dependencies
express: The web framework for building the API.
axios: The HTTP client for making requests to the OpenWeatherMap API.
dotenv: The package for loading environment variables from a .env file.


Usage
Clone the repository and install the dependencies with npm install.
Create a .env file with your OpenWeatherMap API key: WEATHER_API_KEY=YOUR_API_KEY.
Start the server with node server.js.
Make requests to the API endpoints to retrieve weather data.


License

MIT
