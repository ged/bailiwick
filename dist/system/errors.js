
"use strict";

System.register(["es6-error"], function (_export, _context) {
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

					return _possibleConstructorReturn(this, Object.getPrototypeOf(NotImplementedError).call(this, "No implementation provided for " + methodname + "(...)"));
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
			}(ExtendableError));

			_export("HTTPError", HTTPError);

			_export("RequestError", RequestError = function (_HTTPError) {
				_inherits(RequestError, _HTTPError);

				function RequestError() {
					_classCallCheck(this, RequestError);

					return _possibleConstructorReturn(this, Object.getPrototypeOf(RequestError).apply(this, arguments));
				}

				return RequestError;
			}(HTTPError));

			_export("RequestError", RequestError);

			_export("ServerError", ServerError = function (_HTTPError2) {
				_inherits(ServerError, _HTTPError2);

				function ServerError() {
					_classCallCheck(this, ServerError);

					return _possibleConstructorReturn(this, Object.getPrototypeOf(ServerError).apply(this, arguments));
				}

				return ServerError;
			}(HTTPError));

			_export("ServerError", ServerError);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9ycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0FHTTs7O0FBRVosYUFGWSxtQkFFWixDQUFhLFVBQWIsRUFBMEI7MkJBRmQscUJBRWM7O21FQUZkLG9FQUc2Qix1QkFEZjtLQUExQjs7V0FGWTtLQUE0Qjs7Ozt3QkFRNUI7Ozs7O2tDQU9TLFVBQVc7QUFDL0IsVUFBSyxTQUFTLEVBQVQsRUFBYztBQUNsQiw4QkFBOEMsU0FBOUMsQ0FEa0I7T0FBbkI7O0FBSUEsY0FBUSxLQUFLLEtBQUwsQ0FBVyxTQUFTLE1BQVQsR0FBa0IsR0FBbEIsQ0FBbkI7QUFDQyxZQUFLLENBQUw7QUFDQyxlQUFPLElBQUksWUFBSixDQUFrQixRQUFsQixDQUFQLENBREQ7QUFFQyxjQUZEO0FBREQsWUFJTSxDQUFMO0FBQ0MsZUFBTyxJQUFJLFdBQUosQ0FBaUIsUUFBakIsQ0FBUCxDQUREO0FBRUMsY0FGRDtBQUpEO0FBUUUsZUFBTyxJQUFJLFNBQUosQ0FBZSxRQUFmLENBQVAsQ0FERDtBQVBELE9BTCtCOzs7O0FBa0JoQyxhQXpCWSxTQXlCWixDQUFhLFFBQWIsRUFBd0I7MkJBekJaLFdBeUJZOzt5RUF6QlosNEJBMEJBLFNBQVMsTUFBVCxVQUFvQixTQUFTLFVBQVQsR0FEUjs7WUF2QnhCLFNBQVMsSUF1QmU7WUF0QnhCLGFBQWEsZ0JBc0JXO1lBckJ4QixXQUFXLEtBcUJhOztBQUV2QixZQUFLLE1BQUwsR0FBYyxTQUFTLE1BQVQsQ0FGUztBQUd2QixZQUFLLFVBQUwsR0FBa0IsU0FBUyxVQUFULENBSEs7QUFJdkIsWUFBSyxRQUFMLEdBQWdCLFFBQWhCLENBSnVCOztLQUF4Qjs7aUJBekJZO1VBb0NQLE9BQU8sV0FBUDt5QkFBc0I7QUFDMUIsbUJBQVcsS0FBSyxXQUFMLENBQWlCLElBQWpCLFVBQTBCLEtBQUssTUFBTCxXQUFpQixLQUFLLFVBQUwsTUFBdEQsQ0FEMEI7Ozs7V0FwQ2Y7S0FBa0I7Ozs7MkJBNENsQjs7Ozs7Ozs7OztLQUFxQjs7OzswQkFHckI7Ozs7Ozs7Ozs7S0FBb0IiLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6Ii9saWIifQ==
