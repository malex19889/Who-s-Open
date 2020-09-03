
$(document).ready(function(){



 /* $("#search-button").on("click", function(){

  mapData();

  });




function mapData(){


var queryURL = "http://api.ipstack.com/66.25.134.187?access_key=b4ea346fbe0daf6aaabebc950e3cc76a";


$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

  console.log(response);

  var


  });
};*/
createMap();

var x = $("#search-button");

$("#search-button").on("click", function () {

  getLocation();
  console.log("inside click");

})


function getLocation() {


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  var lng = position.coords.longitude;
  var lat = position.coords.latitude;
   
  
displayLocation(lat,lng);
  console.log( "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude)
}


function displayLocation(lat, lng){

  var geojson = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.032, 38.913]
      },
      properties: {
        title: 'Mapbox',
        description: 'Washington, D.C.'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: 'Mapbox',
        description: 'San Francisco, California'
      }
    }]
  };

// add markers to map
geojson.features.forEach(function(marker) {

  // create a HTML element for each feature
  var el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
});
  

};


function createMap(){
mapboxgl.accessToken = 'pk.eyJ1IjoieHhtYWt2ZWxpMjJ4eCIsImEiOiJja2VjNmhhaGcwNGtuMnVrZWdkNXprZjJnIn0.gmnmTgSzzlIYiQGGCePE3w';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/xxmakveli22xx/ckejbvql12rye19pmbaa3b4nl', // stylesheet location
    center: [-96, 37.8], // starting position [lng, lat]
    zoom: 3 // starting zoom
});
}



});