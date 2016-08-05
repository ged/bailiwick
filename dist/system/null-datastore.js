
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
							debug("ObjectStore doesn't have a %s collection; creating one.", type);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm51bGwtZGF0YXN0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRU8sVTs7QUFFQyxZLGNBQUEsUzs7QUFDQSxRLFVBQUEsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBVUssYTs7Ozs7Ozs7Ozs7QUFPUCxXLEdBQUksQzs7OztpQkFFQSxFQUFFLEM7Ozs7Ozs7Ozs7Ozs7OztBQVFYLDZCQUFjO0FBQUE7O0FBQUE7O0FBRWIsV0FBSyxPQUFMLEdBQWUsSUFBSSxHQUFKLEVBQWY7QUFDQSxXQUFLLEdBQUwsR0FBVyxJQUFJLEdBQUosRUFBWDtBQUhhO0FBSWI7Ozs7MENBT3FCLEksRUFBTztBQUM1QixVQUFLLENBQUMsS0FBSyxPQUFMLENBQWEsR0FBYixDQUFpQixJQUFqQixDQUFOLEVBQStCO0FBQzlCLGFBQU8seURBQVAsRUFBa0UsSUFBbEU7QUFDQSxZQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWtCLElBQWxCLEVBQXdCLElBQUksR0FBSixFQUF4QjtBQUNBLFlBQUssR0FBTCxDQUFTLEdBQVQsQ0FBYyxJQUFkLEVBQW9CLGNBQWMsS0FBZCxFQUFwQjtBQUNBOztBQUVELGFBQU8sS0FBSyxPQUFMLENBQWEsR0FBYixDQUFrQixJQUFsQixDQUFQO0FBQ0E7OztpQ0FZWSxJLEVBQU0sRSxFQUFLO0FBQ3ZCLGtDQUEyQixFQUEzQixZQUFvQyxLQUFLLElBQXpDO0FBQ0EsVUFBSSxhQUFhLEtBQUssb0JBQUwsQ0FBMkIsSUFBM0IsQ0FBakI7O0FBRUEsVUFBSyxXQUFXLEdBQVgsQ0FBZSxFQUFmLENBQUwsRUFBMEI7QUFDekIsY0FBTyxRQUFRLE9BQVIsQ0FBaUIsV0FBVyxHQUFYLENBQWUsRUFBZixDQUFqQixDQUFQO0FBQ0EsT0FGRCxNQUVPO0FBQ04sY0FBTyxRQUFRLE1BQVIsQ0FBZ0Is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QVA7QUFDQTs7QUFFRCx5QkFBa0IsS0FBSyxJQUF2QixZQUFrQyxFQUFsQztBQUNBLGFBQU8sTUFBUCxDQUFlLE9BQWYsRUFBd0IsSUFBeEI7O0FBRUEsYUFBTyxRQUFRLE9BQVIsQ0FBaUIsT0FBakIsQ0FBUDtBQUNBOzs7NkJBYVEsSSxFQUFNLEUsRUFBSSxJLEVBQU87QUFDekIsVUFBSSxhQUFhLEtBQUssb0JBQUwsQ0FBMkIsSUFBM0IsQ0FBakI7QUFDQSxVQUFJLFVBQVUsV0FBVyxHQUFYLENBQWdCLEVBQWhCLENBQWQ7QUFDQSxpQkFBVyxHQUFYLENBQWdCLEVBQWhCLEVBQW9CLElBQXBCO0FBQ0EsYUFBTyxRQUFRLE9BQVIsQ0FBaUIsT0FBakIsQ0FBUDtBQUNBOzs7NEJBYU8sSSxFQUFNLEUsRUFBSztBQUNsQixVQUFJLGFBQWEsS0FBSyxvQkFBTCxDQUEyQixJQUEzQixDQUFqQjtBQUNBLFVBQUksU0FBUyxXQUFXLE1BQVgsQ0FBbUIsRUFBbkIsQ0FBYjtBQUNBLGFBQU8sUUFBUSxPQUFSLENBQWlCLE1BQWpCLENBQVA7QUFDQTs7OzhCQVNRO0FBQ1IsV0FBSyxPQUFMLENBQWEsS0FBYjtBQUNBOzs7O0tBbk9pQyxTIiwiZmlsZSI6Im51bGwtZGF0YXN0b3JlLmpzIiwic291cmNlUm9vdCI6Ii9saWIifQ==
