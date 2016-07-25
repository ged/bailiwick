
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
					var criteria = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

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
						var limit = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
						var offset = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VsdC1zZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVRLFcsYUFBQSxROztBQUNBLFUsVUFBQSxPO0FBQVMsUSxVQUFBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3QkFTSixTO0FBRVosdUJBQWEsS0FBYixFQUFvQztBQUFBLFNBQWhCLFFBQWdCLHlEQUFQLElBQU87O0FBQUE7O0FBQ25DLFNBQUssYUFBYSxJQUFsQixFQUF5QjtBQUN4QixpQkFBVyxJQUFJLFFBQUosRUFBWDtBQUNBLE1BRkQsTUFHSyxJQUFLLEVBQUUsb0JBQW9CLFFBQXRCLENBQUwsRUFBdUM7QUFDM0MsaUJBQVcsSUFBSSxRQUFKLENBQWMsUUFBZCxDQUFYO0FBQ0E7O0FBRUQsVUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLFVBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBOzs7OzJCQVE4QjtBQUFBLFVBQTFCLEtBQTBCLHlEQUFwQixJQUFvQjtBQUFBLFVBQWQsTUFBYyx5REFBUCxJQUFPOztBQUM5QixVQUFJLEtBQUssS0FBSyxRQUFkO0FBQ0EsVUFBSyxLQUFMLEVBQWE7QUFBRSxZQUFLLEdBQUcsS0FBSCxDQUFVLEtBQVYsQ0FBTDtBQUF5QjtBQUN4QyxVQUFLLE1BQUwsRUFBYztBQUFFLFlBQUssR0FBRyxNQUFILENBQVcsTUFBWCxDQUFMO0FBQTJCOztBQUUzQyxZQUFPLDJDQUFQLEVBQW9ELEtBQUssS0FBTCxDQUFXLElBQS9ELEVBQXFFLEVBQXJFO0FBQ0EsYUFBTyxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWdCLEVBQWhCLENBQVA7QUFDQTs7OzZCQVdPO0FBQ1AsYUFBTyxRQUFRLFNBQVIsQ0FBbUIsS0FBSyxXQUF4QixFQUFxQyxDQUFDLEtBQUssS0FBTixFQUFhLEtBQUssUUFBbEIsQ0FBckMsQ0FBUDtBQUNBOzs7MkJBVU0sTSxFQUFTO0FBQ2YsWUFBTyxtQ0FBUCxFQUE0QyxNQUE1QztBQUNBLFdBQUssUUFBTCxHQUFnQixLQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXNCLE1BQXRCLENBQWhCO0FBQ0E7OzsyQkFVTSxLLEVBQVE7QUFDZCxZQUFPLGlDQUFQLEVBQTBDLEtBQTFDO0FBQ0EsV0FBSyxRQUFMLEdBQWdCLEtBQUssUUFBTCxDQUFjLEtBQWQsQ0FBcUIsS0FBckIsQ0FBaEI7QUFDQTs7OzRCQVdPLEssRUFBUTtBQUNmLFlBQU8sa0NBQVAsRUFBMkMsS0FBM0M7QUFDQSxXQUFLLFFBQUwsR0FBZ0IsS0FBSyxRQUFMLENBQWMsTUFBZCxDQUFzQixLQUF0QixDQUFoQjtBQUNBOzs7MEJBVUssUSxFQUFXO0FBQ2hCLFlBQU8sc0NBQVAsRUFBK0MsUUFBL0M7QUFDQSxXQUFLLFFBQUwsR0FBZ0IsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFvQixRQUFwQixDQUFoQjtBQUNBOzs7OytEQTVDQSxPLHdJQWFBLE8seUlBY0EsTyx3SUFhQSxPIiwiZmlsZSI6InJlc3VsdC1zZXQuanMiLCJzb3VyY2VSb290IjoiL2xpYiJ9
