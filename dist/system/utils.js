
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
				return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
			};
			DEBUGGING_ENABLED = false;
			;
		}
	};
});
//# sourceMappingURL=data:application/json;base64,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
