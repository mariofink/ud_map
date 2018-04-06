var map;
var infoWindow;
var service;
var geocoder;

export default class MapService {
  constructor(options) {
    console.info("init map");

    this.map = new google.maps.Map(options.element, {
      center: options.location,
      zoom: 15
    });

    this.infoWindow = new google.maps.InfoWindow();
    this.service = new google.maps.places.PlacesService(this.map);

    // The idle event is a debounced event, so we can query & listen without
    // throwing too many requests at the server.
    this.map.addListener("idle", () => options.onIdle(this));
  }

  performSearch(request) {
    this.service.nearbySearch(request, (results, status) =>
      this.callback(results, status)
    );
  }

  callback(results, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      console.error(status);
      return;
    }
    for (var i = 0, result; (result = results[i]); i++) {
      this.addMarker(result);
    }
  }

  addMarker(place) {
    var marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, "click", () => {
      this.service.getDetails(place, (result, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }
        this.infoWindow.setContent(result.name);
        this.infoWindow.open(this.map, marker);
      });
    });
  }
}
