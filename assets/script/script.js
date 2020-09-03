// global vars
var place = null;
var placeId = null;
var photoId = null;
var lat = null;
var lon = null;
// click function

$("#search").on("click", function () {
  alert("click")
  placesCall();
})
// geolocation function
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    alert("Geolocation is not supported by this browser.");
  }
}
// function to set coords
function showPosition(position) {
  console.log(position);
  lat = position.coords.latitude; 
  lon = position.coords.longitude;
  console.log(lat)
  console.log(lon)
}
// google places API call
function placesCall() {
  var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lon+"&radius=1500&type=bar&key="+config.MY_KEY;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
      console.log(response)
      for(var i =0; i<response.length; i++){
        
      }    
  })
}
getLocation();


// render target id info 
// "+lat+","+lon+"