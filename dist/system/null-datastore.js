
'use strict';

System.register(['bluebird', 'babel/polyfill', './datastore', './utils'], function (_export, _context) {
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
		}, function (_babelPolyfill) {}, function (_datastore) {
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
				return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
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

				_createClass(NullDatastore, null, [{
					key: 'genId',
					value: regeneratorRuntime.mark(function genId() {
						var i;
						return regeneratorRuntime.wrap(function genId$(_context2) {
							while (1) {
								switch (_context2.prev = _context2.next) {
									case 0:
										i = 0;

									case 1:
										_context2.next = 3;
										return ++i;

									case 3:
										_context2.next = 1;
										break;

									case 5:
									case 'end':
										return _context2.stop();
								}
							}
						}, genId, this);
					})
				}]);

				function NullDatastore() {
					_classCallCheck(this, NullDatastore);

					var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NullDatastore).call(this));

					_this.objects = new Map();
					_this.ids = new Map();
					return _this;
				}

				_createClass(NullDatastore, [{
					key: 'getCollectionForType',
					value: function getCollectionForType(type) {
						if (!this.objects.has(type)) {
							console.info("ObjectStore doesn't have a %s collection; creating one.", type);
							this.objects.set(type, new Map());
							this.ids.set(type, NullDatastore.genId());
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
								var _pair = _slicedToArray(pair, 2);

								var key = _pair[0];
								var val = _pair[1];

								return obj[key] === val;
							});
						};
					}
				}, {
					key: 'store',
					value: function store(type, data) {
						var collection = this.getCollectionForType(type);
						var id = this.ids.get(type).next().value;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm51bGwtZGF0YXN0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVPOztBQUdDOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkFVSzs7Ozs7O1VBT1A7Ozs7O2NBQUk7Ozs7aUJBRUEsRUFBRSxDQUFGOzs7Ozs7Ozs7Ozs7Ozs7QUFRVCxhQWpCWSxhQWlCWixHQUFjOzJCQWpCRixlQWlCRTs7d0VBakJGLDJCQWlCRTs7QUFFYixXQUFLLE9BQUwsR0FBZSxJQUFJLEdBQUosRUFBZixDQUZhO0FBR2IsV0FBSyxHQUFMLEdBQVcsSUFBSSxHQUFKLEVBQVgsQ0FIYTs7S0FBZDs7aUJBakJZOzswQ0E0QlUsTUFBTztBQUM1QixVQUFLLENBQUMsS0FBSyxPQUFMLENBQWEsR0FBYixDQUFpQixJQUFqQixDQUFELEVBQTBCO0FBQzlCLGVBQVEsSUFBUixDQUFjLHlEQUFkLEVBQXlFLElBQXpFLEVBRDhCO0FBRTlCLFlBQUssT0FBTCxDQUFhLEdBQWIsQ0FBa0IsSUFBbEIsRUFBd0IsSUFBSSxHQUFKLEVBQXhCLEVBRjhCO0FBRzlCLFlBQUssR0FBTCxDQUFTLEdBQVQsQ0FBYyxJQUFkLEVBQW9CLGNBQWMsS0FBZCxFQUFwQixFQUg4QjtPQUEvQjs7QUFNQSxhQUFPLEtBQUssT0FBTCxDQUFhLEdBQWIsQ0FBa0IsSUFBbEIsQ0FBUCxDQVA0Qjs7OztpQ0FvQmhCLE1BQU0sSUFBSztBQUN2QixrQ0FBMkIsY0FBUyxLQUFLLElBQUwsQ0FBcEMsQ0FEdUI7QUFFdkIsVUFBSSxhQUFhLEtBQUssb0JBQUwsQ0FBMkIsSUFBM0IsQ0FBYixDQUZtQjs7QUFJdkIsVUFBSyxXQUFXLEdBQVgsQ0FBZSxFQUFmLENBQUwsRUFBMEI7QUFDekIsY0FBTyxRQUFRLE9BQVIsQ0FBaUIsV0FBVyxHQUFYLENBQWUsRUFB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QUFoQjs7QUFJQSx5QkFBa0IsS0FBSyxJQUFMLFlBQWdCLEVBQWxDLEVBUndCO0FBU3hCLGFBQU8sTUFBUCxDQUFlLE9BQWYsRUFBd0IsSUFBeEIsRUFUd0I7O0FBV3hCLGFBQU8sUUFBUSxPQUFSLENBQWlCLE9BQWpCLENBQVAsQ0FYd0I7Ozs7NkJBeUJoQixNQUFNLElBQUksTUFBTztBQUN6QixVQUFJLGFBQWEsS0FBSyxvQkFBTCxDQUEyQixJQUEzQixDQUFiLENBRHFCO0FBRXpCLFVBQUksVUFBVSxXQUFXLEdBQVgsQ0FBZ0IsRUFBaEIsQ0FBVixDQUZxQjtBQUd6QixpQkFBVyxHQUFYLENBQWdCLEVBQWhCLEVBQW9CLElBQXBCLEVBSHlCO0FBSXpCLGFBQU8sUUFBUSxPQUFSLENBQWlCLE9BQWpCLENBQVAsQ0FKeUI7Ozs7NEJBa0JsQixNQUFNLElBQUs7QUFDbEIsVUFBSSxhQUFhLEtBQUssb0JBQUwsQ0FBMkIsSUFBM0IsQ0FBYixDQURjO0FBRWxCLFVBQUksU0FBUyxXQUFXLE1BQVgsQ0FBbUIsRUFBbkIsQ0FBVCxDQUZjO0FBR2xCLGFBQU8sUUFBUSxPQUFSLENBQWlCLE1BQWpCLENBQVAsQ0FIa0I7Ozs7OEJBYVY7QUFDUixXQUFLLE9BQUwsQ0FBYSxLQUFiLEdBRFE7Ozs7V0FqT0c7S0FBc0IiLCJmaWxlIjoibnVsbC1kYXRhc3RvcmUuanMiLCJzb3VyY2VSb290IjoiL2xpYiJ9
