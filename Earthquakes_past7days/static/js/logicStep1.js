// Add console.log() to check to see if our code is working 
console.log("working"); 

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps 
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets
};

// Create the map object with a center and zoom level 
let map = L.map("mapid",{
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});

// Pass map layers to layer control, add to map 
L.control.layers(baseMaps).addTo(map);


// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
.then(function(data) {
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data).addTo(map);
});


// let torontoHoods = "https://raw.githubusercontent.com/dseg27/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// // Create style for lines 
// let myStyle = {
//   fillColor: "yellow",
//   weight: 1
// }

// // Grab data 
// d3.json(torontoHoods).then(function(data) {
//   console.log(data);
//   L.geoJSON(data, {
//       style: myStyle,
//       onEachFeature: function(feature, layer){
//         layer.bindPopup("<h3> Neighborhood: " + feature.properties.AREA_NAME + "</h3>");
//       }
//   })
//   .addTo(map);
// });