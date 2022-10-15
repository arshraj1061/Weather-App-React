import geocode from "./utils/geocode";
import forecast from "./utils/forecast";

const sendRequest = async (location) => {
  const geocodeData = await geocode(location);

  if (geocodeData) {
    const forecastData = await forecast(
      geocodeData.Latitude,
      geocodeData.Longitude
    );
    return [forecastData, geocodeData.Location];
  }
};

export default sendRequest;
