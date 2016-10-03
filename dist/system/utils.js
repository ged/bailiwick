
"use strict";

System.register([], function (_export, _context) {
	"use strict";

	var _slicedToArray, _typeof, DEBUGGING_ENABLED;

	function debug() {
		if (DEBUGGING_ENABLED) {
			var _console;

			(_console = console).debug.apply(_console, arguments);
		}
	}

	_export("debug", debug);

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

	_export("monadic", monadic);

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

	_export("mapify", mapify);

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
	}
	_export("demapify", demapify);

	return {
		setters: [],
		execute: function () {
			_slicedToArray = function () {
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

			_typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			};
			DEBUGGING_ENABLED = false;
			;
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbImRlYnVnIiwiREVCVUdHSU5HX0VOQUJMRUQiLCJtb25hZGljIiwidGFyZ2V0IiwibmFtZSIsImRlc2NyaXB0b3IiLCJyZWFsZnVuYyIsInZhbHVlIiwiZHVwIiwiY2xvbmUiLCJhcmdzIiwiYXBwbHkiLCJtYXBpZnkiLCJvYmoiLCJNYXAiLCJBcnJheSIsIm1hcCIsIngiLCJtIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJzZXQiLCJrIiwiZGVtYXBpZnkiLCJydmFsIiwidiJdLCJtYXBwaW5ncyI6IjtBQUNBOzs7Ozs7O0FBUU8sVUFBU0EsS0FBVCxHQUEwQjtBQUNoQyxNQUFLQyxpQkFBTCxFQUF5QjtBQUFBOztBQUN4Qix3QkFBUUQsS0FBUjtBQUNBO0FBQ0Q7O2tCQUplQSxLOztBQWFULFVBQVNFLE9BQVQsQ0FBa0JDLE1BQWxCLEVBQTBCQyxJQUExQixFQUFnQ0MsVUFBaEMsRUFBNkM7QUFDbkQsTUFBSUMsV0FBV0QsV0FBV0UsS0FBMUI7QUFDQUYsYUFBV0UsS0FBWCxHQUFtQixZQUFvQjtBQUN0Q1AseUNBQXFDSSxJQUFyQztBQUNBLE9BQUlJLE1BQU0sS0FBS0MsS0FBTCxFQUFWO0FBQ0FULFNBQU8saUNBQVAsRUFBMENRLEdBQTFDOztBQUhzQyxxQ0FBUEUsSUFBTztBQUFQQSxRQUFPO0FBQUE7O0FBSXRDSixZQUFTSyxLQUFULENBQWdCSCxHQUFoQixFQUFxQkUsSUFBckI7QUFDQSxVQUFPRixHQUFQO0FBQ0EsR0FORDs7QUFRQSxTQUFPSCxVQUFQO0FBQ0E7O29CQVhlSCxPOztBQWlDVCxVQUFTVSxNQUFULENBQWlCQyxHQUFqQixFQUF1QjtBQUM3QixNQUFLLFFBQU9BLEdBQVAseUNBQU9BLEdBQVAsT0FBZSxRQUFmLElBQTJCQSxRQUFRLElBQW5DLElBQTJDQSxlQUFlQyxHQUEvRCxFQUFxRTtBQUNwRSxVQUFPRCxHQUFQO0FBQ0E7O0FBRUQsTUFBSUEsZUFBZUUsS0FBbkIsRUFBMEI7QUFDekIsVUFBT0YsSUFBSUcsR0FBSixDQUFTO0FBQUEsV0FBS0osT0FBT0ssQ0FBUCxDQUFMO0FBQUEsSUFBVCxDQUFQO0FBQ0EsR0FGRCxNQUVPO0FBQUE7QUFDTixRQUFJQyxJQUFJLElBQUlKLEdBQUosRUFBUjtBQUNBSyxXQUFPQyxJQUFQLENBQWFQLEdBQWIsRUFBbUJRLE9BQW5CLENBQTRCLGFBQUs7QUFDaENILE9BQUVJLEdBQUYsQ0FBT0MsQ0FBUCxFQUFVWCxPQUFPQyxJQUFJVSxDQUFKLENBQVAsQ0FBVjtBQUNBLEtBRkQ7QUFHQTtBQUFBLFFBQU9MO0FBQVA7QUFMTTs7QUFBQTtBQU1OO0FBRUQ7O21CQWZlTixNOztBQTZCVCxVQUFTWSxRQUFULENBQW1CWCxHQUFuQixFQUF5QjtBQUMvQixNQUFJQSxlQUFlRSxLQUFuQixFQUEwQjtBQUN6QmYsU0FBTywrQkFBUDtBQUNBLFVBQU9hLElBQUlHLEdBQUosQ0FBUztBQUFBLFdBQUtRLFNBQVNQLENBQVQsQ0FBTDtBQUFBLElBQVQsQ0FBUDtBQUNBLEdBSEQsTUFHTyxJQUFLLEVBQUVKLGVBQWVDLEdBQWpCLENBQUwsRUFBNkI7QUFDbkNkLFNBQU8sZ0NBQVA7QUFDQSxVQUFPYSxHQUFQO0FBQ0E7O0FBRURiLFFBQU8sK0JBQVA7QUFDQSxNQUFJeUIsT0FBTyxFQUFYO0FBVitCO0FBQUE7QUFBQTs7QUFBQTtBQVcvQix3QkFBbUJaLEdBQW5CLDhIQUF3QjtBQUFBOztBQUFBLFFBQWRVLENBQWM7QUFBQSxRQUFYRyxDQUFXOztBQUN2QkQsU0FBS0YsQ0FBTCxJQUFVQyxTQUFTRSxDQUFULENBQVY7QUFDQTtBQWI4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWMvQixTQUFPRCxJQUFQO0FBQ0E7cUJBZmVELFE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWpGVnZCLG9CLEdBQW9CLEs7QUFnR3pCIiwiZmlsZSI6InV0aWxzLmpzIiwic291cmNlUm9vdCI6Ii9saWIifQ==
