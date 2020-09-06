// handle for type from html drop down
var place = null;
// handle for radius from html drop down
var radius = null;
// global holder for places info
var placesInfo = null;
// global var for place
var placesDeets = null;
var placeDeetsEl = null;
var placesPic =null;
var placeId = null;
var photoId = null;
var lat = null;
var lon = null;
// var infoCardEl4 = null;
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
// search click function
$("#search").on("click", function () {
  alert("click")
  place = $("#place").val();
  console.log(place)
  placesCall();
})
// google places API call
function placesCall() {
  if (place === "who's open?") {
    // create modal elements 
    var modal = $("<div>");
    var modalBack = $("<div>");
    var modalCont = $("<div>");
    var modalP = $("<p>");
    var modalBtn = $("<button>");
    // apply modal class
    modal.attr("class","modal is-active is-clipped");
    modalBack.attr("class","modal-background");
    modalCont.attr("class","modal-content modal-card");
    modalP.text("Please select search options for type and radius before starting a search!");
    modalBtn.attr("class","modal-close is-large")
    // append elements to HTML
    $("#info").append(modal)
    modal.append(modalBtn)
    modal.append(modalCont)
    modal.append(modalP)
    modal.append(modalBtn)
    $(".modal").on("click", function () {
      modal.attr("class","modal is-clipped");
    })
  } else {
  var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lon+"&radius=1500&type="+place+"&opennow&key="+config.MY_KEY;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (placeInfo) {
      console.log(placeInfo)
      placesInfo = placeInfo
      renderInfo();
      $(".info").on("click", function () {
            alert("info click")
            // console.log(this.data_photoid)
            console.log(this)
            placeDeetsEl = $(this);
            placeId = $(this).attr("data-placeId");
            photoId = $(this).attr("data-photoId");
            console.log(placeId)
            console.log(photoId)
            placesDeetsCall();
          })
  })
}
}
// function to render places search info
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
            infoCardEl1.attr("class","tile is-vertical is-8 info");
            infoCardEl1.attr("data-photoId", placesInfo.results[i].photos[0].photo_reference);
            infoCardEl1.attr("data-placeId", placesInfo.results[i].place_id);
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
        } else {
          console.log(placesInfo.results[i])
        }
      }    
}
// call to places details from click
function placesDeetsCall() {
    var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id="+placeId+"&fields=name,address_component,formatted_phone_number,opening_hours&key="+config.MY_KEY;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (placeDeets) {
        console.log(placeDeets)
        placesDeets = placeDeets
        renderDetsInfo();      
    })
  }
function  renderDetsInfo(){
    // create phone nuber element
    console.log($(this))
    // console.log(deetsEl)
    var phoneNum = $("<p>");
    var openHours = $("<ul>");
    phoneNum.text(placesDeets.result.formatted_phone_number);
    $(placeDeetsEl).append(phoneNum);
    $(placeDeetsEl).append(openHours);
    // loop to create open hours 
    for(var i = 0; i< placesDeets.result.opening_hours.weekday_text.length; i++){
        var day = $("<li>");
        day.text(placesDeets.result.opening_hours.weekday_text[i]);
        openHours.append(day);
    }
}
// call location function on webpage load
getLocation();


// render target id info 
// "+lat+","+lon+"