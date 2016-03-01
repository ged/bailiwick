/* -*- javascript -*- */
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ResultSet = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _construct = require('babel-runtime/core-js/reflect/construct');

var _construct2 = _interopRequireDefault(_construct);

var _desc, _value, _class;

var _criteria = require('./criteria');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/**
 * A monadic/fluid interface to an unreified set of Model objects made up of
 * a Model class and a Criteria for selecting a subset of them.
 *
 * @class ResultSet
 * @constructor
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VsdC1zZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVlhLDBDQUFOLE1BQU0sU0FBTixDQUFnQjs7QUFFdEIsYUFBYSxLQUFiLEVBQW9CLFdBQVMsSUFBVCxFQUFnQjtBQUNuQyxNQUFLLGFBQWEsSUFBYixFQUFvQjtBQUN4QixjQUFXLHdCQUFYLENBRHdCO0dBQXpCLE1BR0ssSUFBSyxFQUFFLHVDQUFGLEVBQWtDO0FBQzNDLGNBQVcsdUJBQWMsUUFBZCxDQUFYLENBRDJDO0dBQXZDOztBQUlMLE9BQUssS0FBTCxHQUFhLEtBQWIsQ0FSbUM7QUFTbkMsT0FBSyxRQUFMLEdBQWdCLFFBQWhCLENBVG1DO0VBQXBDOzs7Ozs7O0FBRnNCLElBb0J0QixDQUFLLFFBQU0sSUFBTixFQUFZLFNBQU8sSUFBUCxFQUFjO0FBQzlCLE1BQUksS0FBSyxLQUFLLFFBQUwsQ0FEcUI7QUFFOUIsTUFBSyxLQUFMLEVBQWE7QUFBRSxRQUFLLEdBQUcsS0FBSCxDQUFVLEtBQVYsQ0FBTCxDQUFGO0dBQWI7QUFDQSxNQUFLLE1BQUwsRUFBYztBQUFFLFFBQUssR0FBRyxNQUFILENBQVcsTUFBWCxDQUFMLENBQUY7R0FBZDs7QUFFQSxVQUFRLEtBQVIsQ0FBZSwyQ0FBZixFQUE0RCxLQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWlCLEVBQTdFLEVBTDhCO0FBTTlCLFNBQU8sS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFnQixFQUFoQixDQUFQLENBTjhCO0VBQS9COzs7Ozs7Ozs7O0FBcEJzQixNQXNDdEIsR0FBUTtBQUNQLFNBQU8seUJBQW1CLEtBQUssV0FBTCxFQUFrQixDQUFDLEtBQUssS0FBTCxFQUFZLEtBQUssUUFBTCxDQUFsRCxDQUFQLENBRE87RUFBUjs7Ozs7Ozs7QUF0Q3NCO0FBa0R0QixPQUFPLE1BQVAsRUFBZ0I7QUFDZixVQUFRLEtBQVIsQ0FBZSxtQ0FBZixFQUFvRCxNQUFwRCxFQURlO0FBRWYsT0FBSyxRQUFMLEdBQWdCLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBc0IsTUFBdEIsQ0FBaEIsQ0FGZTtFQUFoQjs7Ozs7Ozs7QUFsRHNCO0FBK0R0QixPQUFPLEtBQVAsRUFBZTtBQUNkLFVBQVEsS0FBUixDQUFlLGlDQUFmLEVBQWtELEtBQWxELEVBRGM7QUFFZCxPQUFLLFFBQUwsR0FBZ0IsS0FBSyxRQUFMLENBQWMsS0FBZCxDQUFxQixLQUFyQixDQUFoQixDQUZjO0VBQWY7Ozs7Ozs7OztBQS9Ec0I7QUE2RXRCLFFBQVEsS0FBUixFQUFnQjtBQUNmLFVBQVEsS0FBUixDQUFlLGtDQUFmLEVBQW1ELEtBQW5ELEVBRGU7QUFFZixPQUFLLFFBQUwsR0FBZ0IsS0FBSyxRQUFMLENBQWMsTUFBZCxDQUFzQixLQUF0QixDQUFoQixDQUZlO0VBQWhCOzs7Ozs7OztBQTdFc0I7QUEwRnRCLE1BQU0sUUFBTixFQUFpQjtBQUNoQixVQUFRLEtBQVIsQ0FBZSxzQ0FBZixFQUF1RCxRQUF2RCxFQURnQjtBQUVoQixPQUFLLFFBQUwsR0FBZ0IsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFvQixRQUFwQixDQUFoQixDQUZnQjtFQUFqQjs7Q0ExRk0iLCJmaWxlIjoicmVzdWx0LXNldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0qLSBqYXZhc2NyaXB0IC0qLSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7Q3JpdGVyaWF9IGZyb20gJy4vY3JpdGVyaWEnO1xuaW1wb3J0IHttb25hZGljfSBmcm9tICcuL3V0aWxzJztcblxuLyoqXG4gKiBBIG1vbmFkaWMvZmx1aWQgaW50ZXJmYWNlIHRvIGFuIHVucmVpZmllZCBzZXQgb2YgTW9kZWwgb2JqZWN0cyBtYWRlIHVwIG9mXG4gKiBhIE1vZGVsIGNsYXNzIGFuZCBhIENyaXRlcmlhIGZvciBzZWxlY3RpbmcgYSBzdWJzZXQgb2YgdGhlbS5cbiAqXG4gKiBAY2xhc3MgUmVzdWx0U2V0XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZXhwb3J0IGNsYXNzIFJlc3VsdFNldCB7XG5cblx0Y29uc3RydWN0b3IoIG1vZGVsLCBjcml0ZXJpYT1udWxsICkge1xuXHRcdGlmICggY3JpdGVyaWEgPT09IG51bGwgKSB7XG5cdFx0XHRjcml0ZXJpYSA9IG5ldyBDcml0ZXJpYSgpO1xuXHRcdH1cblx0XHRlbHNlIGlmICggIShjcml0ZXJpYSBpbnN0YW5jZW9mIENyaXRlcmlhKSApIHtcblx0XHRcdGNyaXRlcmlhID0gbmV3IENyaXRlcmlhKCBjcml0ZXJpYSApO1xuXHRcdH1cblxuXHRcdHRoaXMubW9kZWwgPSBtb2RlbDtcblx0XHR0aGlzLmNyaXRlcmlhID0gY3JpdGVyaWE7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gYSBQcm9taXNlIHRoYXQgd2lsbCByZXNvbHZlIGFzIHRoZSByZWlmaWVkIHJlc3VsdHMgZGVzY3JpYmVkIGJ5XG5cdCAqIHRoZSBSZXN1bHRTZXQuXG5cdCAqIEBtZXRob2QgZ2V0XG5cdCAqL1xuXHRnZXQoIGxpbWl0PW51bGwsIG9mZnNldD1udWxsICkge1xuXHRcdHZhciBjciA9IHRoaXMuY3JpdGVyaWE7XG5cdFx0aWYgKCBsaW1pdCApIHsgY3IgPSBjci5saW1pdCggbGltaXQgKTsgfVxuXHRcdGlmICggb2Zmc2V0ICkgeyBjciA9IGNyLm9mZnNldCggb2Zmc2V0ICk7IH1cblxuXHRcdGNvbnNvbGUuZGVidWcoIFwiRmV0Y2hpbmcgJXMgcmVzdWx0cyBtYXRjaGluZyBjcml0ZXJpYTogJW9cIiwgdGhpcy5tb2RlbC5uYW1lLCBjciApO1xuXHRcdHJldHVybiB0aGlzLm1vZGVsLmdldCggY3IgKTtcblx0fVxuXG5cblx0Lypcblx0ICogTW9uYWRpYyBBUElcblx0ICovXG5cblx0LyoqXG5cdCAqIE1vbmFkaWMgQVBJIC0tIGR1cGxpY2F0ZSB0aGUgUmVzdWx0U2V0LlxuXHQgKiBAcmV0dXJuIHtSZXN1bHRTZXR9IHRoZSBjbG9uZWQgcmVzdWx0IHNldFxuXHQgKi9cblx0Y2xvbmUoKSB7XG5cdFx0cmV0dXJuIFJlZmxlY3QuY29uc3RydWN0KCB0aGlzLmNvbnN0cnVjdG9yLCBbdGhpcy5tb2RlbCwgdGhpcy5jcml0ZXJpYV0gKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIEFkZCBzZWxlY3Rpb24gY3JpdGVyaWEgdG8gdGhlIHNldC5cblx0ICogQG1ldGhvZCB3aGVyZVxuXHQgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zICBrZXkvdmFsdWUgcGFpcnMgdGhhdCB3aWxsIGJlIG1hcHBlZCB0byBzZWxlY3Rpb24gY3JpdGVyaWEuXG5cdCAqIEByZXR1cm4ge1Jlc3VsdFNldH0gIHRoZSBjbG9uZWQgcmVzdWx0IHNldCB3aXRoIHRoZSBhZGRpdGlvbmFsIGNyaXRlcmlhLlxuXHQgKi9cblx0QG1vbmFkaWNcblx0d2hlcmUoIHBhcmFtcyApIHtcblx0XHRjb25zb2xlLmRlYnVnKCBcIkNsb25pbmcgcmVzdWx0c2V0IHRvIGFkZCBwYXJhbXM6IFwiLCBwYXJhbXMgKTtcblx0XHR0aGlzLmNyaXRlcmlhID0gdGhpcy5jcml0ZXJpYS5maWx0ZXIoIHBhcmFtcyApO1xuXHR9XG5cblxuXHQvKipcblx0ICogQWRkIGEgbGltaXQgdG8gdGhlIG1heGltdW0gc2l6ZSBvZiB0aGUgc2V0LlxuXHQgKiBAbWV0aG9kIGxpbWl0XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudCAgdGhlIG1heGltdW0gbnVtYmVyIG9mIHJlc3VsdHMgaW4gdGhlIHNldFxuXHQgKiBAcmV0dXJuIHtSZXN1bHRTZXR9ICB0aGUgY2xvbmVkIHJlc3VsdCBzZXQgd2l0aCB0aGUgbmV3IGxpbWl0LlxuXHQgKi9cblx0QG1vbmFkaWNcblx0bGltaXQoIGNvdW50ICkge1xuXHRcdGNvbnNvbGUuZGVidWcoIFwiQ2xvbmVkIHJlc3VsdHNldCB0byBhZGQgbGltaXQ6IFwiLCBjb3VudCApO1xuXHRcdHRoaXMuY3JpdGVyaWEgPSB0aGlzLmNyaXRlcmlhLmxpbWl0KCBjb3VudCApO1xuXHR9XG5cblxuXHQvKipcblx0ICogQWRkIGFuIG9mZnNldCBpbnRvIHRoZSBzZXQgdGhhdCBzaG91bGQgYmUgdGhlIGZpcnN0IGVsZW1lbnQuXG5cdCAqIEBtZXRob2QgaW5kZXhcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4ICB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIHNldCBvZiBhbGxcblx0ICogICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGluZyBtb2RlbCBvYmplY3RzLlxuXHQgKiBAcmV0dXJuIHtSZXN1bHRTZXR9ICB0aGUgY2xvbmVkIHJlc3VsdCBzZXQgd2l0aCB0aGUgbmV3IG9mZnNldC5cblx0ICovXG5cdEBtb25hZGljXG5cdG9mZnNldCggaW5kZXggKSB7XG5cdFx0Y29uc29sZS5kZWJ1ZyggXCJDbG9uZWQgcmVzdWx0c2V0IHRvIGFkZCBvZmZzZXQ6IFwiLCBpbmRleCApO1xuXHRcdHRoaXMuY3JpdGVyaWEgPSB0aGlzLmNyaXRlcmlhLm9mZnNldCggaW5kZXggKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIFNwZWNpZnkgYSBkaWZmZXJlbnQgbG9jYXRpb24gdG8gZmV0Y2ggcmVzdWx0cyBmcm9tLlxuXHQgKiBAbWV0aG9kIGZyb21cblx0ICogQHBhcmFtIHtPYmplY3R9IGxvY2F0aW9uICAgdGhlIGxvY2F0aW9uIHRvIHNwZWNpZnkgd2hlbiB1c2luZyB0aGUgZGF0YXN0b3JlLlxuXHQgKiBAcmV0dXJuIHtSZXN1bHRTZXR9ICB0aGUgY2xvbmVkIHJlc3VsdCBzZXQgd2l0aCB0aGUgbmV3IGxvY2F0aW9uLlxuXHQgKi9cblx0QG1vbmFkaWNcblx0ZnJvbSggbG9jYXRpb24gKSB7XG5cdFx0Y29uc29sZS5kZWJ1ZyggXCJDbG9uZSByZXN1bHRzZXQgdG8gY2hhbmdlIGxvY2F0aW9uOiBcIiwgbG9jYXRpb24gKTtcblx0XHR0aGlzLmNyaXRlcmlhID0gdGhpcy5jcml0ZXJpYS5mcm9tKCBsb2NhdGlvbiApO1xuXHR9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
