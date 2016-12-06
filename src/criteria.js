/* -*- javascript -*- */
"use strict";

import {monadic} from './utils';


/**
 * Fluent criteria for Bailiwick querying
 *
 * @class Criteria
 * @constructor
 *
 */
export class Criteria {

	static all() {
		return Reflect.construct( this, [] );
	}

	constructor( pairs={} ) {
		this.filterClauses = new Map();
		this.maxResultCount = null;
		this.resultOffset = null;
		this.location = null;

		for ( let key in pairs ) {
			this.filterClauses.set( key, pairs[key] );
		}
	}


	clone() {
		let newObj = Reflect.construct( this.constructor, [{}] );
		newObj.filterClauses = new Map( this.filterClauses );
		newObj.maxResultCount = this.maxResultCount;
		newObj.resultOffset = this.resultOffset;
		return newObj;
	}


	hasFilter() {
		return ( this.filterClauses.size > 0 );
	}


	/**
	 * Create clone of the current criteria with the additional filter
	 * {pairs}.
	 */
	@monadic
	filter( pairs ) {
		for ( let key in pairs ) {
			this.filterClauses.set( key, pairs[key] );
		}
	}


	/**
	 * Create a clone of the current criteria with its limit set to {newLimit}.
	 * @param {Integer} newLimit The new limit on how many objects to return.
	 */
	@monadic
	limit( newLimit ) {
		this.maxResultCount = newLimit;
	}


	/**
	 * Create a clone of the current criteria with its offset set to {newOffset}.
	 * @param {Integer} newOffset The new index into the filtered set to use as the first
	 *                  result.
	 */
	@monadic
	offset( newOffset ) {
		this.resultOffset = newOffset;
	}


	/**
	 * Create a clone of the current criteria with its location set to {newLocation}.
	 * @param {Object} location  The location the resource should be fetched from; the
	 *                           value of this parameter is datastore-dependent, and
	 *                           may not make sense for all of them.
	 */
	@monadic
	from( newLocation ) {
		this.location = newLocation;
	}


}

