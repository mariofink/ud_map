/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/src/index.js":
/*!*************************!*\
  !*** ./js/src/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_maps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/maps */ "./js/src/services/maps.js");


window.initMap = () => {
  const myMapService = new _services_maps__WEBPACK_IMPORTED_MODULE_0__["default"]({
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


/***/ }),

/***/ "./js/src/services/maps.js":
/*!*********************************!*\
  !*** ./js/src/services/maps.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MapService; });
var map;
var infoWindow;
var service;
var geocoder;

class MapService {
  constructor(options) {
    this.map = new google.maps.Map(options.element, {
      center: options.location,
      zoom: 15
    });

    this.infoWindow = new google.maps.InfoWindow();
    this.service = new google.maps.places.PlacesService(this.map);
  }

  init() {
    return new Promise((resolve, reject) => {
      // The idle event is a debounced event, so we can query & listen without
      // throwing too many requests at the server.
      this.map.addListener("idle", () => resolve());
    });
  }

  performSearch(request) {
    return new Promise((resolve, reject) => {
      this.service.nearbySearch(request, (results, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          reject(status);
        }
        resolve(results);
      });
    });
  }

  addMarker(place) {
    var marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, "click", () => {
      this.service.getDetails(place, (result, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }
        this.infoWindow.setContent(result.name);
        this.infoWindow.open(this.map, marker);
      });
    });
  }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanMvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL2pzL3NyYy9zZXJ2aWNlcy9tYXBzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNuRUE7O0FBRUE7QUFDQTtBQUNBLGVBQWUsa0NBQWtDO0FBQ2pEO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHVCQUF1QjtBQUNwRDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUN2QkQ7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQSIsImZpbGUiOiJpbmRleC1idWlsdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2pzL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBNYXBTZXJ2aWNlIGZyb20gXCIuL3NlcnZpY2VzL21hcHNcIjtcblxud2luZG93LmluaXRNYXAgPSAoKSA9PiB7XG4gIGNvbnN0IG15TWFwU2VydmljZSA9IG5ldyBNYXBTZXJ2aWNlKHtcbiAgICBsb2NhdGlvbjogeyBsYXQ6IDUwLjU1MTI2MzEsIGxuZzogOS42NzUyOTQ1IH0sXG4gICAgZWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBcIilcbiAgfSk7XG4gIG15TWFwU2VydmljZS5pbml0KCkudGhlbigoKSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IHtcbiAgICAgIGJvdW5kczogbXlNYXBTZXJ2aWNlLm1hcC5nZXRCb3VuZHMoKSxcbiAgICAgIGtleXdvcmQ6IFwiUmVzdGF1cmFudFwiLFxuICAgICAgdHlwZTogXCJyZXN0YXVyYW50XCJcbiAgICB9O1xuICAgIG15TWFwU2VydmljZS5wZXJmb3JtU2VhcmNoKHJlcXVlc3QpLnRoZW4ocmVzdWx0cyA9PiB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgcmVzdWx0OyAocmVzdWx0ID0gcmVzdWx0c1tpXSk7IGkrKykge1xuICAgICAgICBteU1hcFNlcnZpY2UuYWRkTWFya2VyKHJlc3VsdCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhcIkhlbGxvIEJ1bG1hIVwiKTtcbn0pO1xuIiwidmFyIG1hcDtcbnZhciBpbmZvV2luZG93O1xudmFyIHNlcnZpY2U7XG52YXIgZ2VvY29kZXI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKG9wdGlvbnMuZWxlbWVudCwge1xuICAgICAgY2VudGVyOiBvcHRpb25zLmxvY2F0aW9uLFxuICAgICAgem9vbTogMTVcbiAgICB9KTtcblxuICAgIHRoaXMuaW5mb1dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XG4gICAgdGhpcy5zZXJ2aWNlID0gbmV3IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlKHRoaXMubWFwKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIFRoZSBpZGxlIGV2ZW50IGlzIGEgZGVib3VuY2VkIGV2ZW50LCBzbyB3ZSBjYW4gcXVlcnkgJiBsaXN0ZW4gd2l0aG91dFxuICAgICAgLy8gdGhyb3dpbmcgdG9vIG1hbnkgcmVxdWVzdHMgYXQgdGhlIHNlcnZlci5cbiAgICAgIHRoaXMubWFwLmFkZExpc3RlbmVyKFwiaWRsZVwiLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgIH0pO1xuICB9XG5cbiAgcGVyZm9ybVNlYXJjaChyZXF1ZXN0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuc2VydmljZS5uZWFyYnlTZWFyY2gocmVxdWVzdCwgKHJlc3VsdHMsIHN0YXR1cykgPT4ge1xuICAgICAgICBpZiAoc3RhdHVzICE9PSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSykge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3Ioc3RhdHVzKTtcbiAgICAgICAgICByZWplY3Qoc3RhdHVzKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHJlc3VsdHMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRNYXJrZXIocGxhY2UpIHtcbiAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICBtYXA6IHRoaXMubWFwLFxuICAgICAgcG9zaXRpb246IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uXG4gICAgfSk7XG5cbiAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsIFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5zZXJ2aWNlLmdldERldGFpbHMocGxhY2UsIChyZXN1bHQsIHN0YXR1cykgPT4ge1xuICAgICAgICBpZiAoc3RhdHVzICE9PSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSykge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3Ioc3RhdHVzKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbmZvV2luZG93LnNldENvbnRlbnQocmVzdWx0Lm5hbWUpO1xuICAgICAgICB0aGlzLmluZm9XaW5kb3cub3Blbih0aGlzLm1hcCwgbWFya2VyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9