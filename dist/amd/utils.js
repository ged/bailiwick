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

	var DEBUGGING_ENABLED = true;

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
		var m = new Map();
		if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== 'object' || obj === null || obj.prototype === m.prototype) {
			return obj;
		}
		if (obj instanceof Array) {
			var newArr = [];
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = obj[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var x = _step.value;

					newArr.push(mapify(x));
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

			return newArr;
		}
		for (var k in obj) {
			if (obj.hasOwnProperty(k)) {
				m.set(k, mapify(obj[k]));
			}
		};
		return m;
	}

	function demapify(map) {
		if (map instanceof Array) {
			var newArr = [];
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = map[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var x = _step2.value;

					newArr.push(demapify(x));
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			return newArr;
		} else if (!(map instanceof Map)) {
			return map;
		}
		var obj = {};
		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = map[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var _step3$value = _slicedToArray(_step3.value, 2);

				var k = _step3$value[0];
				var v = _step3$value[1];

				obj[k] = demapify(v);
			}
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}

		return obj;
	};
});
//# sourceMappingURL=data:application/json;base64,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
