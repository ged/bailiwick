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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGFzdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0E7Ozs7OztTQVlnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFULFVBQVMsU0FBVCxDQUFvQixJQUFwQixFQUFvQztvQ0FBUDs7R0FBTzs7QUFDMUMsU0FBTyxTQUFTLFNBQVQsQ0FBb0IsTUFBcEIsRUFBNkI7QUFDbkMsT0FBSSxLQUFLLFFBQVEsU0FBUixDQUFtQixJQUFuQixFQUF5QixJQUF6QixDQUFMLENBRCtCOztBQUduQyxVQUFPLFNBQVAsR0FBbUIsRUFBbkIsQ0FIbUM7R0FBN0IsQ0FEbUM7RUFBcEM7O0tBcUJNOzs7Ozs7O3VCQXFCUCxNQUFzQjtRQUFoQixpRUFBUyxvQkFBTzs7QUFFMUIsUUFBSyxzQ0FBTCxFQUFvQztBQUNuQyx1QkFBTyxzQkFBUCxFQURtQztBQUVuQyxZQUFPLEtBQUssYUFBTCxDQUFvQixJQUFwQixFQUEwQixRQUExQixDQUFQLENBRm1DO0tBQXBDLE1BR087QUFDTix1QkFBTyxjQUFQLEVBRE07QUFFTixZQUFPLEtBQUssV0FBTCxDQUFrQixJQUFsQixFQUF3QixRQUF4QixDQUFQLENBRk07S0FIUDs7OztpQ0F1QmMsTUFBTSxVQUFXO0FBQy9CLFdBQU8sbUJBQVEsTUFBUixDQUFnQixnQ0FBd0IsZUFBeEIsQ0FBaEIsQ0FBUCxDQUQrQjs7OzsrQkFrQm5CLE1BQU0sSUFBSztBQUN2QixXQUFPLG1CQUFRLE1BQVIsQ0FBZ0IsZ0NBQXdCLGFBQXhCLENBQWhCLENBQVAsQ0FEdUI7Ozs7eUJBZ0JqQixNQUFNLE1BQU87QUFDbkIsV0FBTyxtQkFBUSxNQUFSLENBQWdCLGdDQUF3QixPQUF4QixDQUFoQixDQUFQLENBRG1COzs7OzBCQWNaLE1BQU0sSUFBSSxNQUFPO0FBQ3hCLFdBQU8sbUJBQVEsTUFBUixDQUFnQixnQ0FBd0IsUUFBeEIsQ0FBaEIsQ0FBUCxDQUR3Qjs7OzsyQkFjaEIsTUFBTSxJQUFJLE1BQU87QUFDekIsV0FBTyxtQkFBUSxNQUFSLENBQWdCLGdDQUF3QixTQUF4QixDQUFoQixDQUFQLENBRHlCOzs7OzBCQWNsQixNQUFNLElBQUs7QUFDbEIsV0FBTyxtQkFBUSxNQUFSLENBQWdCLGdDQUF3QixRQUF4QixDQUFoQixDQUFQLENBRGtCOzs7O1NBMUhQIiwiZmlsZSI6ImRhdGFzdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIvbGliIn0=
