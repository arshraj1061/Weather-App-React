// Mapbox API - Used to get coordinates of a place from name given in URL
import config from "../../config";

const apikey= config.mapbox;

const geocode = async (address) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    `.json?access_token=${apikey}&limit=1`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Something is wrong in location");
  }

  const data = await response.json();
  
  return {
    Location: data.features[0].place_name,
    Longitude: data.features[0].center[0],
    Latitude: data.features[0].center[1],
  };
};

export default geocode;
