
"use strict";

System.register(["es6-error"], function (_export, _context) {
	"use strict";

	var ExtendableError, _templateObject, _createClass, NotImplementedError, HTTPError, RequestError, ServerError;

	function _taggedTemplateLiteral(strings, raw) {
		return Object.freeze(Object.defineProperties(strings, {
			raw: {
				value: Object.freeze(raw)
			}
		}));
	}

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

	return {
		setters: [function (_es6Error) {
			ExtendableError = _es6Error.default;
		}],
		execute: function () {
			_templateObject = _taggedTemplateLiteral(["Expected an error response, but got: ", ""], ["Expected an error response, but got: ", ""]);

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

			_export("NotImplementedError", NotImplementedError = function (_ExtendableError) {
				_inherits(NotImplementedError, _ExtendableError);

				function NotImplementedError(methodname) {
					_classCallCheck(this, NotImplementedError);

					return _possibleConstructorReturn(this, (NotImplementedError.__proto__ || Object.getPrototypeOf(NotImplementedError)).call(this, "No implementation provided for " + methodname + "(...)"));
				}

				return NotImplementedError;
			}(ExtendableError));

			_export("NotImplementedError", NotImplementedError);

			_export("HTTPError", HTTPError = function (_ExtendableError2) {
				_inherits(HTTPError, _ExtendableError2);

				_createClass(HTTPError, null, [{
					key: "fromResponse",
					value: function fromResponse(response) {
						if (response.ok) {
							raise(_templateObject, response);
						}

						switch (Math.floor(response.status / 100)) {
							case 4:
								return new RequestError(response);
								break;
							case 5:
								return new ServerError(response);
								break;
							default:
								return new HTTPError(response);
						}
					}
				}]);

				function HTTPError(response) {
					_classCallCheck(this, HTTPError);

					var _this2 = _possibleConstructorReturn(this, (HTTPError.__proto__ || Object.getPrototypeOf(HTTPError)).call(this, "[" + response.status + "] " + response.statusText));

					_this2.status = 500;
					_this2.statusText = "Unknown error";
					_this2.response = null;

					_this2.status = response.status;
					_this2.statusText = response.statusText;
					_this2.response = response;
					return _this2;
				}

				_createClass(HTTPError, [{
					key: Symbol.toStringTag,
					get: function get() {
						return "<" + this.constructor.name + " [" + this.status + "]: " + this.statusText + ">";
					}
				}]);

				return HTTPError;
			}(ExtendableError));

			_export("HTTPError", HTTPError);

			_export("RequestError", RequestError = function (_HTTPError) {
				_inherits(RequestError, _HTTPError);

				function RequestError() {
					_classCallCheck(this, RequestError);

					return _possibleConstructorReturn(this, (RequestError.__proto__ || Object.getPrototypeOf(RequestError)).apply(this, arguments));
				}

				return RequestError;
			}(HTTPError));

			_export("RequestError", RequestError);

			_export("ServerError", ServerError = function (_HTTPError2) {
				_inherits(ServerError, _HTTPError2);

				function ServerError() {
					_classCallCheck(this, ServerError);

					return _possibleConstructorReturn(this, (ServerError.__proto__ || Object.getPrototypeOf(ServerError)).apply(this, arguments));
				}

				return ServerError;
			}(HTTPError));

			_export("ServerError", ServerError);
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9ycy5qcyJdLCJuYW1lcyI6WyJFeHRlbmRhYmxlRXJyb3IiLCJOb3RJbXBsZW1lbnRlZEVycm9yIiwibWV0aG9kbmFtZSIsIkhUVFBFcnJvciIsInJlc3BvbnNlIiwib2siLCJyYWlzZSIsIk1hdGgiLCJmbG9vciIsInN0YXR1cyIsIlJlcXVlc3RFcnJvciIsIlNlcnZlckVycm9yIiwic3RhdHVzVGV4dCIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwiY29uc3RydWN0b3IiLCJuYW1lIl0sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRU9BLGtCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0FHTUMsbUI7OztBQUVaLGlDQUFhQyxVQUFiLEVBQTBCO0FBQUE7O0FBQUEsMEtBQ2VBLFVBRGY7QUFFekI7OztLQUp1Q0YsZTs7Ozt3QkFRNUJHLFM7Ozs7O2tDQU9TQyxRLEVBQVc7QUFDL0IsVUFBS0EsU0FBU0MsRUFBZCxFQUFtQjtBQUNsQkMsOEJBQThDRixRQUE5QztBQUNBOztBQUVELGNBQVFHLEtBQUtDLEtBQUwsQ0FBV0osU0FBU0ssTUFBVCxHQUFrQixHQUE3QixDQUFSO0FBQ0MsWUFBSyxDQUFMO0FBQ0MsZUFBTyxJQUFJQyxZQUFKLENBQWtCTixRQUFsQixDQUFQO0FBQ0E7QUFDRCxZQUFLLENBQUw7QUFDQyxlQUFPLElBQUlPLFdBQUosQ0FBaUJQLFFBQWpCLENBQVA7QUFDQTtBQUNEO0FBQ0MsZUFBTyxJQUFJRCxTQUFKLENBQWVDLFFBQWYsQ0FBUDtBQVJGO0FBVUE7OztBQUdELHVCQUFhQSxRQUFiLEVBQXdCO0FBQUE7O0FBQUEsOEhBQ1pBLFNBQVNLLE1BREcsVUFDUUwsU0FBU1EsVUFEakI7O0FBQUEsWUF2QnhCSCxNQXVCd0IsR0F2QmYsR0F1QmU7QUFBQSxZQXRCeEJHLFVBc0J3QixHQXRCWCxlQXNCVztBQUFBLFlBckJ4QlIsUUFxQndCLEdBckJiLElBcUJhOztBQUV2QixZQUFLSyxNQUFMLEdBQWNMLFNBQVNLLE1BQXZCO0FBQ0EsWUFBS0csVUFBTCxHQUFrQlIsU0FBU1EsVUFBM0I7QUFDQSxZQUFLUixRQUFMLEdBQWdCQSxRQUFoQjtBQUp1QjtBQUt2Qjs7O1VBTUlTLE9BQU9DLFc7eUJBQWU7QUFDMUIsbUJBQVcsS0FBS0MsV0FBTCxDQUFpQkMsSUFBNUIsVUFBcUMsS0FBS1AsTUFBMUMsV0FBc0QsS0FBS0csVUFBM0Q7QUFDQTs7OztLQXRDNkJaLGU7Ozs7MkJBNENsQlUsWTs7Ozs7Ozs7OztLQUFxQlAsUzs7OzswQkFHckJRLFc7Ozs7Ozs7Ozs7S0FBb0JSLFMiLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6Ii9saWIifQ==
