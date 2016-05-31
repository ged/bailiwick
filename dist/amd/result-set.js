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
			var criteria = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

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
				var limit = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
				var offset = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

				var cr = this.criteria;
				if (limit) {
					cr = cr.limit(limit);
				}
				if (offset) {
					cr = cr.offset(offset);
				}

				(0, _utils.debug)("Fetching %s results matching criteria: %o", this.model.name, cr);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VsdC1zZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQVlhO0FBRVosV0FGWSxTQUVaLENBQWEsS0FBYixFQUFvQztPQUFoQixpRUFBUyxvQkFBTzs7eUJBRnhCLFdBRXdCOztBQUNuQyxPQUFLLGFBQWEsSUFBYixFQUFvQjtBQUN4QixlQUFXLHdCQUFYLENBRHdCO0lBQXpCLE1BR0ssSUFBSyxFQUFFLHVDQUFGLEVBQWtDO0FBQzNDLGVBQVcsdUJBQWMsUUFBZCxDQUFYLENBRDJDO0lBQXZDOztBQUlMLFFBQUssS0FBTCxHQUFhLEtBQWIsQ0FSbUM7QUFTbkMsUUFBSyxRQUFMLEdBQWdCLFFBQWhCLENBVG1DO0dBQXBDOztlQUZZOzt5QkFvQm1CO1FBQTFCLDhEQUFNLG9CQUFvQjtRQUFkLCtEQUFPLG9CQUFPOztBQUM5QixRQUFJLEtBQUssS0FBSyxRQUFMLENBRHFCO0FBRTlCLFFBQUssS0FBTCxFQUFhO0FBQUUsVUFBSyxHQUFHLEtBQUgsQ0FBVSxLQUFWLENBQUwsQ0FBRjtLQUFiO0FBQ0EsUUFBSyxNQUFMLEVBQWM7QUFBRSxVQUFLLEdBQUcsTUFBSCxDQUFXLE1BQVgsQ0FBTCxDQUFGO0tBQWQ7O0FBRUEsc0JBQU8sMkNBQVAsRUFBb0QsS0FBSyxLQUFMLENBQVcsSUFBWCxFQUFpQixFQUFyRSxFQUw4QjtBQU05QixXQUFPLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZ0IsRUFBaEIsQ0FBUCxDQU44Qjs7OzsyQkFrQnZCO0FBQ1AsV0FBTyxRQUFRLFNBQVIsQ0FBbUIsS0FBSyxXQUFMLEVBQWtCLENBQUMsS0FBSyxLQUFMLEVBQVksS0FBSyxRQUFMLENBQWxELENBQVAsQ0FETzs7Ozt5QkFZRCxRQUFTO0FBQ2Ysc0JBQU8sbUNBQVAsRUFBNEMsTUFBNUMsRUFEZTtBQUVmLFNBQUssUUFBTCxHQUFnQixLQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXNCLE1BQXRCLENBQWhCLENBRmU7Ozs7eUJBYVQsT0FBUTtBQUNkLHNCQUFPLGlDQUFQLEVBQTBDLEtBQTFDLEVBRGM7QUFFZCxTQUFLLFFBQUwsR0FBZ0IsS0FBSyxRQUFMLENBQWMsS0FBZCxDQUFxQixLQUFyQixDQUFoQixDQUZjOzs7OzBCQWNQLE9BQVE7QUFDZixzQkFBTyxrQ0FBUCxFQUEyQyxLQUEzQyxFQURlO0FBRWYsU0FBSyxRQUFMLEdBQWdCLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBc0IsS0FBdEIsQ0FBaEIsQ0FGZTs7Ozt3QkFhVixVQUFXO0FBQ2hCLHNCQUFPLHNDQUFQLEVBQStDLFFBQS9DLEVBRGdCO0FBRWhCLFNBQUssUUFBTCxHQUFnQixLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW9CLFFBQXBCLENBQWhCLENBRmdCOzs7O1NBMUZMIiwiZmlsZSI6InJlc3VsdC1zZXQuanMiLCJzb3VyY2VSb290IjoiL2xpYiJ9
