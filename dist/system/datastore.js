
'use strict';

System.register(['bluebird', './errors', './criteria', './utils'], function (_export, _context) {
	"use strict";

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGFzdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0E7Ozs7Ozs7Ozs7Ozs7OztBQUVPLFU7O0FBRUMsc0IsV0FBQSxtQjs7QUFDQSxXLGFBQUEsUTs7QUFDQSxRLFVBQUEsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTUQsWUFBUyxTQUFULENBQW9CLElBQXBCLEVBQW9DO0FBQUEsc0NBQVAsSUFBTztBQUFQLFNBQU87QUFBQTs7QUFDMUMsV0FBTyxTQUFTLFNBQVQsQ0FBb0IsTUFBcEIsRUFBNkI7QUFDbkMsU0FBSSxLQUFLLFFBQVEsU0FBUixDQUFtQixJQUFuQixFQUF5QixJQUF6QixDQUFUOztBQUVBLFlBQU8sU0FBUCxHQUFtQixFQUFuQjtBQUNBLEtBSkQ7QUFLQTs7Ozt3QkFlWSxTOzs7Ozs7O3lCQXFCUCxJLEVBQXNCO0FBQUEsVUFBaEIsUUFBZ0IseURBQVAsSUFBTzs7QUFFMUIsVUFBSyxvQkFBb0IsUUFBekIsRUFBb0M7QUFDbkMsYUFBTyxzQkFBUDtBQUNBLGNBQU8sS0FBSyxhQUFMLENBQW9CLElBQXBCLEVBQTBCLFFBQTFCLENBQVA7QUFDQSxPQUhELE1BR087QUFDTixhQUFPLGNBQVA7QUFDQSxjQUFPLEtBQUssV0FBTCxDQUFrQixJQUFsQixFQUF3QixRQUF4QixDQUFQO0FBQ0E7QUFDRDs7O21DQWdCYyxJLEVBQU0sUSxFQUFXO0FBQy9CLGFBQU8sUUFBUSxNQUFSLENBQWdCLElBQUksbUJBQUosQ0FBd0IsZUFBeEIsQ0FBaEIsQ0FBUDtBQUNBOzs7aUNBZ0JZLEksRUFBTSxFLEVBQUs7QUFDdkIsYUFBTyxRQUFRLE1BQVIsQ0FBZ0IsSUFBSSxtQkFBSixDQUF3QixhQUF4QixDQUFoQixDQUFQO0FBQ0E7OzsyQkFjTSxJLEVBQU0sSSxFQUFPO0FBQ25CLGFBQU8sUUFBUSxNQUFSLENBQWdCLElBQUksbUJBQUosQ0FBd0IsT0FBeEIsQ0FBaEIsQ0FBUDtBQUNBOzs7NEJBWU8sSSxFQUFNLEUsRUFBSSxJLEVBQU87QUFDeEIsYUFBTyxRQUFRLE1BQVIsQ0FBZ0IsSUFBSSxtQkFBSixDQUF3QixRQUF4QixDQUFoQixDQUFQO0FBQ0E7Ozs2QkFZUSxJLEVBQU0sRSxFQUFJLEksRUFBTztBQUN6QixhQUFPLFFBQVEsTUFBUixDQUFnQixJQUFJLG1CQUFKLENBQXdCLFNBQXhCLENBQWhCLENBQVA7QUFDQTs7OzRCQVlPLEksRUFBTSxFLEVBQUs7QUFDbEIsYUFBTyxRQUFRLE1BQVIsQ0FBZ0IsSUFBSSxtQkFBSixDQUF3QixRQUF4QixDQUFoQixDQUFQO0FBQ0EiLCJmaWxlIjoiZGF0YXN0b3JlLmpzIiwic291cmNlUm9vdCI6Ii9saWIifQ==
