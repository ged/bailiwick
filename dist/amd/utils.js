define(["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
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

	var debug = exports.debug = DEBUGGING_ENABLED ? console.debug : function () {};

	function monadic(target, name, descriptor) {
		var realfunc = descriptor.value;
		descriptor.value = function () {
			var dup = this.clone();

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
				var _step$value = _slicedToArray(_step.value, 2),
				    k = _step$value[0],
				    v = _step$value[1];

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbIm1vbmFkaWMiLCJtYXBpZnkiLCJkZW1hcGlmeSIsIkRFQlVHR0lOR19FTkFCTEVEIiwiZGVidWciLCJjb25zb2xlIiwidGFyZ2V0IiwibmFtZSIsImRlc2NyaXB0b3IiLCJyZWFsZnVuYyIsInZhbHVlIiwiZHVwIiwiY2xvbmUiLCJhcmdzIiwiYXBwbHkiLCJvYmoiLCJNYXAiLCJBcnJheSIsIm1hcCIsIngiLCJtIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJzZXQiLCJrIiwicnZhbCIsInYiXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7U0FrQmdCQSxPLEdBQUFBLE87U0ErQkFDLE0sR0FBQUEsTTtTQTZCQUMsUSxHQUFBQSxROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNUVoQixLQUFNQyxvQkFBb0IsS0FBMUI7O0FBTU8sS0FBSUMsd0JBQVFELG9CQUFvQkUsUUFBUUQsS0FBNUIsR0FBb0MsWUFBVyxDQUFFLENBQTdEOztBQVVBLFVBQVNKLE9BQVQsQ0FBa0JNLE1BQWxCLEVBQTBCQyxJQUExQixFQUFnQ0MsVUFBaEMsRUFBNkM7QUFDbkQsTUFBSUMsV0FBV0QsV0FBV0UsS0FBMUI7QUFDQUYsYUFBV0UsS0FBWCxHQUFtQixZQUFvQjtBQUN0QyxPQUFJQyxNQUFNLEtBQUtDLEtBQUwsRUFBVjs7QUFEc0MscUNBQVBDLElBQU87QUFBUEEsUUFBTztBQUFBOztBQUV0Q0osWUFBU0ssS0FBVCxDQUFnQkgsR0FBaEIsRUFBcUJFLElBQXJCO0FBQ0EsVUFBT0YsR0FBUDtBQUNBLEdBSkQ7O0FBTUEsU0FBT0gsVUFBUDtBQUNBOztBQXNCTSxVQUFTUCxNQUFULENBQWlCYyxHQUFqQixFQUF1QjtBQUM3QixNQUFLLFFBQU9BLEdBQVAseUNBQU9BLEdBQVAsT0FBZSxRQUFmLElBQTJCQSxRQUFRLElBQW5DLElBQTJDQSxlQUFlQyxHQUEvRCxFQUFxRTtBQUNwRSxVQUFPRCxHQUFQO0FBQ0E7O0FBRUQsTUFBSUEsZUFBZUUsS0FBbkIsRUFBMEI7QUFDekIsVUFBT0YsSUFBSUcsR0FBSixDQUFTO0FBQUEsV0FBS2pCLE9BQU9rQixDQUFQLENBQUw7QUFBQSxJQUFULENBQVA7QUFDQSxHQUZELE1BRU87QUFBQTtBQUNOLFFBQUlDLElBQUksSUFBSUosR0FBSixFQUFSO0FBQ0FLLFdBQU9DLElBQVAsQ0FBYVAsR0FBYixFQUFtQlEsT0FBbkIsQ0FBNEIsYUFBSztBQUNoQ0gsT0FBRUksR0FBRixDQUFPQyxDQUFQLEVBQVV4QixPQUFPYyxJQUFJVSxDQUFKLENBQVAsQ0FBVjtBQUNBLEtBRkQ7QUFHQTtBQUFBLFFBQU9MO0FBQVA7QUFMTTs7QUFBQTtBQU1OO0FBRUQ7O0FBY00sVUFBU2xCLFFBQVQsQ0FBbUJhLEdBQW5CLEVBQXlCO0FBQy9CLE1BQUlBLGVBQWVFLEtBQW5CLEVBQTBCO0FBQ3pCYixTQUFPLCtCQUFQO0FBQ0EsVUFBT1csSUFBSUcsR0FBSixDQUFTO0FBQUEsV0FBS2hCLFNBQVNpQixDQUFULENBQUw7QUFBQSxJQUFULENBQVA7QUFDQSxHQUhELE1BR08sSUFBSyxFQUFFSixlQUFlQyxHQUFqQixDQUFMLEVBQTZCO0FBQ25DWixTQUFPLGdDQUFQO0FBQ0EsVUFBT1csR0FBUDtBQUNBOztBQUVEWCxRQUFPLCtCQUFQO0FBQ0EsTUFBSXNCLE9BQU8sRUFBWDtBQVYrQjtBQUFBO0FBQUE7O0FBQUE7QUFXL0Isd0JBQW1CWCxHQUFuQiw4SEFBd0I7QUFBQTtBQUFBLFFBQWRVLENBQWM7QUFBQSxRQUFYRSxDQUFXOztBQUN2QkQsU0FBS0QsQ0FBTCxJQUFVdkIsU0FBU3lCLENBQVQsQ0FBVjtBQUNBO0FBYjhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBYy9CLFNBQU9ELElBQVA7QUFDQSIsImZpbGUiOiJ1dGlscy5qcyIsInNvdXJjZVJvb3QiOiIvbGliIn0=
