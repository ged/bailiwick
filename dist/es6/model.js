/* -*- javascript -*- */
"use strict";

import Promise from 'bluebird';
import inflection from 'inflection';

import {ResultSet} from './result-set';
import {ValidationErrors} from './validations';
import {debug} from './utils';

/*
 * Use symbols for model object properties so they don't collide with
 * data properties.
 */
const NEW_OBJECT         = Symbol.for("newObject"),
      DATA               = Symbol.for("data"),
      DIRTY_FIELDS       = Symbol.for("dirtyFields"),
      ASSOCIATIONS_CACHE = Symbol.for("associationsCache"),
      DATASTORE          = Symbol.for("datastore"),
      VALIDATORS         = Symbol.for("validators"),
      ASSOCIATIONS       = Symbol.for("associations"),
      VALUE_STRING       = Symbol.for("valueString"),
      SCHEMA             = Symbol.for("schema");


/**
* Bailiwick.Model
*
* The base model class.
*
*/
export class Model {

	/**
	 * Get the Map of associations defined for the class.
	 */
	static get associations() {
		if ( !this[ASSOCIATIONS] ) {
			this[ ASSOCIATIONS ] = new Map();
		}
		return this[ ASSOCIATIONS ];
	}


	/**
	 * Get the Map of validators defined for the class.
	 */
	static get validators() {
		if ( !this[VALIDATORS] ) {
			this[ VALIDATORS ] = new Map();
		}
		return this[ VALIDATORS ];
	}


	/**
	 * Get the relative URI for the service endpoint for the receiving class.
	 */
	static get uri() {
		return inflection.tableize( this.name );
	}


	/**
	 * Request the datastore associated with this model.
	 *
	 * @throws {Error}  if the datastore hasn't been set.
	 *
	 */
	static get datastore() {
		if ( !this[DATASTORE] ) {
			throw Error( `No datastore has been set for ${this}` );
		}

		return this[ DATASTORE ];
	}


	/**
	 * Set the datastore associated with this model.
	 */
	static set datastore( datastore ) {
		debug( `Datastore for ${this} set to ${datastore}` );
		this[ DATASTORE ] = datastore;
	}


	/**
	 * Get a clone of the ResultSet for this model class.
	 */
	static get resultset() {
		return new ResultSet( this );
	}


	/**
	 * Request a ResultSet that will use the specified {parameters} in its criteria.
	 */
	static where( parameters ) {
		return this.resultset.where( parameters );
	}


	/**
	 * Request a ResultSet that will use the specified {count} in its limit.
	 */
	static limit( count ) {
		return this.resultset.limit( count );
	}


	/**
	 * Request a ResultSet that will use the specified {location} when fetching from
	 * the datastore.
	 */
	static from( location ) {
		return this.resultset.from( location );
	}


	/**
	 * Create one or more instances of the model from the specified {data}.
	 */
	static fromData( data ) {
		// debug( "Constructing %s objects from datastore data %o", this.name, data );
		if ( Array.isArray(data) ) {
			return data.map( record => Reflect.construct(this, [record, false]) );
		} else {
			return Reflect.construct( this, [data, false] );
		}
	}


	/**
	 * Get instances of the model.
	 */
	static get( idOrCriteria=null ) {
		return this.datastore.get( this, idOrCriteria ).
			then( data => this.fromData(data) );
	}


	/**
	 * Create a new instance of the model and attempt to save it, returning a Promise
	 * that will be resolved with the new model instance if successful.
	 *
	 * @param {Object} fields  the model data
	 *
	 */
	static create( fields ) {
		let instance = Reflect.construct( this, [fields] );
		return instance.create();
	}


	/**
	 * Construct a new model object around the given {data}, marking it as new
	 * if {isNew} is true.
	 */
	constructor( data={}, isNew=true ) {
		let schema = this.constructor[ SCHEMA ] || {};
		data = Object.assign( {}, schema, data );

		this[ NEW_OBJECT ] = isNew;
		this[ DATA ] = data;
		this[ DIRTY_FIELDS ] = new Set();
		this[ ASSOCIATIONS_CACHE ] = new Map();

		this[ DATASTORE ] = this.constructor.datastore;

		// debug( `Created a new %s: %o`, this.constructor.name, data );
		this.defineAttributes( data );
	}


	/**
	 * Fetch the URI of the object.
	 */
	get uri() {
		return `${this.constructor.uri}/${this.id}`;
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
		if ( this.isNew() ) {
			return this.create();
		} else {
			if ( !this.isDirty() ) {
                return Promise.resolve( this );
            }
			return this.update();
		}
	}



	/**
	 * Create the model object in the object's store and return a Promise that
     * will resolve to the result.
	 */
	create() {
		return this.validate().
			then( () => {
				return this[ DATASTORE ].store( this.constructor, this[ DATA ] );
			}).
			then( result => {
				if ( typeof result === 'object' ) {
					Object.assign( this[ DATA ], result );
				} else {
					this[ DATA ]['id'] = result; // eslint-disable-line dot-notation
				}

				this[ NEW_OBJECT ] = false;
				this[ DIRTY_FIELDS ].clear();
				this.defineAttributes( this[DATA] );

				return this;
			});
	}


