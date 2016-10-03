
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
					var pairs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyaXRlcmlhLmpzIl0sIm5hbWVzIjpbIm1vbmFkaWMiLCJDcml0ZXJpYSIsIlJlZmxlY3QiLCJjb25zdHJ1Y3QiLCJwYWlycyIsImZpbHRlckNsYXVzZXMiLCJNYXAiLCJtYXhSZXN1bHRDb3VudCIsInJlc3VsdE9mZnNldCIsImxvY2F0aW9uIiwia2V5Iiwic2V0IiwibmV3T2JqIiwiY29uc3RydWN0b3IiLCJzaXplIiwibmV3TGltaXQiLCJuZXdPZmZzZXQiLCJuZXdMb2NhdGlvbiJdLCJtYXBwaW5ncyI6IjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVRQSxVLFVBQUFBLE87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1QkFVS0MsUTs7OzJCQUVDO0FBQ1osYUFBT0MsUUFBUUMsU0FBUixDQUFtQixJQUFuQixFQUF5QixFQUF6QixDQUFQO0FBQ0E7OztBQUVELHdCQUF3QjtBQUFBLFNBQVhDLEtBQVcsdUVBQUwsRUFBSzs7QUFBQTs7QUFDdkIsVUFBS0MsYUFBTCxHQUFxQixJQUFJQyxHQUFKLEVBQXJCO0FBQ0EsVUFBS0MsY0FBTCxHQUFzQixJQUF0QjtBQUNBLFVBQUtDLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxVQUFLQyxRQUFMLEdBQWdCLElBQWhCOztBQUVBLFVBQU0sSUFBSUMsR0FBVixJQUFpQk4sS0FBakIsRUFBeUI7QUFDeEIsV0FBS0MsYUFBTCxDQUFtQk0sR0FBbkIsQ0FBd0JELEdBQXhCLEVBQTZCTixNQUFNTSxHQUFOLENBQTdCO0FBQ0E7QUFDRDs7Ozs2QkFHTztBQUNQLFVBQUlFLFNBQVNWLFFBQVFDLFNBQVIsQ0FBbUIsS0FBS1UsV0FBeEIsRUFBcUMsQ0FBQyxFQUFELENBQXJDLENBQWI7QUFDQUQsYUFBT1AsYUFBUCxHQUF1QixJQUFJQyxHQUFKLENBQVMsS0FBS0QsYUFBZCxDQUF2QjtBQUNBTyxhQUFPTCxjQUFQLEdBQXdCLEtBQUtBLGNBQTdCO0FBQ0FLLGFBQU9KLFlBQVAsR0FBc0IsS0FBS0EsWUFBM0I7QUFDQSxhQUFPSSxNQUFQO0FBQ0E7OztpQ0FHVztBQUNYLGFBQVMsS0FBS1AsYUFBTCxDQUFtQlMsSUFBbkIsR0FBMEIsQ0FBbkM7QUFDQTs7OzRCQVNPVixLLEVBQVE7QUFDZixXQUFNLElBQUlNLEdBQVYsSUFBaUJOLEtBQWpCLEVBQXlCO0FBQ3hCLFlBQUtDLGFBQUwsQ0FBbUJNLEdBQW5CLENBQXdCRCxHQUF4QixFQUE2Qk4sTUFBTU0sR0FBTixDQUE3QjtBQUNBO0FBQ0Q7OzsyQkFRTUssUSxFQUFXO0FBQ2pCLFdBQUtSLGNBQUwsR0FBc0JRLFFBQXRCO0FBQ0E7Ozs0QkFTT0MsUyxFQUFZO0FBQ25CLFdBQUtSLFlBQUwsR0FBb0JRLFNBQXBCO0FBQ0E7OzswQkFVS0MsVyxFQUFjO0FBQ25CLFdBQUtSLFFBQUwsR0FBZ0JRLFdBQWhCO0FBQ0E7Ozs7Z0VBdENBakIsTyx5SUFZQUEsTyx5SUFXQUEsTyx3SUFZQUEsTyIsImZpbGUiOiJjcml0ZXJpYS5qcyIsInNvdXJjZVJvb3QiOiIvbGliIn0=
