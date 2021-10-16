console.log("Client side javascript File");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const p1 = document.getElementById("p-1");
const p2 = document.getElementById("p-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  p1.textContent = "Loading...";
  p2.textContent = "";
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        p1.textContent = "Error: " + data.error;
        p2.textContent = "";
      } else {
        p1.textContent = "Location: " + data.location;
        p2.textContent = "Weather: " + data.weather;
      }
    });
  });

  //   console.log(location);
});

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });
