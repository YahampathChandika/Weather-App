const API_KEY = 'a053a73c4cf483aa3486544aa7bd49fe'; // Replace with your actual API key
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/'; // Replace with your preferred weather API base URL

const fetchWeatherData = async (latitude, longitude) => {
  try {
    const response = await fetch(`${API_BASE_URL}weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    console.log(data);

    // Extract the city and country information from the API response
    const city = data.name;
    const country = data.sys.country;

    // Map the relevant properties to an object and include the city and country
    const weatherData = {
      city,
      country,
      temperature: data.main.temp,
      conditions: data.weather[0].main,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };

    return weatherData;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

export default fetchWeatherData;
