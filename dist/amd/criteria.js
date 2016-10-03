define(["exports", "./utils"], function (exports, _utils) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Criteria = undefined;

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

	var Criteria = exports.Criteria = (_class = function () {
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
	}(), (_applyDecoratedDescriptor(_class.prototype, "filter", [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, "filter"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "limit", [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, "limit"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "offset", [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, "offset"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "from", [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, "from"), _class.prototype)), _class);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyaXRlcmlhLmpzIl0sIm5hbWVzIjpbIkNyaXRlcmlhIiwiUmVmbGVjdCIsImNvbnN0cnVjdCIsInBhaXJzIiwiZmlsdGVyQ2xhdXNlcyIsIk1hcCIsIm1heFJlc3VsdENvdW50IiwicmVzdWx0T2Zmc2V0IiwibG9jYXRpb24iLCJrZXkiLCJzZXQiLCJuZXdPYmoiLCJjb25zdHJ1Y3RvciIsInNpemUiLCJuZXdMaW1pdCIsIm5ld09mZnNldCIsIm5ld0xvY2F0aW9uIl0sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBWWFBLFEsV0FBQUEsUTs7O3lCQUVDO0FBQ1osV0FBT0MsUUFBUUMsU0FBUixDQUFtQixJQUFuQixFQUF5QixFQUF6QixDQUFQO0FBQ0E7OztBQUVELHNCQUF3QjtBQUFBLE9BQVhDLEtBQVcsdUVBQUwsRUFBSzs7QUFBQTs7QUFDdkIsUUFBS0MsYUFBTCxHQUFxQixJQUFJQyxHQUFKLEVBQXJCO0FBQ0EsUUFBS0MsY0FBTCxHQUFzQixJQUF0QjtBQUNBLFFBQUtDLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxRQUFLQyxRQUFMLEdBQWdCLElBQWhCOztBQUVBLFFBQU0sSUFBSUMsR0FBVixJQUFpQk4sS0FBakIsRUFBeUI7QUFDeEIsU0FBS0MsYUFBTCxDQUFtQk0sR0FBbkIsQ0FBd0JELEdBQXhCLEVBQTZCTixNQUFNTSxHQUFOLENBQTdCO0FBQ0E7QUFDRDs7OzsyQkFHTztBQUNQLFFBQUlFLFNBQVNWLFFBQVFDLFNBQVIsQ0FBbUIsS0FBS1UsV0FBeEIsRUFBcUMsQ0FBQyxFQUFELENBQXJDLENBQWI7QUFDQUQsV0FBT1AsYUFBUCxHQUF1QixJQUFJQyxHQUFKLENBQVMsS0FBS0QsYUFBZCxDQUF2QjtBQUNBTyxXQUFPTCxjQUFQLEdBQXdCLEtBQUtBLGNBQTdCO0FBQ0FLLFdBQU9KLFlBQVAsR0FBc0IsS0FBS0EsWUFBM0I7QUFDQSxXQUFPSSxNQUFQO0FBQ0E7OzsrQkFHVztBQUNYLFdBQVMsS0FBS1AsYUFBTCxDQUFtQlMsSUFBbkIsR0FBMEIsQ0FBbkM7QUFDQTs7OzBCQVNPVixLLEVBQVE7QUFDZixTQUFNLElBQUlNLEdBQVYsSUFBaUJOLEtBQWpCLEVBQXlCO0FBQ3hCLFVBQUtDLGFBQUwsQ0FBbUJNLEdBQW5CLENBQXdCRCxHQUF4QixFQUE2Qk4sTUFBTU0sR0FBTixDQUE3QjtBQUNBO0FBQ0Q7Ozt5QkFRTUssUSxFQUFXO0FBQ2pCLFNBQUtSLGNBQUwsR0FBc0JRLFFBQXRCO0FBQ0E7OzswQkFTT0MsUyxFQUFZO0FBQ25CLFNBQUtSLFlBQUwsR0FBb0JRLFNBQXBCO0FBQ0E7Ozt3QkFVS0MsVyxFQUFjO0FBQ25CLFNBQUtSLFFBQUwsR0FBZ0JRLFdBQWhCO0FBQ0EiLCJmaWxlIjoiY3JpdGVyaWEuanMiLCJzb3VyY2VSb290IjoiL2xpYiJ9
