define(['exports', 'babel-runtime/core-js/symbol/to-string-tag', 'babel-runtime/core-js/object/define-property', 'babel-runtime/core-js/object/assign', 'babel-runtime/core-js/set', 'babel-runtime/core-js/reflect/construct', 'babel-runtime/core-js/map', 'babel-runtime/core-js/symbol/for', 'bluebird', 'inflection', './result-set', './errors'], function (exports, _toStringTag, _defineProperty, _assign, _set, _construct, _map, _for, _bluebird, _inflection, _resultSet, _errors) {
	/* -*- javascript -*- */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Model = undefined;

	var _toStringTag2 = _interopRequireDefault(_toStringTag);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	var _assign2 = _interopRequireDefault(_assign);

	var _set2 = _interopRequireDefault(_set);

	var _construct2 = _interopRequireDefault(_construct);

	var _map2 = _interopRequireDefault(_map);

	var _for2 = _interopRequireDefault(_for);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	var _inflection2 = _interopRequireDefault(_inflection);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

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
});
//# sourceMappingURL=data:application/json;base64,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akIsRUFBc0IsU0FBekIsR0FBb0MsV0FBcEMsRUFBZ0QsQ0FBaEQsR0FBbUQsU0FBbkQsRUFBNkQsQ0FBcEUsQ0FIMEI7R0FBM0I7Ozs7OztBQTdXa0IsR0F3WGhCLFlBQUYsSUFBbUI7QUFDbEIsT0FBSSxTQUFTLEVBQVQsQ0FEYztBQUVsQixRQUFNLElBQUksS0FBSixJQUFhLEtBQU0sSUFBTixDQUFuQixFQUFrQztBQUNqQyxRQUFJLE1BQU0sS0FBTSxJQUFOLEVBQWMsS0FBZCxDQUFOLENBRDZCO0FBRWpDLFdBQU8sSUFBUCxDQUFhLENBQUMsR0FBRSxLQUFILEVBQVMsRUFBVCxHQUFhLEdBQWIsRUFBaUIsQ0FBOUIsRUFGaUM7SUFBbEM7QUFJQSxVQUFPLE9BQU8sSUFBUCxDQUFhLElBQWIsQ0FBUCxDQU5rQjtHQUFuQjtFQXhYTSIsImZpbGUiOiJtb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0qLSBqYXZhc2NyaXB0IC0qLSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBpbmZsZWN0aW9uIGZyb20gJ2luZmxlY3Rpb24nO1xuXG5pbXBvcnQge1Jlc3VsdFNldH0gZnJvbSAnLi9yZXN1bHQtc2V0JztcbmltcG9ydCB7VmFsaWRhdGlvbkVycm9yc30gZnJvbSAnLi9lcnJvcnMnO1xuXG4vKlxuICogVXNlIHN5bWJvbHMgZm9yIG1vZGVsIG9iamVjdCBwcm9wZXJ0aWVzIHNvIHRoZXkgZG9uJ3QgY29sbGlkZSB3aXRoXG4gKiBkYXRhIHByb3BlcnRpZXMuXG4gKi9cbmNvbnN0IE5FV19PQkpFQ1QgICAgICAgICA9IFN5bWJvbC5mb3IoXCJuZXdPYmplY3RcIiksXG4gICAgICBEQVRBICAgICAgICAgICAgICAgPSBTeW1ib2wuZm9yKFwiZGF0YVwiKSxcbiAgICAgIERJUlRZX0ZJRUxEUyAgICAgICA9IFN5bWJvbC5mb3IoXCJkaXJ0eUZpZWxkc1wiKSxcbiAgICAgIEFTU09DSUFUSU9OU19DQUNIRSA9IFN5bWJvbC5mb3IoXCJhc3NvY2lhdGlvbnNDYWNoZVwiKSxcbiAgICAgIERBVEFTVE9SRSAgICAgICAgICA9IFN5bWJvbC5mb3IoXCJkYXRhc3RvcmVcIiksXG4gICAgICBWQUxJREFUT1JTICAgICAgICAgPSBTeW1ib2wuZm9yKFwidmFsaWRhdG9yc1wiKSxcbiAgICAgIEFTU09DSUFUSU9OUyAgICAgICA9IFN5bWJvbC5mb3IoXCJhc3NvY2lhdGlvbnNcIiksXG4gICAgICBWQUxVRV9TVFJJTkcgICAgICAgPSBTeW1ib2wuZm9yKFwidmFsdWVTdHJpbmdcIik7XG5cblxuLyoqXG4qIEJhaWxpd2ljay5Nb2RlbFxuKlxuKiBUaGUgYmFzZSBtb2RlbCBjbGFzcy5cbipcbiovXG5leHBvcnQgY2xhc3MgTW9kZWwge1xuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIE1hcCBvZiBhc3NvY2lhdGlvbnMgZGVmaW5lZCBmb3IgdGhlIGNsYXNzLlxuXHQgKi9cblx0c3RhdGljIGdldCBhc3NvY2lhdGlvbnMoKSB7XG5cdFx0aWYgKCAhdGhpc1tBU1NPQ0lBVElPTlNdICkge1xuXHRcdFx0dGhpc1sgQVNTT0NJQVRJT05TIF0gPSBuZXcgTWFwKCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzWyBBU1NPQ0lBVElPTlMgXTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIEdldCB0aGUgTWFwIG9mIHZhbGlkYXRvcnMgZGVmaW5lZCBmb3IgdGhlIGNsYXNzLlxuXHQgKi9cblx0c3RhdGljIGdldCB2YWxpZGF0b3JzKCkge1xuXHRcdGlmICggIXRoaXNbVkFMSURBVE9SU10gKSB7XG5cdFx0XHR0aGlzWyBWQUxJREFUT1JTIF0gPSBuZXcgTWFwKCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzWyBWQUxJREFUT1JTIF07XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIHJlbGF0aXZlIFVSSSBmb3IgdGhlIHNlcnZpY2UgZW5kcG9pbnQgZm9yIHRoZSByZWNlaXZpbmcgY2xhc3MuXG5cdCAqL1xuXHRzdGF0aWMgZ2V0IHVyaSgpIHtcblx0XHRyZXR1cm4gaW5mbGVjdGlvbi50YWJsZWl6ZSggdGhpcy5uYW1lICk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBSZXF1ZXN0IHRoZSBkYXRhc3RvcmUgYXNzb2NpYXRlZCB3aXRoIHRoaXMgbW9kZWwuXG5cdCAqXG5cdCAqIEB0aHJvd3Mge0Vycm9yfSAgaWYgdGhlIGRhdGFzdG9yZSBoYXNuJ3QgYmVlbiBzZXQuXG5cdCAqXG5cdCAqL1xuXHRzdGF0aWMgZ2V0IGRhdGFzdG9yZSgpIHtcblx0XHRpZiAoICF0aGlzW0RBVEFTVE9SRV0gKSB7XG5cdFx0XHR0aHJvdyBFcnJvciggYE5vIGRhdGFzdG9yZSBoYXMgYmVlbiBzZXQgZm9yICR7dGhpc31gICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXNbIERBVEFTVE9SRSBdO1xuXHR9XG5cblxuXHQvKipcblx0ICogU2V0IHRoZSBkYXRhc3RvcmUgYXNzb2NpYXRlZCB3aXRoIHRoaXMgbW9kZWwuXG5cdCAqL1xuXHRzdGF0aWMgc2V0IGRhdGFzdG9yZSggZGF0YXN0b3JlICkge1xuXHRcdC8vIGNvbnNvbGUuZGVidWcoIGBEYXRhc3RvcmUgZm9yICR7dGhpc30gc2V0IHRvICR7ZGF0YXN0b3JlfWAgKTtcblx0XHR0aGlzWyBEQVRBU1RPUkUgXSA9IGRhdGFzdG9yZTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIEdldCBhIGNsb25lIG9mIHRoZSBSZXN1bHRTZXQgZm9yIHRoaXMgbW9kZWwgY2xhc3MuXG5cdCAqL1xuXHRzdGF0aWMgZ2V0IHJlc3VsdHNldCgpIHtcblx0XHRyZXR1cm4gbmV3IFJlc3VsdFNldCggdGhpcyApO1xuXHR9XG5cblxuXHQvKipcblx0ICogUmVxdWVzdCBhIFJlc3VsdFNldCB0aGF0IHdpbGwgdXNlIHRoZSBzcGVjaWZpZWQge3BhcmFtZXRlcnN9IGluIGl0cyBjcml0ZXJpYS5cblx0ICovXG5cdHN0YXRpYyB3aGVyZSggcGFyYW1ldGVycyApIHtcblx0XHRyZXR1cm4gdGhpcy5yZXN1bHRzZXQud2hlcmUoIHBhcmFtZXRlcnMgKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIFJlcXVlc3QgYSBSZXN1bHRTZXQgdGhhdCB3aWxsIHVzZSB0aGUgc3BlY2lmaWVkIHtjb3VudH0gaW4gaXRzIGxpbWl0LlxuXHQgKi9cblx0c3RhdGljIGxpbWl0KCBjb3VudCApIHtcblx0XHRyZXR1cm4gdGhpcy5yZXN1bHRzZXQubGltaXQoIGNvdW50ICk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBSZXF1ZXN0IGEgUmVzdWx0U2V0IHRoYXQgd2lsbCB1c2UgdGhlIHNwZWNpZmllZCB7bG9jYXRpb259IHdoZW4gZmV0Y2hpbmcgZnJvbVxuXHQgKiB0aGUgZGF0YXN0b3JlLlxuXHQgKi9cblx0c3RhdGljIGZyb20oIGxvY2F0aW9uICkge1xuXHRcdHJldHVybiB0aGlzLnJlc3VsdHNldC5mcm9tKCBsb2NhdGlvbiApO1xuXHR9XG5cblxuXHQvKipcblx0ICogQ3JlYXRlIG9uZSBvciBtb3JlIGluc3RhbmNlcyBvZiB0aGUgbW9kZWwgZnJvbSB0aGUgc3BlY2lmaWVkIHtkYXRhfS5cblx0ICovXG5cdHN0YXRpYyBmcm9tRGF0YSggZGF0YSApIHtcblx0XHRjb25zb2xlLmRlYnVnKCBcIkNvbnN0cnVjdGluZyAlcyBvYmplY3RzIGZyb20gZGF0YXN0b3JlIGRhdGEgJW9cIiwgdGhpcy5uYW1lLCBkYXRhICk7XG5cdFx0aWYgKCBBcnJheS5pc0FycmF5KGRhdGEpICkge1xuXHRcdFx0cmV0dXJuIGRhdGEubWFwKCByZWNvcmQgPT4gUmVmbGVjdC5jb25zdHJ1Y3QodGhpcywgW3JlY29yZCwgZmFsc2VdKSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5jb25zdHJ1Y3QoIHRoaXMsIFtkYXRhLCBmYWxzZV0gKTtcblx0XHR9XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBHZXQgaW5zdGFuY2VzIG9mIHRoZSBtb2RlbC5cblx0ICovXG5cdHN0YXRpYyBnZXQoIGlkT3JDcml0ZXJpYT1udWxsICkge1xuXHRcdHJldHVybiB0aGlzLmRhdGFzdG9yZS5nZXQoIHRoaXMsIGlkT3JDcml0ZXJpYSApLlxuXHRcdFx0dGhlbiggZGF0YSA9PiB0aGlzLmZyb21EYXRhKGRhdGEpICk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIG1vZGVsIGFuZCBhdHRlbXB0IHRvIHNhdmUgaXQsIHJldHVybmluZyBhIFByb21pc2Vcblx0ICogdGhhdCB3aWxsIGJlIHJlc29sdmVkIHdpdGggdGhlIG5ldyBtb2RlbCBpbnN0YW5jZSBpZiBzdWNjZXNzZnVsLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gZmllbGRzICB0aGUgbW9kZWwgZGF0YVxuXHQgKlxuXHQgKi9cblx0c3RhdGljIGNyZWF0ZSggZmllbGRzICkge1xuXHRcdHZhciBpbnN0YW5jZSA9IFJlZmxlY3QuY29uc3RydWN0KCB0aGlzLCBbZmllbGRzXSApO1xuXHRcdHJldHVybiBpbnN0YW5jZS5jcmVhdGUoKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdCBhIG5ldyBtb2RlbCBvYmplY3QgYXJvdW5kIHRoZSBnaXZlbiB7ZGF0YX0sIG1hcmtpbmcgaXQgYXMgbmV3XG5cdCAqIGlmIHtpc05ld30gaXMgdHJ1ZS5cblx0ICovXG5cdGNvbnN0cnVjdG9yKCBkYXRhPXt9LCBpc05ldz10cnVlICkge1xuXHRcdHRoaXNbIE5FV19PQkpFQ1QgXSA9IGlzTmV3O1xuXHRcdHRoaXNbIERBVEEgXSA9IGRhdGE7XG5cdFx0dGhpc1sgRElSVFlfRklFTERTIF0gPSBuZXcgU2V0KCk7XG5cdFx0dGhpc1sgQVNTT0NJQVRJT05TX0NBQ0hFIF0gPSBuZXcgTWFwKCk7XG5cblx0XHR0aGlzWyBEQVRBU1RPUkUgXSA9IHRoaXMuY29uc3RydWN0b3IuZGF0YXN0b3JlO1xuXG5cdFx0Ly8gY29uc29sZS5kZWJ1ZyggYENyZWF0ZWQgYSBuZXcgJXM6ICVvYCwgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lLCBkYXRhICk7XG5cdFx0dGhpcy5kZWZpbmVBdHRyaWJ1dGVzKCBkYXRhICk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBGZXRjaCB0aGUgVVJJIG9mIHRoZSBvYmplY3QuXG5cdCAqL1xuXHRnZXQgdXJpKCkge1xuXHRcdHJldHVybiBgJHt0aGlzLmNvbnN0cnVjdG9yLnVyaX0vJHt0aGlzLmlkfWA7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBGZXRjaCB0aGUgbmFtZSBvZiB0aGUgbW9kZWwgY2xhc3Mgb2YgdGhlIG9iamVjdC5cblx0ICovXG5cdGdldCBtb2RlbFR5cGUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IubmFtZTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIFN0b3JlIHRoZSBtb2RlbCBvYmplY3QgaW4gdGhlIG9iamVjdCdzIHN0b3JlLCBjYWxsaW5nICNzdG9yZSgpIGlmIHRoZVxuXHQgKiBvYmplY3QgaXMgbmV3LCBvciAjbWVyZ2UoKSB3aXRoIGFueSBtb2RpZmllZCBmaWVsZHMgaWYgaXQncyBhbiBleGlzdGluZ1xuXHQgKiBvYmplY3QuXG5cdCAqL1xuXHRzYXZlKCkge1xuXHRcdGlmICggdGhpcy5pc05ldygpICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICggIXRoaXMuaXNEaXJ0eSgpICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHRoaXMgKTtcbiAgICAgICAgICAgIH1cblx0XHRcdHJldHVybiB0aGlzLnVwZGF0ZSgpO1xuXHRcdH1cblx0fVxuXG5cblxuXHQvKipcblx0ICogQ3JlYXRlIHRoZSBtb2RlbCBvYmplY3QgaW4gdGhlIG9iamVjdCdzIHN0b3JlIGFuZCByZXR1cm4gYSBQcm9taXNlIHRoYXRcbiAgICAgKiB3aWxsIHJlc29sdmUgdG8gdGhlIHJlc3VsdC5cblx0ICovXG5cdGNyZWF0ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy52YWxpZGF0ZSgpLlxuXHRcdFx0dGhlbiggKCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gdGhpc1sgREFUQVNUT1JFIF0uc3RvcmUoIHRoaXMuY29uc3RydWN0b3IsIHRoaXNbIERBVEEgXSApO1xuXHRcdFx0fSkudGhlbiggcmVzdWx0ID0+IHtcblx0XHRcdFx0aWYgKCB0eXBlb2YgcmVzdWx0ID09PSAnb2JqZWN0JyApIHtcblx0XHRcdFx0XHRPYmplY3QuYXNzaWduKCB0aGlzWyBEQVRBIF0sIHJlc3VsdCApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXNbIERBVEEgXVsnaWQnXSA9IHJlc3VsdDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBkb3Qtbm90YXRpb25cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXNbIE5FV19PQkpFQ1QgXSA9IGZhbHNlO1xuXHRcdFx0XHR0aGlzWyBESVJUWV9GSUVMRFMgXS5jbGVhcigpO1xuXHRcdFx0XHR0aGlzLmRlZmluZUF0dHJpYnV0ZXMoIHRoaXNbREFUQV0gKTtcblxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0pO1xuXHR9XG5cblxuXHQvKipcblx0ICogVXBkYXRlIGFueSBkaXJ0eSBmaWVsZHMgaW4gdGhlIG1vZGVsIG9iamVjdCBpbiB0aGUgb2JqZWN0J3Mgc3RvcmUgd2l0aCB2YWx1ZXMgZnJvbSB0aGUgb2JqZWN0XG4gICAgICogYW5kIHJldHVybiBhIFByb21pc2UgdGhhdCB3aWxsIHJlc29sdmUgdG8gdGhlIHJlc3VsdC5cblx0ICovXG5cdHVwZGF0ZSgpIHtcblx0XHR2YXIgZGlydHlEYXRhID0ge307XG5cdFx0Zm9yICggdmFyIGZpZWxkIG9mIHRoaXNbIERJUlRZX0ZJRUxEUyBdICkge1xuXHRcdFx0ZGlydHlEYXRhWyBmaWVsZCBdID0gdGhpc1sgREFUQSBdWyBmaWVsZCBdO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnZhbGlkYXRlKCkuXG5cdFx0XHR0aGVuKCAoKSA9PiB7XG5cdFx0XHRcdHJldHVybiB0aGlzWyBEQVRBU1RPUkUgXS51cGRhdGUoIHRoaXMuY29uc3RydWN0b3IsIHRoaXMuaWQsIGRpcnR5RGF0YSApO1xuXHRcdFx0fSkudGhlbiggbWVyZ2VkRGF0YSA9PiB7XG5cdFx0XHRcdE9iamVjdC5hc3NpZ24oIHRoaXNbIERBVEEgXSwgbWVyZ2VkRGF0YSApO1xuXHRcdFx0XHR0aGlzWyBORVdfT0JKRUNUIF0gPSBmYWxzZTtcblx0XHRcdFx0dGhpc1sgRElSVFlfRklFTERTIF0uY2xlYXIoKTtcblx0XHRcdFx0dGhpcy5kZWZpbmVBdHRyaWJ1dGVzKCB0aGlzWyBEQVRBIF0gKTtcblxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0pO1xuXHR9XG5cblxuXHQvKipcblx0ICogRGVsZXRlIHRoZSBvYmplY3QgZnJvbSB0aGUgb2JqZWN0J3Mgc3RvcmUgYW5kIHJldHVybiBhIFByb21pc2UgdGhhdCB3aWxsIHJlc29sdmUgdG8gdGhlXG4gICAgICogcmVzdWx0LlxuXHQgKi9cblx0ZGVsZXRlKCkge1xuXHRcdGlmICggdGhpcy5pZCApIHtcblx0XHRcdHJldHVybiB0aGlzWyBEQVRBU1RPUkUgXS5yZW1vdmUoIHRoaXMuY29uc3RydWN0b3IsIHRoaXMuaWQgKS5cblx0XHRcdFx0dGhlbiggKCkgPT4gdGhpcyApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCB0aGlzWyBEQVRBIF0gKTtcblx0XHR9XG5cdH1cblxuXG5cdC8qXG5cdCAqIEF0dHJpYnV0ZSBhY2Nlc3NvciBBUElcblx0ICovXG5cblx0LyoqXG5cdCAqIERhdGEgcHJvcGVydHkgcmVhZGVyXG5cdCAqL1xuXHRnZXRWYWx1ZSggbmFtZSApIHtcblx0XHRpZiAoIHRoaXMuY29uc3RydWN0b3IuYXNzb2NpYXRpb25zLmhhcyhuYW1lKSApIHtcblx0XHRcdGxldCBmbiA9IHRoaXMuY29uc3RydWN0b3IuYXNzb2NpYXRpb25zLmdldCggbmFtZSApO1xuICAgICAgICAgICAgcmV0dXJuIGZuKCB0aGlzW0RBVEFdW25hbWVdICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB0aGlzWyBEQVRBIF1bIG5hbWUgXTtcblx0XHR9XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBEYXRhIHByb3BlcnR5IHdyaXRlclxuXHQgKi9cblx0c2V0VmFsdWUoIG5hbWUsIHZhbHVlICkge1xuXHRcdC8vIGNvbnNvbGUuZGVidWcoYFNldHRpbmcgJHtuYW1lfSB0byAke3ZhbHVlfWApO1xuXHRcdGlmICggdGhpc1sgREFUQSBdW25hbWVdICE9PSB2YWx1ZSApIHtcbiAgICAgICAgICAgIHRoaXNbIERJUlRZX0ZJRUxEUyBdLmFkZCggbmFtZSApO1xuICAgICAgICB9XG5cdFx0dGhpc1sgREFUQSBdWyBuYW1lIF0gPSB2YWx1ZTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIERlZmluZSBhdHRyaWJ1dGUgYWNjZXNzb3JzIGZvciB0aGUgc3BlY2lmaWVkIHthdHRyc30uXG5cdCAqL1xuXHRkZWZpbmVBdHRyaWJ1dGVzKCBhdHRycyApIHtcblx0XHRsZXQgc2VsZiA9IHRoaXM7XG5cblx0XHRmb3IgKCBsZXQgbmFtZSBpbiBhdHRycyApIHtcblx0XHRcdGlmICggIU9iamVjdC5oYXNPd25Qcm9wZXJ0eShzZWxmLCBuYW1lKSApIHtcbiAgICAgICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1sb29wLWZ1bmMgKi9cblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBzZWxmLCBuYW1lLCB7XG5cdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdFx0Z2V0OiAoKSA9PiB7IHJldHVybiBzZWxmLmdldFZhbHVlKG5hbWUpOyB9LFxuXHRcdFx0XHRcdHNldDogbmV3dmFsID0+IHsgc2VsZi5zZXRWYWx1ZShuYW1lLCBuZXd2YWwpOyB9XG5cdFx0XHRcdH0pO1xuICAgICAgICAgICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tbG9vcC1mdW5jICovXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zb2xlLmRlYnVnKCBgQWxyZWFkeSBoYXMgYSAke25hbWV9IHByb3BlcnR5LmAgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0fVxuXG5cblx0LyoqXG5cdCAqIFJldHVybnMge3RydWV9IGlmIHRoZSBvYmplY3QgaGFzIGRpcnR5ICh1bnNhdmVkKSBhdHRyaWJ1dGVzLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHQgKi9cblx0aXNEaXJ0eSgpIHtcblx0XHRyZXR1cm4gKCB0aGlzLmlzTmV3KCkgfHwgdGhpc1sgRElSVFlfRklFTERTIF0uc2l6ZSAhPT0gMCApO1xuXHR9XG5cblxuXHQvKipcblx0ICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdCB3YXMgY3JlYXRlZCBhcyBvcHBvc2VkIHRvIGZldGNoZWQgZnJvbSBhIGRhdGFzdG9yZS5cblx0ICpcblx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0ICovXG5cdGlzTmV3KCkge1xuXHRcdHJldHVybiB0aGlzWyBORVdfT0JKRUNUIF07XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBNYXJrIHRoZSBvYmplY3QgYXMgY2xlYW4gKGkuZS4sIG5vdCByZXF1aXJpbmcgc2F2aW5nKS5cblx0ICovXG5cdG1hcmtDbGVhbigpIHtcblx0XHR0aGlzWyBORVdfT0JKRUNUIF0gPSBmYWxzZTtcblx0XHR0aGlzWyBESVJUWV9GSUVMRFMgXS5jbGVhcigpO1xuXHR9XG5cblxuXHQvKipcblx0ICogVmFsaWRhdGUgdGhlIG1vZGVsIG9iamVjdCBieSBjYWxsaW5nIGl0cyB2YWxpZGF0aW9uIG1ldGhvZHMuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlfSAgcmVzb2x2ZXMgaWYgdGhlIG9iamVjdCBpcyB2YWxpZCwgcmVqZWN0cyB3aXRoIGFuIEFycmF5IG9mXG5cdCAqICAgdmFsaWRhdGlvbiBmYWlsdXJlcyBpZiBub3QuXG5cdCAqL1xuXHR2YWxpZGF0ZSgpIHtcblx0XHR0aGlzLmVycm9ycyA9IG5ldyBWYWxpZGF0aW9uRXJyb3JzKCk7XG5cdFx0dmFyIHByb21pc2VzID0gW107XG5cblx0XHRmb3IgKCBsZXQgW2ZpZWxkLCB2YWxpZGF0aW9uTWV0aG9kXSBvZiB0aGlzLnZhbGlkYXRvcnMgKSB7XG4gICAgICAgICAgICBjb25zb2xlLmRlYnVnKCBgQWRkaW5nIHZhbGlkYXRpb24gcHJvbWlzZSBmb3IgJHtmaWVsZH1gICk7XG5cdFx0XHRsZXQgcHIgPSBQcm9taXNlLnRyeSggKCkgPT4gdmFsaWRhdGlvbk1ldGhvZC5jYWxsKHRoaXMpICk7XG5cdFx0XHRwcm9taXNlcy5wdXNoKCBwciApO1xuXHRcdH1cblxuXHRcdC8vIFdhaXQgZm9yIGFsbCB2YWxpZGF0aW9uIHByb21pc2VzIHRvIHNldHRsZSwgdGhlbiBhZGQgZXJyb3JzXG5cdFx0Ly8gZm9yIHRob3NlIHdoaWNoIHdlcmUgcmVqZWN0ZWQuXG5cdFx0cmV0dXJuIFByb21pc2UuXG5cdFx0XHRhbGwoIHByb21pc2VzLm1hcChwciA9PiBwci5yZWZsZWN0KCkpICkuXG5cdFx0XHRlYWNoKCBwcm9taXNlID0+IHtcblx0XHRcdFx0Y29uc29sZS5kZWJ1ZyggXCJTZXR0bGVkIHByb21pc2UgaW5zcGVjdGlvbjogXCIsIHByb21pc2UgKTtcblx0XHRcdH0pLlxuXHRcdFx0ZmlsdGVyKCBwcm9taXNlID0+IHByb21pc2UuaXNSZWplY3RlZCgpICkuXG5cdFx0XHRlYWNoKCBwcm9taXNlID0+IHtcblx0XHRcdFx0dmFyIFtmaWVsZCwgcmVhc29uXSA9IHByb21pc2UucmVhc29uKCk7XG5cdFx0XHRcdHRoaXMuZXJyb3JzLmFkZCggZmllbGQsIHJlYXNvbiApO1xuXHRcdFx0XHRjb25zb2xlLmRlYnVnKCBgVmFsaWRhdGlvbiBmYWlsZWQgZm9yICR7ZmllbGR9OiAke3JlYXNvbn1gICk7XG5cdFx0XHR9KS5cblx0XHRcdHRoZW4oICgpID0+IHtcblx0XHRcdFx0Y29uc29sZS5kZWJ1ZyggXCJSZXNvbHZlZCB2YWxpZGF0aW9uIHByb21pc2UsIGVycm9ycyBpczogXCIsIHRoaXMuZXJyb3JzICk7XG5cdFx0XHRcdGlmICggdGhpcy5lcnJvcnMuaXNFbXB0eSgpICkge1xuXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoIHRydWUgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRsZXQgZXJyID0gbmV3IFZhbGlkYXRpb25FcnJvciggYCR7dGhpcy5lcnJvcnMubGVuZ3RofSB2YWxpZGF0aW9uIGZhaWx1cmVzLmAgKTtcblx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoIGVyciApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0fVxuXG5cblxuXG5cdC8qKlxuXHQgKiB0b1N0cmluZygpIEFQSSAtLSByZXR1cm4gYSBodW1hbi1yZWFkYWJsZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgb2JqZWN0LlxuXHQgKi9cblx0Z2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuXHRcdGxldCBkaXJ0eU1hcmsgPSB0aGlzLmlzRGlydHkoKSA/ICcgficgOiAnJztcbiAgICAgICAgbGV0IHZhbHVlU3RyaW5nID0gdGhpc1sgVkFMVUVfU1RSSU5HIF0oKTtcblx0XHRyZXR1cm4gYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSB2YWx1ZXM9eyR7dmFsdWVTdHJpbmd9fSR7ZGlydHlNYXJrfWA7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gdGhlIG9iamVjdCdzIGRhdGEgYXMgYSBTdHJpbmcgY29udGFpbmluZyBmaWVsZHMgYW5kIHZhbHVlcyBzdWl0YWJsZVxuXHQgKiBmb3IgZGVidWdnaW5nLlxuXHQgKi9cblx0WyBWQUxVRV9TVFJJTkcgXSgpIHtcblx0XHR2YXIgdmFsdWVzID0gW107XG5cdFx0Zm9yICggbGV0IGZpZWxkIGluIHRoaXNbIERBVEEgXSApIHtcblx0XHRcdGxldCB2YWwgPSB0aGlzWyBEQVRBIF1bIGZpZWxkIF07XG5cdFx0XHR2YWx1ZXMucHVzaCggYCR7ZmllbGR9OiAke3ZhbH1gICk7XG5cdFx0fVxuXHRcdHJldHVybiB2YWx1ZXMuam9pbiggJywgJyApO1xuXHR9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
