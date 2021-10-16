const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZGFuaXlhbHphZmFyNDAiLCJhIjoiY2t1cHZ2cmZiMWMzaTMxcDF1YWw2c2ZmMCJ9.M39HEWFtxtlYEAkP-aWnig&limit=1";
  // console.log(url);
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to Connect!", undefined);
    } else if (body.features.length === 0) {
      callback(
        "Unable to find Location! Try with another location.",
        undefined
      );
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        lattitude: body.features[0].center[1],
        place: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;

// *** Old Code ***
// const center =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/islamabad.json?access_token=pk.eyJ1IjoiZGFuaXlhbHphZmFyNDAiLCJhIjoiY2t1cHZ2cmZiMWMzaTMxcDF1YWw2c2ZmMCJ9.M39HEWFtxtlYEAkP-aWnig&limit=1";

// request({ url: center, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to Connect!");
//   } else if (response.body.features.length === 0) {
//     console.log("Unable to find Location! Try with another location.");
//   } else {
//     const longitude = response.body.features[0].center[0];
//     const lattitude = response.body.features[0].center[1];
//     console.log("Lattitude: " + lattitude + ", Longitude: " + longitude);
//   }
// });
