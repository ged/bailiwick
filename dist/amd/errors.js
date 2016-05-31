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

			return _possibleConstructorReturn(this, Object.getPrototypeOf(NotImplementedError).call(this, "No implementation provided for " + methodname + "(...)"));
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

			var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(HTTPError).call(this, "[" + response.status + "] " + response.statusText));

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

			return _possibleConstructorReturn(this, Object.getPrototypeOf(RequestError).apply(this, arguments));
		}

		return RequestError;
	}(HTTPError);

	var ServerError = exports.ServerError = function (_HTTPError2) {
		_inherits(ServerError, _HTTPError2);

		function ServerError() {
			_classCallCheck(this, ServerError);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(ServerError).apply(this, arguments));
		}

		return ServerError;
	}(HTTPError);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9ycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FLYTs7O0FBRVosV0FGWSxtQkFFWixDQUFhLFVBQWIsRUFBMEI7eUJBRmQscUJBRWM7O2lFQUZkLG9FQUc2Qix1QkFEZjtHQUExQjs7U0FGWTs7O0tBUUE7Ozs7O2dDQU9TLFVBQVc7QUFDL0IsUUFBSyxTQUFTLEVBQVQsRUFBYztBQUNsQiw0QkFBOEMsU0FBOUMsQ0FEa0I7S0FBbkI7O0FBSUEsWUFBUSxLQUFLLEtBQUwsQ0FBVyxTQUFTLE1BQVQsR0FBa0IsR0FBbEIsQ0FBbkI7QUFDQyxVQUFLLENBQUw7QUFDQyxhQUFPLElBQUksWUFBSixDQUFrQixRQUFsQixDQUFQLENBREQ7QUFFQyxZQUZEO0FBREQsVUFJTSxDQUFMO0FBQ0MsYUFBTyxJQUFJLFdBQUosQ0FBaUIsUUFBakIsQ0FBUCxDQUREO0FBRUMsWUFGRDtBQUpEO0FBUUUsYUFBTyxJQUFJLFNBQUosQ0FBZSxRQUFmLENBQVAsQ0FERDtBQVBELEtBTCtCOzs7O0FBa0JoQyxXQXpCWSxTQXlCWixDQUFhLFFBQWIsRUFBd0I7eUJBekJaLFdBeUJZOzt1RUF6QlosNEJBMEJBLFNBQVMsTUFBVCxVQUFvQixTQUFTLFVBQVQsR0FEUjs7VUF2QnhCLFNBQVMsSUF1QmU7VUF0QnhCLGFBQWEsZ0JBc0JXO1VBckJ4QixXQUFXLEtBcUJhOztBQUV2QixVQUFLLE1BQUwsR0FBYyxTQUFTLE1BQVQsQ0FGUztBQUd2QixVQUFLLFVBQUwsR0FBa0IsU0FBUyxVQUFULENBSEs7QUFJdkIsVUFBSyxRQUFMLEdBQWdCLFFBQWhCLENBSnVCOztHQUF4Qjs7ZUF6Qlk7UUFvQ1AsT0FBTyxXQUFQO3VCQUFzQjtBQUMxQixpQkFBVyxLQUFLLFdBQUwsQ0FBaUIsSUFBakIsVUFBMEIsS0FBSyxNQUFMLFdBQWlCLEtBQUssVUFBTCxNQUF0RCxDQUQwQjs7OztTQXBDZjs7O0tBNENBOzs7Ozs7Ozs7O0dBQXFCOztLQUdyQjs7Ozs7Ozs7OztHQUFvQiIsImZpbGUiOiJlcnJvcnMuanMiLCJzb3VyY2VSb290IjoiL2xpYiJ9
