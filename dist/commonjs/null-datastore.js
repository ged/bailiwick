/* -*- javascript -*- */
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.NullDatastore = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

require('babel/polyfill');

var _datastore = require('./datastore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * An in-memory datastore (for testing)
 *
 * @class NullDatastore
 * @constructor
 *
 */
let NullDatastore = exports.NullDatastore = class NullDatastore extends _datastore.Datastore {

	/**
  * ID-generator function.
  * @static
  */
	static *genId() {
		let i = 0;
		for (;;) {
			yield ++i;
		}
	}

	/**
  * Create a new NullDatastore
  */
	constructor() {
		super();
		this.objects = new _map2.default();
		this.ids = new _map2.default();
	}

	/**
  * Fetch the internal collection for the given object {type}.
  * @method getCollectionForType
  * @protected
  */
	getCollectionForType(type) {
		if (!this.objects.has(type)) {
			console.info("ObjectStore doesn't have a %s collection; creating one.", type);
			this.objects.set(type, new _map2.default());
			this.ids.set(type, NullDatastore.genId());
		}

		return this.objects.get(type);
	}

	/**
  * Get API -- get an instance of the specified object {type} that corresponds to the
  * given {id}.
  *
  * @method getInstance
  * @param {Class} type  the class of object to fetch data for
  * @param {Integer} id  the ID of the object whose data should be fetched.
  *
  * @returns {Promise} the promise that resolves to the object data.
  */
	getInstance(type, id) {
		console.debug(`Getting instance ${ id } of ${ type.name }`);
		var collection = this.getCollectionForType(type);

		if (collection.has(id)) {
			return _bluebird2.default.resolve(collection.get(id));
		} else {
			return _bluebird2.default.reject(new Error(`No such ${ type.name } ID=${ id }`));
		}
	}

	/**
  * Get API -- get the collection of data for the objects of the specified {type}
  * that match the given {criteria}.
  *
  * @method getCollection
  * @param {Class} type  the class of object to fetch data for
  * @param {Criteria} criteria  the Criteria object that describes the collection of
  *                             objects to fetch.
  *
  * @returns {Promise} the promise that resolves to an Array of matching object data.
  */
	getCollection(type, criteria) {
		console.debug(`Getting %s collection matching: %o`, type.name, criteria);
		var collection = this.getCollectionForType(type);
		var results;

		if (criteria) {
			console.debug("Filtered fetch over collection of %d objects!", collection.size);
			var matches = this.findMatchingObjects(collection, criteria);
			console.debug("Found %d matches: %o", matches.length, matches);
			results = (0, _from2.default)(matches);
		} else {
			console.debug("Unfiltered fetch!");
			results = (0, _from2.default)(collection.values());
		}

		console.debug(`result is a ${ typeof results }`);
		return _bluebird2.default.resolve(results);
	}

	/**
  * Build an Array of matches for the specified {criteria} from the given {collection}.
  *
  * @method findMatchingObjects
  * @param {Iterable} collection  the collection of object data.
  * @param {Criteria} criteria    the criteria object used to filter the {collection}.
  *
  * @returns {Array} the matching data.
  * @protected
  */
	findMatchingObjects(collection, criteria) {
		// This should filter, limit, offset, etc.
		var filterFunc = this.makeFilterFunction(criteria);
		var matches = [];

		for (let obj of collection.values()) {
			if (filterFunc(obj)) {
				matches.push(obj);
			}
		}

		return matches;
	}

	/**
  * Build a function that can be used to filter a data collection using the specified
  * {criteria}.
  *
  * @method makeFilterFunction
  * @param {Criteria} criteria    the criteria object used to filter the {collection}.
  *
  * @returns {Function} the filter function
  * @protected
  */
	makeFilterFunction(criteria) {
		var clauses = [];

		if (criteria.filterClauses) {
			for (let key of criteria.filterClauses.keys()) clauses.push([key, criteria.filterClauses.get(key)]);
		}

		return function (obj) {
			return clauses.every(pair => {
				let [key, val] = pair;
				return obj[key] === val;
			});
		};
	}

	/**
  * Store the specified {data} in the collection of the specified {type}.
  *
  * @method store
  * @param {Class} type  the collection to store the data in
  * @param {Object} data    the object data to store
  *
  * @returns {Promise} the promise that resolves to the ID assigned to the new object
  */
	store(type, data) {
		var collection = this.getCollectionForType(type);
		var id = this.ids.get(type).next().value;

		console.debug(`Storing ${ type.name } ID=${ id }`);
		collection.set(id, data);
		return _bluebird2.default.resolve(id);
	}

	/**
  * Update the data for the object of the specified {type} and {id} with {data}.
  *
  * @method update
  * @param {Class}   type   the collection to store the data in
  * @param {Integer} id     the ID of the object to update
  * @param {Object}  data   the object data to store
  *
  * @returns {Promise} the promise that resolves to the updated object data
  */
	update(type, id, data) {
		var collection = this.getCollectionForType(type);
		var current = collection.get(id);

		if (!current) {
			return _bluebird2.default.reject(new Error(`No such ${ type.name } ID=${ id }`));
		}

		console.debug(`Merging ${ type.name } ID=${ id }`);
		(0, _assign2.default)(current, data);

		return _bluebird2.default.resolve(current);
	}

	/**
  * Replace the data for the object of the specified {type} and {id} with {data}.
  *
  * @method replace
  * @param {Class}   type   the collection to store the data in
  * @param {Integer} id     the ID of the object to replace
  * @param {Object}  data   the object data to store
  *
  * @returns {Promise} the promise that resolves to the new object data
  */
	replace(type, id, data) {
		var collection = this.getCollectionForType(type);
		var current = collection.get(id);
		collection.set(id, data);
		return _bluebird2.default.resolve(current);
	}

	/**
  * Delete the data for the object of the specified {type} and {id}.
  *
  * @method remove
  * @param {Class}   type   the collection to remove the object from
  * @param {Integer} id     the ID of the object to remove
  *
  * @returns {Promise} the promise that resolves to `true` if the object existed
  *                    or `false` if it did not.
  */
	remove(type, id) {
		var collection = this.getCollectionForType(type);
		var result = collection.delete(id);
		return _bluebird2.default.resolve(result);
	}

	/**
  * Clear all saved data and ID generators from the store.
  *
  * @method _clear
  * @protected
  */
	_clear() {
		this.objects.clear();
	}

};
//# sourceMappingURL=data:application/json;base64,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QWEsS0FBSyxvQkFBTCxDQUEyQixJQUEzQixDQUFiLENBRGM7QUFFbEIsTUFBSSxTQUFTLFdBQVcsTUFBWCxDQUFtQixFQUFuQixDQUFULENBRmM7QUFHbEIsU0FBTyxtQkFBUSxPQUFSLENBQWlCLE1BQWpCLENBQVAsQ0FIa0I7RUFBbkI7Ozs7Ozs7O0FBcE40QyxPQWlPNUMsR0FBUztBQUNSLE9BQUssT0FBTCxDQUFhLEtBQWIsR0FEUTtFQUFUOztDQWpPTSIsImZpbGUiOiJudWxsLWRhdGFzdG9yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0qLSBqYXZhc2NyaXB0IC0qLSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgJ2JhYmVsL3BvbHlmaWxsJztcblxuaW1wb3J0IHtEYXRhc3RvcmV9IGZyb20gJy4vZGF0YXN0b3JlJztcblxuXG4vKipcbiAqIEFuIGluLW1lbW9yeSBkYXRhc3RvcmUgKGZvciB0ZXN0aW5nKVxuICpcbiAqIEBjbGFzcyBOdWxsRGF0YXN0b3JlXG4gKiBAY29uc3RydWN0b3JcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBOdWxsRGF0YXN0b3JlIGV4dGVuZHMgRGF0YXN0b3JlIHtcblxuXHQvKipcblx0ICogSUQtZ2VuZXJhdG9yIGZ1bmN0aW9uLlxuXHQgKiBAc3RhdGljXG5cdCAqL1xuXHRzdGF0aWMgKmdlbklkKCkge1xuXHRcdGxldCBpID0gMDtcblx0XHRmb3IoIDs7ICkge1xuXHRcdFx0eWllbGQoICsraSApO1xuXHRcdH1cblx0fVxuXG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBOdWxsRGF0YXN0b3JlXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMub2JqZWN0cyA9IG5ldyBNYXAoKTtcblx0XHR0aGlzLmlkcyA9IG5ldyBNYXAoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBGZXRjaCB0aGUgaW50ZXJuYWwgY29sbGVjdGlvbiBmb3IgdGhlIGdpdmVuIG9iamVjdCB7dHlwZX0uXG5cdCAqIEBtZXRob2QgZ2V0Q29sbGVjdGlvbkZvclR5cGVcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0Z2V0Q29sbGVjdGlvbkZvclR5cGUoIHR5cGUgKSB7XG5cdFx0aWYgKCAhdGhpcy5vYmplY3RzLmhhcyh0eXBlKSApIHtcblx0XHRcdGNvbnNvbGUuaW5mbyggXCJPYmplY3RTdG9yZSBkb2Vzbid0IGhhdmUgYSAlcyBjb2xsZWN0aW9uOyBjcmVhdGluZyBvbmUuXCIsIHR5cGUgKTtcblx0XHRcdHRoaXMub2JqZWN0cy5zZXQoIHR5cGUsIG5ldyBNYXAoKSApO1xuXHRcdFx0dGhpcy5pZHMuc2V0KCB0eXBlLCBOdWxsRGF0YXN0b3JlLmdlbklkKCkgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5vYmplY3RzLmdldCggdHlwZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBBUEkgLS0gZ2V0IGFuIGluc3RhbmNlIG9mIHRoZSBzcGVjaWZpZWQgb2JqZWN0IHt0eXBlfSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZVxuXHQgKiBnaXZlbiB7aWR9LlxuXHQgKlxuXHQgKiBAbWV0aG9kIGdldEluc3RhbmNlXG5cdCAqIEBwYXJhbSB7Q2xhc3N9IHR5cGUgIHRoZSBjbGFzcyBvZiBvYmplY3QgdG8gZmV0Y2ggZGF0YSBmb3Jcblx0ICogQHBhcmFtIHtJbnRlZ2VyfSBpZCAgdGhlIElEIG9mIHRoZSBvYmplY3Qgd2hvc2UgZGF0YSBzaG91bGQgYmUgZmV0Y2hlZC5cblx0ICpcblx0ICogQHJldHVybnMge1Byb21pc2V9IHRoZSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIG9iamVjdCBkYXRhLlxuXHQgKi9cblx0Z2V0SW5zdGFuY2UoIHR5cGUsIGlkICkge1xuXHRcdGNvbnNvbGUuZGVidWcoIGBHZXR0aW5nIGluc3RhbmNlICR7aWR9IG9mICR7dHlwZS5uYW1lfWAgKTtcblx0XHR2YXIgY29sbGVjdGlvbiA9IHRoaXMuZ2V0Q29sbGVjdGlvbkZvclR5cGUoIHR5cGUgKTtcblxuXHRcdGlmICggY29sbGVjdGlvbi5oYXMoaWQpICkge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSggY29sbGVjdGlvbi5nZXQoaWQpICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCggbmV3IEVycm9yKGBObyBzdWNoICR7dHlwZS5uYW1lfSBJRD0ke2lkfWApICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBBUEkgLS0gZ2V0IHRoZSBjb2xsZWN0aW9uIG9mIGRhdGEgZm9yIHRoZSBvYmplY3RzIG9mIHRoZSBzcGVjaWZpZWQge3R5cGV9XG5cdCAqIHRoYXQgbWF0Y2ggdGhlIGdpdmVuIHtjcml0ZXJpYX0uXG5cdCAqXG5cdCAqIEBtZXRob2QgZ2V0Q29sbGVjdGlvblxuXHQgKiBAcGFyYW0ge0NsYXNzfSB0eXBlICB0aGUgY2xhc3Mgb2Ygb2JqZWN0IHRvIGZldGNoIGRhdGEgZm9yXG5cdCAqIEBwYXJhbSB7Q3JpdGVyaWF9IGNyaXRlcmlhICB0aGUgQ3JpdGVyaWEgb2JqZWN0IHRoYXQgZGVzY3JpYmVzIHRoZSBjb2xsZWN0aW9uIG9mXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzIHRvIGZldGNoLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZX0gdGhlIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBBcnJheSBvZiBtYXRjaGluZyBvYmplY3QgZGF0YS5cblx0ICovXG5cdGdldENvbGxlY3Rpb24oIHR5cGUsIGNyaXRlcmlhICkge1xuXHRcdGNvbnNvbGUuZGVidWcoIGBHZXR0aW5nICVzIGNvbGxlY3Rpb24gbWF0Y2hpbmc6ICVvYCwgdHlwZS5uYW1lLCBjcml0ZXJpYSApO1xuXHRcdHZhciBjb2xsZWN0aW9uID0gdGhpcy5nZXRDb2xsZWN0aW9uRm9yVHlwZSggdHlwZSApO1xuXHRcdHZhciByZXN1bHRzO1xuXG5cdFx0aWYgKCBjcml0ZXJpYSApIHtcblx0XHRcdGNvbnNvbGUuZGVidWcoIFwiRmlsdGVyZWQgZmV0Y2ggb3ZlciBjb2xsZWN0aW9uIG9mICVkIG9iamVjdHMhXCIsIGNvbGxlY3Rpb24uc2l6ZSApO1xuXHRcdFx0dmFyIG1hdGNoZXMgPSB0aGlzLmZpbmRNYXRjaGluZ09iamVjdHMoIGNvbGxlY3Rpb24sIGNyaXRlcmlhICk7XG5cdFx0XHRjb25zb2xlLmRlYnVnKCBcIkZvdW5kICVkIG1hdGNoZXM6ICVvXCIsIG1hdGNoZXMubGVuZ3RoLCBtYXRjaGVzICk7XG5cdFx0XHRyZXN1bHRzID0gQXJyYXkuZnJvbSggbWF0Y2hlcyApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmRlYnVnKCBcIlVuZmlsdGVyZWQgZmV0Y2ghXCIgKTtcblx0XHRcdHJlc3VsdHMgPSBBcnJheS5mcm9tKCBjb2xsZWN0aW9uLnZhbHVlcygpICk7XG5cdFx0fVxuXG5cdFx0Y29uc29sZS5kZWJ1ZyggYHJlc3VsdCBpcyBhICR7dHlwZW9mIHJlc3VsdHN9YCApO1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoIHJlc3VsdHMgKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIEJ1aWxkIGFuIEFycmF5IG9mIG1hdGNoZXMgZm9yIHRoZSBzcGVjaWZpZWQge2NyaXRlcmlhfSBmcm9tIHRoZSBnaXZlbiB7Y29sbGVjdGlvbn0uXG5cdCAqXG5cdCAqIEBtZXRob2QgZmluZE1hdGNoaW5nT2JqZWN0c1xuXHQgKiBAcGFyYW0ge0l0ZXJhYmxlfSBjb2xsZWN0aW9uICB0aGUgY29sbGVjdGlvbiBvZiBvYmplY3QgZGF0YS5cblx0ICogQHBhcmFtIHtDcml0ZXJpYX0gY3JpdGVyaWEgICAgdGhlIGNyaXRlcmlhIG9iamVjdCB1c2VkIHRvIGZpbHRlciB0aGUge2NvbGxlY3Rpb259LlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IHRoZSBtYXRjaGluZyBkYXRhLlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRmaW5kTWF0Y2hpbmdPYmplY3RzKCBjb2xsZWN0aW9uLCBjcml0ZXJpYSApIHtcblx0XHQvLyBUaGlzIHNob3VsZCBmaWx0ZXIsIGxpbWl0LCBvZmZzZXQsIGV0Yy5cblx0XHR2YXIgZmlsdGVyRnVuYyA9IHRoaXMubWFrZUZpbHRlckZ1bmN0aW9uKCBjcml0ZXJpYSApO1xuXHRcdHZhciBtYXRjaGVzID0gW107XG5cblx0XHRmb3IgKCBsZXQgb2JqIG9mIGNvbGxlY3Rpb24udmFsdWVzKCkgKSB7XG5cdFx0XHRpZiAoIGZpbHRlckZ1bmMob2JqKSApIHsgbWF0Y2hlcy5wdXNoKCBvYmogKTsgfVxuXHRcdH1cblxuXHRcdHJldHVybiBtYXRjaGVzO1xuXHR9XG5cblxuXHQvKipcblx0ICogQnVpbGQgYSBmdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGZpbHRlciBhIGRhdGEgY29sbGVjdGlvbiB1c2luZyB0aGUgc3BlY2lmaWVkXG5cdCAqIHtjcml0ZXJpYX0uXG5cdCAqXG5cdCAqIEBtZXRob2QgbWFrZUZpbHRlckZ1bmN0aW9uXG5cdCAqIEBwYXJhbSB7Q3JpdGVyaWF9IGNyaXRlcmlhICAgIHRoZSBjcml0ZXJpYSBvYmplY3QgdXNlZCB0byBmaWx0ZXIgdGhlIHtjb2xsZWN0aW9ufS5cblx0ICpcblx0ICogQHJldHVybnMge0Z1bmN0aW9ufSB0aGUgZmlsdGVyIGZ1bmN0aW9uXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdG1ha2VGaWx0ZXJGdW5jdGlvbiggY3JpdGVyaWEgKSB7XG5cdFx0dmFyIGNsYXVzZXMgPSBbXTtcblxuXHRcdGlmICggY3JpdGVyaWEuZmlsdGVyQ2xhdXNlcyApIHtcblx0XHRcdGZvciAoIGxldCBrZXkgb2YgY3JpdGVyaWEuZmlsdGVyQ2xhdXNlcy5rZXlzKCkgKVxuXHRcdFx0XHRjbGF1c2VzLnB1c2goWyBrZXksIGNyaXRlcmlhLmZpbHRlckNsYXVzZXMuZ2V0KGtleSkgXSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0XHRyZXR1cm4gY2xhdXNlcy5ldmVyeSggcGFpciA9PiB7XG5cdFx0XHRcdGxldCBba2V5LCB2YWxdID0gcGFpcjtcblx0XHRcdFx0cmV0dXJuICggb2JqW2tleV0gPT09IHZhbCApO1xuXHRcdFx0fSk7XG5cdFx0fTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIFN0b3JlIHRoZSBzcGVjaWZpZWQge2RhdGF9IGluIHRoZSBjb2xsZWN0aW9uIG9mIHRoZSBzcGVjaWZpZWQge3R5cGV9LlxuXHQgKlxuXHQgKiBAbWV0aG9kIHN0b3JlXG5cdCAqIEBwYXJhbSB7Q2xhc3N9IHR5cGUgIHRoZSBjb2xsZWN0aW9uIHRvIHN0b3JlIHRoZSBkYXRhIGluXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhICAgIHRoZSBvYmplY3QgZGF0YSB0byBzdG9yZVxuXHQgKlxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZX0gdGhlIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgSUQgYXNzaWduZWQgdG8gdGhlIG5ldyBvYmplY3Rcblx0ICovXG5cdHN0b3JlKCB0eXBlLCBkYXRhICkge1xuXHRcdHZhciBjb2xsZWN0aW9uID0gdGhpcy5nZXRDb2xsZWN0aW9uRm9yVHlwZSggdHlwZSApO1xuXHRcdHZhciBpZCA9IHRoaXMuaWRzLmdldCggdHlwZSApLm5leHQoKS52YWx1ZTtcblxuXHRcdGNvbnNvbGUuZGVidWcoIGBTdG9yaW5nICR7dHlwZS5uYW1lfSBJRD0ke2lkfWAgKTtcblx0XHRjb2xsZWN0aW9uLnNldCggaWQsIGRhdGEgKTtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCBpZCApO1xuXHR9XG5cblxuXHQvKipcblx0ICogVXBkYXRlIHRoZSBkYXRhIGZvciB0aGUgb2JqZWN0IG9mIHRoZSBzcGVjaWZpZWQge3R5cGV9IGFuZCB7aWR9IHdpdGgge2RhdGF9LlxuXHQgKlxuXHQgKiBAbWV0aG9kIHVwZGF0ZVxuXHQgKiBAcGFyYW0ge0NsYXNzfSAgIHR5cGUgICB0aGUgY29sbGVjdGlvbiB0byBzdG9yZSB0aGUgZGF0YSBpblxuXHQgKiBAcGFyYW0ge0ludGVnZXJ9IGlkICAgICB0aGUgSUQgb2YgdGhlIG9iamVjdCB0byB1cGRhdGVcblx0ICogQHBhcmFtIHtPYmplY3R9ICBkYXRhICAgdGhlIG9iamVjdCBkYXRhIHRvIHN0b3JlXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlfSB0aGUgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSB1cGRhdGVkIG9iamVjdCBkYXRhXG5cdCAqL1xuXHR1cGRhdGUoIHR5cGUsIGlkLCBkYXRhICkge1xuXHRcdHZhciBjb2xsZWN0aW9uID0gdGhpcy5nZXRDb2xsZWN0aW9uRm9yVHlwZSggdHlwZSApO1xuXHRcdHZhciBjdXJyZW50ID0gY29sbGVjdGlvbi5nZXQoIGlkICk7XG5cblx0XHRpZiAoICFjdXJyZW50ICkge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCBuZXcgRXJyb3IoYE5vIHN1Y2ggJHt0eXBlLm5hbWV9IElEPSR7aWR9YCkgKTtcblx0XHR9XG5cblx0XHRjb25zb2xlLmRlYnVnKCBgTWVyZ2luZyAke3R5cGUubmFtZX0gSUQ9JHtpZH1gICk7XG5cdFx0T2JqZWN0LmFzc2lnbiggY3VycmVudCwgZGF0YSApO1xuXG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSggY3VycmVudCApO1xuXHR9XG5cblxuXHQvKipcblx0ICogUmVwbGFjZSB0aGUgZGF0YSBmb3IgdGhlIG9iamVjdCBvZiB0aGUgc3BlY2lmaWVkIHt0eXBlfSBhbmQge2lkfSB3aXRoIHtkYXRhfS5cblx0ICpcblx0ICogQG1ldGhvZCByZXBsYWNlXG5cdCAqIEBwYXJhbSB7Q2xhc3N9ICAgdHlwZSAgIHRoZSBjb2xsZWN0aW9uIHRvIHN0b3JlIHRoZSBkYXRhIGluXG5cdCAqIEBwYXJhbSB7SW50ZWdlcn0gaWQgICAgIHRoZSBJRCBvZiB0aGUgb2JqZWN0IHRvIHJlcGxhY2Vcblx0ICogQHBhcmFtIHtPYmplY3R9ICBkYXRhICAgdGhlIG9iamVjdCBkYXRhIHRvIHN0b3JlXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlfSB0aGUgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBuZXcgb2JqZWN0IGRhdGFcblx0ICovXG5cdHJlcGxhY2UoIHR5cGUsIGlkLCBkYXRhICkge1xuXHRcdHZhciBjb2xsZWN0aW9uID0gdGhpcy5nZXRDb2xsZWN0aW9uRm9yVHlwZSggdHlwZSApO1xuXHRcdHZhciBjdXJyZW50ID0gY29sbGVjdGlvbi5nZXQoIGlkICk7XG5cdFx0Y29sbGVjdGlvbi5zZXQoIGlkLCBkYXRhICk7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSggY3VycmVudCApO1xuXHR9XG5cblxuXHQvKipcblx0ICogRGVsZXRlIHRoZSBkYXRhIGZvciB0aGUgb2JqZWN0IG9mIHRoZSBzcGVjaWZpZWQge3R5cGV9IGFuZCB7aWR9LlxuXHQgKlxuXHQgKiBAbWV0aG9kIHJlbW92ZVxuXHQgKiBAcGFyYW0ge0NsYXNzfSAgIHR5cGUgICB0aGUgY29sbGVjdGlvbiB0byByZW1vdmUgdGhlIG9iamVjdCBmcm9tXG5cdCAqIEBwYXJhbSB7SW50ZWdlcn0gaWQgICAgIHRoZSBJRCBvZiB0aGUgb2JqZWN0IHRvIHJlbW92ZVxuXHQgKlxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZX0gdGhlIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBgdHJ1ZWAgaWYgdGhlIG9iamVjdCBleGlzdGVkXG5cdCAqICAgICAgICAgICAgICAgICAgICBvciBgZmFsc2VgIGlmIGl0IGRpZCBub3QuXG5cdCAqL1xuXHRyZW1vdmUoIHR5cGUsIGlkICkge1xuXHRcdHZhciBjb2xsZWN0aW9uID0gdGhpcy5nZXRDb2xsZWN0aW9uRm9yVHlwZSggdHlwZSApO1xuXHRcdHZhciByZXN1bHQgPSBjb2xsZWN0aW9uLmRlbGV0ZSggaWQgKTtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCByZXN1bHQgKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIENsZWFyIGFsbCBzYXZlZCBkYXRhIGFuZCBJRCBnZW5lcmF0b3JzIGZyb20gdGhlIHN0b3JlLlxuXHQgKlxuXHQgKiBAbWV0aG9kIF9jbGVhclxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRfY2xlYXIoKSB7XG5cdFx0dGhpcy5vYmplY3RzLmNsZWFyKCk7XG5cdH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
