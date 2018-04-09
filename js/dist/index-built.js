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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _maps = __webpack_require__(/*! ./services/maps */ "./js/src/services/maps.js");

var _maps2 = _interopRequireDefault(_maps);

var _LocationsViewModel = __webpack_require__(/*! ./viewmodels/LocationsViewModel */ "./js/src/viewmodels/LocationsViewModel.js");

var _LocationsViewModel2 = _interopRequireDefault(_LocationsViewModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.initMap = function () {
  var locationsViewModel = new _LocationsViewModel2.default();
  var myMapService = new _maps2.default({
    location: { lat: 50.5512631, lng: 9.6752945 },
    element: document.getElementById("map")
  });
  myMapService.init().then(function () {
    var request = {
      bounds: myMapService.map.getBounds(),
      keyword: "Restaurant",
      type: "restaurant"
    };
    myMapService.performSearch(request).then(function (results) {
      locationsViewModel.setLocations(results);
      for (var i = 0, result; result = results[i]; i++) {
        myMapService.addMarker(result);
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", function () {
  console.log("Hello Bulma!");
});

/***/ }),

/***/ "./js/src/services/maps.js":
/*!*********************************!*\
  !*** ./js/src/services/maps.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapService = function () {
  function MapService(options) {
    _classCallCheck(this, MapService);

    this.map = new google.maps.Map(options.element, {
      center: options.location,
      zoom: 15
    });

    this.infoWindow = new google.maps.InfoWindow();
    this.service = new google.maps.places.PlacesService(this.map);
  }

  MapService.prototype.init = function init() {
    var _this = this;

    return new Promise(function (resolve, reject) {
      // The idle event is a debounced event, so we can query & listen without
      // throwing too many requests at the server.
      _this.map.addListener("idle", function () {
        return resolve();
      });
    });
  };

  MapService.prototype.performSearch = function performSearch(request) {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      _this2.service.nearbySearch(request, function (results, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          reject(status);
        }
        resolve(results);
      });
    });
  };

  MapService.prototype.addMarker = function addMarker(place) {
    var _this3 = this;

    var marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, "click", function () {
      _this3.service.getDetails(place, function (result, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }
        _this3.infoWindow.setContent(result.name);
        _this3.infoWindow.open(_this3.map, marker);
      });
    });
  };

  return MapService;
}();

exports.default = MapService;

/***/ }),

/***/ "./js/src/viewmodels/LocationsViewModel.js":
/*!*************************************************!*\
  !*** ./js/src/viewmodels/LocationsViewModel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocationsViewModel = function () {
  function LocationsViewModel() {
    _classCallCheck(this, LocationsViewModel);

    this.locations = ko.observable();
    this.init();
  }

  LocationsViewModel.prototype.setLocations = function setLocations(locations) {
    this.locations(locations);
  };

  LocationsViewModel.prototype.init = function init() {
    ko.applyBindings(this);
  };

  return LocationsViewModel;
}();

exports.default = LocationsViewModel;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanMvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL2pzL3NyYy9zZXJ2aWNlcy9tYXBzLmpzIiwid2VicGFjazovLy8uL2pzL3NyYy92aWV3bW9kZWxzL0xvY2F0aW9uc1ZpZXdNb2RlbC5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJpbml0TWFwIiwibG9jYXRpb25zVmlld01vZGVsIiwibXlNYXBTZXJ2aWNlIiwibG9jYXRpb24iLCJsYXQiLCJsbmciLCJlbGVtZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImluaXQiLCJ0aGVuIiwicmVxdWVzdCIsImJvdW5kcyIsIm1hcCIsImdldEJvdW5kcyIsImtleXdvcmQiLCJ0eXBlIiwicGVyZm9ybVNlYXJjaCIsInNldExvY2F0aW9ucyIsInJlc3VsdHMiLCJpIiwicmVzdWx0IiwiYWRkTWFya2VyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbnNvbGUiLCJsb2ciLCJNYXBTZXJ2aWNlIiwib3B0aW9ucyIsImdvb2dsZSIsIm1hcHMiLCJNYXAiLCJjZW50ZXIiLCJ6b29tIiwiaW5mb1dpbmRvdyIsIkluZm9XaW5kb3ciLCJzZXJ2aWNlIiwicGxhY2VzIiwiUGxhY2VzU2VydmljZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiYWRkTGlzdGVuZXIiLCJuZWFyYnlTZWFyY2giLCJzdGF0dXMiLCJQbGFjZXNTZXJ2aWNlU3RhdHVzIiwiT0siLCJlcnJvciIsInBsYWNlIiwibWFya2VyIiwiTWFya2VyIiwicG9zaXRpb24iLCJnZW9tZXRyeSIsImV2ZW50IiwiZ2V0RGV0YWlscyIsInNldENvbnRlbnQiLCJuYW1lIiwib3BlbiIsIkxvY2F0aW9uc1ZpZXdNb2RlbCIsImxvY2F0aW9ucyIsImtvIiwib2JzZXJ2YWJsZSIsImFwcGx5QmluZGluZ3MiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNuRUE7Ozs7QUFDQTs7Ozs7O0FBRUFBLE9BQU9DLE9BQVAsR0FBaUIsWUFBTTtBQUNyQixNQUFNQyxxQkFBcUIsa0NBQTNCO0FBQ0EsTUFBTUMsZUFBZSxtQkFBZTtBQUNsQ0MsY0FBVSxFQUFFQyxLQUFLLFVBQVAsRUFBbUJDLEtBQUssU0FBeEIsRUFEd0I7QUFFbENDLGFBQVNDLFNBQVNDLGNBQVQsQ0FBd0IsS0FBeEI7QUFGeUIsR0FBZixDQUFyQjtBQUlBTixlQUFhTyxJQUFiLEdBQW9CQyxJQUFwQixDQUF5QixZQUFNO0FBQzdCLFFBQU1DLFVBQVU7QUFDZEMsY0FBUVYsYUFBYVcsR0FBYixDQUFpQkMsU0FBakIsRUFETTtBQUVkQyxlQUFTLFlBRks7QUFHZEMsWUFBTTtBQUhRLEtBQWhCO0FBS0FkLGlCQUFhZSxhQUFiLENBQTJCTixPQUEzQixFQUFvQ0QsSUFBcEMsQ0FBeUMsbUJBQVc7QUFDbERULHlCQUFtQmlCLFlBQW5CLENBQWdDQyxPQUFoQztBQUNBLFdBQUssSUFBSUMsSUFBSSxDQUFSLEVBQVdDLE1BQWhCLEVBQXlCQSxTQUFTRixRQUFRQyxDQUFSLENBQWxDLEVBQStDQSxHQUEvQyxFQUFvRDtBQUNsRGxCLHFCQUFhb0IsU0FBYixDQUF1QkQsTUFBdkI7QUFDRDtBQUNGLEtBTEQ7QUFNRCxHQVpEO0FBYUQsQ0FuQkQ7O0FBcUJBZCxTQUFTZ0IsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDbERDLFVBQVFDLEdBQVIsQ0FBWSxjQUFaO0FBQ0QsQ0FGRCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ3hCcUJDLFU7QUFDbkIsc0JBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDbkIsU0FBS2QsR0FBTCxHQUFXLElBQUllLE9BQU9DLElBQVAsQ0FBWUMsR0FBaEIsQ0FBb0JILFFBQVFyQixPQUE1QixFQUFxQztBQUM5Q3lCLGNBQVFKLFFBQVF4QixRQUQ4QjtBQUU5QzZCLFlBQU07QUFGd0MsS0FBckMsQ0FBWDs7QUFLQSxTQUFLQyxVQUFMLEdBQWtCLElBQUlMLE9BQU9DLElBQVAsQ0FBWUssVUFBaEIsRUFBbEI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsSUFBSVAsT0FBT0MsSUFBUCxDQUFZTyxNQUFaLENBQW1CQyxhQUF2QixDQUFxQyxLQUFLeEIsR0FBMUMsQ0FBZjtBQUNEOzt1QkFFREosSSxtQkFBTztBQUFBOztBQUNMLFdBQU8sSUFBSTZCLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEM7QUFDQTtBQUNBLFlBQUszQixHQUFMLENBQVM0QixXQUFULENBQXFCLE1BQXJCLEVBQTZCO0FBQUEsZUFBTUYsU0FBTjtBQUFBLE9BQTdCO0FBQ0QsS0FKTSxDQUFQO0FBS0QsRzs7dUJBRUR0QixhLDBCQUFjTixPLEVBQVM7QUFBQTs7QUFDckIsV0FBTyxJQUFJMkIsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxhQUFLTCxPQUFMLENBQWFPLFlBQWIsQ0FBMEIvQixPQUExQixFQUFtQyxVQUFDUSxPQUFELEVBQVV3QixNQUFWLEVBQXFCO0FBQ3RELFlBQUlBLFdBQVdmLE9BQU9DLElBQVAsQ0FBWU8sTUFBWixDQUFtQlEsbUJBQW5CLENBQXVDQyxFQUF0RCxFQUEwRDtBQUN4RHJCLGtCQUFRc0IsS0FBUixDQUFjSCxNQUFkO0FBQ0FILGlCQUFPRyxNQUFQO0FBQ0Q7QUFDREosZ0JBQVFwQixPQUFSO0FBQ0QsT0FORDtBQU9ELEtBUk0sQ0FBUDtBQVNELEc7O3VCQUVERyxTLHNCQUFVeUIsSyxFQUFPO0FBQUE7O0FBQ2YsUUFBTUMsU0FBUyxJQUFJcEIsT0FBT0MsSUFBUCxDQUFZb0IsTUFBaEIsQ0FBdUI7QUFDcENwQyxXQUFLLEtBQUtBLEdBRDBCO0FBRXBDcUMsZ0JBQVVILE1BQU1JLFFBQU4sQ0FBZWhEO0FBRlcsS0FBdkIsQ0FBZjs7QUFLQXlCLFdBQU9DLElBQVAsQ0FBWXVCLEtBQVosQ0FBa0JYLFdBQWxCLENBQThCTyxNQUE5QixFQUFzQyxPQUF0QyxFQUErQyxZQUFNO0FBQ25ELGFBQUtiLE9BQUwsQ0FBYWtCLFVBQWIsQ0FBd0JOLEtBQXhCLEVBQStCLFVBQUMxQixNQUFELEVBQVNzQixNQUFULEVBQW9CO0FBQ2pELFlBQUlBLFdBQVdmLE9BQU9DLElBQVAsQ0FBWU8sTUFBWixDQUFtQlEsbUJBQW5CLENBQXVDQyxFQUF0RCxFQUEwRDtBQUN4RHJCLGtCQUFRc0IsS0FBUixDQUFjSCxNQUFkO0FBQ0E7QUFDRDtBQUNELGVBQUtWLFVBQUwsQ0FBZ0JxQixVQUFoQixDQUEyQmpDLE9BQU9rQyxJQUFsQztBQUNBLGVBQUt0QixVQUFMLENBQWdCdUIsSUFBaEIsQ0FBcUIsT0FBSzNDLEdBQTFCLEVBQStCbUMsTUFBL0I7QUFDRCxPQVBEO0FBUUQsS0FURDtBQVVELEc7Ozs7O2tCQS9Da0J0QixVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0FBK0Isa0I7QUFDbkIsZ0NBQWM7QUFBQTs7QUFDWixTQUFLQyxTQUFMLEdBQWlCQyxHQUFHQyxVQUFILEVBQWpCO0FBQ0EsU0FBS25ELElBQUw7QUFDRDs7K0JBQ0RTLFkseUJBQWF3QyxTLEVBQVc7QUFDdEIsU0FBS0EsU0FBTCxDQUFlQSxTQUFmO0FBQ0QsRzs7K0JBQ0RqRCxJLG1CQUFPO0FBQ0xrRCxPQUFHRSxhQUFILENBQWlCLElBQWpCO0FBQ0QsRzs7Ozs7a0JBVmtCSixrQiIsImZpbGUiOiJpbmRleC1idWlsdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2pzL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBNYXBTZXJ2aWNlIGZyb20gXCIuL3NlcnZpY2VzL21hcHNcIjtcbmltcG9ydCBMb2NhdGlvbnNWaWV3TW9kZWwgZnJvbSBcIi4vdmlld21vZGVscy9Mb2NhdGlvbnNWaWV3TW9kZWxcIjtcblxud2luZG93LmluaXRNYXAgPSAoKSA9PiB7XG4gIGNvbnN0IGxvY2F0aW9uc1ZpZXdNb2RlbCA9IG5ldyBMb2NhdGlvbnNWaWV3TW9kZWwoKTtcbiAgY29uc3QgbXlNYXBTZXJ2aWNlID0gbmV3IE1hcFNlcnZpY2Uoe1xuICAgIGxvY2F0aW9uOiB7IGxhdDogNTAuNTUxMjYzMSwgbG5nOiA5LjY3NTI5NDUgfSxcbiAgICBlbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcFwiKVxuICB9KTtcbiAgbXlNYXBTZXJ2aWNlLmluaXQoKS50aGVuKCgpID0+IHtcbiAgICBjb25zdCByZXF1ZXN0ID0ge1xuICAgICAgYm91bmRzOiBteU1hcFNlcnZpY2UubWFwLmdldEJvdW5kcygpLFxuICAgICAga2V5d29yZDogXCJSZXN0YXVyYW50XCIsXG4gICAgICB0eXBlOiBcInJlc3RhdXJhbnRcIlxuICAgIH07XG4gICAgbXlNYXBTZXJ2aWNlLnBlcmZvcm1TZWFyY2gocmVxdWVzdCkudGhlbihyZXN1bHRzID0+IHtcbiAgICAgIGxvY2F0aW9uc1ZpZXdNb2RlbC5zZXRMb2NhdGlvbnMocmVzdWx0cyk7XG4gICAgICBmb3IgKGxldCBpID0gMCwgcmVzdWx0OyAocmVzdWx0ID0gcmVzdWx0c1tpXSk7IGkrKykge1xuICAgICAgICBteU1hcFNlcnZpY2UuYWRkTWFya2VyKHJlc3VsdCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhcIkhlbGxvIEJ1bG1hIVwiKTtcbn0pO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAob3B0aW9ucy5lbGVtZW50LCB7XG4gICAgICBjZW50ZXI6IG9wdGlvbnMubG9jYXRpb24sXG4gICAgICB6b29tOiAxNVxuICAgIH0pO1xuXG4gICAgdGhpcy5pbmZvV2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcbiAgICB0aGlzLnNlcnZpY2UgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2UodGhpcy5tYXApO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gVGhlIGlkbGUgZXZlbnQgaXMgYSBkZWJvdW5jZWQgZXZlbnQsIHNvIHdlIGNhbiBxdWVyeSAmIGxpc3RlbiB3aXRob3V0XG4gICAgICAvLyB0aHJvd2luZyB0b28gbWFueSByZXF1ZXN0cyBhdCB0aGUgc2VydmVyLlxuICAgICAgdGhpcy5tYXAuYWRkTGlzdGVuZXIoXCJpZGxlXCIsICgpID0+IHJlc29sdmUoKSk7XG4gICAgfSk7XG4gIH1cblxuICBwZXJmb3JtU2VhcmNoKHJlcXVlc3QpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5zZXJ2aWNlLm5lYXJieVNlYXJjaChyZXF1ZXN0LCAocmVzdWx0cywgc3RhdHVzKSA9PiB7XG4gICAgICAgIGlmIChzdGF0dXMgIT09IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlU3RhdHVzLk9LKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihzdGF0dXMpO1xuICAgICAgICAgIHJlamVjdChzdGF0dXMpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUocmVzdWx0cyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZE1hcmtlcihwbGFjZSkge1xuICAgIGNvbnN0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgbWFwOiB0aGlzLm1hcCxcbiAgICAgIHBvc2l0aW9uOiBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvblxuICAgIH0pO1xuXG4gICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCBcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuc2VydmljZS5nZXREZXRhaWxzKHBsYWNlLCAocmVzdWx0LCBzdGF0dXMpID0+IHtcbiAgICAgICAgaWYgKHN0YXR1cyAhPT0gZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2VTdGF0dXMuT0spIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKHN0YXR1cyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5mb1dpbmRvdy5zZXRDb250ZW50KHJlc3VsdC5uYW1lKTtcbiAgICAgICAgdGhpcy5pbmZvV2luZG93Lm9wZW4odGhpcy5tYXAsIG1hcmtlcik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9jYXRpb25zVmlld01vZGVsIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5sb2NhdGlvbnMgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cbiAgc2V0TG9jYXRpb25zKGxvY2F0aW9ucykge1xuICAgIHRoaXMubG9jYXRpb25zKGxvY2F0aW9ucyk7XG4gIH1cbiAgaW5pdCgpIHtcbiAgICBrby5hcHBseUJpbmRpbmdzKHRoaXMpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9