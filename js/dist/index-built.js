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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.initMap = function () {
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanMvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL2pzL3NyYy9zZXJ2aWNlcy9tYXBzLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImluaXRNYXAiLCJteU1hcFNlcnZpY2UiLCJsb2NhdGlvbiIsImxhdCIsImxuZyIsImVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5pdCIsInRoZW4iLCJyZXF1ZXN0IiwiYm91bmRzIiwibWFwIiwiZ2V0Qm91bmRzIiwia2V5d29yZCIsInR5cGUiLCJwZXJmb3JtU2VhcmNoIiwiaSIsInJlc3VsdCIsInJlc3VsdHMiLCJhZGRNYXJrZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiY29uc29sZSIsImxvZyIsIk1hcFNlcnZpY2UiLCJvcHRpb25zIiwiZ29vZ2xlIiwibWFwcyIsIk1hcCIsImNlbnRlciIsInpvb20iLCJpbmZvV2luZG93IiwiSW5mb1dpbmRvdyIsInNlcnZpY2UiLCJwbGFjZXMiLCJQbGFjZXNTZXJ2aWNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJhZGRMaXN0ZW5lciIsIm5lYXJieVNlYXJjaCIsInN0YXR1cyIsIlBsYWNlc1NlcnZpY2VTdGF0dXMiLCJPSyIsImVycm9yIiwicGxhY2UiLCJtYXJrZXIiLCJNYXJrZXIiLCJwb3NpdGlvbiIsImdlb21ldHJ5IiwiZXZlbnQiLCJnZXREZXRhaWxzIiwic2V0Q29udGVudCIsIm5hbWUiLCJvcGVuIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFD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QixDQUFmOztBQUtBd0IsV0FBT0MsSUFBUCxDQUFZdUIsS0FBWixDQUFrQlgsV0FBbEIsQ0FBOEJPLE1BQTlCLEVBQXNDLE9BQXRDLEVBQStDLFlBQU07QUFDbkQsYUFBS2IsT0FBTCxDQUFha0IsVUFBYixDQUF3Qk4sS0FBeEIsRUFBK0IsVUFBQzNCLE1BQUQsRUFBU3VCLE1BQVQsRUFBb0I7QUFDakQsWUFBSUEsV0FBV2YsT0FBT0MsSUFBUCxDQUFZTyxNQUFaLENBQW1CUSxtQkFBbkIsQ0FBdUNDLEVBQXRELEVBQTBEO0FBQ3hEckIsa0JBQVFzQixLQUFSLENBQWNILE1BQWQ7QUFDQTtBQUNEO0FBQ0QsZUFBS1YsVUFBTCxDQUFnQnFCLFVBQWhCLENBQTJCbEMsT0FBT21DLElBQWxDO0FBQ0EsZUFBS3RCLFVBQUwsQ0FBZ0J1QixJQUFoQixDQUFxQixPQUFLMUMsR0FBMUIsRUFBK0JrQyxNQUEvQjtBQUNELE9BUEQ7QUFRRCxLQVREO0FBVUQsRzs7Ozs7a0JBL0NrQnRCLFUiLCJmaWxlIjoiaW5kZXgtYnVpbHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9qcy9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgTWFwU2VydmljZSBmcm9tIFwiLi9zZXJ2aWNlcy9tYXBzXCI7XG5cbndpbmRvdy5pbml0TWFwID0gKCkgPT4ge1xuICBjb25zdCBteU1hcFNlcnZpY2UgPSBuZXcgTWFwU2VydmljZSh7XG4gICAgbG9jYXRpb246IHsgbGF0OiA1MC41NTEyNjMxLCBsbmc6IDkuNjc1Mjk0NSB9LFxuICAgIGVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwXCIpXG4gIH0pO1xuICBteU1hcFNlcnZpY2UuaW5pdCgpLnRoZW4oKCkgPT4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSB7XG4gICAgICBib3VuZHM6IG15TWFwU2VydmljZS5tYXAuZ2V0Qm91bmRzKCksXG4gICAgICBrZXl3b3JkOiBcIlJlc3RhdXJhbnRcIixcbiAgICAgIHR5cGU6IFwicmVzdGF1cmFudFwiXG4gICAgfTtcbiAgICBteU1hcFNlcnZpY2UucGVyZm9ybVNlYXJjaChyZXF1ZXN0KS50aGVuKHJlc3VsdHMgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDAsIHJlc3VsdDsgKHJlc3VsdCA9IHJlc3VsdHNbaV0pOyBpKyspIHtcbiAgICAgICAgbXlNYXBTZXJ2aWNlLmFkZE1hcmtlcihyZXN1bHQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgY29uc29sZS5sb2coXCJIZWxsbyBCdWxtYSFcIik7XG59KTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKG9wdGlvbnMuZWxlbWVudCwge1xuICAgICAgY2VudGVyOiBvcHRpb25zLmxvY2F0aW9uLFxuICAgICAgem9vbTogMTVcbiAgICB9KTtcblxuICAgIHRoaXMuaW5mb1dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XG4gICAgdGhpcy5zZXJ2aWNlID0gbmV3IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlKHRoaXMubWFwKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIFRoZSBpZGxlIGV2ZW50IGlzIGEgZGVib3VuY2VkIGV2ZW50LCBzbyB3ZSBjYW4gcXVlcnkgJiBsaXN0ZW4gd2l0aG91dFxuICAgICAgLy8gdGhyb3dpbmcgdG9vIG1hbnkgcmVxdWVzdHMgYXQgdGhlIHNlcnZlci5cbiAgICAgIHRoaXMubWFwLmFkZExpc3RlbmVyKFwiaWRsZVwiLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgIH0pO1xuICB9XG5cbiAgcGVyZm9ybVNlYXJjaChyZXF1ZXN0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuc2VydmljZS5uZWFyYnlTZWFyY2gocmVxdWVzdCwgKHJlc3VsdHMsIHN0YXR1cykgPT4ge1xuICAgICAgICBpZiAoc3RhdHVzICE9PSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSykge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3Ioc3RhdHVzKTtcbiAgICAgICAgICByZWplY3Qoc3RhdHVzKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHJlc3VsdHMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRNYXJrZXIocGxhY2UpIHtcbiAgICBjb25zdCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgIG1hcDogdGhpcy5tYXAsXG4gICAgICBwb3NpdGlvbjogcGxhY2UuZ2VvbWV0cnkubG9jYXRpb25cbiAgICB9KTtcblxuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLnNlcnZpY2UuZ2V0RGV0YWlscyhwbGFjZSwgKHJlc3VsdCwgc3RhdHVzKSA9PiB7XG4gICAgICAgIGlmIChzdGF0dXMgIT09IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlU3RhdHVzLk9LKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihzdGF0dXMpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluZm9XaW5kb3cuc2V0Q29udGVudChyZXN1bHQubmFtZSk7XG4gICAgICAgIHRoaXMuaW5mb1dpbmRvdy5vcGVuKHRoaXMubWFwLCBtYXJrZXIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=