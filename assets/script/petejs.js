
$(document).ready(function(){



  getLocation();
  mapboxgl.accessToken = 'pk.eyJ1IjoieHhtYWt2ZWxpMjJ4eCIsImEiOiJja2VjNmhhaGcwNGtuMnVrZWdkNXprZjJnIn0.gmnmTgSzzlIYiQGGCePE3w';
  
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/xxmakveli22xx/ckejbvql12rye19pmbaa3b4nl',
    center: [-96, 37.8],
    zoom: 3
  });
  
  
  // code from the next step will go here!
  function displayLocation(lng, lat){
  console.log("inside function ");
  var geojson = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lng, lat]
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
     
    
  displayLocation(lng,lat);
    console.log( "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude)
  }







});