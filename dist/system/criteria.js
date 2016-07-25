
"use strict";

System.register(["./utils"], function (_export, _context) {
	"use strict";

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyaXRlcmlhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFUSxVLFVBQUEsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQVVLLFE7OzsyQkFFQztBQUNaLGFBQU8sUUFBUSxTQUFSLENBQW1CLElBQW5CLEVBQXlCLEVBQXpCLENBQVA7QUFDQTs7O0FBRUQsd0JBQXdCO0FBQUEsU0FBWCxLQUFXLHlEQUFMLEVBQUs7O0FBQUE7O0FBQ3ZCLFVBQUssYUFBTCxHQUFxQixJQUFJLEdBQUosRUFBckI7QUFDQSxVQUFLLGNBQUwsR0FBc0IsSUFBdEI7QUFDQSxVQUFLLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxVQUFLLFFBQUwsR0FBZ0IsSUFBaEI7O0FBRUEsVUFBTSxJQUFJLEdBQVYsSUFBaUIsS0FBakIsRUFBeUI7QUFDeEIsV0FBSyxhQUFMLENBQW1CLEdBQW5CLENBQXdCLEdBQXhCLEVBQTZCLE1BQU0sR0FBTixDQUE3QjtBQUNBO0FBQ0Q7Ozs7NkJBR087QUFDUCxVQUFJLFNBQVMsUUFBUSxTQUFSLENBQW1CLEtBQUssV0FBeEIsRUFBcUMsQ0FBQyxFQUFELENBQXJDLENBQWI7QUFDQSxhQUFPLGFBQVAsR0FBdUIsSUFBSSxHQUFKLENBQVMsS0FBSyxhQUFkLENBQXZCO0FBQ0EsYUFBTyxjQUFQLEdBQXdCLEtBQUssY0FBN0I7QUFDQSxhQUFPLFlBQVAsR0FBc0IsS0FBSyxZQUEzQjtBQUNBLGFBQU8sTUFBUDtBQUNBOzs7aUNBR1c7QUFDWCxhQUFTLEtBQUssYUFBTCxDQUFtQixJQUFuQixHQUEwQixDQUFuQztBQUNBOzs7NEJBU08sSyxFQUFRO0FBQ2YsV0FBTSxJQUFJLEdBQVYsSUFBaUIsS0FBakIsRUFBeUI7QUFDeEIsWUFBSyxhQUFMLENBQW1CLEdBQW5CLENBQXdCLEdBQXhCLEVBQTZCLE1BQU0sR0FBTixDQUE3QjtBQUNBO0FBQ0Q7OzsyQkFRTSxRLEVBQVc7QUFDakIsV0FBSyxjQUFMLEdBQXNCLFFBQXRCO0FBQ0E7Ozs0QkFTTyxTLEVBQVk7QUFDbkIsV0FBSyxZQUFMLEdBQW9CLFNBQXBCO0FBQ0E7OzswQkFVSyxXLEVBQWM7QUFDbkIsV0FBSyxRQUFMLEdBQWdCLFdBQWhCO0FBQ0E7Ozs7Z0VBdENBLE8seUlBWUEsTyx5SUFXQSxPLHdJQVlBLE8iLCJmaWxlIjoiY3JpdGVyaWEuanMiLCJzb3VyY2VSb290IjoiL2xpYiJ9
