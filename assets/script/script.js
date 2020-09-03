// global vars
var place = null;
var placeId = null;
var lat = null;
var lon = null;
// click function
var x = $("#search");
$("#search").on("click", function () {
  alert("click")
  
  placesCall();
})
// geolocation function
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
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
  var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lon+"&radius=1500&type=restaurant&key=AIzaSyAVTdB6AADtqffwYAQG3KxB_wtY6uYaLLI";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
      console.log(response)
    // details call
      $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJCaSlbCdiXIYRpz6ScXykpR8&fields=name,opening_hours/weekday_text,rating,formatted_phone_number&key=AIzaSyAVTdB6AADtqffwYAQG3KxB_wtY6uYaLLI",
        method: "GET",
      }).then(function (response) {
        console.log(response)
      })
  })
}
getLocation();

// "+lat+","+lon+"