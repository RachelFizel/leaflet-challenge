// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("mapid", {
    center: [39.3210, -111.0937],
    zoom: 4
  });
  
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  

mapEarthQuakes(); 
mapTectonicPlates();

https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json

function mapEarthQuakes() {
    console.log("mapEarthQuakes");
    var url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson`;

    
  
    d3.json(url).then(function(data) {

        L.geoJson(data,
            {
                pointToLayer:function(feature, latlng){
                    return L.circleMarker(latlng);
                },
                style:function (feature){
                    return {
                        color: "white",
                        // Set color scale
                        //scale: ["#ffffb2", "#b10026"],
                        //fillColor: '#008080',
                        fillColor: getColor(feature.geometry.coordinates[2]),
                        fillOpacity: 0.5,
                        radius: feature.properties.mag * 5
                        //title: place
                    }
                }

                
            }).addTo(myMap).on("click", circleClick);
    });

};




function mapTectonicPlates() {
    console.log("mapTectonicPlates");
    var url = `https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json`;
    
  
    d3.json(url).then(function(data) {
        console.log(data);

        L.geoJson(data,
            {
                color: "white"               
                
            }).addTo(myMap)
        
    });
};






function getColor(d) {

    //console.log("get color: " + d)
    return d > 999 ? '#9999FF' :
            d > 499  ? '#7D7FE2' :
            d > 199  ? '#6066C6' :
            d > 49 ? '#555EAA' :
            d > 10  ? '#23388F' :
                      '#002275';
}   
 


function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

   

var popup = L.popup();

function circleClick(e){
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked at " + e.latlng.toString())
        .openOn(myMap);
};