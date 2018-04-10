import GoogleMapsService from "./services/GoogleMapsService";
import LocationsViewModel from "./viewmodels/LocationsViewModel";

window.initMap = () => {
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

document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello Bulma!");
});
