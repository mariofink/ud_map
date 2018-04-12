import GoogleMapsService from "./GoogleMapsService";

const params = {
  location: { lat: 50.5512631, lng: 9.6752945 },
  element: {}
};

const addListenerSpy = jest.fn();
const mockAPI = function() {
  return {
    Map: jest.fn(),
    InfoWindow: jest.fn(),
    places: {
      PlacesService: jest.fn()
    },
    Marker: function() {
      return {
        addListener: addListenerSpy
      };
    },
    Animation: {
      DROP: "fakestring"
    }
  };
};

let underTest;
let mockAPIInstance;

beforeEach(() => {
  mockAPIInstance = new mockAPI();
  underTest = new GoogleMapsService(mockAPIInstance, params);
});

test("throw an error when the maps API could not be loaded", () => {
  expect(() => {
    new GoogleMapsService();
  }).toThrow("Google Maps API could not be loaded");
});

test("maps service constructor should instantiate Map, InfoWindow and PlacesService", () => {
  expect(mockAPIInstance.Map.mock.calls.length).toBe(1);
  expect(mockAPIInstance.InfoWindow.mock.calls.length).toBe(1);
  expect(mockAPIInstance.places.PlacesService.mock.calls.length).toBe(1);
});

test("performSearch returns a Promise", () => {
  expect(typeof underTest.performSearch().then).toBe("function");
});

test("addMarker should create a marker and set up an event listener", () => {
  const result = underTest.addMarker({
    geometry: {
      location: ""
    }
  });
  expect(addListenerSpy.mock.calls.length).toBe(1);
});
