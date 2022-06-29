var formEl = document.getElementById("#zoneForm");
var formInputEl = document.getElementById("#searchZone");
var searchBtnEl = document.getElementById("#searchBtn");
var zoneResultContainerEl = document.getElementById("#zoneResult");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "92d5a261cbmsh2670c43e09e3d07p15f894jsn89c9d2e082a5",
    "X-RapidAPI-Host": "plant-hardiness-zone.p.rapidapi.com",
  },
};

var formSubmitHandler = function (event) {
  // Prevent page from refreshing
  event.preventDefault();

  // Get value from input element
  var zone = formInputEl.value.trim();

  if (zone) {
    getUserZone(zone);

    // Clear old content
    zoneResultContainerEl.textContent = "";
    formInputEl.value = "";
  } else {
    alert("Would you like to find your gardening zone?");
  }
};

var buttonClickHandler = function (event) {
  getUserZone();
};

var getUserZone = function (zone) {
  var apiKey = "92d5a261cbmsh2670c43e09e3d07p15f894jsn89c9d2e082a5";
  // Format the API Url
  var apiUrl =
    "https://plant-hardiness-zone.p.rapidapi.com/zipcodes/90210" +
    zone +
    apiKey;

  // Make a get request to url
  fetch(apiUrl, options)
    .then(function (response) {
      // Request successful
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          return displayZone(data, zone);
        });
      } else {
        alert("Error: Zone not found for that zip code ");
      }
    })
    .catch(function (error) {
      alert("Unable to retrieve gardening zone.");
    });
};

var displayZone = function (event) {
  console.log("Awesome");
};

// // Add event listeners to form and button
getUserZone();
displayZone();

// fetch('https://plant-hardiness-zone.p.rapidapi.com/zipcodes', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
