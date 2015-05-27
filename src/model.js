/* -*- javascript -*-
 * jshint undef: true, unused: true, esnext: true
 */
"use strict";

import Promise from 'bluebird';
import inflection from 'inflection';

import {monadic} from './utils';
import {Criteria} from './criteria';
import {ValidationFailure} from './errors';

/**
 * Decorator: @validator
 * Marks the decorated method as a validator; it returns either
 */
export function validator( field ) {
	return function decorator( target, name, descriptor ) {
		var methodBody = descriptor.value;

		if ( !target.validators ) {
			target.validators = new Map();
		}

		descriptor.value = function() {
			return new Promise( (resolve, reject) => {
				try {
					resolve( methodBody.apply(this) );
				} catch( e ) {
					reject([ field, e.message || e ]);
				}
			});
		};
		target.validators.set( field, descriptor.value );

		return descriptor;
	};
}


/**
* Bailiwick.Model
*
* The base model class.
*
*/
export class Model {

	static get validators() {
		if ( !this.validators ) {
			this.validators = new Map();
		}
		return this.validators;
	}


	/**
	 * Get the relative URI for the service endpoint for the receiving class.
	 */
	static get uri() {
		return inflection.tableize( this.name );
	}


	/**
	 * Fetch the datastore associated with this model.
	 *
	 * @throws {Error}  if the datastore hasn't been set.
	 *
	 */
	static get datastore() {
		var datastore = this._datastore;

		if ( datastore === undefined ) {
			throw Error( "No datastore has been set for %o", this );
		}

		return datastore;
	}


	/**
	 * Set the datastore associated with this model.
	 */
	static set datastore( datastore ) {
		console.info( `Datastore for ${this} set to ${datastore}` );
		this._datastore = datastore;
	}


	/**
	 * Get a clone of the ResultSet for this model class.
	 */
	static get resultset() {
		return new ResultSet( this );
	}


	/**
	 * Fetch a ResultSet that will use the specified {parameters} in its criteria.
	 */
	static where( parameters ) {
		return this.resultset.where( parameters );
	}


	/**
	 * Fetch a ResultSet that will use the specified {count} in its limit.
	 */
	static limit( count ) {
		return this.resultset.limit( count );
	}


	/**
	 * Create one or more instances of the model from the specified {data}.
	 */
	static fromData( data ) {
		if ( Array.isArray(data) ) {
			return data.map( record => Reflect.construct(this, [record, false]) );
		} else {
			return Reflect.construct( this, [data, false] );
		}
	}


	/**
	 * Get instances of the model.
	 */
	static get( id_or_criteria=null ) {
		return this.datastore.get( this, id_or_criteria ).
			then( data => this.fromData(data) ).
			catch( err => {
				console.error( `Error while getting ${this.constructor.name}[ ${id_or_criteria} ] ` );
				throw( err );
			});
	}


	/**
	 * Create a new instance of the model and attempt to save it, returning a Promise
	 * that will be resolved with the new model instance if successful.
	 *
	 * @param {Object} fields  the model data
	 *
	 */
	static create( fields ) {
		var instance = Reflect.construct( this, [fields] );
		return instance.create();
	}



	// :TODO: Add some kind of ResultSet that can build up a Criteria + a Model

	// static filter( pairs ) {
	// 	return new Criteria( this, pairs );
	// }
	//
	// static limit( count ) {
	// 	return new Criteria( this ).limit( count );
	// }
	//
	// static offset( index ) {
	// 	return new Criteria( this ).offset( index );
	// }


