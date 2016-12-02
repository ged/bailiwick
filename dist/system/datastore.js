
'use strict';

System.register(['bluebird', './errors', './criteria', './utils'], function (_export, _context) {
	"use strict";

	var Promise, NotImplementedError, Criteria, debug, _createClass, Datastore;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function datastore(type) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		return function decorator(target) {
			var ds = Reflect.construct(type, args);
			debug("Setting datastore of ", target, " to ", ds);
			target.datastore = ds;
		};
	}

	_export('datastore', datastore);

	return {
		setters: [function (_bluebird) {
			Promise = _bluebird.default;
		}, function (_errors) {
			NotImplementedError = _errors.NotImplementedError;
		}, function (_criteria) {
			Criteria = _criteria.Criteria;
		}, function (_utils) {
			debug = _utils.debug;
		}],
		execute: function () {
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

			_export('Datastore', Datastore = function () {
				function Datastore() {
					_classCallCheck(this, Datastore);
				}

				_createClass(Datastore, [{
					key: 'get',
					value: function get(type) {
						var criteria = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

						if (criteria instanceof Criteria) {
							debug("Fetch with criteria!");
							return this.getCollection(type, criteria);
						} else {
							debug("Fetch by ID!");
							return this.getInstance(type, criteria);
						}
					}
				}, {
					key: 'getCollection',
					value: function getCollection(type, criteria) {
						return Promise.reject(new NotImplementedError("getCollection"));
					}
				}, {
					key: 'getInstance',
					value: function getInstance(type, id) {
						return Promise.reject(new NotImplementedError("getInstance"));
					}
				}, {
					key: 'store',
					value: function store(type, data) {
						return Promise.reject(new NotImplementedError("store"));
					}
				}, {
					key: 'update',
					value: function update(type, id, data) {
						return Promise.reject(new NotImplementedError("update"));
					}
				}, {
					key: 'replace',
					value: function replace(type, id, data) {
						return Promise.reject(new NotImplementedError("replace"));
					}
				}, {
					key: 'remove',
					value: function remove(type, id) {
						return Promise.reject(new NotImplementedError("remove"));
					}
				}]);

				return Datastore;
			}());

			_export('Datastore', Datastore);
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGFzdG9yZS5qcyJdLCJuYW1lcyI6WyJkYXRhc3RvcmUiLCJ0eXBlIiwiYXJncyIsImRlY29yYXRvciIsInRhcmdldCIsImRzIiwiUmVmbGVjdCIsImNvbnN0cnVjdCIsImRlYnVnIiwiUHJvbWlzZSIsIk5vdEltcGxlbWVudGVkRXJyb3IiLCJDcml0ZXJpYSIsIkRhdGFzdG9yZSIsImNyaXRlcmlhIiwiZ2V0Q29sbGVjdGlvbiIsImdldEluc3RhbmNlIiwicmVqZWN0IiwiaWQiLCJkYXRhIl0sIm1hcHBpbmdzIjoiO0FBR0E7Ozs7Ozs7Ozs7Ozs7QUFZTyxVQUFTQSxTQUFULENBQW9CQyxJQUFwQixFQUFvQztBQUFBLG9DQUFQQyxJQUFPO0FBQVBBLE9BQU87QUFBQTs7QUFDMUMsU0FBTyxTQUFTQyxTQUFULENBQW9CQyxNQUFwQixFQUE2QjtBQUNuQyxPQUFJQyxLQUFLQyxRQUFRQyxTQUFSLENBQW1CTixJQUFuQixFQUF5QkMsSUFBekIsQ0FBVDtBQUNBTSxTQUFPLHVCQUFQLEVBQWdDSixNQUFoQyxFQUF3QyxNQUF4QyxFQUFnREMsRUFBaEQ7QUFDQUQsVUFBT0osU0FBUCxHQUFtQkssRUFBbkI7QUFDQSxHQUpEO0FBS0E7O3NCQU5lTCxTOzs7O0FBVlRTLFU7O0FBRUNDLHNCLFdBQUFBLG1COztBQUNBQyxXLGFBQUFBLFE7O0FBQ0FILFEsVUFBQUEsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dCQTJCS0ksUzs7Ozs7Ozt5QkFxQlBYLEksRUFBc0I7QUFBQSxVQUFoQlksUUFBZ0IsdUVBQVAsSUFBTzs7QUFFMUIsVUFBS0Esb0JBQW9CRixRQUF6QixFQUFvQztBQUNuQ0gsYUFBTyxzQkFBUDtBQUNBLGNBQU8sS0FBS00sYUFBTCxDQUFvQmIsSUFBcEIsRUFBMEJZLFFBQTFCLENBQVA7QUFDQSxPQUhELE1BR087QUFDTkwsYUFBTyxjQUFQO0FBQ0EsY0FBTyxLQUFLTyxXQUFMLENBQWtCZCxJQUFsQixFQUF3QlksUUFBeEIsQ0FBUDtBQUNBO0FBQ0Q7OzttQ0FnQmNaLEksRUFBTVksUSxFQUFXO0FBQy9CLGFBQU9KLFFBQVFPLE1BQVIsQ0FBZ0IsSUFBSU4sbUJBQUosQ0FBd0IsZUFBeEIsQ0FBaEIsQ0FBUDtBQUNBOzs7aUNBZ0JZVCxJLEVBQU1nQixFLEVBQUs7QUFDdkIsYUFBT1IsUUFBUU8sTUFBUixDQUFnQixJQUFJTixtQkFBSixDQUF3QixhQUF4QixDQUFoQixDQUFQO0FBQ0E7OzsyQkFjTVQsSSxFQUFNaUIsSSxFQUFPO0FBQ25CLGFBQU9ULFFBQVFPLE1BQVIsQ0FBZ0IsSUFBSU4sbUJBQUosQ0FBd0IsT0FBeEIsQ0FBaEIsQ0FBUDtBQUNBOzs7NEJBWU9ULEksRUFBTWdCLEUsRUFBSUMsSSxFQUFPO0FBQ3hCLGFBQU9ULFFBQVFPLE1BQVIsQ0FBZ0IsSUFBSU4sbUJBQUosQ0FBd0IsUUFBeEIsQ0FBaEIsQ0FBUDtBQUNBOzs7NkJBWVFULEksRUFBTWdCLEUsRUFBSUMsSSxFQUFPO0FBQ3pCLGFBQU9ULFFBQVFPLE1BQVIsQ0FBZ0IsSUFBSU4sbUJBQUosQ0FBd0IsU0FBeEIsQ0FBaEIsQ0FBUDtBQUNBOzs7NEJBWU9ULEksRUFBTWdCLEUsRUFBSztBQUNsQixhQUFPUixRQUFRTyxNQUFSLENBQWdCLElBQUlOLG1CQUFKLENBQXdCLFFBQXhCLENBQWhCLENBQVA7QUFDQSIsImZpbGUiOiJkYXRhc3RvcmUuanMiLCJzb3VyY2VSb290IjoiL2xpYiJ9
