/* -*- javascript -*- */
'use strict';

System.register(['babel-runtime/core-js/object/assign', 'babel-runtime/core-js/array/from', 'babel-runtime/core-js/map', 'bluebird', 'babel/polyfill', './datastore'], function (_export, _context) {
	var _Object$assign, _Array$from, _Map, Promise, Datastore;

	return {
		setters: [function (_babelRuntimeCoreJsObjectAssign) {
			_Object$assign = _babelRuntimeCoreJsObjectAssign.default;
		}, function (_babelRuntimeCoreJsArrayFrom) {
			_Array$from = _babelRuntimeCoreJsArrayFrom.default;
		}, function (_babelRuntimeCoreJsMap) {
			_Map = _babelRuntimeCoreJsMap.default;
		}, function (_bluebird) {
			Promise = _bluebird.default;
		}, function (_babelPolyfill) {}, function (_datastore) {
			Datastore = _datastore.Datastore;
		}],
		execute: function () {
			let NullDatastore = class NullDatastore extends Datastore {

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
					this.objects = new _Map();
					this.ids = new _Map();
				}

				/**
     * Fetch the internal collection for the given object {type}.
     * @method getCollectionForType
     * @protected
     */
				getCollectionForType(type) {
					if (!this.objects.has(type)) {
						console.info("ObjectStore doesn't have a %s collection; creating one.", type);
						this.objects.set(type, new _Map());
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
						return Promise.resolve(collection.get(id));
					} else {
						return Promise.reject(new Error(`No such ${ type.name } ID=${ id }`));
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
						results = _Array$from(matches);
					} else {
						console.debug("Unfiltered fetch!");
						results = _Array$from(collection.values());
					}

					console.debug(`result is a ${ typeof results }`);
					return Promise.resolve(results);
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
					return Promise.resolve(id);
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
						return Promise.reject(new Error(`No such ${ type.name } ID=${ id }`));
					}

					console.debug(`Merging ${ type.name } ID=${ id }`);
					_Object$assign(current, data);

					return Promise.resolve(current);
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
					return Promise.resolve(current);
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
					return Promise.resolve(result);
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

			_export('NullDatastore', NullDatastore);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,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SyxvQkFBTCxDQUEyQixJQUEzQixDQUFiLENBRGM7QUFFbEIsU0FBSSxTQUFTLFdBQVcsTUFBWCxDQUFtQixFQUFuQixDQUFULENBRmM7QUFHbEIsWUFBTyxRQUFRLE9BQVIsQ0FBaUIsTUFBakIsQ0FBUCxDQUhrQjtLQUFuQjs7Ozs7Ozs7QUFwTjRDLFVBaU81QyxHQUFTO0FBQ1IsVUFBSyxPQUFMLENBQWEsS0FBYixHQURRO0tBQVQ7O0lBak9NIiwiZmlsZSI6Im51bGwtZGF0YXN0b3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLSotIGphdmFzY3JpcHQgLSotICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCAnYmFiZWwvcG9seWZpbGwnO1xuXG5pbXBvcnQge0RhdGFzdG9yZX0gZnJvbSAnLi9kYXRhc3RvcmUnO1xuXG5cbi8qKlxuICogQW4gaW4tbWVtb3J5IGRhdGFzdG9yZSAoZm9yIHRlc3RpbmcpXG4gKlxuICogQGNsYXNzIE51bGxEYXRhc3RvcmVcbiAqIEBjb25zdHJ1Y3RvclxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIE51bGxEYXRhc3RvcmUgZXh0ZW5kcyBEYXRhc3RvcmUge1xuXG5cdC8qKlxuXHQgKiBJRC1nZW5lcmF0b3IgZnVuY3Rpb24uXG5cdCAqIEBzdGF0aWNcblx0ICovXG5cdHN0YXRpYyAqZ2VuSWQoKSB7XG5cdFx0bGV0IGkgPSAwO1xuXHRcdGZvciggOzsgKSB7XG5cdFx0XHR5aWVsZCggKytpICk7XG5cdFx0fVxuXHR9XG5cblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IE51bGxEYXRhc3RvcmVcblx0ICovXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5vYmplY3RzID0gbmV3IE1hcCgpO1xuXHRcdHRoaXMuaWRzID0gbmV3IE1hcCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEZldGNoIHRoZSBpbnRlcm5hbCBjb2xsZWN0aW9uIGZvciB0aGUgZ2l2ZW4gb2JqZWN0IHt0eXBlfS5cblx0ICogQG1ldGhvZCBnZXRDb2xsZWN0aW9uRm9yVHlwZVxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRnZXRDb2xsZWN0aW9uRm9yVHlwZSggdHlwZSApIHtcblx0XHRpZiAoICF0aGlzLm9iamVjdHMuaGFzKHR5cGUpICkge1xuXHRcdFx0Y29uc29sZS5pbmZvKCBcIk9iamVjdFN0b3JlIGRvZXNuJ3QgaGF2ZSBhICVzIGNvbGxlY3Rpb247IGNyZWF0aW5nIG9uZS5cIiwgdHlwZSApO1xuXHRcdFx0dGhpcy5vYmplY3RzLnNldCggdHlwZSwgbmV3IE1hcCgpICk7XG5cdFx0XHR0aGlzLmlkcy5zZXQoIHR5cGUsIE51bGxEYXRhc3RvcmUuZ2VuSWQoKSApO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLm9iamVjdHMuZ2V0KCB0eXBlICk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IEFQSSAtLSBnZXQgYW4gaW5zdGFuY2Ugb2YgdGhlIHNwZWNpZmllZCBvYmplY3Qge3R5cGV9IHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlXG5cdCAqIGdpdmVuIHtpZH0uXG5cdCAqXG5cdCAqIEBtZXRob2QgZ2V0SW5zdGFuY2Vcblx0ICogQHBhcmFtIHtDbGFzc30gdHlwZSAgdGhlIGNsYXNzIG9mIG9iamVjdCB0byBmZXRjaCBkYXRhIGZvclxuXHQgKiBAcGFyYW0ge0ludGVnZXJ9IGlkICB0aGUgSUQgb2YgdGhlIG9iamVjdCB3aG9zZSBkYXRhIHNob3VsZCBiZSBmZXRjaGVkLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZX0gdGhlIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgb2JqZWN0IGRhdGEuXG5cdCAqL1xuXHRnZXRJbnN0YW5jZSggdHlwZSwgaWQgKSB7XG5cdFx0Y29uc29sZS5kZWJ1ZyggYEdldHRpbmcgaW5zdGFuY2UgJHtpZH0gb2YgJHt0eXBlLm5hbWV9YCApO1xuXHRcdHZhciBjb2xsZWN0aW9uID0gdGhpcy5nZXRDb2xsZWN0aW9uRm9yVHlwZSggdHlwZSApO1xuXG5cdFx0aWYgKCBjb2xsZWN0aW9uLmhhcyhpZCkgKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCBjb2xsZWN0aW9uLmdldChpZCkgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCBuZXcgRXJyb3IoYE5vIHN1Y2ggJHt0eXBlLm5hbWV9IElEPSR7aWR9YCkgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogR2V0IEFQSSAtLSBnZXQgdGhlIGNvbGxlY3Rpb24gb2YgZGF0YSBmb3IgdGhlIG9iamVjdHMgb2YgdGhlIHNwZWNpZmllZCB7dHlwZX1cblx0ICogdGhhdCBtYXRjaCB0aGUgZ2l2ZW4ge2NyaXRlcmlhfS5cblx0ICpcblx0ICogQG1ldGhvZCBnZXRDb2xsZWN0aW9uXG5cdCAqIEBwYXJhbSB7Q2xhc3N9IHR5cGUgIHRoZSBjbGFzcyBvZiBvYmplY3QgdG8gZmV0Y2ggZGF0YSBmb3Jcblx0ICogQHBhcmFtIHtDcml0ZXJpYX0gY3JpdGVyaWEgIHRoZSBDcml0ZXJpYSBvYmplY3QgdGhhdCBkZXNjcmliZXMgdGhlIGNvbGxlY3Rpb24gb2Zcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHMgdG8gZmV0Y2guXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlfSB0aGUgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEFycmF5IG9mIG1hdGNoaW5nIG9iamVjdCBkYXRhLlxuXHQgKi9cblx0Z2V0Q29sbGVjdGlvbiggdHlwZSwgY3JpdGVyaWEgKSB7XG5cdFx0Y29uc29sZS5kZWJ1ZyggYEdldHRpbmcgJXMgY29sbGVjdGlvbiBtYXRjaGluZzogJW9gLCB0eXBlLm5hbWUsIGNyaXRlcmlhICk7XG5cdFx0dmFyIGNvbGxlY3Rpb24gPSB0aGlzLmdldENvbGxlY3Rpb25Gb3JUeXBlKCB0eXBlICk7XG5cdFx0dmFyIHJlc3VsdHM7XG5cblx0XHRpZiAoIGNyaXRlcmlhICkge1xuXHRcdFx0Y29uc29sZS5kZWJ1ZyggXCJGaWx0ZXJlZCBmZXRjaCBvdmVyIGNvbGxlY3Rpb24gb2YgJWQgb2JqZWN0cyFcIiwgY29sbGVjdGlvbi5zaXplICk7XG5cdFx0XHR2YXIgbWF0Y2hlcyA9IHRoaXMuZmluZE1hdGNoaW5nT2JqZWN0cyggY29sbGVjdGlvbiwgY3JpdGVyaWEgKTtcblx0XHRcdGNvbnNvbGUuZGVidWcoIFwiRm91bmQgJWQgbWF0Y2hlczogJW9cIiwgbWF0Y2hlcy5sZW5ndGgsIG1hdGNoZXMgKTtcblx0XHRcdHJlc3VsdHMgPSBBcnJheS5mcm9tKCBtYXRjaGVzICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUuZGVidWcoIFwiVW5maWx0ZXJlZCBmZXRjaCFcIiApO1xuXHRcdFx0cmVzdWx0cyA9IEFycmF5LmZyb20oIGNvbGxlY3Rpb24udmFsdWVzKCkgKTtcblx0XHR9XG5cblx0XHRjb25zb2xlLmRlYnVnKCBgcmVzdWx0IGlzIGEgJHt0eXBlb2YgcmVzdWx0c31gICk7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSggcmVzdWx0cyApO1xuXHR9XG5cblxuXHQvKipcblx0ICogQnVpbGQgYW4gQXJyYXkgb2YgbWF0Y2hlcyBmb3IgdGhlIHNwZWNpZmllZCB7Y3JpdGVyaWF9IGZyb20gdGhlIGdpdmVuIHtjb2xsZWN0aW9ufS5cblx0ICpcblx0ICogQG1ldGhvZCBmaW5kTWF0Y2hpbmdPYmplY3RzXG5cdCAqIEBwYXJhbSB7SXRlcmFibGV9IGNvbGxlY3Rpb24gIHRoZSBjb2xsZWN0aW9uIG9mIG9iamVjdCBkYXRhLlxuXHQgKiBAcGFyYW0ge0NyaXRlcmlhfSBjcml0ZXJpYSAgICB0aGUgY3JpdGVyaWEgb2JqZWN0IHVzZWQgdG8gZmlsdGVyIHRoZSB7Y29sbGVjdGlvbn0uXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gdGhlIG1hdGNoaW5nIGRhdGEuXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdGZpbmRNYXRjaGluZ09iamVjdHMoIGNvbGxlY3Rpb24sIGNyaXRlcmlhICkge1xuXHRcdC8vIFRoaXMgc2hvdWxkIGZpbHRlciwgbGltaXQsIG9mZnNldCwgZXRjLlxuXHRcdHZhciBmaWx0ZXJGdW5jID0gdGhpcy5tYWtlRmlsdGVyRnVuY3Rpb24oIGNyaXRlcmlhICk7XG5cdFx0dmFyIG1hdGNoZXMgPSBbXTtcblxuXHRcdGZvciAoIGxldCBvYmogb2YgY29sbGVjdGlvbi52YWx1ZXMoKSApIHtcblx0XHRcdGlmICggZmlsdGVyRnVuYyhvYmopICkgeyBtYXRjaGVzLnB1c2goIG9iaiApOyB9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1hdGNoZXM7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBCdWlsZCBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gZmlsdGVyIGEgZGF0YSBjb2xsZWN0aW9uIHVzaW5nIHRoZSBzcGVjaWZpZWRcblx0ICoge2NyaXRlcmlhfS5cblx0ICpcblx0ICogQG1ldGhvZCBtYWtlRmlsdGVyRnVuY3Rpb25cblx0ICogQHBhcmFtIHtDcml0ZXJpYX0gY3JpdGVyaWEgICAgdGhlIGNyaXRlcmlhIG9iamVjdCB1c2VkIHRvIGZpbHRlciB0aGUge2NvbGxlY3Rpb259LlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7RnVuY3Rpb259IHRoZSBmaWx0ZXIgZnVuY3Rpb25cblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0bWFrZUZpbHRlckZ1bmN0aW9uKCBjcml0ZXJpYSApIHtcblx0XHR2YXIgY2xhdXNlcyA9IFtdO1xuXG5cdFx0aWYgKCBjcml0ZXJpYS5maWx0ZXJDbGF1c2VzICkge1xuXHRcdFx0Zm9yICggbGV0IGtleSBvZiBjcml0ZXJpYS5maWx0ZXJDbGF1c2VzLmtleXMoKSApXG5cdFx0XHRcdGNsYXVzZXMucHVzaChbIGtleSwgY3JpdGVyaWEuZmlsdGVyQ2xhdXNlcy5nZXQoa2V5KSBdKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24oIG9iaiApIHtcblx0XHRcdHJldHVybiBjbGF1c2VzLmV2ZXJ5KCBwYWlyID0+IHtcblx0XHRcdFx0bGV0IFtrZXksIHZhbF0gPSBwYWlyO1xuXHRcdFx0XHRyZXR1cm4gKCBvYmpba2V5XSA9PT0gdmFsICk7XG5cdFx0XHR9KTtcblx0XHR9O1xuXHR9XG5cblxuXHQvKipcblx0ICogU3RvcmUgdGhlIHNwZWNpZmllZCB7ZGF0YX0gaW4gdGhlIGNvbGxlY3Rpb24gb2YgdGhlIHNwZWNpZmllZCB7dHlwZX0uXG5cdCAqXG5cdCAqIEBtZXRob2Qgc3RvcmVcblx0ICogQHBhcmFtIHtDbGFzc30gdHlwZSAgdGhlIGNvbGxlY3Rpb24gdG8gc3RvcmUgdGhlIGRhdGEgaW5cblx0ICogQHBhcmFtIHtPYmplY3R9IGRhdGEgICAgdGhlIG9iamVjdCBkYXRhIHRvIHN0b3JlXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlfSB0aGUgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBJRCBhc3NpZ25lZCB0byB0aGUgbmV3IG9iamVjdFxuXHQgKi9cblx0c3RvcmUoIHR5cGUsIGRhdGEgKSB7XG5cdFx0dmFyIGNvbGxlY3Rpb24gPSB0aGlzLmdldENvbGxlY3Rpb25Gb3JUeXBlKCB0eXBlICk7XG5cdFx0dmFyIGlkID0gdGhpcy5pZHMuZ2V0KCB0eXBlICkubmV4dCgpLnZhbHVlO1xuXG5cdFx0Y29uc29sZS5kZWJ1ZyggYFN0b3JpbmcgJHt0eXBlLm5hbWV9IElEPSR7aWR9YCApO1xuXHRcdGNvbGxlY3Rpb24uc2V0KCBpZCwgZGF0YSApO1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoIGlkICk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgdGhlIGRhdGEgZm9yIHRoZSBvYmplY3Qgb2YgdGhlIHNwZWNpZmllZCB7dHlwZX0gYW5kIHtpZH0gd2l0aCB7ZGF0YX0uXG5cdCAqXG5cdCAqIEBtZXRob2QgdXBkYXRlXG5cdCAqIEBwYXJhbSB7Q2xhc3N9ICAgdHlwZSAgIHRoZSBjb2xsZWN0aW9uIHRvIHN0b3JlIHRoZSBkYXRhIGluXG5cdCAqIEBwYXJhbSB7SW50ZWdlcn0gaWQgICAgIHRoZSBJRCBvZiB0aGUgb2JqZWN0IHRvIHVwZGF0ZVxuXHQgKiBAcGFyYW0ge09iamVjdH0gIGRhdGEgICB0aGUgb2JqZWN0IGRhdGEgdG8gc3RvcmVcblx0ICpcblx0ICogQHJldHVybnMge1Byb21pc2V9IHRoZSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHVwZGF0ZWQgb2JqZWN0IGRhdGFcblx0ICovXG5cdHVwZGF0ZSggdHlwZSwgaWQsIGRhdGEgKSB7XG5cdFx0dmFyIGNvbGxlY3Rpb24gPSB0aGlzLmdldENvbGxlY3Rpb25Gb3JUeXBlKCB0eXBlICk7XG5cdFx0dmFyIGN1cnJlbnQgPSBjb2xsZWN0aW9uLmdldCggaWQgKTtcblxuXHRcdGlmICggIWN1cnJlbnQgKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoIG5ldyBFcnJvcihgTm8gc3VjaCAke3R5cGUubmFtZX0gSUQ9JHtpZH1gKSApO1xuXHRcdH1cblxuXHRcdGNvbnNvbGUuZGVidWcoIGBNZXJnaW5nICR7dHlwZS5uYW1lfSBJRD0ke2lkfWAgKTtcblx0XHRPYmplY3QuYXNzaWduKCBjdXJyZW50LCBkYXRhICk7XG5cblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCBjdXJyZW50ICk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBSZXBsYWNlIHRoZSBkYXRhIGZvciB0aGUgb2JqZWN0IG9mIHRoZSBzcGVjaWZpZWQge3R5cGV9IGFuZCB7aWR9IHdpdGgge2RhdGF9LlxuXHQgKlxuXHQgKiBAbWV0aG9kIHJlcGxhY2Vcblx0ICogQHBhcmFtIHtDbGFzc30gICB0eXBlICAgdGhlIGNvbGxlY3Rpb24gdG8gc3RvcmUgdGhlIGRhdGEgaW5cblx0ICogQHBhcmFtIHtJbnRlZ2VyfSBpZCAgICAgdGhlIElEIG9mIHRoZSBvYmplY3QgdG8gcmVwbGFjZVxuXHQgKiBAcGFyYW0ge09iamVjdH0gIGRhdGEgICB0aGUgb2JqZWN0IGRhdGEgdG8gc3RvcmVcblx0ICpcblx0ICogQHJldHVybnMge1Byb21pc2V9IHRoZSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIG5ldyBvYmplY3QgZGF0YVxuXHQgKi9cblx0cmVwbGFjZSggdHlwZSwgaWQsIGRhdGEgKSB7XG5cdFx0dmFyIGNvbGxlY3Rpb24gPSB0aGlzLmdldENvbGxlY3Rpb25Gb3JUeXBlKCB0eXBlICk7XG5cdFx0dmFyIGN1cnJlbnQgPSBjb2xsZWN0aW9uLmdldCggaWQgKTtcblx0XHRjb2xsZWN0aW9uLnNldCggaWQsIGRhdGEgKTtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCBjdXJyZW50ICk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBEZWxldGUgdGhlIGRhdGEgZm9yIHRoZSBvYmplY3Qgb2YgdGhlIHNwZWNpZmllZCB7dHlwZX0gYW5kIHtpZH0uXG5cdCAqXG5cdCAqIEBtZXRob2QgcmVtb3ZlXG5cdCAqIEBwYXJhbSB7Q2xhc3N9ICAgdHlwZSAgIHRoZSBjb2xsZWN0aW9uIHRvIHJlbW92ZSB0aGUgb2JqZWN0IGZyb21cblx0ICogQHBhcmFtIHtJbnRlZ2VyfSBpZCAgICAgdGhlIElEIG9mIHRoZSBvYmplY3QgdG8gcmVtb3ZlXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlfSB0aGUgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGB0cnVlYCBpZiB0aGUgb2JqZWN0IGV4aXN0ZWRcblx0ICogICAgICAgICAgICAgICAgICAgIG9yIGBmYWxzZWAgaWYgaXQgZGlkIG5vdC5cblx0ICovXG5cdHJlbW92ZSggdHlwZSwgaWQgKSB7XG5cdFx0dmFyIGNvbGxlY3Rpb24gPSB0aGlzLmdldENvbGxlY3Rpb25Gb3JUeXBlKCB0eXBlICk7XG5cdFx0dmFyIHJlc3VsdCA9IGNvbGxlY3Rpb24uZGVsZXRlKCBpZCApO1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoIHJlc3VsdCApO1xuXHR9XG5cblxuXHQvKipcblx0ICogQ2xlYXIgYWxsIHNhdmVkIGRhdGEgYW5kIElEIGdlbmVyYXRvcnMgZnJvbSB0aGUgc3RvcmUuXG5cdCAqXG5cdCAqIEBtZXRob2QgX2NsZWFyXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdF9jbGVhcigpIHtcblx0XHR0aGlzLm9iamVjdHMuY2xlYXIoKTtcblx0fVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
