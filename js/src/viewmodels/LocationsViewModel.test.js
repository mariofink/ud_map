window.ko = require("../../vendor/knockout-3.4.2");
import LocationsViewModel from "./LocationsViewModel";

const mockMapService = {
  addMarker: jest.fn(),
  removeMarker: jest.fn(),
  clickMarker: jest.fn()
};
const locations = [
  {
    name: "My favourite restaurant"
  },
  {
    name: "Shangri La"
  },
  {
    name: "Best Thai restaurant in town"
  }
];
let underTest = new LocationsViewModel(mockMapService);

test("throw an error when not initialised correctly", () => {
  expect(() => {
    new LocationsViewModel();
  }).toThrow("no mapservice passed");
});

test("showDetails", () => {
  underTest.showDetails({ marker: null });
  expect(mockMapService.clickMarker.mock.calls.length).toBe(1);
});

test("updateMap", () => {
  underTest.updateMap(locations, [locations[0]]);
  expect(mockMapService.removeMarker.mock.calls.length).toBe(locations.length);
  expect(mockMapService.addMarker.mock.calls.length).toBe(1);
});

test("getFilteredList", () => {
  expect(underTest.getFilteredList(locations, "thai").length).toBe(1);
  expect(underTest.getFilteredList(locations, "restaurant").length).toBe(2);
  expect(underTest.getFilteredList(locations, "pommesbude").length).toBe(0);
});
