
"use strict";

System.register(['bluebird', 'es6-error'], function (_export, _context) {
	"use strict";

	var Promise, ExtendableError, _slicedToArray, _createClass, VALIDATORS, ValidationError, ValidationErrors;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	function validator(field) {
		return function decorator(target, name, descriptor) {
			var methodBody = descriptor.value;

			if (!target[VALIDATORS]) {
				target[VALIDATORS] = new Map();
			}

			descriptor.value = Promise.method(methodBody);
			target[VALIDATORS].set(field, descriptor.value);

			return descriptor;
		};
	}

	_export('validator', validator);

	return {
		setters: [function (_bluebird) {
			Promise = _bluebird.default;
		}, function (_es6Error) {
			ExtendableError = _es6Error.default;
		}],
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

			_createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];
						descriptor.enumerable = descriptor.enumerable || false;
						descriptor.configurable = true;
						if ("value" in descriptor) descriptor.writable = true;
						Object.defineProperty(target, descriptor.key, descriptor);
					}
				}

				return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);
					if (staticProps) defineProperties(Constructor, staticProps);
					return Constructor;
				};
			}();

			VALIDATORS = Symbol.for("validators");

			_export('ValidationError', ValidationError = function (_ExtendableError) {
				_inherits(ValidationError, _ExtendableError);

				function ValidationError(message) {
					var field = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

					_classCallCheck(this, ValidationError);

					var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ValidationError).call(this, message));

					_this.field = null;

					_this.field = field;
					return _this;
				}

				return ValidationError;
			}(ExtendableError));

			_export('ValidationError', ValidationError);

			_export('ValidationErrors', ValidationErrors = function () {
				function ValidationErrors() {
					_classCallCheck(this, ValidationErrors);

					this.failures = new Map();
				}

				_createClass(ValidationErrors, [{
					key: 'add',
					value: function add(field, reason) {
						debug("Added a failued: ", field, reason);
						this.failures.set(field, reason);
					}
				}, {
					key: 'isEmpty',
					value: function isEmpty() {
						return this.size === 0;
					}
				}, {
					key: 'fields',
					get: function get() {
						var fields = [];
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;

						try {
							for (var _iterator = this.failures.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var field = _step.value;
								fields.push(field);
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

						return fields;
					}
				}, {
					key: 'fullMessages',
					get: function get() {
						var messages = [];
						var _iteratorNormalCompletion2 = true;
						var _didIteratorError2 = false;
						var _iteratorError2 = undefined;

						try {
							for (var _iterator2 = this.failures[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
								var _step2$value = _slicedToArray(_step2.value, 2);

								var field = _step2$value[0];
								var reason = _step2$value[1];

								messages.push(field + ' ' + reason);
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

						return messages;
					}
				}, {
					key: 'size',
					get: function get() {
						return this.failures.size;
					}
				}]);

				return ValidationErrors;
			}());

			_export('ValidationErrors', ValidationErrors);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,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
