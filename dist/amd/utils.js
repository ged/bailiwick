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
		return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
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
//# sourceMappingURL=data:application/json;base64,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
