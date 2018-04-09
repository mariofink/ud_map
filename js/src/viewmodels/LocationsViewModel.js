export default class LocationsViewModel {
  constructor() {
    this.locations = ko.observable();
    this.init();
  }
  setLocations(locations) {
    this.locations(locations);
  }
  showDetails(location) {
    try {
      google.maps.event.trigger(location.marker, "click");
    } catch (error) {
      console.error("Error when trying to trigger Google Maps Event", error);
    }
  }
  init() {
    ko.applyBindings(this);
  }
}
