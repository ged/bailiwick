define(['exports', 'bluebird', './datastore', './errors', './utils'], function (exports, _bluebird, _datastore, _errors, _utils) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.RESTService = undefined;

	var _bluebird2 = _interopRequireDefault(_bluebird);

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

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
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

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
		var desc = {};
		Object['ke' + 'ys'](descriptor).forEach(function (key) {
			desc[key] = descriptor[key];
		});
		desc.enumerable = !!desc.enumerable;
		desc.configurable = !!desc.configurable;

		if ('value' in desc || desc.initializer) {
			desc.writable = true;
		}

		desc = decorators.slice().reverse().reduce(function (desc, decorator) {
			return decorator(target, property, desc) || desc;
		}, desc);

		if (context && desc.initializer !== void 0) {
			desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
			desc.initializer = undefined;
		}

		if (desc.initializer === void 0) {
			Object['define' + 'Property'](target, property, desc);
			desc = null;
		}

		return desc;
	}

	var _desc, _value, _class;

	var RESTService = exports.RESTService = (_class = function (_Datastore) {
		_inherits(RESTService, _Datastore);

		function RESTService() {
			var baseUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'http://localhost/';

			_classCallCheck(this, RESTService);

			var _this = _possibleConstructorReturn(this, (RESTService.__proto__ || Object.getPrototypeOf(RESTService)).call(this));

			if (typeof fetch === 'undefined') {
				throw new Error('RESTService requires a fetch polyfill');
			}

			if (!baseUrl.endsWith('/')) {
				baseUrl = baseUrl + '/';
			}

			_this.baseUrl = baseUrl;
			_this.httpClient = { fetch: fetch };
			return _this;
		}

		_createClass(RESTService, [{
			key: 'clone',
			value: function clone() {
				var newObj = Reflect.construct(this.constructor, [this.baseUrl]);
				newObj.httpClient = this.httpClient;
				return newObj;
			}
		}, {
			key: 'forUrl',
			value: function forUrl(newBaseUrl) {
				this.baseUrl = newBaseUrl;
			}
		}, {
			key: 'using',
			value: function using(newHttpClient) {
				this.httpClient = newHttpClient;
			}
		}, {
			key: 'sendJsonRequest',
			value: function sendJsonRequest(url) {
				var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
				var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

				var info = {
					method: method,
					body: body,
					headers: headers
				};

				if (!(url.startsWith('http:') || url.startsWith('https:'))) {
					if (url.startsWith('/')) {
						url = url.slice(1);
					}
					url = '' + this.baseUrl + url;
				}

				if (info.body && typeof body !== 'string') {
					info.body = JSON.stringify(body);
					info.headers['Content-type'] = "application/json; charset=UTF-8";
				}

				return this.httpClient.fetch(url, info).then(function (response) {
					if (!response.ok) {
						var err = _errors.HTTPError.fromResponse(response);
						return _bluebird2.default.reject(err);
					}

					var mediatype = response.headers.get('content-type');
					if (mediatype && mediatype.startsWith('application/json')) {
						(0, _utils.debug)("Got JSON response; deserializing.");
						return response.json();
					} else {
						(0, _utils.debug)("Got a %s response; using the raw text.", mediatype);
						return response.text();
					}
				});
			}
		}, {
			key: 'getInstance',
			value: function getInstance(type, id) {
				var uri = type.uri;
				if (id) {
					uri += '/' + id.toString();
				}
				return this.sendJsonRequest(uri);
			}
		}, {
			key: 'getCollection',
			value: function getCollection(type, criteria) {
				var uri = criteria.location || type.uri;
				var params = this.makeParamsFromCriteria(criteria);
				var queryString = this.queryStringFromParams(params);

				(0, _utils.debug)("GET %s params: %o", uri, params);
				if (queryString !== '') {
					uri += '?' + queryString;
				}

				return this.sendJsonRequest(uri);
			}
		}, {
			key: 'store',
			value: function store(type, data) {
				return this.sendJsonRequest(type.uri, 'POST', data);
			}
		}, {
			key: 'update',
			value: function update(type, id, data) {
				var uri = type.uri + '/' + id;
				return this.sendJsonRequest(uri, 'POST', data);
			}
		}, {
			key: 'replace',
			value: function replace(type, id, data) {
				var uri = type.uri + '/' + id;
				return this.sendJsonRequest(uri, 'PUT', data);
			}
		}, {
			key: 'remove',
			value: function remove(type, id) {
				var uri = type.uri + '/' + id;
				return this.sendJsonRequest(uri, 'DELETE');
			}
		}, {
			key: 'makeParamsFromCriteria',
			value: function makeParamsFromCriteria(criteria) {
				if (!criteria) {
					return null;
				}

				var params = new Map();

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = criteria.filterClauses[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 2),
						    key = _step$value[0],
						    val = _step$value[1];

						(0, _utils.debug)('Adding parameter ' + key + '=' + val + ' from criteria\'s filter clauses.');
						params.set(key, val);
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

				if (criteria.maxResultCount) {
					params.set('limit', criteria.maxResultCount);
				}
				if (criteria.resultOffset) {
					params.set('offset', criteria.resultOffset);
				}

				(0, _utils.debug)('Returning Map with ' + params.size + ' params');
				return params;
			}
		}, {
			key: 'queryStringFromParams',
			value: function queryStringFromParams(params) {
				(0, _utils.debug)('Making query string from ' + params.size + ' params: ', Array.from(params.entries()));

				if (!params) {
					return '';
				}

				var pairs = [];
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = params.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var _step2$value = _slicedToArray(_step2.value, 2),
						    key = _step2$value[0],
						    val = _step2$value[1];

						var encKey = encodeURIComponent(key);
						var encVal = encodeURIComponent(val);
						(0, _utils.debug)("  adding pair: %s=%s", encKey, encVal);
						pairs.push(encKey + '=' + encVal);
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

				(0, _utils.debug)("Returning query string of %d param pairs.", pairs.length);
				return pairs.join('&');
			}
		}]);

		return RESTService;
	}(_datastore.Datastore), (_applyDecoratedDescriptor(_class.prototype, 'forUrl', [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, 'forUrl'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'using', [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, 'using'), _class.prototype)), _class);
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3Qtc2VydmljZS5qcyJdLCJuYW1lcyI6WyJSRVNUU2VydmljZSIsImJhc2VVcmwiLCJmZXRjaCIsIkVycm9yIiwiZW5kc1dpdGgiLCJodHRwQ2xpZW50IiwibmV3T2JqIiwiUmVmbGVjdCIsImNvbnN0cnVjdCIsImNvbnN0cnVjdG9yIiwibmV3QmFzZVVybCIsIm5ld0h0dHBDbGllbnQiLCJ1cmwiLCJtZXRob2QiLCJib2R5IiwiaGVhZGVycyIsImluZm8iLCJzdGFydHNXaXRoIiwic2xpY2UiLCJKU09OIiwic3RyaW5naWZ5IiwidGhlbiIsInJlc3BvbnNlIiwib2siLCJlcnIiLCJmcm9tUmVzcG9uc2UiLCJyZWplY3QiLCJtZWRpYXR5cGUiLCJnZXQiLCJqc29uIiwidGV4dCIsInR5cGUiLCJpZCIsInVyaSIsInRvU3RyaW5nIiwic2VuZEpzb25SZXF1ZXN0IiwiY3JpdGVyaWEiLCJsb2NhdGlvbiIsInBhcmFtcyIsIm1ha2VQYXJhbXNGcm9tQ3JpdGVyaWEiLCJxdWVyeVN0cmluZyIsInF1ZXJ5U3RyaW5nRnJvbVBhcmFtcyIsImRhdGEiLCJNYXAiLCJmaWx0ZXJDbGF1c2VzIiwia2V5IiwidmFsIiwic2V0IiwibWF4UmVzdWx0Q291bnQiLCJyZXN1bHRPZmZzZXQiLCJzaXplIiwiQXJyYXkiLCJmcm9tIiwiZW50cmllcyIsInBhaXJzIiwiZW5jS2V5IiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiZW5jVmFsIiwicHVzaCIsImxlbmd0aCIsImpvaW4iXSwibWFwcGluZ3MiOiI7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBZ0JhQSxXLFdBQUFBLFc7OztBQUVaLHlCQUEyQztBQUFBLE9BQTlCQyxPQUE4Qix1RUFBdEIsbUJBQXNCOztBQUFBOztBQUFB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
