
'use strict';

System.register(['bluebird', 'whatwg-fetch', './datastore', './errors', './utils'], function (_export, _context) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3Qtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVPOztBQUdDOztBQUNBOztBQUNBO0FBQU87QUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBVVY7OztBQUVaLGFBRlksV0FFWixHQUEyQztTQUE5QixnRUFBUSxtQ0FBc0I7OzJCQUYvQixhQUUrQjs7d0VBRi9CLHlCQUUrQjs7QUFHMUMsU0FBSSxPQUFPLEtBQVAsS0FBaUIsV0FBakIsRUFBOEI7QUFDakMsWUFBTSxJQUFJLEtBQUosQ0FBVSx1Q0FBVixDQUFOLENBRGlDO01BQWxDOztBQUlBLFNBQUssQ0FBQyxRQUFRLFFBQVIsQ0FBaUIsR0FBakIsQ0FBRCxFQUF5QjtBQUM3QixnQkFBVSxVQUFVLEdBQVYsQ0FEbUI7TUFBOUI7O0FBSUEsV0FBSyxPQUFMLEdBQWUsT0FBZixDQVgwQztBQVkxQyxXQUFLLFVBQUwsR0FBa0IsRUFBRSxZQUFGLEVBQWxCLENBWjBDOztLQUEzQzs7aUJBRlk7OzZCQXFCSjtBQUNQLFVBQUksU0FBUyxRQUFRLFNBQVIsQ0FBbUIsS0FBSyxXQUFMLEVBQWtCLENBQUMsS0FBSyxPQUFMLENBQXRDLENBQVQsQ0FERztBQUVQLGFBQU8sVUFBUCxHQUFvQixLQUFLLFVBQUwsQ0FGYjtBQUdQLGFBQU8sTUFBUCxDQUhPOzs7OzRCQVdBLFlBQWE7QUFDcEIsV0FBSyxPQUFMLEdBQWUsVUFBZixDQURvQjs7OzsyQkFVZCxlQUFnQjtBQUN0QixXQUFLLFVBQUwsR0FBa0IsYUFBbEIsQ0FEc0I7Ozs7cUNBVU4sS0FBMkM7VUFBdEMsK0RBQU8scUJBQStCO1VBQXhCLDZEQUFLLG9CQUFtQjtVQUFiLGdFQUFRLGtCQUFLOztBQUMzRCxVQUFJLE9BQU87QUFDVixxQkFE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LENBQXNCLEdBQXRCLEVBQTJCLFFBQTNCLENBQVAsQ0FGa0I7Ozs7NENBY0ssVUFBVztBQUNsQyxVQUFLLENBQUMsUUFBRCxFQUFZO0FBQUUsY0FBTyxJQUFQLENBQUY7T0FBakI7O0FBRUEsVUFBSSxTQUFTLElBQUksR0FBSixFQUFULENBSDhCOzs7Ozs7O0FBS2xDLDRCQUF3QixTQUFTLGFBQVQsMEJBQXhCLG9HQUFpRDs7O1lBQXRDLHFCQUFzQztZQUFqQyxxQkFBaUM7O0FBQ2hELG9DQUEyQixZQUFPLHlDQUFsQyxFQURnRDtBQUVoRCxlQUFPLEdBQVAsQ0FBWSxHQUFaLEVBQWlCLEdBQWpCLEVBRmdEO1FBQWpEOzs7Ozs7Ozs7Ozs7OztPQUxrQzs7QUFVbEMsVUFBSyxTQUFTLGNBQVQsRUFBMEI7QUFBRSxjQUFPLEdBQVAsQ0FBWSxPQUFaLEVBQXFCLFNBQVMsY0FBVCxDQUFyQixDQUFGO09BQS9CO0FBQ0EsVUFBSyxTQUFTLFlBQVQsRUFBd0I7QUFBRSxjQUFPLEdBQVAsQ0FBWSxRQUFaLEVBQXNCLFNBQVMsWUFBVCxDQUF0QixDQUFGO09BQTdCOztBQUVBLGFBQU8sTUFBUCxDQWJrQzs7OzsyQ0FvQlosUUFBUztBQUMvQixZQUFPLHFDQUFQLEVBQThDLE1BQTlDLEVBRCtCOztBQUcvQixVQUFLLENBQUMsTUFBRCxFQUFVO0FBQUUsY0FBTyxFQUFQLENBQUY7T0FBZjs7QUFFQSxVQUFJLFdBQVcsT0FBUSxNQUFSLENBQVgsQ0FMMkI7QUFNL0IsWUFBTyxrQkFBUCxFQUEyQixRQUEzQixFQU4rQjs7QUFRL0IsVUFBSSxRQUFRLEVBQVIsQ0FSMkI7Ozs7OztBQVMvQiw2QkFBd0IsbUNBQXhCLHdHQUFtQzs7O1lBQXhCLHNCQUF3QjtZQUFuQixzQkFBbUI7O0FBQ2xDLFlBQUksU0FBUyxtQkFBb0IsR0FBcEIsQ0FBVCxDQUQ4QjtBQUVsQyxZQUFJLFNBQVMsbUJBQW9CLEdBQXBCLENBQVQsQ0FGOEI7QUFHbEMsY0FBTyxzQkFBUCxFQUErQixNQUEvQixFQUF1QyxNQUF2QyxFQUhrQztBQUlsQyxjQUFNLElBQU4sQ0FBZSxlQUFVLE1BQXpCLEVBSmtDO1FBQW5DOzs7Ozs7Ozs7Ozs7OztPQVQrQjs7QUFnQi9CLFlBQU8sMkNBQVAsRUFBb0QsTUFBTSxNQUFOLENBQXBELENBaEIrQjtBQWlCL0IsYUFBTyxNQUFNLElBQU4sQ0FBWSxHQUFaLENBQVAsQ0FqQitCOzs7O1dBMUxwQjtLQUFvQixvRUErQi9CLGdKQVVBIiwiZmlsZSI6InJlc3Qtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIvbGliIn0=
