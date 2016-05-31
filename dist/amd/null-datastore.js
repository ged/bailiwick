define(['exports', 'bluebird', './datastore', './utils', 'babel/polyfill'], function (exports, _bluebird, _datastore, _utils) {
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

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
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

		_createClass(NullDatastore, null, [{
			key: 'genId',
			value: regeneratorRuntime.mark(function genId() {
				var i;
				return regeneratorRuntime.wrap(function genId$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								i = 0;

							case 1:
								_context.next = 3;
								return ++i;

							case 3:
								_context.next = 1;
								break;

							case 5:
							case 'end':
								return _context.stop();
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
				var id = this.ids.get(type).next().value;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm51bGwtZGF0YXN0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQmE7Ozs7OztRQU9QOzs7OztZQUFJOzs7O2VBRUEsRUFBRSxDQUFGOzs7Ozs7Ozs7Ozs7Ozs7QUFRVCxXQWpCWSxhQWlCWixHQUFjO3lCQWpCRixlQWlCRTs7c0VBakJGLDJCQWlCRTs7QUFFYixTQUFLLE9BQUwsR0FBZSxJQUFJLEdBQUosRUFBZixDQUZhO0FBR2IsU0FBSyxHQUFMLEdBQVcsSUFBSSxHQUFKLEVBQVgsQ0FIYTs7R0FBZDs7ZUFqQlk7O3dDQTRCVSxNQUFPO0FBQzVCLFFBQUssQ0FBQyxLQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWlCLElBQWpCLENBQUQsRUFBMEI7QUFDOUIsYUFBUSxJQUFSLENBQWMseURBQWQsRUFBeUUsSUFBekUsRUFEOEI7QUFFOUIsVUFBSyxPQUFMLENBQWEsR0FBYixDQUFrQixJQUFsQixFQUF3QixJQUFJLEdBQUosRUFBeEIsRUFGOEI7QUFHOUIsVUFBSyxHQUFMLENBQVMsR0FBVCxDQUFjLElBQWQsRUFBb0IsY0FBYyxLQUFkLEVBQXBCLEVBSDhCO0tBQS9COztBQU1BLFdBQU8sS0FBSyxPQUFMLENBQWEsR0FBYixDQUFrQixJQUFsQixDQUFQLENBUDRCOzs7OytCQW9CaEIsTUFBTSxJQUFLO0FBQ3ZCLDRDQUEyQixjQUFTLEtBQUssSUFBTCxDQUFwQyxDQUR1QjtBQUV2QixRQUFJLGFBQWEsS0FBSyxvQkFBTCxDQUEyQixJQUEzQixDQUFiLENBRm1COztBQUl2QixRQUFLLFdBQVcsR0FBWCxDQUFlLEVBQWYsQ0FBTCxFQUEwQjtBQUN6QixZQUFPLG1CQUFRLE9BQVIsQ0FBaUIsV0FBVyxHQUFYLENBQWUsRUFBZixDQUFqQixDQUFQ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LG1DQUFrQixLQUFLLElBQUwsWUFBZ0IsRUFBbEMsRUFSd0I7QUFTeEIsV0FBTyxNQUFQLENBQWUsT0FBZixFQUF3QixJQUF4QixFQVR3Qjs7QUFXeEIsV0FBTyxtQkFBUSxPQUFSLENBQWlCLE9BQWpCLENBQVAsQ0FYd0I7Ozs7MkJBeUJoQixNQUFNLElBQUksTUFBTztBQUN6QixRQUFJLGFBQWEsS0FBSyxvQkFBTCxDQUEyQixJQUEzQixDQUFiLENBRHFCO0FBRXpCLFFBQUksVUFBVSxXQUFXLEdBQVgsQ0FBZ0IsRUFBaEIsQ0FBVixDQUZxQjtBQUd6QixlQUFXLEdBQVgsQ0FBZ0IsRUFBaEIsRUFBb0IsSUFBcEIsRUFIeUI7QUFJekIsV0FBTyxtQkFBUSxPQUFSLENBQWlCLE9BQWpCLENBQVAsQ0FKeUI7Ozs7MEJBa0JsQixNQUFNLElBQUs7QUFDbEIsUUFBSSxhQUFhLEtBQUssb0JBQUwsQ0FBMkIsSUFBM0IsQ0FBYixDQURjO0FBRWxCLFFBQUksU0FBUyxXQUFXLE1BQVgsQ0FBbUIsRUFBbkIsQ0FBVCxDQUZjO0FBR2xCLFdBQU8sbUJBQVEsT0FBUixDQUFpQixNQUFqQixDQUFQLENBSGtCOzs7OzRCQWFWO0FBQ1IsU0FBSyxPQUFMLENBQWEsS0FBYixHQURROzs7O1NBak9HIiwiZmlsZSI6Im51bGwtZGF0YXN0b3JlLmpzIiwic291cmNlUm9vdCI6Ii9saWIifQ==