	/**
	 * Update any dirty fields in the model object in the object's store with values from the object
     * and return a Promise that will resolve to the result.
	 */
	update() {
		let dirtyData = {};
		for ( let field of this[ DIRTY_FIELDS ] ) {
			dirtyData[ field ] = this[ DATA ][ field ];
		}

		return this.validate().
			then( () => {
				return this[ DATASTORE ].update( this.constructor, this.id, dirtyData );
			}).
			then( mergedData => {
				Object.assign( this[ DATA ], mergedData );
				this[ NEW_OBJECT ] = false;
				this[ DIRTY_FIELDS ].clear();
				this.defineAttributes( this[ DATA ] );

				return this;
			});
	}


	/**
	 * Delete the object from the object's store and return a Promise that will resolve to the
     * result.
	 */
	delete() {
		if ( this.id ) {
			return this[ DATASTORE ].remove( this.constructor, this.id ).
				then( () => this );
		} else {
			return Promise.resolve( this[ DATA ] );
		}
	}


	/*
	 * Attribute accessor API
	 */

	/**
	 * Data property reader
	 */
	getValue( name ) {
		if ( this.constructor.associations.has(name) ) {
			let fn = this.constructor.associations.get( name );
            return fn( this[DATA][name] );
		} else {
			return this[ DATA ][ name ];
		}
	}


	/**
	 * Data property writer
	 */
	setValue( name, value ) {
		// debug(`Setting ${name} to ${value}`);
		if ( this[ DATA ][name] !== value ) {
            this[ DIRTY_FIELDS ].add( name );
        }
		this[ DATA ][ name ] = value;
	}


	/**
	 * Define attribute accessors for the specified {attrs}.
	 */
	defineAttributes( attrs ) {
		let self = this;

		for ( let name in attrs ) {
			if ( !Object.hasOwnProperty(self, name) ) {
                /* eslint-disable no-loop-func */
				Object.defineProperty( self, name, {
					configurable: true,
					enumerable: true,
					get: () => { return self.getValue(name); },
					set: newval => { self.setValue(name, newval); }
				});
                /* eslint-enable no-loop-func */
			} else {
				debug( `Already has a ${name} property.` );
			}
		}

	}


	/**
	 * Returns {true} if the object has dirty (unsaved) attributes.
	 *
	 * @return {Boolean}
	 */
	isDirty() {
		return ( this.isNew() || this[ DIRTY_FIELDS ].size !== 0 );
	}


	/**
	 * Returns `true` if the object was created as opposed to fetched from a datastore.
	 *
	 * @return {Boolean}
	 */
	isNew() {
		return this[ NEW_OBJECT ];
	}


	/**
	 * Mark the object as clean (i.e., not requiring saving).
	 */
	markClean() {
		this[ NEW_OBJECT ] = false;
		this[ DIRTY_FIELDS ].clear();
	}


	/**
	 * Validate the model object by calling its validation methods.
	 *
	 * @returns {Promise}  resolves if the object is valid, rejects with an Array of
	 *   validation failures if not.
	 */
	validate() {
		this.errors = new ValidationErrors();
		let promises = [];

		for ( let [field, validationMethod] of this.constructor.validators ) {
            debug( `Adding validation promise for ${field}` );
			let pr = Promise.try( () => validationMethod.call(this) );
			promises.push( pr );
		}

		// Wait for all validation promises to settle
		return Promise.
			all( promises ).
			then( () => {
				debug( "Validation successful!" );
			});
	}




	/**
	 * toString() API -- return a human-readable representation of the object.
	 */
	get [Symbol.toStringTag]() {
		let dirtyMark = this.isDirty() ? ' ~' : '';
        let valueString = this[ VALUE_STRING ]();
		return `${this.constructor.name} values={${valueString}}${dirtyMark}`;
	}


	/**
	 * Return the object's data as a String containing fields and values suitable
	 * for debugging.
	 */
	[ VALUE_STRING ]() {
		let values = [];
		for ( let field in this[ DATA ] ) {
			let val = this[ DATA ][ field ];
			values.push( `${field}: ${val}` );
		}
		return values.join( ', ' );
	}
}


/**
 * Bailiwick.schema
 *
 * A decorator for declaring fields for a Model.
 */
export function schema( fields ) {

	return function decorator( modelClass ) {
		modelClass[ SCHEMA ] = fields;
		for ( let name in fields ) {
			if ( !Object.hasOwnProperty(modelClass, name) ) {
                /* eslint-disable no-loop-func */
				Object.defineProperty( modelClass, name, {
					configurable: true,
					enumerable: true,
					get: () => { return this.getValue(name); },
					set: newval => { this.setValue(name, newval); }
				});
                /* eslint-enable no-loop-func */
			} else {
				debug( `Already has a ${name} property.` );
			}
		}
	};

}
