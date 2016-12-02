
"use strict";

System.register([], function (_export, _context) {
	"use strict";

	var _slicedToArray, _typeof, DEBUGGING_ENABLED, debug;

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

			_export("debug", debug = DEBUGGING_ENABLED ? console.debug : function () {});

			_export("debug", debug);

			;
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbIm1vbmFkaWMiLCJ0YXJnZXQiLCJuYW1lIiwiZGVzY3JpcHRvciIsInJlYWxmdW5jIiwidmFsdWUiLCJkdXAiLCJjbG9uZSIsImFyZ3MiLCJhcHBseSIsIm1hcGlmeSIsIm9iaiIsIk1hcCIsIkFycmF5IiwibWFwIiwieCIsIm0iLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInNldCIsImsiLCJkZW1hcGlmeSIsImRlYnVnIiwicnZhbCIsInYiLCJERUJVR0dJTkdfRU5BQkxFRCIsImNvbnNvbGUiXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7OztBQWtCTyxVQUFTQSxPQUFULENBQWtCQyxNQUFsQixFQUEwQkMsSUFBMUIsRUFBZ0NDLFVBQWhDLEVBQTZDO0FBQ25ELE1BQUlDLFdBQVdELFdBQVdFLEtBQTFCO0FBQ0FGLGFBQVdFLEtBQVgsR0FBbUIsWUFBb0I7QUFDdEMsT0FBSUMsTUFBTSxLQUFLQyxLQUFMLEVBQVY7O0FBRHNDLHFDQUFQQyxJQUFPO0FBQVBBLFFBQU87QUFBQTs7QUFFdENKLFlBQVNLLEtBQVQsQ0FBZ0JILEdBQWhCLEVBQXFCRSxJQUFyQjtBQUNBLFVBQU9GLEdBQVA7QUFDQSxHQUpEOztBQU1BLFNBQU9ILFVBQVA7QUFDQTs7b0JBVGVILE87O0FBK0JULFVBQVNVLE1BQVQsQ0FBaUJDLEdBQWpCLEVBQXVCO0FBQzdCLE1BQUssUUFBT0EsR0FBUCx5Q0FBT0EsR0FBUCxPQUFlLFFBQWYsSUFBMkJBLFFBQVEsSUFBbkMsSUFBMkNBLGVBQWVDLEdBQS9ELEVBQXFFO0FBQ3BFLFVBQU9ELEdBQVA7QUFDQTs7QUFFRCxNQUFJQSxlQUFlRSxLQUFuQixFQUEwQjtBQUN6QixVQUFPRixJQUFJRyxHQUFKLENBQVM7QUFBQSxXQUFLSixPQUFPSyxDQUFQLENBQUw7QUFBQSxJQUFULENBQVA7QUFDQSxHQUZELE1BRU87QUFBQTtBQUNOLFFBQUlDLElBQUksSUFBSUosR0FBSixFQUFSO0FBQ0FLLFdBQU9DLElBQVAsQ0FBYVAsR0FBYixFQUFtQlEsT0FBbkIsQ0FBNEIsYUFBSztBQUNoQ0gsT0FBRUksR0FBRixDQUFPQyxDQUFQLEVBQVVYLE9BQU9DLElBQUlVLENBQUosQ0FBUCxDQUFWO0FBQ0EsS0FGRDtBQUdBO0FBQUEsUUFBT0w7QUFBUDtBQUxNOztBQUFBO0FBTU47QUFFRDs7bUJBZmVOLE07O0FBNkJULFVBQVNZLFFBQVQsQ0FBbUJYLEdBQW5CLEVBQXlCO0FBQy9CLE1BQUlBLGVBQWVFLEtBQW5CLEVBQTBCO0FBQ3pCVSxTQUFPLCtCQUFQO0FBQ0EsVUFBT1osSUFBSUcsR0FBSixDQUFTO0FBQUEsV0FBS1EsU0FBU1AsQ0FBVCxDQUFMO0FBQUEsSUFBVCxDQUFQO0FBQ0EsR0FIRCxNQUdPLElBQUssRUFBRUosZUFBZUMsR0FBakIsQ0FBTCxFQUE2QjtBQUNuQ1csU0FBTyxnQ0FBUDtBQUNBLFVBQU9aLEdBQVA7QUFDQTs7QUFFRFksUUFBTywrQkFBUDtBQUNBLE1BQUlDLE9BQU8sRUFBWDtBQVYrQjtBQUFBO0FBQUE7O0FBQUE7QUFXL0Isd0JBQW1CYixHQUFuQiw4SEFBd0I7QUFBQTtBQUFBLFFBQWRVLENBQWM7QUFBQSxRQUFYSSxDQUFXOztBQUN2QkQsU0FBS0gsQ0FBTCxJQUFVQyxTQUFTRyxDQUFULENBQVY7QUFDQTtBQWI4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWMvQixTQUFPRCxJQUFQO0FBQ0E7cUJBZmVGLFE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTVFVkksb0IsR0FBb0IsSzs7b0JBTWZILEssR0FBUUcsb0JBQW9CQyxRQUFRSixLQUE1QixHQUFvQyxZQUFXLENBQUUsQzs7OztBQXFGbkUiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiL2xpYiJ9
