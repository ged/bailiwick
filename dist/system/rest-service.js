
'use strict';

System.register(['bluebird', './datastore', './errors', './utils'], function (_export, _context) {
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
		}, function (_datastore) {
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

						debug("GET %s params: %o", uri, params);
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

						debug('Returning Map with ' + params.size + ' params');
						return params;
					}
				}, {
					key: 'queryStringFromParams',
					value: function queryStringFromParams(params) {
						debug('Making query string from ' + params.size + ' params: ', Array.from(params.entries()));

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3Qtc2VydmljZS5qcyJdLCJuYW1lcyI6WyJQcm9taXNlIiwiRGF0YXN0b3JlIiwiSFRUUEVycm9yIiwiZGVidWciLCJtYXBpZnkiLCJtb25hZGljIiwiUkVTVFNlcnZpY2UiLCJiYXNlVXJsIiwiZmV0Y2giLCJFcnJvciIsImVuZHNXaXRoIiwiaHR0cENsaWVudCIsIm5ld09iaiIsIlJlZmxlY3QiLCJjb25zdHJ1Y3QiLCJjb25zdHJ1Y3RvciIsIm5ld0Jhc2VVcmwiLCJuZXdIdHRwQ2xpZW50IiwidXJsIiwibWV0aG9kIiwiYm9keSIsImhlYWRlcnMiLCJpbmZvIiwic3RhcnRzV2l0aCIsInNsaWNlIiwiSlNPTiIsInN0cmluZ2lmeSIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwiZXJyIiwiZnJvbVJlc3BvbnNlIiwicmVqZWN0IiwibWVkaWF0eXBlIiwiZ2V0IiwianNvbiIsInRleHQiLCJ0eXBlIiwiaWQiLCJ1cmkiLCJ0b1N0cmluZyIsInNlbmRKc29uUmVxdWVzdCIsImNyaXRlcmlhIiwibG9jYXRpb24iLCJwYXJhbXMiLCJtYWtlUGFyYW1zRnJvbUNyaXRlcmlhIiwicXVlcnlTdHJpbmciLCJxdWVyeVN0cmluZ0Zyb21QYXJhbXMiLCJkYXRhIiwiTWFwIiwiZmlsdGVyQ2xhdXNlcyIsImtleSIsInZhbCIsInNldCIsIm1heFJlc3VsdENvdW50IiwicmVzdWx0T2Zmc2V0Iiwic2l6ZSIsIkFycmF5IiwiZnJvbSIsImVudHJpZXMiLCJwYWlycyIsImVuY0tleSIsImVuY29kZVVSSUNvbXBvbmVudCIsImVuY1ZhbCIsInB1c2giLCJsZW5ndGgiLCJqb2luIl0sIm1hcHBpbmdzIjoiO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRU9BLFU7O0FBRUNDLFksY0FBQUEsUzs7QUFDQUMsWSxXQUFBQSxTOztBQUNBQyxRLFVBQUFBLEs7QUFBT0MsUyxVQUFBQSxNO0FB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QUosRUFBYjs7QUFIa0M7QUFBQTtBQUFBOztBQUFBO0FBS2xDLDRCQUF3QlAsU0FBU1EsYUFBakMsOEhBQWlEO0FBQUE7QUFBQSxZQUF0Q0MsR0FBc0M7QUFBQSxZQUFqQ0MsR0FBaUM7O0FBQ2hEakQsb0NBQTJCZ0QsR0FBM0IsU0FBa0NDLEdBQWxDO0FBQ0FSLGVBQU9TLEdBQVAsQ0FBWUYsR0FBWixFQUFpQkMsR0FBakI7QUFDQTtBQVJpQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVVsQyxVQUFLVixTQUFTWSxjQUFkLEVBQStCO0FBQUVWLGNBQU9TLEdBQVAsQ0FBWSxPQUFaLEVBQXFCWCxTQUFTWSxjQUE5QjtBQUFpRDtBQUNsRixVQUFLWixTQUFTYSxZQUFkLEVBQTZCO0FBQUVYLGNBQU9TLEdBQVAsQ0FBWSxRQUFaLEVBQXNCWCxTQUFTYSxZQUEvQjtBQUFnRDs7QUFFL0VwRCxvQ0FBNkJ5QyxPQUFPWSxJQUFwQztBQUNBLGFBQU9aLE1BQVA7QUFDQTs7OzJDQU1zQkEsTSxFQUFTO0FBQy9CekMsMENBQW1DeUMsT0FBT1ksSUFBMUMsZ0JBQTJEQyxNQUFNQyxJQUFOLENBQVdkLE9BQU9lLE9BQVAsRUFBWCxDQUEzRDs7QUFFQSxVQUFLLENBQUNmLE1BQU4sRUFBZTtBQUFFLGNBQU8sRUFBUDtBQUFZOztBQUU3QixVQUFJZ0IsUUFBUSxFQUFaO0FBTCtCO0FBQUE7QUFBQTs7QUFBQTtBQU0vQiw2QkFBd0JoQixPQUFPZSxPQUFQLEVBQXhCLG1JQUEyQztBQUFBO0FBQUEsWUFBaENSLEdBQWdDO0FBQUEsWUFBM0JDLEdBQTJCOztBQUMxQyxZQUFJUyxTQUFTQyxtQkFBb0JYLEdBQXBCLENBQWI7QUFDQSxZQUFJWSxTQUFTRCxtQkFBb0JWLEdBQXBCLENBQWI7QUFDQWpELGNBQU8sc0JBQVAsRUFBK0IwRCxNQUEvQixFQUF1Q0UsTUFBdkM7QUFDQUgsY0FBTUksSUFBTixDQUFlSCxNQUFmLFNBQXlCRSxNQUF6QjtBQUNBO0FBWDhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBYS9CNUQsWUFBTywyQ0FBUCxFQUFvRHlELE1BQU1LLE1BQTFEO0FBQ0EsYUFBT0wsTUFBTU0sSUFBTixDQUFZLEdBQVosQ0FBUDtBQUNBOzs7O0tBMU0rQmpFLFMsMkRBK0IvQkksTyx5SUFVQUEsTyIsImZpbGUiOiJyZXN0LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL2xpYiJ9
