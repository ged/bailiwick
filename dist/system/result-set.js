
"use strict";

System.register(['./criteria', './utils'], function (_export, _context) {
	"use strict";

	var Criteria, monadic, debug, _createClass, _desc, _value, _class, ResultSet;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

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

	return {
		setters: [function (_criteria) {
			Criteria = _criteria.Criteria;
		}, function (_utils) {
			monadic = _utils.monadic;
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

			_export('ResultSet', ResultSet = (_class = function () {
				function ResultSet(model) {
					var criteria = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

					_classCallCheck(this, ResultSet);

					if (criteria === null) {
						criteria = new Criteria();
					} else if (!(criteria instanceof Criteria)) {
						criteria = new Criteria(criteria);
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

						debug("Fetching %s results matching criteria: %o", this.model.name, cr);
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
						debug("Cloning resultset to add params: ", params);
						this.criteria = this.criteria.filter(params);
					}
				}, {
					key: 'limit',
					value: function limit(count) {
						debug("Cloned resultset to add limit: ", count);
						this.criteria = this.criteria.limit(count);
					}
				}, {
					key: 'offset',
					value: function offset(index) {
						debug("Cloned resultset to add offset: ", index);
						this.criteria = this.criteria.offset(index);
					}
				}, {
					key: 'from',
					value: function from(location) {
						debug("Clone resultset to change location: ", location);
						this.criteria = this.criteria.from(location);
					}
				}]);

				return ResultSet;
			}(), (_applyDecoratedDescriptor(_class.prototype, 'where', [monadic], Object.getOwnPropertyDescriptor(_class.prototype, 'where'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'limit', [monadic], Object.getOwnPropertyDescriptor(_class.prototype, 'limit'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'offset', [monadic], Object.getOwnPropertyDescriptor(_class.prototype, 'offset'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'from', [monadic], Object.getOwnPropertyDescriptor(_class.prototype, 'from'), _class.prototype)), _class));

			_export('ResultSet', ResultSet);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VsdC1zZXQuanMiXSwibmFtZXMiOlsiQ3JpdGVyaWEiLCJtb25hZGljIiwiZGVidWciLCJSZXN1bHRTZXQiLCJtb2RlbCIsImNyaXRlcmlhIiwibGltaXQiLCJvZmZzZXQiLCJjciIsIm5hbWUiLCJnZXQiLCJSZWZsZWN0IiwiY29uc3RydWN0IiwiY29uc3RydWN0b3IiLCJwYXJhbXMiLCJmaWx0ZXIiLCJjb3VudCIsImluZGV4IiwibG9jYXRpb24iLCJmcm9tIl0sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRVFBLFcsYUFBQUEsUTs7QUFDQUMsVSxVQUFBQSxPO0FBQVNDLFEsVUFBQUEsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dCQVNKQyxTO0FBRVosdUJBQWFDLEtBQWIsRUFBb0M7QUFBQSxTQUFoQkMsUUFBZ0IsdUVBQVAsSUFBTzs7QUFBQTs7QUFDbkMsU0FBS0EsYUFBYSxJQUFsQixFQUF5QjtBQUN4QkEsaUJBQVcsSUFBSUwsUUFBSixFQUFYO0FBQ0EsTUFGRCxNQUdLLElBQUssRUFBRUssb0JBQW9CTCxRQUF0QixDQUFMLEVBQXVDO0FBQzNDSyxpQkFBVyxJQUFJTCxRQUFKLENBQWNLLFFBQWQsQ0FBWDtBQUNBOztBQUVELFVBQUtELEtBQUwsR0FBYUEsS0FBYjtBQUNBLFVBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0E7Ozs7MkJBUThCO0FBQUEsVUFBMUJDLEtBQTBCLHVFQUFwQixJQUFvQjtBQUFBLFVBQWRDLE1BQWMsdUVBQVAsSUFBTzs7QUFDOUIsVUFBSUMsS0FBSyxLQUFLSCxRQUFkO0FBQ0EsVUFBS0MsS0FBTCxFQUFhO0FBQUVFLFlBQUtBLEdBQUdGLEtBQUgsQ0FBVUEsS0FBVixDQUFMO0FBQXlCO0FBQ3hDLFVBQUtDLE1BQUwsRUFBYztBQUFFQyxZQUFLQSxHQUFHRCxNQUFILENBQVdBLE1BQVgsQ0FBTDtBQUEyQjs7QUFFM0NMLFlBQU8sMkNBQVAsRUFBb0QsS0FBS0UsS0FBTCxDQUFXSyxJQUEvRCxFQUFxRUQsRUFBckU7QUFDQSxhQUFPLEtBQUtKLEtBQUwsQ0FBV00sR0FBWCxDQUFnQkYsRUFBaEIsQ0FBUDtBQUNBOzs7NkJBV087QUFDUCxhQUFPRyxRQUFRQyxTQUFSLENBQW1CLEtBQUtDLFdBQXhCLEVBQXFDLENBQUMsS0FBS1QsS0FBTixFQUFhLEtBQUtDLFFBQWxCLENBQXJDLENBQVA7QUFDQTs7OzJCQVVNUyxNLEVBQVM7QUFDZlosWUFBTyxtQ0FBUCxFQUE0Q1ksTUFBNUM7QUFDQSxXQUFLVCxRQUFMLEdBQWdCLEtBQUtBLFFBQUwsQ0FBY1UsTUFBZCxDQUFzQkQsTUFBdEIsQ0FBaEI7QUFDQTs7OzJCQVVNRSxLLEVBQVE7QUFDZGQsWUFBTyxpQ0FBUCxFQUEwQ2MsS0FBMUM7QUFDQSxXQUFLWCxRQUFMLEdBQWdCLEtBQUtBLFFBQUwsQ0FBY0MsS0FBZCxDQUFxQlUsS0FBckIsQ0FBaEI7QUFDQTs7OzRCQVdPQyxLLEVBQVE7QUFDZmYsWUFBTyxrQ0FBUCxFQUEyQ2UsS0FBM0M7QUFDQSxXQUFLWixRQUFMLEdBQWdCLEtBQUtBLFFBQUwsQ0FBY0UsTUFBZCxDQUFzQlUsS0FBdEIsQ0FBaEI7QUFDQTs7OzBCQVVLQyxRLEVBQVc7QUFDaEJoQixZQUFPLHNDQUFQLEVBQStDZ0IsUUFBL0M7QUFDQSxXQUFLYixRQUFMLEdBQWdCLEtBQUtBLFFBQUwsQ0FBY2MsSUFBZCxDQUFvQkQsUUFBcEIsQ0FBaEI7QUFDQTs7OzsrREE1Q0FqQixPLHdJQWFBQSxPLHlJQWNBQSxPLHdJQWFBQSxPIiwiZmlsZSI6InJlc3VsdC1zZXQuanMiLCJzb3VyY2VSb290IjoiL2xpYiJ9
