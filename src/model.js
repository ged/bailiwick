/* -*- javascript -*- */
"use strict";

import Promise from 'bluebird';
import inflection from 'inflection';

import {ResultSet} from './result-set';
import {ValidationErrors} from './validations';
import {associationDelegator} from './associations';
import {logger} from './utils';

/*
 * Use symbols for model object properties so they don't collide with
 * data properties.
 */
const ASSOCIATIONS       = Symbol.for("associations"),
      ASSOCIATIONS_CACHE = Symbol.for("associationsCache"),
      DATA               = Symbol.for("data"),
      DATASTORE          = Symbol.for("datastore"),
      DIRTY_FIELDS       = Symbol.for("dirtyFields"),
      NEW_OBJECT         = Symbol.for("newObject"),
      SCHEMA             = Symbol.for("schema"),
      VALIDATORS         = Symbol.for("validators"),
      VALUE_STRING       = Symbol.for("valueString");


/**
* Bailiwick.Model
*
* The base model class.
*
*/
export class Model {

	/**
	 * Get the association delegator for this model class.
	 */
	static get associations() {
		if ( !this[ASSOCIATIONS] ) {
			this[ ASSOCIATIONS ] = associationDelegator( this );
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
		logger.debug( `Datastore for ${this} set to ${datastore}` );
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
		// logger.debug( "Constructing %s objects from datastore data ", this.name, data );
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

		this.defineAttributes( data );
		logger.debug( `Created a new `, this.constructor.name, ': ', this[DATA] );
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
					logger.debug( "Merging result entity ", result, " with saved object." );
					Object.assign( this[ DATA ], result );
				} else {
					logger.debug( "Setting the object's ID to ", result, "." );
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
	 * Replace the data in the object's store with all values from the object
     * and return a Promise that will resolve to the result.
	 */
	replace() {
		let data = Object.assign( {}, this[DATA] );

		return this.validate().
			then( () => {
				return this[ DATASTORE ].replace( this.constructor, this.id, data );
			}).
			then( mergedData => {
				Object.assign( this[ DATA ], mergedData );
				this[ NEW_OBJECT ] = false;
				this[ DIRTY_FIELDS ].clear();
				this.defineAttributes( this[DATA] );

				return this;
			});
	}


	/**
	 * Delete the object from the object's store and return a Promise that will resolve to the
     * result.
	 */
	delete() {
		let dirtyData = {};
		for ( let field of this[ DIRTY_FIELDS ] ) {
			dirtyData[ field ] = this[ DATA ][ field ];
		}

		if ( this.id ) {
			return this.validate().
				then( () => {
					this[ DATASTORE ].remove( this.constructor, this.id, dirtyData );
				}).
				then( deletedData => {
					logger.debug( "Updating ", this, " with results from deletion." );
					Object.assign( this[ DATA ], deletedData );
					this[ NEW_OBJECT ] = true;
					this[ DIRTY_FIELDS ].clear();
					this.defineAttributes( this[ DATA ] );

					return this;
				});
		} else {
			throw new Error( "Cannot delete an object with no id" );
		}
	}


	/**
	 * Fetch the object from the object's store and construct a new model.
	 */
	refresh() {
		if ( this.id ) {
			return this[ DATASTORE ].get( this.constructor, this.id ).then( refreshedData => {
				this.constructor( refreshedData, false );
			} );
		} else {
			throw new Error( "Cannot refresh an object with no id" );
		}

	}


	/*
	 * Attribute accessor API
	 */

	/**
	 * Data property reader
	 */
	getValue( name ) {
		return this[ DATA ][ name ];
	}


	/**
	 * Data property writer
	 */
	setValue( name, value ) {
		// logger.debug(`Setting ${name} to ${value}`);
		if ( this[ DATA ][name] !== value ) {
            this.markDirty( name );
        }
		this[ DATA ][ name ] = value;
	}


	/**
	 * Mark the field with the specified {name} as dirty (changed since the object was loaded.)
	 */
	markDirty( fieldName ) {
		this[ DIRTY_FIELDS ].add( fieldName );
	}


	/**
	 * Define attribute accessors for the specified {attrs}.
	 */
	defineAttributes( attrs ) {
		let self = this;

		for ( let name in attrs ) {
			logger.debug( `Adding ${name} attribute accessor.` );
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
				logger.debug( `Already has a ${name} property.` );
			}
		}

	}


	/**
	 * Returns {true} if the object has dirty (unsaved) attributes.
	 *
	 * @return {Boolean}
	 */
	isDirty() {
		return ( this.isNew() || (this[DIRTY_FIELDS] && this[DIRTY_FIELDS].size !== 0) );
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
            logger.debug( `Adding validation promise for ${field}` );
			let pr = Promise.try( () => validationMethod.call(this) );
			promises.push( pr );
		}

		// Wait for all validation promises to settle
		return Promise.
			all( promises ).
			then( () => {
				logger.debug( "Validation successful!" );
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
				logger.debug( `Already has a ${name} property.` );
			}
		}
	};

}
