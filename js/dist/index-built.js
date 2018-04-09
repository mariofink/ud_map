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

    place.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location
    });

    place.marker.addListener("click", function () {
      _this3.animateMarker(place.marker);
      _this3.service.getDetails(place, function (result, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }
        _this3.infoWindow.setContent(result.name);
        _this3.infoWindow.open(_this3.map, place.marker);
      });
    });
  };

  MapService.prototype.animateMarker = function animateMarker(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    window.setTimeout(function () {
      marker.setAnimation(null);
    }, 2000);
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

  LocationsViewModel.prototype.showDetails = function showDetails(location) {
    try {
      google.maps.event.trigger(location.marker, "click");
    } catch (error) {
      console.error("Error when trying to trigger Google Maps Event", error);
    }
  };

  LocationsViewModel.prototype.init = function init() {
    ko.applyBindings(this);
  };

  return LocationsViewModel;
}();

exports.default = LocationsViewModel;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanMvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL2pzL3NyYy9zZXJ2aWNlcy9tYXBzLmpzIiwid2VicGFjazovLy8uL2pzL3NyYy92aWV3bW9kZWxzL0xvY2F0aW9uc1ZpZXdNb2RlbC5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJpbml0TWFwIiwibG9jYXRpb25zVmlld01vZGVsIiwibXlNYXBTZXJ2aWNlIiwibG9jYXRpb24iLCJsYXQiLCJsbmciLCJlbGVtZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImluaXQiLCJ0aGVuIiwicmVxdWVzdCIsImJvdW5kcyIsIm1hcCIsImdldEJvdW5kcyIsImtleXdvcmQiLCJ0eXBlIiwicGVyZm9ybVNlYXJjaCIsInNldExvY2F0aW9ucyIsInJlc3VsdHMiLCJpIiwicmVzdWx0IiwiYWRkTWFya2VyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbnNvbGUiLCJsb2ciLCJNYXBTZXJ2aWNlIiwib3B0aW9ucyIsImdvb2dsZSIsIm1hcHMiLCJNYXAiLCJjZW50ZXIiLCJ6b29tIiwiaW5mb1dpbmRvdyIsIkluZm9XaW5kb3ciLCJzZXJ2aWNlIiwicGxhY2VzIiwiUGxhY2VzU2VydmljZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiYWRkTGlzdGVuZXIiLCJuZWFyYnlTZWFyY2giLCJzdGF0dXMiLCJQbGFjZXNTZXJ2aWNlU3RhdHVzIiwiT0siLCJlcnJvciIsInBsYWNlIiwibWFya2VyIiwiTWFya2VyIiwiYW5pbWF0aW9uIiwiQW5pbWF0aW9uIiwiRFJPUCIsInBvc2l0aW9uIiwiZ2VvbWV0cnkiLCJhbmltYXRlTWFya2VyIiwiZ2V0RGV0YWlscyIsInNldENvbnRlbnQiLCJuYW1lIiwib3BlbiIsInNldEFuaW1hdGlvbiIsIkJPVU5DRSIsInNldFRpbWVvdXQiLCJMb2NhdGlvbnNWaWV3TW9kZWwiLCJsb2NhdGlvbnMiLCJrbyIsIm9ic2VydmFibGUiLCJzaG93RGV0YWlscyIsImV2ZW50IiwidHJpZ2dlciIsImFwcGx5QmluZGluZ3MiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNuRUE7Ozs7QUFDQTs7Ozs7O0FBRUFBLE9BQU9DLE9BQVAsR0FBaUIsWUFBTTtBQUNyQixNQUFNQyxxQkFBcUIsa0NBQTNCO0FBQ0EsTUFBTUMsZUFBZSxtQkFBZTtBQUNsQ0MsY0FBVSxFQUFFQyxLQUFLLFVBQVAsRUFBbUJDLEtBQUssU0FBeEIsRUFEd0I7QUFFbENDLGFBQVNDLFNBQVNDLGNBQVQsQ0FBd0IsS0FBeEI7QUFGeUIsR0FBZixDQUFyQjtBQUlBTixlQUFhTyxJQUFiLEdBQW9CQyxJQUFwQixDQUF5QixZQUFNO0FBQzdCLFFBQU1DLFVBQVU7QUFDZEMsY0FBUVYsYUFBYVcsR0FBYixDQUFpQkMsU0FBakIsRUFETTtBQUVkQyxlQUFTLFlBRks7QUFHZEMsWUFBTTtBQUhRLEtBQWhCO0FBS0FkLGlCQUFhZSxhQUFiLENBQTJCTixPQUEzQixFQUFvQ0QsSUFBcEMsQ0FBeUMsbUJBQVc7QUFDbERULHlCQUFtQmlCLFlBQW5CLENBQWdDQyxPQUFoQztBQUNBLFdBQUssSUFBSUMsSUFBSSxDQUFSLEVB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QUFzQlUsTUFBMUM7QUFDQTlELFdBQU8rRCxVQUFQLENBQWtCLFlBQU07QUFDdEJkLGFBQU9ZLFlBQVAsQ0FBb0IsSUFBcEI7QUFDRCxLQUZELEVBRUcsSUFGSDtBQUdELEc7Ozs7O2tCQXhEa0JsQyxVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0FBcUMsa0I7QUFDbkIsZ0NBQWM7QUFBQTs7QUFDWixTQUFLQyxTQUFMLEdBQWlCQyxHQUFHQyxVQUFILEVBQWpCO0FBQ0EsU0FBS3pELElBQUw7QUFDRDs7K0JBQ0RTLFkseUJBQWE4QyxTLEVBQVc7QUFDdEIsU0FBS0EsU0FBTCxDQUFlQSxTQUFmO0FBQ0QsRzs7K0JBQ0RHLFcsd0JBQVloRSxRLEVBQVU7QUFDcEIsUUFBSTtBQUNGeUIsYUFBT0MsSUFBUCxDQUFZdUMsS0FBWixDQUFrQkMsT0FBbEIsQ0FBMEJsRSxTQUFTNkMsTUFBbkMsRUFBMkMsT0FBM0M7QUFDRCxLQUZELENBRUUsT0FBT0YsS0FBUCxFQUFjO0FBQ2R0QixjQUFRc0IsS0FBUixDQUFjLGdEQUFkLEVBQWdFQSxLQUFoRTtBQUNEO0FBQ0YsRzs7K0JBQ0RyQyxJLG1CQUFPO0FBQ0x3RCxPQUFHSyxhQUFILENBQWlCLElBQWpCO0FBQ0QsRzs7Ozs7a0JBakJrQlAsa0IiLCJmaWxlIjoiaW5kZXgtYnVpbHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9qcy9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgTWFwU2VydmljZSBmcm9tIFwiLi9zZXJ2aWNlcy9tYXBzXCI7XG5pbXBvcnQgTG9jYXRpb25zVmlld01vZGVsIGZyb20gXCIuL3ZpZXdtb2RlbHMvTG9jYXRpb25zVmlld01vZGVsXCI7XG5cbndpbmRvdy5pbml0TWFwID0gKCkgPT4ge1xuICBjb25zdCBsb2NhdGlvbnNWaWV3TW9kZWwgPSBuZXcgTG9jYXRpb25zVmlld01vZGVsKCk7XG4gIGNvbnN0IG15TWFwU2VydmljZSA9IG5ldyBNYXBTZXJ2aWNlKHtcbiAgICBsb2NhdGlvbjogeyBsYXQ6IDUwLjU1MTI2MzEsIGxuZzogOS42NzUyOTQ1IH0sXG4gICAgZWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBcIilcbiAgfSk7XG4gIG15TWFwU2VydmljZS5pbml0KCkudGhlbigoKSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IHtcbiAgICAgIGJvdW5kczogbXlNYXBTZXJ2aWNlLm1hcC5nZXRCb3VuZHMoKSxcbiAgICAgIGtleXdvcmQ6IFwiUmVzdGF1cmFudFwiLFxuICAgICAgdHlwZTogXCJyZXN0YXVyYW50XCJcbiAgICB9O1xuICAgIG15TWFwU2VydmljZS5wZXJmb3JtU2VhcmNoKHJlcXVlc3QpLnRoZW4ocmVzdWx0cyA9PiB7XG4gICAgICBsb2NhdGlvbnNWaWV3TW9kZWwuc2V0TG9jYXRpb25zKHJlc3VsdHMpO1xuICAgICAgZm9yIChsZXQgaSA9IDAsIHJlc3VsdDsgKHJlc3VsdCA9IHJlc3VsdHNbaV0pOyBpKyspIHtcbiAgICAgICAgbXlNYXBTZXJ2aWNlLmFkZE1hcmtlcihyZXN1bHQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgY29uc29sZS5sb2coXCJIZWxsbyBCdWxtYSFcIik7XG59KTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKG9wdGlvbnMuZWxlbWVudCwge1xuICAgICAgY2VudGVyOiBvcHRpb25zLmxvY2F0aW9uLFxuICAgICAgem9vbTogMTVcbiAgICB9KTtcblxuICAgIHRoaXMuaW5mb1dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XG4gICAgdGhpcy5zZXJ2aWNlID0gbmV3IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlKHRoaXMubWFwKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIFRoZSBpZGxlIGV2ZW50IGlzIGEgZGVib3VuY2VkIGV2ZW50LCBzbyB3ZSBjYW4gcXVlcnkgJiBsaXN0ZW4gd2l0aG91dFxuICAgICAgLy8gdGhyb3dpbmcgdG9vIG1hbnkgcmVxdWVzdHMgYXQgdGhlIHNlcnZlci5cbiAgICAgIHRoaXMubWFwLmFkZExpc3RlbmVyKFwiaWRsZVwiLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgIH0pO1xuICB9XG5cbiAgcGVyZm9ybVNlYXJjaChyZXF1ZXN0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuc2VydmljZS5uZWFyYnlTZWFyY2gocmVxdWVzdCwgKHJlc3VsdHMsIHN0YXR1cykgPT4ge1xuICAgICAgICBpZiAoc3RhdHVzICE9PSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSykge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3Ioc3RhdHVzKTtcbiAgICAgICAgICByZWplY3Qoc3RhdHVzKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHJlc3VsdHMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRNYXJrZXIocGxhY2UpIHtcbiAgICBwbGFjZS5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgIG1hcDogdGhpcy5tYXAsXG4gICAgICBhbmltYXRpb246IGdvb2dsZS5tYXBzLkFuaW1hdGlvbi5EUk9QLFxuICAgICAgcG9zaXRpb246IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uXG4gICAgfSk7XG5cbiAgICBwbGFjZS5tYXJrZXIuYWRkTGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLmFuaW1hdGVNYXJrZXIocGxhY2UubWFya2VyKTtcbiAgICAgIHRoaXMuc2VydmljZS5nZXREZXRhaWxzKHBsYWNlLCAocmVzdWx0LCBzdGF0dXMpID0+IHtcbiAgICAgICAgaWYgKHN0YXR1cyAhPT0gZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2VTdGF0dXMuT0spIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKHN0YXR1cyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5mb1dpbmRvdy5zZXRDb250ZW50KHJlc3VsdC5uYW1lKTtcbiAgICAgICAgdGhpcy5pbmZvV2luZG93Lm9wZW4odGhpcy5tYXAsIHBsYWNlLm1hcmtlcik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFuaW1hdGVNYXJrZXIobWFya2VyKSB7XG4gICAgbWFya2VyLnNldEFuaW1hdGlvbihnb29nbGUubWFwcy5BbmltYXRpb24uQk9VTkNFKTtcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBtYXJrZXIuc2V0QW5pbWF0aW9uKG51bGwpO1xuICAgIH0sIDIwMDApO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2NhdGlvbnNWaWV3TW9kZWwge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxvY2F0aW9ucyA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuICBzZXRMb2NhdGlvbnMobG9jYXRpb25zKSB7XG4gICAgdGhpcy5sb2NhdGlvbnMobG9jYXRpb25zKTtcbiAgfVxuICBzaG93RGV0YWlscyhsb2NhdGlvbikge1xuICAgIHRyeSB7XG4gICAgICBnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKGxvY2F0aW9uLm1hcmtlciwgXCJjbGlja1wiKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHdoZW4gdHJ5aW5nIHRvIHRyaWdnZXIgR29vZ2xlIE1hcHMgRXZlbnRcIiwgZXJyb3IpO1xuICAgIH1cbiAgfVxuICBpbml0KCkge1xuICAgIGtvLmFwcGx5QmluZGluZ3ModGhpcyk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=