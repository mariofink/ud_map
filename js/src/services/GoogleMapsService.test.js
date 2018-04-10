import GoogleMapsService from "./GoogleMapsService";

test("throw an error when Google Maps API script is not available", () => {
  expect(() => {
    new GoogleMapsService();
  }).toThrow("Google Maps API could not be loaded");
});
