
'use strict';

System.register(['bluebird', 'whatwg-fetch', './datastore', './errors', './utils'], function (_export, _context) {
	"use strict";

	var Promise, Datastore, HTTPError, debug, mapify, monadic, _slicedToArray, _createClass, _desc, _value, _class, RESTService;

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

	return {
		setters: [function (_bluebird) {
			Promise = _bluebird.default;
		}, function (_whatwgFetch) {}, function (_datastore) {
			Datastore = _datastore.Datastore;
		}, function (_errors) {
			HTTPError = _errors.HTTPError;
		}, function (_utils) {
			debug = _utils.debug;
			mapify = _utils.mapify;
			monadic = _utils.monadic;
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

			_export('RESTService', RESTService = (_class = function (_Datastore) {
				_inherits(RESTService, _Datastore);

				function RESTService() {
					var baseUrl = arguments.length <= 0 || arguments[0] === undefined ? 'http://localhost/' : arguments[0];

					_classCallCheck(this, RESTService);

					var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RESTService).call(this));

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
						var method = arguments.length <= 1 || arguments[1] === undefined ? 'GET' : arguments[1];
						var body = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
						var headers = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

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
								var err = HTTPError.fromResponse(response);
								return Promise.reject(err);
							}

							var mediatype = response.headers.get('content-type');
							if (mediatype && mediatype.startsWith('application/json')) {
								debug("Got JSON response; deserializing.");
								return response.json();
							} else {
								debug("Got a %s response; using the raw text.", mediatype);
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

						console.info("GET %s params: %o", uri, params);
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
								var _step$value = _slicedToArray(_step.value, 2);

								var key = _step$value[0];
								var val = _step$value[1];

								debug('Adding parameter ' + key + '=' + val + ' from criteria\'s filter clauses.');
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

						return params;
					}
				}, {
					key: 'queryStringFromParams',
					value: function queryStringFromParams(params) {
						debug("Making query string from params: %o", params);

						if (!params) {
							return '';
						}

						var paramMap = mapify(params);
						debug("Param map is: %o", paramMap);

						var pairs = [];
						var _iteratorNormalCompletion2 = true;
						var _didIteratorError2 = false;
						var _iteratorError2 = undefined;

						try {
							for (var _iterator2 = paramMap[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
								var _step2$value = _slicedToArray(_step2.value, 2);

								var key = _step2$value[0];
								var val = _step2$value[1];

								var encKey = encodeURIComponent(key);
								var encVal = encodeURIComponent(val);
								debug("  adding pair: %s=%s", encKey, encVal);
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

						debug("Returning query string of %d param pairs.", pairs.length);
						return pairs.join('&');
					}
				}]);

				return RESTService;
			}(Datastore), (_applyDecoratedDescriptor(_class.prototype, 'forUrl', [monadic], Object.getOwnPropertyDescriptor(_class.prototype, 'forUrl'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'using', [monadic], Object.getOwnPropertyDescriptor(_class.prototype, 'using'), _class.prototype)), _class));

			_export('RESTService', RESTService);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3Qtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRU8sVTs7QUFHQyxZLGNBQUEsUzs7QUFDQSxZLFdBQUEsUzs7QUFDQSxRLFVBQUEsSztBQUFPLFMsVUFBQSxNO0FBQVEsVSxVQUFBLE87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQVVWLFc7OztBQUVaLDJCQUEyQztBQUFBLFNBQTlCLE9BQThCLHlEQUF0QixtQkFBc0I7O0FBQUE7O0FBQUE7O0FBRzFDLFNBQUksT0FBTyxLQUFQLEtBQWlCLFdBQXJCLEVBQWtDO0FBQ2pDLFlBQU0sSUFBSSxLQUFKLENBQVUsdUNBQVYsQ0FBTjtBQUNBOztBQUVELFNBQUssQ0FBQyxRQUFRLFFBQVIsQ0FBaUIsR0FBakIsQ0FBTixFQUE4QjtBQUM3QixnQkFBVSxVQUFVLEdBQXBCO0FBQ0E7O0FBRUQsV0FBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLFdBQUssVUFBTCxHQUFrQixFQUFFLFlBQUYsRUFBbEI7QUFaMEM7QUFhMUM7Ozs7NkJBTU87QUFDUCxVQUFJLFNBQVMsUUFBUSxTQUFSLENBQW1CLEtBQUssV0FBeEIsRUFBcUMsQ0FBQyxLQUFLLE9BQU4sQ0FBckMsQ0FBYjtBQUNBLGFBQU8sVUFBUCxHQUFvQixLQUFLLFVBQXpCO0FBQ0EsYUFBTyxNQUFQO0FBQ0E7Ozs0QkFPTyxVLEVBQWE7QUFDcEIsV0FBSyxPQUFMLEdBQWUsVUFBZjtBQUNBOzs7MkJBUU0sYSxFQUFnQjtBQUN0QixXQUFLLFVBQUwsR0FBa0IsYUFBbEI7QUFDQTs7O3FDQVFnQixHLEVBQTJDO0FBQUEsVUFBdEMsTUFBc0MseURBQS9CLEtBQStCO0FBQUEsVUFBeEIsSUFBd0IseURBQW5CLElBQW1CO0FBQUEsVUFBYixPQUFhLHlE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RUFBaUI7QUFBRSxjQUFPLElBQVA7QUFBYzs7QUFFakMsVUFBSSxTQUFTLElBQUksR0FBSixFQUFiOztBQUhrQztBQUFBO0FBQUE7O0FBQUE7QUFLbEMsNEJBQXdCLFNBQVMsYUFBakMsOEhBQWlEO0FBQUE7O0FBQUEsWUFBdEMsR0FBc0M7QUFBQSxZQUFqQyxHQUFpQzs7QUFDaEQsb0NBQTJCLEdBQTNCLFNBQWtDLEdBQWxDO0FBQ0EsZUFBTyxHQUFQLENBQVksR0FBWixFQUFpQixHQUFqQjtBQUNBO0FBUmlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBVWxDLFVBQUssU0FBUyxjQUFkLEVBQStCO0FBQUUsY0FBTyxHQUFQLENBQVksT0FBWixFQUFxQixTQUFTLGNBQTlCO0FBQWlEO0FBQ2xGLFVBQUssU0FBUyxZQUFkLEVBQTZCO0FBQUUsY0FBTyxHQUFQLENBQVksUUFBWixFQUFzQixTQUFTLFlBQS9CO0FBQWdEOztBQUUvRSxhQUFPLE1BQVA7QUFDQTs7OzJDQU1zQixNLEVBQVM7QUFDL0IsWUFBTyxxQ0FBUCxFQUE4QyxNQUE5Qzs7QUFFQSxVQUFLLENBQUMsTUFBTixFQUFlO0FBQUUsY0FBTyxFQUFQO0FBQVk7O0FBRTdCLFVBQUksV0FBVyxPQUFRLE1BQVIsQ0FBZjtBQUNBLFlBQU8sa0JBQVAsRUFBMkIsUUFBM0I7O0FBRUEsVUFBSSxRQUFRLEVBQVo7QUFSK0I7QUFBQTtBQUFBOztBQUFBO0FBUy9CLDZCQUF3QixRQUF4QixtSUFBbUM7QUFBQTs7QUFBQSxZQUF4QixHQUF3QjtBQUFBLFlBQW5CLEdBQW1COztBQUNsQyxZQUFJLFNBQVMsbUJBQW9CLEdBQXBCLENBQWI7QUFDQSxZQUFJLFNBQVMsbUJBQW9CLEdBQXBCLENBQWI7QUFDQSxjQUFPLHNCQUFQLEVBQStCLE1BQS9CLEVBQXVDLE1BQXZDO0FBQ0EsY0FBTSxJQUFOLENBQWUsTUFBZixTQUF5QixNQUF6QjtBQUNBO0FBZDhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBZ0IvQixZQUFPLDJDQUFQLEVBQW9ELE1BQU0sTUFBMUQ7QUFDQSxhQUFPLE1BQU0sSUFBTixDQUFZLEdBQVosQ0FBUDtBQUNBOzs7O0tBNU0rQixTLDJEQStCL0IsTyx5SUFVQSxPIiwiZmlsZSI6InJlc3Qtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIvbGliIn0=
