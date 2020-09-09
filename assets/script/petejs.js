$(document).ready(function(){





  getLocation();

  $("#search").on("click", function () {
   
    setTimeout(displayResults,3000);
  });
  



  mapboxgl.accessToken = "pk.eyJ1IjoieHhtYWt2ZWxpMjJ4eCIsImEiOiJja2VjNmhhaGcwNGtuMnVrZWdkNXprZjJnIn0.gmnmTgSzzlIYiQGGCePE3w";
  var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/xxmakveli22xx/ckejbvql12rye19pmbaa3b4nl',
  center: [-98.6087424, 29.501030399999998],
  zoom: 14
});

  

        
         
       
     

 function displayLocation(lng, lat){

   var geojson = {
     type: 'FeatureCollection',
     features: [{
        type: 'Feature',
        geometry: {
         type: 'Point',
         coordinates: [lng, lat]
       },
       properties: {
         title: "Current Location",
         description: 'San Antonio, Texas'
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
   .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
   .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
   .addTo(map);
 });


};

//this will display the search results on the map
function displayLocation2(lng, lat, placeName, placeAddress){
  var geojson = {
    type: 'FeatureCollection',
    features: [{
       type: 'Feature',
       geometry: {
        type: 'Point',
        coordinates: [lng, lat]
      },
      properties: {
        title: placeName,
        description: placeAddress
      }
    
  }]
    
  };
    

  // add markers to map
geojson.features.forEach(function(marker) {

// create a HTML element for each feature
var el = document.createElement('div');
    el.className = 'marker2';

// make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
         .setLngLat(marker.geometry.coordinates)
         .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
         .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
         .addTo(map);
});



  
};

//this will get the locations information
 function displayResults(){
      
      var placeName ="";
      var placeAddress = "";
      
      for(var i = 0; i < latArr.length; i++){
       
        placeName = placesInfo.results[i].name;
        placeAddress = placesInfo.results[i].vicinity;
        displayLocation2(lonArr[i], latArr[i], placeName, placeAddress); 
      
      
      
      }   


 }
 

 
 
 
 //this function will grab the geo location
 function getLocation() {
 
 
   if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        }else { 
             x.innerHTML = "Geolocation is not supported by this browser.";
           }
      }
  
    function showPosition(position) {
         var lng = position.coords.longitude;
         var lat = position.coords.latitude;
         displayLocation(lng,lat);
        }


// Add geolocate control to the map.
     map.addControl(
         new mapboxgl.GeolocateControl({
         positionOptions: {
         enableHighAccuracy: true
          },
         trackUserLocation: true
         })
      );
 
 
 });