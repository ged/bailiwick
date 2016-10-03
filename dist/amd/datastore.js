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
			(0, _utils.debug)("Setting datastore of ", target, " to ", ds);
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
				var criteria = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGFzdG9yZS5qcyJdLCJuYW1lcyI6WyJkYXRhc3RvcmUiLCJ0eXBlIiwiYXJncyIsImRlY29yYXRvciIsInRhcmdldCIsImRzIiwiUmVmbGVjdCIsImNvbnN0cnVjdCIsIkRhdGFzdG9yZSIsImNyaXRlcmlhIiwiZ2V0Q29sbGVjdGlvbiIsImdldEluc3RhbmNlIiwicmVqZWN0IiwiaWQiLCJkYXRhIl0sIm1hcHBpbmdzIjoiO0FBR0E7Ozs7OztTQVlnQkEsUyxHQUFBQSxTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVQsVUFBU0EsU0FBVCxDQUFvQkMsSUFBcEIsRUFBb0M7QUFBQSxvQ0FBUEMsSUFBTztBQUFQQSxPQUFPO0FBQUE7O0FBQzFDLFNBQU8sU0FBU0MsU0FBVCxDQUFvQkMsTUFBcEIsRUFBNkI7QUFDbkMsT0FBSUMsS0FBS0MsUUFBUUMsU0FBUixDQUFtQk4sSUFBbkIsRUFBeUJDLElBQXpCLENBQVQ7QUFDQSxxQkFBTyx1QkFBUCxFQUFnQ0UsTUFBaEMsRUFBd0MsTUFBeEMsRUFBZ0RDLEVBQWhEO0FBQ0FELFVBQU9KLFNBQVAsR0FBbUJLLEVBQW5CO0FBQ0EsR0FKRDtBQUtBOztLQWVZRyxTLFdBQUFBLFM7Ozs7Ozs7dUJBcUJQUCxJLEVBQXNCO0FBQUEsUUFBaEJRLFFBQWdCLHVFQUFQLElBQU87O0FBRTFCLFFBQUtBLHNDQUFMLEVBQW9DO0FBQ25DLHVCQUFPLHNCQUFQO0FBQ0EsWUFBTyxLQUFLQyxhQUFMLENBQW9CVCxJQUFwQixFQUEwQlEsUUFBMUIsQ0FBUDtBQUNBLEtBSEQsTUFHTztBQUNOLHVCQUFPLGNBQVA7QUFDQSxZQUFPLEtBQUtFLFdBQUwsQ0FBa0JWLElBQWxCLEVBQXdCUSxRQUF4QixDQUFQO0FBQ0E7QUFDRDs7O2lDQWdCY1IsSSxFQUFNUSxRLEVBQVc7QUFDL0IsV0FBTyxtQkFBUUcsTUFBUixDQUFnQixnQ0FBd0IsZUFBeEIsQ0FBaEIsQ0FBUDtBQUNBOzs7K0JBZ0JZWCxJLEVBQU1ZLEUsRUFBSztBQUN2QixXQUFPLG1CQUFRRCxNQUFSLENBQWdCLGdDQUF3QixhQUF4QixDQUFoQixDQUFQO0FBQ0E7Ozt5QkFjTVgsSSxFQUFNYSxJLEVBQU87QUFDbkIsV0FBTyxtQkFBUUYsTUFBUixDQUFnQixnQ0FBd0IsT0FBeEIsQ0FBaEIsQ0FBUDtBQUNBOzs7MEJBWU9YLEksRUFBTVksRSxFQUFJQyxJLEVBQU87QUFDeEIsV0FBTyxtQkFBUUYsTUFBUixDQUFnQixnQ0FBd0IsUUFBeEIsQ0FBaEIsQ0FBUDtBQUNBOzs7MkJBWVFYLEksRUFBTVksRSxFQUFJQyxJLEVBQU87QUFDekIsV0FBTyxtQkFBUUYsTUFBUixDQUFnQixnQ0FBd0IsU0FBeEIsQ0FBaEIsQ0FBUDtBQUNBOzs7MEJBWU9YLEksRUFBTVksRSxFQUFLO0FBQ2xCLFdBQU8sbUJBQVFELE1BQVIsQ0FBZ0IsZ0NBQXdCLFFBQXhCLENBQWhCLENBQVA7QUFDQSIsImZpbGUiOiJkYXRhc3RvcmUuanMiLCJzb3VyY2VSb290IjoiL2xpYiJ9
