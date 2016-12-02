
'use strict';

System.register(['bluebird', './datastore', './utils'], function (_export, _context) {
	"use strict";

	var Promise, Datastore, debug, _slicedToArray, _typeof, _createClass, NullDatastore;

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
		setters: [function (_bluebird) {
			Promise = _bluebird.default;
		}, function (_datastore) {
			Datastore = _datastore.Datastore;
		}, function (_utils) {
			debug = _utils.debug;
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

			_typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			};

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

			_export('NullDatastore', NullDatastore = function (_Datastore) {
				_inherits(NullDatastore, _Datastore);

				function NullDatastore() {
					_classCallCheck(this, NullDatastore);

					var _this = _possibleConstructorReturn(this, (NullDatastore.__proto__ || Object.getPrototypeOf(NullDatastore)).call(this));

					_this.objects = new Map();
					_this.ids = new Map();
					return _this;
				}

				_createClass(NullDatastore, [{
					key: 'getCollectionForType',
					value: function getCollectionForType(type) {
						if (!this.objects.has(type)) {
							debug("ObjectStore doesn't have a %s collection; creating one.", type);
							this.objects.set(type, new Map());
							this.ids.set(type, 0);
						}

						return this.objects.get(type);
					}
				}, {
					key: 'getInstance',
					value: function getInstance(type, id) {
						debug('Getting instance ' + id + ' of ' + type.name);
						var collection = this.getCollectionForType(type);

						if (collection.has(id)) {
							return Promise.resolve(collection.get(id));
						} else {
							return Promise.reject(new Error('No such ' + type.name + ' ID=' + id));
						}
					}
				}, {
					key: 'getCollection',
					value: function getCollection(type, criteria) {
						debug('Getting %s collection matching: %o', type.name, criteria);
						var collection = this.getCollectionForType(type);
						var results = void 0;

						if (criteria) {
							debug("Filtered fetch over collection of %d objects!", collection.size);
							var matches = this.findMatchingObjects(collection, criteria);
							debug("Found %d matches: %o", matches.length, matches);
							results = Array.from(matches);
						} else {
							debug("Unfiltered fetch!");
							results = Array.from(collection.values());
						}

						debug('result is a ' + (typeof results === 'undefined' ? 'undefined' : _typeof(results)));
						return Promise.resolve(results);
					}
				}, {
					key: 'findMatchingObjects',
					value: function findMatchingObjects(collection, criteria) {
						var filterFunc = this.makeFilterFunction(criteria);
						var matches = [];

						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;

						try {
							for (var _iterator = collection.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var obj = _step.value;

								if (filterFunc(obj)) {
									matches.push(obj);
								}
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

						return matches;
					}
				}, {
					key: 'makeFilterFunction',
					value: function makeFilterFunction(criteria) {
						var clauses = [];

						if (criteria.filterClauses) {
							var _iteratorNormalCompletion2 = true;
							var _didIteratorError2 = false;
							var _iteratorError2 = undefined;

							try {
								for (var _iterator2 = criteria.filterClauses.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
									var key = _step2.value;

									clauses.push([key, criteria.filterClauses.get(key)]);
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
						}

						return function (obj) {
							return clauses.every(function (pair) {
								var _pair = _slicedToArray(pair, 2),
								    key = _pair[0],
								    val = _pair[1];

								return obj[key] === val;
							});
						};
					}
				}, {
					key: 'store',
					value: function store(type, data) {
						var collection = this.getCollectionForType(type);
						var id = this.ids.get(type) + 1;
						this.ids.set(type, id);

						debug('Storing ' + type.name + ' ID=' + id);
						collection.set(id, data);
						return Promise.resolve(id);
					}
				}, {
					key: 'update',
					value: function update(type, id, data) {
						var collection = this.getCollectionForType(type);
						var current = collection.get(id);

						if (!current) {
							return Promise.reject(new Error('No such ' + type.name + ' ID=' + id));
						}

						debug('Merging ' + type.name + ' ID=' + id);
						Object.assign(current, data);

						return Promise.resolve(current);
					}
				}, {
					key: 'replace',
					value: function replace(type, id, data) {
						var collection = this.getCollectionForType(type);
						var current = collection.get(id);
						collection.set(id, data);
						return Promise.resolve(current);
					}
				}, {
					key: 'remove',
					value: function remove(type, id) {
						var collection = this.getCollectionForType(type);
						var result = collection.delete(id);
						return Promise.resolve(result);
					}
				}, {
					key: '_clear',
					value: function _clear() {
						this.objects.clear();
					}
				}]);

				return NullDatastore;
			}(Datastore));

			_export('NullDatastore', NullDatastore);
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm51bGwtZGF0YXN0b3JlLmpzIl0sIm5hbWVzIjpbIlByb21pc2UiLCJEYXRhc3RvcmUiLCJkZWJ1ZyIsIk51bGxEYXRhc3RvcmUiLCJvYmplY3RzIiwiTWFwIiwiaWRzIiwidHlwZSIsImhhcyIsInNldCIsImdldCIsImlkIiwibmFtZSIsImNvbGxlY3Rpb24iLCJnZXRDb2xsZWN0aW9uRm9yVHlwZSIsInJlc29sdmUiLCJyZWplY3QiLCJFcnJvciIsImNyaXRlcmlhIiwicmVzdWx0cyIsInNpemUiLCJtYXRjaGVzIiwiZmluZE1hdGNoaW5nT2JqZWN0cyIsImxlbmd0aCIsIkFycmF5IiwiZnJvbSIsInZhbHVlcyIsImZpbHRlckZ1bmMiLCJtYWtlRmlsdGVyRnVuY3Rpb24iLCJvYmoiLCJwdXNoIiwiY2xhdXNlcyIsImZpbHRlckNsYXVzZXMiLCJrZXlzIiwia2V5IiwiZXZlcnkiLCJwYWlyIiwidmFsIiwiZGF0YSIsImN1cnJlbnQiLCJPYmplY3QiLCJhc3NpZ24iLCJyZXN1bHQiLCJkZWxldGUiLCJjbGVhciJdLCJtYXBwaW5ncyI6IjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFT0EsVTs7QUFFQ0MsWSxjQUFBQSxTOztBQUNBQyxRLFVBQUFBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQVVLQyxhOzs7QUFLWiw2QkFBYztBQUFBOztBQUFBOztBQUViLFdBQUtDLE9BQUwsR0FBZSxJQUFJQyxHQUFKLEVBQWY7QUFDQSxXQUFLQyxHQUFMLEdBQVcsSUFBSUQsR0FBSixFQUFYO0FBSGE7QUFJYjs7OzswQ0FPcUJFLEksRUFBTztBQUM1QixVQUFLLENBQUMsS0FBS0gsT0FBTCxDQUFhSSxHQUFiLENBQWlCRCxJQUFqQixDQUFOLEVBQStCO0FBQzlCTCxhQUFPLHlEQUFQLEVBQWtFSyxJQUFsRTtBQUNBLFlBQUtILE9BQUwsQ0FBYUssR0FBYixDQUFrQkYsSUFBbEIsRUFBd0IsSUFBSUYsR0FBSixFQUF4QjtBQUNBLFlBQUtDLEdBQUwsQ0FBU0csR0FBVCxDQUFjRixJQUFkLEVBQW9CLENBQXBCO0FBQ0E7O0FBRUQsYUFBTyxLQUFLSCxPQUFMLENBQWFNLEdBQWIsQ0FBa0JILElBQWxCLENBQVA7QUFDQTs7O2lDQVlZQSxJLEVBQU1JLEUsRUFBSztBQUN2QlQsa0NBQTJCUyxFQUEzQixZQUFvQ0osS0FBS0ssSUFBekM7QUFDQSxVQUFJQyxhQUFhLEtBQUtDLG9CQUFMLENBQTJCUCxJQUEzQixDQUFqQjs7QUFFQSxVQUFLTSxXQUFXTCxHQUFYLENBQWVHLEVBQWYsQ0FBTCxFQUEwQjtBQUN6QixjQUFPWCxRQUFRZSxPQUFSLENBQWlCRixXQUFXSCxHQUFYLENBQWVDLEVBQWYsQ0FBakIsQ0FBUDtBQUNBLE9BRkQsTUFFTztBQUNOLGNBQU9YLFFBQVFnQixNQUFSLENBQWdCLElBQUlDLEtBQUosY0FBcUJWLEtBQUtLLElBQTFCLFlBQXFDRCxFQUFyQyxDQUFoQixDQUFQO0FBQ0E7QUFDRDs7O21DQWFjSixJLEVBQU1XLFEsRUFBVztBQUMvQmhCLGtEQUE2Q0ssS0FBS0ssSUFBbEQsRUFBd0RNLFFBQXhEO0FBQ0EsVUFBSUwsYUFBYSxLQUFLQyxvQkFBTCxDQUEyQlAsSUFBM0IsQ0FBakI7QUFDQSxVQUFJWSxnQkFBSjs7QUFFQSxVQUFLRCxRQUFMLEVBQWdCO0FBQ2ZoQixhQUFPLCtDQUFQLEVBQXdEVyxXQUFXTyxJQUFuRTtBQUNBLFdBQUlDLFVBQVUsS0FBS0MsbUJBQUwsQ0FBMEJULFVBQTFCLEVBQXNDSyxRQUF0QyxDQUFkO0FBQ0FoQixhQUFPLHNCQUFQLEVBQStCbUIsUUFBUUUsTUFBdkMsRUFBK0NGLE9BQS9DO0FBQ0FGLGlCQUFVSyxNQUFNQyxJQUFOLENBQVlKLE9BQVosQ0FBVjtBQUNBLE9BTEQsTUFLTztBQUNObkIsYUFBTyxtQkFBUDtBQUNBaUIsaUJBQVVLLE1BQU1DLElBQU4sQ0FBWVosV0FBV2EsTUFBWCxFQUFaLENBQVY7QUFDQTs7QUFFRHhCLHFDQUE2QmlCLE9BQTdCLHlDQUE2QkEsT0FBN0I7QUFDQSxhQUFPbkIsUUFBUWUsT0FBUixDQUFpQkksT0FBakIsQ0FBUDtBQUNBOzs7eUNBYW9CTixVLEVBQVlLLFEsRUFBVztBQUUzQyxVQUFJUyxhQUFhLEtBQUtDLGtCQUFMLENBQXlCVixRQUF6QixDQUFqQjtBQUNBLFVBQUlHLFVBQVUsRUFBZDs7QUFIMkM7QUFBQTtBQUFBOztBQUFBO0FBSzNDLDRCQUFpQlIsV0FBV2EsTUFBWCxFQUFqQiw4SEFBdUM7QUFBQSxZQUE3QkcsR0FBNkI7O0FBQ3RDLFlBQUtGLFdBQVdFLEdBQVgsQ0FBTCxFQUF1QjtBQUFFUixpQkFBUVMsSUFBUixDQUFjRCxHQUFkO0FBQXNCO0FBQy9DO0FBUDBDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBUzNDLGFBQU9SLE9BQVA7QUFDQTs7O3dDQWFtQkgsUSxFQUFXO0FBQzlCLFVBQUlhLFVBQVUsRUFBZDs7QUFFQSxVQUFLYixTQUFTYyxhQUFkLEVBQThCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQzdCLDhCQUFpQmQsU0FBU2MsYUFBVCxDQUF1QkMsSUFBdkIsRUFBakI7QUFBQSxhQUFVQyxHQUFWOztBQUNDSCxpQkFBUUQsSUFBUixDQUFhLENBQUVJLEdBQUYsRUFBT2hCLFNBQVNjLGFBQVQsQ0FBdUJ0QixHQUF2QixDQUEyQndCLEdBQTNCLENBQVAsQ0FBYjtBQUREO0FBRDZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHN0I7O0FBRUQsYUFBTyxVQUFVTCxHQUFWLEVBQWdCO0FBQ3RCLGNBQU9FLFFBQVFJLEtBQVIsQ0FBZSxnQkFBUTtBQUFBLG1DQUNaQyxJQURZO0FBQUEsWUFDeEJGLEdBRHdCO0FBQUEsWUFDbkJHLEdBRG1COztBQUU3QixlQUFTUixJQUFJSyxHQUFKLE1BQWFHLEdBQXRCO0FBQ0EsUUFITSxDQUFQO0FBSUEsT0FMRDtBQU1BOzs7MkJBWU05QixJLEVBQU0rQixJLEVBQU87QUFDbkIsVUFBSXpCLGFBQWEsS0FBS0Msb0JBQUwsQ0FBMkJQLElBQTNCLENBQWpCO0FBQ0EsVUFBSUksS0FBSyxLQUFLTCxHQUFMLENBQVNJLEdBQVQsQ0FBY0gsSUFBZCxJQUF1QixDQUFoQztBQUNBLFdBQUtELEdBQUwsQ0FBU0csR0FBVCxDQUFjRixJQUFkLEVBQW9CSSxFQUFwQjs7QUFFQVQseUJBQWtCSyxLQUFLSyxJQUF2QixZQUFrQ0QsRUFBbEM7QUFDQUUsaUJBQVdKLEdBQVgsQ0FBZ0JFLEVBQWhCLEVBQW9CMkIsSUFBcEI7QUFDQSxhQUFPdEMsUUFBUWUsT0FBUixDQUFpQkosRUFBakIsQ0FBUDtBQUNBOzs7NEJBYU9KLEksRUFBTUksRSxFQUFJMkIsSSxFQUFPO0FBQ3hCLFVBQUl6QixhQUFhLEtBQUtDLG9CQUFMLENBQTJCUCxJQUEzQixDQUFqQjtBQUNBLFVBQUlnQyxVQUFVMUIsV0FBV0gsR0FBWCxDQUFnQkMsRUFBaEIsQ0FBZDs7QUFFQSxVQUFLLENBQUM0QixPQUFOLEVBQWdCO0FBQ2YsY0FBT3ZDLFFBQVFnQixNQUFSLENBQWdCLElBQUlDLEtBQUosY0FBcUJWLEtBQUtLLElBQTFCLFlBQXFDRCxFQUFyQyxDQUFoQixDQUFQO0FBQ0E7O0FBRURULHlCQUFrQkssS0FBS0ssSUFBdkIsWUFBa0NELEVBQWxDO0FBQ0E2QixhQUFPQyxNQUFQLENBQWVGLE9BQWYsRUFBd0JELElBQXhCOztBQUVBLGFBQU90QyxRQUFRZSxPQUFSLENBQWlCd0IsT0FBakIsQ0FBUDtBQUNBOzs7NkJBYVFoQyxJLEVBQU1JLEUsRUFBSTJCLEksRUFBTztBQUN6QixVQUFJekIsYUFBYSxLQUFLQyxvQkFBTCxDQUEyQlAsSUFBM0IsQ0FBakI7QUFDQSxVQUFJZ0MsVUFBVTFCLFdBQVdILEdBQVgsQ0FBZ0JDLEVBQWhCLENBQWQ7QUFDQUUsaUJBQVdKLEdBQVgsQ0FBZ0JFLEVBQWhCLEVBQW9CMkIsSUFBcEI7QUFDQSxhQUFPdEMsUUFBUWUsT0FBUixDQUFpQndCLE9BQWpCLENBQVA7QUFDQTs7OzRCQWFPaEMsSSxFQUFNSSxFLEVBQUs7QUFDbEIsVUFBSUUsYUFBYSxLQUFLQyxvQkFBTCxDQUEyQlAsSUFBM0IsQ0FBakI7QUFDQSxVQUFJbUMsU0FBUzdCLFdBQVc4QixNQUFYLENBQW1CaEMsRUFBbkIsQ0FBYjtBQUNBLGFBQU9YLFFBQVFlLE9BQVIsQ0FBaUIyQixNQUFqQixDQUFQO0FBQ0E7Ozs4QkFTUTtBQUNSLFdBQUt0QyxPQUFMLENBQWF3QyxLQUFiO0FBQ0E7Ozs7S0F4TmlDM0MsUyIsImZpbGUiOiJudWxsLWRhdGFzdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIvbGliIn0=
