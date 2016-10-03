define(["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.debug = debug;
	exports.monadic = monadic;
	exports.mapify = mapify;
	exports.demapify = demapify;

	var _slicedToArray = function () {
		function sliceIterator(arr, i) {
			var _arr = [];
			var _n = true;
			var _d = false;
			var _e = undefined;

			try {
				for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
					_arr.push(_s.value);

					if (i && _arr.length === i) break;
				}
			} catch (err) {
				_d = true;
				_e = err;
			} finally {
				try {
					if (!_n && _i["return"]) _i["return"]();
				} finally {
					if (_d) throw _e;
				}
			}

			return _arr;
		}

		return function (arr, i) {
			if (Array.isArray(arr)) {
				return arr;
			} else if (Symbol.iterator in Object(arr)) {
				return sliceIterator(arr, i);
			} else {
				throw new TypeError("Invalid attempt to destructure non-iterable instance");
			}
		};
	}();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	var DEBUGGING_ENABLED = false;

	function debug() {
		if (DEBUGGING_ENABLED) {
			var _console;

			(_console = console).debug.apply(_console, arguments);
		}
	}

	function monadic(target, name, descriptor) {
		var realfunc = descriptor.value;
		descriptor.value = function () {
			debug("Cloning for monadic method " + name);
			var dup = this.clone();
			debug("  cloned: %o... applying method", dup);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			realfunc.apply(dup, args);
			return dup;
		};

		return descriptor;
	}

	function mapify(obj) {
		if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== 'object' || obj === null || obj instanceof Map) {
			return obj;
		}

		if (obj instanceof Array) {
			return obj.map(function (x) {
				return mapify(x);
			});
		} else {
			var _ret = function () {
				var m = new Map();
				Object.keys(obj).forEach(function (k) {
					m.set(k, mapify(obj[k]));
				});
				return {
					v: m
				};
			}();

			if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
		}
	}

	function demapify(obj) {
		if (obj instanceof Array) {
			debug("Demapifying an Array of Maps.");
			return obj.map(function (x) {
				return demapify(x);
			});
		} else if (!(obj instanceof Map)) {
			debug("Not a Map, returning it as-is.");
			return obj;
		}

		debug("Turning a Map into an Object.");
		var rval = {};
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = obj[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var _step$value = _slicedToArray(_step.value, 2);

				var k = _step$value[0];
				var v = _step$value[1];

				rval[k] = demapify(v);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return rval;
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbImRlYnVnIiwibW9uYWRpYyIsIm1hcGlmeSIsImRlbWFwaWZ5IiwiREVCVUdHSU5HX0VOQUJMRUQiLCJ0YXJnZXQiLCJuYW1lIiwiZGVzY3JpcHRvciIsInJlYWxmdW5jIiwidmFsdWUiLCJkdXAiLCJjbG9uZSIsImFyZ3MiLCJhcHBseSIsIm9iaiIsIk1hcCIsIkFycmF5IiwibWFwIiwieCIsIm0iLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInNldCIsImsiLCJydmFsIiwidiJdLCJtYXBwaW5ncyI6IjtBQUNBOzs7OztTQVFnQkEsSyxHQUFBQSxLO1NBYUFDLE8sR0FBQUEsTztTQWlDQUMsTSxHQUFBQSxNO1NBNkJBQyxRLEdBQUFBLFE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFqRmhCLEtBQU1DLG9CQUFvQixLQUExQjs7QUFNTyxVQUFTSixLQUFULEdBQTBCO0FBQ2hDLE1BQUtJLGlCQUFMLEVBQXlCO0FBQUE7O0FBQ3hCLHdCQUFRSixLQUFSO0FBQ0E7QUFDRDs7QUFTTSxVQUFTQyxPQUFULENBQWtCSSxNQUFsQixFQUEwQkMsSUFBMUIsRUFBZ0NDLFVBQWhDLEVBQTZDO0FBQ25ELE1BQUlDLFdBQVdELFdBQVdFLEtBQTFCO0FBQ0FGLGFBQVdFLEtBQVgsR0FBbUIsWUFBb0I7QUFDdENULHlDQUFxQ00sSUFBckM7QUFDQSxPQUFJSSxNQUFNLEtBQUtDLEtBQUwsRUFBVjtBQUNBWCxTQUFPLGlDQUFQLEVBQTBDVSxHQUExQzs7QUFIc0MscUNBQVBFLElBQU87QUFBUEEsUUFBTztBQUFBOztBQUl0Q0osWUFBU0ssS0FBVCxDQUFnQkgsR0FBaEIsRUFBcUJFLElBQXJCO0FBQ0EsVUFBT0YsR0FBUDtBQUNBLEdBTkQ7O0FBUUEsU0FBT0gsVUFBUDtBQUNBOztBQXNCTSxVQUFTTCxNQUFULENBQWlCWSxHQUFqQixFQUF1QjtBQUM3QixNQUFLLFFBQU9BLEdBQVAseUNBQU9BLEdBQVAsT0FBZSxRQUFmLElBQTJCQSxRQUFRLElBQW5DLElBQTJDQSxlQUFlQyxHQUEvRCxFQUFxRTtBQUNwRSxVQUFPRCxHQUFQO0FBQ0E7O0FBRUQsTUFBSUEsZUFBZUUsS0FBbkIsRUFBMEI7QUFDekIsVUFBT0YsSUFBSUcsR0FBSixDQUFTO0FBQUEsV0FBS2YsT0FBT2dCLENBQVAsQ0FBTDtBQUFBLElBQVQsQ0FBUDtBQUNBLEdBRkQsTUFFTztBQUFBO0FBQ04sUUFBSUMsSUFBSSxJQUFJSixHQUFKLEVBQVI7QUFDQUssV0FBT0MsSUFBUCxDQUFhUCxHQUFiLEVBQW1CUSxPQUFuQixDQUE0QixhQUFLO0FBQ2hDSCxPQUFFSSxHQUFGLENBQU9DLENBQVAsRUFBVXRCLE9BQU9ZLElBQUlVLENBQUosQ0FBUCxDQUFWO0FBQ0EsS0FGRDtBQUdBO0FBQUEsUUFBT0w7QUFBUDtBQUxNOztBQUFBO0FBTU47QUFFRDs7QUFjTSxVQUFTaEIsUUFBVCxDQUFtQlcsR0FBbkIsRUFBeUI7QUFDL0IsTUFBSUEsZUFBZUUsS0FBbkIsRUFBMEI7QUFDekJoQixTQUFPLCtCQUFQO0FBQ0EsVUFBT2MsSUFBSUcsR0FBSixDQUFTO0FBQUEsV0FBS2QsU0FBU2UsQ0FBVCxDQUFMO0FBQUEsSUFBVCxDQUFQO0FBQ0EsR0FIRCxNQUdPLElBQUssRUFBRUosZUFBZUMsR0FBakIsQ0FBTCxFQUE2QjtBQUNuQ2YsU0FBTyxnQ0FBUDtBQUNBLFVBQU9jLEdBQVA7QUFDQTs7QUFFRGQsUUFBTywrQkFBUDtBQUNBLE1BQUl5QixPQUFPLEVBQVg7QUFWK0I7QUFBQTtBQUFBOztBQUFBO0FBVy9CLHdCQUFtQlgsR0FBbkIsOEhBQXdCO0FBQUE7O0FBQUEsUUFBZFUsQ0FBYztBQUFBLFFBQVhFLENBQVc7O0FBQ3ZCRCxTQUFLRCxDQUFMLElBQVVyQixTQUFTdUIsQ0FBVCxDQUFWO0FBQ0E7QUFiOEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFjL0IsU0FBT0QsSUFBUDtBQUNBIiwiZmlsZSI6InV0aWxzLmpzIiwic291cmNlUm9vdCI6Ii9saWIifQ==
