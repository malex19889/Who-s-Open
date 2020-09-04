// global vars
var place = null;
var placesInfo = null;
var placeId = [];
var photoId = [];
var lat = null;
var lon = null;
var photoRef = [];
// search click function
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
  lat = position.coords.latitude; 
  lon = position.coords.longitude;
  console.log(lat)
  console.log(lon)
}
// google places API call
function placesCall() {
  var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lon+"&radius=1500&type=bar&opennow&key="+config.MY_KEY;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (placeInfo) {
      console.log(placeInfo)
      placesInfo = placeInfo
      renderInfo();
  })
}
function renderInfo(){
  for(var i =0; i<placesInfo.results.length; i++){
        if (placesInfo.results[i].business_status === "OPERATIONAL") {
          var infoCard = $("<div>");
          var infoCardEl1 = $("<div>");
          var infoCardEl2 = $("<div>");
          var infoCardEl3 = $("<div>");
          var infoCardEl4 = $("<article>");
          var nameEl = $("<p>");
          var addrEl = $("<p>");

          infoCard.attr("class","tile is-ancestor");
          infoCardEl1.attr("class","tile is-vertical is-8");
          infoCardEl2.attr("class","tile");
          infoCardEl3.attr("class","tile is-parent is-vertical");
          infoCardEl4.attr("class","tile is-child notification is-primary");
          nameEl.attr("class","title");
          addrEl.attr("class","subtitle");
          nameEl.text(placesInfo.results[i].name);
          addrEl.text(placesInfo.results[i].vicinity)

          $("#info").append(infoCard);
          infoCard.append(infoCardEl1);
          infoCardEl1.append(infoCardEl2);
          infoCardEl2.append(infoCardEl3);
          infoCardEl3.append(infoCardEl4);
          infoCardEl4.append(nameEl);
          infoCardEl4.append(addrEl)


          // photoRef.push(response.results[i].photos[0].photo_reference)

        } else {
          console.log(placesInfo.results[i])
        }
        
      }    
      console.log(photoRef);
}
getLocation();


// render target id info 
// "+lat+","+lon+"