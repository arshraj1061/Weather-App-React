const express = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

var cors = require("cors");
const bodyParser = require("body-parser"); // Required to process data sent in Http POST request body
const app = express();

const PORT = process.env.PORT || 9000;

app.get("/weather/", (req, res) => {
  const place = req.query.loc;
  geocode(place, (error, { Latitude, Longitude, Location } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }
    forecast(
      Latitude,
      Longitude,
      (
        forecastError,
        {
          Weather_Description,
          Temperature,
          feelslike,
          Humidity,
          lat,
          lon,
          aqi,
          timezone_id,
          wind_speed,
          wind_dir,
          pressure,
          precip,
          uv_index,
        } = {}
      ) => {
        if (forecastError) {
          return res.send({
            error: forecastError,
          });
        }
        res.send({
          lat: lat,
          lon: lon,
          Location: Location,
          aqi: aqi,
          timezone_id: timezone_id,
          Weather_Description: Weather_Description,
          Temperature: Temperature,
          feelslike: feelslike,
          Humidity: Humidity,
          wind_speed: wind_speed,
          wind_dir: wind_dir,
          pressure: pressure,
          precip: precip,
          uv_index: uv_index,
        });
      }
    );
  });
});

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Connected to Port ${PORT}`);
});
