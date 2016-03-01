define(['exports', 'babel-runtime/core-js/reflect/construct', 'bluebird', './errors', './criteria', 'babel/polyfill'], function (exports, _construct, _bluebird, _errors, _criteria) {
	/* -*- javascript -*- */

	/* eslint-disable no-unused-vars */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Datastore = undefined;
	exports.datastore = datastore;

	var _construct2 = _interopRequireDefault(_construct);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGFzdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0E7Ozs7OztTQVlnQjs7Ozs7Ozs7Ozs7Ozs7OztBQUFULFVBQVMsU0FBVCxDQUFvQixJQUFwQixFQUEwQixHQUFHLElBQUgsRUFBVTtBQUMxQyxTQUFPLFNBQVMsU0FBVCxDQUFvQixNQUFwQixFQUE2QjtBQUNuQyxPQUFJLEtBQUsseUJBQW1CLElBQW5CLEVBQXlCLElBQXpCLENBQUw7O0FBRCtCLFNBR25DLENBQU8sU0FBUCxHQUFtQixFQUFuQixDQUhtQztHQUE3QixDQURtQztFQUFwQzs7Ozs7Ozs7Ozs7Ozs7O0tBcUJNLGdDQUFOLE1BQU0sU0FBTixDQUFnQjs7Ozs7QUFLdEIsZ0JBQWMsRUFBZDs7Ozs7Ozs7Ozs7Ozs7OztBQUxzQixLQXFCdEIsQ0FBSyxJQUFMLEVBQVcsV0FBUyxJQUFULEVBQWdCOztBQUUxQixPQUFLLHNDQUFMLEVBQW9DOztBQUVuQyxXQUFPLEtBQUssYUFBTCxDQUFvQixJQUFwQixFQUEwQixRQUExQixDQUFQLENBRm1DO0lBQXBDLE1BR087O0FBRU4sV0FBTyxLQUFLLFdBQUwsQ0FBa0IsSUFBbEIsRUFBd0IsUUFBeEIsQ0FBUCxDQUZNO0lBSFA7R0FGRDs7Ozs7Ozs7Ozs7Ozs7O0FBckJzQixlQThDdEIsQ0FBZSxJQUFmLEVBQXFCLFFBQXJCLEVBQWdDOztBQUMvQixVQUFPLG1CQUFRLE1BQVIsQ0FBZ0IsZ0NBQXdCLGVBQXhCLENBQWhCLENBQVAsQ0FEK0I7R0FBaEM7Ozs7Ozs7Ozs7Ozs7OztBQTlDc0IsYUFnRXRCLENBQWEsSUFBYixFQUFtQixFQUFuQixFQUF3QjtBQUN2QixVQUFPLG1CQUFRLE1BQVIsQ0FBZ0IsZ0NBQXdCLGFBQXhCLENBQWhCLENBQVAsQ0FEdUI7R0FBeEI7Ozs7Ozs7Ozs7Ozs7O0FBaEVzQixPQWdGdEIsQ0FBTyxJQUFQLEVBQWEsSUFBYixFQUFvQjtBQUNuQixVQUFPLG1CQUFRLE1BQVIsQ0FBZ0IsZ0NBQXdCLE9BQXhCLENBQWhCLENBQVAsQ0FEbUI7R0FBcEI7Ozs7Ozs7Ozs7OztBQWhGc0IsUUE4RnRCLENBQVEsSUFBUixFQUFjLEVBQWQsRUFBa0IsSUFBbEIsRUFBeUI7QUFDeEIsVUFBTyxtQkFBUSxNQUFSLENBQWdCLGdDQUF3QixRQUF4QixDQUFoQixDQUFQLENBRHdCO0dBQXpCOzs7Ozs7Ozs7Ozs7QUE5RnNCLFNBNEd0QixDQUFTLElBQVQsRUFBZSxFQUFmLEVBQW1CLElBQW5CLEVBQTBCO0FBQ3pCLFVBQU8sbUJBQVEsTUFBUixDQUFnQixnQ0FBd0IsU0FBeEIsQ0FBaEIsQ0FBUCxDQUR5QjtHQUExQjs7Ozs7Ozs7Ozs7O0FBNUdzQixRQTBIdEIsQ0FBUSxJQUFSLEVBQWMsRUFBZCxFQUFtQjtBQUNsQixVQUFPLG1CQUFRLE1BQVIsQ0FBZ0IsZ0NBQXdCLFFBQXhCLENBQWhCLENBQVAsQ0FEa0I7R0FBbkI7O0VBMUhNIiwiZmlsZSI6ImRhdGFzdG9yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0qLSBqYXZhc2NyaXB0IC0qLSAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgJ2JhYmVsL3BvbHlmaWxsJztcblxuaW1wb3J0IHtOb3RJbXBsZW1lbnRlZEVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5pbXBvcnQge0NyaXRlcmlhfSBmcm9tICcuL2NyaXRlcmlhJztcblxuLyoqXG4gKiBEYXRhc3RvcmUgZGVjb3JhdG9yIC0tIHN5bnRhY3RpYyBzdWdhciBmb3Igc2V0dGluZyB0aGUgYGRhdGFzdG9yZWBcbiAqIG1lbWJlciBvZiB0aGUgZGVjb3JhdGVkIGNsYXNzJ3MgcHJvdG90eXBlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGF0YXN0b3JlKCB0eXBlLCAuLi5hcmdzICkge1xuXHRyZXR1cm4gZnVuY3Rpb24gZGVjb3JhdG9yKCB0YXJnZXQgKSB7XG5cdFx0dmFyIGRzID0gUmVmbGVjdC5jb25zdHJ1Y3QoIHR5cGUsIGFyZ3MgKTtcblx0XHQvLyBjb25zb2xlLmRlYnVnKCBcIlNldHRpbmcgZGF0YXN0b3JlIG9mIFwiLCB0YXJnZXQsIFwiIHRvIFwiLCBkcyApO1xuXHRcdHRhcmdldC5kYXRhc3RvcmUgPSBkcztcblx0fTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBjbGFzcyBmb3IgQmFpbGl3aWNrIGRhdGFzdG9yZSBjbGFzc2VzLlxuICpcbiAqIEEgZGF0YXN0b3JlIGlzIHRoZSBvYmplY3QgcmVzcG9uc2libGUgZm9yIGZldGNoaW5nLCBzdG9yaW5nLCB1cGRhdGluZywgYW5kIGRlbGV0aW5nXG4gKiBkYXRhIGZvciBvbmUgb3IgbW9yZSBkb21haW4gTW9kZWwgb2JqZWN0cywgYXMgd2VsbCBhcyBjYWNoaW5nIGFuZCBzb21lIG90aGVyXG4gKiB1dGlsaXR5IGZ1bmN0aW9ucy5cbiAqXG4gKiBBIE1vZGVsIGNsYXNzIHNob3VsZCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgKGEgZGVyaXZhdGl2ZSBvZikgdGhpcyBjbGFzcyBhcyBpdHNcbiAqIGBkYXRhc3RvcmVgIGF0dHJpYnV0ZS5cbiAqXG4gKiBAY2xhc3MgRGF0YXN0b3JlXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZXhwb3J0IGNsYXNzIERhdGFzdG9yZSB7XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBEYXRhc3RvcmUgLS0gbm90IHVzZWQgZGlyZWN0bHksIGFzIHRoaXMgaXMgYW4gYWJzdHJhY3QgY2xhc3MuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpIHt9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhlIG1vZGVsIGNsYXNzIG9mIHRoZSBzcGVjaWZpZWQge3R5cGV9IGFuZFxuXHQgKiB7Y3JpdGVyaWF9LlxuXHQgKlxuXHQgKiBAbWV0aG9kIGdldFxuXHQgKiBAcGFyYW0ge0NsYXNzfSB0eXBlICB0aGUgdHlwZSBvZiBkYXRhIHRvIGZldGNoXG5cdCAqIEBwYXJhbSB7Q3JpdGVyaWEsIEludGVnZXJ9IGNyaXRlcmlhICB0aGUgY3JpdGVyaWEgdGhhdCBkZXRlcm1pbmVzIHdoYXRcblx0ICogICAgc3BlY2lmaWMgZGF0YSBpcyBmZXRjaGVkLiBJZiBpdCdzIGEgSW50ZWdlciwgaXQncyBhc3N1bWVkIHRvIGJlIGFuIElELFxuXHQgKiAgICBhbmQgYSBzaW5nbGUgb2JqZWN0IGlzIGZldGNoZWQuIElmIGl0J3MgZWl0aGVyIGBudWxsYCBvciBhIGBDcml0ZXJpYWBcblx0ICogICAgb2JqZWN0LCBhbiBBcnJheSBvZiBhbGwgbWF0Y2hpbmcgb2JqZWN0cyBhcmUgZmV0Y2hlZC5cblx0ICpcblx0ICogQHJldHVybnMge1Byb21pc2V9IHRoZSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHJlc3VsdHMsIG9yIHJlamVjdHNcblx0ICogICAgaWYgZmV0Y2hpbmcgYnkgSUQgYW5kIG5vIGRhdGEgZm9yIHRoYXQgb2JqZWN0IGlzIGF2YWlsYWJsZS5cblx0ICovXG5cdGdldCggdHlwZSwgY3JpdGVyaWE9bnVsbCApIHtcblx0XHQvLyBDb2xsZWN0aW9uIEFQSSBpZiB0aGUgY3JpdGVyaWEgaXMgYSBDcml0ZXJpYVxuXHRcdGlmICggY3JpdGVyaWEgaW5zdGFuY2VvZiBDcml0ZXJpYSApIHtcblx0XHRcdC8vIGNvbnNvbGUuZGVidWcoIFwiRmV0Y2ggd2l0aCBjcml0ZXJpYSFcIiApO1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0Q29sbGVjdGlvbiggdHlwZSwgY3JpdGVyaWEgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gY29uc29sZS5kZWJ1ZyggXCJGZXRjaCBieSBJRCFcIiApO1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0SW5zdGFuY2UoIHR5cGUsIGNyaXRlcmlhICk7XG5cdFx0fVxuXHR9XG5cblxuXHQvKipcblx0ICogVGhlIFwiY29sbGVjdGlvblwiIGdldHRlciAtLSBkZXJpdmF0aXZlcyBvZiB0aGlzIGNsYXNzIHNob3VsZCBpbXBsZW1lbnQgdGhpc1xuXHQgKiBmb3IgZmV0Y2hpbmcgY29sbGVjdGlvbnMgbWF0Y2hpbmcgdGhlIGdpdmVuIHtjcml0ZXJpYX0uXG5cdCAqXG5cdCAqIEBwYXJhbXMge0NsYXNzfSAgICB0eXBlICAgICAgdGhlIHR5cGUgb2YgZGF0YSB0byBmZXRjaC5cblx0ICogQHBhcmFtcyB7Q3JpdGVyaWF9IGNyaXRlcmlhICB0aGUgbWF0Y2hpbmcgY3JpdGVyaWEgdG8gdXNlIHRvIGZpbHRlciB0aGVcblx0ICogICAgcmV0dXJuZWQgY29sbGVjdGlvbi4gSWYgdGhpcyBpcyBgbnVsbGAsIHRoZSBlbnRpcmUgY29sbGVjdGlvbiBzaG91bGQgYmVcblx0ICogICAgcmV0dXJuZWQuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlfSAgYSBwcm9taXNlIHRoYXQgc2hvdWxkIHJlc29sdmUgdG8gdGhlIEFycmF5IG9mIHJlc3VsdHMuXG5cdCAqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdGdldENvbGxlY3Rpb24oIHR5cGUsIGNyaXRlcmlhICkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCBuZXcgTm90SW1wbGVtZW50ZWRFcnJvcihcImdldENvbGxlY3Rpb25cIikgKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIFRoZSBcImluc3RhbmNlXCIgZ2V0dGVyIC0tIGRlcml2YXRpdmVzIG9mIHRoaXMgY2xhc3Mgc2hvdWxkIGltcGxlbWVudCB0aGlzXG5cdCAqIGZvciBmZXRjaGluZyBkYXRhIGZvciBhIHNpbmdsZSBvYmplY3QgYnkgaXRzIElELlxuXHQgKlxuXHQgKiBAcGFyYW1zIHtDbGFzc30gICAgdHlwZSAgIHRoZSB0eXBlIG9mIGRhdGEgdG8gZmV0Y2guXG5cdCAqIEBwYXJhbXMge0ludGVnZXJ9ICBpZCAgICAgdGhlIElEIG9mIHRoZSBvYmplY3QgdG8gZmV0Y2guXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlfSAgYSBwcm9taXNlIHRoYXQgc2hvdWxkIHJlc29sdmUgdG8gdGhlIGRhdGEgZm9yIHRoZSByZXF1ZXN0ZWRcblx0ICogICAgb2JqZWN0LiBJZiB0aGUgb2JqZWN0IGRvZXNuJ3QgZXhpc3QsIHRoZSBwcm9taXNlIHNob3VsZCByZWplY3Qgd2l0aCBhblxuXHQgKiAgICBhcHByb3ByaWF0ZSBFcnJvci5cblx0ICpcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0Z2V0SW5zdGFuY2UoIHR5cGUsIGlkICkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdCggbmV3IE5vdEltcGxlbWVudGVkRXJyb3IoXCJnZXRJbnN0YW5jZVwiKSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlcml2YXRpdmVzIG9mIHRoaXMgY2xhc3Mgc2hvdWxkIHByb3ZpZGUgYW4gaW1wbGVtZW50YXRpb24gb2YgdGhpcyBmb3Igc3RvcmluZ1xuXHQgKiBuZXcgZGF0YSBpbiB0aGUgc3RvcmUuXG5cdCAqXG5cdCAqIEBwYXJhbXMge0NsYXNzfSAgICB0eXBlICAgdGhlIHR5cGUgb2YgZGF0YSB0byBmZXRjaFxuXHQgKiBAcGFyYW1zIHtPYmplY3R9ICAgZGF0YSAgIHRoZSBkYXRhIHRvIHN0b3JlIGZvciB0aGUgbmV3IG9iamVjdFxuXHQgKlxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZX0gIGEgcHJvbWlzZSB0aGF0IHNob3VsZCByZXNvbHZlIHRvIHRoZSBJRCBvZiB0aGUgbmV3bHktc3RvcmVkXG5cdCAqICAgIG9iamVjdCBvbiBzdWNjZXNzLCBvciByZWplY3Qgd2l0aCBhbiBhcHByb3ByaWF0ZSBgRXJyb3JgIGlmIHRoZSBvYmplY3Rcblx0ICogICAgY291bGQgbm90IGJlIHN0b3JlZCBmb3Igc29tZSByZWFzb24uXG5cdCAqXG5cdCAqL1xuXHRzdG9yZSggdHlwZSwgZGF0YSApIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoIG5ldyBOb3RJbXBsZW1lbnRlZEVycm9yKFwic3RvcmVcIikgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXJpdmF0aXZlcyBvZiB0aGlzIGNsYXNzIHNob3VsZCBwcm92aWRlIGFuIGltcGxlbWVudGF0aW9uIG9mIHRoaXMgZm9yIHVwZGF0aW5nXG5cdCAqIHRoZSBkYXRhIGluIHRoZSBzdG9yZSBmb3IgYW4gSURlZCBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbXMge0NsYXNzfSAgICB0eXBlICAgdGhlIHR5cGUgb2YgZGF0YSB0byBmZXRjaFxuXHQgKiBAcGFyYW1zIHtJbnRlZ2VyfSAgaWQgICAgIHRoZSBJRCBvZiB0aGUgb2JqZWN0IHRvIHVwZGF0ZVxuXHQgKiBAcGFyYW1zIHtPYmplY3R9ICAgZGF0YSAgIHRoZSBkYXRhIHRvIG1lcmdlIHdpdGggdGhlIGN1cnJlbnQgZGF0YSBmb3IgdGhlIG5ldyBvYmplY3Rcblx0ICpcblx0ICogQHJldHVybnMge1Byb21pc2V9ICBhIHByb21pc2UgdGhhdCBzaG91bGQgcmVzb2x2ZSB0byB0aGUgbWVyZ2VkIGRhdGEgZm9yIHRoZSBvYmplY3Rcblx0ICovXG5cdHVwZGF0ZSggdHlwZSwgaWQsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCBuZXcgTm90SW1wbGVtZW50ZWRFcnJvcihcInVwZGF0ZVwiKSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlcml2YXRpdmVzIG9mIHRoaXMgY2xhc3Mgc2hvdWxkIHByb3ZpZGUgYW4gaW1wbGVtZW50YXRpb24gb2YgdGhpcyBmb3IgcmVwbGFjaW5nXG5cdCAqIHRoZSBkYXRhIGluIHRoZSBzdG9yZSBmb3IgYW4gSURlZCBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbXMge0NsYXNzfSAgICB0eXBlICAgdGhlIHR5cGUgb2YgZGF0YSB0byBmZXRjaFxuXHQgKiBAcGFyYW1zIHtJbnRlZ2VyfSAgaWQgICAgIHRoZSBJRCBvZiB0aGUgb2JqZWN0IHRvIHJlcGxhY2Vcblx0ICogQHBhcmFtcyB7T2JqZWN0fSAgIGRhdGEgICB0aGUgcmVwbGFjZW1lbnQgZGF0YVxuXHQgKlxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZX0gIGEgcHJvbWlzZSB0aGF0IHNob3VsZCByZXNvbHZlIHRvIHRoZSBkYXRhIGJlaW5nIHJlcGxhY2VkLlxuXHQgKi9cblx0cmVwbGFjZSggdHlwZSwgaWQsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCBuZXcgTm90SW1wbGVtZW50ZWRFcnJvcihcInJlcGxhY2VcIikgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXJpdmF0aXZlcyBvZiB0aGlzIGNsYXNzIHNob3VsZCBwcm92aWRlIGFuIGltcGxlbWVudGF0aW9uIG9mIHRoaXMgZm9yIHJlbW92aW5nXG5cdCAqIGRhdGEgZnJvbSB0aGUgc3RvcmUuXG5cdCAqXG5cdCAqIEBwYXJhbXMge0NsYXNzfSAgICB0eXBlICAgdGhlIHR5cGUgb2YgZGF0YSB0byBmZXRjaFxuXHQgKiBAcGFyYW1zIHtJbnRlZ2VyfSAgaWQgICAgIHRoZSBJRCBvZiB0aGUgb2JqZWN0IHRvIHJlbW92ZVxuXHQgKlxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZX0gIGEgcHJvbWlzZSB0aGF0IHNob3VsZCByZXNvbHZlIHRvIGB0cnVlYCBpZiB0aGUgb2JqZWN0XG5cdCAqICAgIHdhcyBpbiB0aGUgc3RvcmUgcHJpb3IgdG8gdGhlIHJlbW92YWwsIG9yIGBmYWxzZWAgaWYgaXQgd2FzIG5vdC5cblx0ICovXG5cdHJlbW92ZSggdHlwZSwgaWQgKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCBuZXcgTm90SW1wbGVtZW50ZWRFcnJvcihcInJlbW92ZVwiKSApO1xuXHR9XG5cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
