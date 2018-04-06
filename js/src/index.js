import MapService from "./services/maps";

window.initMap = () => {
  const myMapService = new MapService({
    location: { lat: 50.5512631, lng: 9.6752945 },
    element: document.getElementById("map")
  });
  myMapService.init().then(() => {
    const request = {
      bounds: myMapService.map.getBounds(),
      keyword: "Restaurant",
      type: "restaurant"
    };
    myMapService.performSearch(request).then(results => {
      for (var i = 0, result; (result = results[i]); i++) {
        myMapService.addMarker(result);
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello Bulma!");
});
