// handle for type from html drop down
var place = null;
// handle for radius from html drop down
var radius = null;
// global holder for places info
var placesInfo = null;
// global var for place
var placesDeets = null;
var placeDeetsEl = null;
// var to update modal text for render
var modalText = null;
var placesPic =null;
// holder for place id
var placeId = null;
var photoId = null;
var lat = null;
var lon = null;
// arrays to hold location lon and lat
var latArr = [];
var lonArr = [];

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
  // alert("click")
  place = $("#place").val();
  console.log(place)
  // call radius function
  radiiusCalc();
  $("#info").empty();
  // call places api function
  placesCall();
  sound.play();
  
})
// google places API call
function placesCall() {
  if (place === "who's open?") {
    modalText = "Please select search options for type and radius before starting a search!";
    modalRender();
  } else {
  var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lon+"&radius="+radius+"&type="+place+"&opennow&key="+config.MY_KEY;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (placeInfo) {
      console.log(placeInfo)
      placesInfo = placeInfo
      if (placesInfo.status === "ZERO_RESULTS") {
        modalText = "No locations open at this time!"
        modalRender();
      } else {
         renderInfo();
      // add click listener for tile click
      $(".info").on("click", function () {
            console.log(this)
            placeDeetsEl = $(this);
            placeId = $(this).attr("data-placeId");
            // photoId = $(this).attr("data-photoId");
            placesDeetsCall();
            sound.play();
          })
      }
     
  })
}
}
// function to render places search info
function renderInfo(){
  for(var i =0; i<placesInfo.results.length; i++){
        if (placesInfo.results[i].business_status === "OPERATIONAL") {
          // create place tile elems
            var infoCard = $("<div>");
            var infoCardEl1 = $("<div>");
            var infoCardEl2 = $("<div>");
            var infoCardEl3 = $("<div>");
            var infoCardEl4 = $("<article>");
            var nameEl = $("<p>");
            var addrEl = $("<p>");
            // add attributes and text to elements
            infoCard.attr("class","tile is-ancestor");
            infoCardEl1.attr("class","tile is-vertical is-8 info");
            // if statement for no photo data 
            // if (placesInfo.results[i].photos != "undefined") {
              // infoCardEl1.attr("data-photoId", placesInfo.results[i].photos[0].photo_reference);
            // }
            infoCardEl1.attr("data-placeId", placesInfo.results[i].place_id);
            infoCardEl2.attr("class","tile");
            infoCardEl3.attr("class","tile is-parent is-vertical");
            infoCardEl4.attr("class","tile is-child notification is-primary");
            nameEl.attr("class","title");
            addrEl.attr("class","subtitle");
            nameEl.text(placesInfo.results[i].name);
            addrEl.text(placesInfo.results[i].vicinity)
            // append card elemnts to html
            $("#info").append(infoCard);
            infoCard.append(infoCardEl1);
            infoCardEl1.append(infoCardEl2);
            infoCardEl2.append(infoCardEl3);
            infoCardEl3.append(infoCardEl4);
            infoCardEl4.append(nameEl);
            infoCardEl4.append(addrEl)
            // push lon and lat to the array for petes code to pull from
            lonArr.push(placesInfo.results[i].geometry.location.lng)            
            latArr.push(placesInfo.results[i].geometry.location.lat)          
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
        placesDeets = placeDeets
        renderDetsInfo();      
    })
  }
function  renderDetsInfo(){
    console.log($(this))
    // create phone nuber element
    var phoneNum = $("<p>");
    // create list element for hours
    var openHours = $("<ul>");
    // apply class and text to elemnts
    openHours.css("list-style-type", "none")
    phoneNum.text(placesDeets.result.formatted_phone_number);
    // append elements
    $(placeDeetsEl).append(phoneNum);
    $(placeDeetsEl).append(openHours);
    // loop to create open hours 
    for(var i = 0; i< placesDeets.result.opening_hours.weekday_text.length; i++){
        var day = $("<li>");
        day.text(placesDeets.result.opening_hours.weekday_text[i]);
        openHours.append(day);
    }
}
function modalRender(){
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
    // modal.css( "background-color","gold" );
    modalP.text(modalText);
    modalBtn.attr("class","modal-close is-large")
    // append elements to HTML
    $(".content").append(modal)
    modal.append(modalBtn)
    modal.append(modalCont)
    modal.append(modalP)
    modal.append(modalBtn)
    $(".modal").on("click", function () {
      modal.attr("class","modal ");
    })
}
// function to convert miles to meters
function radiiusCalc(){
  radius = $("#miles").val();
  console.log(radius)
  if (radius === "mile radius") {
    modalText = "Please select search options for radius before starting a search!";
    modalRender();
  } else{
     radius = radius * 1609 
     console.log(radius)
  }
  
}
// set sound src and volume
var sound = new Howl({
  src: ['./assets/searchswoosh.mp3'],
  volume: 0.5
});

// call location function on webpage load
getLocation();

