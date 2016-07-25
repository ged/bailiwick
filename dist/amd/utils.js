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
