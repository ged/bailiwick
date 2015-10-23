/* -*- javascript -*-
 * jshint undef: true, unused: true, esnext: true
 */
"use strict";

import Promise from 'bluebird';
import inflection from 'inflection';

import {monadic, validator} from './utils';

import {ResultSet} from './result-set';
import {Criteria} from './criteria';
import {ValidationErrors} from './errors';


/**
 * Decorator: @throughCallbacks
 * Marks the decorated method as one that is passed through the onRequest/onResponse and
 * equivalent error callbacks.
 */
function throughCallbacks( target, name, descriptor ) {
	var methodBody = descriptor.value;
	descriptor.value = function( ...args ) {
		console.debug( "Calling %s through request callbacks.", methodBody.name );
		let requestCallbacks = target.
			throughCallbacks( 'request', args ).
			catch( err => target.throughCallbacks('requestError', err) );

		return requestCallbacks.then( () => {
			let response = methodBody.apply( this, args );
			return response.
				then( results => {
					console.debug( "Returning %o through response callbacks.", results );
					return target.throughCallbacks('response', results);
				}).
				catch( err => target.throughCallbacks('responseError', err) );
			});
	};
}



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
		if ( !this.associations ) {
			this.associations = new Map();
		}
		return this.associations;
	}


	/**
	 * Get the Map of validators defined for the class.
	 */
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
	 * Request the datastore associated with this model.
	 *
	 * @throws {Error}  if the datastore hasn't been set.
	 *
	 */
	static get datastore() {
		var datastore = this._datastore;

		if ( datastore === undefined ) {
			throw Error( `No datastore has been set for ${this}` );
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


	/*
	 * Callbacks API
	 */

	/**
	 *
	 */
	static get callbacks() {
		if ( !this._callbacks ) {
			this._callbacks = new Map();
			this._callbacks.set( 'request', new Set() );
			this._callbacks.set( 'requestError', new Set() );
			this._callbacks.set( 'response', new Set() );
			this._callbacks.set( 'responseError', new Set() );
		}

		return this._callbacks;
	}


	/**
	 *
	 */
	static throughCallbacks( kind, ...args ) {
		var hooks = Array.from( this.callbacks.get(kind) );
		console.debug( "Filtering args %o through %d %s callbacks.", args, hooks.length, kind );

		return Promise.reduce( hooks, (args, hook, index, len) => {
			console.debug( `Running ${kind} hook ${index} of ${len}` );
			return hook.call( args );
		}, args );
	}


	/**
	 *
	 */
	static onRequest( callback ) {
		var callbacks = this.callbacks.get( 'request' )
		callbacks.add( callback );
	}


	/**
	 *
	 */
	static onRequestError( callback ) {
		var callbacks = this.callbacks.get( 'requestError' )
		callbacks.add( callback );
	}


	/**
	 *
	 */
	static onResponse( callback ) {
		var callbacks = this.callbacks.get( 'response' )
		callbacks.add( callback );
	}


	/**
	 *
	 */
	static onResponseError( callback ) {
		var callbacks = this.callbacks.get( 'responseError' )
		callbacks.add( callback );
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
		console.debug( "Constructing %s objects from datastore data %o", this.name, data );
		if ( Array.isArray(data) ) {
			return data.map( record => Reflect.construct(this, [record, false]) );
		} else {
			return Reflect.construct( this, [data, false] );
		}
	}


	/**
	 * Get instances of the model.
	 */
	// @throughCallbacks
	static get( id_or_criteria=null ) {
		return this.datastore.get( this, id_or_criteria ).
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
		var instance = Reflect.construct( this, [fields] );
		return instance.create();
	}


	/**
	 * Construct a new model object around the given {data}, marking it as new
	 * if {isNew} is true.
	 */
	constructor( data={}, isNew=true ) {
		this.newObject = isNew;
		this.data = data;
		this.dirtyFields = new Set();
		this.associationCache = new Map();

		this.datastore = this.constructor.datastore;

		// console.debug( `Created a new %s: %o`, this.constructor.name, data );
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
		let association = `${name}Object`;

		if ( typeof this[association] === 'function' ) {
			return this[association]( this.data[name] );
		} else {
			return this.data[ name ];
		}
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
			this.errors = new ValidationErrors();
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


