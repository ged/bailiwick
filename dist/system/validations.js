
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

			descriptor.value = Promise.method(methodBody);
			target.constructor.validators.set(field, descriptor.value);

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
					var field = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

					_classCallCheck(this, ValidationError);

					var _this = _possibleConstructorReturn(this, (ValidationError.__proto__ || Object.getPrototypeOf(ValidationError)).call(this, message));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbGlkYXRpb25zLmpzIl0sIm5hbWVzIjpbInZhbGlkYXRvciIsImZpZWxkIiwiZGVjb3JhdG9yIiwidGFyZ2V0IiwibmFtZSIsImRlc2NyaXB0b3IiLCJtZXRob2RCb2R5IiwidmFsdWUiLCJQcm9taXNlIiwibWV0aG9kIiwiY29uc3RydWN0b3IiLCJ2YWxpZGF0b3JzIiwic2V0IiwiRXh0ZW5kYWJsZUVycm9yIiwiVkFMSURBVE9SUyIsIlN5bWJvbCIsImZvciIsIlZhbGlkYXRpb25FcnJvciIsIm1lc3NhZ2UiLCJWYWxpZGF0aW9uRXJyb3JzIiwiZmFpbHVyZXMiLCJNYXAiLCJyZWFzb24iLCJkZWJ1ZyIsInNpemUiLCJmaWVsZHMiLCJrZXlzIiwicHVzaCIsIm1lc3NhZ2VzIl0sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFhTyxVQUFTQSxTQUFULENBQW9CQyxLQUFwQixFQUE0QjtBQUNsQyxTQUFPLFNBQVNDLFNBQVQsQ0FBb0JDLE1BQXBCLEVBQTRCQyxJQUE1QixFQUFrQ0MsVUFBbEMsRUFBK0M7QUFDckQsT0FBSUMsYUFBYUQsV0FBV0UsS0FBNUI7O0FBR0FGLGNBQVdFLEtBQVgsR0FBbUJDLFFBQVFDLE1BQVIsQ0FBZ0JILFVBQWhCLENBQW5CO0FBQ0FILFVBQU9PLFdBQVAsQ0FBbUJDLFVBQW5CLENBQThCQyxHQUE5QixDQUFtQ1gsS0FBbkMsRUFBMENJLFdBQVdFLEtBQXJEOztBQUVBLFVBQU9GLFVBQVA7QUFDQSxHQVJEO0FBU0E7O3NCQVZlTCxTOzs7O0FBWFRRLFU7O0FBQ0FLLGtCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdEQyxhLEdBQWFDLE9BQU9DLEdBQVAsQ0FBVyxZQUFYLEM7OzhCQXNCTkMsZTs7O0FBSVosNkJBQWFDLE9BQWIsRUFBbUM7QUFBQSxTQUFiakIsS0FBYSx1RUFBUCxJQUFPOztBQUFBOztBQUFBLG1JQUMzQmlCLE9BRDJCOztBQUFBLFdBRm5DakIsS0FFbUMsR0FGM0IsSUFFMkI7O0FBRWxDLFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUZrQztBQUdsQzs7O0tBUG1DWSxlOzs7OytCQWV4Qk0sZ0I7QUFFWixnQ0FBYztBQUFBOztBQUNiLFVBQUtDLFFBQUwsR0FBZ0IsSUFBSUMsR0FBSixFQUFoQjtBQUNBOzs7O3lCQTJCSXBCLEssRUFBT3FCLE0sRUFBUztBQUNwQkMsWUFBTyxtQkFBUCxFQUE0QnRCLEtBQTVCLEVBQW1DcUIsTUFBbkM7QUFDQSxXQUFLRixRQUFMLENBQWNSLEdBQWQsQ0FBbUJYLEtBQW5CLEVBQTBCcUIsTUFBMUI7QUFDQTs7OytCQUdTO0FBQ1QsYUFBUyxLQUFLRSxJQUFMLEtBQWMsQ0FBdkI7QUFDQTs7O3lCQWhDWTtBQUNaLFVBQUlDLFNBQVMsRUFBYjtBQURZO0FBQUE7QUFBQTs7QUFBQTtBQUdaLDRCQUFtQixLQUFLTCxRQUFMLENBQWNNLElBQWQsRUFBbkI7QUFBQSxZQUFVekIsS0FBVjtBQUEwQ3dCLGVBQU9FLElBQVAsQ0FBYTFCLEtBQWI7QUFBMUM7QUFIWTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUtaLGFBQU93QixNQUFQO0FBQ0E7Ozt5QkFHa0I7QUFDbEIsVUFBSUcsV0FBVyxFQUFmO0FBRGtCO0FBQUE7QUFBQTs7QUFBQTtBQUVsQiw2QkFBNEIsS0FBS1IsUUFBakMsbUlBQTRDO0FBQUE7O0FBQUEsWUFBbENuQixLQUFrQztBQUFBLFlBQTNCcUIsTUFBMkI7O0FBQzNDTSxpQkFBU0QsSUFBVCxDQUFrQjFCLEtBQWxCLFNBQTJCcUIsTUFBM0I7QUFDQTtBQUppQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQU1sQixhQUFPTSxRQUFQO0FBQ0E7Ozt5QkFHVTtBQUNWLGFBQU8sS0FBS1IsUUFBTCxDQUFjSSxJQUFyQjtBQUNBIiwiZmlsZSI6InZhbGlkYXRpb25zLmpzIiwic291cmNlUm9vdCI6Ii9saWIifQ==
