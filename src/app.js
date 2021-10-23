const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utlis/geocode");
const forecast = require("./utlis/forecast");

const port = process.env.PORT || 3000;

// Create app
const app = express();

// Define paths for Express Config

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebar engine and Views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Daniyal Zafar",
  });
});

// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpMessage: "Sample Message for Help",
    name: "Daniyal Zafar",
  });
});

// app.get("/help", (req, res) => {
//   res.send("Help Page!");
// });

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Daniyal Zafar",
  });
});

// app.get("/about", (req, res) => {
//   res.send("<h1>About-Us</h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided",
    });
  }

  geocode(req.query.address, (error, { longitude, lattitude, place } = {}) => {
    if (error) {
      return res.send({ error });
    }

    // console.log("Place: ", place);
    // console.log("Longitude: " + longitude + ", Lattitude: " + lattitude);

    forecast(lattitude, longitude, (error, data) => {
      if (error) {
        return res.send({ error });
      }
      // console.log("Weather: ", data);

      res.send({
        location: place,
        address: req.query.address,
        weather: data,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term",
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404 Error!",
    errorMessage: "Help Article NOT Found!",
    name: "Daniyal Zafar",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404 Error!",
    errorMessage: "Page NOT Found!",
    name: "Daniyal Zafar",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
