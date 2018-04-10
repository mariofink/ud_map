export default class MapService {
  constructor(options) {
    this.map = new google.maps.Map(options.element, {
      center: options.location,
      zoom: 15
    });

    this.infoWindow = new google.maps.InfoWindow();
    this.service = new google.maps.places.PlacesService(this.map);
  }

  init() {
    return new Promise((resolve, reject) => {
      // The idle event is a debounced event, so we can query & listen without
      // throwing too many requests at the server.
      this.map.addListener("idle", () => resolve());
    });
  }

  performSearch(request) {
    return new Promise((resolve, reject) => {
      this.service.nearbySearch(request, (results, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          reject(status);
        }
        resolve(results);
      });
    });
  }

  addMarker(place) {
    place.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location
    });

    place.marker.addListener("click", () => {
      this.animateMarker(place.marker);
      this.service.getDetails(place, (result, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }
        this.infoWindow.setContent(result.name);
        this.infoWindow.open(this.map, place.marker);
      });
    });
  }

  removeMarker(place) {
    if (place.marker) {
      place.marker.setMap(null);
    }
  }

  clickMarker(marker) {
    google.maps.event.trigger(marker, "click");
  }

  animateMarker(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    window.setTimeout(() => {
      marker.setAnimation(null);
    }, 2000);
  }
}
