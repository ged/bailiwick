/* -*- javascript -*- */

/* eslint-disable no-unused-vars */
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Datastore = undefined;

var _construct = require('babel-runtime/core-js/reflect/construct');

var _construct2 = _interopRequireDefault(_construct);

exports.datastore = datastore;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

require('babel/polyfill');

var _errors = require('./errors');

var _criteria = require('./criteria');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Datastore decorator -- syntactic sugar for setting the `datastore`
 * member of the decorated class's prototype.
 */
function datastore(type, ...args) {
	return function decorator(target) {
		var ds = (0, _construct2.default)(type, args);
		// console.debug( "Setting datastore of ", target, " to ", ds );
		target.datastore = ds;
	};
}

/**
 * The base class for Bailiwick datastore classes.
 *
 * A datastore is the object responsible for fetching, storing, updating, and deleting
 * data for one or more domain Model objects, as well as caching and some other
 * utility functions.
 *
 * A Model class should create an instance of (a derivative of) this class as its
 * `datastore` attribute.
 *
 * @class Datastore
 * @constructor
 */
let Datastore = exports.Datastore = class Datastore {

	/**
  * Create a new Datastore -- not used directly, as this is an abstract class.
  */
	constructor() {}

	/**
  * Get the data associated with the model class of the specified {type} and
  * {criteria}.
  *
  * @method get
  * @param {Class} type  the type of data to fetch
  * @param {Criteria, Integer} criteria  the criteria that determines what
  *    specific data is fetched. If it's a Integer, it's assumed to be an ID,
  *    and a single object is fetched. If it's either `null` or a `Criteria`
  *    object, an Array of all matching objects are fetched.
  *
  * @returns {Promise} the promise that resolves to the results, or rejects
  *    if fetching by ID and no data for that object is available.
  */
	get(type, criteria = null) {
		// Collection API if the criteria is a Criteria
		if (criteria instanceof _criteria.Criteria) {
			// console.debug( "Fetch with criteria!" );
			return this.getCollection(type, criteria);
		} else {
			// console.debug( "Fetch by ID!" );
			return this.getInstance(type, criteria);
		}
	}

	/**
  * The "collection" getter -- derivatives of this class should implement this
  * for fetching collections matching the given {criteria}.
  *
  * @params {Class}    type      the type of data to fetch.
  * @params {Criteria} criteria  the matching criteria to use to filter the
  *    returned collection. If this is `null`, the entire collection should be
  *    returned.
  *
  * @returns {Promise}  a promise that should resolve to the Array of results.
  *
  * @protected
  */
	getCollection(type, criteria) {
		// eslint-disable-line no-unused-vars
		return _bluebird2.default.reject(new _errors.NotImplementedError("getCollection"));
	}

	/**
  * The "instance" getter -- derivatives of this class should implement this
  * for fetching data for a single object by its ID.
  *
  * @params {Class}    type   the type of data to fetch.
  * @params {Integer}  id     the ID of the object to fetch.
  *
  * @returns {Promise}  a promise that should resolve to the data for the requested
  *    object. If the object doesn't exist, the promise should reject with an
  *    appropriate Error.
  *
  * @protected
  */
	getInstance(type, id) {
		return _bluebird2.default.reject(new _errors.NotImplementedError("getInstance"));
	}

	/**
  * Derivatives of this class should provide an implementation of this for storing
  * new data in the store.
  *
  * @params {Class}    type   the type of data to fetch
  * @params {Object}   data   the data to store for the new object
  *
  * @returns {Promise}  a promise that should resolve to the ID of the newly-stored
  *    object on success, or reject with an appropriate `Error` if the object
  *    could not be stored for some reason.
  *
  */
	store(type, data) {
		return _bluebird2.default.reject(new _errors.NotImplementedError("store"));
	}

	/**
  * Derivatives of this class should provide an implementation of this for updating
  * the data in the store for an IDed object.
  *
  * @params {Class}    type   the type of data to fetch
  * @params {Integer}  id     the ID of the object to update
  * @params {Object}   data   the data to merge with the current data for the new object
  *
  * @returns {Promise}  a promise that should resolve to the merged data for the object
  */
	update(type, id, data) {
		return _bluebird2.default.reject(new _errors.NotImplementedError("update"));
	}

	/**
  * Derivatives of this class should provide an implementation of this for replacing
  * the data in the store for an IDed object.
  *
  * @params {Class}    type   the type of data to fetch
  * @params {Integer}  id     the ID of the object to replace
  * @params {Object}   data   the replacement data
  *
  * @returns {Promise}  a promise that should resolve to the data being replaced.
  */
	replace(type, id, data) {
		return _bluebird2.default.reject(new _errors.NotImplementedError("replace"));
	}

	/**
  * Derivatives of this class should provide an implementation of this for removing
  * data from the store.
  *
  * @params {Class}    type   the type of data to fetch
  * @params {Integer}  id     the ID of the object to remove
  *
  * @returns {Promise}  a promise that should resolve to `true` if the object
  *    was in the store prior to the removal, or `false` if it was not.
  */
	remove(type, id) {
		return _bluebird2.default.reject(new _errors.NotImplementedError("remove"));
	}

};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGFzdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQTs7Ozs7Ozs7Ozs7UUFZZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFULFNBQVMsU0FBVCxDQUFvQixJQUFwQixFQUEwQixHQUFHLElBQUgsRUFBVTtBQUMxQyxRQUFPLFNBQVMsU0FBVCxDQUFvQixNQUFwQixFQUE2QjtBQUNuQyxNQUFJLEtBQUsseUJBQW1CLElBQW5CLEVBQXlCLElBQXpCLENBQUw7O0FBRCtCLFFBR25DLENBQU8sU0FBUCxHQUFtQixFQUFuQixDQUhtQztFQUE3QixDQURtQztDQUFwQzs7Ozs7Ozs7Ozs7Ozs7O0lBcUJNLGdDQUFOLE1BQU0sU0FBTixDQUFnQjs7Ozs7QUFLdEIsZUFBYyxFQUFkOzs7Ozs7Ozs7Ozs7Ozs7O0FBTHNCLElBcUJ0QixDQUFLLElBQUwsRUFBVyxXQUFTLElBQVQsRUFBZ0I7O0FBRTFCLE1BQUssc0NBQUwsRUFBb0M7O0FBRW5DLFVBQU8sS0FBSyxhQUFMLENBQW9CLElBQXBCLEVBQTBCLFFBQTFCLENBQVAsQ0FGbUM7R0FBcEMsTUFHTzs7QUFFTixVQUFPLEtBQUssV0FBTCxDQUFrQixJQUFsQixFQUF3QixRQUF4QixDQUFQLENBRk07R0FIUDtFQUZEOzs7Ozs7Ozs7Ozs7Ozs7QUFyQnNCLGNBOEN0QixDQUFlLElBQWYsRUFBcUIsUUFBckIsRUFBZ0M7O0FBQy9CLFNBQU8sbUJBQVEsTUFBUixDQUFnQixnQ0FBd0IsZUFBeEIsQ0FBaEIsQ0FBUCxDQUQrQjtFQUFoQzs7Ozs7Ozs7Ozs7Ozs7O0FBOUNzQixZQWdFdEIsQ0FBYSxJQUFiLEVBQW1CLEVBQW5CLEVBQXdCO0FBQ3ZCLFNBQU8sbUJBQVEsTUFBUixDQUFnQixnQ0FBd0IsYUFBeEIsQ0FBaEIsQ0FBUCxDQUR1QjtFQUF4Qjs7Ozs7Ozs7Ozs7Ozs7QUFoRXNCLE1BZ0Z0QixDQUFPLElBQVAsRUFBYSxJQUFiLEVBQW9CO0FBQ25CLFNBQU8sbUJBQVEsTUFBUixDQUFnQixnQ0FBd0IsT0FBeEIsQ0FBaEIsQ0FBUCxDQURtQjtFQUFwQjs7Ozs7Ozs7Ozs7O0FBaEZzQixPQThGdEIsQ0FBUSxJQUFSLEVBQWMsRUFBZCxFQUFrQixJQUFsQixFQUF5QjtBQUN4QixTQUFPLG1CQUFRLE1BQVIsQ0FBZ0IsZ0NBQXdCLFFBQXhCLENBQWhCLENBQVAsQ0FEd0I7RUFBekI7Ozs7Ozs7Ozs7OztBQTlGc0IsUUE0R3RCLENBQVMsSUFBVCxFQUFlLEVBQWYsRUFBbUIsSUFBbkIsRUFBMEI7QUFDekIsU0FBTyxtQkFBUSxNQUFSLENBQWdCLGdDQUF3QixTQUF4QixDQUFoQixDQUFQLENBRHlCO0VBQTFCOzs7Ozs7Ozs7Ozs7QUE1R3NCLE9BMEh0QixDQUFRLElBQVIsRUFBYyxFQUFkLEVBQW1CO0FBQ2xCLFNBQU8sbUJBQVEsTUFBUixDQUFnQixnQ0FBd0IsUUFBeEIsQ0FBaEIsQ0FBUCxDQURrQjtFQUFuQjs7Q0ExSE0iLCJmaWxlIjoiZGF0YXN0b3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLSotIGphdmFzY3JpcHQgLSotICovXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCAnYmFiZWwvcG9seWZpbGwnO1xuXG5pbXBvcnQge05vdEltcGxlbWVudGVkRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcbmltcG9ydCB7Q3JpdGVyaWF9IGZyb20gJy4vY3JpdGVyaWEnO1xuXG4vKipcbiAqIERhdGFzdG9yZSBkZWNvcmF0b3IgLS0gc3ludGFjdGljIHN1Z2FyIGZvciBzZXR0aW5nIHRoZSBgZGF0YXN0b3JlYFxuICogbWVtYmVyIG9mIHRoZSBkZWNvcmF0ZWQgY2xhc3MncyBwcm90b3R5cGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkYXRhc3RvcmUoIHR5cGUsIC4uLmFyZ3MgKSB7XG5cdHJldHVybiBmdW5jdGlvbiBkZWNvcmF0b3IoIHRhcmdldCApIHtcblx0XHR2YXIgZHMgPSBSZWZsZWN0LmNvbnN0cnVjdCggdHlwZSwgYXJncyApO1xuXHRcdC8vIGNvbnNvbGUuZGVidWcoIFwiU2V0dGluZyBkYXRhc3RvcmUgb2YgXCIsIHRhcmdldCwgXCIgdG8gXCIsIGRzICk7XG5cdFx0dGFyZ2V0LmRhdGFzdG9yZSA9IGRzO1xuXHR9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGNsYXNzIGZvciBCYWlsaXdpY2sgZGF0YXN0b3JlIGNsYXNzZXMuXG4gKlxuICogQSBkYXRhc3RvcmUgaXMgdGhlIG9iamVjdCByZXNwb25zaWJsZSBmb3IgZmV0Y2hpbmcsIHN0b3JpbmcsIHVwZGF0aW5nLCBhbmQgZGVsZXRpbmdcbiAqIGRhdGEgZm9yIG9uZSBvciBtb3JlIGRvbWFpbiBNb2RlbCBvYmplY3RzLCBhcyB3ZWxsIGFzIGNhY2hpbmcgYW5kIHNvbWUgb3RoZXJcbiAqIHV0aWxpdHkgZnVuY3Rpb25zLlxuICpcbiAqIEEgTW9kZWwgY2xhc3Mgc2hvdWxkIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiAoYSBkZXJpdmF0aXZlIG9mKSB0aGlzIGNsYXNzIGFzIGl0c1xuICogYGRhdGFzdG9yZWAgYXR0cmlidXRlLlxuICpcbiAqIEBjbGFzcyBEYXRhc3RvcmVcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5leHBvcnQgY2xhc3MgRGF0YXN0b3JlIHtcblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IERhdGFzdG9yZSAtLSBub3QgdXNlZCBkaXJlY3RseSwgYXMgdGhpcyBpcyBhbiBhYnN0cmFjdCBjbGFzcy5cblx0ICovXG5cdGNvbnN0cnVjdG9yKCkge31cblxuXHQvKipcblx0ICogR2V0IHRoZSBkYXRhIGFzc29jaWF0ZWQgd2l0aCB0aGUgbW9kZWwgY2xhc3Mgb2YgdGhlIHNwZWNpZmllZCB7dHlwZX0gYW5kXG5cdCAqIHtjcml0ZXJpYX0uXG5cdCAqXG5cdCAqIEBtZXRob2QgZ2V0XG5cdCAqIEBwYXJhbSB7Q2xhc3N9IHR5cGUgIHRoZSB0eXBlIG9mIGRhdGEgdG8gZmV0Y2hcblx0ICogQHBhcmFtIHtDcml0ZXJpYSwgSW50ZWdlcn0gY3JpdGVyaWEgIHRoZSBjcml0ZXJpYSB0aGF0IGRldGVybWluZXMgd2hhdFxuXHQgKiAgICBzcGVjaWZpYyBkYXRhIGlzIGZldGNoZWQuIElmIGl0J3MgYSBJbnRlZ2VyLCBpdCdzIGFzc3VtZWQgdG8gYmUgYW4gSUQsXG5cdCAqICAgIGFuZCBhIHNpbmdsZSBvYmplY3QgaXMgZmV0Y2hlZC4gSWYgaXQncyBlaXRoZXIgYG51bGxgIG9yIGEgYENyaXRlcmlhYFxuXHQgKiAgICBvYmplY3QsIGFuIEFycmF5IG9mIGFsbCBtYXRjaGluZyBvYmplY3RzIGFyZSBmZXRjaGVkLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZX0gdGhlIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgcmVzdWx0cywgb3IgcmVqZWN0c1xuXHQgKiAgICBpZiBmZXRjaGluZyBieSBJRCBhbmQgbm8gZGF0YSBmb3IgdGhhdCBvYmplY3QgaXMgYXZhaWxhYmxlLlxuXHQgKi9cblx0Z2V0KCB0eXBlLCBjcml0ZXJpYT1udWxsICkge1xuXHRcdC8vIENvbGxlY3Rpb24gQVBJIGlmIHRoZSBjcml0ZXJpYSBpcyBhIENyaXRlcmlhXG5cdFx0aWYgKCBjcml0ZXJpYSBpbnN0YW5jZW9mIENyaXRlcmlhICkge1xuXHRcdFx0Ly8gY29uc29sZS5kZWJ1ZyggXCJGZXRjaCB3aXRoIGNyaXRlcmlhIVwiICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRDb2xsZWN0aW9uKCB0eXBlLCBjcml0ZXJpYSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBjb25zb2xlLmRlYnVnKCBcIkZldGNoIGJ5IElEIVwiICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRJbnN0YW5jZSggdHlwZSwgY3JpdGVyaWEgKTtcblx0XHR9XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBUaGUgXCJjb2xsZWN0aW9uXCIgZ2V0dGVyIC0tIGRlcml2YXRpdmVzIG9mIHRoaXMgY2xhc3Mgc2hvdWxkIGltcGxlbWVudCB0aGlzXG5cdCAqIGZvciBmZXRjaGluZyBjb2xsZWN0aW9ucyBtYXRjaGluZyB0aGUgZ2l2ZW4ge2NyaXRlcmlhfS5cblx0ICpcblx0ICogQHBhcmFtcyB7Q2xhc3N9ICAgIHR5cGUgICAgICB0aGUgdHlwZSBvZiBkYXRhIHRvIGZldGNoLlxuXHQgKiBAcGFyYW1zIHtDcml0ZXJpYX0gY3JpdGVyaWEgIHRoZSBtYXRjaGluZyBjcml0ZXJpYSB0byB1c2UgdG8gZmlsdGVyIHRoZVxuXHQgKiAgICByZXR1cm5lZCBjb2xsZWN0aW9uLiBJZiB0aGlzIGlzIGBudWxsYCwgdGhlIGVudGlyZSBjb2xsZWN0aW9uIHNob3VsZCBiZVxuXHQgKiAgICByZXR1cm5lZC5cblx0ICpcblx0ICogQHJldHVybnMge1Byb21pc2V9ICBhIHByb21pc2UgdGhhdCBzaG91bGQgcmVzb2x2ZSB0byB0aGUgQXJyYXkgb2YgcmVzdWx0cy5cblx0ICpcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0Z2V0Q29sbGVjdGlvbiggdHlwZSwgY3JpdGVyaWEgKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoIG5ldyBOb3RJbXBsZW1lbnRlZEVycm9yKFwiZ2V0Q29sbGVjdGlvblwiKSApO1xuXHR9XG5cblxuXHQvKipcblx0ICogVGhlIFwiaW5zdGFuY2VcIiBnZXR0ZXIgLS0gZGVyaXZhdGl2ZXMgb2YgdGhpcyBjbGFzcyBzaG91bGQgaW1wbGVtZW50IHRoaXNcblx0ICogZm9yIGZldGNoaW5nIGRhdGEgZm9yIGEgc2luZ2xlIG9iamVjdCBieSBpdHMgSUQuXG5cdCAqXG5cdCAqIEBwYXJhbXMge0NsYXNzfSAgICB0eXBlICAgdGhlIHR5cGUgb2YgZGF0YSB0byBmZXRjaC5cblx0ICogQHBhcmFtcyB7SW50ZWdlcn0gIGlkICAgICB0aGUgSUQgb2YgdGhlIG9iamVjdCB0byBmZXRjaC5cblx0ICpcblx0ICogQHJldHVybnMge1Byb21pc2V9ICBhIHByb21pc2UgdGhhdCBzaG91bGQgcmVzb2x2ZSB0byB0aGUgZGF0YSBmb3IgdGhlIHJlcXVlc3RlZFxuXHQgKiAgICBvYmplY3QuIElmIHRoZSBvYmplY3QgZG9lc24ndCBleGlzdCwgdGhlIHByb21pc2Ugc2hvdWxkIHJlamVjdCB3aXRoIGFuXG5cdCAqICAgIGFwcHJvcHJpYXRlIEVycm9yLlxuXHQgKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRnZXRJbnN0YW5jZSggdHlwZSwgaWQgKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCBuZXcgTm90SW1wbGVtZW50ZWRFcnJvcihcImdldEluc3RhbmNlXCIpICk7XG5cdH1cblxuXHQvKipcblx0ICogRGVyaXZhdGl2ZXMgb2YgdGhpcyBjbGFzcyBzaG91bGQgcHJvdmlkZSBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIGZvciBzdG9yaW5nXG5cdCAqIG5ldyBkYXRhIGluIHRoZSBzdG9yZS5cblx0ICpcblx0ICogQHBhcmFtcyB7Q2xhc3N9ICAgIHR5cGUgICB0aGUgdHlwZSBvZiBkYXRhIHRvIGZldGNoXG5cdCAqIEBwYXJhbXMge09iamVjdH0gICBkYXRhICAgdGhlIGRhdGEgdG8gc3RvcmUgZm9yIHRoZSBuZXcgb2JqZWN0XG5cdCAqXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlfSAgYSBwcm9taXNlIHRoYXQgc2hvdWxkIHJlc29sdmUgdG8gdGhlIElEIG9mIHRoZSBuZXdseS1zdG9yZWRcblx0ICogICAgb2JqZWN0IG9uIHN1Y2Nlc3MsIG9yIHJlamVjdCB3aXRoIGFuIGFwcHJvcHJpYXRlIGBFcnJvcmAgaWYgdGhlIG9iamVjdFxuXHQgKiAgICBjb3VsZCBub3QgYmUgc3RvcmVkIGZvciBzb21lIHJlYXNvbi5cblx0ICpcblx0ICovXG5cdHN0b3JlKCB0eXBlLCBkYXRhICkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdCggbmV3IE5vdEltcGxlbWVudGVkRXJyb3IoXCJzdG9yZVwiKSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlcml2YXRpdmVzIG9mIHRoaXMgY2xhc3Mgc2hvdWxkIHByb3ZpZGUgYW4gaW1wbGVtZW50YXRpb24gb2YgdGhpcyBmb3IgdXBkYXRpbmdcblx0ICogdGhlIGRhdGEgaW4gdGhlIHN0b3JlIGZvciBhbiBJRGVkIG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtcyB7Q2xhc3N9ICAgIHR5cGUgICB0aGUgdHlwZSBvZiBkYXRhIHRvIGZldGNoXG5cdCAqIEBwYXJhbXMge0ludGVnZXJ9ICBpZCAgICAgdGhlIElEIG9mIHRoZSBvYmplY3QgdG8gdXBkYXRlXG5cdCAqIEBwYXJhbXMge09iamVjdH0gICBkYXRhICAgdGhlIGRhdGEgdG8gbWVyZ2Ugd2l0aCB0aGUgY3VycmVudCBkYXRhIGZvciB0aGUgbmV3IG9iamVjdFxuXHQgKlxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZX0gIGEgcHJvbWlzZSB0aGF0IHNob3VsZCByZXNvbHZlIHRvIHRoZSBtZXJnZWQgZGF0YSBmb3IgdGhlIG9iamVjdFxuXHQgKi9cblx0dXBkYXRlKCB0eXBlLCBpZCwgZGF0YSApIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoIG5ldyBOb3RJbXBsZW1lbnRlZEVycm9yKFwidXBkYXRlXCIpICk7XG5cdH1cblxuXHQvKipcblx0ICogRGVyaXZhdGl2ZXMgb2YgdGhpcyBjbGFzcyBzaG91bGQgcHJvdmlkZSBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIGZvciByZXBsYWNpbmdcblx0ICogdGhlIGRhdGEgaW4gdGhlIHN0b3JlIGZvciBhbiBJRGVkIG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtcyB7Q2xhc3N9ICAgIHR5cGUgICB0aGUgdHlwZSBvZiBkYXRhIHRvIGZldGNoXG5cdCAqIEBwYXJhbXMge0ludGVnZXJ9ICBpZCAgICAgdGhlIElEIG9mIHRoZSBvYmplY3QgdG8gcmVwbGFjZVxuXHQgKiBAcGFyYW1zIHtPYmplY3R9ICAgZGF0YSAgIHRoZSByZXBsYWNlbWVudCBkYXRhXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlfSAgYSBwcm9taXNlIHRoYXQgc2hvdWxkIHJlc29sdmUgdG8gdGhlIGRhdGEgYmVpbmcgcmVwbGFjZWQuXG5cdCAqL1xuXHRyZXBsYWNlKCB0eXBlLCBpZCwgZGF0YSApIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoIG5ldyBOb3RJbXBsZW1lbnRlZEVycm9yKFwicmVwbGFjZVwiKSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlcml2YXRpdmVzIG9mIHRoaXMgY2xhc3Mgc2hvdWxkIHByb3ZpZGUgYW4gaW1wbGVtZW50YXRpb24gb2YgdGhpcyBmb3IgcmVtb3Zpbmdcblx0ICogZGF0YSBmcm9tIHRoZSBzdG9yZS5cblx0ICpcblx0ICogQHBhcmFtcyB7Q2xhc3N9ICAgIHR5cGUgICB0aGUgdHlwZSBvZiBkYXRhIHRvIGZldGNoXG5cdCAqIEBwYXJhbXMge0ludGVnZXJ9ICBpZCAgICAgdGhlIElEIG9mIHRoZSBvYmplY3QgdG8gcmVtb3ZlXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlfSAgYSBwcm9taXNlIHRoYXQgc2hvdWxkIHJlc29sdmUgdG8gYHRydWVgIGlmIHRoZSBvYmplY3Rcblx0ICogICAgd2FzIGluIHRoZSBzdG9yZSBwcmlvciB0byB0aGUgcmVtb3ZhbCwgb3IgYGZhbHNlYCBpZiBpdCB3YXMgbm90LlxuXHQgKi9cblx0cmVtb3ZlKCB0eXBlLCBpZCApIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoIG5ldyBOb3RJbXBsZW1lbnRlZEVycm9yKFwicmVtb3ZlXCIpICk7XG5cdH1cblxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
