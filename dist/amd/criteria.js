define(["exports", "babel-runtime/core-js/object/get-own-property-descriptor", "babel-runtime/core-js/map", "babel-runtime/core-js/reflect/construct", "./utils"], function (exports, _getOwnPropertyDescriptor, _map, _construct, _utils) {
	/* -*- javascript -*- */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Criteria = undefined;

	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

	var _map2 = _interopRequireDefault(_map);

	var _construct2 = _interopRequireDefault(_construct);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
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

	var _desc, _value, _class;

	let Criteria = exports.Criteria = (_class = class Criteria {

		static all() {
			return (0, _construct2.default)(this);
		}

		constructor(pairs = {}) {
			this.filterClauses = new _map2.default();
			this.maxResultCount = null;
			this.resultOffset = null;
			this.location = null;

			for (let key in pairs) {
				this.filterClauses.set(key, pairs[key]);
			}
		}

		clone() {
			var newObj = (0, _construct2.default)(this.constructor, [{}]);
			newObj.filterClauses = new _map2.default(this.filterClauses);
			newObj.maxResultCount = this.maxResultCount;
			newObj.resultOffset = this.resultOffset;
			return newObj;
		}

		hasFilter() {
			return this.filterClauses.size > 0;
		}

		/**
   * Create clone of the current criteria with the additional filter
   * {pairs}.
   * 
   */

		filter(pairs) {
			for (let key in pairs) {
				this.filterClauses.set(key, pairs[key]);
			}
		}

		/**
   * Create a clone of the current criteria with its limit set to {newLimit}.
   * @param {Integer} newLimit The new limit on how many objects to return.
   */

		limit(newLimit) {
			this.maxResultCount = newLimit;
		}

		/**
   * Create a clone of the current criteria with its offset set to {newOffset}.
   * @param {Integer} newOffset The new index into the filtered set to use as the first
   *                  result.
   */

		offset(newOffset) {
			this.resultOffset = newOffset;
		}

		/**
   * Create a clone of the current criteria with its location set to {newLocation}.
   * @param {Object} location  The location the resource should be fetched from; the
   *                           value of this parameter is datastore-dependent, and
   *                           may not make sense for all of them.
   */

		from(newLocation) {
			this.location = newLocation;
		}

	}, (_applyDecoratedDescriptor(_class.prototype, "filter", [_utils.monadic], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, "filter"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "limit", [_utils.monadic], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, "limit"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "offset", [_utils.monadic], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, "offset"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "from", [_utils.monadic], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, "from"), _class.prototype)), _class);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyaXRlcmlhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBWWEsd0NBQU4sTUFBTSxRQUFOLENBQWU7O0FBRXJCLFNBQU8sR0FBUCxHQUFhO0FBQ1osVUFBTyx5QkFBbUIsSUFBbkIsQ0FBUCxDQURZO0dBQWI7O0FBSUEsY0FBYSxRQUFNLEVBQU4sRUFBVztBQUN2QixRQUFLLGFBQUwsR0FBcUIsbUJBQXJCLENBRHVCO0FBRXZCLFFBQUssY0FBTCxHQUFzQixJQUF0QixDQUZ1QjtBQUd2QixRQUFLLFlBQUwsR0FBb0IsSUFBcEIsQ0FIdUI7QUFJdkIsUUFBSyxRQUFMLEdBQWdCLElBQWhCLENBSnVCOztBQU12QixRQUFNLElBQUksR0FBSixJQUFXLEtBQWpCLEVBQXlCO0FBQ3hCLFNBQUssYUFBTCxDQUFtQixHQUFuQixDQUF3QixHQUF4QixFQUE2QixNQUFNLEdBQU4sQ0FBN0IsRUFEd0I7SUFBekI7R0FORDs7QUFZQSxVQUFRO0FBQ1AsT0FBSSxTQUFTLHlCQUFtQixLQUFLLFdBQUwsRUFBa0IsQ0FBQyxFQUFELENBQXJDLENBQVQsQ0FERztBQUVQLFVBQU8sYUFBUCxHQUF1QixrQkFBUyxLQUFLLGFBQUwsQ0FBaEMsQ0FGTztBQUdQLFVBQU8sY0FBUCxHQUF3QixLQUFLLGNBQUwsQ0FIakI7QUFJUCxVQUFPLFlBQVAsR0FBc0IsS0FBSyxZQUFMLENBSmY7QUFLUCxVQUFPLE1BQVAsQ0FMTztHQUFSOztBQVNBLGNBQVk7QUFDWCxVQUFTLEtBQUssYUFBTCxDQUFtQixJQUFuQixHQUEwQixDQUExQixDQURFO0dBQVo7Ozs7Ozs7QUEzQnFCO0FBc0NyQixTQUFRLEtBQVIsRUFBZ0I7QUFDZixRQUFNLElBQUksR0FBSixJQUFXLEtBQWpCLEVBQXlCO0FBQ3hCLFNBQUssYUFBTCxDQUFtQixHQUFuQixDQUF3QixHQUF4QixFQUE2QixNQUFNLEdBQU4sQ0FBN0IsRUFEd0I7SUFBekI7R0FERDs7Ozs7O0FBdENxQjtBQWtEckIsUUFBTyxRQUFQLEVBQWtCO0FBQ2pCLFFBQUssY0FBTCxHQUFzQixRQUF0QixDQURpQjtHQUFsQjs7Ozs7OztBQWxEcUI7QUE2RHJCLFNBQVEsU0FBUixFQUFvQjtBQUNuQixRQUFLLFlBQUwsR0FBb0IsU0FBcEIsQ0FEbUI7R0FBcEI7Ozs7Ozs7O0FBN0RxQjtBQXlFckIsT0FBTSxXQUFOLEVBQW9CO0FBQ25CLFFBQUssUUFBTCxHQUFnQixXQUFoQixDQURtQjtHQUFwQjs7RUF6RU0iLCJmaWxlIjoiY3JpdGVyaWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAtKi0gamF2YXNjcmlwdCAtKi0gKi9cblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQge21vbmFkaWN9IGZyb20gJy4vdXRpbHMnO1xuXG5cbi8qKlxuICogRmx1ZW50IGNyaXRlcmlhIGZvciBCYWlsaXdpY2sgcXVlcnlpbmdcbiAqXG4gKiBAY2xhc3MgQ3JpdGVyaWFcbiAqIEBjb25zdHJ1Y3RvclxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIENyaXRlcmlhIHtcblxuXHRzdGF0aWMgYWxsKCkge1xuXHRcdHJldHVybiBSZWZsZWN0LmNvbnN0cnVjdCggdGhpcyApO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoIHBhaXJzPXt9ICkge1xuXHRcdHRoaXMuZmlsdGVyQ2xhdXNlcyA9IG5ldyBNYXAoKTtcblx0XHR0aGlzLm1heFJlc3VsdENvdW50ID0gbnVsbDtcblx0XHR0aGlzLnJlc3VsdE9mZnNldCA9IG51bGw7XG5cdFx0dGhpcy5sb2NhdGlvbiA9IG51bGw7XG5cblx0XHRmb3IgKCBsZXQga2V5IGluIHBhaXJzICkge1xuXHRcdFx0dGhpcy5maWx0ZXJDbGF1c2VzLnNldCgga2V5LCBwYWlyc1trZXldICk7XG5cdFx0fVxuXHR9XG5cblxuXHRjbG9uZSgpIHtcblx0XHR2YXIgbmV3T2JqID0gUmVmbGVjdC5jb25zdHJ1Y3QoIHRoaXMuY29uc3RydWN0b3IsIFt7fV0gKTtcblx0XHRuZXdPYmouZmlsdGVyQ2xhdXNlcyA9IG5ldyBNYXAoIHRoaXMuZmlsdGVyQ2xhdXNlcyApO1xuXHRcdG5ld09iai5tYXhSZXN1bHRDb3VudCA9IHRoaXMubWF4UmVzdWx0Q291bnQ7XG5cdFx0bmV3T2JqLnJlc3VsdE9mZnNldCA9IHRoaXMucmVzdWx0T2Zmc2V0O1xuXHRcdHJldHVybiBuZXdPYmo7XG5cdH1cblxuXG5cdGhhc0ZpbHRlcigpIHtcblx0XHRyZXR1cm4gKCB0aGlzLmZpbHRlckNsYXVzZXMuc2l6ZSA+IDAgKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIENyZWF0ZSBjbG9uZSBvZiB0aGUgY3VycmVudCBjcml0ZXJpYSB3aXRoIHRoZSBhZGRpdGlvbmFsIGZpbHRlclxuXHQgKiB7cGFpcnN9LlxuXHQgKiBcblx0ICovXG5cdEBtb25hZGljXG5cdGZpbHRlciggcGFpcnMgKSB7XG5cdFx0Zm9yICggbGV0IGtleSBpbiBwYWlycyApIHtcblx0XHRcdHRoaXMuZmlsdGVyQ2xhdXNlcy5zZXQoIGtleSwgcGFpcnNba2V5XSApO1xuXHRcdH1cblx0fVxuXG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIGNsb25lIG9mIHRoZSBjdXJyZW50IGNyaXRlcmlhIHdpdGggaXRzIGxpbWl0IHNldCB0byB7bmV3TGltaXR9LlxuXHQgKiBAcGFyYW0ge0ludGVnZXJ9IG5ld0xpbWl0IFRoZSBuZXcgbGltaXQgb24gaG93IG1hbnkgb2JqZWN0cyB0byByZXR1cm4uXG5cdCAqL1xuXHRAbW9uYWRpY1xuXHRsaW1pdCggbmV3TGltaXQgKSB7XG5cdFx0dGhpcy5tYXhSZXN1bHRDb3VudCA9IG5ld0xpbWl0O1xuXHR9XG5cblxuXHQvKipcblx0ICogQ3JlYXRlIGEgY2xvbmUgb2YgdGhlIGN1cnJlbnQgY3JpdGVyaWEgd2l0aCBpdHMgb2Zmc2V0IHNldCB0byB7bmV3T2Zmc2V0fS5cblx0ICogQHBhcmFtIHtJbnRlZ2VyfSBuZXdPZmZzZXQgVGhlIG5ldyBpbmRleCBpbnRvIHRoZSBmaWx0ZXJlZCBzZXQgdG8gdXNlIGFzIHRoZSBmaXJzdFxuXHQgKiAgICAgICAgICAgICAgICAgIHJlc3VsdC5cblx0ICovXG5cdEBtb25hZGljXG5cdG9mZnNldCggbmV3T2Zmc2V0ICkge1xuXHRcdHRoaXMucmVzdWx0T2Zmc2V0ID0gbmV3T2Zmc2V0O1xuXHR9XG5cblxuXHQvKipcblx0ICogQ3JlYXRlIGEgY2xvbmUgb2YgdGhlIGN1cnJlbnQgY3JpdGVyaWEgd2l0aCBpdHMgbG9jYXRpb24gc2V0IHRvIHtuZXdMb2NhdGlvbn0uXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBsb2NhdGlvbiAgVGhlIGxvY2F0aW9uIHRoZSByZXNvdXJjZSBzaG91bGQgYmUgZmV0Y2hlZCBmcm9tOyB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSBvZiB0aGlzIHBhcmFtZXRlciBpcyBkYXRhc3RvcmUtZGVwZW5kZW50LCBhbmRcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICBtYXkgbm90IG1ha2Ugc2Vuc2UgZm9yIGFsbCBvZiB0aGVtLlxuXHQgKi9cblx0QG1vbmFkaWNcblx0ZnJvbSggbmV3TG9jYXRpb24gKSB7XG5cdFx0dGhpcy5sb2NhdGlvbiA9IG5ld0xvY2F0aW9uO1xuXHR9XG5cblxufVxuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
