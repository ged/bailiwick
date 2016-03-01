/* -*- javascript -*- */
"use strict";

System.register(["babel-runtime/core-js/object/get-own-property-descriptor", "babel-runtime/core-js/map", "babel-runtime/core-js/reflect/construct", "./utils"], function (_export, _context) {
	var _Object$getOwnPropertyDescriptor, _Map, _Reflect$construct, monadic;

	return {
		setters: [function (_babelRuntimeCoreJsObjectGetOwnPropertyDescriptor) {
			_Object$getOwnPropertyDescriptor = _babelRuntimeCoreJsObjectGetOwnPropertyDescriptor.default;
		}, function (_babelRuntimeCoreJsMap) {
			_Map = _babelRuntimeCoreJsMap.default;
		}, function (_babelRuntimeCoreJsReflectConstruct) {
			_Reflect$construct = _babelRuntimeCoreJsReflectConstruct.default;
		}, function (_utils) {
			monadic = _utils.monadic;
		}],
		execute: function () {
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

			let Criteria = (_class = class Criteria {

				static all() {
					return _Reflect$construct(this);
				}

				constructor(pairs = {}) {
					this.filterClauses = new _Map();
					this.maxResultCount = null;
					this.resultOffset = null;
					this.location = null;

					for (let key in pairs) {
						this.filterClauses.set(key, pairs[key]);
					}
				}

				clone() {
					var newObj = _Reflect$construct(this.constructor, [{}]);
					newObj.filterClauses = new _Map(this.filterClauses);
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

			}, (_applyDecoratedDescriptor(_class.prototype, "filter", [monadic], _Object$getOwnPropertyDescriptor(_class.prototype, "filter"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "limit", [monadic], _Object$getOwnPropertyDescriptor(_class.prototype, "limit"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "offset", [monadic], _Object$getOwnPropertyDescriptor(_class.prototype, "offset"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "from", [monadic], _Object$getOwnPropertyDescriptor(_class.prototype, "from"), _class.prototype)), _class);

			_export("Criteria", Criteria);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyaXRlcmlhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7Ozs7Ozs7OztBQUVROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BVUsscUJBQU4sTUFBTSxRQUFOLENBQWU7O0FBRXJCLFdBQU8sR0FBUCxHQUFhO0FBQ1osWUFBTyxtQkFBbUIsSUFBbkIsQ0FBUCxDQURZO0tBQWI7O0FBSUEsZ0JBQWEsUUFBTSxFQUFOLEVBQVc7QUFDdkIsVUFBSyxhQUFMLEdBQXFCLFVBQXJCLENBRHVCO0FBRXZCLFVBQUssY0FBTCxHQUFzQixJQUF0QixDQUZ1QjtBQUd2QixVQUFLLFlBQUwsR0FBb0IsSUFBcEIsQ0FIdUI7QUFJdkIsVUFBSyxRQUFMLEdBQWdCLElBQWhCLENBSnVCOztBQU12QixVQUFNLElBQUksR0FBSixJQUFXLEtBQWpCLEVBQXlCO0FBQ3hCLFdBQUssYUFBTCxDQUFtQixHQUFuQixDQUF3QixHQUF4QixFQUE2QixNQUFNLEdBQU4sQ0FBN0IsRUFEd0I7TUFBekI7S0FORDs7QUFZQSxZQUFRO0FBQ1AsU0FBSSxTQUFTLG1CQUFtQixLQUFLLFdBQUwsRUFBa0IsQ0FBQyxFQUFELENBQXJDLENBQVQsQ0FERztBQUVQLFlBQU8sYUFBUCxHQUF1QixTQUFTLEtBQUssYUFBTCxDQUFoQyxDQUZPO0FBR1AsWUFBTyxjQUFQLEdBQXdCLEtBQUssY0FBTCxDQUhqQjtBQUlQLFlBQU8sWUFBUCxHQUFzQixLQUFLLFlBQUwsQ0FKZjtBQUtQLFlBQU8sTUFBUCxDQUxPO0tBQVI7O0FBU0EsZ0JBQVk7QUFDWCxZQUFTLEtBQUssYUFBTCxDQUFtQixJQUFuQixHQUEwQixDQUExQixDQURFO0tBQVo7Ozs7Ozs7QUEzQnFCO0FBc0NyQixXQUFRLEtBQVIsRUFBZ0I7QUFDZixVQUFNLElBQUksR0FBSixJQUFXLEtBQWpCLEVBQXlCO0FBQ3hCLFdBQUssYUFBTCxDQUFtQixHQUFuQixDQUF3QixHQUF4QixFQUE2QixNQUFNLEdBQU4sQ0FBN0IsRUFEd0I7TUFBekI7S0FERDs7Ozs7O0FBdENxQjtBQWtEckIsVUFBTyxRQUFQLEVBQWtCO0FBQ2pCLFVBQUssY0FBTCxHQUFzQixRQUF0QixDQURpQjtLQUFsQjs7Ozs7OztBQWxEcUI7QUE2RHJCLFdBQVEsU0FBUixFQUFvQjtBQUNuQixVQUFLLFlBQUwsR0FBb0IsU0FBcEIsQ0FEbUI7S0FBcEI7Ozs7Ozs7O0FBN0RxQjtBQXlFckIsU0FBTSxXQUFOLEVBQW9CO0FBQ25CLFVBQUssUUFBTCxHQUFnQixXQUFoQixDQURtQjtLQUFwQjs7SUF6RU0sMERBcUNMLGlKQVlBLGlKQVdBLGdKQVlBIiwiZmlsZSI6ImNyaXRlcmlhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLSotIGphdmFzY3JpcHQgLSotICovXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHttb25hZGljfSBmcm9tICcuL3V0aWxzJztcblxuXG4vKipcbiAqIEZsdWVudCBjcml0ZXJpYSBmb3IgQmFpbGl3aWNrIHF1ZXJ5aW5nXG4gKlxuICogQGNsYXNzIENyaXRlcmlhXG4gKiBAY29uc3RydWN0b3JcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBDcml0ZXJpYSB7XG5cblx0c3RhdGljIGFsbCgpIHtcblx0XHRyZXR1cm4gUmVmbGVjdC5jb25zdHJ1Y3QoIHRoaXMgKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCBwYWlycz17fSApIHtcblx0XHR0aGlzLmZpbHRlckNsYXVzZXMgPSBuZXcgTWFwKCk7XG5cdFx0dGhpcy5tYXhSZXN1bHRDb3VudCA9IG51bGw7XG5cdFx0dGhpcy5yZXN1bHRPZmZzZXQgPSBudWxsO1xuXHRcdHRoaXMubG9jYXRpb24gPSBudWxsO1xuXG5cdFx0Zm9yICggbGV0IGtleSBpbiBwYWlycyApIHtcblx0XHRcdHRoaXMuZmlsdGVyQ2xhdXNlcy5zZXQoIGtleSwgcGFpcnNba2V5XSApO1xuXHRcdH1cblx0fVxuXG5cblx0Y2xvbmUoKSB7XG5cdFx0dmFyIG5ld09iaiA9IFJlZmxlY3QuY29uc3RydWN0KCB0aGlzLmNvbnN0cnVjdG9yLCBbe31dICk7XG5cdFx0bmV3T2JqLmZpbHRlckNsYXVzZXMgPSBuZXcgTWFwKCB0aGlzLmZpbHRlckNsYXVzZXMgKTtcblx0XHRuZXdPYmoubWF4UmVzdWx0Q291bnQgPSB0aGlzLm1heFJlc3VsdENvdW50O1xuXHRcdG5ld09iai5yZXN1bHRPZmZzZXQgPSB0aGlzLnJlc3VsdE9mZnNldDtcblx0XHRyZXR1cm4gbmV3T2JqO1xuXHR9XG5cblxuXHRoYXNGaWx0ZXIoKSB7XG5cdFx0cmV0dXJuICggdGhpcy5maWx0ZXJDbGF1c2VzLnNpemUgPiAwICk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgY2xvbmUgb2YgdGhlIGN1cnJlbnQgY3JpdGVyaWEgd2l0aCB0aGUgYWRkaXRpb25hbCBmaWx0ZXJcblx0ICoge3BhaXJzfS5cblx0ICogXG5cdCAqL1xuXHRAbW9uYWRpY1xuXHRmaWx0ZXIoIHBhaXJzICkge1xuXHRcdGZvciAoIGxldCBrZXkgaW4gcGFpcnMgKSB7XG5cdFx0XHR0aGlzLmZpbHRlckNsYXVzZXMuc2V0KCBrZXksIHBhaXJzW2tleV0gKTtcblx0XHR9XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBjbG9uZSBvZiB0aGUgY3VycmVudCBjcml0ZXJpYSB3aXRoIGl0cyBsaW1pdCBzZXQgdG8ge25ld0xpbWl0fS5cblx0ICogQHBhcmFtIHtJbnRlZ2VyfSBuZXdMaW1pdCBUaGUgbmV3IGxpbWl0IG9uIGhvdyBtYW55IG9iamVjdHMgdG8gcmV0dXJuLlxuXHQgKi9cblx0QG1vbmFkaWNcblx0bGltaXQoIG5ld0xpbWl0ICkge1xuXHRcdHRoaXMubWF4UmVzdWx0Q291bnQgPSBuZXdMaW1pdDtcblx0fVxuXG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIGNsb25lIG9mIHRoZSBjdXJyZW50IGNyaXRlcmlhIHdpdGggaXRzIG9mZnNldCBzZXQgdG8ge25ld09mZnNldH0uXG5cdCAqIEBwYXJhbSB7SW50ZWdlcn0gbmV3T2Zmc2V0IFRoZSBuZXcgaW5kZXggaW50byB0aGUgZmlsdGVyZWQgc2V0IHRvIHVzZSBhcyB0aGUgZmlyc3Rcblx0ICogICAgICAgICAgICAgICAgICByZXN1bHQuXG5cdCAqL1xuXHRAbW9uYWRpY1xuXHRvZmZzZXQoIG5ld09mZnNldCApIHtcblx0XHR0aGlzLnJlc3VsdE9mZnNldCA9IG5ld09mZnNldDtcblx0fVxuXG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIGNsb25lIG9mIHRoZSBjdXJyZW50IGNyaXRlcmlhIHdpdGggaXRzIGxvY2F0aW9uIHNldCB0byB7bmV3TG9jYXRpb259LlxuXHQgKiBAcGFyYW0ge09iamVjdH0gbG9jYXRpb24gIFRoZSBsb2NhdGlvbiB0aGUgcmVzb3VyY2Ugc2hvdWxkIGJlIGZldGNoZWQgZnJvbTsgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgb2YgdGhpcyBwYXJhbWV0ZXIgaXMgZGF0YXN0b3JlLWRlcGVuZGVudCwgYW5kXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF5IG5vdCBtYWtlIHNlbnNlIGZvciBhbGwgb2YgdGhlbS5cblx0ICovXG5cdEBtb25hZGljXG5cdGZyb20oIG5ld0xvY2F0aW9uICkge1xuXHRcdHRoaXMubG9jYXRpb24gPSBuZXdMb2NhdGlvbjtcblx0fVxuXG5cbn1cblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
