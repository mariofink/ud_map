import _ from "lodash";
import FoursquareService from "../services/FoursquareService";
import GoogleMapsService from "../services/GoogleMapsService";

export default class LocationsViewModel {
  /**
   * Init the location list UI
   * @param {GoogleMapsService} mapservice
   */
  constructor(mapservice) {
    if (typeof mapservice === "undefined") {
      throw "no mapservice passed";
    }
    this.mapservice = mapservice;
    this.foursquareService = new FoursquareService();
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
  /**
   * Triggered when the list of locations changes
   * Adds a marker for each location and sets up a callback function that gets triggered when a marker is clicked
   * @param {*} allLocations
   * @param {*} filteredLocations
   */
  updateMap(allLocations, filteredLocations) {
    if (typeof allLocations !== "undefined") {
      for (let location of allLocations) {
        this.mapservice.removeMarker(location);
      }
    }
    for (let location of filteredLocations) {
      this.mapservice.addMarker(location, (result, infoWindowContent) => {
        const venueName = document.createElement("h3");
        venueName.innerHTML = result.name;
        infoWindowContent.appendChild(venueName);
        const rating = document.createElement("p");
        rating.innerHTML = `Loading Foursquare rating…`;
        infoWindowContent.appendChild(rating);
        this.foursquareService
          .getVenueDetails(result)
          .then(venue => {
            console.log("venue:", venue);
            if (
              typeof venue === "undefined" ||
              typeof venue.rating === "undefined"
            ) {
              rating.innerHTML = "No rating available";
              return;
            }
            rating.innerHTML = `Rating: ${venue.rating} of 10`;
          })
          .catch(error => {
            console.warn(error);
            rating.innerHTML = "No rating available";
          });
      });
    }
  }
  /**
   * Called when the user clicks an item in the location list.
   * The event is handed over to the Google Maps API service
   * @param {*} location
   */
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
