define(['exports', './criteria', './utils'], function (exports, _criteria, _utils) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ResultSet = undefined;

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

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
		var desc = {};
		Object['ke' + 'ys'](descriptor).forEach(function (key) {
			desc[key] = descriptor[key];
		});
		desc.enumerable = !!desc.enumerable;
		desc.configurable = !!desc.configurable;

		if ('value' in desc || desc.initializer) {
			desc.writable = true;
		}

		desc = decorators.slice().reverse().reduce(function (desc, decorator) {
			return decorator(target, property, desc) || desc;
		}, desc);

		if (context && desc.initializer !== void 0) {
			desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
			desc.initializer = undefined;
		}

		if (desc.initializer === void 0) {
			Object['define' + 'Property'](target, property, desc);
			desc = null;
		}

		return desc;
	}

	var _desc, _value, _class;

	var ResultSet = exports.ResultSet = (_class = function () {
		function ResultSet(model) {
			var criteria = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			_classCallCheck(this, ResultSet);

			if (criteria === null) {
				criteria = new _criteria.Criteria();
			} else if (!(criteria instanceof _criteria.Criteria)) {
				criteria = new _criteria.Criteria(criteria);
			}

			this.model = model;
			this.criteria = criteria;
		}

		_createClass(ResultSet, [{
			key: 'get',
			value: function get() {
				var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
				var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				var cr = this.criteria;
				if (limit) {
					cr = cr.limit(limit);
				}
				if (offset) {
					cr = cr.offset(offset);
				}

				(0, _utils.debug)('Fetching ' + this.model.name + ' results matching criteria: ', cr);
				return this.model.get(cr);
			}
		}, {
			key: 'clone',
			value: function clone() {
				return Reflect.construct(this.constructor, [this.model, this.criteria]);
			}
		}, {
			key: 'where',
			value: function where(params) {
				(0, _utils.debug)("Cloning resultset to add params: ", params);
				this.criteria = this.criteria.filter(params);
			}
		}, {
			key: 'limit',
			value: function limit(count) {
				(0, _utils.debug)("Cloned resultset to add limit: ", count);
				this.criteria = this.criteria.limit(count);
			}
		}, {
			key: 'offset',
			value: function offset(index) {
				(0, _utils.debug)("Cloned resultset to add offset: ", index);
				this.criteria = this.criteria.offset(index);
			}
		}, {
			key: 'from',
			value: function from(location) {
				(0, _utils.debug)("Clone resultset to change location: ", location);
				this.criteria = this.criteria.from(location);
			}
		}]);

		return ResultSet;
	}(), (_applyDecoratedDescriptor(_class.prototype, 'where', [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, 'where'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'limit', [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, 'limit'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'offset', [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, 'offset'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'from', [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, 'from'), _class.prototype)), _class);
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VsdC1zZXQuanMiXSwibmFtZXMiOlsiUmVzdWx0U2V0IiwibW9kZWwiLCJjcml0ZXJpYSIsImxpbWl0Iiwib2Zmc2V0IiwiY3IiLCJuYW1lIiwiZ2V0IiwiUmVmbGVjdCIsImNvbnN0cnVjdCIsImNvbnN0cnVjdG9yIiwicGFyYW1zIiwiZmlsdGVyIiwiY291bnQiLCJpbmRleCIsImxvY2F0aW9uIiwiZnJvbSJdLCJtYXBwaW5ncyI6IjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQVlhQSxTLFdBQUFBLFM7QUFFWixxQkFBYUMsS0FBYixFQUFvQztBQUFBLE9BQWhCQyxRQUFnQix1RUFBUCxJQUFPOztBQUFBOztBQUNuQyxPQUFLQSxhQUFhLElBQWxCLEVBQXlCO0FBQ3hCQSxlQUFXLHdCQUFYO0FBQ0EsSUFGRCxNQUdLLElBQUssRUFBRUEsc0NBQUYsQ0FBTCxFQUF1QztBQUMzQ0EsZUFBVyx1QkFBY0EsUUFBZCxDQUFYO0FBQ0E7O0FBRUQsUUFBS0QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsUUFBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQTs7Ozt5QkFROEI7QUFBQSxRQUExQkMsS0FBMEIsdUVBQXBCLElBQW9CO0FBQUEsUUFBZEMsTUFBYyx1RUFBUCxJQUFPOztBQUM5QixRQUFJQyxLQUFLLEtBQUtILFFBQWQ7QUFDQSxRQUFLQyxLQUFMLEVBQWE7QUFBRUUsVUFBS0EsR0FBR0YsS0FBSCxDQUFVQSxLQUFWLENBQUw7QUFBeUI7QUFDeEMsUUFBS0MsTUFBTCxFQUFjO0FBQUVDLFVBQUtBLEdBQUdELE1BQUgsQ0FBV0EsTUFBWCxDQUFMO0FBQTJCOztBQUUzQyxvQ0FBbUIsS0FBS0gsS0FBTCxDQUFXSyxJQUE5QixtQ0FBa0VELEVBQWxFO0FBQ0EsV0FBTyxLQUFLSixLQUFMLENBQVdNLEdBQVgsQ0FBZ0JGLEVBQWhCLENBQVA7QUFDQTs7OzJCQVdPO0FBQ1AsV0FBT0csUUFBUUMsU0FBUixDQUFtQixLQUFLQyxXQUF4QixFQUFxQyxDQUFDLEtBQUtULEtBQU4sRUFBYSxLQUFLQyxRQUFsQixDQUFyQyxDQUFQO0FBQ0E7Ozt5QkFVTVMsTSxFQUFTO0FBQ2Ysc0JBQU8sbUNBQVAsRUFBNENBLE1BQTVDO0FBQ0EsU0FBS1QsUUFBTCxHQUFnQixLQUFLQSxRQUFMLENBQWNVLE1BQWQsQ0FBc0JELE1BQXRCLENBQWhCO0FBQ0E7Ozt5QkFVTUUsSyxFQUFRO0FBQ2Qsc0JBQU8saUNBQVAsRUFBMENBLEtBQTFDO0FBQ0EsU0FBS1gsUUFBTCxHQUFnQixLQUFLQSxRQUFMLENBQWNDLEtBQWQsQ0FBcUJVLEtBQXJCLENBQWhCO0FBQ0E7OzswQkFXT0MsSyxFQUFRO0FBQ2Ysc0JBQU8sa0NBQVAsRUFBMkNBLEtBQTNDO0FBQ0EsU0FBS1osUUFBTCxHQUFnQixLQUFLQSxRQUFMLENBQWNFLE1BQWQsQ0FBc0JVLEtBQXRCLENBQWhCO0FBQ0E7Ozt3QkFVS0MsUSxFQUFXO0FBQ2hCLHNCQUFPLHNDQUFQLEVBQStDQSxRQUEvQztBQUNBLFNBQUtiLFFBQUwsR0FBZ0IsS0FBS0EsUUFBTCxDQUFjYyxJQUFkLENBQW9CRCxRQUFwQixDQUFoQjtBQUNBIiwiZmlsZSI6InJlc3VsdC1zZXQuanMiLCJzb3VyY2VSb290IjoiL2xpYiJ9
