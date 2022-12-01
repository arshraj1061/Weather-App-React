// Weatherstack API - Used to get the weather forecast of a place from
// import config from "../../config";
const request = require("request");
const config = require("../../config");
const apikey = config.weatherbit;

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.weatherbit.io/v2.0/current?lat=" +
    latitude +
    "&lon=" +
    longitude +
    `&key=${apikey}&include=minutely`;

  // const response = await fetch(url);
 
  // if (!response.ok) {
  //   throw new Error("Unable to connect to weather service!");
  // }

  // const body = await response.json();

  // const data = body.data[0];

  // return {

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      // console.log(body)
      const data = body.data[0];
      callback(undefined, {
        lat: data.lat,
        lon: data.lon,
        aqi: data.aqi,
        timezone_id: data.timezone,
        Weather_Description: data.weather.description,
        Temperature: data.temp,
        feelslike: data.app_temp,
        Humidity: data.rh,
        wind_speed: data.wind_spd,
        wind_dir: data.wind_cdir_full,
        pressure: data.pres,
        precip: data.precip,
        uv_index: data.uv,
      });
    }
  });
};

module.exports = forecast;
// export default forecast;
