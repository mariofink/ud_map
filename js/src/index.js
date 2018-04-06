import MapService from "./services/maps";

window.initMap = () => {
  const myMap = new MapService({
    location: { lat: 50.5512631, lng: 9.6752945 },
    element: document.getElementById("map"),
    onIdle: mapSvc => {
      const request = {
        bounds: mapSvc.map.getBounds(),
        keyword: "Restaurant",
        type: "restaurant"
      };
      mapSvc.performSearch(request).then(results => {
        for (var i = 0, result; (result = results[i]); i++) {
          mapSvc.addMarker(result);
        }
      });
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello Bulma!");
});
