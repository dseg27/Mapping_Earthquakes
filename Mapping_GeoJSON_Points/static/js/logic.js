// Add console.log() to check to see if our code is working 
console.log("working"); 

// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// L.geoJSON(sanFranAirport, {
//   pointToLayer: function(feature, latlng){
//     console.log(feature);
//     return L.marker(latlng)
//     .bindPopup("<h2>"+feature.properties.city + ", " + feature.properties.country + "</h2> <hr> <h3>" + feature.properties.name+ "</h3>");
//   }
// }).addTo(map);

// L.geoJSON(sanFranAirport, {
//   onEachFeature: function(feature, layer){
//     console.log(layer);
//     layer.bindPopup("<h2>"+"Airport Code: " +feature.properties.faa +  "</h2> <hr> <h3> Airport Name: " + feature.properties.name+ "</h3>");
//   }
// }).addTo(map);

// Create the tile layer that will be the background of map

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps 
let baseMaps = {
  Street: streets,
  Dark: dark
};

// Create the map object with a center and zoom level 
let map = L.map("mapid",{
  center: [30,30],
  zoom: 2,
  layers: [streets]
});

// Pass map layers to layer control, add to map 
L.control.layers(baseMaps).addTo(map);

// Accessing airport GeoJSON url AFTER TILE LAYER
let airportData = "https://raw.githubusercontent.com/dseg27/Mapping_Earthquakes/main/majorAirports.json"

// Use d3 to grab GeoJSON data 
d3.json(airportData).then(function(data){
  console.log(data);
  L.geoJSON(data, {
    onEachFeature: function(feature, layer){
      console.log(layer);
      layer.bindPopup("<h2>"+"Airport Code: " +feature.properties.faa +  "</h2> <hr> <h3> Airport Name: " + feature.properties.name+ "</h3>");
    }
  }).addTo(map);
});

// // Create a polyline using line coordinates, make it red
// // Define line 1D array first
// let line = [
//   [33.9416, -118.4085],
//   [37.6213, -122.3790],
//   [40.7899, -111.9791],
//   [47.4502, -122.3088]
// ];

// L.polyline(line, {
//   color: "yellow",
//   dashArray: 4
// }).addTo(map);

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