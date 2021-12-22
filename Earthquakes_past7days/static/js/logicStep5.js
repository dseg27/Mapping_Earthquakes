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

// Create earthquake layer 
let earthquakes = new L.layerGroup();

// Create overlay 
let overlays = {
    Earthquakes: earthquakes
};


// Create the map object with a center and zoom level 
let map = L.map("mapid",{
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});

// Add control to the map to allow user to toggle 
L.control.layers(baseMaps, overlays).addTo(map);

// // Pass map layers to layer control, add to map 
// L.control.layers(baseMaps).addTo(map);

// Style marker 
function styleInfo(feature){
    return{
        opacity: 1,
        fillOpacity: 1,
        fillColor: "#ffae42",
        color: "#000000",
        radius: getRadius(),
        stroke: true,
        weight: 0.5
    }
}

// Styling functions 
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
    }

// Get color 
function getColor(magnitude){
    if (magnitude > 5) {
        return "#ea2c2c";
    }
    if (magnitude > 4) {
        return "#ea822c";
    }
    if (magnitude > 3) {
        return "#ee9c00";
    }
    if (magnitude > 2) {
        return "#eecc00";
    }
    if (magnitude > 1) {
        return "#d4ee00";
    }
      return "#98ee00";
}

// Get radius 
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
}

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
.then(function(data) {
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng){
            console.log(data);
            return L.circleMarker(latlng)
            },
        style: styleInfo,
        onEachFeature: function(feature, layer){
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(earthquakes);
    // Now add earthquake layer to map 
    earthquakes.addTo(map);
});

// Create a legend control object 
var legend = L.control({position: 'bottomright'});

legend.onAdd = function () {

    let div = L.DomUtil.create("div", "info legend");
        const magnitudes = [0, 1, 2, 3, 4, 5];
        const colors = [
            "#98ee00",
            "#d4ee00",
            "#eecc00",
            "#ee9c00",
            "#ea822c",
            "#ea2c2c"
        ];

    // Looping through our intervals to generate a label with a colored square for each interval.
    for (var i = 0; i < magnitudes.length; i++) {
        console.log(colors[i]);
        div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
};

legend.addTo(map);







// // Legend control 
// let legend = L.control({
//     position: "bottomright"
// });

// legend.onAdd = function () {
//     let div = L.DomUtil.create("div", "info legend");

//     const magnitudes = [0, 1, 2, 3, 4, 5];
//     const colors = [
//         "#98ee00",
//         "#d4ee00",
//         "#eecc00",
//         "#ee9c00",
//         "#ea822c",
//         "#ea2c2c"
//     ];

//     // Looping through our intervals to generate a label with a colored square for each interval.
//     for (var i = 0; i < magnitudes.length; i++) {
//         console.log(colors[i]);
//         div.innerHTML +=
//         "<i style='background: " + colors[i] + "'></i> " +
//         magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
//     }
//     return div;
//     };

//     legend.addTo(map);
