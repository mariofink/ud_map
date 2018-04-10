import _ from "lodash";

export default class LocationsViewModel {
  constructor(mapservice) {
    this.mapservice = mapservice;
    this.allLocations = ko.observable();
    this.filterInput = ko.observable();
    this.filteredList = ko.computed(() => {
      const list = this.getFilteredList(this.filterInput());
      this.updateMap(list);
      return list;
    }, this);
    this.init();
  }
  getFilteredList(input) {
    return _.filter(this.allLocations(), location => {
      // filter case insensitive
      return new RegExp(input, "i").test(location.name);
    });
  }
  setLocations(locations) {
    this.allLocations(locations);
  }
  updateMap(locations) {
    if (typeof this.allLocations() !== "undefined") {
      for (let location of this.allLocations()) {
        this.mapservice.removeMarker(location);
      }
    }
    for (let location of locations) {
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
