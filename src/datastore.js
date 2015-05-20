/* -*- javascript -*- */
'use strict';

import Promise from 'bluebird';
import 'babel/polyfill';

import {NotImplementedError} from './errors';
import {Criteria} from './criteria';

/**
 * Datastore decorator -- syntactic sugar for setting the `datastore`
 * member of the decorated class's prototype.
 */
export function datastore( type, ...args ) {
	return function decorator( target ) {
		var ds = Reflect.construct( type, args );
		console.debug( "Setting datastore of ", target, " to ", ds );
		target.datastore = ds;
	}
}

/**
 * The base class for Bailiwick datastore classes.
 *
 * A datastore is the object responsible for fetching, storing, updating, and deleting
 * data for one or more domain Model objects, as well as caching and some other
 * utility functions.
 *
 * A Model class should create an instance of (a derivative of) this class as its
 * `datastore` attribute.
 *
 * @class Datastore
 * @constructor
 */
export class Datastore {

	/**
	 * Create a new Datastore -- not used directly, as this is an abstract class.
	 */
	constructor() {}

	/**
	 * Get the data associated with the model class of the specified {type} and
	 * {criteria}.
	 *
	 * @method get
	 * @param {Class} type  the type of data to fetch
	 * @param {Criteria, Integer} criteria  the criteria that determines what
	 *    specific data is fetched. If it's a Integer, it's assumed to be an ID,
	 *    and a single object is fetched. If it's either `null` or a `Criteria`
	 *    object, an Array of all matching objects are fetched.
	 *
	 * @returns {Promise} the promise that resolves to the results, or rejects
	 *    if fetching by ID and no data for that object is available.
	 */
	get( type, criteria=null ) {
		// Collection API if the criteria is a Criteria
		if ( criteria instanceof Criteria ) {
			return this.getCollection( type, criteria );
		} else {
			return this.getInstance( type, criteria );
		}
	}


	/**
	 * The "collection" getter -- derivatives of this class should implement this
	 * for fetching collections matching the given {criteria}.
	 *
	 * @params {Class}    type      the type of data to fetch.
	 * @params {Criteria} criteria  the matching criteria to use to filter the
	 *    returned collection. If this is `null`, the entire collection should be
	 *    returned.
	 *
	 * @returns {Promise}  a promise that should resolve to the Array of results.
	 *
	 * @protected
	 */
	getCollection( type, criteria ) {
		return Promise.reject( new NotImplementedError("getCollection") );
	}


	/**
	 * The "instance" getter -- derivatives of this class should implement this
	 * for fetching data for a single object by its ID.
	 *
	 * @params {Class}    type   the type of data to fetch.
	 * @params {Integer}  id     the ID of the object to fetch.
	 *
	 * @returns {Promise}  a promise that should resolve to the data for the requested
	 *    object. If the object doesn't exist, the promise should reject with an
	 *    appropriate Error.
	 *
	 * @protected
	 */
	getInstance( type, id ) {
		return Promise.reject( new NotImplementedError("getInstance") );
	}

	/**
	 * Derivatives of this class should provide an implementation of this for storing
	 * new data in the store.
	 *
	 * @params {Class}    type   the type of data to fetch
	 * @params {Object}   data   the data to store for the new object
	 *
	 * @returns {Promise}  a promise that should resolve to the ID of the newly-stored
	 *    object on success, or reject with an appropriate `Error` if the object
	 *    could not be stored for some reason.
	 *
	 */
	store( type, data ) {
		return Promise.reject( new NotImplementedError("store") );
	}

	/**
	 * Derivatives of this class should provide an implementation of this for updating
	 * the data in the store for an IDed object.
	 *
	 * @params {Class}    type   the type of data to fetch
	 * @params {Integer}  id     the ID of the object to update
	 * @params {Object}   data   the data to merge with the current data for the new object
	 *
	 * @returns {Promise}  a promise that should resolve to the merged data for the object
	 */
	update( type, id, data ) {
		return Promise.reject( new NotImplementedError("update") );
	}

	/**
	 * Derivatives of this class should provide an implementation of this for replacing
	 * the data in the store for an IDed object.
	 *
	 * @params {Class}    type   the type of data to fetch
	 * @params {Integer}  id     the ID of the object to replace
	 * @params {Object}   data   the replacement data
	 *
	 * @returns {Promise}  a promise that should resolve to the data being replaced.
	 */
	replace( type, id, data ) {
		return Promise.reject( new NotImplementedError("replace") );
	}

	/**
	 * Derivatives of this class should provide an implementation of this for removing
	 * data from the store.
	 *
	 * @params {Class}    type   the type of data to fetch
	 * @params {Integer}  id     the ID of the object to remove
	 *
	 * @returns {Promise}  a promise that should resolve to `true` if the object
	 *    was in the store prior to the removal, or `false` if it was not.
	 */
	remove( type, id ) {
		return Promise.reject( new NotImplementedError("remove") );
	}


}

