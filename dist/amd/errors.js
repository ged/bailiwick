define(["exports", "es6-error"], function (exports, _es6Error) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ServerError = exports.RequestError = exports.HTTPError = exports.NotImplementedError = undefined;

	var _es6Error2 = _interopRequireDefault(_es6Error);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _templateObject = _taggedTemplateLiteral(["Expected an error response, but got: ", ""], ["Expected an error response, but got: ", ""]);

	function _taggedTemplateLiteral(strings, raw) {
		return Object.freeze(Object.defineProperties(strings, {
			raw: {
				value: Object.freeze(raw)
			}
		}));
	}

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

	var NotImplementedError = exports.NotImplementedError = function (_ExtendableError) {
		_inherits(NotImplementedError, _ExtendableError);

		function NotImplementedError(methodname) {
			_classCallCheck(this, NotImplementedError);

			return _possibleConstructorReturn(this, (NotImplementedError.__proto__ || Object.getPrototypeOf(NotImplementedError)).call(this, "No implementation provided for " + methodname + "(...)"));
		}

		return NotImplementedError;
	}(_es6Error2.default);

	var HTTPError = exports.HTTPError = function (_ExtendableError2) {
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
	}(_es6Error2.default);

	var RequestError = exports.RequestError = function (_HTTPError) {
		_inherits(RequestError, _HTTPError);

		function RequestError() {
			_classCallCheck(this, RequestError);

			return _possibleConstructorReturn(this, (RequestError.__proto__ || Object.getPrototypeOf(RequestError)).apply(this, arguments));
		}

		return RequestError;
	}(HTTPError);

	var ServerError = exports.ServerError = function (_HTTPError2) {
		_inherits(ServerError, _HTTPError2);

		function ServerError() {
			_classCallCheck(this, ServerError);

			return _possibleConstructorReturn(this, (ServerError.__proto__ || Object.getPrototypeOf(ServerError)).apply(this, arguments));
		}

		return ServerError;
	}(HTTPError);
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9ycy5qcyJdLCJuYW1lcyI6WyJOb3RJbXBsZW1lbnRlZEVycm9yIiwibWV0aG9kbmFtZSIsIkhUVFBFcnJvciIsInJlc3BvbnNlIiwib2siLCJyYWlzZSIsIk1hdGgiLCJmbG9vciIsInN0YXR1cyIsIlJlcXVlc3RFcnJvciIsIlNlcnZlckVycm9yIiwic3RhdHVzVGV4dCIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwiY29uc3RydWN0b3IiLCJuYW1lIl0sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FLYUEsbUIsV0FBQUEsbUI7OztBQUVaLCtCQUFhQyxVQUFiLEVBQTBCO0FBQUE7O0FBQUEsd0tBQ2VBLFVBRGY7QUFFekI7Ozs7O0tBSVdDLFMsV0FBQUEsUzs7Ozs7Z0NBT1NDLFEsRUFBVztBQUMvQixRQUFLQSxTQUFTQyxFQUFkLEVBQW1CO0FBQ2xCQyw0QkFBOENGLFFBQTlDO0FBQ0E7O0FBRUQsWUFBUUcsS0FBS0MsS0FBTCxDQUFXSixTQUFTSyxNQUFULEdBQWtCLEdBQTdCLENBQVI7QUFDQyxVQUFLLENBQUw7QUFDQyxhQUFPLElBQUlDLFlBQUosQ0FBa0JOLFFBQWxCLENBQVA7QUFDQTtBQUNELFVBQUssQ0FBTDtBQUNDLGFBQU8sSUFBSU8sV0FBSixDQUFpQlAsUUFBakIsQ0FBUDtBQUNBO0FBQ0Q7QUFDQyxhQUFPLElBQUlELFNBQUosQ0FBZUMsUUFBZixDQUFQO0FBUkY7QUFVQTs7O0FBR0QscUJBQWFBLFFBQWIsRUFBd0I7QUFBQTs7QUFBQSw0SEFDWkEsU0FBU0ssTUFERyxVQUNRTCxTQUFTUSxVQURqQjs7QUFBQSxVQXZCeEJILE1BdUJ3QixHQXZCZixHQXVCZTtBQUFBLFVBdEJ4QkcsVUFzQndCLEdBdEJYLGVBc0JXO0FBQUEsVUFyQnhCUixRQXFCd0IsR0FyQmIsSUFxQmE7O0FBRXZCLFVBQUtLLE1BQUwsR0FBY0wsU0FBU0ssTUFBdkI7QUFDQSxVQUFLRyxVQUFMLEdBQWtCUixTQUFTUSxVQUEzQjtBQUNBLFVBQUtSLFFBQUwsR0FBZ0JBLFFBQWhCO0FBSnVCO0FBS3ZCOzs7UUFNSVMsT0FBT0MsVzt1QkFBZTtBQUMxQixpQkFBVyxLQUFLQyxXQUFMLENBQWlCQyxJQUE1QixVQUFxQyxLQUFLUCxNQUExQyxXQUFzRCxLQUFLRyxVQUEzRDtBQUNBOzs7Ozs7S0FNV0YsWSxXQUFBQSxZOzs7Ozs7Ozs7O0dBQXFCUCxTOztLQUdyQlEsVyxXQUFBQSxXOzs7Ozs7Ozs7O0dBQW9CUixTIiwiZmlsZSI6ImVycm9ycy5qcyIsInNvdXJjZVJvb3QiOiIvbGliIn0=
