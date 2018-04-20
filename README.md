# Udacity NanoDegree Neighbourhood Map project

This web application loads a Google Maps view showing downtown Fulda. It then queries the Maps API for a list of restaurants. This list then gets loaded into the left sidebar list view and each location gets marked on the map.

## Knockout.js

One of the project requirements was to implement the functionality with the help of the [Knockout](http://knockoutjs.com/) framework. All Knockout-related code can be found in the LocationsViewModel.js file.

## API calls

The application uses two APIs through two service classes:

* Google Maps API (see GoogleMapsService.js)
* Foursquare API (see FoursquareService.js)

## Running the application

As required by the project outline, all JavaScript and CSS files come pre-built with this repository. To run, execute the start task like so:

    npm install
    npm start

You can then access it at http://127.0.0.1:8080/

## Building the application

You can build both JavaScript and CSS files by running

    npm run deploy
