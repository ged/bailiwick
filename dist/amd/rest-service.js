define(['exports', 'bluebird', './datastore', './errors', './utils', 'whatwg-fetch'], function (exports, _bluebird, _datastore, _errors, _utils) {
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

				return params;
			}
		}, {
			key: 'queryStringFromParams',
			value: function queryStringFromParams(params) {
				(0, _utils.debug)("Making query string from params: %o", params);

				if (!params) {
					return '';
				}

				var paramMap = (0, _utils.mapify)(params);
				(0, _utils.debug)("Param map is: %o", paramMap);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3Qtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQWlCYTs7O0FBRVosV0FGWSxXQUVaLEdBQTJDO09BQTlCLGdFQUFRLG1DQUFzQjs7eUJBRi9CLGFBRStCOztzRUFGL0IseUJBRStCOztBQUcxQyxPQUFJLE9BQU8sS0FBUCxLQUFpQixXQUFqQixFQUE4QjtBQUNqQyxVQUFNLElBQUksS0FBSixDQUFVLHVDQUFWLENBQU4sQ0FEaUM7SUFBbEM7O0FBSUEsT0FBSyxDQUFDLFFBQVEsUUFBUixDQUFpQixHQUFqQixDQUFELEVBQXlCO0FBQzdCLGNBQVUsVUFBVSxHQUFWLENBRG1CO0lBQTlCOztBQUlBLFNBQUssT0FBTCxHQUFlLE9BQWYsQ0FYMEM7QUFZMUMsU0FBSyxVQUFMLEdBQWtCLEVBQUUsWUFBRixFQUFsQixDQVowQzs7R0FBM0M7O2VBRlk7OzJCQXFCSjtBQUNQLFFBQUksU0FBUyxRQUFRLFNBQVIsQ0FBbUIsS0FBSyxXQUFMLEVBQWtCLENBQUMsS0FBSyxPQUFMLENBQXRDLENBQVQsQ0FERztBQUVQLFdBQU8sVUFBUCxHQUFvQixLQUFLLFVBQUwsQ0FGYjtBQUdQLFdBQU8sTUFBUCxDQUhPOzs7OzBCQVdBLFlBQWE7QUFDcEIsU0FBSyxPQUFMLEdBQWUsVUFBZixDQURvQjs7Ozt5QkFVZCxlQUFnQjtBQUN0QixTQUFLLFVBQUwsR0FBa0IsYUFBbEIsQ0FEc0I7Ozs7bUNBVU4sS0FBMkM7UUFBdEMsK0RBQU8scUJBQStCO1FBQXhCLDZEQUFLLG9CQUFtQjtRQUFiLGdFQUFRLGtCQUFLOztBQUMzRCxRQUFJLE9BQU87QUFDVixtQkFEVTtBQUVWLGVBRlU7QUFHVixxQkFIVTtLQUFQLENBRHVEOztBQU8zRCxRQUFLLEVBQUUsSUFBSSxVQUFKLENBQWUsT0FBZixLQUEyQixJQUFJLFVBQUosQ0FBZSxRQUFmLENBQTNCLENBQUYsRUFBeUQ7QUFDN0QsU0FBSyxJQUFJLFVBQUosQ0FBZSxHQUFmLENBQUwsRUFBMkI7QUFBRSxZQUFNLElBQUksS0FBSixDQUFVLENBQVYsQ0FBTixDQUFGO01BQTNCO0FBQ0EsZ0JBQVMsS0FBSyxPQUFMLEdBQWUsR0FBeEIsQ0FGNkQ7S0FBOUQ7O0FBS0EsUUFBSyxLQUFLLElBQUwsSUFBYSxPQUFPLElBQVAsS0FBZ0IsUUFBaEIsRUFBMkI7QUFDNUMsVUFBSyxJQUFMLEdBQVksS0FBSyxTQUFMLENBQWdCLElBQWhCLENBQVosQ0FENEM7QUFFNUMsVUFBSyxPQUFMLENBQWMsY0FBZCxJQUFpQyxpQ0FBakMsQ0FGNEM7S0FBN0M7O0FBS0EsV0FBTyxLQUFLLFVBQUwsQ0FDTixLQURNLENBQ0MsR0FERCxFQUNNLElBRE4sRUFFTixJQUZNLENBRUEsb0JBQVk7QUFDakIsU0FBSyxDQUFDLFNBQVMsRUFBVCxFQUFjO0FBQ25CLFVBQUksTUFBTSxrQkFBVSxZQUFWLENBQXdCLFFBQXhCLENBQU4sQ0FEZTtBQUVuQixhQUFPLG1CQUFRLE1BQVIsQ0FBZ0IsR0FBaEIsQ0FBUCxDQUZtQjtNQUFwQjs7QUFLQSxTQUFJLFlBQVksU0FBUyxPQUFULENBQWlCLEdBQWpCLENBQXNCLGNBQXRCLENBQVosQ0FOYTtBQU9qQixTQUFLLGFBQWEsVUFBVSxVQUFWLENBQXFCLGtCQUFyQixDQUFiLEVBQXdEO0FBQzVELHdCQUFPLG1DQUFQLEVBRDREO0FBRTVELGFBQU8sU0FBUyxJQUFULEVBQVAsQ0FGNEQ7TUFBN0QsTUFHTztBQUNOLHdCQUFPLHdDQUFQLEVBQWlELFNBQWpELEVBRE07QUFFTixhQUFPLFNBQVMsSUFBVCxFQUFQLENBRk07TUFIUDtLQVBLLENBRlAsQ0FqQjJEOzs7OytCQXlDL0MsTUFBTSxJQUFLO0FBQ3ZCLFFBQUksTUFBTSxLQUFLLEdBQUwsQ0FEYTtBQUV2QixRQUFLLEVBQUwsRUFBVTtBQUFFLFlBQU8sTUFBTSxHQUFHLFFBQUgsRUFBTixDQUFUO0tBQVY7QUFDQSxXQUFPLEtBQUssZUFBTCxDQUFzQixHQUF0QixDQUFQLENBSHVCOzs7O2lDQVlULE1BQU0sVUFBVztBQUMvQixRQUFJLE1BQU0sU0FBUyxRQUFULElBQXFCLEtBQUssR0FBTCxDQURBO0FBRS9CLFFBQUksU0FBUyxLQUFLLHNCQUFMLENBQTZCLFFBQTdCLENBQVQsQ0FGMkI7QUFHL0IsUUFBSSxjQUFjLEtBQUsscUJBQUwsQ0FBNEIsTUFBNUIsQ0FBZCxDQUgyQjs7QUFLL0IsWUFBUSxJQUFSLENBQWMsbUJBQWQsRUFBbUMsR0FBbkMsRUFBd0MsTUFBeEMsRUFMK0I7QUFNL0IsUUFBSyxnQkFBZ0IsRUFBaEIsRUFBcUI7QUFDekIsWUFBTyxNQUFNLFdBQU4sQ0FEa0I7S0FBMUI7O0FBSUEsV0FBTyxLQUFLLGVBQUwsQ0FBc0IsR0FBdEIsQ0FBUCxDQVYrQjs7Ozt5QkFrQnpCLE1BQU0sTUFBTztBQUNuQixXQUFPLEtBQUssZUFBTCxDQUFzQixLQUFLLEdBQUwsRUFBVSxNQUFoQyxFQUF3QyxJQUF4QyxDQUFQLENBRG1COzs7OzBCQVNaLE1BQU0sSUFBSSxNQUFPO0FBQ3hCLFFBQUksTUFBUyxLQUFLLEdBQUwsU0FBWSxFQUFyQixDQURvQjtBQUV4QixXQUFPLEtBQUssZUFBTCxDQUFzQixHQUF0QixFQUEyQixNQUEzQixFQUFtQyxJQUFuQyxDQUFQLENBRndCOzs7OzJCQVVoQixNQUFNLElBQUksTUFBTztBQUN6QixRQUFJLE1BQVMsS0FBSyxHQUFMLFNBQVksRUFBckIsQ0FEcUI7QUFFekIsV0FBTyxLQUFLLGVBQUwsQ0FBc0IsR0FBdEIsRUFBMkIsS0FBM0IsRUFBa0MsSUFBbEMsQ0FBUCxDQUZ5Qjs7OzswQkFVbEIsTUFBTSxJQUFLO0FBQ2xCLFFBQUksTUFBUyxLQUFLLEdBQUwsU0FBWSxFQUFyQixDQURjO0FBRWxCLFdBQU8sS0FBSyxlQUFMLENBQXNCLEdBQXRCLEVBQTJCLFFBQTNCLENBQVAsQ0FGa0I7Ozs7MENBY0ssVUFBVztBQUNsQyxRQUFLLENBQUMsUUFBRCxFQUFZO0FBQUUsWUFBTyxJQUFQLENBQUY7S0FBakI7O0FBRUEsUUFBSSxTQUFTLElBQUksR0FBSixFQUFULENBSDhCOzs7Ozs7O0FBS2xDLDBCQUF3QixTQUFTLGFBQVQsMEJBQXhCLG9HQUFpRDs7O1VBQXRDLHFCQUFzQztVQUFqQyxxQkFBaUM7O0FBQ2hELDhDQUEyQixZQUFPLHlDQUFsQyxFQURnRDtBQUVoRCxhQUFPLEdBQVAsQ0FBWSxHQUFaLEVBQWlCLEdBQWpCLEVBRmdEO01BQWpEOzs7Ozs7Ozs7Ozs7OztLQUxrQzs7QUFVbEMsUUFBSyxTQUFTLGNBQVQsRUFBMEI7QUFBRSxZQUFPLEdBQVAsQ0FBWSxPQUFaLEVBQXFCLFNBQVMsY0FBVCxDQUFyQixDQUFGO0tBQS9CO0FBQ0EsUUFBSyxTQUFTLFlBQVQsRUFBd0I7QUFBRSxZQUFPLEdBQVAsQ0FBWSxRQUFaLEVBQXNCLFNBQVMsWUFBVCxDQUF0QixDQUFGO0tBQTdCOztBQUVBLFdBQU8sTUFBUCxDQWJrQzs7Ozt5Q0FvQlosUUFBUztBQUMvQixzQkFBTyxxQ0FBUCxFQUE4QyxNQUE5QyxFQUQrQjs7QUFHL0IsUUFBSyxDQUFDLE1BQUQsRUFBVTtBQUFFLFlBQU8sRUFBUCxDQUFGO0tBQWY7O0FBRUEsUUFBSSxXQUFXLG1CQUFRLE1BQVIsQ0FBWCxDQUwyQjtBQU0vQixzQkFBTyxrQkFBUCxFQUEyQixRQUEzQixFQU4rQjs7QUFRL0IsUUFBSSxRQUFRLEVBQVIsQ0FSMkI7Ozs7OztBQVMvQiwyQkFBd0IsbUNBQXhCLHdHQUFtQzs7O1VBQXhCLHNCQUF3QjtVQUFuQixzQkFBbUI7O0FBQ2xDLFVBQUksU0FBUyxtQkFBb0IsR0FBcEIsQ0FBVCxDQUQ4QjtBQUVsQyxVQUFJLFNBQVMsbUJBQW9CLEdBQXBCLENBQVQsQ0FGOEI7QUFHbEMsd0JBQU8sc0JBQVAsRUFBK0IsTUFBL0IsRUFBdUMsTUFBdkMsRUFIa0M7QUFJbEMsWUFBTSxJQUFOLENBQWUsZUFBVSxNQUF6QixFQUprQztNQUFuQzs7Ozs7Ozs7Ozs7Ozs7S0FUK0I7O0FBZ0IvQixzQkFBTywyQ0FBUCxFQUFvRCxNQUFNLE1BQU4sQ0FBcEQsQ0FoQitCO0FBaUIvQixXQUFPLE1BQU0sSUFBTixDQUFZLEdBQVosQ0FBUCxDQWpCK0I7Ozs7U0ExTHBCIiwiZmlsZSI6InJlc3Qtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIvbGliIn0=
