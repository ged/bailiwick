define(['exports', 'bluebird', 'es6-error'], function (exports, _bluebird, _es6Error) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ValidationErrors = exports.ValidationError = undefined;
	exports.validator = validator;

	var _bluebird2 = _interopRequireDefault(_bluebird);

	var _es6Error2 = _interopRequireDefault(_es6Error);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

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

	var _createClass = function () {
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

	var VALIDATORS = Symbol.for("validators");

	function validator(field) {
		return function decorator(target, name, descriptor) {
			var methodBody = descriptor.value;

			descriptor.value = _bluebird2.default.method(methodBody);
			target.constructor.validators.set(field, descriptor.value);

			return descriptor;
		};
	}

	var ValidationError = exports.ValidationError = function (_ExtendableError) {
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
	}(_es6Error2.default);

	var ValidationErrors = exports.ValidationErrors = function () {
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
	}();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbGlkYXRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7O1NBYWdCLFMsR0FBQSxTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVBoQixLQUFNLGFBQWEsT0FBTyxHQUFQLENBQVcsWUFBWCxDQUFuQjs7QUFPTyxVQUFTLFNBQVQsQ0FBb0IsS0FBcEIsRUFBNEI7QUFDbEMsU0FBTyxTQUFTLFNBQVQsQ0FBb0IsTUFBcEIsRUFBNEIsSUFBNUIsRUFBa0MsVUFBbEMsRUFBK0M7QUFDckQsT0FBSSxhQUFhLFdBQVcsS0FBNUI7O0FBR0EsY0FBVyxLQUFYLEdBQW1CLG1CQUFRLE1BQVIsQ0FBZ0IsVUFBaEIsQ0FBbkI7QUFDQSxVQUFPLFdBQVAsQ0FBbUIsVUFBbkIsQ0FBOEIsR0FBOUIsQ0FBbUMsS0FBbkMsRUFBMEMsV0FBVyxLQUFyRDs7QUFFQSxVQUFPLFVBQVA7QUFDQSxHQVJEO0FBU0E7O0tBS1ksZSxXQUFBLGU7OztBQUlaLDJCQUFhLE9BQWIsRUFBbUM7QUFBQSxPQUFiLEtBQWEseURBQVAsSUFBTzs7QUFBQTs7QUFBQSxrR0FDM0IsT0FEMkI7O0FBQUEsU0FGbkMsS0FFbUMsR0FGM0IsSUFFMkI7O0FBRWxDLFNBQUssS0FBTCxHQUFhLEtBQWI7QUFGa0M7QUFHbEM7Ozs7O0tBUVcsZ0IsV0FBQSxnQjtBQUVaLDhCQUFjO0FBQUE7O0FBQ2IsUUFBSyxRQUFMLEdBQWdCLElBQUksR0FBSixFQUFoQjtBQUNBOzs7O3VCQTJCSSxLLEVBQU8sTSxFQUFTO0FBQ3BCLFVBQU8sbUJBQVAsRUFBNEIsS0FBNUIsRUFBbUMsTUFBbkM7QUFDQSxTQUFLLFFBQUwsQ0FBYyxHQUFkLENBQW1CLEtBQW5CLEVBQTBCLE1BQTFCO0FBQ0E7Ozs2QkFHUztBQUNULFdBQVMsS0FBSyxJQUFMLEtBQWMsQ0FBdkI7QUFDQTs7O3VCQWhDWTtBQUNaLFFBQUksU0FBUyxFQUFiO0FBRFk7QUFBQTtBQUFBOztBQUFBO0FBR1osMEJBQW1CLEtBQUssUUFBTCxDQUFjLElBQWQsRUFBbkI7QUFBQSxVQUFVLEtBQVY7QUFBMEMsYUFBTyxJQUFQLENBQWEsS0FBYjtBQUExQztBQUhZO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBS1osV0FBTyxNQUFQO0FBQ0E7Ozt1QkFHa0I7QUFDbEIsUUFBSSxXQUFXLEVBQWY7QUFEa0I7QUFBQTtBQUFBOztBQUFBO0FBRWxCLDJCQUE0QixLQUFLLFFBQWpDLG1JQUE0QztBQUFBOztBQUFBLFVBQWxDLEtBQWtDO0FBQUEsVUFBM0IsTUFBMkI7O0FBQzNDLGVBQVMsSUFBVCxDQUFrQixLQUFsQixTQUEyQixNQUEzQjtBQUNBO0FBSmlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBTWxCLFdBQU8sUUFBUDtBQUNBOzs7dUJBR1U7QUFDVixXQUFPLEtBQUssUUFBTCxDQUFjLElBQXJCO0FBQ0EiLCJmaWxlIjoidmFsaWRhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiL2xpYiJ9
