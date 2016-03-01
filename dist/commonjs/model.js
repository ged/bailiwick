/* -*- javascript -*- */
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Model = undefined;

var _toStringTag = require('babel-runtime/core-js/symbol/to-string-tag');

var _toStringTag2 = _interopRequireDefault(_toStringTag);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _construct = require('babel-runtime/core-js/reflect/construct');

var _construct2 = _interopRequireDefault(_construct);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _for = require('babel-runtime/core-js/symbol/for');

var _for2 = _interopRequireDefault(_for);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _resultSet = require('./result-set');

var _errors = require('./errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Use symbols for model object properties so they don't collide with
 * data properties.
 */
const NEW_OBJECT = (0, _for2.default)("newObject"),
      DATA = (0, _for2.default)("data"),
      DIRTY_FIELDS = (0, _for2.default)("dirtyFields"),
      ASSOCIATIONS_CACHE = (0, _for2.default)("associationsCache"),
      DATASTORE = (0, _for2.default)("datastore"),
      VALIDATORS = (0, _for2.default)("validators"),
      ASSOCIATIONS = (0, _for2.default)("associations"),
      VALUE_STRING = (0, _for2.default)("valueString");

/**
* Bailiwick.Model
*
* The base model class.
*
*/
let Model = exports.Model = class Model {

	/**
  * Get the Map of associations defined for the class.
  */
	static get associations() {
		if (!this[ASSOCIATIONS]) {
			this[ASSOCIATIONS] = new _map2.default();
		}
		return this[ASSOCIATIONS];
	}

	/**
  * Get the Map of validators defined for the class.
  */
	static get validators() {
		if (!this[VALIDATORS]) {
			this[VALIDATORS] = new _map2.default();
		}
		return this[VALIDATORS];
	}

	/**
  * Get the relative URI for the service endpoint for the receiving class.
  */
	static get uri() {
		return _inflection2.default.tableize(this.name);
	}

	/**
  * Request the datastore associated with this model.
  *
  * @throws {Error}  if the datastore hasn't been set.
  *
  */
	static get datastore() {
		if (!this[DATASTORE]) {
			throw Error(`No datastore has been set for ${ this }`);
		}

		return this[DATASTORE];
	}

	/**
  * Set the datastore associated with this model.
  */
	static set datastore(datastore) {
		// console.debug( `Datastore for ${this} set to ${datastore}` );
		this[DATASTORE] = datastore;
	}

	/**
  * Get a clone of the ResultSet for this model class.
  */
	static get resultset() {
		return new _resultSet.ResultSet(this);
	}

	/**
  * Request a ResultSet that will use the specified {parameters} in its criteria.
  */
	static where(parameters) {
		return this.resultset.where(parameters);
	}

	/**
  * Request a ResultSet that will use the specified {count} in its limit.
  */
	static limit(count) {
		return this.resultset.limit(count);
	}

	/**
  * Request a ResultSet that will use the specified {location} when fetching from
  * the datastore.
  */
	static from(location) {
		return this.resultset.from(location);
	}

	/**
  * Create one or more instances of the model from the specified {data}.
  */
	static fromData(data) {
		console.debug("Constructing %s objects from datastore data %o", this.name, data);
		if (Array.isArray(data)) {
			return data.map(record => (0, _construct2.default)(this, [record, false]));
		} else {
			return (0, _construct2.default)(this, [data, false]);
		}
	}

	/**
  * Get instances of the model.
  */
	static get(idOrCriteria = null) {
		return this.datastore.get(this, idOrCriteria).then(data => this.fromData(data));
	}

	/**
  * Create a new instance of the model and attempt to save it, returning a Promise
  * that will be resolved with the new model instance if successful.
  *
  * @param {Object} fields  the model data
  *
  */
	static create(fields) {
		var instance = (0, _construct2.default)(this, [fields]);
		return instance.create();
	}

	/**
  * Construct a new model object around the given {data}, marking it as new
  * if {isNew} is true.
  */
	constructor(data = {}, isNew = true) {
		this[NEW_OBJECT] = isNew;
		this[DATA] = data;
		this[DIRTY_FIELDS] = new _set2.default();
		this[ASSOCIATIONS_CACHE] = new _map2.default();

		this[DATASTORE] = this.constructor.datastore;

		// console.debug( `Created a new %s: %o`, this.constructor.name, data );
		this.defineAttributes(data);
	}

	/**
  * Fetch the URI of the object.
  */
	get uri() {
		return `${ this.constructor.uri }/${ this.id }`;
	}

	/**
  * Fetch the name of the model class of the object.
  */
	get modelType() {
		return this.constructor.name;
	}

	/**
  * Store the model object in the object's store, calling #store() if the
  * object is new, or #merge() with any modified fields if it's an existing
  * object.
  */
	save() {
		if (this.isNew()) {
			return this.create();
		} else {
			if (!this.isDirty()) {
				return _bluebird2.default.resolve(this);
			}
			return this.update();
		}
	}

	/**
  * Create the model object in the object's store and return a Promise that
     * will resolve to the result.
  */
	create() {
		return this.validate().then(() => {
			return this[DATASTORE].store(this.constructor, this[DATA]);
		}).then(result => {
			if (typeof result === 'object') {
				(0, _assign2.default)(this[DATA], result);
			} else {
				this[DATA]['id'] = result; // eslint-disable-line dot-notation
			}

			this[NEW_OBJECT] = false;
			this[DIRTY_FIELDS].clear();
			this.defineAttributes(this[DATA]);

			return this;
		});
	}

	/**
  * Update any dirty fields in the model object in the object's store with values from the object
     * and return a Promise that will resolve to the result.
  */
	update() {
		var dirtyData = {};
		for (var field of this[DIRTY_FIELDS]) {
			dirtyData[field] = this[DATA][field];
		}

		return this.validate().then(() => {
			return this[DATASTORE].update(this.constructor, this.id, dirtyData);
		}).then(mergedData => {
			(0, _assign2.default)(this[DATA], mergedData);
			this[NEW_OBJECT] = false;
			this[DIRTY_FIELDS].clear();
			this.defineAttributes(this[DATA]);

			return this;
		});
	}

	/**
  * Delete the object from the object's store and return a Promise that will resolve to the
     * result.
  */
	delete() {
		if (this.id) {
			return this[DATASTORE].remove(this.constructor, this.id).then(() => this);
		} else {
			return _bluebird2.default.resolve(this[DATA]);
		}
	}

	/*
  * Attribute accessor API
  */

	/**
  * Data property reader
  */
	getValue(name) {
		if (this.constructor.associations.has(name)) {
			let fn = this.constructor.associations.get(name);
			return fn(this[DATA][name]);
		} else {
			return this[DATA][name];
		}
	}

	/**
  * Data property writer
  */
	setValue(name, value) {
		// console.debug(`Setting ${name} to ${value}`);
		if (this[DATA][name] !== value) {
			this[DIRTY_FIELDS].add(name);
		}
		this[DATA][name] = value;
	}

	/**
  * Define attribute accessors for the specified {attrs}.
  */
	defineAttributes(attrs) {
		let self = this;

		for (let name in attrs) {
			if (!Object.hasOwnProperty(self, name)) {
				/* eslint-disable no-loop-func */
				(0, _defineProperty2.default)(self, name, {
					configurable: true,
					enumerable: true,
					get: () => {
						return self.getValue(name);
					},
					set: newval => {
						self.setValue(name, newval);
					}
				});
				/* eslint-enable no-loop-func */
			} else {
					console.debug(`Already has a ${ name } property.`);
				}
		}
	}

	/**
  * Returns {true} if the object has dirty (unsaved) attributes.
  *
  * @return {Boolean}
  */
	isDirty() {
		return this.isNew() || this[DIRTY_FIELDS].size !== 0;
	}

	/**
  * Returns `true` if the object was created as opposed to fetched from a datastore.
  *
  * @return {Boolean}
  */
	isNew() {
		return this[NEW_OBJECT];
	}

	/**
  * Mark the object as clean (i.e., not requiring saving).
  */
	markClean() {
		this[NEW_OBJECT] = false;
		this[DIRTY_FIELDS].clear();
	}

	/**
  * Validate the model object by calling its validation methods.
  *
  * @returns {Promise}  resolves if the object is valid, rejects with an Array of
  *   validation failures if not.
  */
	validate() {
		this.errors = new _errors.ValidationErrors();
		var promises = [];

		for (let [field, validationMethod] of this.validators) {
			console.debug(`Adding validation promise for ${ field }`);
			let pr = _bluebird2.default.try(() => validationMethod.call(this));
			promises.push(pr);
		}

		// Wait for all validation promises to settle, then add errors
		// for those which were rejected.
		return _bluebird2.default.all(promises.map(pr => pr.reflect())).each(promise => {
			console.debug("Settled promise inspection: ", promise);
		}).filter(promise => promise.isRejected()).each(promise => {
			var [field, reason] = promise.reason();
			this.errors.add(field, reason);
			console.debug(`Validation failed for ${ field }: ${ reason }`);
		}).then(() => {
			console.debug("Resolved validation promise, errors is: ", this.errors);
			if (this.errors.isEmpty()) {
				return _bluebird2.default.resolve(true);
			} else {
				let err = new ValidationError(`${ this.errors.length } validation failures.`);
				return _bluebird2.default.reject(err);
			}
		});
	}

	/**
  * toString() API -- return a human-readable representation of the object.
  */
	get [_toStringTag2.default]() {
		let dirtyMark = this.isDirty() ? ' ~' : '';
		let valueString = this[VALUE_STRING]();
		return `${ this.constructor.name } values={${ valueString }}${ dirtyMark }`;
	}

	/**
  * Return the object's data as a String containing fields and values suitable
  * for debugging.
  */
	[VALUE_STRING]() {
		var values = [];
		for (let field in this[DATA]) {
			let val = this[DATA][field];
			values.push(`${ field }: ${ val }`);
		}
		return values.join(', ');
	}
};
//# sourceMappingURL=data:application/json;base64,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QUssV0FBTCxDQUFpQixJQUFqQixFQUFzQixTQUF6QixHQUFvQyxXQUFwQyxFQUFnRCxDQUFoRCxHQUFtRCxTQUFuRCxFQUE2RCxDQUFwRSxDQUgwQjtFQUEzQjs7Ozs7O0FBN1drQixFQXdYaEIsWUFBRixJQUFtQjtBQUNsQixNQUFJLFNBQVMsRUFBVCxDQURjO0FBRWxCLE9BQU0sSUFBSSxLQUFKLElBQWEsS0FBTSxJQUFOLENBQW5CLEVBQWtDO0FBQ2pDLE9BQUksTUFBTSxLQUFNLElBQU4sRUFBYyxLQUFkLENBQU4sQ0FENkI7QUFFakMsVUFBTyxJQUFQLENBQWEsQ0FBQyxHQUFFLEtBQUgsRUFBUyxFQUFULEdBQWEsR0FBYixFQUFpQixDQUE5QixFQUZpQztHQUFsQztBQUlBLFNBQU8sT0FBTyxJQUFQLENBQWEsSUFBYixDQUFQLENBTmtCO0VBQW5CO0NBeFhNIiwiZmlsZSI6Im1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLSotIGphdmFzY3JpcHQgLSotICovXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IGluZmxlY3Rpb24gZnJvbSAnaW5mbGVjdGlvbic7XG5cbmltcG9ydCB7UmVzdWx0U2V0fSBmcm9tICcuL3Jlc3VsdC1zZXQnO1xuaW1wb3J0IHtWYWxpZGF0aW9uRXJyb3JzfSBmcm9tICcuL2Vycm9ycyc7XG5cbi8qXG4gKiBVc2Ugc3ltYm9scyBmb3IgbW9kZWwgb2JqZWN0IHByb3BlcnRpZXMgc28gdGhleSBkb24ndCBjb2xsaWRlIHdpdGhcbiAqIGRhdGEgcHJvcGVydGllcy5cbiAqL1xuY29uc3QgTkVXX09CSkVDVCAgICAgICAgID0gU3ltYm9sLmZvcihcIm5ld09iamVjdFwiKSxcbiAgICAgIERBVEEgICAgICAgICAgICAgICA9IFN5bWJvbC5mb3IoXCJkYXRhXCIpLFxuICAgICAgRElSVFlfRklFTERTICAgICAgID0gU3ltYm9sLmZvcihcImRpcnR5RmllbGRzXCIpLFxuICAgICAgQVNTT0NJQVRJT05TX0NBQ0hFID0gU3ltYm9sLmZvcihcImFzc29jaWF0aW9uc0NhY2hlXCIpLFxuICAgICAgREFUQVNUT1JFICAgICAgICAgID0gU3ltYm9sLmZvcihcImRhdGFzdG9yZVwiKSxcbiAgICAgIFZBTElEQVRPUlMgICAgICAgICA9IFN5bWJvbC5mb3IoXCJ2YWxpZGF0b3JzXCIpLFxuICAgICAgQVNTT0NJQVRJT05TICAgICAgID0gU3ltYm9sLmZvcihcImFzc29jaWF0aW9uc1wiKSxcbiAgICAgIFZBTFVFX1NUUklORyAgICAgICA9IFN5bWJvbC5mb3IoXCJ2YWx1ZVN0cmluZ1wiKTtcblxuXG4vKipcbiogQmFpbGl3aWNrLk1vZGVsXG4qXG4qIFRoZSBiYXNlIG1vZGVsIGNsYXNzLlxuKlxuKi9cbmV4cG9ydCBjbGFzcyBNb2RlbCB7XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgTWFwIG9mIGFzc29jaWF0aW9ucyBkZWZpbmVkIGZvciB0aGUgY2xhc3MuXG5cdCAqL1xuXHRzdGF0aWMgZ2V0IGFzc29jaWF0aW9ucygpIHtcblx0XHRpZiAoICF0aGlzW0FTU09DSUFUSU9OU10gKSB7XG5cdFx0XHR0aGlzWyBBU1NPQ0lBVElPTlMgXSA9IG5ldyBNYXAoKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXNbIEFTU09DSUFUSU9OUyBdO1xuXHR9XG5cblxuXHQvKipcblx0ICogR2V0IHRoZSBNYXAgb2YgdmFsaWRhdG9ycyBkZWZpbmVkIGZvciB0aGUgY2xhc3MuXG5cdCAqL1xuXHRzdGF0aWMgZ2V0IHZhbGlkYXRvcnMoKSB7XG5cdFx0aWYgKCAhdGhpc1tWQUxJREFUT1JTXSApIHtcblx0XHRcdHRoaXNbIFZBTElEQVRPUlMgXSA9IG5ldyBNYXAoKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXNbIFZBTElEQVRPUlMgXTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIEdldCB0aGUgcmVsYXRpdmUgVVJJIGZvciB0aGUgc2VydmljZSBlbmRwb2ludCBmb3IgdGhlIHJlY2VpdmluZyBjbGFzcy5cblx0ICovXG5cdHN0YXRpYyBnZXQgdXJpKCkge1xuXHRcdHJldHVybiBpbmZsZWN0aW9uLnRhYmxlaXplKCB0aGlzLm5hbWUgKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIFJlcXVlc3QgdGhlIGRhdGFzdG9yZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBtb2RlbC5cblx0ICpcblx0ICogQHRocm93cyB7RXJyb3J9ICBpZiB0aGUgZGF0YXN0b3JlIGhhc24ndCBiZWVuIHNldC5cblx0ICpcblx0ICovXG5cdHN0YXRpYyBnZXQgZGF0YXN0b3JlKCkge1xuXHRcdGlmICggIXRoaXNbREFUQVNUT1JFXSApIHtcblx0XHRcdHRocm93IEVycm9yKCBgTm8gZGF0YXN0b3JlIGhhcyBiZWVuIHNldCBmb3IgJHt0aGlzfWAgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpc1sgREFUQVNUT1JFIF07XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIGRhdGFzdG9yZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBtb2RlbC5cblx0ICovXG5cdHN0YXRpYyBzZXQgZGF0YXN0b3JlKCBkYXRhc3RvcmUgKSB7XG5cdFx0Ly8gY29uc29sZS5kZWJ1ZyggYERhdGFzdG9yZSBmb3IgJHt0aGlzfSBzZXQgdG8gJHtkYXRhc3RvcmV9YCApO1xuXHRcdHRoaXNbIERBVEFTVE9SRSBdID0gZGF0YXN0b3JlO1xuXHR9XG5cblxuXHQvKipcblx0ICogR2V0IGEgY2xvbmUgb2YgdGhlIFJlc3VsdFNldCBmb3IgdGhpcyBtb2RlbCBjbGFzcy5cblx0ICovXG5cdHN0YXRpYyBnZXQgcmVzdWx0c2V0KCkge1xuXHRcdHJldHVybiBuZXcgUmVzdWx0U2V0KCB0aGlzICk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBSZXF1ZXN0IGEgUmVzdWx0U2V0IHRoYXQgd2lsbCB1c2UgdGhlIHNwZWNpZmllZCB7cGFyYW1ldGVyc30gaW4gaXRzIGNyaXRlcmlhLlxuXHQgKi9cblx0c3RhdGljIHdoZXJlKCBwYXJhbWV0ZXJzICkge1xuXHRcdHJldHVybiB0aGlzLnJlc3VsdHNldC53aGVyZSggcGFyYW1ldGVycyApO1xuXHR9XG5cblxuXHQvKipcblx0ICogUmVxdWVzdCBhIFJlc3VsdFNldCB0aGF0IHdpbGwgdXNlIHRoZSBzcGVjaWZpZWQge2NvdW50fSBpbiBpdHMgbGltaXQuXG5cdCAqL1xuXHRzdGF0aWMgbGltaXQoIGNvdW50ICkge1xuXHRcdHJldHVybiB0aGlzLnJlc3VsdHNldC5saW1pdCggY291bnQgKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIFJlcXVlc3QgYSBSZXN1bHRTZXQgdGhhdCB3aWxsIHVzZSB0aGUgc3BlY2lmaWVkIHtsb2NhdGlvbn0gd2hlbiBmZXRjaGluZyBmcm9tXG5cdCAqIHRoZSBkYXRhc3RvcmUuXG5cdCAqL1xuXHRzdGF0aWMgZnJvbSggbG9jYXRpb24gKSB7XG5cdFx0cmV0dXJuIHRoaXMucmVzdWx0c2V0LmZyb20oIGxvY2F0aW9uICk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgb25lIG9yIG1vcmUgaW5zdGFuY2VzIG9mIHRoZSBtb2RlbCBmcm9tIHRoZSBzcGVjaWZpZWQge2RhdGF9LlxuXHQgKi9cblx0c3RhdGljIGZyb21EYXRhKCBkYXRhICkge1xuXHRcdGNvbnNvbGUuZGVidWcoIFwiQ29uc3RydWN0aW5nICVzIG9iamVjdHMgZnJvbSBkYXRhc3RvcmUgZGF0YSAlb1wiLCB0aGlzLm5hbWUsIGRhdGEgKTtcblx0XHRpZiAoIEFycmF5LmlzQXJyYXkoZGF0YSkgKSB7XG5cdFx0XHRyZXR1cm4gZGF0YS5tYXAoIHJlY29yZCA9PiBSZWZsZWN0LmNvbnN0cnVjdCh0aGlzLCBbcmVjb3JkLCBmYWxzZV0pICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBSZWZsZWN0LmNvbnN0cnVjdCggdGhpcywgW2RhdGEsIGZhbHNlXSApO1xuXHRcdH1cblx0fVxuXG5cblx0LyoqXG5cdCAqIEdldCBpbnN0YW5jZXMgb2YgdGhlIG1vZGVsLlxuXHQgKi9cblx0c3RhdGljIGdldCggaWRPckNyaXRlcmlhPW51bGwgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZGF0YXN0b3JlLmdldCggdGhpcywgaWRPckNyaXRlcmlhICkuXG5cdFx0XHR0aGVuKCBkYXRhID0+IHRoaXMuZnJvbURhdGEoZGF0YSkgKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbW9kZWwgYW5kIGF0dGVtcHQgdG8gc2F2ZSBpdCwgcmV0dXJuaW5nIGEgUHJvbWlzZVxuXHQgKiB0aGF0IHdpbGwgYmUgcmVzb2x2ZWQgd2l0aCB0aGUgbmV3IG1vZGVsIGluc3RhbmNlIGlmIHN1Y2Nlc3NmdWwuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBmaWVsZHMgIHRoZSBtb2RlbCBkYXRhXG5cdCAqXG5cdCAqL1xuXHRzdGF0aWMgY3JlYXRlKCBmaWVsZHMgKSB7XG5cdFx0dmFyIGluc3RhbmNlID0gUmVmbGVjdC5jb25zdHJ1Y3QoIHRoaXMsIFtmaWVsZHNdICk7XG5cdFx0cmV0dXJuIGluc3RhbmNlLmNyZWF0ZSgpO1xuXHR9XG5cblxuXHQvKipcblx0ICogQ29uc3RydWN0IGEgbmV3IG1vZGVsIG9iamVjdCBhcm91bmQgdGhlIGdpdmVuIHtkYXRhfSwgbWFya2luZyBpdCBhcyBuZXdcblx0ICogaWYge2lzTmV3fSBpcyB0cnVlLlxuXHQgKi9cblx0Y29uc3RydWN0b3IoIGRhdGE9e30sIGlzTmV3PXRydWUgKSB7XG5cdFx0dGhpc1sgTkVXX09CSkVDVCBdID0gaXNOZXc7XG5cdFx0dGhpc1sgREFUQSBdID0gZGF0YTtcblx0XHR0aGlzWyBESVJUWV9GSUVMRFMgXSA9IG5ldyBTZXQoKTtcblx0XHR0aGlzWyBBU1NPQ0lBVElPTlNfQ0FDSEUgXSA9IG5ldyBNYXAoKTtcblxuXHRcdHRoaXNbIERBVEFTVE9SRSBdID0gdGhpcy5jb25zdHJ1Y3Rvci5kYXRhc3RvcmU7XG5cblx0XHQvLyBjb25zb2xlLmRlYnVnKCBgQ3JlYXRlZCBhIG5ldyAlczogJW9gLCB0aGlzLmNvbnN0cnVjdG9yLm5hbWUsIGRhdGEgKTtcblx0XHR0aGlzLmRlZmluZUF0dHJpYnV0ZXMoIGRhdGEgKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIEZldGNoIHRoZSBVUkkgb2YgdGhlIG9iamVjdC5cblx0ICovXG5cdGdldCB1cmkoKSB7XG5cdFx0cmV0dXJuIGAke3RoaXMuY29uc3RydWN0b3IudXJpfS8ke3RoaXMuaWR9YDtcblx0fVxuXG5cblx0LyoqXG5cdCAqIEZldGNoIHRoZSBuYW1lIG9mIHRoZSBtb2RlbCBjbGFzcyBvZiB0aGUgb2JqZWN0LlxuXHQgKi9cblx0Z2V0IG1vZGVsVHlwZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuXHR9XG5cblxuXHQvKipcblx0ICogU3RvcmUgdGhlIG1vZGVsIG9iamVjdCBpbiB0aGUgb2JqZWN0J3Mgc3RvcmUsIGNhbGxpbmcgI3N0b3JlKCkgaWYgdGhlXG5cdCAqIG9iamVjdCBpcyBuZXcsIG9yICNtZXJnZSgpIHdpdGggYW55IG1vZGlmaWVkIGZpZWxkcyBpZiBpdCdzIGFuIGV4aXN0aW5nXG5cdCAqIG9iamVjdC5cblx0ICovXG5cdHNhdmUoKSB7XG5cdFx0aWYgKCB0aGlzLmlzTmV3KCkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKCAhdGhpcy5pc0RpcnR5KCkgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggdGhpcyApO1xuICAgICAgICAgICAgfVxuXHRcdFx0cmV0dXJuIHRoaXMudXBkYXRlKCk7XG5cdFx0fVxuXHR9XG5cblxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgdGhlIG1vZGVsIG9iamVjdCBpbiB0aGUgb2JqZWN0J3Mgc3RvcmUgYW5kIHJldHVybiBhIFByb21pc2UgdGhhdFxuICAgICAqIHdpbGwgcmVzb2x2ZSB0byB0aGUgcmVzdWx0LlxuXHQgKi9cblx0Y3JlYXRlKCkge1xuXHRcdHJldHVybiB0aGlzLnZhbGlkYXRlKCkuXG5cdFx0XHR0aGVuKCAoKSA9PiB7XG5cdFx0XHRcdHJldHVybiB0aGlzWyBEQVRBU1RPUkUgXS5zdG9yZSggdGhpcy5jb25zdHJ1Y3RvciwgdGhpc1sgREFUQSBdICk7XG5cdFx0XHR9KS50aGVuKCByZXN1bHQgPT4ge1xuXHRcdFx0XHRpZiAoIHR5cGVvZiByZXN1bHQgPT09ICdvYmplY3QnICkge1xuXHRcdFx0XHRcdE9iamVjdC5hc3NpZ24oIHRoaXNbIERBVEEgXSwgcmVzdWx0ICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpc1sgREFUQSBdWydpZCddID0gcmVzdWx0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGRvdC1ub3RhdGlvblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpc1sgTkVXX09CSkVDVCBdID0gZmFsc2U7XG5cdFx0XHRcdHRoaXNbIERJUlRZX0ZJRUxEUyBdLmNsZWFyKCk7XG5cdFx0XHRcdHRoaXMuZGVmaW5lQXR0cmlidXRlcyggdGhpc1tEQVRBXSApO1xuXG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgYW55IGRpcnR5IGZpZWxkcyBpbiB0aGUgbW9kZWwgb2JqZWN0IGluIHRoZSBvYmplY3QncyBzdG9yZSB3aXRoIHZhbHVlcyBmcm9tIHRoZSBvYmplY3RcbiAgICAgKiBhbmQgcmV0dXJuIGEgUHJvbWlzZSB0aGF0IHdpbGwgcmVzb2x2ZSB0byB0aGUgcmVzdWx0LlxuXHQgKi9cblx0dXBkYXRlKCkge1xuXHRcdHZhciBkaXJ0eURhdGEgPSB7fTtcblx0XHRmb3IgKCB2YXIgZmllbGQgb2YgdGhpc1sgRElSVFlfRklFTERTIF0gKSB7XG5cdFx0XHRkaXJ0eURhdGFbIGZpZWxkIF0gPSB0aGlzWyBEQVRBIF1bIGZpZWxkIF07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMudmFsaWRhdGUoKS5cblx0XHRcdHRoZW4oICgpID0+IHtcblx0XHRcdFx0cmV0dXJuIHRoaXNbIERBVEFTVE9SRSBdLnVwZGF0ZSggdGhpcy5jb25zdHJ1Y3RvciwgdGhpcy5pZCwgZGlydHlEYXRhICk7XG5cdFx0XHR9KS50aGVuKCBtZXJnZWREYXRhID0+IHtcblx0XHRcdFx0T2JqZWN0LmFzc2lnbiggdGhpc1sgREFUQSBdLCBtZXJnZWREYXRhICk7XG5cdFx0XHRcdHRoaXNbIE5FV19PQkpFQ1QgXSA9IGZhbHNlO1xuXHRcdFx0XHR0aGlzWyBESVJUWV9GSUVMRFMgXS5jbGVhcigpO1xuXHRcdFx0XHR0aGlzLmRlZmluZUF0dHJpYnV0ZXMoIHRoaXNbIERBVEEgXSApO1xuXG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBEZWxldGUgdGhlIG9iamVjdCBmcm9tIHRoZSBvYmplY3QncyBzdG9yZSBhbmQgcmV0dXJuIGEgUHJvbWlzZSB0aGF0IHdpbGwgcmVzb2x2ZSB0byB0aGVcbiAgICAgKiByZXN1bHQuXG5cdCAqL1xuXHRkZWxldGUoKSB7XG5cdFx0aWYgKCB0aGlzLmlkICkge1xuXHRcdFx0cmV0dXJuIHRoaXNbIERBVEFTVE9SRSBdLnJlbW92ZSggdGhpcy5jb25zdHJ1Y3RvciwgdGhpcy5pZCApLlxuXHRcdFx0XHR0aGVuKCAoKSA9PiB0aGlzICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoIHRoaXNbIERBVEEgXSApO1xuXHRcdH1cblx0fVxuXG5cblx0Lypcblx0ICogQXR0cmlidXRlIGFjY2Vzc29yIEFQSVxuXHQgKi9cblxuXHQvKipcblx0ICogRGF0YSBwcm9wZXJ0eSByZWFkZXJcblx0ICovXG5cdGdldFZhbHVlKCBuYW1lICkge1xuXHRcdGlmICggdGhpcy5jb25zdHJ1Y3Rvci5hc3NvY2lhdGlvbnMuaGFzKG5hbWUpICkge1xuXHRcdFx0bGV0IGZuID0gdGhpcy5jb25zdHJ1Y3Rvci5hc3NvY2lhdGlvbnMuZ2V0KCBuYW1lICk7XG4gICAgICAgICAgICByZXR1cm4gZm4oIHRoaXNbREFUQV1bbmFtZV0gKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHRoaXNbIERBVEEgXVsgbmFtZSBdO1xuXHRcdH1cblx0fVxuXG5cblx0LyoqXG5cdCAqIERhdGEgcHJvcGVydHkgd3JpdGVyXG5cdCAqL1xuXHRzZXRWYWx1ZSggbmFtZSwgdmFsdWUgKSB7XG5cdFx0Ly8gY29uc29sZS5kZWJ1ZyhgU2V0dGluZyAke25hbWV9IHRvICR7dmFsdWV9YCk7XG5cdFx0aWYgKCB0aGlzWyBEQVRBIF1bbmFtZV0gIT09IHZhbHVlICkge1xuICAgICAgICAgICAgdGhpc1sgRElSVFlfRklFTERTIF0uYWRkKCBuYW1lICk7XG4gICAgICAgIH1cblx0XHR0aGlzWyBEQVRBIF1bIG5hbWUgXSA9IHZhbHVlO1xuXHR9XG5cblxuXHQvKipcblx0ICogRGVmaW5lIGF0dHJpYnV0ZSBhY2Nlc3NvcnMgZm9yIHRoZSBzcGVjaWZpZWQge2F0dHJzfS5cblx0ICovXG5cdGRlZmluZUF0dHJpYnV0ZXMoIGF0dHJzICkge1xuXHRcdGxldCBzZWxmID0gdGhpcztcblxuXHRcdGZvciAoIGxldCBuYW1lIGluIGF0dHJzICkge1xuXHRcdFx0aWYgKCAhT2JqZWN0Lmhhc093blByb3BlcnR5KHNlbGYsIG5hbWUpICkge1xuICAgICAgICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWxvb3AtZnVuYyAqL1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIHNlbGYsIG5hbWUsIHtcblx0XHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRnZXQ6ICgpID0+IHsgcmV0dXJuIHNlbGYuZ2V0VmFsdWUobmFtZSk7IH0sXG5cdFx0XHRcdFx0c2V0OiBuZXd2YWwgPT4geyBzZWxmLnNldFZhbHVlKG5hbWUsIG5ld3ZhbCk7IH1cblx0XHRcdFx0fSk7XG4gICAgICAgICAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1sb29wLWZ1bmMgKi9cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnNvbGUuZGVidWcoIGBBbHJlYWR5IGhhcyBhICR7bmFtZX0gcHJvcGVydHkuYCApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHR9XG5cblxuXHQvKipcblx0ICogUmV0dXJucyB7dHJ1ZX0gaWYgdGhlIG9iamVjdCBoYXMgZGlydHkgKHVuc2F2ZWQpIGF0dHJpYnV0ZXMuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdCAqL1xuXHRpc0RpcnR5KCkge1xuXHRcdHJldHVybiAoIHRoaXMuaXNOZXcoKSB8fCB0aGlzWyBESVJUWV9GSUVMRFMgXS5zaXplICE9PSAwICk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0IHdhcyBjcmVhdGVkIGFzIG9wcG9zZWQgdG8gZmV0Y2hlZCBmcm9tIGEgZGF0YXN0b3JlLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHQgKi9cblx0aXNOZXcoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIE5FV19PQkpFQ1QgXTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIE1hcmsgdGhlIG9iamVjdCBhcyBjbGVhbiAoaS5lLiwgbm90IHJlcXVpcmluZyBzYXZpbmcpLlxuXHQgKi9cblx0bWFya0NsZWFuKCkge1xuXHRcdHRoaXNbIE5FV19PQkpFQ1QgXSA9IGZhbHNlO1xuXHRcdHRoaXNbIERJUlRZX0ZJRUxEUyBdLmNsZWFyKCk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBWYWxpZGF0ZSB0aGUgbW9kZWwgb2JqZWN0IGJ5IGNhbGxpbmcgaXRzIHZhbGlkYXRpb24gbWV0aG9kcy5cblx0ICpcblx0ICogQHJldHVybnMge1Byb21pc2V9ICByZXNvbHZlcyBpZiB0aGUgb2JqZWN0IGlzIHZhbGlkLCByZWplY3RzIHdpdGggYW4gQXJyYXkgb2Zcblx0ICogICB2YWxpZGF0aW9uIGZhaWx1cmVzIGlmIG5vdC5cblx0ICovXG5cdHZhbGlkYXRlKCkge1xuXHRcdHRoaXMuZXJyb3JzID0gbmV3IFZhbGlkYXRpb25FcnJvcnMoKTtcblx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXHRcdGZvciAoIGxldCBbZmllbGQsIHZhbGlkYXRpb25NZXRob2RdIG9mIHRoaXMudmFsaWRhdG9ycyApIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoIGBBZGRpbmcgdmFsaWRhdGlvbiBwcm9taXNlIGZvciAke2ZpZWxkfWAgKTtcblx0XHRcdGxldCBwciA9IFByb21pc2UudHJ5KCAoKSA9PiB2YWxpZGF0aW9uTWV0aG9kLmNhbGwodGhpcykgKTtcblx0XHRcdHByb21pc2VzLnB1c2goIHByICk7XG5cdFx0fVxuXG5cdFx0Ly8gV2FpdCBmb3IgYWxsIHZhbGlkYXRpb24gcHJvbWlzZXMgdG8gc2V0dGxlLCB0aGVuIGFkZCBlcnJvcnNcblx0XHQvLyBmb3IgdGhvc2Ugd2hpY2ggd2VyZSByZWplY3RlZC5cblx0XHRyZXR1cm4gUHJvbWlzZS5cblx0XHRcdGFsbCggcHJvbWlzZXMubWFwKHByID0+IHByLnJlZmxlY3QoKSkgKS5cblx0XHRcdGVhY2goIHByb21pc2UgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmRlYnVnKCBcIlNldHRsZWQgcHJvbWlzZSBpbnNwZWN0aW9uOiBcIiwgcHJvbWlzZSApO1xuXHRcdFx0fSkuXG5cdFx0XHRmaWx0ZXIoIHByb21pc2UgPT4gcHJvbWlzZS5pc1JlamVjdGVkKCkgKS5cblx0XHRcdGVhY2goIHByb21pc2UgPT4ge1xuXHRcdFx0XHR2YXIgW2ZpZWxkLCByZWFzb25dID0gcHJvbWlzZS5yZWFzb24oKTtcblx0XHRcdFx0dGhpcy5lcnJvcnMuYWRkKCBmaWVsZCwgcmVhc29uICk7XG5cdFx0XHRcdGNvbnNvbGUuZGVidWcoIGBWYWxpZGF0aW9uIGZhaWxlZCBmb3IgJHtmaWVsZH06ICR7cmVhc29ufWAgKTtcblx0XHRcdH0pLlxuXHRcdFx0dGhlbiggKCkgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmRlYnVnKCBcIlJlc29sdmVkIHZhbGlkYXRpb24gcHJvbWlzZSwgZXJyb3JzIGlzOiBcIiwgdGhpcy5lcnJvcnMgKTtcblx0XHRcdFx0aWYgKCB0aGlzLmVycm9ycy5pc0VtcHR5KCkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSggdHJ1ZSApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGxldCBlcnIgPSBuZXcgVmFsaWRhdGlvbkVycm9yKCBgJHt0aGlzLmVycm9ycy5sZW5ndGh9IHZhbGlkYXRpb24gZmFpbHVyZXMuYCApO1xuXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCggZXJyICk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHR9XG5cblxuXG5cblx0LyoqXG5cdCAqIHRvU3RyaW5nKCkgQVBJIC0tIHJldHVybiBhIGh1bWFuLXJlYWRhYmxlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBvYmplY3QuXG5cdCAqL1xuXHRnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG5cdFx0bGV0IGRpcnR5TWFyayA9IHRoaXMuaXNEaXJ0eSgpID8gJyB+JyA6ICcnO1xuICAgICAgICBsZXQgdmFsdWVTdHJpbmcgPSB0aGlzWyBWQUxVRV9TVFJJTkcgXSgpO1xuXHRcdHJldHVybiBgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9IHZhbHVlcz17JHt2YWx1ZVN0cmluZ319JHtkaXJ0eU1hcmt9YDtcblx0fVxuXG5cblx0LyoqXG5cdCAqIFJldHVybiB0aGUgb2JqZWN0J3MgZGF0YSBhcyBhIFN0cmluZyBjb250YWluaW5nIGZpZWxkcyBhbmQgdmFsdWVzIHN1aXRhYmxlXG5cdCAqIGZvciBkZWJ1Z2dpbmcuXG5cdCAqL1xuXHRbIFZBTFVFX1NUUklORyBdKCkge1xuXHRcdHZhciB2YWx1ZXMgPSBbXTtcblx0XHRmb3IgKCBsZXQgZmllbGQgaW4gdGhpc1sgREFUQSBdICkge1xuXHRcdFx0bGV0IHZhbCA9IHRoaXNbIERBVEEgXVsgZmllbGQgXTtcblx0XHRcdHZhbHVlcy5wdXNoKCBgJHtmaWVsZH06ICR7dmFsfWAgKTtcblx0XHR9XG5cdFx0cmV0dXJuIHZhbHVlcy5qb2luKCAnLCAnICk7XG5cdH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
