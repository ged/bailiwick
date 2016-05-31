
"use strict";

System.register(["./utils"], function (_export, _context) {
	var monadic, _createClass, _desc, _value, _class, Criteria;

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
		setters: [function (_utils) {
			monadic = _utils.monadic;
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

			_export("Criteria", Criteria = (_class = function () {
				_createClass(Criteria, null, [{
					key: "all",
					value: function all() {
						return Reflect.construct(this, []);
					}
				}]);

				function Criteria() {
					var pairs = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

					_classCallCheck(this, Criteria);

					this.filterClauses = new Map();
					this.maxResultCount = null;
					this.resultOffset = null;
					this.location = null;

					for (var key in pairs) {
						this.filterClauses.set(key, pairs[key]);
					}
				}

				_createClass(Criteria, [{
					key: "clone",
					value: function clone() {
						var newObj = Reflect.construct(this.constructor, [{}]);
						newObj.filterClauses = new Map(this.filterClauses);
						newObj.maxResultCount = this.maxResultCount;
						newObj.resultOffset = this.resultOffset;
						return newObj;
					}
				}, {
					key: "hasFilter",
					value: function hasFilter() {
						return this.filterClauses.size > 0;
					}
				}, {
					key: "filter",
					value: function filter(pairs) {
						for (var key in pairs) {
							this.filterClauses.set(key, pairs[key]);
						}
					}
				}, {
					key: "limit",
					value: function limit(newLimit) {
						this.maxResultCount = newLimit;
					}
				}, {
					key: "offset",
					value: function offset(newOffset) {
						this.resultOffset = newOffset;
					}
				}, {
					key: "from",
					value: function from(newLocation) {
						this.location = newLocation;
					}
				}]);

				return Criteria;
			}(), (_applyDecoratedDescriptor(_class.prototype, "filter", [monadic], Object.getOwnPropertyDescriptor(_class.prototype, "filter"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "limit", [monadic], Object.getOwnPropertyDescriptor(_class.prototype, "limit"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "offset", [monadic], Object.getOwnPropertyDescriptor(_class.prototype, "offset"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "from", [monadic], Object.getOwnPropertyDescriptor(_class.prototype, "from"), _class.prototype)), _class));

			_export("Criteria", Criteria);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyaXRlcmlhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1QkFVSzs7OzJCQUVDO0FBQ1osYUFBTyxRQUFRLFNBQVIsQ0FBbUIsSUFBbkIsRUFBeUIsRUFBekIsQ0FBUCxDQURZOzs7O0FBSWIsYUFOWSxRQU1aLEdBQXdCO1NBQVgsOERBQU0sa0JBQUs7OzJCQU5aLFVBTVk7O0FBQ3ZCLFVBQUssYUFBTCxHQUFxQixJQUFJLEdBQUosRUFBckIsQ0FEdUI7QUFFdkIsVUFBSyxjQUFMLEdBQXNCLElBQXRCLENBRnVCO0FBR3ZCLFVBQUssWUFBTCxHQUFvQixJQUFwQixDQUh1QjtBQUl2QixVQUFLLFFBQUwsR0FBZ0IsSUFBaEIsQ0FKdUI7O0FBTXZCLFVBQU0sSUFBSSxHQUFKLElBQVcsS0FBakIsRUFBeUI7QUFDeEIsV0FBSyxhQUFMLENBQW1CLEdBQW5CLENBQXdCLEdBQXhCLEVBQTZCLE1BQU0sR0FBTixDQUE3QixFQUR3QjtNQUF6QjtLQU5EOztpQkFOWTs7NkJBa0JKO0FBQ1AsVUFBSSxTQUFTLFFBQVEsU0FBUixDQUFtQixLQUFLLFdBQUwsRUFBa0IsQ0FBQyxFQUFELENBQXJDLENBQVQsQ0FERztBQUVQLGFBQU8sYUFBUCxHQUF1QixJQUFJLEdBQUosQ0FBUyxLQUFLLGFBQUwsQ0FBaEMsQ0FGTztBQUdQLGFBQU8sY0FBUCxHQUF3QixLQUFLLGNBQUwsQ0FIakI7QUFJUCxhQUFPLFlBQVAsR0FBc0IsS0FBSyxZQUFMLENBSmY7QUFLUCxhQUFPLE1BQVAsQ0FMTzs7OztpQ0FTSTtBQUNYLGFBQVMsS0FBSyxhQUFMLENBQW1CLElBQW5CLEdBQTBCLENBQTFCLENBREU7Ozs7NEJBV0osT0FBUTtBQUNmLFdBQU0sSUFBSSxHQUFKLElBQVcsS0FBakIsRUFBeUI7QUFDeEIsWUFBSyxhQUFMLENBQW1CLEdBQW5CLENBQXdCLEdBQXhCLEVBQTZCLE1BQU0sR0FBTixDQUE3QixFQUR3QjtPQUF6Qjs7OzsyQkFXTSxVQUFXO0FBQ2pCLFdBQUssY0FBTCxHQUFzQixRQUF0QixDQURpQjs7Ozs0QkFXVixXQUFZO0FBQ25CLFdBQUssWUFBTCxHQUFvQixTQUFwQixDQURtQjs7OzswQkFZZCxhQUFjO0FBQ25CLFdBQUssUUFBTCxHQUFnQixXQUFoQixDQURtQjs7OztXQXpFUjtnRUFxQ1gsZ0pBWUEsZ0pBV0EsK0lBWUEiLCJmaWxlIjoiY3JpdGVyaWEuanMiLCJzb3VyY2VSb290IjoiL2xpYiJ9
