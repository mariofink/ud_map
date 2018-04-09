export default class LocationsViewModel {
  constructor() {
    this.locations = ko.observable();
    this.init();
  }
  setLocations(locations) {
    this.locations(locations);
  }
  init() {
    ko.applyBindings(this);
  }
}
