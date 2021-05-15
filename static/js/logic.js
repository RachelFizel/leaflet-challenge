// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("mapid", {
    center: [39.3210, -111.0937],
    zoom: 5
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

                
            }).addTo(myMap)
    });

    
        // //console.log(data);
        // for (var i = 0; i < data.features.length; i++) {
        //     // Grab values from the response json object to build the plots
        //     var mag = data.features[i].properties.mag;
        //     var place = data.features[i].properties.place;

        //     var coordinates = data.features[i].geometry.coordinates;
        //     var longitude = coordinates[0];
        //     var latitude = coordinates[1];
        //     var depth = coordinates[2];
            
        //     //console.log('longitude is ' + longitude);
        //     //console.log('latitude is ' + latitude);
        //     //console.log('depth is ' + depth);

        //     // Create a new marker
        //     // Pass in some initial options, and then add it to the map using the addTo method
        //     var circle = L.circle([latitude, longitude], {
        //         color: depth,
        //         // Set color scale
        //         //scale: ["#ffffb2", "#b10026"],
        //         //fillColor: '#008080',
        //         fillColor: getColor(depth),
        //         fillOpacity: 0.5,
        //         radius: mag * 10000,
        //         title: place
            
        //     }).addTo(myMap).on("click", circleClick);
            
 
            
    //    });

        // Set up the legend
        // var legend = L.control({ position: "bottomright" });
        // legend.onAdd = function(myMap) {
        //         console.log("onAdd");

        
        //      var div = L.DomUtil.create('div', 'info legend'),
            
        //          steps =  6
        //          grades = [-10, 10, 30, 50, 70, 90]

        //     // loop through our density intervals and generate a label with a colored square for each interval
        //     for (var i = 0; i < steps; i++) {
        //         div.innerHTML +=
        //             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
        //             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        //     }

        //     return div;
        // };
        // legend.addTo(myMap);   
    //});

};




function mapTectonicPlates() {
    console.log("mapTectonicPlates");
    var url = `https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json`;
    
  
    d3.json(url).then(function(data) {
        console.log(data);

        L.geoJson(data,
            {
                color: "white",
                // Set color scale
                //scale: ["#ffffb2", "#b10026"],
                //fillColor: '#008080',
                //fillColor: getColor(feature.geometry.coordinates[2]),
                //fillOpacity: 0.5,
                //radius: feature.properties.mag * 7
                //title: place
                
                
            }).addTo(myMap)



        // var filtered = data.features.filter(function(f) {
        //     return f.properties.PlateName == "North America" || f.properties.PlateName == "United States"; 
        //  });
        //  console.log(filtered);

        // //var resultArray = data.filter(s => s.PlateName == selected_state);

        // var latlngs = [];
        
        // //              i < resultArray.length  
        // for (var i = 0; i < 10; i++) {
        //     //for (var j = 0; j < data.features[i].geometry.coordinates.length; j++) {
        //         latlngs.push(filtered[0].geometry.coordinates);
        //         console.log (latlngs);
        //     }
        // // create a red polyline from an array of LatLng points
        // // var latlngs = [
        // //     [45.51, -122.68],
        // //     [37.77, -122.43],
        // //     [34.04, -118.2]
        // // ];
        // var polyline = L.polyline(latlngs, {color: 'blue'}).addTo(myMap);
        
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
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

   



//L.geoJson(statesData, {style: style}).addTo(map);

//myMap.on('click', onMapClick);

var popup = L.popup();

function circleClick(e){
    //  alert("you clicked at " + e.latlng);
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked at " + e.latlng.toString())
        .openOn(myMap);
};