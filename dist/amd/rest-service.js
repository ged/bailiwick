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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3Qtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQWlCYSxXLFdBQUEsVzs7O0FBRVoseUJBQTJDO0FBQUEsT0FBOUIsT0FBOEIseURBQXRCLG1CQUFzQjs7QUFBQTs7QUFBQTs7QUFHMUMsT0FBSSxPQUFPLEtBQVAsS0FBaUIsV0FBckIsRUFBa0M7QUFDakMsVUFBTSxJQUFJLEtBQUosQ0FBVSx1Q0FBVixDQUFOO0FBQ0E7O0FBRUQsT0FBSyxDQUFDLFFBQVEsUUFBUixDQUFpQixHQUFqQixDQUFOLEVBQThCO0FBQzdCLGNBQVUsVUFBVSxHQUFwQjtBQUNBOztBQUVELFNBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxTQUFLLFVBQUwsR0FBa0IsRUFBRSxZQUFGLEVBQWxCO0FBWjBDO0FBYTFDOzs7OzJCQU1PO0FBQ1AsUUFBSSxTQUFTLFFBQVEsU0FBUixDQUFtQixLQUFLLFdBQXhCLEVBQXFDLENBQUMsS0FBSyxPQUFOLENBQXJDLENBQWI7QUFDQSxXQUFPLFVBQVAsR0FBb0IsS0FBSyxVQUF6QjtBQUNBLFdBQU8sTUFBUDtBQUNBOzs7MEJBT08sVSxFQUFhO0FBQ3BCLFNBQUssT0FBTCxHQUFlLFVBQWY7QUFDQTs7O3lCQVFNLGEsRUFBZ0I7QUFDdEIsU0FBSyxVQUFMLEdBQWtCLGFBQWxCO0FBQ0E7OzttQ0FRZ0IsRyxFQUEyQztBQUFBLFFBQXRDLE1BQXNDLHlEQUEvQixLQUErQjtBQUFBLFFBQXhCLElBQXdCLHlEQUFuQixJQUFtQjtBQUFBLFFBQWIsT0FBYSx5REFBTCxFQUFLOztBQUMzRCxRQUFJLE9BQU87QUFDVixtQkFEVTtBQUVWLGVBRlU7QUFHVjtBQUhVLEtBQVg7O0FBTUEsUUFBSyxFQUFFLElBQUksVUFBSixDQUFlLE9BQWYsS0FBMkIsSUFBSSxVQUFKLENBQWUsUUFBZixDQUE3QixDQUFMLEVBQThEO0FBQzdELFNBQUssSUFBSSxVQUFKLENBQWUsR0FBZixDQUFMLEVBQTJCO0FBQUUsWUFBTSxJQUFJLEtBQUosQ0FBVSxDQUFWLENBQU47QUFBcUI7QUFDbEQsZ0JBQVMsS0FBSyxPQUFkLEdBQXdCLEdBQXhCO0FBQ0E7O0FBRUQsUUFBSyxLQUFLLElBQUwsSUFBYSxPQUFPLElBQVAsS0FBZ0IsUUFBbEMsRUFBNkM7QUFDNUMsVUFBSyxJQUFMLEdBQVksS0FBSyxTQUFMLENBQWdCLElBQWhCLENBQVo7QUFDQSxVQUFLLE9BQUwsQ0FBYyxjQUFkLElBQWlDLGlDQUFqQztBQUNBOztBQUVELFdBQU8sS0FBSyxVQUFMLENBQ04sS0FETSxDQUNDLEdBREQsRUFDTSxJQUROLEVBRU4sSUFGTSxDQUVBLG9CQUFZO0FBQ2pCLFNBQUssQ0FBQyxTQUFTLEVBQWYsRUFBb0I7QUFDbkIsVUFBSSxNQUFNLGtCQUFVLFlBQVYsQ0FBd0IsUUFBeEIsQ0FBVjtBQUNBLGFBQU8sbUJBQVEsTUFBUixDQUFnQixHQUFoQixDQUFQO0FBQ0E7O0FBRUQsU0FBSSxZQUFZLFNBQVMsT0FBVCxDQUFpQixHQUFqQixDQUFzQixjQUF0QixDQUFoQjtBQUNBLFNBQUssYUFBYSxVQUFVLFVBQVYsQ0FBcUIsa0JBQXJCLENBQWxCLEVBQTZEO0FBQzVELHdCQUFPLG1DQUFQO0FBQ0EsYUFBTyxTQUFTLElBQVQsRUFBUDtBQUNBLE1BSEQsTUFHTztBQUNOLHdCQUFPLHdDQUFQLEVBQWlELFNBQWpEO0FBQ0EsYUFBTyxTQUFTLElBQVQsRUFBUDtBQUNBO0FBQ0QsS0FoQkssQ0FBUDtBQWlCQTs7OytCQU9ZLEksRUFBTSxFLEVBQUs7QUFDdkIsUUFBSSxNQUFNLEtBQUssR0FBZjtBQUNBLFFBQUssRUFBTCxFQUFVO0FBQUUsWUFBTyxNQUFNLEdBQUcsUUFBSCxFQUFiO0FBQTZCO0FBQ3pDLFdBQU8sS0FBSyxlQUFMLENBQXNCLEdBQXRCLENBQVA7QUFDQTs7O2lDQVFjLEksRUFBTSxRLEVBQVc7QUFDL0IsUUFBSSxNQUFNLFNBQVMsUUFBVCxJQUFxQixLQUFLLEdBQXBDO0FBQ0EsUUFBSSxTQUFTLEtBQUssc0JBQUwsQ0FBNkIsUUFBN0IsQ0FBYjtBQUNBLFFBQUksY0FBYyxLQUFLLHFCQUFMLENBQTRCLE1BQTVCLENBQWxCOztBQUVBLFlBQVEsSUFBUixDQUFjLG1CQUFkLEVBQW1DLEdBQW5DLEVBQXdDLE1BQXhDO0FBQ0EsUUFBSyxnQkFBZ0IsRUFBckIsRUFBMEI7QUFDekIsWUFBTyxNQUFNLFdBQWI7QUFDQTs7QUFFRCxXQUFPLEtBQUssZUFBTCxDQUFzQixHQUF0QixDQUFQO0FBQ0E7Ozt5QkFPTSxJLEVBQU0sSSxFQUFPO0FBQ25CLFdBQU8sS0FBSyxlQUFMLENBQXNCLEtBQUssR0FBM0IsRUFBZ0MsTUFBaEMsRUFBd0MsSUFBeEMsQ0FBUDtBQUNBOzs7MEJBT08sSSxFQUFNLEUsRUFBSSxJLEVBQU87QUFDeEIsUUFBSSxNQUFTLEtBQUssR0FBZCxTQUFxQixFQUF6QjtBQUNBLFdBQU8sS0FBSyxlQUFMLENBQXNCLEdBQXRCLEVBQTJCLE1BQTNCLEVBQW1DLElBQW5DLENBQVA7QUFDQTs7OzJCQU9RLEksRUFBTSxFLEVBQUksSSxFQUFPO0FBQ3pCLFFBQUksTUFBUyxLQUFLLEdBQWQsU0FBcUIsRUFBekI7QUFDQSxXQUFPLEtBQUssZUFBTCxDQUFzQixHQUF0QixFQUEyQixLQUEzQixFQUFrQyxJQUFsQyxDQUFQO0FBQ0E7OzswQkFPTyxJLEVBQU0sRSxFQUFLO0FBQ2xCLFFBQUksTUFBUyxLQUFLLEdBQWQsU0FBcUIsRUFBekI7QUFDQSxXQUFPLEtBQUssZUFBTCxDQUFzQixHQUF0QixFQUEyQixRQUEzQixDQUFQO0FBQ0E7OzswQ0FXdUIsUSxFQUFXO0FBQ2xDLFFBQUssQ0FBQyxRQUFOLEVBQWlCO0FBQUUsWUFBTyxJQUFQO0FBQWM7O0FBRWpDLFFBQUksU0FBUyxJQUFJLEdBQUosRUFBYjs7QUFIa0M7QUFBQTtBQUFBOztBQUFBO0FBS2xDLDBCQUF3QixTQUFTLGFBQWpDLDhIQUFpRDtBQUFBOztBQUFBLFVBQXRDLEdBQXNDO0FBQUEsVUFBakMsR0FBaUM7O0FBQ2hELDhDQUEyQixHQUEzQixTQUFrQyxHQUFsQztBQUNBLGFBQU8sR0FBUCxDQUFZLEdBQVosRUFBaUIsR0FBakI7QUFDQTtBQVJpQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVVsQyxRQUFLLFNBQVMsY0FBZCxFQUErQjtBQUFFLFlBQU8sR0FBUCxDQUFZLE9BQVosRUFBcUIsU0FBUyxjQUE5QjtBQUFpRDtBQUNsRixRQUFLLFNBQVMsWUFBZCxFQUE2QjtBQUFFLFlBQU8sR0FBUCxDQUFZLFFBQVosRUFBc0IsU0FBUyxZQUEvQjtBQUFnRDs7QUFFL0UsV0FBTyxNQUFQO0FBQ0E7Ozt5Q0FNc0IsTSxFQUFTO0FBQy9CLHNCQUFPLHFDQUFQLEVBQThDLE1BQTlDOztBQUVBLFFBQUssQ0FBQyxNQUFOLEVBQWU7QUFBRSxZQUFPLEVBQVA7QUFBWTs7QUFFN0IsUUFBSSxXQUFXLG1CQUFRLE1BQVIsQ0FBZjtBQUNBLHNCQUFPLGtCQUFQLEVBQTJCLFFBQTNCOztBQUVBLFFBQUksUUFBUSxFQUFaO0FBUitCO0FBQUE7QUFBQTs7QUFBQTtBQVMvQiwyQkFBd0IsUUFBeEIsbUlBQW1DO0FBQUE7O0FBQUEsVUFBeEIsR0FBd0I7QUFBQSxVQUFuQixHQUFtQjs7QUFDbEMsVUFBSSxTQUFTLG1CQUFvQixHQUFwQixDQUFiO0FBQ0EsVUFBSSxTQUFTLG1CQUFvQixHQUFwQixDQUFiO0FBQ0Esd0JBQU8sc0JBQVAsRUFBK0IsTUFBL0IsRUFBdUMsTUFBdkM7QUFDQSxZQUFNLElBQU4sQ0FBZSxNQUFmLFNBQXlCLE1BQXpCO0FBQ0E7QUFkOEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFnQi9CLHNCQUFPLDJDQUFQLEVBQW9ELE1BQU0sTUFBMUQ7QUFDQSxXQUFPLE1BQU0sSUFBTixDQUFZLEdBQVosQ0FBUDtBQUNBIiwiZmlsZSI6InJlc3Qtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIvbGliIn0=
