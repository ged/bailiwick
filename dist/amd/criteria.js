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
	}(), (_applyDecoratedDescriptor(_class.prototype, "filter", [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, "filter"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "limit", [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, "limit"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "offset", [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, "offset"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "from", [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, "from"), _class.prototype)), _class);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyaXRlcmlhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FZYTs7O3lCQUVDO0FBQ1osV0FBTyxRQUFRLFNBQVIsQ0FBbUIsSUFBbkIsRUFBeUIsRUFBekIsQ0FBUCxDQURZOzs7O0FBSWIsV0FOWSxRQU1aLEdBQXdCO09BQVgsOERBQU0sa0JBQUs7O3lCQU5aLFVBTVk7O0FBQ3ZCLFFBQUssYUFBTCxHQUFxQixJQUFJLEdBQUosRUFBckIsQ0FEdUI7QUFFdkIsUUFBSyxjQUFMLEdBQXNCLElBQXRCLENBRnVCO0FBR3ZCLFFBQUssWUFBTCxHQUFvQixJQUFwQixDQUh1QjtBQUl2QixRQUFLLFFBQUwsR0FBZ0IsSUFBaEIsQ0FKdUI7O0FBTXZCLFFBQU0sSUFBSSxHQUFKLElBQVcsS0FBakIsRUFBeUI7QUFDeEIsU0FBSyxhQUFMLENBQW1CLEdBQW5CLENBQXdCLEdBQXhCLEVBQTZCLE1BQU0sR0FBTixDQUE3QixFQUR3QjtJQUF6QjtHQU5EOztlQU5ZOzsyQkFrQko7QUFDUCxRQUFJLFNBQVMsUUFBUSxTQUFSLENBQW1CLEtBQUssV0FBTCxFQUFrQixDQUFDLEVBQUQsQ0FBckMsQ0FBVCxDQURHO0FBRVAsV0FBTyxhQUFQLEdBQXVCLElBQUksR0FBSixDQUFTLEtBQUssYUFBTCxDQUFoQyxDQUZPO0FBR1AsV0FBTyxjQUFQLEdBQXdCLEtBQUssY0FBTCxDQUhqQjtBQUlQLFdBQU8sWUFBUCxHQUFzQixLQUFLLFlBQUwsQ0FKZjtBQUtQLFdBQU8sTUFBUCxDQUxPOzs7OytCQVNJO0FBQ1gsV0FBUyxLQUFLLGFBQUwsQ0FBbUIsSUFBbkIsR0FBMEIsQ0FBMUIsQ0FERTs7OzswQkFXSixPQUFRO0FBQ2YsU0FBTSxJQUFJLEdBQUosSUFBVyxLQUFqQixFQUF5QjtBQUN4QixVQUFLLGFBQUwsQ0FBbUIsR0FBbkIsQ0FBd0IsR0FBeEIsRUFBNkIsTUFBTSxHQUFOLENBQTdCLEVBRHdCO0tBQXpCOzs7O3lCQVdNLFVBQVc7QUFDakIsU0FBSyxjQUFMLEdBQXNCLFFBQXRCLENBRGlCOzs7OzBCQVdWLFdBQVk7QUFDbkIsU0FBSyxZQUFMLEdBQW9CLFNBQXBCLENBRG1COzs7O3dCQVlkLGFBQWM7QUFDbkIsU0FBSyxRQUFMLEdBQWdCLFdBQWhCLENBRG1COzs7O1NBekVSIiwiZmlsZSI6ImNyaXRlcmlhLmpzIiwic291cmNlUm9vdCI6Ii9saWIifQ==
