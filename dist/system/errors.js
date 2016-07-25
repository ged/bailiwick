
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9ycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRU8sa0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQUdNLG1COzs7QUFFWixpQ0FBYSxVQUFiLEVBQTBCO0FBQUE7O0FBQUEsdUlBQ2UsVUFEZjtBQUV6Qjs7O0tBSnVDLGU7Ozs7d0JBUTVCLFM7Ozs7O2tDQU9TLFEsRUFBVztBQUMvQixVQUFLLFNBQVMsRUFBZCxFQUFtQjtBQUNsQiw4QkFBOEMsUUFBOUM7QUFDQTs7QUFFRCxjQUFRLEtBQUssS0FBTCxDQUFXLFNBQVMsTUFBVCxHQUFrQixHQUE3QixDQUFSO0FBQ0MsWUFBSyxDQUFMO0FBQ0MsZUFBTyxJQUFJLFlBQUosQ0FBa0IsUUFBbEIsQ0FBUDtBQUNBO0FBQ0QsWUFBSyxDQUFMO0FBQ0MsZUFBTyxJQUFJLFdBQUosQ0FBaUIsUUFBakIsQ0FBUDtBQUNBO0FBQ0Q7QUFDQyxlQUFPLElBQUksU0FBSixDQUFlLFFBQWYsQ0FBUDtBQVJGO0FBVUE7OztBQUdELHVCQUFhLFFBQWIsRUFBd0I7QUFBQTs7QUFBQSxxR0FDWixTQUFTLE1BREcsVUFDUSxTQUFTLFVBRGpCOztBQUFBLFlBdkJ4QixNQXVCd0IsR0F2QmYsR0F1QmU7QUFBQSxZQXRCeEIsVUFzQndCLEdBdEJYLGVBc0JXO0FBQUEsWUFyQnhCLFFBcUJ3QixHQXJCYixJQXFCYTs7QUFFdkIsWUFBSyxNQUFMLEdBQWMsU0FBUyxNQUF2QjtBQUNBLFlBQUssVUFBTCxHQUFrQixTQUFTLFVBQTNCO0FBQ0EsWUFBSyxRQUFMLEdBQWdCLFFBQWhCO0FBSnVCO0FBS3ZCOzs7VUFNSSxPQUFPLFc7eUJBQWU7QUFDMUIsbUJBQVcsS0FBSyxXQUFMLENBQWlCLElBQTVCLFVBQXFDLEtBQUssTUFBMUMsV0FBc0QsS0FBSyxVQUEzRDtBQUNBOzs7O0tBdEM2QixlOzs7OzJCQTRDbEIsWTs7Ozs7Ozs7OztLQUFxQixTOzs7OzBCQUdyQixXOzs7Ozs7Ozs7O0tBQW9CLFMiLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6Ii9saWIifQ==
