"use strict";

var map;
var infoWindow;
var service;
var geocoder;

function initMap() {
  console.info("init map");

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 50.5512631, lng: 9.6752945 },
    zoom: 15
  });

  infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);

  // The idle event is a debounced event, so we can query & listen without
  // throwing too many requests at the server.
  map.addListener("idle", performSearch);
}

function performSearch() {
  var request = {
    bounds: map.getBounds(),
    keyword: "Restaurant",
    type: "restaurant"
  };
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    console.error(status);
    return;
  }
  for (var i = 0, result; result = results[i]; i++) {
    addMarker(result);
  }
}

function addMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, "click", function () {
    service.getDetails(place, function (result, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }
      infoWindow.setContent(result.name);
      infoWindow.open(map, marker);
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("Hello Bulma!");
});