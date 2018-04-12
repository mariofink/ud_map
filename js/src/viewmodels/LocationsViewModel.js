import _ from "lodash";

export default class LocationsViewModel {
  constructor(mapservice) {
    if (typeof mapservice === "undefined") {
      throw "no mapservice passed";
    }
    this.mapservice = mapservice;
    this.allLocations = ko.observable();
    this.filterInput = ko.observable();
    this.filteredList = ko.computed(() => {
      const list = this.getFilteredList(
        this.allLocations(),
        this.filterInput()
      );
      this.updateMap(this.allLocations(), list);
      return list;
    }, this);
    this.init();
  }
  getFilteredList(allLocations, input) {
    return _.filter(allLocations, location => {
      // filter case insensitive
      return new RegExp(input, "i").test(location.name);
    });
  }
  setLocations(locations) {
    this.allLocations(locations);
  }
  updateMap(allLocations, filteredLocations) {
    if (typeof allLocations !== "undefined") {
      for (let location of allLocations) {
        this.mapservice.removeMarker(location);
      }
    }
    for (let location of filteredLocations) {
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
