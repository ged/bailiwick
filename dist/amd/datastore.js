define(['exports', 'bluebird', './errors', './criteria', './utils'], function (exports, _bluebird, _errors, _criteria, _utils) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Datastore = undefined;
	exports.datastore = datastore;

	var _bluebird2 = _interopRequireDefault(_bluebird);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

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

	function datastore(type) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		return function decorator(target) {
			var ds = Reflect.construct(type, args);

			target.datastore = ds;
		};
	}

	var Datastore = exports.Datastore = function () {
		function Datastore() {
			_classCallCheck(this, Datastore);
		}

		_createClass(Datastore, [{
			key: 'get',
			value: function get(type) {
				var criteria = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

				if (criteria instanceof _criteria.Criteria) {
					(0, _utils.debug)("Fetch with criteria!");
					return this.getCollection(type, criteria);
				} else {
					(0, _utils.debug)("Fetch by ID!");
					return this.getInstance(type, criteria);
				}
			}
		}, {
			key: 'getCollection',
			value: function getCollection(type, criteria) {
				return _bluebird2.default.reject(new _errors.NotImplementedError("getCollection"));
			}
		}, {
			key: 'getInstance',
			value: function getInstance(type, id) {
				return _bluebird2.default.reject(new _errors.NotImplementedError("getInstance"));
			}
		}, {
			key: 'store',
			value: function store(type, data) {
				return _bluebird2.default.reject(new _errors.NotImplementedError("store"));
			}
		}, {
			key: 'update',
			value: function update(type, id, data) {
				return _bluebird2.default.reject(new _errors.NotImplementedError("update"));
			}
		}, {
			key: 'replace',
			value: function replace(type, id, data) {
				return _bluebird2.default.reject(new _errors.NotImplementedError("replace"));
			}
		}, {
			key: 'remove',
			value: function remove(type, id) {
				return _bluebird2.default.reject(new _errors.NotImplementedError("remove"));
			}
		}]);

		return Datastore;
	}();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGFzdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0E7Ozs7OztTQVlnQixTLEdBQUEsUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFULFVBQVMsU0FBVCxDQUFvQixJQUFwQixFQUFvQztBQUFBLG9DQUFQLElBQU87QUFBUCxPQUFPO0FBQUE7O0FBQzFDLFNBQU8sU0FBUyxTQUFULENBQW9CLE1BQXBCLEVBQTZCO0FBQ25DLE9BQUksS0FBSyxRQUFRLFNBQVIsQ0FBbUIsSUFBbkIsRUFBeUIsSUFBekIsQ0FBVDs7QUFFQSxVQUFPLFNBQVAsR0FBbUIsRUFBbkI7QUFDQSxHQUpEO0FBS0E7O0tBZVksUyxXQUFBLFM7Ozs7Ozs7dUJBcUJQLEksRUFBc0I7QUFBQSxRQUFoQixRQUFnQix5REFBUCxJQUFPOztBQUUxQixRQUFLLHNDQUFMLEVBQW9DO0FBQ25DLHVCQUFPLHNCQUFQO0FBQ0EsWUFBTyxLQUFLLGFBQUwsQ0FBb0IsSUFBcEIsRUFBMEIsUUFBMUIsQ0FBUDtBQUNBLEtBSEQsTUFHTztBQUNOLHVCQUFPLGNBQVA7QUFDQSxZQUFPLEtBQUssV0FBTCxDQUFrQixJQUFsQixFQUF3QixRQUF4QixDQUFQO0FBQ0E7QUFDRDs7O2lDQWdCYyxJLEVBQU0sUSxFQUFXO0FBQy9CLFdBQU8sbUJBQVEsTUFBUixDQUFnQixnQ0FBd0IsZUFBeEIsQ0FBaEIsQ0FBUDtBQUNBOzs7K0JBZ0JZLEksRUFBTSxFLEVBQUs7QUFDdkIsV0FBTyxtQkFBUSxNQUFSLENBQWdCLGdDQUF3QixhQUF4QixDQUFoQixDQUFQO0FBQ0E7Ozt5QkFjTSxJLEVBQU0sSSxFQUFPO0FBQ25CLFdBQU8sbUJBQVEsTUFBUixDQUFnQixnQ0FBd0IsT0FBeEIsQ0FBaEIsQ0FBUDtBQUNBOzs7MEJBWU8sSSxFQUFNLEUsRUFBSSxJLEVBQU87QUFDeEIsV0FBTyxtQkFBUSxNQUFSLENBQWdCLGdDQUF3QixRQUF4QixDQUFoQixDQUFQO0FBQ0E7OzsyQkFZUSxJLEVBQU0sRSxFQUFJLEksRUFBTztBQUN6QixXQUFPLG1CQUFRLE1BQVIsQ0FBZ0IsZ0NBQXdCLFNBQXhCLENBQWhCLENBQVA7QUFDQTs7OzBCQVlPLEksRUFBTSxFLEVBQUs7QUFDbEIsV0FBTyxtQkFBUSxNQUFSLENBQWdCLGdDQUF3QixRQUF4QixDQUFoQixDQUFQO0FBQ0EiLCJmaWxlIjoiZGF0YXN0b3JlLmpzIiwic291cmNlUm9vdCI6Ii9saWIifQ==
