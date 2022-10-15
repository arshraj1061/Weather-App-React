// Weatherstack API - Used to get the weather forecast of a place from
import config from "../../config";

const apikey = config.weatherbit;

const forecast = async (latitude, longitude) => {

    const url = 'https://api.weatherbit.io/v2.0/current?lat='+latitude+'&lon='+longitude+`&key=${apikey}&include=minutely`

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to connect to weather service!");
  }

  const body = await response.json();
  const data = body.data[0]

  return {
    lat: data.lat,
    lon: data.lon,
    aqi: data.aqi,
    timezone_id: data.timezone,
    Weather_description: data.weather.description,
    Temperature: data.temp,
    feelslike: data.app_temp,
    Humidity: data.rh,
    wind_speed: data.wind_spd,
    wind_dir: data.wind_cdir_full,
    pressure: data.pres,
    precip: data.precip,
    uv_index: data.uv,
  };


};

export default forecast;
