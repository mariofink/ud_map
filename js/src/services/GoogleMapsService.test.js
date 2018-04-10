import GoogleMapsService from "./GoogleMapsService";

const params = {
  location: { lat: 50.5512631, lng: 9.6752945 },
  element: {}
};

const mockAPI = {
  Map: () => {},
  InfoWindow: () => {},
  places: {
    PlacesService: () => {}
  }
};

test("throw an error when the maps API could not be loaded", () => {
  expect(() => {
    new GoogleMapsService();
  }).toThrow("Google Maps API could not be loaded");
});

test("not throw when all required parameters are passed", () => {
  expect(() => {
    new GoogleMapsService(mockAPI, params);
  }).not.toThrow();
});
