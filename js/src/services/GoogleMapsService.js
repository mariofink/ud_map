export default class GoogleMapsService {
  constructor(api, options) {
    try {
      this.api = api;
      this.map = new this.api.Map(options.element, {
        center: options.location,
        zoom: 15
      });
      this.infoWindow = new this.api.InfoWindow();
      this.service = new this.api.places.PlacesService(this.map);
    } catch (error) {
      throw "Google Maps API could not be loaded";
    }
  }

  init() {
    return new Promise((resolve, reject) => {
      // The idle event is a debounced event, so we can query & listen without
      // throwing too many requests at the server.
      this.map.addListener("idle", () => resolve());
    });
  }

  /**
   * Promise-wrapper for the nearbySearch API method
   * @param {*} request
   * @returns Promise
   */
  performSearch(request) {
    return new Promise((resolve, reject) => {
      this.service.nearbySearch(request, (results, status) => {
        if (status !== this.api.places.PlacesServiceStatus.OK) {
          console.error(status);
          reject(status);
        }
        resolve(results);
      });
    });
  }

  /**
   * Add a marker to the map at a specified location and set up an event to load details
   * @param {*} place
   * @param {*} callback
   */
  addMarker(place, callback) {
    place.marker = new this.api.Marker({
      map: this.map,
      animation: this.api.Animation.DROP,
      position: place.geometry.location
    });

    place.marker.addListener("click", () => {
      this.animateMarker(place.marker);
      this.service.getDetails(place, (result, status) => {
        if (status !== this.api.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }
        const infoWindowContent = document.createElement("div");
        infoWindowContent.className = "map-info-window";
        this.infoWindow.setContent(infoWindowContent);
        callback(result, infoWindowContent);
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
    this.api.event.trigger(marker, "click");
  }

  animateMarker(marker) {
    marker.setAnimation(this.api.Animation.BOUNCE);
    window.setTimeout(() => {
      marker.setAnimation(null);
    }, 2000);
  }
}
