import _ from "lodash";

export default class LocationsViewModel {
  constructor() {
    this.locations = ko.observable();
    this.filterInput = ko.observable();
    this.filteredList = ko.computed(
      () => this.getFilteredList(this.filterInput()),
      this
    );
    this.init();
  }
  getFilteredList(input) {
    // if a filter query has been entered, return the filtered list of locations
    if (typeof input === "string" && input.length > 0) {
      return _.filter(this.locations(), location => {
        // filter case insensitive
        return new RegExp(input, "i").test(location.name);
      });
    }
    // otherwise return all locations
    return this.locations();
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
