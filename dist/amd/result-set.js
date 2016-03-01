define(['exports', 'babel-runtime/core-js/object/get-own-property-descriptor', 'babel-runtime/core-js/reflect/construct', './criteria', './utils'], function (exports, _getOwnPropertyDescriptor, _construct, _criteria, _utils) {
	/* -*- javascript -*- */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ResultSet = undefined;

	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

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

	let ResultSet = exports.ResultSet = (_class = class ResultSet {

		constructor(model, criteria = null) {
			if (criteria === null) {
				criteria = new _criteria.Criteria();
			} else if (!(criteria instanceof _criteria.Criteria)) {
				criteria = new _criteria.Criteria(criteria);
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
			return (0, _construct2.default)(this.constructor, [this.model, this.criteria]);
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

	}, (_applyDecoratedDescriptor(_class.prototype, 'where', [_utils.monadic], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'where'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'limit', [_utils.monadic], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'limit'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'offset', [_utils.monadic], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'offset'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'from', [_utils.monadic], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'from'), _class.prototype)), _class);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VsdC1zZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBWWEsMENBQU4sTUFBTSxTQUFOLENBQWdCOztBQUV0QixjQUFhLEtBQWIsRUFBb0IsV0FBUyxJQUFULEVBQWdCO0FBQ25DLE9BQUssYUFBYSxJQUFiLEVBQW9CO0FBQ3hCLGVBQVcsd0JBQVgsQ0FEd0I7SUFBekIsTUFHSyxJQUFLLEVBQUUsdUNBQUYsRUFBa0M7QUFDM0MsZUFBVyx1QkFBYyxRQUFkLENBQVgsQ0FEMkM7SUFBdkM7O0FBSUwsUUFBSyxLQUFMLEdBQWEsS0FBYixDQVJtQztBQVNuQyxRQUFLLFFBQUwsR0FBZ0IsUUFBaEIsQ0FUbUM7R0FBcEM7Ozs7Ozs7QUFGc0IsS0FvQnRCLENBQUssUUFBTSxJQUFOLEVBQVksU0FBTyxJQUFQLEVBQWM7QUFDOUIsT0FBSSxLQUFLLEtBQUssUUFBTCxDQURxQjtBQUU5QixPQUFLLEtBQUwsRUFBYTtBQUFFLFNBQUssR0FBRyxLQUFILENBQVUsS0FBVixDQUFMLENBQUY7SUFBYjtBQUNBLE9BQUssTUFBTCxFQUFjO0FBQUUsU0FBSyxHQUFHLE1BQUgsQ0FBVyxNQUFYLENBQUwsQ0FBRjtJQUFkOztBQUVBLFdBQVEsS0FBUixDQUFlLDJDQUFmLEVBQTRELEtBQUssS0FBTCxDQUFXLElBQVgsRUFBaUIsRUFBN0UsRUFMOEI7QUFNOUIsVUFBTyxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWdCLEVBQWhCLENBQVAsQ0FOOEI7R0FBL0I7Ozs7Ozs7Ozs7QUFwQnNCLE9Bc0N0QixHQUFRO0FBQ1AsVUFBTyx5QkFBbUIsS0FBSyxXQUFMLEVBQWtCLENBQUMsS0FBSyxLQUFMLEVBQVksS0FBSyxRQUFMLENBQWxELENBQVAsQ0FETztHQUFSOzs7Ozs7OztBQXRDc0I7QUFrRHRCLFFBQU8sTUFBUCxFQUFnQjtBQUNmLFdBQVEsS0FBUixDQUFlLG1DQUFmLEVBQW9ELE1BQXBELEVBRGU7QUFFZixRQUFLLFFBQUwsR0FBZ0IsS0FBSyxRQUFMLENBQWMsTUFBZCxDQUFzQixNQUF0QixDQUFoQixDQUZlO0dBQWhCOzs7Ozs7OztBQWxEc0I7QUErRHRCLFFBQU8sS0FBUCxFQUFlO0FBQ2QsV0FBUSxLQUFSLENBQWUsaUNBQWYsRUFBa0QsS0FBbEQsRUFEYztBQUVkLFFBQUssUUFBTCxHQUFnQixLQUFLLFFBQUwsQ0FBYyxLQUFkLENBQXFCLEtBQXJCLENBQWhCLENBRmM7R0FBZjs7Ozs7Ozs7O0FBL0RzQjtBQTZFdEIsU0FBUSxLQUFSLEVBQWdCO0FBQ2YsV0FBUSxLQUFSLENBQWUsa0NBQWYsRUFBbUQsS0FBbkQsRUFEZTtBQUVmLFFBQUssUUFBTCxHQUFnQixLQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXNCLEtBQXRCLENBQWhCLENBRmU7R0FBaEI7Ozs7Ozs7O0FBN0VzQjtBQTBGdEIsT0FBTSxRQUFOLEVBQWlCO0FBQ2hCLFdBQVEsS0FBUixDQUFlLHNDQUFmLEVBQXVELFFBQXZELEVBRGdCO0FBRWhCLFFBQUssUUFBTCxHQUFnQixLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW9CLFFBQXBCLENBQWhCLENBRmdCO0dBQWpCOztFQTFGTSIsImZpbGUiOiJyZXN1bHQtc2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLSotIGphdmFzY3JpcHQgLSotICovXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHtDcml0ZXJpYX0gZnJvbSAnLi9jcml0ZXJpYSc7XG5pbXBvcnQge21vbmFkaWN9IGZyb20gJy4vdXRpbHMnO1xuXG4vKipcbiAqIEEgbW9uYWRpYy9mbHVpZCBpbnRlcmZhY2UgdG8gYW4gdW5yZWlmaWVkIHNldCBvZiBNb2RlbCBvYmplY3RzIG1hZGUgdXAgb2ZcbiAqIGEgTW9kZWwgY2xhc3MgYW5kIGEgQ3JpdGVyaWEgZm9yIHNlbGVjdGluZyBhIHN1YnNldCBvZiB0aGVtLlxuICpcbiAqIEBjbGFzcyBSZXN1bHRTZXRcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5leHBvcnQgY2xhc3MgUmVzdWx0U2V0IHtcblxuXHRjb25zdHJ1Y3RvciggbW9kZWwsIGNyaXRlcmlhPW51bGwgKSB7XG5cdFx0aWYgKCBjcml0ZXJpYSA9PT0gbnVsbCApIHtcblx0XHRcdGNyaXRlcmlhID0gbmV3IENyaXRlcmlhKCk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCAhKGNyaXRlcmlhIGluc3RhbmNlb2YgQ3JpdGVyaWEpICkge1xuXHRcdFx0Y3JpdGVyaWEgPSBuZXcgQ3JpdGVyaWEoIGNyaXRlcmlhICk7XG5cdFx0fVxuXG5cdFx0dGhpcy5tb2RlbCA9IG1vZGVsO1xuXHRcdHRoaXMuY3JpdGVyaWEgPSBjcml0ZXJpYTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIFJldHVybiBhIFByb21pc2UgdGhhdCB3aWxsIHJlc29sdmUgYXMgdGhlIHJlaWZpZWQgcmVzdWx0cyBkZXNjcmliZWQgYnlcblx0ICogdGhlIFJlc3VsdFNldC5cblx0ICogQG1ldGhvZCBnZXRcblx0ICovXG5cdGdldCggbGltaXQ9bnVsbCwgb2Zmc2V0PW51bGwgKSB7XG5cdFx0dmFyIGNyID0gdGhpcy5jcml0ZXJpYTtcblx0XHRpZiAoIGxpbWl0ICkgeyBjciA9IGNyLmxpbWl0KCBsaW1pdCApOyB9XG5cdFx0aWYgKCBvZmZzZXQgKSB7IGNyID0gY3Iub2Zmc2V0KCBvZmZzZXQgKTsgfVxuXG5cdFx0Y29uc29sZS5kZWJ1ZyggXCJGZXRjaGluZyAlcyByZXN1bHRzIG1hdGNoaW5nIGNyaXRlcmlhOiAlb1wiLCB0aGlzLm1vZGVsLm5hbWUsIGNyICk7XG5cdFx0cmV0dXJuIHRoaXMubW9kZWwuZ2V0KCBjciApO1xuXHR9XG5cblxuXHQvKlxuXHQgKiBNb25hZGljIEFQSVxuXHQgKi9cblxuXHQvKipcblx0ICogTW9uYWRpYyBBUEkgLS0gZHVwbGljYXRlIHRoZSBSZXN1bHRTZXQuXG5cdCAqIEByZXR1cm4ge1Jlc3VsdFNldH0gdGhlIGNsb25lZCByZXN1bHQgc2V0XG5cdCAqL1xuXHRjbG9uZSgpIHtcblx0XHRyZXR1cm4gUmVmbGVjdC5jb25zdHJ1Y3QoIHRoaXMuY29uc3RydWN0b3IsIFt0aGlzLm1vZGVsLCB0aGlzLmNyaXRlcmlhXSApO1xuXHR9XG5cblxuXHQvKipcblx0ICogQWRkIHNlbGVjdGlvbiBjcml0ZXJpYSB0byB0aGUgc2V0LlxuXHQgKiBAbWV0aG9kIHdoZXJlXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgIGtleS92YWx1ZSBwYWlycyB0aGF0IHdpbGwgYmUgbWFwcGVkIHRvIHNlbGVjdGlvbiBjcml0ZXJpYS5cblx0ICogQHJldHVybiB7UmVzdWx0U2V0fSAgdGhlIGNsb25lZCByZXN1bHQgc2V0IHdpdGggdGhlIGFkZGl0aW9uYWwgY3JpdGVyaWEuXG5cdCAqL1xuXHRAbW9uYWRpY1xuXHR3aGVyZSggcGFyYW1zICkge1xuXHRcdGNvbnNvbGUuZGVidWcoIFwiQ2xvbmluZyByZXN1bHRzZXQgdG8gYWRkIHBhcmFtczogXCIsIHBhcmFtcyApO1xuXHRcdHRoaXMuY3JpdGVyaWEgPSB0aGlzLmNyaXRlcmlhLmZpbHRlciggcGFyYW1zICk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBBZGQgYSBsaW1pdCB0byB0aGUgbWF4aW11bSBzaXplIG9mIHRoZSBzZXQuXG5cdCAqIEBtZXRob2QgbGltaXRcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50ICB0aGUgbWF4aW11bSBudW1iZXIgb2YgcmVzdWx0cyBpbiB0aGUgc2V0XG5cdCAqIEByZXR1cm4ge1Jlc3VsdFNldH0gIHRoZSBjbG9uZWQgcmVzdWx0IHNldCB3aXRoIHRoZSBuZXcgbGltaXQuXG5cdCAqL1xuXHRAbW9uYWRpY1xuXHRsaW1pdCggY291bnQgKSB7XG5cdFx0Y29uc29sZS5kZWJ1ZyggXCJDbG9uZWQgcmVzdWx0c2V0IHRvIGFkZCBsaW1pdDogXCIsIGNvdW50ICk7XG5cdFx0dGhpcy5jcml0ZXJpYSA9IHRoaXMuY3JpdGVyaWEubGltaXQoIGNvdW50ICk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBBZGQgYW4gb2Zmc2V0IGludG8gdGhlIHNldCB0aGF0IHNob3VsZCBiZSB0aGUgZmlyc3QgZWxlbWVudC5cblx0ICogQG1ldGhvZCBpbmRleFxuXHQgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgc2V0IG9mIGFsbFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoaW5nIG1vZGVsIG9iamVjdHMuXG5cdCAqIEByZXR1cm4ge1Jlc3VsdFNldH0gIHRoZSBjbG9uZWQgcmVzdWx0IHNldCB3aXRoIHRoZSBuZXcgb2Zmc2V0LlxuXHQgKi9cblx0QG1vbmFkaWNcblx0b2Zmc2V0KCBpbmRleCApIHtcblx0XHRjb25zb2xlLmRlYnVnKCBcIkNsb25lZCByZXN1bHRzZXQgdG8gYWRkIG9mZnNldDogXCIsIGluZGV4ICk7XG5cdFx0dGhpcy5jcml0ZXJpYSA9IHRoaXMuY3JpdGVyaWEub2Zmc2V0KCBpbmRleCApO1xuXHR9XG5cblxuXHQvKipcblx0ICogU3BlY2lmeSBhIGRpZmZlcmVudCBsb2NhdGlvbiB0byBmZXRjaCByZXN1bHRzIGZyb20uXG5cdCAqIEBtZXRob2QgZnJvbVxuXHQgKiBAcGFyYW0ge09iamVjdH0gbG9jYXRpb24gICB0aGUgbG9jYXRpb24gdG8gc3BlY2lmeSB3aGVuIHVzaW5nIHRoZSBkYXRhc3RvcmUuXG5cdCAqIEByZXR1cm4ge1Jlc3VsdFNldH0gIHRoZSBjbG9uZWQgcmVzdWx0IHNldCB3aXRoIHRoZSBuZXcgbG9jYXRpb24uXG5cdCAqL1xuXHRAbW9uYWRpY1xuXHRmcm9tKCBsb2NhdGlvbiApIHtcblx0XHRjb25zb2xlLmRlYnVnKCBcIkNsb25lIHJlc3VsdHNldCB0byBjaGFuZ2UgbG9jYXRpb246IFwiLCBsb2NhdGlvbiApO1xuXHRcdHRoaXMuY3JpdGVyaWEgPSB0aGlzLmNyaXRlcmlhLmZyb20oIGxvY2F0aW9uICk7XG5cdH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
