import React, { memo } from "react";
import Card from "../UI/Card";
import classes from "./ResultWeather.module.css";

const ResultWeather = (props) => {
  // console.log(props);
  return (
    <section className={classes.result}>
      <Card>
        <ul>
          <li>
            <h3>Location</h3>
            <div className={classes.data}>{props.loc}</div>
            </li>
          <li>
            <h3>Weather Description</h3>
            <div className={classes.data}>
              {props.data.Weather_description}
            </div>
          </li>
          <li>
            <h3>Temperature </h3>{" "}
            <div className={classes.data}>{props.data.Temperature} °C</div>
          </li>
          <li>
            <h3>Feels Like</h3>{" "}
            <div className={classes.data}>{props.data.feelslike} °C</div>
          </li>
          <li>
            <h3>Air Quality Index</h3>{" "}
            <div className={classes.data}>{props.data.aqi}</div>
          </li>
          <li>
            <h3>Humidity </h3>{" "}
            <div className={classes.data}>{props.data.Humidity} %</div>
          </li>
          <li>
            <h3>Pressure </h3>{" "}
            <div className={classes.data}>{props.data.pressure} milibar</div>
          </li>
          <li>
            <h3>Wind Speed</h3>{" "}
            <div className={classes.data}>{props.data.wind_speed} m/s</div>
          </li>
          <li>
            <h3>Wind Direction</h3>{" "}
            <div className={classes.data}>{props.data.wind_dir} </div>
          </li>
          <li>
            <h3>Precipitation</h3>{" "}
            <div className={classes.data}>{props.data.precip === null ? '0 ' : props.data.precip} mm/hr</div>
          </li>
          <li>
            <h3>UV Index</h3>{" "}
            <div className={classes.data}>{props.data.uv_index}</div>
          </li>
          <li>
            <h3>Latitude</h3>{" "}
            <div className={classes.data}>{props.data.lat}</div>
          </li>
          <li>
            <h3>Longitude</h3>{" "}
            <div className={classes.data}>{props.data.lon}</div>
          </li>
          
          <li>
            <h3>Time Zone</h3>{" "}
            <div className={classes.data}>{props.data.timezone_id}</div>
          </li>
        </ul>
      </Card>
    </section>
  );
};

export default memo(ResultWeather);
