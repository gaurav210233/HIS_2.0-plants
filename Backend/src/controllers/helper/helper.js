import axios from "axios";
const fetchData = async () => {
  const apiKey = process.env.WEATHER_API_KEY;
  const city = "jaipur";
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?q=${city}&days=1&key=${apiKey}`;

  const response = await axios.get(apiUrl);
  const data = response.data;
  const forecast = data.forecast.forecastday[0].day.daily_chance_of_rain;

  return forecast;
};

export const toggleMotor = async (data) => {
  let motorState = false;
  if (data.Temperature > 45) {
    motorState = true;
  } else {
    let chancesRain = await fetchData();

    if (chancesRain < 75)
      //chances of rain
      motorState = true;
  }

  const MoistureLevel = 100 - data.MoistureLevel;

  return {
    motorState,
    MoistureLevel,
  };
};
