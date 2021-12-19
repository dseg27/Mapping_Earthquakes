// Add console.log() to check to see if our code is working 
console.log("working"); 

// Create the map object with a center and zoom level 
let map = L.map("mapid").setView([36.6213, -122.3790], 5);

// Create a polyline using line coordinates, make it red
// Define line 1D array first
let line = [
  [33.9416, -118.4085],
  [37.6213, -122.3790],
  [40.7899, -111.9791],
  [47.4502, -122.3088]
];

L.polyline(line, {
  color: "yellow",
  dashArray: 4
}).addTo(map);

// // Get data from separate file 
// let cityData = cities; 

// // Iterate through cities list and print to console 
// cityData.forEach(function(city){
//     console.log(city)
//     L.circleMarker(city.location, {
//       radius: city.population/200000,
//       color: "orange",
//       fillColor: "orange",
//       fillOpacity: 0.4
//     })
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2 <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//     .addTo(map);
// });

//mapbox://styles/mapbox/satellite-streets-v11

// Create the tile layer that will be the background of map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'mapbox/streets-v11',
    id: 'mapbox/satellite-streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);