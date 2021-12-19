// Add console.log() to check to see if our code is working 
console.log("working"); 

let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
  "Day Navigation": light,
  "Night Navigation": dark
};

// Create the map object with a center and zoom level 
let map = L.map("mapid",{
  center: [44.0, -80.0],
  zoom: 2,
  layers: [dark]
});

// Pass map layers to layer control, add to map 
L.control.layers(baseMaps).addTo(map);

let torontoData = "https://raw.githubusercontent.com/dseg27/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/torontoRoutes.json";

// Grab data 
d3.json(torontoData).then(function(data) {
  console.log(data);
  L.geoJSON(data, function(feature, layer){
    console.log(layer);
    layer.bindPopup("<h2>"+"Airport Code: " +feature.properties.faa +  "</h2> <hr> <h3> Airport Name: " + feature.properties.name+ "</h3>");
  })

});