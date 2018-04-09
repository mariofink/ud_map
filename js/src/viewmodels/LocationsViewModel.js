import _ from "lodash";

export default class LocationsViewModel {
  constructor(mapservice) {
    this.mapservice = mapservice;
    this.locations = ko.observable();
    this.filterInput = ko.observable();
    this.filteredList = ko.computed(
      () => this.getFilteredList(this.filterInput()),
      this
    );
    this.init();
  }
  getFilteredList(input) {
    return _.filter(this.locations(), location => {
      // filter case insensitive
      return new RegExp(input, "i").test(location.name);
    });
  }
  setLocations(locations) {
    this.locations(locations);
    this.updateMap();
  }
  updateMap() {
    for (let location of this.locations()) {
      this.mapservice.addMarker(location);
    }
  }
  showDetails(location) {
    try {
      this.mapservice.clickMarker(location.marker);
    } catch (error) {
      console.error("Error when trying to trigger Google Maps Event", error);
    }
  }
  init() {
    ko.applyBindings(this);
  }
}
