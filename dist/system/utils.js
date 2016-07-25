
"use strict";

System.register([], function (_export, _context) {
	"use strict";

	var _slicedToArray, _typeof, DEBUGGING_ENABLED;

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
			DEBUGGING_ENABLED = true;
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

			_export("mapify", mapify);

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
			}
			_export("demapify", demapify);

			;
		}
	};
});
//# sourceMappingURL=data:application/json;base64,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
