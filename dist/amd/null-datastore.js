define(['exports', 'babel-runtime/core-js/object/assign', 'babel-runtime/core-js/array/from', 'babel-runtime/core-js/map', 'bluebird', './datastore', 'babel/polyfill'], function (exports, _assign, _from, _map, _bluebird, _datastore) {
	/* -*- javascript -*- */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.NullDatastore = undefined;

	var _assign2 = _interopRequireDefault(_assign);

	var _from2 = _interopRequireDefault(_from);

	var _map2 = _interopRequireDefault(_map);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

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
});
//# sourceMappingURL=data:application/json;base64,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Q0FBMkIsSUFBM0IsQ0FBYixDQURjO0FBRWxCLE9BQUksU0FBUyxXQUFXLE1BQVgsQ0FBbUIsRUFBbkIsQ0FBVCxDQUZjO0FBR2xCLFVBQU8sbUJBQVEsT0FBUixDQUFpQixNQUFqQixDQUFQLENBSGtCO0dBQW5COzs7Ozs7OztBQXBONEMsUUFpTzVDLEdBQVM7QUFDUixRQUFLLE9BQUwsQ0FBYSxLQUFiLEdBRFE7R0FBVDs7RUFqT00iLCJmaWxlIjoibnVsbC1kYXRhc3RvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAtKi0gamF2YXNjcmlwdCAtKi0gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0ICdiYWJlbC9wb2x5ZmlsbCc7XG5cbmltcG9ydCB7RGF0YXN0b3JlfSBmcm9tICcuL2RhdGFzdG9yZSc7XG5cblxuLyoqXG4gKiBBbiBpbi1tZW1vcnkgZGF0YXN0b3JlIChmb3IgdGVzdGluZylcbiAqXG4gKiBAY2xhc3MgTnVsbERhdGFzdG9yZVxuICogQGNvbnN0cnVjdG9yXG4gKlxuICovXG5leHBvcnQgY2xhc3MgTnVsbERhdGFzdG9yZSBleHRlbmRzIERhdGFzdG9yZSB7XG5cblx0LyoqXG5cdCAqIElELWdlbmVyYXRvciBmdW5jdGlvbi5cblx0ICogQHN0YXRpY1xuXHQgKi9cblx0c3RhdGljICpnZW5JZCgpIHtcblx0XHRsZXQgaSA9IDA7XG5cdFx0Zm9yKCA7OyApIHtcblx0XHRcdHlpZWxkKCArK2kgKTtcblx0XHR9XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgTnVsbERhdGFzdG9yZVxuXHQgKi9cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm9iamVjdHMgPSBuZXcgTWFwKCk7XG5cdFx0dGhpcy5pZHMgPSBuZXcgTWFwKCk7XG5cdH1cblxuXHQvKipcblx0ICogRmV0Y2ggdGhlIGludGVybmFsIGNvbGxlY3Rpb24gZm9yIHRoZSBnaXZlbiBvYmplY3Qge3R5cGV9LlxuXHQgKiBAbWV0aG9kIGdldENvbGxlY3Rpb25Gb3JUeXBlXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdGdldENvbGxlY3Rpb25Gb3JUeXBlKCB0eXBlICkge1xuXHRcdGlmICggIXRoaXMub2JqZWN0cy5oYXModHlwZSkgKSB7XG5cdFx0XHRjb25zb2xlLmluZm8oIFwiT2JqZWN0U3RvcmUgZG9lc24ndCBoYXZlIGEgJXMgY29sbGVjdGlvbjsgY3JlYXRpbmcgb25lLlwiLCB0eXBlICk7XG5cdFx0XHR0aGlzLm9iamVjdHMuc2V0KCB0eXBlLCBuZXcgTWFwKCkgKTtcblx0XHRcdHRoaXMuaWRzLnNldCggdHlwZSwgTnVsbERhdGFzdG9yZS5nZW5JZCgpICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMub2JqZWN0cy5nZXQoIHR5cGUgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgQVBJIC0tIGdldCBhbiBpbnN0YW5jZSBvZiB0aGUgc3BlY2lmaWVkIG9iamVjdCB7dHlwZX0gdGhhdCBjb3JyZXNwb25kcyB0byB0aGVcblx0ICogZ2l2ZW4ge2lkfS5cblx0ICpcblx0ICogQG1ldGhvZCBnZXRJbnN0YW5jZVxuXHQgKiBAcGFyYW0ge0NsYXNzfSB0eXBlICB0aGUgY2xhc3Mgb2Ygb2JqZWN0IHRvIGZldGNoIGRhdGEgZm9yXG5cdCAqIEBwYXJhbSB7SW50ZWdlcn0gaWQgIHRoZSBJRCBvZiB0aGUgb2JqZWN0IHdob3NlIGRhdGEgc2hvdWxkIGJlIGZldGNoZWQuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlfSB0aGUgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBvYmplY3QgZGF0YS5cblx0ICovXG5cdGdldEluc3RhbmNlKCB0eXBlLCBpZCApIHtcblx0XHRjb25zb2xlLmRlYnVnKCBgR2V0dGluZyBpbnN0YW5jZSAke2lkfSBvZiAke3R5cGUubmFtZX1gICk7XG5cdFx0dmFyIGNvbGxlY3Rpb24gPSB0aGlzLmdldENvbGxlY3Rpb25Gb3JUeXBlKCB0eXBlICk7XG5cblx0XHRpZiAoIGNvbGxlY3Rpb24uaGFzKGlkKSApIHtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoIGNvbGxlY3Rpb24uZ2V0KGlkKSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoIG5ldyBFcnJvcihgTm8gc3VjaCAke3R5cGUubmFtZX0gSUQ9JHtpZH1gKSApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgQVBJIC0tIGdldCB0aGUgY29sbGVjdGlvbiBvZiBkYXRhIGZvciB0aGUgb2JqZWN0cyBvZiB0aGUgc3BlY2lmaWVkIHt0eXBlfVxuXHQgKiB0aGF0IG1hdGNoIHRoZSBnaXZlbiB7Y3JpdGVyaWF9LlxuXHQgKlxuXHQgKiBAbWV0aG9kIGdldENvbGxlY3Rpb25cblx0ICogQHBhcmFtIHtDbGFzc30gdHlwZSAgdGhlIGNsYXNzIG9mIG9iamVjdCB0byBmZXRjaCBkYXRhIGZvclxuXHQgKiBAcGFyYW0ge0NyaXRlcmlhfSBjcml0ZXJpYSAgdGhlIENyaXRlcmlhIG9iamVjdCB0aGF0IGRlc2NyaWJlcyB0aGUgY29sbGVjdGlvbiBvZlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0cyB0byBmZXRjaC5cblx0ICpcblx0ICogQHJldHVybnMge1Byb21pc2V9IHRoZSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gQXJyYXkgb2YgbWF0Y2hpbmcgb2JqZWN0IGRhdGEuXG5cdCAqL1xuXHRnZXRDb2xsZWN0aW9uKCB0eXBlLCBjcml0ZXJpYSApIHtcblx0XHRjb25zb2xlLmRlYnVnKCBgR2V0dGluZyAlcyBjb2xsZWN0aW9uIG1hdGNoaW5nOiAlb2AsIHR5cGUubmFtZSwgY3JpdGVyaWEgKTtcblx0XHR2YXIgY29sbGVjdGlvbiA9IHRoaXMuZ2V0Q29sbGVjdGlvbkZvclR5cGUoIHR5cGUgKTtcblx0XHR2YXIgcmVzdWx0cztcblxuXHRcdGlmICggY3JpdGVyaWEgKSB7XG5cdFx0XHRjb25zb2xlLmRlYnVnKCBcIkZpbHRlcmVkIGZldGNoIG92ZXIgY29sbGVjdGlvbiBvZiAlZCBvYmplY3RzIVwiLCBjb2xsZWN0aW9uLnNpemUgKTtcblx0XHRcdHZhciBtYXRjaGVzID0gdGhpcy5maW5kTWF0Y2hpbmdPYmplY3RzKCBjb2xsZWN0aW9uLCBjcml0ZXJpYSApO1xuXHRcdFx0Y29uc29sZS5kZWJ1ZyggXCJGb3VuZCAlZCBtYXRjaGVzOiAlb1wiLCBtYXRjaGVzLmxlbmd0aCwgbWF0Y2hlcyApO1xuXHRcdFx0cmVzdWx0cyA9IEFycmF5LmZyb20oIG1hdGNoZXMgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS5kZWJ1ZyggXCJVbmZpbHRlcmVkIGZldGNoIVwiICk7XG5cdFx0XHRyZXN1bHRzID0gQXJyYXkuZnJvbSggY29sbGVjdGlvbi52YWx1ZXMoKSApO1xuXHRcdH1cblxuXHRcdGNvbnNvbGUuZGVidWcoIGByZXN1bHQgaXMgYSAke3R5cGVvZiByZXN1bHRzfWAgKTtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCByZXN1bHRzICk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBCdWlsZCBhbiBBcnJheSBvZiBtYXRjaGVzIGZvciB0aGUgc3BlY2lmaWVkIHtjcml0ZXJpYX0gZnJvbSB0aGUgZ2l2ZW4ge2NvbGxlY3Rpb259LlxuXHQgKlxuXHQgKiBAbWV0aG9kIGZpbmRNYXRjaGluZ09iamVjdHNcblx0ICogQHBhcmFtIHtJdGVyYWJsZX0gY29sbGVjdGlvbiAgdGhlIGNvbGxlY3Rpb24gb2Ygb2JqZWN0IGRhdGEuXG5cdCAqIEBwYXJhbSB7Q3JpdGVyaWF9IGNyaXRlcmlhICAgIHRoZSBjcml0ZXJpYSBvYmplY3QgdXNlZCB0byBmaWx0ZXIgdGhlIHtjb2xsZWN0aW9ufS5cblx0ICpcblx0ICogQHJldHVybnMge0FycmF5fSB0aGUgbWF0Y2hpbmcgZGF0YS5cblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0ZmluZE1hdGNoaW5nT2JqZWN0cyggY29sbGVjdGlvbiwgY3JpdGVyaWEgKSB7XG5cdFx0Ly8gVGhpcyBzaG91bGQgZmlsdGVyLCBsaW1pdCwgb2Zmc2V0LCBldGMuXG5cdFx0dmFyIGZpbHRlckZ1bmMgPSB0aGlzLm1ha2VGaWx0ZXJGdW5jdGlvbiggY3JpdGVyaWEgKTtcblx0XHR2YXIgbWF0Y2hlcyA9IFtdO1xuXG5cdFx0Zm9yICggbGV0IG9iaiBvZiBjb2xsZWN0aW9uLnZhbHVlcygpICkge1xuXHRcdFx0aWYgKCBmaWx0ZXJGdW5jKG9iaikgKSB7IG1hdGNoZXMucHVzaCggb2JqICk7IH1cblx0XHR9XG5cblx0XHRyZXR1cm4gbWF0Y2hlcztcblx0fVxuXG5cblx0LyoqXG5cdCAqIEJ1aWxkIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBmaWx0ZXIgYSBkYXRhIGNvbGxlY3Rpb24gdXNpbmcgdGhlIHNwZWNpZmllZFxuXHQgKiB7Y3JpdGVyaWF9LlxuXHQgKlxuXHQgKiBAbWV0aG9kIG1ha2VGaWx0ZXJGdW5jdGlvblxuXHQgKiBAcGFyYW0ge0NyaXRlcmlhfSBjcml0ZXJpYSAgICB0aGUgY3JpdGVyaWEgb2JqZWN0IHVzZWQgdG8gZmlsdGVyIHRoZSB7Y29sbGVjdGlvbn0uXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtGdW5jdGlvbn0gdGhlIGZpbHRlciBmdW5jdGlvblxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRtYWtlRmlsdGVyRnVuY3Rpb24oIGNyaXRlcmlhICkge1xuXHRcdHZhciBjbGF1c2VzID0gW107XG5cblx0XHRpZiAoIGNyaXRlcmlhLmZpbHRlckNsYXVzZXMgKSB7XG5cdFx0XHRmb3IgKCBsZXQga2V5IG9mIGNyaXRlcmlhLmZpbHRlckNsYXVzZXMua2V5cygpIClcblx0XHRcdFx0Y2xhdXNlcy5wdXNoKFsga2V5LCBjcml0ZXJpYS5maWx0ZXJDbGF1c2VzLmdldChrZXkpIF0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBmdW5jdGlvbiggb2JqICkge1xuXHRcdFx0cmV0dXJuIGNsYXVzZXMuZXZlcnkoIHBhaXIgPT4ge1xuXHRcdFx0XHRsZXQgW2tleSwgdmFsXSA9IHBhaXI7XG5cdFx0XHRcdHJldHVybiAoIG9ialtrZXldID09PSB2YWwgKTtcblx0XHRcdH0pO1xuXHRcdH07XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBTdG9yZSB0aGUgc3BlY2lmaWVkIHtkYXRhfSBpbiB0aGUgY29sbGVjdGlvbiBvZiB0aGUgc3BlY2lmaWVkIHt0eXBlfS5cblx0ICpcblx0ICogQG1ldGhvZCBzdG9yZVxuXHQgKiBAcGFyYW0ge0NsYXNzfSB0eXBlICB0aGUgY29sbGVjdGlvbiB0byBzdG9yZSB0aGUgZGF0YSBpblxuXHQgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAgICB0aGUgb2JqZWN0IGRhdGEgdG8gc3RvcmVcblx0ICpcblx0ICogQHJldHVybnMge1Byb21pc2V9IHRoZSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIElEIGFzc2lnbmVkIHRvIHRoZSBuZXcgb2JqZWN0XG5cdCAqL1xuXHRzdG9yZSggdHlwZSwgZGF0YSApIHtcblx0XHR2YXIgY29sbGVjdGlvbiA9IHRoaXMuZ2V0Q29sbGVjdGlvbkZvclR5cGUoIHR5cGUgKTtcblx0XHR2YXIgaWQgPSB0aGlzLmlkcy5nZXQoIHR5cGUgKS5uZXh0KCkudmFsdWU7XG5cblx0XHRjb25zb2xlLmRlYnVnKCBgU3RvcmluZyAke3R5cGUubmFtZX0gSUQ9JHtpZH1gICk7XG5cdFx0Y29sbGVjdGlvbi5zZXQoIGlkLCBkYXRhICk7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSggaWQgKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIFVwZGF0ZSB0aGUgZGF0YSBmb3IgdGhlIG9iamVjdCBvZiB0aGUgc3BlY2lmaWVkIHt0eXBlfSBhbmQge2lkfSB3aXRoIHtkYXRhfS5cblx0ICpcblx0ICogQG1ldGhvZCB1cGRhdGVcblx0ICogQHBhcmFtIHtDbGFzc30gICB0eXBlICAgdGhlIGNvbGxlY3Rpb24gdG8gc3RvcmUgdGhlIGRhdGEgaW5cblx0ICogQHBhcmFtIHtJbnRlZ2VyfSBpZCAgICAgdGhlIElEIG9mIHRoZSBvYmplY3QgdG8gdXBkYXRlXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSAgZGF0YSAgIHRoZSBvYmplY3QgZGF0YSB0byBzdG9yZVxuXHQgKlxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZX0gdGhlIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgdXBkYXRlZCBvYmplY3QgZGF0YVxuXHQgKi9cblx0dXBkYXRlKCB0eXBlLCBpZCwgZGF0YSApIHtcblx0XHR2YXIgY29sbGVjdGlvbiA9IHRoaXMuZ2V0Q29sbGVjdGlvbkZvclR5cGUoIHR5cGUgKTtcblx0XHR2YXIgY3VycmVudCA9IGNvbGxlY3Rpb24uZ2V0KCBpZCApO1xuXG5cdFx0aWYgKCAhY3VycmVudCApIHtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCggbmV3IEVycm9yKGBObyBzdWNoICR7dHlwZS5uYW1lfSBJRD0ke2lkfWApICk7XG5cdFx0fVxuXG5cdFx0Y29uc29sZS5kZWJ1ZyggYE1lcmdpbmcgJHt0eXBlLm5hbWV9IElEPSR7aWR9YCApO1xuXHRcdE9iamVjdC5hc3NpZ24oIGN1cnJlbnQsIGRhdGEgKTtcblxuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoIGN1cnJlbnQgKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIFJlcGxhY2UgdGhlIGRhdGEgZm9yIHRoZSBvYmplY3Qgb2YgdGhlIHNwZWNpZmllZCB7dHlwZX0gYW5kIHtpZH0gd2l0aCB7ZGF0YX0uXG5cdCAqXG5cdCAqIEBtZXRob2QgcmVwbGFjZVxuXHQgKiBAcGFyYW0ge0NsYXNzfSAgIHR5cGUgICB0aGUgY29sbGVjdGlvbiB0byBzdG9yZSB0aGUgZGF0YSBpblxuXHQgKiBAcGFyYW0ge0ludGVnZXJ9IGlkICAgICB0aGUgSUQgb2YgdGhlIG9iamVjdCB0byByZXBsYWNlXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSAgZGF0YSAgIHRoZSBvYmplY3QgZGF0YSB0byBzdG9yZVxuXHQgKlxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZX0gdGhlIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgbmV3IG9iamVjdCBkYXRhXG5cdCAqL1xuXHRyZXBsYWNlKCB0eXBlLCBpZCwgZGF0YSApIHtcblx0XHR2YXIgY29sbGVjdGlvbiA9IHRoaXMuZ2V0Q29sbGVjdGlvbkZvclR5cGUoIHR5cGUgKTtcblx0XHR2YXIgY3VycmVudCA9IGNvbGxlY3Rpb24uZ2V0KCBpZCApO1xuXHRcdGNvbGxlY3Rpb24uc2V0KCBpZCwgZGF0YSApO1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoIGN1cnJlbnQgKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIERlbGV0ZSB0aGUgZGF0YSBmb3IgdGhlIG9iamVjdCBvZiB0aGUgc3BlY2lmaWVkIHt0eXBlfSBhbmQge2lkfS5cblx0ICpcblx0ICogQG1ldGhvZCByZW1vdmVcblx0ICogQHBhcmFtIHtDbGFzc30gICB0eXBlICAgdGhlIGNvbGxlY3Rpb24gdG8gcmVtb3ZlIHRoZSBvYmplY3QgZnJvbVxuXHQgKiBAcGFyYW0ge0ludGVnZXJ9IGlkICAgICB0aGUgSUQgb2YgdGhlIG9iamVjdCB0byByZW1vdmVcblx0ICpcblx0ICogQHJldHVybnMge1Byb21pc2V9IHRoZSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYHRydWVgIGlmIHRoZSBvYmplY3QgZXhpc3RlZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgb3IgYGZhbHNlYCBpZiBpdCBkaWQgbm90LlxuXHQgKi9cblx0cmVtb3ZlKCB0eXBlLCBpZCApIHtcblx0XHR2YXIgY29sbGVjdGlvbiA9IHRoaXMuZ2V0Q29sbGVjdGlvbkZvclR5cGUoIHR5cGUgKTtcblx0XHR2YXIgcmVzdWx0ID0gY29sbGVjdGlvbi5kZWxldGUoIGlkICk7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSggcmVzdWx0ICk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBDbGVhciBhbGwgc2F2ZWQgZGF0YSBhbmQgSUQgZ2VuZXJhdG9ycyBmcm9tIHRoZSBzdG9yZS5cblx0ICpcblx0ICogQG1ldGhvZCBfY2xlYXJcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0X2NsZWFyKCkge1xuXHRcdHRoaXMub2JqZWN0cy5jbGVhcigpO1xuXHR9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
