const request = require("request");

const forecast = (lattitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=d4748a7f527575877867fa16596474d8&query=" +
    lattitude +
    "," +
    longitude +
    "&units=m";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to Connect!", undefined);
    } else if (body.error) {
      callback("Unable to find Location!", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions +
          ". It is currently " +
          body.current.temperature +
          " degrees out. It feels like " +
          body.current.feelslike +
          " degrees out."
      );
    }
  });
};

module.exports = forecast;

// *** Old Code ***

// const weather =
//   "http://api.weatherstack.com/current?access_key=d4748a7f527575877867fa16596474d8&query=33.6844,73.0479&units=m";
// request({ url: weather, json: true }, (error, response) => {
//   // const data = JSON.parse(response.body);
//   // console.log(response.body.current);

//   if (error) {
//     console.log("Unable to Connect!");
//   } else if (response.body.error) {
//     console.log("Unable to find Location!");
//   } else {
//     console.log(
//       response.body.current.weather_descriptions +
//         ". It is currently " +
//         response.body.current.temperature +
//         " degrees out. It feels like " +
//         response.body.current.feelslike +
//         " degrees out."
//     );
//   }
// });
