
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
						var criteria = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGFzdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0E7Ozs7Ozs7Ozs7Ozs7QUFZTyxVQUFTLFNBQVQsQ0FBb0IsSUFBcEIsRUFBb0M7QUFBQSxvQ0FBUCxJQUFPO0FBQVAsT0FBTztBQUFBOztBQUMxQyxTQUFPLFNBQVMsU0FBVCxDQUFvQixNQUFwQixFQUE2QjtBQUNuQyxPQUFJLEtBQUssUUFBUSxTQUFSLENBQW1CLElBQW5CLEVBQXlCLElBQXpCLENBQVQ7QUFDQSxTQUFPLHVCQUFQLEVBQWdDLE1BQWhDLEVBQXdDLE1BQXhDLEVBQWdELEVBQWhEO0FBQ0EsVUFBTyxTQUFQLEdBQW1CLEVBQW5CO0FBQ0EsR0FKRDtBQUtBOztzQkFOZSxTOzs7O0FBVlQsVTs7QUFFQyxzQixXQUFBLG1COztBQUNBLFcsYUFBQSxROztBQUNBLFEsVUFBQSxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBMkJLLFM7Ozs7Ozs7eUJBcUJQLEksRUFBc0I7QUFBQSxVQUFoQixRQUFnQix5REFBUCxJQUFPOztBQUUxQixVQUFLLG9CQUFvQixRQUF6QixFQUFvQztBQUNuQyxhQUFPLHNCQUFQO0FBQ0EsY0FBTyxLQUFLLGFBQUwsQ0FBb0IsSUFBcEIsRUFBMEIsUUFBMUIsQ0FBUDtBQUNBLE9BSEQsTUFHTztBQUNOLGFBQU8sY0FBUDtBQUNBLGNBQU8sS0FBSyxXQUFMLENBQWtCLElBQWxCLEVBQXdCLFFBQXhCLENBQVA7QUFDQTtBQUNEOzs7bUNBZ0JjLEksRUFBTSxRLEVBQVc7QUFDL0IsYUFBTyxRQUFRLE1BQVIsQ0FBZ0IsSUFBSSxtQkFBSixDQUF3QixlQUF4QixDQUFoQixDQUFQO0FBQ0E7OztpQ0FnQlksSSxFQUFNLEUsRUFBSztBQUN2QixhQUFPLFFBQVEsTUFBUixDQUFnQixJQUFJLG1CQUFKLENBQXdCLGFBQXhCLENBQWhCLENBQVA7QUFDQTs7OzJCQWNNLEksRUFBTSxJLEVBQU87QUFDbkIsYUFBTyxRQUFRLE1BQVIsQ0FBZ0IsSUFBSSxtQkFBSixDQUF3QixPQUF4QixDQUFoQixDQUFQO0FBQ0E7Ozs0QkFZTyxJLEVBQU0sRSxFQUFJLEksRUFBTztBQUN4QixhQUFPLFFBQVEsTUFBUixDQUFnQixJQUFJLG1CQUFKLENBQXdCLFFBQXhCLENBQWhCLENBQVA7QUFDQTs7OzZCQVlRLEksRUFBTSxFLEVBQUksSSxFQUFPO0FBQ3pCLGFBQU8sUUFBUSxNQUFSLENBQWdCLElBQUksbUJBQUosQ0FBd0IsU0FBeEIsQ0FBaEIsQ0FBUDtBQUNBOzs7NEJBWU8sSSxFQUFNLEUsRUFBSztBQUNsQixhQUFPLFFBQVEsTUFBUixDQUFnQixJQUFJLG1CQUFKLENBQXdCLFFBQXhCLENBQWhCLENBQVA7QUFDQSIsImZpbGUiOiJkYXRhc3RvcmUuanMiLCJzb3VyY2VSb290IjoiL2xpYiJ9
