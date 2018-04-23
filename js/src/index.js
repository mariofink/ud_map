import GoogleMapsService from "./services/GoogleMapsService";
import LocationsViewModel from "./viewmodels/LocationsViewModel";

window.initMap = () => {
  /**
   * Initialises the Google Maps Api and loads a list of restaurants for the specified location.
   * It then puts this list into the locations view model that is handled by knockout.
   */
  const myMapService = new GoogleMapsService(google.maps, {
    location: { lat: 50.5512631, lng: 9.6752945 },
    element: document.getElementById("map")
  });
  const locationsViewModel = new LocationsViewModel(myMapService);
  myMapService.init().then(() => {
    const request = {
      bounds: myMapService.map.getBounds(),
      keyword: "Restaurant",
      type: "restaurant"
    };
    myMapService.performSearch(request).then(results => {
      locationsViewModel.setLocations(results);
    });
  });
};

window.onMapsError = () => {
  /**
   * In case the Google Maps API could not be loaded, show the error message.
   */
  document.getElementById("maps-error").style.display = "block";
};
