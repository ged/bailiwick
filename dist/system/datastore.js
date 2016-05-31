
'use strict';

System.register(['bluebird', './errors', './criteria', './utils'], function (_export, _context) {
	var Promise, NotImplementedError, Criteria, debug, _createClass, Datastore;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

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

			function datastore(type) {
				for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					args[_key - 1] = arguments[_key];
				}

				return function decorator(target) {
					var ds = Reflect.construct(type, args);

					target.datastore = ds;
				};
			}

			_export('datastore', datastore);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGFzdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0E7Ozs7Ozs7Ozs7Ozs7QUFFTzs7QUFFQzs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTUQsWUFBUyxTQUFULENBQW9CLElBQXBCLEVBQW9DO3NDQUFQOztLQUFPOztBQUMxQyxXQUFPLFNBQVMsU0FBVCxDQUFvQixNQUFwQixFQUE2QjtBQUNuQyxTQUFJLEtBQUssUUFBUSxTQUFSLENBQW1CLElBQW5CLEVBQXlCLElBQXpCLENBQUwsQ0FEK0I7O0FBR25DLFlBQU8sU0FBUCxHQUFtQixFQUFuQixDQUhtQztLQUE3QixDQURtQztJQUFwQzs7Ozt3QkFxQk07Ozs7Ozs7eUJBcUJQLE1BQXNCO1VBQWhCLGlFQUFTLG9CQUFPOztBQUUxQixVQUFLLG9CQUFvQixRQUFwQixFQUErQjtBQUNuQyxhQUFPLHNCQUFQLEVBRG1DO0FBRW5DLGNBQU8sS0FBSyxhQUFMLENBQW9CLElBQXBCLEVBQTBCLFFBQTFCLENBQVAsQ0FGbUM7T0FBcEMsTUFHTztBQUNOLGFBQU8sY0FBUCxFQURNO0FBRU4sY0FBTyxLQUFLLFdBQUwsQ0FBa0IsSUFBbEIsRUFBd0IsUUFBeEIsQ0FBUCxDQUZNO09BSFA7Ozs7bUNBdUJjLE1BQU0sVUFBVztBQUMvQixhQUFPLFFBQVEsTUFBUixDQUFnQixJQUFJLG1CQUFKLENBQXdCLGVBQXhCLENBQWhCLENBQVAsQ0FEK0I7Ozs7aUNBa0JuQixNQUFNLElBQUs7QUFDdkIsYUFBTyxRQUFRLE1BQVIsQ0FBZ0IsSUFBSSxtQkFBSixDQUF3QixhQUF4QixDQUFoQixDQUFQLENBRHVCOzs7OzJCQWdCakIsTUFBTSxNQUFPO0FBQ25CLGFBQU8sUUFBUSxNQUFSLENBQWdCLElBQUksbUJBQUosQ0FBd0IsT0FBeEIsQ0FBaEIsQ0FBUCxDQURtQjs7Ozs0QkFjWixNQUFNLElBQUksTUFBTztBQUN4QixhQUFPLFFBQVEsTUFBUixDQUFnQixJQUFJLG1CQUFKLENBQXdCLFFBQXhCLENBQWhCLENBQVAsQ0FEd0I7Ozs7NkJBY2hCLE1BQU0sSUFBSSxNQUFPO0FBQ3pCLGFBQU8sUUFBUSxNQUFSLENBQWdCLElBQUksbUJBQUosQ0FBd0IsU0FBeEIsQ0FBaEIsQ0FBUCxDQUR5Qjs7Ozs0QkFjbEIsTUFBTSxJQUFLO0FBQ2xCLGFBQU8sUUFBUSxNQUFSLENBQWdCLElBQUksbUJBQUosQ0FBd0IsUUFBeEIsQ0FBaEIsQ0FBUCxDQURrQjs7OztXQTFIUCIsImZpbGUiOiJkYXRhc3RvcmUuanMiLCJzb3VyY2VSb290IjoiL2xpYiJ9
