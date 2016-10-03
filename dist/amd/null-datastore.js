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
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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

			var _this = _possibleConstructorReturn(this, (NullDatastore.__proto__ || Object.getPrototypeOf(NullDatastore)).call(this));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm51bGwtZGF0YXN0b3JlLmpzIl0sIm5hbWVzIjpbIk51bGxEYXRhc3RvcmUiLCJvYmplY3RzIiwiTWFwIiwiaWRzIiwidHlwZSIsImhhcyIsInNldCIsImdldCIsImlkIiwibmFtZSIsImNvbGxlY3Rpb24iLCJnZXRDb2xsZWN0aW9uRm9yVHlwZSIsInJlc29sdmUiLCJyZWplY3QiLCJFcnJvciIsImNyaXRlcmlhIiwicmVzdWx0cyIsInNpemUiLCJtYXRjaGVzIiwiZmluZE1hdGNoaW5nT2JqZWN0cyIsImxlbmd0aCIsIkFycmF5IiwiZnJvbSIsInZhbHVlcyIsImZpbHRlckZ1bmMiLCJtYWtlRmlsdGVyRnVuY3Rpb24iLCJvYmoiLCJwdXNoIiwiY2xhdXNlcyIsImZpbHRlckNsYXVzZXMiLCJrZXlzIiwia2V5IiwiZXZlcnkiLCJwYWlyIiwidmFsIiwiZGF0YSIsImN1cnJlbnQiLCJPYmplY3QiLCJhc3NpZ24iLCJyZXN1bHQiLCJkZWxldGUiLCJjbGVhciJdLCJtYXBwaW5ncyI6IjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQWVhQSxhLFdBQUFBLGE7OztBQUtaLDJCQUFjO0FBQUE7O0FBQUE7O0FBRWIsU0FBS0MsT0FBTCxHQUFlLElBQUlDLEdBQUosRUFBZjtBQUNBLFNBQUtDLEdBQUwsR0FBVyxJQUFJRCxHQUFKLEVBQVg7QUFIYTtBQUliOzs7O3dDQU9xQkUsSSxFQUFPO0FBQzVCLFFBQUssQ0FBQyxLQUFLSCxPQUFMLENBQWFJLEdBQWIsQ0FBaUJELElBQWpCLENBQU4sRUFBK0I7QUFDOUIsdUJBQU8seURBQVAsRUFBa0VBLElBQWxFO0FBQ0EsVUFBS0gsT0FBTCxDQUFhSyxHQUFiLENBQWtCRixJQUFsQixFQUF3QixJQUFJRixHQUFKLEVBQXhCO0FBQ0EsVUFBS0MsR0FBTCxDQUFTRyxH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LEtBQUtDLG9CQUFMLENBQTJCUCxJQUEzQixDQUFqQjtBQUNBLFFBQUlJLEtBQUssS0FBS0wsR0FBTCxDQUFTSSxHQUFULENBQWNILElBQWQsSUFBdUIsQ0FBaEM7QUFDQSxTQUFLRCxHQUFMLENBQVNHLEdBQVQsQ0FBY0YsSUFBZCxFQUFvQkksRUFBcEI7O0FBRUEsbUNBQWtCSixLQUFLSyxJQUF2QixZQUFrQ0QsRUFBbEM7QUFDQUUsZUFBV0osR0FBWCxDQUFnQkUsRUFBaEIsRUFBb0IyQixJQUFwQjtBQUNBLFdBQU8sbUJBQVF2QixPQUFSLENBQWlCSixFQUFqQixDQUFQO0FBQ0E7OzswQkFhT0osSSxFQUFNSSxFLEVBQUkyQixJLEVBQU87QUFDeEIsUUFBSXpCLGFBQWEsS0FBS0Msb0JBQUwsQ0FBMkJQLElBQTNCLENBQWpCO0FBQ0EsUUFBSWdDLFVBQVUxQixXQUFXSCxHQUFYLENBQWdCQyxFQUFoQixDQUFkOztBQUVBLFFBQUssQ0FBQzRCLE9BQU4sRUFBZ0I7QUFDZixZQUFPLG1CQUFRdkIsTUFBUixDQUFnQixJQUFJQyxLQUFKLGNBQXFCVixLQUFLSyxJQUExQixZQUFxQ0QsRUFBckMsQ0FBaEIsQ0FBUDtBQUNBOztBQUVELG1DQUFrQkosS0FBS0ssSUFBdkIsWUFBa0NELEVBQWxDO0FBQ0E2QixXQUFPQyxNQUFQLENBQWVGLE9BQWYsRUFBd0JELElBQXhCOztBQUVBLFdBQU8sbUJBQVF2QixPQUFSLENBQWlCd0IsT0FBakIsQ0FBUDtBQUNBOzs7MkJBYVFoQyxJLEVBQU1JLEUsRUFBSTJCLEksRUFBTztBQUN6QixRQUFJekIsYUFBYSxLQUFLQyxvQkFBTCxDQUEyQlAsSUFBM0IsQ0FBakI7QUFDQSxRQUFJZ0MsVUFBVTFCLFdBQVdILEdBQVgsQ0FBZ0JDLEVBQWhCLENBQWQ7QUFDQUUsZUFBV0osR0FBWCxDQUFnQkUsRUFBaEIsRUFBb0IyQixJQUFwQjtBQUNBLFdBQU8sbUJBQVF2QixPQUFSLENBQWlCd0IsT0FBakIsQ0FBUDtBQUNBOzs7MEJBYU9oQyxJLEVBQU1JLEUsRUFBSztBQUNsQixRQUFJRSxhQUFhLEtBQUtDLG9CQUFMLENBQTJCUCxJQUEzQixDQUFqQjtBQUNBLFFBQUltQyxTQUFTN0IsV0FBVzhCLE1BQVgsQ0FBbUJoQyxFQUFuQixDQUFiO0FBQ0EsV0FBTyxtQkFBUUksT0FBUixDQUFpQjJCLE1BQWpCLENBQVA7QUFDQTs7OzRCQVNRO0FBQ1IsU0FBS3RDLE9BQUwsQ0FBYXdDLEtBQWI7QUFDQSIsImZpbGUiOiJudWxsLWRhdGFzdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIvbGliIn0=