	constructor( data={}, isNew=true ) {
		this.newObject = isNew;
		this.data = data;
		this.dirtyFields = new Set();

		this.datastore = this.constructor.datastore;

		// console.debug( `Created a new %s: %o`, this.constructor.name, data );
		this.defineAttributes( data );
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
			if ( !this.isDirty() ) return Promise.resolve( this );
			return this.update();
		}
	}



	/**
	 *
	 */
	create() {
		return this.validate().
			then( () => {
				return this.datastore.store( this.constructor, this.data );
			}).then( result => {
				if ( typeof result === 'object' ) {
					Object.assign( this.data, result );
				} else {
					this.data['id'] = result;
				}

				this.newObject = false;
				this.dirtyFields.clear();
				this.defineAttributes( this.data );

				return this;
			});
	}


	/**
	 *
	 */
	update() {
		var dirtyData = {};
		for ( var field of this.dirtyFields ) {
			dirtyData[ field ] = this.data[ field ];
		}

		return this.validate().
			then( () => {
				return this.datastore.update( this.constructor, this.id, dirtyData );
			}).then( mergedData => {
				Object.assign( this.data, mergedData );
				this.newObject = false;
				this.dirtyFields.clear();
				this.defineAttributes( this.data );

				return this;
			});
	}


	/**
	 * 
	 */
	delete() {
		if ( this.id ) {
			return this.datastore.remove( this.constructor, this.id ).
				then( () => this );
		} else {
			return Promise.resolve( this.data );
		}
	}


	/*
	 * Attribute accessor API
	 */

	/**
	 * Data property reader
	 */
	getValue( name ) {
		// console.debug(`Getting ${name}`);
		return this.data[ name ];
	}


	/**
	 * Data property writer
	 */
	setValue( name, value ) {
		// console.debug(`Setting ${name} to ${value}`);
		if ( this.data[name] !== value ) this.dirtyFields.add( name );
		this.data[ name ] = value;
	}


	/**
	 *
	 */
	defineAttributes( attrs ) {
		var self = this;

		for ( let name in attrs ) {
			if ( !Object.hasOwnProperty(self, name) ) {
				Object.defineProperty( self, name, {
					configurable: true,
					enumerable: true,
					get: () => { return self.getValue(name); },
					set: newval => { self.setValue(name, newval); }
				});
			} else {
				console.debug( `Already has a ${name} property.` );
			}
		}

	}


	/**
	 * Returns {true} if the object has dirty (unsaved) attributes.
	 *
	 * @return {Boolean}
	 */
	isDirty() {
		return ( this.isNew() || this.dirtyFields.size !== 0 )
	}


	/**
	 * Returns `true` if the object was created as opposed to fetched from a datastore.
	 *
	 * @return {Boolean}
	 */
	isNew() {
		return this.newObject;
	}


	/**
	 * Mark the object as clean (i.e., not requiring saving).
	 */
	markClean() {
		this.newObject = false;
		this.dirtyFields.clear();
	}

	/**
	 * Validate the model object by calling its validation methods.
	 *
	 * @returns {Promise}  resolves if the object is valid, rejects with an Array of
	 *   validation failures if not.
	 */
	validate() {
		return new Promise( (resolve, reject) => {
			this.errors = new Errors();
			var promises = [];

			for ( let [field, validationMethod] of this.validators ) {
				promises.push( validationMethod.apply(this) );
			}

			Promise.settle( promises ).then( results => {
				results.
					filter( promise => promise.isRejected() ).
					forEach( promise => {
						var [field, reason] = promise.reason();
						this.errors.add( field, reason );
						console.debug( `Validation failed for ${field}: ${reason}` );
					});

				if ( this.errors.isEmpty() ) {
					resolve( true );
				} else {
					reject( "Validation failed." );
				}
			});
		});
	}




	/**
	 * toString() API -- return a human-readable representation of the object.
	 */
	get [Symbol.toStringTag]() {
		var dirtyMark = this.isDirty() ? ' ~' : '';
		return `${this.constructor.name} values={${this._valueString()}}${dirtyMark}`;
	}


	/**
	 * Return the object's data as string containing fields and values suitable
	 * for debugging.
	 */
	_valueString() {
		var values = [];
		for ( let field in this.data ) {
			let val = this.data[ field ];
			values.push( `${field}: ${val}` );
		}
		return values.join( ', ' );
	}
}


/**
 * 
 */
class Errors {

	constructor() {
		this.failures = new Map();
	}


	get fields() {
		var fields = [];
		// :FIXME: Use an Array comprehension once those are stable
		for ( let field of this.failures.keys() ) fields.push( field );

		return fields;
	}


	get fullMessages() {
		var messages = [];
		for( let [field, reason] of this.failures ) {
			messages.push( `${field} ${reason}` );
		}

		return messages;
	}


	get size() {
		return this.failures.size;
	}


	add( field, reason ) {
		this.failures.set( field, reason );
	}


	isEmpty() {
		return ( this.size === 0 );
	}

}


/**
 * A monadic/fluid interface to an unreified set of Model objects made up of
 * a Model class and a Criteria for selecting a subset of them.
 *
 * @class ResultSet
 * @constructor
 */
export class ResultSet {

	constructor( model, criteria=null ) {
		if ( criteria === null ) {
			criteria = new Criteria();
		}
		else if ( !(criteria instanceof Criteria) ) {
			criteria = new Criteria( criteria );
		}

		this.model = model;
		this.criteria = criteria;
	}


	/**
	 * Return a Promise that will resolve as the reified results described by
	 * the ResultSet.
	 * @method get
	 */
	get( limit=null, offset=null ) {
		var cr = this.criteria;
		if ( limit ) cr = cr.limit( limit );
		if ( offset ) cr = cr.offset( offset );

		return this.model.get( cr );
	}


	/*
	 * Monadic API
	 */

	/**
	 * Monadic API -- duplicate the ResultSet.
	 * @return {ResultSet} the cloned result set
	 */
	clone() {
		console.debug( "Cloning result set." );
		var newObj = Reflect.construct( this.constructor );
		newObj.model = this.model;
		newObj.criteria = this.criteria;
		return newObj;
	}


	/**
	 * Add selection criteria to the set.
	 * @method where
	 * @param {Object} params  key/value pairs that will be mapped to selection criteria.
	 * @return {ResultSet}  the cloned result set with the additional criteria.
	 */
	@monadic
	where( params ) {
		console.debug( "Cloning resultset to add params: ", params );
		this.criteria = this.criteria.filter( params );
	}


	/**
	 * Add a limit to the maximum size of the set.
	 * @method limit
	 * @param {Number} count  the maximum number of results in the set
	 * @return {ResultSet}  the cloned result set with the new limit.
	 */
	@monadic
	limit( count ) {
		console.debug( "Cloned resultset to add limit: ", count );
		this.criteria = this.criteria.limit( count );
	}


	/**
	 * Add an offset into the set that should be the first element.
	 * @method index
	 * @param {Number} index  the index of the first element of the set of all
	 *                        matching model objects.
	 * @return {ResultSet}  the cloned result set with the new offset.
	 */
	@monadic
	offset( index ) {
		console.debug( "Cloned resultset to add offset: ", index );
		this.criteria = this.criteria.offset( index );
	}

}

