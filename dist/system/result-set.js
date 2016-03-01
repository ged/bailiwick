/* -*- javascript -*- */
"use strict";

System.register(['babel-runtime/core-js/object/get-own-property-descriptor', 'babel-runtime/core-js/reflect/construct', './criteria', './utils'], function (_export, _context) {
	var _Object$getOwnPropertyDescriptor, _Reflect$construct, Criteria, monadic;

	return {
		setters: [function (_babelRuntimeCoreJsObjectGetOwnPropertyDescriptor) {
			_Object$getOwnPropertyDescriptor = _babelRuntimeCoreJsObjectGetOwnPropertyDescriptor.default;
		}, function (_babelRuntimeCoreJsReflectConstruct) {
			_Reflect$construct = _babelRuntimeCoreJsReflectConstruct.default;
		}, function (_criteria) {
			Criteria = _criteria.Criteria;
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

			let ResultSet = (_class = class ResultSet {

				constructor(model, criteria = null) {
					if (criteria === null) {
						criteria = new Criteria();
					} else if (!(criteria instanceof Criteria)) {
						criteria = new Criteria(criteria);
					}

					this.model = model;
					this.criteria = criteria;
				}

				/**
     * Return a Promise that will resolve as the reified results described by
     * the ResultSet.
     * @method get
     */
				get(limit = null, offset = null) {
					var cr = this.criteria;
					if (limit) {
						cr = cr.limit(limit);
					}
					if (offset) {
						cr = cr.offset(offset);
					}

					console.debug("Fetching %s results matching criteria: %o", this.model.name, cr);
					return this.model.get(cr);
				}

				/*
     * Monadic API
     */

				/**
     * Monadic API -- duplicate the ResultSet.
     * @return {ResultSet} the cloned result set
     */
				clone() {
					return _Reflect$construct(this.constructor, [this.model, this.criteria]);
				}

				/**
     * Add selection criteria to the set.
     * @method where
     * @param {Object} params  key/value pairs that will be mapped to selection criteria.
     * @return {ResultSet}  the cloned result set with the additional criteria.
     */

				where(params) {
					console.debug("Cloning resultset to add params: ", params);
					this.criteria = this.criteria.filter(params);
				}

				/**
     * Add a limit to the maximum size of the set.
     * @method limit
     * @param {Number} count  the maximum number of results in the set
     * @return {ResultSet}  the cloned result set with the new limit.
     */

				limit(count) {
					console.debug("Cloned resultset to add limit: ", count);
					this.criteria = this.criteria.limit(count);
				}

				/**
     * Add an offset into the set that should be the first element.
     * @method index
     * @param {Number} index  the index of the first element of the set of all
     *                        matching model objects.
     * @return {ResultSet}  the cloned result set with the new offset.
     */

				offset(index) {
					console.debug("Cloned resultset to add offset: ", index);
					this.criteria = this.criteria.offset(index);
				}

				/**
     * Specify a different location to fetch results from.
     * @method from
     * @param {Object} location   the location to specify when using the datastore.
     * @return {ResultSet}  the cloned result set with the new location.
     */

				from(location) {
					console.debug("Clone resultset to change location: ", location);
					this.criteria = this.criteria.from(location);
				}

			}, (_applyDecoratedDescriptor(_class.prototype, 'where', [monadic], _Object$getOwnPropertyDescriptor(_class.prototype, 'where'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'limit', [monadic], _Object$getOwnPropertyDescriptor(_class.prototype, 'limit'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'offset', [monadic], _Object$getOwnPropertyDescriptor(_class.prototype, 'offset'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'from', [monadic], _Object$getOwnPropertyDescriptor(_class.prototype, 'from'), _class.prototype)), _class);

			_export('ResultSet', ResultSet);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VsdC1zZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBOzs7Ozs7Ozs7OztBQUVROztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BU0ssc0JBQU4sTUFBTSxTQUFOLENBQWdCOztBQUV0QixnQkFBYSxLQUFiLEVBQW9CLFdBQVMsSUFBVCxFQUFnQjtBQUNuQyxTQUFLLGFBQWEsSUFBYixFQUFvQjtBQUN4QixpQkFBVyxJQUFJLFFBQUosRUFBWCxDQUR3QjtNQUF6QixNQUdLLElBQUssRUFBRSxvQkFBb0IsUUFBcEIsQ0FBRixFQUFrQztBQUMzQyxpQkFBVyxJQUFJLFFBQUosQ0FBYyxRQUFkLENBQVgsQ0FEMkM7TUFBdkM7O0FBSUwsVUFBSyxLQUFMLEdBQWEsS0FBYixDQVJtQztBQVNuQyxVQUFLLFFBQUwsR0FBZ0IsUUFBaEIsQ0FUbUM7S0FBcEM7Ozs7Ozs7QUFGc0IsT0FvQnRCLENBQUssUUFBTSxJQUFOLEVBQVksU0FBTyxJQUFQLEVBQWM7QUFDOUIsU0FBSSxLQUFLLEtBQUssUUFBTCxDQURxQjtBQUU5QixTQUFLLEtBQUwsRUFBYTtBQUFFLFdBQUssR0FBRyxLQUFILENBQVUsS0FBVixDQUFMLENBQUY7TUFBYjtBQUNBLFNBQUssTUFBTCxFQUFjO0FBQUUsV0FBSyxHQUFHLE1BQUgsQ0FBVyxNQUFYLENBQUwsQ0FBRjtNQUFkOztBQUVBLGFBQVEsS0FBUixDQUFlLDJDQUFmLEVBQTRELEtBQUssS0FBTCxDQUFXLElBQVgsRUFBaUIsRUFBN0UsRUFMOEI7QUFNOUIsWUFBTyxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWdCLEVBQWhCLENBQVAsQ0FOOEI7S0FBL0I7Ozs7Ozs7Ozs7QUFwQnNCLFNBc0N0QixHQUFRO0FBQ1AsWUFBTyxtQkFBbUIsS0FBSyxXQUFMLEVBQWtCLENBQUMsS0FBSyxLQUFMLEVBQVksS0FBSyxRQUFMLENBQWxELENBQVAsQ0FETztLQUFSOzs7Ozs7OztBQXRDc0I7QUFrRHRCLFVBQU8sTUFBUCxFQUFnQjtBQUNmLGFBQVEsS0FBUixDQUFlLG1DQUFmLEVBQW9ELE1BQXBELEVBRGU7QUFFZixVQUFLLFFBQUwsR0FBZ0IsS0FBSyxRQUFMLENBQWMsTUFBZCxDQUFzQixNQUF0QixDQUFoQixDQUZlO0tBQWhCOzs7Ozs7OztBQWxEc0I7QUErRHRCLFVBQU8sS0FBUCxFQUFlO0FBQ2QsYUFBUSxLQUFSLENBQWUsaUNBQWYsRUFBa0QsS0FBbEQsRUFEYztBQUVkLFVBQUssUUFBTCxHQUFnQixLQUFLLFFBQUwsQ0FBYyxLQUFkLENBQXFCLEtBQXJCLENBQWhCLENBRmM7S0FBZjs7Ozs7Ozs7O0FBL0RzQjtBQTZFdEIsV0FBUSxLQUFSLEVBQWdCO0FBQ2YsYUFBUSxLQUFSLENBQWUsa0NBQWYsRUFBbUQsS0FBbkQsRUFEZTtBQUVmLFVBQUssUUFBTCxHQUFnQixLQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXNCLEtBQXRCLENBQWhCLENBRmU7S0FBaEI7Ozs7Ozs7O0FBN0VzQjtBQTBGdEIsU0FBTSxRQUFOLEVBQWlCO0FBQ2hCLGFBQVEsS0FBUixDQUFlLHNDQUFmLEVBQXVELFFBQXZELEVBRGdCO0FBRWhCLFVBQUssUUFBTCxHQUFnQixLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW9CLFFBQXBCLENBQWhCLENBRmdCO0tBQWpCOztJQTFGTSx5REFpREwsZ0pBYUEsaUpBY0EsZ0pBYUEiLCJmaWxlIjoicmVzdWx0LXNldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0qLSBqYXZhc2NyaXB0IC0qLSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7Q3JpdGVyaWF9IGZyb20gJy4vY3JpdGVyaWEnO1xuaW1wb3J0IHttb25hZGljfSBmcm9tICcuL3V0aWxzJztcblxuLyoqXG4gKiBBIG1vbmFkaWMvZmx1aWQgaW50ZXJmYWNlIHRvIGFuIHVucmVpZmllZCBzZXQgb2YgTW9kZWwgb2JqZWN0cyBtYWRlIHVwIG9mXG4gKiBhIE1vZGVsIGNsYXNzIGFuZCBhIENyaXRlcmlhIGZvciBzZWxlY3RpbmcgYSBzdWJzZXQgb2YgdGhlbS5cbiAqXG4gKiBAY2xhc3MgUmVzdWx0U2V0XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZXhwb3J0IGNsYXNzIFJlc3VsdFNldCB7XG5cblx0Y29uc3RydWN0b3IoIG1vZGVsLCBjcml0ZXJpYT1udWxsICkge1xuXHRcdGlmICggY3JpdGVyaWEgPT09IG51bGwgKSB7XG5cdFx0XHRjcml0ZXJpYSA9IG5ldyBDcml0ZXJpYSgpO1xuXHRcdH1cblx0XHRlbHNlIGlmICggIShjcml0ZXJpYSBpbnN0YW5jZW9mIENyaXRlcmlhKSApIHtcblx0XHRcdGNyaXRlcmlhID0gbmV3IENyaXRlcmlhKCBjcml0ZXJpYSApO1xuXHRcdH1cblxuXHRcdHRoaXMubW9kZWwgPSBtb2RlbDtcblx0XHR0aGlzLmNyaXRlcmlhID0gY3JpdGVyaWE7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gYSBQcm9taXNlIHRoYXQgd2lsbCByZXNvbHZlIGFzIHRoZSByZWlmaWVkIHJlc3VsdHMgZGVzY3JpYmVkIGJ5XG5cdCAqIHRoZSBSZXN1bHRTZXQuXG5cdCAqIEBtZXRob2QgZ2V0XG5cdCAqL1xuXHRnZXQoIGxpbWl0PW51bGwsIG9mZnNldD1udWxsICkge1xuXHRcdHZhciBjciA9IHRoaXMuY3JpdGVyaWE7XG5cdFx0aWYgKCBsaW1pdCApIHsgY3IgPSBjci5saW1pdCggbGltaXQgKTsgfVxuXHRcdGlmICggb2Zmc2V0ICkgeyBjciA9IGNyLm9mZnNldCggb2Zmc2V0ICk7IH1cblxuXHRcdGNvbnNvbGUuZGVidWcoIFwiRmV0Y2hpbmcgJXMgcmVzdWx0cyBtYXRjaGluZyBjcml0ZXJpYTogJW9cIiwgdGhpcy5tb2RlbC5uYW1lLCBjciApO1xuXHRcdHJldHVybiB0aGlzLm1vZGVsLmdldCggY3IgKTtcblx0fVxuXG5cblx0Lypcblx0ICogTW9uYWRpYyBBUElcblx0ICovXG5cblx0LyoqXG5cdCAqIE1vbmFkaWMgQVBJIC0tIGR1cGxpY2F0ZSB0aGUgUmVzdWx0U2V0LlxuXHQgKiBAcmV0dXJuIHtSZXN1bHRTZXR9IHRoZSBjbG9uZWQgcmVzdWx0IHNldFxuXHQgKi9cblx0Y2xvbmUoKSB7XG5cdFx0cmV0dXJuIFJlZmxlY3QuY29uc3RydWN0KCB0aGlzLmNvbnN0cnVjdG9yLCBbdGhpcy5tb2RlbCwgdGhpcy5jcml0ZXJpYV0gKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIEFkZCBzZWxlY3Rpb24gY3JpdGVyaWEgdG8gdGhlIHNldC5cblx0ICogQG1ldGhvZCB3aGVyZVxuXHQgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zICBrZXkvdmFsdWUgcGFpcnMgdGhhdCB3aWxsIGJlIG1hcHBlZCB0byBzZWxlY3Rpb24gY3JpdGVyaWEuXG5cdCAqIEByZXR1cm4ge1Jlc3VsdFNldH0gIHRoZSBjbG9uZWQgcmVzdWx0IHNldCB3aXRoIHRoZSBhZGRpdGlvbmFsIGNyaXRlcmlhLlxuXHQgKi9cblx0QG1vbmFkaWNcblx0d2hlcmUoIHBhcmFtcyApIHtcblx0XHRjb25zb2xlLmRlYnVnKCBcIkNsb25pbmcgcmVzdWx0c2V0IHRvIGFkZCBwYXJhbXM6IFwiLCBwYXJhbXMgKTtcblx0XHR0aGlzLmNyaXRlcmlhID0gdGhpcy5jcml0ZXJpYS5maWx0ZXIoIHBhcmFtcyApO1xuXHR9XG5cblxuXHQvKipcblx0ICogQWRkIGEgbGltaXQgdG8gdGhlIG1heGltdW0gc2l6ZSBvZiB0aGUgc2V0LlxuXHQgKiBAbWV0aG9kIGxpbWl0XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudCAgdGhlIG1heGltdW0gbnVtYmVyIG9mIHJlc3VsdHMgaW4gdGhlIHNldFxuXHQgKiBAcmV0dXJuIHtSZXN1bHRTZXR9ICB0aGUgY2xvbmVkIHJlc3VsdCBzZXQgd2l0aCB0aGUgbmV3IGxpbWl0LlxuXHQgKi9cblx0QG1vbmFkaWNcblx0bGltaXQoIGNvdW50ICkge1xuXHRcdGNvbnNvbGUuZGVidWcoIFwiQ2xvbmVkIHJlc3VsdHNldCB0byBhZGQgbGltaXQ6IFwiLCBjb3VudCApO1xuXHRcdHRoaXMuY3JpdGVyaWEgPSB0aGlzLmNyaXRlcmlhLmxpbWl0KCBjb3VudCApO1xuXHR9XG5cblxuXHQvKipcblx0ICogQWRkIGFuIG9mZnNldCBpbnRvIHRoZSBzZXQgdGhhdCBzaG91bGQgYmUgdGhlIGZpcnN0IGVsZW1lbnQuXG5cdCAqIEBtZXRob2QgaW5kZXhcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4ICB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIHNldCBvZiBhbGxcblx0ICogICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGluZyBtb2RlbCBvYmplY3RzLlxuXHQgKiBAcmV0dXJuIHtSZXN1bHRTZXR9ICB0aGUgY2xvbmVkIHJlc3VsdCBzZXQgd2l0aCB0aGUgbmV3IG9mZnNldC5cblx0ICovXG5cdEBtb25hZGljXG5cdG9mZnNldCggaW5kZXggKSB7XG5cdFx0Y29uc29sZS5kZWJ1ZyggXCJDbG9uZWQgcmVzdWx0c2V0IHRvIGFkZCBvZmZzZXQ6IFwiLCBpbmRleCApO1xuXHRcdHRoaXMuY3JpdGVyaWEgPSB0aGlzLmNyaXRlcmlhLm9mZnNldCggaW5kZXggKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIFNwZWNpZnkgYSBkaWZmZXJlbnQgbG9jYXRpb24gdG8gZmV0Y2ggcmVzdWx0cyBmcm9tLlxuXHQgKiBAbWV0aG9kIGZyb21cblx0ICogQHBhcmFtIHtPYmplY3R9IGxvY2F0aW9uICAgdGhlIGxvY2F0aW9uIHRvIHNwZWNpZnkgd2hlbiB1c2luZyB0aGUgZGF0YXN0b3JlLlxuXHQgKiBAcmV0dXJuIHtSZXN1bHRTZXR9ICB0aGUgY2xvbmVkIHJlc3VsdCBzZXQgd2l0aCB0aGUgbmV3IGxvY2F0aW9uLlxuXHQgKi9cblx0QG1vbmFkaWNcblx0ZnJvbSggbG9jYXRpb24gKSB7XG5cdFx0Y29uc29sZS5kZWJ1ZyggXCJDbG9uZSByZXN1bHRzZXQgdG8gY2hhbmdlIGxvY2F0aW9uOiBcIiwgbG9jYXRpb24gKTtcblx0XHR0aGlzLmNyaXRlcmlhID0gdGhpcy5jcml0ZXJpYS5mcm9tKCBsb2NhdGlvbiApO1xuXHR9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
