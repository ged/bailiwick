define(['exports', 'bluebird', './datastore', './utils'], function (exports, _bluebird, _datastore, _utils) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.NullDatastore = undefined;

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

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
	};

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

	var NullDatastore = exports.NullDatastore = function (_Datastore) {
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
					(0, _utils.debug)("ObjectStore doesn't have a %s collection; creating one.", type);
					this.objects.set(type, new Map());
					this.ids.set(type, 0);
				}

				return this.objects.get(type);
			}
		}, {
			key: 'getInstance',
			value: function getInstance(type, id) {
				(0, _utils.debug)('Getting instance ' + id + ' of ' + type.name);
				var collection = this.getCollectionForType(type);

				if (collection.has(id)) {
					return _bluebird2.default.resolve(collection.get(id));
				} else {
					return _bluebird2.default.reject(new Error('No such ' + type.name + ' ID=' + id));
				}
			}
		}, {
			key: 'getCollection',
			value: function getCollection(type, criteria) {
				(0, _utils.debug)('Getting %s collection matching: %o', type.name, criteria);
				var collection = this.getCollectionForType(type);
				var results = void 0;

				if (criteria) {
					(0, _utils.debug)("Filtered fetch over collection of %d objects!", collection.size);
					var matches = this.findMatchingObjects(collection, criteria);
					(0, _utils.debug)("Found %d matches: %o", matches.length, matches);
					results = Array.from(matches);
				} else {
					(0, _utils.debug)("Unfiltered fetch!");
					results = Array.from(collection.values());
				}

				(0, _utils.debug)('result is a ' + (typeof results === 'undefined' ? 'undefined' : _typeof(results)));
				return _bluebird2.default.resolve(results);
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

				(0, _utils.debug)('Storing ' + type.name + ' ID=' + id);
				collection.set(id, data);
				return _bluebird2.default.resolve(id);
			}
		}, {
			key: 'update',
			value: function update(type, id, data) {
				var collection = this.getCollectionForType(type);
				var current = collection.get(id);

				if (!current) {
					return _bluebird2.default.reject(new Error('No such ' + type.name + ' ID=' + id));
				}

				(0, _utils.debug)('Merging ' + type.name + ' ID=' + id);
				Object.assign(current, data);

				return _bluebird2.default.resolve(current);
			}
		}, {
			key: 'replace',
			value: function replace(type, id, data) {
				var collection = this.getCollectionForType(type);
				var current = collection.get(id);
				collection.set(id, data);
				return _bluebird2.default.resolve(current);
			}
		}, {
			key: 'remove',
			value: function remove(type, id) {
				var collection = this.getCollectionForType(type);
				var result = collection.delete(id);
				return _bluebird2.default.resolve(result);
			}
		}, {
			key: '_clear',
			value: function _clear() {
				this.objects.clear();
			}
		}]);

		return NullDatastore;
	}(_datastore.Datastore);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm51bGwtZGF0YXN0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FlYSxhLFdBQUEsYTs7O0FBS1osMkJBQWM7QUFBQTs7QUFBQTs7QUFFYixTQUFLLE9BQUwsR0FBZSxJQUFJLEdBQUosRUFBZjtBQUNBLFNBQUssR0FBTCxHQUFXLElBQUksR0FBSixFQUFYO0FBSGE7QUFJYjs7Ozt3Q0FPcUIsSSxFQUFPO0FBQzVCLFFBQUssQ0FBQyxLQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWlCLElBQWpCLENBQU4sRUFBK0I7QUFDOUIsdUJBQU8seURBQVAsRUFBa0UsSUFBbEU7QUFDQSxVQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWtCLElBQWxCLEVBQXdCLElBQUksR0FBSixFQUF4QjtBQUNBLFVBQUssR0FBTCxDQUFTLEdBQVQsQ0FBYyxJQUFkLEVBQW9CLENBQXBCO0FBQ0E7O0FBRUQsV0FBTyxLQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWtCLElBQWxCLENBQVA7QUFDQTs7OytCQVlZLEksRUFBTSxFLEVBQUs7QUFDdkIsNENBQTJCLEVBQTNCLFlBQW9DLEtBQUssSUFBekM7QUFDQSxRQUFJLGFBQWEsS0FBSyxvQkFBTCxDQUEyQixJQUEzQixDQUFqQjs7QUFFQSxRQUFLLFdBQVcsR0FBWCxDQUFlLEVBQWYsQ0FBTCxFQUEwQjtBQUN6QixZQUFPLG1CQUFRLE9BQVIsQ0FBaUIsV0FBVyxHQUFYLENBQWUsRUFBZixDQUFqQixDQUFQO0FBQ0EsS0FGRCxNQUVPO0FBQ04sWUFBTyxtQkFBUSxNQUFSLENBQWdCLElBQUksS0FBSixjQUFxQixLQUFLLElBQTFCLFlBQXFDLEVBQXJDLENBQWhCLENBQVA7QUFDQTtBQUNEOzs7aUNBYWMsSSxFQUFNLFEsRUFBVztBQUMv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QUFPLE1BQVAsQ0FBZSxPQUFmLEVBQXdCLElBQXhCOztBQUVBLFdBQU8sbUJBQVEsT0FBUixDQUFpQixPQUFqQixDQUFQO0FBQ0E7OzsyQkFhUSxJLEVBQU0sRSxFQUFJLEksRUFBTztBQUN6QixRQUFJLGFBQWEsS0FBSyxvQkFBTCxDQUEyQixJQUEzQixDQUFqQjtBQUNBLFFBQUksVUFBVSxXQUFXLEdBQVgsQ0FBZ0IsRUFBaEIsQ0FBZDtBQUNBLGVBQVcsR0FBWCxDQUFnQixFQUFoQixFQUFvQixJQUFwQjtBQUNBLFdBQU8sbUJBQVEsT0FBUixDQUFpQixPQUFqQixDQUFQO0FBQ0E7OzswQkFhTyxJLEVBQU0sRSxFQUFLO0FBQ2xCLFFBQUksYUFBYSxLQUFLLG9CQUFMLENBQTJCLElBQTNCLENBQWpCO0FBQ0EsUUFBSSxTQUFTLFdBQVcsTUFBWCxDQUFtQixFQUFuQixDQUFiO0FBQ0EsV0FBTyxtQkFBUSxPQUFSLENBQWlCLE1BQWpCLENBQVA7QUFDQTs7OzRCQVNRO0FBQ1IsU0FBSyxPQUFMLENBQWEsS0FBYjtBQUNBIiwiZmlsZSI6Im51bGwtZGF0YXN0b3JlLmpzIiwic291cmNlUm9vdCI6Ii9saWIifQ==
