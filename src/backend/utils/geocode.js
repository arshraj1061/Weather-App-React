// import config from "../../config";

// const apikey= config.mapbox;

// const geocode = async (address) => {
//   const url =
//     "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
//     address +
//     `.json?access_token=${apikey}&limit=1`;

//   const response = await fetch(url);

//   if (!response.ok) {
//     throw new Error("Something is wrong in location");
//   }

//   const data = await response.json();
  
//   return {
//     Location: data.features[0].place_name,
//     Longitude: data.features[0].center[0],
//     Latitude: data.features[0].center[1],
//   };
// };

// export default geocode;

// Mapbox API - Used to get coordinates of a place from name given in URL

const request = require('request');
const config = require("../../config");
const gapi = config.mapbox;

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/` + address + `.json?access_token=${gapi}&limit=1`

    request({  url , json: true}, (error, {body} = {} ) => {
        if(error) {
            callback('Unable to connect to location service!', undefined)
        }
        else if( body.features.length === 0) {
            callback('No matching results for this location please enter another one!',undefined)
        }
        else {
            callback(undefined, {
                Location : body.features[0].place_name ,
                Longitude : body.features[0].center[0] ,
                Latitude : body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode
