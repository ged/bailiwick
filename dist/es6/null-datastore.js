/* -*- javascript -*- */
'use strict';

import 'babel/polyfill';

import {Datastore} from './datastore';
import {debug} from './utils';


/**
 * An in-memory datastore (for testing)
 *
 * @class NullDatastore
 * @constructor
 *
 */
export class NullDatastore extends Datastore {

	/**
	 * ID-generator function.
	 * @static
	 */
	static *genId() {
		let i = 0;
		for( ;; ) {
			yield( ++i );
		}
	}


	/**
	 * Create a new NullDatastore
	 */
	constructor() {
		super();
		this.objects = new Map();
		this.ids = new Map();
	}

	/**
	 * Fetch the internal collection for the given object {type}.
	 * @method getCollectionForType
	 * @protected
	 */
	getCollectionForType( type ) {
		if ( !this.objects.has(type) ) {
			console.info( "ObjectStore doesn't have a %s collection; creating one.", type );
			this.objects.set( type, new Map() );
			this.ids.set( type, NullDatastore.genId() );
		}

		return this.objects.get( type );
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
	getInstance( type, id ) {
		debug( `Getting instance ${id} of ${type.name}` );
		let collection = this.getCollectionForType( type );

		if ( collection.has(id) ) {
			return Promise.resolve( collection.get(id) );
		} else {
			return Promise.reject( new Error(`No such ${type.name} ID=${id}`) );
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
	getCollection( type, criteria ) {
		debug( `Getting %s collection matching: %o`, type.name, criteria );
		let collection = this.getCollectionForType( type );
		let results;

		if ( criteria ) {
			debug( "Filtered fetch over collection of %d objects!", collection.size );
			let matches = this.findMatchingObjects( collection, criteria );
			debug( "Found %d matches: %o", matches.length, matches );
			results = Array.from( matches );
		} else {
			debug( "Unfiltered fetch!" );
			results = Array.from( collection.values() );
		}

		debug( `result is a ${typeof results}` );
		return Promise.resolve( results );
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
	findMatchingObjects( collection, criteria ) {
		// This should filter, limit, offset, etc.
		let filterFunc = this.makeFilterFunction( criteria );
		let matches = [];

		for ( let obj of collection.values() ) {
			if ( filterFunc(obj) ) { matches.push( obj ); }
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
	makeFilterFunction( criteria ) {
		let clauses = [];

		if ( criteria.filterClauses ) {
			for ( let key of criteria.filterClauses.keys() )
				clauses.push([ key, criteria.filterClauses.get(key) ]);
		}

		return function( obj ) {
			return clauses.every( pair => {
				let [key, val] = pair;
				return ( obj[key] === val );
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
	store( type, data ) {
		let collection = this.getCollectionForType( type );
		let id = this.ids.get( type ).next().value;

		debug( `Storing ${type.name} ID=${id}` );
		collection.set( id, data );
		return Promise.resolve( id );
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
	update( type, id, data ) {
		let collection = this.getCollectionForType( type );
		let current = collection.get( id );

		if ( !current ) {
			return Promise.reject( new Error(`No such ${type.name} ID=${id}`) );
		}

		debug( `Merging ${type.name} ID=${id}` );
		Object.assign( current, data );

		return Promise.resolve( current );
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
	replace( type, id, data ) {
		let collection = this.getCollectionForType( type );
		let current = collection.get( id );
		collection.set( id, data );
		return Promise.resolve( current );
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
	remove( type, id ) {
		let collection = this.getCollectionForType( type );
		let result = collection.delete( id );
		return Promise.resolve( result );
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

}
