
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm51bGwtZGF0YXN0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRU8sVTs7QUFFQyxZLGNBQUEsUzs7QUFDQSxRLFVBQUEsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBVUssYTs7O0FBS1osNkJBQWM7QUFBQTs7QUFBQTs7QUFFYixXQUFLLE9BQUwsR0FBZSxJQUFJLEdBQUosRUFBZjtBQUNBLFdBQUssR0FBTCxHQUFXLElBQUksR0FBSixFQUFYO0FBSGE7QUFJYjs7OzswQ0FPcUIsSSxFQUFPO0FBQzVCLFVBQUssQ0FBQyxLQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWlCLElBQWpCLENBQU4sRUFBK0I7QUFDOUIsYUFBTyx5REFBUCxFQUFrRSxJQUFsRTtBQUNBLFlBQUssT0FBTCxDQUFhLEdBQWIsQ0FBa0IsSUFBbEIsRUFBd0IsSUFBSSxHQUFKLEVBQXhCO0FBQ0EsWUFBSyxHQUFMLENBQVMsR0FBVCxDQUFjLElBQWQsRUFBb0IsQ0FBcEI7QUFDQTs7QUFFRCxhQUFPLEtBQUssT0FBTCxDQUFhLEdBQWIsQ0FBa0IsSUFBbEIsQ0FBUDtBQUNBOzs7aUNBWVksSSxFQUFNLEUsRUFBSztBQUN2QixrQ0FBMkIsRUFBM0IsWUFBb0MsS0FBSyxJQUF6QztBQUNBLFVBQUksYUFBYSxLQUFLLG9CQUFMLENBQTJCLElBQTNCLENBQWpCOztBQUVBLFVBQUssV0FBVyxHQUFYLENBQWUsRUFBZixDQUFMLEVBQTBCO0FBQ3pCLGNBQU8sUUFBUSxPQUFSLENBQWlCLFdBQVcsR0FBWCxDQUFlLEVBQWYsQ0FBakIsQ0FBUDtBQUNBLE9BRkQsTUFFTztBQUNOLGNBQU8sUUFBUSxNQUFSLENBQWdCLElBQUksS0FBSixjQUFxQixLQUFLLElBQTFCLFlBQXFDLEVBQXJDLENBQWhCLENBQVA7QUFDQTtBQUNEOzs7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QUF2QixZQUFrQyxFQUFsQztBQUNBLGFBQU8sTUFBUCxDQUFlLE9BQWYsRUFBd0IsSUFBeEI7O0FBRUEsYUFBTyxRQUFRLE9BQVIsQ0FBaUIsT0FBakIsQ0FBUDtBQUNBOzs7NkJBYVEsSSxFQUFNLEUsRUFBSSxJLEVBQU87QUFDekIsVUFBSSxhQUFhLEtBQUssb0JBQUwsQ0FBMkIsSUFBM0IsQ0FBakI7QUFDQSxVQUFJLFVBQVUsV0FBVyxHQUFYLENBQWdCLEVBQWhCLENBQWQ7QUFDQSxpQkFBVyxHQUFYLENBQWdCLEVBQWhCLEVBQW9CLElBQXBCO0FBQ0EsYUFBTyxRQUFRLE9BQVIsQ0FBaUIsT0FBakIsQ0FBUDtBQUNBOzs7NEJBYU8sSSxFQUFNLEUsRUFBSztBQUNsQixVQUFJLGFBQWEsS0FBSyxvQkFBTCxDQUEyQixJQUEzQixDQUFqQjtBQUNBLFVBQUksU0FBUyxXQUFXLE1BQVgsQ0FBbUIsRUFBbkIsQ0FBYjtBQUNBLGFBQU8sUUFBUSxPQUFSLENBQWlCLE1BQWpCLENBQVA7QUFDQTs7OzhCQVNRO0FBQ1IsV0FBSyxPQUFMLENBQWEsS0FBYjtBQUNBOzs7O0tBeE5pQyxTIiwiZmlsZSI6Im51bGwtZGF0YXN0b3JlLmpzIiwic291cmNlUm9vdCI6Ii9saWIifQ==
